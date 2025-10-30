# Variables d'environnement pour Render 🔐

## Liste complète des variables à configurer

### 1. Configuration de base

| Variable | Valeur | Description |
|----------|--------|-------------|
| `NODE_ENV` | `production` | Mode de production |
| `PORT` | `10000` | Port du serveur (auto-détecté par Render) |

### 2. Base de données MongoDB

| Variable | Exemple | Où l'obtenir |
|----------|---------|--------------|
| `MONGODB_URI` | `mongodb+srv://user:pass@cluster.mongodb.net/luxio?retryWrites=true&w=majority` | MongoDB Atlas → Connect → Drivers |

**Comment obtenir :**
1. Aller sur [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Créer un cluster gratuit
3. Database Access → Add Database User
4. Network Access → Add IP Address → Allow Access from Anywhere (0.0.0.0/0)
5. Database → Connect → Drivers → Copy connection string
6. Remplacer `<password>` par votre mot de passe
7. Remplacer `<database>` par `luxio`

### 3. Sécurité et authentification

| Variable | Comment générer | Commande |
|----------|-----------------|----------|
| `JWT_SECRET` | Clé aléatoire 32+ caractères | `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `ENCRYPTION_KEY` | Clé aléatoire 32+ caractères | `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |

**Exemple de génération :**
```bash
# Dans votre terminal local
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
# Résultat : 8f7d9c2e1a5b3f6d4e8c9a2b1f5d7e3c9a2b1f5d7e3c8f7d9c2e1a5b3f6d4e8c
```

### 4. SendGrid (Email)

| Variable | Exemple | Où l'obtenir |
|----------|---------|--------------|
| `SENDGRID_API_KEY` | `SG.xxxxxxxxxxxxxxxx.yyyyyyyyyyyyyyyyyyyy` | SendGrid Dashboard → Settings → API Keys |
| `SENDGRID_FROM_EMAIL` | `noreply@votredomaine.com` | Email vérifié dans SendGrid |

**Comment obtenir :**
1. Créer un compte sur [sendgrid.com](https://sendgrid.com) (gratuit jusqu'à 100 emails/jour)
2. Dashboard → Settings → API Keys → Create API Key
3. Nom : "Luxio Backend"
4. Permissions : "Full Access"
5. Copier la clé (elle ne sera affichée qu'une fois !)
6. Settings → Sender Authentication → Verify a Single Sender
7. Remplir le formulaire avec votre email
8. Confirmer l'email reçu
9. Utiliser cet email pour `SENDGRID_FROM_EMAIL`

### 5. NowPayments (Paiements crypto)

| Variable | Exemple | Où l'obtenir |
|----------|---------|--------------|
| `NOWPAYMENTS_API_KEY` | `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` | NowPayments Dashboard → Settings → API Keys |
| `NOWPAYMENTS_IPN_SECRET` | `your_ipn_secret_key` | NowPayments Dashboard → Settings → IPN Settings |
| `NOWPAYMENTS_MODE` | `Sandbox` ou `Production` | Choix manuel (utilisez "Sandbox" pour les tests) |
| `NOWPAYMENTS_TEST_URL` | `https://api-sandbox.nowpayments.io/v1` | URL fixe pour sandbox |
| `NOWPAYMENTS_LIVE_URL` | `https://api.nowpayments.io/v1` | URL fixe pour production |

**Comment obtenir :**

**Pour le SANDBOX (tests sans argent réel) :**
1. Créer un compte sur [account-sandbox.nowpayments.io](https://account-sandbox.nowpayments.io)
2. Dashboard → Settings → API
3. Générer une nouvelle API Key SANDBOX
4. Copier l'API Key
5. IPN Settings → Enable IPN
6. IPN Callback URL : `https://votre-backend.onrender.com/api/payment/nowpayments-webhook`
7. Générer et copier l'IPN Secret
8. Définir `NOWPAYMENTS_MODE=Sandbox`

**Pour la PRODUCTION (argent réel) :**
1. Créer un compte sur [nowpayments.io](https://nowpayments.io)
2. Suivre les mêmes étapes avec l'API de production
3. Définir `NOWPAYMENTS_MODE=Production`

**⚠️ IMPORTANT** : 
- L'URL webhook correcte est : `/api/payment/nowpayments-webhook`
- Ne pas utiliser `/nowpayments/webhook`

### 6. URLs Frontend et Backend ⚠️ IMPORTANT

| Variable | Exemple | Description | Obligatoire |
|----------|---------|-------------|-------------|
| `FRONTEND_URL` | `https://luxios.vercel.app` | URL complète de votre frontend Vercel | ✅ OUI |
| `BACKEND_URL` | `https://luxio.onrender.com` | URL complète de votre backend Render | ✅ OUI |

**⚠️ CRITIQUE pour NowPayments** : La variable `BACKEND_URL` est **OBLIGATOIRE** pour que les paiements NowPayments fonctionnent correctement. Sans elle, les redirections après paiement échoueront.

**Comment obtenir :**
1. **Frontend** : Déployer votre frontend sur Vercel → Copier l'URL (ex: `https://luxios.vercel.app`)
2. **Backend** : Déployer votre backend sur Render → Copier l'URL du service (ex: `https://luxio.onrender.com`)

**⚠️ ATTENTION** : Ces deux URLs doivent être configurées sur Render AVANT le premier paiement NowPayments

## Récapitulatif : Ordre de configuration

### Étape 1 : Préparer les services externes
1. ✅ Créer base MongoDB Atlas → Obtenir `MONGODB_URI`
2. ✅ Créer compte SendGrid → Obtenir `SENDGRID_API_KEY` et `SENDGRID_FROM_EMAIL`
3. ✅ Créer compte NowPayments → Obtenir `NOWPAYMENTS_API_KEY` et `NOWPAYMENTS_IPN_SECRET`
4. ✅ Déployer frontend sur Vercel → Obtenir `FRONTEND_URL`
5. ✅ Déployer backend sur Render → Obtenir `BACKEND_URL` (⚠️ NOUVEAU - OBLIGATOIRE)

### Étape 2 : Générer les secrets
```bash
# JWT_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# ENCRYPTION_KEY
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Étape 3 : Configurer Render
1. Créer le service Web sur Render
2. Ajouter TOUTES les variables d'environnement
3. Déployer

### Étape 4 : Configurer les webhooks
1. NowPayments IPN URL : `https://votre-backend.onrender.com/api/payment/nowpayments-webhook`
2. Vérifier que l'IPN Secret correspond à la variable d'environnement

## Exemple complet de configuration Render

```env
# Base
NODE_ENV=production
PORT=10000

# MongoDB
MONGODB_URI=mongodb+srv://luxio_user:Abc123456@cluster0.xxxxx.mongodb.net/luxio?retryWrites=true&w=majority

# Sécurité
JWT_SECRET=8f7d9c2e1a5b3f6d4e8c9a2b1f5d7e3c9a2b1f5d7e3c8f7d9c2e1a5b3f6d4e8c
ENCRYPTION_KEY=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f

# SendGrid
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxx.yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
SENDGRID_FROM_EMAIL=noreply@luxio-shop.com

# NowPayments (Sandbox)
NOWPAYMENTS_API_KEY=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
NOWPAYMENTS_IPN_SECRET=your_ipn_secret_here
NOWPAYMENTS_MODE=Sandbox
NOWPAYMENTS_TEST_URL=https://api-sandbox.nowpayments.io/v1
NOWPAYMENTS_LIVE_URL=https://api.nowpayments.io/v1

# Frontend et Backend
FRONTEND_URL=https://luxios.vercel.app
BACKEND_URL=https://luxio.onrender.com
```

**Pour passer en PRODUCTION** : Changez `NOWPAYMENTS_MODE=Production` et utilisez votre clé API de production.

## Vérification après déploiement

### 1. Tester le backend
```bash
curl https://votre-backend.onrender.com/
# Réponse attendue : {"status":"ok","message":"Luxio Backend API is running",...}
```

### 2. Vérifier les logs
- Aller dans Render Dashboard → Votre service → Logs
- Vérifier ces lignes :
  ```
  ✅ Backend API Server running on port 10000
     Environment: production
     Frontend URL: https://luxio-shop.vercel.app
     MongoDB URI configured: Yes
     JWT Secret configured: Yes
     SendGrid configured: Yes
     NowPayments configured: Yes
  ```

### 3. Tester les endpoints
```bash
# Health check
curl https://votre-backend.onrender.com/api/health

# Test login (devrait retourner une erreur si pas de compte)
curl -X POST https://votre-backend.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test"}'
```

## Problèmes courants

### ❌ MongoDB connection failed
**Solution :** Vérifier que l'IP 0.0.0.0/0 est autorisée dans MongoDB Atlas → Network Access

### ❌ SendGrid API key invalid
**Solution :** Régénérer une nouvelle API key avec "Full Access" permissions

### ❌ CORS error from frontend
**Solution :** Vérifier que `FRONTEND_URL` correspond EXACTEMENT à l'URL Vercel (avec https://)

### ❌ NowPayments webhook not working
**Solution :** 
1. Vérifier que l'URL IPN est correcte
2. S'assurer que `NOWPAYMENTS_IPN_SECRET` correspond au secret configuré dans NowPayments

## Support

En cas de problème :
1. ✅ Vérifier les logs Render
2. ✅ Vérifier que TOUTES les variables sont configurées
3. ✅ Tester chaque service individuellement (MongoDB, SendGrid, etc.)
4. ✅ Contacter le support du service concerné si problème spécifique
