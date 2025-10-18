# CSRF Fix Summary - October 18, 2025

## ✅ Problème Résolu

L'erreur "Invalid CSRF token" a été corrigée en implémentant une protection CSRF complète entre le frontend (Vercel) et le backend (Render).

## Modifications Effectuées

### 1. Backend - `server/index-render.ts` (Production sur Render)

#### Session Configuration
```typescript
app.use(session({
  secret: process.env.SESSION_SECRET || process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false,
  store: mongoDBStore,  // MongoDB Atlas
  cookie: {
    httpOnly: true,
    secure: true,  // HTTPS uniquement en production
    sameSite: 'none',  // Requis pour cross-origin (Vercel → Render)
    maxAge: 24 * 60 * 60 * 1000  // 24 heures
  }
}));
```

#### CSRF Protection
```typescript
// Configuration CSRF
const csrfProtection = csrf({ 
  cookie: false,  // Utilise la session
  value: (req) => req.headers['x-csrf-token'] || req.body._csrf
});

// Middleware pour génération de token
const csrfTokenGenerator = csrf({ cookie: false });

// Route pour obtenir le token (AVANT les autres routes)
app.get('/api/csrf-token', csrfTokenGenerator, (req: any, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Exemptions CSRF
const exemptRoutes = [
  /^\/api\/csrf-token/,
  /^\/api\/auth\/signup/,
  /^\/api\/auth\/login/,
  /^\/api\/auth\/logout/,
  /^\/api\/payment\/nowpayments-webhook/,
  /^\/api\/payment\/nowpayments-return/,
];
```

#### Error Handlers
```typescript
// 404 Handler - JSON au lieu de HTML
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.path
  });
});

// CSRF Error Handler
app.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    return res.status(403).json({
      error: 'Invalid CSRF token',
      message: 'Session invalide ou token CSRF manquant/incorrect'
    });
  }
  // Autres erreurs...
});
```

### 2. Backend - `server/index.ts` (Développement sur Replit)

Mêmes modifications que `server/index-render.ts` mais avec :
- Session en mémoire (MemoryStore) au lieu de MongoDB
- `secure: false` et `sameSite: 'lax'` pour HTTP local
- Logs de développement

### 3. Frontend - `frontend/src/lib/config.ts`

#### Token Management
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

#### Automatic Token Injection avec Retry
```typescript
export async function fetchWithCsrf(url: string, options: RequestInit = {}): Promise<Response> {
  const token = await getCsrfToken();
  
  const headers = new Headers(options.headers || {});
  
  // Ajoute le token pour POST/PUT/PATCH/DELETE
  if (options.method && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(options.method.toUpperCase())) {
    headers.set('X-CSRF-Token', token);
  }
  
  const response = await fetch(url, { ...options, headers, credentials: 'include' });

  // Auto-retry si le token a expiré
  if (response.status === 403) {
    const errorData = await response.clone().json();
    if (errorData.error === 'Invalid CSRF token') {
      const newToken = await getCsrfToken(true);  // Force refresh
      headers.set('X-CSRF-Token', newToken);
      return fetch(url, { ...options, headers, credentials: 'include' });
    }
  }
  
  return response;
}
```

### 4. Frontend - `frontend/src/contexts/AuthContext.tsx`

#### Initialisation au Démarrage
```typescript
const checkAuth = async () => {
  // Initialise le token CSRF au démarrage
  try {
    await getCsrfToken();
    console.log('CSRF token initialized successfully');
  } catch (csrfError) {
    console.error('Failed to initialize CSRF token:', csrfError);
  }
  
  // Vérifie l'authentification...
};
```

#### Refresh Après Login
```typescript
const login = async (email: string, password: string) => {
  // ... login logic ...
  
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

#### Reset Après Logout
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

## Tests de Vérification

### 1. Test Backend (Render)
```bash
# Obtenir le token CSRF
curl -i https://luxio.onrender.com/api/csrf-token \
  -H "Cookie: connect.sid=YOUR_SESSION_COOKIE"

