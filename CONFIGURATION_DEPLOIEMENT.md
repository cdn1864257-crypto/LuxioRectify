# Configuration du Déploiement

## Problème Résolu

L'erreur "Failed to execute 'json' on 'Response': Unexpected end of JSON input" était causée par le fait que le frontend ne se connectait pas au bon backend.

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

## Fichiers Modifiés

Les fichiers suivants ont été mis à jour pour utiliser `getApiUrl()` :

- `frontend/src/contexts/AuthContext.tsx`
- `frontend/src/components/UserProfile.tsx`
- `frontend/src/pages/Dashboard.tsx`
- `frontend/src/pages/Payment.tsx`
- `frontend/src/pages/NewPayment.tsx`
- `frontend/src/hooks/use-auth.ts`
- `frontend/src/lib/cart.ts`

## Prochaines Étapes

1. ✅ Vérifiez que `VITE_API_URL` est défini sur Vercel
2. ✅ Redéployez l'application Vercel
3. ✅ Testez la connexion sur https://luxios.vercel.app
4. ✅ Vérifiez que le backend Render est accessible
