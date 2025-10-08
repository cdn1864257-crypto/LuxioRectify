# Guide de déploiement sur Render 🚀

## Étapes de déploiement

### 1. Préparer votre compte Render

1. Créer un compte sur [render.com](https://render.com)
2. Connecter votre repository GitHub/GitLab

### 2. Créer le service Web

#### Option A : Utiliser render.yaml (Recommandé)
1. Render détectera automatiquement le fichier `render.yaml`
2. Cliquer sur "New" → "Web Service"
3. Sélectionner votre repository
4. Render configurera tout automatiquement

#### Option B : Configuration manuelle
1. Aller sur [dashboard.render.com](https://dashboard.render.com)
2. Cliquer sur "New" → "Web Service"
3. Connecter votre repository Git
4. Configurer comme suit :

**Paramètres de base :**
- **Name:** `luxio-backend` (ou votre choix)
- **Region:** `Frankfurt` (ou plus proche de vos utilisateurs)
- **Branch:** `main` (ou votre branche de production)
- **Runtime:** `Node`
- **Build Command:** `npm install && npm run build:backend`
- **Start Command:** `npm run start:backend`

### 3. Configurer les variables d'environnement

Dans l'onglet "Environment" de votre service Render, ajouter :

#### Variables obligatoires :

```bash
NODE_ENV=production
PORT=10000

# Base de données MongoDB
MONGODB_URI=your_mongodb_connection_string

# Sécurité - Générer des clés aléatoires fortes
JWT_SECRET=votre_secret_jwt_minimum_32_caracteres
ENCRYPTION_KEY=votre_cle_encryption_minimum_32_caracteres

# SendGrid Email
SENDGRID_API_KEY=votre_api_key_sendgrid
SENDGRID_FROM_EMAIL=noreply@votredomaine.com

# NowPayments
NOWPAYMENTS_API_KEY=votre_api_key_nowpayments
NOWPAYMENTS_IPN_SECRET=votre_ipn_secret_nowpayments

# Frontend Vercel URL
FRONTEND_URL=https://votre-frontend.vercel.app
```

#### Générer JWT_SECRET et ENCRYPTION_KEY :

Utiliser Node.js pour générer des clés sécurisées :

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Exécuter cette commande 2 fois pour obtenir JWT_SECRET et ENCRYPTION_KEY.

### 4. Obtenir les credentials

#### MongoDB URI :
- Si vous utilisez MongoDB Atlas : copier la connection string depuis votre cluster
- Format : `mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority`

#### SendGrid :
1. Créer un compte sur [sendgrid.com](https://sendgrid.com)
2. Aller dans Settings → API Keys
3. Créer une nouvelle API Key avec accès "Full Access"
4. Vérifier votre domaine d'envoi et configurer SENDGRID_FROM_EMAIL

#### NowPayments :
1. Créer un compte sur [nowpayments.io](https://nowpayments.io)
2. Aller dans Settings → API Keys
3. Copier l'API Key
4. Configurer l'IPN Secret dans les paramètres IPN

### 5. Déployer

1. Cliquer sur "Create Web Service" ou "Deploy"
2. Render va :
   - Cloner votre repository
   - Installer les dépendances
   - Compiler TypeScript
   - Démarrer le serveur

3. Attendre la fin du déploiement (2-5 minutes)
4. Votre backend sera disponible à : `https://luxio-backend.onrender.com`

### 6. Configurer Vercel (Frontend)

Dans votre projet Vercel, configurer la variable d'environnement :

```bash
VITE_API_URL=https://votre-backend-render.onrender.com
```

Ou dans votre code frontend, remplacer les appels API :

```javascript
// Avant
const API_URL = '/api';

// Après
const API_URL = import.meta.env.VITE_API_URL || 'https://votre-backend-render.onrender.com/api';
```

### 7. Tester le déploiement

1. Accéder à `https://votre-backend-render.onrender.com/`
   - Devrait retourner : `{"status": "ok", "message": "Luxio Backend API is running"}`

2. Tester l'endpoint health :
   - `https://votre-backend-render.onrender.com/api/health`

3. Vérifier les logs Render :
   - Aller dans "Logs" dans le dashboard
   - Vérifier que toutes les configurations sont "Yes"

### 8. Configuration CORS et Cookies

Le backend est déjà configuré pour :
- Accepter les requêtes depuis votre frontend Vercel
- Gérer les cookies avec credentials
- Autoriser les headers nécessaires

### 9. Webhooks NowPayments

Configurer l'URL de webhook dans NowPayments :
```
https://votre-backend-render.onrender.com/api/payment/nowpayments-webhook
```

## Résolution des problèmes

### Le backend ne démarre pas
- Vérifier les logs Render
- S'assurer que toutes les variables d'environnement sont configurées
- Vérifier que PORT=10000 est bien défini

### Erreur "Unexpected end of JSON input"
- Vérifier que FRONTEND_URL est correctement configuré
- Vérifier la configuration CORS
- S'assurer que les cookies sont autorisés

### MongoDB connection failed
- Vérifier que MONGODB_URI est correct
- Autoriser l'IP de Render dans MongoDB Atlas (0.0.0.0/0 pour autoriser toutes les IPs)

### Emails ne s'envoient pas
- Vérifier SENDGRID_API_KEY et SENDGRID_FROM_EMAIL
- Vérifier que le domaine d'envoi est vérifié dans SendGrid

## Plan gratuit Render

Le plan gratuit Render :
- ✅ 750 heures/mois gratuites
- ✅ SSL automatique
- ✅ Déploiement automatique
- ⚠️ Le service s'endort après 15 min d'inactivité (premier appel peut prendre 30-60s)
- ⚠️ Redémarre automatiquement toutes les 90 jours

Pour éviter l'endormissement, utiliser un service de ping comme [UptimeRobot](https://uptimerobot.com) qui appelle votre API toutes les 5 minutes.

## Support

Si vous rencontrez des problèmes :
1. Vérifier les logs Render
2. Vérifier les variables d'environnement
3. Tester chaque endpoint individuellement
4. Contacter le support Render si nécessaire

---

**Votre backend sera accessible à :**
`https://[votre-nom-service].onrender.com`
