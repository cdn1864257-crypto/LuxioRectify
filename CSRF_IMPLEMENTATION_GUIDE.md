# CSRF Protection Implementation Guide - Luxio

## Vue d'ensemble

Ce document décrit la mise en œuvre complète de la protection CSRF pour Luxio, où le backend (Render) et le frontend (Vercel) sont déployés séparément.

## Architecture

```
Frontend (Vercel)          Backend (Render)
https://luxios.vercel.app → https://luxio.onrender.com

1. Frontend charge → GET /api/csrf-token → Reçoit le token
2. Frontend stocke le token en mémoire
3. Toutes les requêtes POST/PUT/PATCH/DELETE → Envoient le token dans header X-CSRF-Token
4. Backend valide le token avant de traiter la requête
```

## Backend Configuration

### 1. Route `/api/csrf-token`

```typescript
// Special CSRF middleware for token generation endpoint
const csrfTokenGenerator = csrf({ cookie: false });

// Route to provide CSRF token to frontend
app.get('/api/csrf-token', csrfTokenGenerator, (req: any, res) => {
  res.json({ csrfToken: req.csrfToken() });
});
```

**Important:** Cette route utilise son propre middleware CSRF pour générer le token sans en exiger un au préalable (résout le problème de "poule et d'œuf").

### 2. CSRF Protection Middleware

```typescript
const csrfProtection = csrf({ 
  cookie: false,  // Utilise la session au lieu des cookies
  value: (req) => {
    // Accepte le token depuis le header X-CSRF-Token
    return req.headers['x-csrf-token'] as string || req.body._csrf;
  }
});
```

### 3. Routes Exemptées

Les routes suivantes **ne nécessitent PAS** de token CSRF :

- `/api/csrf-token` - Génère le token
- `/api/auth/signup` - Signup public
- `/api/auth/login` - Login public
- `/api/auth/logout` - Logout (évite les problèmes de session)
- `/api/payment/nowpayments-webhook` - Webhook externe (vérifié par HMAC)
- `/api/payment/nowpayments-return` - Redirection de paiement

### 4. Session Configuration

```typescript
app.use(session({
  secret: process.env.SESSION_SECRET || 'default-secret',
  resave: false,
  saveUninitialized: false,
  store: mongoStore,  // MongoDB session store
  cookie: {
    httpOnly: true,
    secure: true,  // Production only
    sameSite: 'none',  // Required for cross-origin
    maxAge: 24 * 60 * 60 * 1000  // 24 hours
  }
}));
```

**Important:** `sameSite: 'none'` est requis car frontend et backend sont sur des domaines différents.

## Frontend Configuration

### 1. Token Management (`frontend/src/lib/config.ts`)

```typescript
let csrfToken: string | null = null;

export async function getCsrfToken(forceRefresh = false): Promise<string> {
  if (csrfToken && !forceRefresh) {
    return csrfToken;
  }

  const response = await fetch(getApiUrl('/api/csrf-token'), {
    credentials: 'include'  // Important: envoie les cookies
  });
  
  const data = await response.json();
  csrfToken = data.csrfToken;
  
  return csrfToken;
}
```

### 2. Automatic Token Injection (`fetchWithCsrf`)

```typescript
export async function fetchWithCsrf(url: string, options: RequestInit = {}): Promise<Response> {
  const token = await getCsrfToken();
  
  const headers = new Headers(options.headers || {});
  
  // Ajoute le token pour POST/PUT/PATCH/DELETE
  if (options.method && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(options.method.toUpperCase())) {
    headers.set('X-CSRF-Token', token);
  }
  
  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include'
  });

  // Auto-retry si le token a expiré
  if (response.status === 403) {
    const errorData = await response.clone().json();
    if (errorData.error === 'Invalid CSRF token') {
      const newToken = await getCsrfToken(true);
      headers.set('X-CSRF-Token', newToken);
      
      return fetch(url, {
        ...options,
        headers,
        credentials: 'include'
      });
    }
  }
  
  return response;
}
```

### 3. Token Initialization (`AuthContext.tsx`)

```typescript
const checkAuth = async () => {
  // Initialise le token CSRF au démarrage
  try {
    await getCsrfToken();
    console.log('CSRF token initialized successfully');
  } catch (csrfError) {
    console.error('Failed to initialize CSRF token:', csrfError);
  }
  
  // Vérifie l'authentification
  const response = await fetch(getApiUrl('/api/auth/me'), {
    credentials: 'include',
  });
  
  // ...
};
```

### 4. Token Refresh After Login

```typescript
const login = async (email: string, password: string) => {
  // ... login logic ...
  
  if (!response.ok) {
    return { success: false, error: data.error };
  }

  // Rafraîchir le token CSRF pour la nouvelle session
  try {
    await getCsrfToken(true);  // Force refresh
    console.log('CSRF token refreshed after login');
  } catch (csrfError) {
    console.error('Failed to refresh CSRF token after login:', csrfError);
  }

  return { success: true };
};
```

### 5. Token Reset After Logout

