# Configuration du Déploiement

## Problèmes Résolus

### 1. Erreur JSON lors de la connexion
L'erreur "Failed to execute 'json' on 'Response': Unexpected end of JSON input" était causée par le fait que le frontend ne se connectait pas au bon backend.

### 2. Déconnexion après actualisation de page
La session ne persistait pas après actualisation car les cookies n'étaient pas configurés pour fonctionner entre domaines différents (cross-domain).

## Architecture

- **Frontend sur Vercel** : https://luxios.vercel.app
- **Backend sur Render** : https://luxio.onrender.com

## Configuration Requise

### 1. Variables d'Environnement Vercel (Frontend)

Dans les paramètres de votre projet Vercel :

```
VITE_API_URL=https://luxio.onrender.com
```

**Important** : Après avoir ajouté cette variable, vous devez **redéployer** votre application Vercel pour que la modification prenne effet.

### 2. Variables d'Environnement Render (Backend)

Dans les paramètres de votre service Render :

```
FRONTEND_URL=https://luxios.vercel.app
NODE_ENV=production
PORT=10000
ENCRYPTION_KEY=votre_clé_de_chiffrement
JWT_SECRET=votre_secret_jwt
MONGODB_URI=votre_uri_mongodb (si utilisé)
NODE_ENV=production
NOWPAYMENTS_API_KEY=votre_clé_nowpayments (si utilisé)
NOWPAYMENTS_IPN_SECRET=votre_secret_ipn (si utilisé)
```

## Pourquoi Ça Marche Maintenant

### Avant (Ne Fonctionnait Pas)

Le frontend faisait des appels API vers des chemins relatifs :
```javascript
fetch('/api/auth/login', ...)  // Sur Vercel, cela devient https://luxios.vercel.app/api/auth/login
```

Le problème : Il n'y a pas de backend sur Vercel !

### Après (Fonctionne)

Le frontend utilise maintenant `getApiUrl()` qui utilise la variable `VITE_API_URL` :
```javascript
fetch(getApiUrl('/api/auth/login'), ...)  // Devient https://luxio.onrender.com/api/auth/login
```

## Comment Vérifier la Configuration

### 1. Vérifiez que VITE_API_URL est défini sur Vercel

Allez dans **Project Settings** → **Environment Variables** et vérifiez que `VITE_API_URL` pointe vers `https://luxio.onrender.com`

### 2. Redéployez sur Vercel

Après avoir ajouté/modifié une variable d'environnement, vous **DEVEZ** redéployer :
- Allez dans l'onglet **Deployments**
- Cliquez sur les 3 points du dernier déploiement
- Sélectionnez **Redeploy**

### 3. Testez la Connexion

1. Ouvrez https://luxios.vercel.app
2. Cliquez sur **Login**
3. Essayez de vous connecter
4. Vous ne devriez plus voir l'erreur JSON

## Développement Local

Pour le développement local, vous n'avez **pas besoin** de définir `VITE_API_URL` car Vite utilise son proxy configuré dans `vite.config.ts` :

```typescript
proxy: {
  '/api': {
    target: 'http://localhost:3001',
    changeOrigin: true,
  },
}
```

## Architecture de Production

```
┌─────────────────┐
│   Utilisateur   │
└────────┬────────┘
         │
         │ HTTPS
         ▼
┌─────────────────────┐
│  Vercel (Frontend)  │
│  luxios.vercel.app  │
└──────────┬──────────┘
           │
           │ API Calls avec
           │ VITE_API_URL
           ▼
┌──────────────────────┐
│  Render (Backend)    │
│  luxio.onrender.com  │
└──────────────────────┘
```

## Configuration des Cookies Cross-Domain

### Le Problème
Quand le frontend (Vercel) et le backend (Render) sont sur des domaines différents, les cookies avec `sameSite: 'lax'` ne sont **pas envoyés** avec les requêtes cross-domain. C'est pourquoi la session ne persistait pas.

### La Solution
Les cookies d'authentification sont maintenant configurés avec :
```javascript
{
  httpOnly: true,              // Sécurité : inaccessible en JavaScript
  secure: true,                // HTTPS uniquement (requis pour sameSite: 'none')
  sameSite: 'none',            // Autorise les cookies cross-domain
  maxAge: 60 * 60 * 24 * 7,   // 7 jours
  path: '/'
}
```

**Note** : En développement local, les cookies utilisent `sameSite: 'lax'` (car frontend et backend sont sur localhost).

### Fichiers Modifiés pour les Cookies
- `api/auth/login.ts` - Cookie avec sameSite: 'none' en production
- `api/auth/signup.ts` - Cookie avec sameSite: 'none' en production

### Fichiers Modifiés pour les Appels API

Les fichiers suivants ont été mis à jour pour utiliser `getApiUrl()` :

- `frontend/src/contexts/AuthContext.tsx`
- `frontend/src/components/UserProfile.tsx`
- `frontend/src/pages/Dashboard.tsx`
- `frontend/src/pages/Payment.tsx`
- `frontend/src/pages/NewPayment.tsx`
- `frontend/src/hooks/use-auth.ts`
- `frontend/src/lib/cart.ts`

## Prochaines Étapes

### ⚠️ IMPORTANT : Redéployez le Backend sur Render

Les fichiers de cookies ont été modifiés (`api/auth/login.ts` et `api/auth/signup.ts`). Vous **DEVEZ** redéployer le backend sur Render pour que les changements prennent effet :

1. Allez sur votre dashboard Render
2. Sélectionnez votre service backend (luxio.onrender.com)
3. Cliquez sur **Manual Deploy** → **Deploy latest commit**
4. Attendez que le déploiement soit terminé

### Puis sur Vercel (si pas déjà fait)

1. ✅ Vérifiez que `VITE_API_URL=https://luxio.onrender.com` est défini sur Vercel
2. ✅ Redéployez l'application Vercel si la variable a changé

### Test Final

1. Ouvrez https://luxios.vercel.app
2. Connectez-vous avec vos identifiants
3. ✅ **Actualisez la page (F5)** - vous devriez rester connecté !
4. La session devrait persister même après actualisation