# Devrait retourner:
# HTTP/1.1 200 OK
# Set-Cookie: connect.sid=...
# { "csrfToken": "..." }
```

### 2. Test Cancel Order avec Token
```bash
curl -X DELETE https://luxio.onrender.com/api/orders/ORDER_ID \
  -H "Cookie: connect.sid=YOUR_SESSION; auth_token=YOUR_JWT" \
  -H "X-CSRF-Token: YOUR_CSRF_TOKEN" \
  -H "Content-Type: application/json"

# Devrait retourner 200 si le token est valide
# Devrait retourner 403 si le token est invalide
```

### 3. Test Frontend (Développement Replit)
```bash
# Tester l'endpoint local
curl -i http://localhost:3001/api/csrf-token

# Devrait retourner:
# HTTP/1.1 200 OK
# Set-Cookie: connect.sid=...
# { "csrfToken": "..." }
```

## Variables d'Environnement

### Backend Render
```env
SESSION_SECRET=your-long-random-secret-32-chars-minimum
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/luxio
FRONTEND_URL=https://luxios.vercel.app
JWT_SECRET=your-jwt-secret
NODE_ENV=production
```

### Frontend Vercel
```env
VITE_API_URL=https://luxio.onrender.com
```

## Routes CSRF

### Routes Exemptées (Pas de CSRF requis)
- ✅ `GET /api/csrf-token` - Génère le token
- ✅ `POST /api/auth/signup` - Inscription publique
- ✅ `POST /api/auth/login` - Login public
- ✅ `POST /api/auth/logout` - Logout (évite les problèmes de session)
- ✅ `POST /api/payment/nowpayments-webhook` - Webhook externe (vérifié par HMAC)
- ✅ `GET /api/payment/nowpayments-return` - Redirection de paiement

### Routes Protégées (CSRF requis)
- 🔒 `DELETE /api/orders/:orderId` - Annuler une commande
- 🔒 `POST /api/payment/submit-order` - Soumettre une commande
- 🔒 `POST /api/payment/bank-transfer` - Paiement par virement
- 🔒 `POST /api/payment/nowpayments-init` - Initialiser paiement crypto
- 🔒 `POST /api/auth/change-password` - Changer le mot de passe
- 🔒 Toutes les autres routes POST/PUT/PATCH/DELETE

## Résultat Attendu

### ✅ Cancel Order
1. User clique "Cancel Order"
2. Frontend récupère le token CSRF stocké en mémoire
3. DELETE /api/orders/:orderId avec header X-CSRF-Token
4. Backend valide le token
5. Commande annulée avec succès

### ✅ Logout
1. User clique "Logout"
2. POST /api/auth/logout (exempt de CSRF)
3. Backend détruit la session MongoDB
4. Cookies `connect.sid` et `auth_token` supprimés
5. Frontend vide localStorage et reset le token CSRF
6. User reste déconnecté après actualisation

### ✅ Login
1. User soumet le formulaire
2. POST /api/auth/login (exempt de CSRF)
3. Backend crée la session et envoie les cookies
4. Frontend rafraîchit automatiquement le token CSRF
5. Token prêt pour les requêtes protégées

## Fichiers Modifiés

- `server/index-render.ts` - Backend production (Render)
- `server/index.ts` - Backend développement (Replit)
- `frontend/src/lib/config.ts` - Gestion token CSRF
- `frontend/src/contexts/AuthContext.tsx` - Initialisation et refresh token
- `CSRF_IMPLEMENTATION_GUIDE.md` - Documentation complète

## Documentation

Voir `CSRF_IMPLEMENTATION_GUIDE.md` pour la documentation complète.

---

**Date:** October 18, 2025  
**Status:** ✅ COMPLETED  
**Testing:** ✅ Backend endpoint functional  
**Deployment:** 🔄 Ready for Render deployment