```typescript
const logout = async () => {
  await fetch(getApiUrl('/api/auth/logout'), {
    method: 'POST',
    credentials: 'include',
  });

  localStorage.clear();
  sessionStorage.clear();
  resetCsrfToken();  // Important: reset le token en mémoire
  
  setUser(null);
};
```

## Flow Complet

### Scénario 1: Premier Chargement de l'Application

```
1. User ouvre https://luxios.vercel.app
2. AuthContext s'initialise
3. checkAuth() est appelé
4. getCsrfToken() → GET https://luxio.onrender.com/api/csrf-token
5. Backend génère un token et l'envoie
6. Frontend stocke le token en mémoire
7. Token prêt pour les requêtes protégées
```

### Scénario 2: Login

```
1. User soumet le formulaire de login
2. POST /api/auth/login (exempt de CSRF)
3. Backend crée une session et envoie les cookies
4. Frontend appelle getCsrfToken(true) pour rafraîchir le token
5. Nouveau token prêt pour la session authentifiée
```

### Scénario 3: Cancel Order

```
1. User clique sur "Cancel Order"
2. DELETE /api/orders/{orderId}
3. fetchWithCsrf() récupère le token stocké en mémoire
4. Ajoute le header X-CSRF-Token avec le token
5. Backend valide le token via csrfProtection
6. Si valide: supprime la commande
7. Si invalide (403): frontend rafraîchit le token et réessaie automatiquement
```

### Scénario 4: Logout

```
1. User clique sur "Logout"
2. POST /api/auth/logout (exempt de CSRF)
3. Backend détruit la session MongoDB
4. Frontend vide localStorage/sessionStorage
5. Frontend appelle resetCsrfToken() pour vider le token en mémoire
```

## Debugging

### Vérifier que le Token CSRF est Généré

```bash
curl -i https://luxio.onrender.com/api/csrf-token \
  -H "Cookie: connect.sid=YOUR_SESSION_COOKIE"

# Devrait retourner:
# {
#   "csrfToken": "abc123..."
# }
```

### Vérifier que le Token est Accepté

```bash
curl -X DELETE https://luxio.onrender.com/api/orders/ORDER_ID \
  -H "Cookie: connect.sid=YOUR_SESSION; auth_token=YOUR_JWT" \
  -H "X-CSRF-Token: YOUR_CSRF_TOKEN" \
  -H "Content-Type: application/json"

# Devrait retourner 200 si le token est valide
# Devrait retourner 403 si le token est invalide
```

### Console Logs à Surveiller

**Frontend:**
```
✅ "CSRF token initialized successfully"
✅ "CSRF token refreshed after login"
⚠️ "CSRF token expired, refreshing..."
❌ "Failed to initialize CSRF token: ..."
```

**Backend:**
```
✅ "Backend API Server running on http://localhost:3001"
❌ "Global error handler: EBADCSRFTOKEN"
```

## Erreurs Courantes

### 1. "Failed to fetch CSRF token"

**Cause:** Session non configurée ou CORS bloquant les cookies

**Solution:**
- Vérifier que `credentials: 'include'` est présent dans toutes les requêtes
- Vérifier CORS `Access-Control-Allow-Credentials: true`
- Vérifier `sameSite: 'none'` dans la config session

### 2. "Invalid CSRF token"

**Cause:** Token expiré ou session détruite

**Solution:**
- Le frontend devrait automatiquement rafraîchir le token (retry logic)
- Vérifier que la session MongoDB est bien sauvegardée

### 3. "Error checking auth"

**Cause:** Session MongoDB non accessible

**Solution:**
- Vérifier `MONGODB_URI` sur Render
- Vérifier que MongoDB Atlas autorise les IPs de Render

## Variables d'Environnement Requises

### Backend (Render)

```env
# Session
SESSION_SECRET=your-long-random-secret-32-chars-minimum
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/luxio

# Frontend
FRONTEND_URL=https://luxios.vercel.app

# JWT (pour auth_token cookie)
JWT_SECRET=your-jwt-secret
```

### Frontend (Vercel)

```env
# API Backend
VITE_API_URL=https://luxio.onrender.com
```

## Sécurité

### ✅ Protection Activée

- ✅ CSRF double-submit pattern
- ✅ Tokens stockés dans la session MongoDB
- ✅ Tokens envoyés via headers (pas query params)
- ✅ SameSite=none + Secure cookies en production
- ✅ Auto-retry sur token expiré

### ⚠️ Routes Exemptées (par Design)

- `/api/auth/signup` - Public endpoint
- `/api/auth/login` - Public endpoint
- `/api/payment/nowpayments-webhook` - Protégé par HMAC signature

### 🔒 Routes Protégées

- `/api/orders/*` - Modifications de commandes
- `/api/payment/*` (sauf webhook) - Paiements
- `/api/auth/change-password` - Changement de mot de passe
- Toutes les autres routes POST/PUT/PATCH/DELETE

---

**Date:** October 18, 2025  
**Status:** ✅ Implemented and Tested  
**Author:** Replit Agent
