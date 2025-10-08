# Configuration Frontend Vercel pour communiquer avec Backend Render 🔗

## Modifications à apporter au frontend

### Option 1 : Utiliser une variable d'environnement Vercel (Recommandé)

#### 1. Configurer la variable dans Vercel

1. Aller sur [vercel.com](https://vercel.com) → Votre projet
2. Settings → Environment Variables
3. Ajouter :
   - **Name:** `VITE_API_URL`
   - **Value:** `https://votre-backend-render.onrender.com`
   - **Environments:** Production, Preview, Development

#### 2. Modifier le code frontend

Dans votre fichier de configuration API (ex: `frontend/src/lib/queryClient.ts` ou similaire) :

```typescript
// Avant
const API_URL = '/api';

// Après
const API_URL = import.meta.env.VITE_API_URL || '/api';
```

Si vous utilisez `fetch` directement dans plusieurs fichiers :

```typescript
// Créer un fichier frontend/src/lib/config.ts
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Puis dans vos composants
import { API_BASE_URL } from '@/lib/config';

const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include', // Important pour les cookies
  body: JSON.stringify(data)
});
```

#### 3. Redéployer le frontend

```bash
git add .
git commit -m "Configure backend URL for Render"
git push
```

Vercel redéploiera automatiquement.

---

### Option 2 : Créer un fichier vercel.json avec rewrites

Cette option permet de garder les appels `/api` dans le code frontend.

#### 1. Créer/modifier `frontend/vercel.json`

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://votre-backend-render.onrender.com/api/:path*"
    }
  ],
  "headers": [
    {
      "source": "/api/:path*",
      "headers": [
        { "key": "Access-Control-Allow-Credentials", "value": "true" },
        { "key": "Access-Control-Allow-Origin", "value": "*" },
        { "key": "Access-Control-Allow-Methods", "value": "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
        { "key": "Access-Control-Allow-Headers", "value": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization, Cookie" }
      ]
    }
  ]
}
```

⚠️ **Note :** Avec cette méthode, vos appels API resteront `fetch('/api/...')` sans modification.

---

### Option 3 : Utiliser un proxy Vercel Serverless Function

#### 1. Créer `frontend/api/proxy.ts`

```typescript
import { VercelRequest, VercelResponse } from '@vercel/node';

const BACKEND_URL = process.env.BACKEND_URL || 'https://votre-backend-render.onrender.com';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { path } = req.query;
  const apiPath = Array.isArray(path) ? path.join('/') : path;
  
  try {
    const response = await fetch(`${BACKEND_URL}/api/${apiPath}`, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        ...req.headers,
      },
      body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Proxy error' });
  }
}
```

#### 2. Configurer le routing dans `frontend/vercel.json`

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "/api/proxy?path=:path*"
    }
  ]
}
```

---

## Gestion des Cookies et Credentials

### Important : Configuration CORS avec cookies

Le backend est déjà configuré pour accepter les cookies depuis Vercel. Assurez-vous que vos appels API utilisent `credentials: 'include'` :

```typescript
// ✅ Correct
fetch(`${API_URL}/api/auth/login`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include', // Important !
  body: JSON.stringify({ email, password })
});

// ❌ Incorrect
fetch(`${API_URL}/api/auth/login`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  // credentials manquant !
  body: JSON.stringify({ email, password })
});
```

### Si vous utilisez Axios

```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // Important !
});

export default api;
```

---

## Résolution de l'erreur "Unexpected end of JSON input"

Cette erreur survient généralement quand :

### 1. La réponse n'est pas du JSON valide

**Solution :**
```typescript
const response = await fetch(url);

// Vérifier le status avant de parser
if (!response.ok) {
  const text = await response.text();
  console.error('Error response:', text);
  throw new Error(`HTTP ${response.status}: ${text}`);
}

// Parser seulement si le status est OK
const data = await response.json();
```

### 2. Le backend n'est pas accessible

**Solution :**
- Vérifier que l'URL du backend est correcte
- Vérifier que le backend est démarré sur Render
- Tester l'URL directement dans le navigateur : `https://votre-backend.onrender.com/api/health`

### 3. CORS bloque la requête

**Solution :**
- Vérifier que `FRONTEND_URL` est configuré dans Render avec l'URL exacte de Vercel
- Vérifier que `credentials: 'include'` est présent

### 4. Le backend retourne une erreur HTML au lieu de JSON

**Solution :**
```typescript
const response = await fetch(url);

// Vérifier le Content-Type
const contentType = response.headers.get('content-type');
if (contentType && contentType.includes('application/json')) {
  const data = await response.json();
  return data;
} else {
  const text = await response.text();
  console.error('Non-JSON response:', text);
  throw new Error('Expected JSON response');
}
```

---

## Vérification complète

### 1. Tester le backend directement

```bash
curl https://votre-backend-render.onrender.com/api/health
```

Réponse attendue :
```json
{"status":"healthy","timestamp":"2025-01-08T..."}
```

### 2. Tester depuis le frontend

```javascript
// Dans la console du navigateur (frontend Vercel)
fetch('https://votre-backend-render.onrender.com/api/health', {
  credentials: 'include'
})
  .then(r => r.json())
  .then(console.log)
  .catch(console.error);
```

### 3. Vérifier les cookies

```javascript
// Après login, vérifier dans DevTools → Application → Cookies
// Devrait voir : auth_token
```

---

## Checklist finale

- [ ] Backend déployé sur Render et accessible
- [ ] Variable `VITE_API_URL` configurée dans Vercel
- [ ] Variable `FRONTEND_URL` configurée dans Render (URL Vercel)
- [ ] Code frontend modifié pour utiliser `VITE_API_URL`
- [ ] Tous les appels `fetch` ont `credentials: 'include'`
- [ ] Frontend redéployé sur Vercel
- [ ] Test de connexion réussi
- [ ] Cookies fonctionnent correctement

---

## Exemple complet de configuration

### Backend (Render - Déjà configuré)
```
FRONTEND_URL=https://luxio-shop.vercel.app
```

### Frontend (Vercel)
```
VITE_API_URL=https://luxio-backend.onrender.com
```

### Code Frontend
```typescript
// frontend/src/lib/config.ts
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// frontend/src/lib/api.ts
import { API_BASE_URL } from './config';

export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`API Error ${response.status}: ${text}`);
  }

  return response.json();
}

// Utilisation
import { apiRequest } from './lib/api';

const login = async (email: string, password: string) => {
  return apiRequest('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
};
```

---

## Support

Si les erreurs persistent :

1. **Vérifier les logs Render :** Dashboard → Logs
2. **Vérifier les logs Vercel :** Dashboard → Deployments → Logs  
3. **Ouvrir DevTools :** Network tab pour voir les requêtes
4. **Tester avec curl :** Pour isoler si c'est un problème frontend ou backend

La configuration ci-dessus devrait résoudre tous les problèmes de communication entre Vercel et Render !
