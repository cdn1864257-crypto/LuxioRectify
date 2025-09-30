# Luxio - Système d'Authentification MongoDB

Ce projet utilise un système d'authentification complet avec MongoDB Atlas et JWT pour gérer les inscriptions et connexions des utilisateurs.

## 📋 Table des matières

- [Fonctionnalités](#fonctionnalités)
- [Architecture](#architecture)
- [Configuration MongoDB Atlas](#configuration-mongodb-atlas)
- [Variables d'environnement](#variables-denvironnement)
- [Installation locale](#installation-locale)
- [Déploiement sur Vercel](#déploiement-sur-vercel)
- [API Endpoints](#api-endpoints)
- [Sécurité](#sécurité)

## ✨ Fonctionnalités

### Système d'inscription complet
- Formulaire d'inscription avec tous les champs utilisateur
- Validation côté client et serveur
- Hashage sécurisé des mots de passe avec bcrypt (10 rounds)
- Vérification de l'unicité de l'email
- Stockage dans MongoDB Atlas

### Système de connexion sécurisé
- Authentification par email et mot de passe
- Génération de JWT signé avec durée de validité (7 jours)
- Cookie httpOnly et secure pour la session
- Vérification du mot de passe avec bcrypt

### Protection des données
- Mots de passe uniquement stockés hashés (jamais en clair)
- JWT en cookie httpOnly pour éviter les attaques XSS
- Cookies secure en production (HTTPS)
- Validation stricte des données

## 🏗 Architecture

### Backend (API)

```
api/
└── auth/
    ├── signup.ts    # Endpoint d'inscription
    ├── login.ts     # Endpoint de connexion
    └── me.ts        # Endpoint pour récupérer l'utilisateur connecté
```

### Frontend (React)

```
frontend/src/components/
├── SignupForm.tsx   # Formulaire d'inscription complet
├── LoginForm.tsx    # Formulaire de connexion
└── AuthModal.tsx    # Modal d'authentification (login/signup)
```

### Base de données MongoDB

**Collection : `users`**

```javascript
{
  _id: ObjectId,
  firstName: String,      // Prénom
  lastName: String,       // Nom
  country: String,        // Pays
  city: String,          // Ville
  address: String,       // Adresse complète
  phone: String,         // Téléphone
  email: String,         // Email (unique, indexé)
  password: String,      // Mot de passe hashé avec bcrypt
  createdAt: Date,       // Date de création
  updatedAt: Date        // Date de dernière modification
}
```

## 🗄️ Configuration MongoDB Atlas

### Étape 1 : Créer un compte gratuit

1. Allez sur [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Cliquez sur "Try Free" ou "Start Free"
3. Créez un compte avec votre email ou connectez-vous avec Google/GitHub

### Étape 2 : Créer un cluster gratuit (M0)

1. Une fois connecté, cliquez sur "Create a New Cluster"
2. Sélectionnez le plan **M0 Sandbox** (gratuit, 512 MB)
3. Choisissez un provider cloud (AWS, Google Cloud, ou Azure)
4. Sélectionnez la région la plus proche de vos utilisateurs
5. Nommez votre cluster (ex: "luxio-cluster")
6. Cliquez sur "Create Cluster" (création ~5-10 minutes)

### Étape 3 : Configurer l'accès réseau

1. Dans le menu latéral, cliquez sur "Network Access"
2. Cliquez sur "Add IP Address"
3. Sélectionnez "Allow Access from Anywhere" (0.0.0.0/0)
   - ⚠️ En production, limitez aux IPs de vos serveurs
4. Cliquez sur "Confirm"

### Étape 4 : Créer un utilisateur de base de données

1. Dans le menu latéral, cliquez sur "Database Access"
2. Cliquez sur "Add New Database User"
3. Méthode d'authentification : **Password**
4. Remplissez :
   - Username : `luxio_admin` (ou autre)
   - Password : Générez un mot de passe sécurisé
   - ⚠️ **Notez ce mot de passe !** Vous en aurez besoin
5. Database User Privileges : **Read and write to any database**
6. Cliquez sur "Add User"

### Étape 5 : Récupérer l'URL de connexion

1. Retournez sur "Database" dans le menu latéral
2. Cliquez sur "Connect" sur votre cluster
3. Sélectionnez "Connect your application"
4. Driver : **Node.js**, Version : **5.5 or later**
5. Copiez la chaîne de connexion :
   ```
   mongodb+srv://luxio_admin:<password>@cluster.mongodb.net/?retryWrites=true&w=majority
   ```
6. Remplacez `<password>` par le mot de passe de l'utilisateur
7. Ajoutez le nom de la base de données après `.net/` :
   ```
   mongodb+srv://luxio_admin:VOTRE_PASSWORD@cluster.mongodb.net/luxio?retryWrites=true&w=majority
   ```

### Étape 6 : Créer un index sur l'email (optionnel mais recommandé)

1. Dans "Database", cliquez sur "Browse Collections"
2. Après la première inscription, sélectionnez la collection `users`
3. Allez dans l'onglet "Indexes"
4. Cliquez sur "Create Index"
5. Ajoutez : `{ "email": 1 }` avec l'option `unique: true`

## 🔑 Variables d'environnement

### Pour Replit

Les secrets sont déjà configurés dans Replit Secrets :
- `MONGODB_URI` : URL de connexion MongoDB Atlas
- `JWT_SECRET` : Clé secrète pour signer les JWT

### Pour le développement local

Créez un fichier `.env` à la racine du projet :

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/luxio?retryWrites=true&w=majority
JWT_SECRET=votre_secret_jwt_minimum_32_caracteres_aleatoires
NODE_ENV=development
```

Pour générer un JWT_SECRET sécurisé :
```bash
openssl rand -base64 32
```

Ou utilisez un générateur en ligne comme : https://randomkeygen.com/

### Pour Vercel (déploiement)

1. Allez sur [Vercel Dashboard](https://vercel.com)
2. Sélectionnez votre projet
3. Allez dans "Settings" > "Environment Variables"
4. Ajoutez les variables :
   - `MONGODB_URI` : Votre URL MongoDB Atlas
   - `JWT_SECRET` : Votre clé secrète JWT
   - `NODE_ENV` : `production`

## 💻 Installation locale

```bash
# Cloner le projet
git clone <votre-repo>
cd luxio

# Installer les dépendances
npm install
cd frontend && npm install && cd ..

# Créer le fichier .env avec vos variables
# (voir section Variables d'environnement)

# Lancer le serveur de développement
npm run dev
```

L'application sera accessible sur `http://localhost:5000`

## 🚀 Déploiement sur Vercel

### Méthode 1 : Via l'interface Vercel

1. Connectez-vous sur [Vercel](https://vercel.com)
2. Cliquez sur "New Project"
3. Importez votre repository GitHub
4. Configuration du projet :
   - **Framework Preset** : Other
   - **Root Directory** : `./`
   - **Build Command** : `npm run build`
   - **Output Directory** : `dist`
5. Ajoutez les variables d'environnement (voir ci-dessus)
6. Cliquez sur "Deploy"

### Méthode 2 : Via la CLI Vercel

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Ajouter les secrets (première fois uniquement)
vercel env add MONGODB_URI
vercel env add JWT_SECRET

# Redéployer en production
vercel --prod
```

## 🔌 API Endpoints

### POST /api/auth/signup

Inscription d'un nouvel utilisateur.

**Body (JSON)** :
```json
{
  "firstName": "Jean",
  "lastName": "Dupont",
  "country": "France",
  "city": "Paris",
  "address": "123 Rue de la République",
  "phone": "+33 6 12 34 56 78",
  "email": "jean.dupont@example.com",
  "password": "motdepasse123"
}
```

**Réponse succès (201)** :
```json
{
  "message": "Inscription réussie",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "firstName": "Jean",
    "lastName": "Dupont",
    "email": "jean.dupont@example.com",
    ...
  }
}
```

**Erreurs possibles** :
- `400` : Champs manquants ou invalides
- `409` : Email déjà utilisé
- `500` : Erreur serveur

### POST /api/auth/login

Connexion d'un utilisateur existant.

**Body (JSON)** :
```json
{
  "email": "jean.dupont@example.com",
  "password": "motdepasse123"
}
```

**Réponse succès (200)** :
```json
{
  "message": "Connexion réussie",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "firstName": "Jean",
    "lastName": "Dupont",
    "email": "jean.dupont@example.com",
    ...
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Cookie défini** : `auth_token` (httpOnly, secure en production)

**Erreurs possibles** :
- `400` : Email ou mot de passe manquant
- `401` : Email ou mot de passe incorrect
- `500` : Erreur serveur

### GET /api/auth/me

Récupère les informations de l'utilisateur connecté.

**Headers** :
```
Authorization: Bearer <token>
```

Ou cookie `auth_token` présent.

**Réponse succès (200)** :
```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "firstName": "Jean",
    "lastName": "Dupont",
    "email": "jean.dupont@example.com",
    "country": "France",
    "city": "Paris",
    "address": "123 Rue de la République",
    "phone": "+33 6 12 34 56 78",
    "createdAt": "2025-09-30T15:45:00.000Z"
  }
}
```

**Erreurs possibles** :
- `401` : Token manquant ou invalide
- `404` : Utilisateur non trouvé
- `500` : Erreur serveur

## 🔒 Sécurité

### Hashage des mots de passe
- Utilisation de **bcrypt** avec 10 rounds de salting
- Les mots de passe ne sont **jamais** stockés en clair
- Impossible de récupérer le mot de passe original

### JWT (JSON Web Tokens)
- Tokens signés avec une clé secrète forte
- Durée de validité : 7 jours
- Stockés dans des cookies httpOnly pour éviter les attaques XSS
- Cookies secure activés en production (HTTPS uniquement)

### Validation des données
- Validation côté client (React)
- Validation côté serveur (API)
- Vérification de l'unicité de l'email
- Format email vérifié avec regex
- Mot de passe minimum 6 caractères

### Bonnes pratiques
- ✅ Pas de secrets dans le code
- ✅ Variables d'environnement pour les clés sensibles
- ✅ CORS configuré pour la production
- ✅ Gestion appropriée des erreurs
- ✅ Cookies httpOnly et secure
- ✅ Connexion MongoDB avec authentification

## 🧪 Tests

Pour tester l'API avec curl :

```bash
# Inscription
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "country": "France",
    "city": "Paris",
    "address": "123 Test Street",
    "phone": "+33612345678",
    "email": "test@example.com",
    "password": "password123"
  }'

# Connexion
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'

# Vérifier l'utilisateur connecté
curl -X GET http://localhost:5000/api/auth/me \
  -b cookies.txt
```

## 📝 Notes importantes

### MongoDB Atlas - Limites du plan gratuit (M0)
- **Stockage** : 512 MB
- **RAM** : Partagée
- **Connexions simultanées** : 500
- **Pas de sauvegardes automatiques** (pensez à exporter vos données régulièrement)
- Suffisant pour développement et petits projets

### Sécurité en production
1. Limitez l'accès réseau aux IPs de vos serveurs uniquement
2. Utilisez des mots de passe MongoDB très complexes
3. Générez un JWT_SECRET avec au moins 32 caractères aléatoires
4. Activez le HTTPS sur votre domaine
5. Configurez un taux limite (rate limiting) sur les endpoints d'authentification
6. Ajoutez une vérification d'email lors de l'inscription (optionnel)
7. Implémentez une récupération de mot de passe (optionnel)

## 🆘 Support et dépannage

### Erreur "Configuration MongoDB manquante"
➡️ Vérifiez que `MONGODB_URI` est bien défini dans les secrets/variables d'environnement

### Erreur "Configuration JWT manquante"
➡️ Vérifiez que `JWT_SECRET` est bien défini dans les secrets/variables d'environnement

### Impossible de se connecter à MongoDB
➡️ Vérifiez :
- L'URL de connexion est correcte
- Le mot de passe ne contient pas de caractères spéciaux non encodés
- L'accès réseau est autorisé (0.0.0.0/0 ou votre IP)
- L'utilisateur a les permissions nécessaires

### "Email déjà utilisé"
➡️ Normal : un email ne peut être associé qu'à un seul compte

### Token invalide ou expiré
➡️ Le JWT a une durée de vie de 7 jours. Après expiration, l'utilisateur doit se reconnecter.

## 📚 Ressources

- [MongoDB Atlas Documentation](https://www.mongodb.com/docs/atlas/)
- [JWT.io](https://jwt.io/) - Pour décoder et comprendre les JWT
- [bcrypt Documentation](https://github.com/kelektiv/node.bcrypt.js)
- [Vercel Documentation](https://vercel.com/docs)

---

**Développé avec ❤️ pour Luxio**
