# Luxio - Plateforme E-Commerce Premium

Plateforme e-commerce moderne pour la vente de smartphones, smartwatches, sneakers et gadgets high-tech premium.

## 🚀 Technologies

### Frontend
- **React 18** avec TypeScript
- **Vite** pour le build et le développement
- **Tailwind CSS** + shadcn/ui pour le design
- **Wouter** pour le routing
- **TanStack React Query** pour la gestion des données

### Backend
- **Express.js** pour l'API REST
- **MongoDB Atlas** pour la base de données
- **JWT** pour l'authentification
- **bcrypt** pour le hashage des mots de passe
- **AWS SES** pour l'envoi d'emails transactionnels

## 📦 Installation

### Prérequis
- Node.js 20+
- npm ou yarn
- Compte MongoDB Atlas
- Compte AWS avec accès à SES

### Installation des dépendances

```bash
# Dépendances root
npm install

# Dépendances frontend
cd frontend && npm install
```

## ⚙️ Configuration

### 1. Variables d'environnement

Créez les variables d'environnement suivantes dans Replit Secrets ou dans un fichier `.env` :

#### Base de données
```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/luxio
JWT_SECRET=votre_secret_jwt_minimum_32_caracteres
```

#### Amazon SES (Envoi d'emails)
```bash
AWS_SES_ACCESS_KEY=votre_access_key_aws
AWS_SES_SECRET_KEY=votre_secret_key_aws
AWS_SES_REGION=us-east-1
EMAIL_FROM=noreply@luxio-shop.com
ADMIN_EMAIL=admin@luxio-shop.com
```

### 2. Configuration Amazon SES

#### Étape 1 : Créer un compte AWS
1. Créez un compte sur [AWS Console](https://aws.amazon.com/console/)
2. Accédez au service **Amazon SES**

#### Étape 2 : Vérifier votre adresse email (Mode Sandbox)

En mode sandbox (par défaut), vous ne pouvez envoyer des emails qu'à des adresses vérifiées :

1. Dans Amazon SES, allez dans **Verified identities**
2. Cliquez sur **Create identity**
3. Sélectionnez **Email address**
4. Entrez votre email (ex: `noreply@luxio-shop.com`)
5. Cliquez sur **Create identity**
6. Vérifiez l'email reçu dans votre boîte mail

**Note :** Répétez cette opération pour chaque adresse email de test.

#### Étape 3 : Vérifier un domaine (Production)

Pour envoyer des emails à n'importe quelle adresse :

1. Dans **Verified identities**, cliquez sur **Create identity**
2. Sélectionnez **Domain**
3. Entrez votre domaine (ex: `luxio-shop.com`)
4. Cochez **Generate DKIM settings**
5. Suivez les instructions pour ajouter les enregistrements DNS :
   - Ajoutez les enregistrements DKIM dans votre DNS
   - Ajoutez l'enregistrement MX si nécessaire
6. Attendez la validation (peut prendre 24-48h)

#### Étape 4 : Sortir du mode Sandbox

1. Dans le menu SES, allez dans **Account dashboard**
2. Sous **Sending statistics**, cliquez sur **Request production access**
3. Remplissez le formulaire :
   - **Use case description** : Décrivez votre usage (ex: "E-commerce transactional emails for order confirmations and user notifications")
   - **Website URL** : Votre site web
   - **Email sending rate** : Estimez votre volume (ex: 100-500 emails/jour)
4. Soumettez la demande (validation sous 24h généralement)

#### Étape 5 : Créer des clés d'accès IAM

1. Dans AWS Console, allez dans **IAM** (Identity and Access Management)
2. Cliquez sur **Users** → **Create user**
3. Nom d'utilisateur : `luxio-ses-sender`
4. Cochez **Programmatic access**
5. Permissions : Attachez la policy **AmazonSESFullAccess**
6. Créez l'utilisateur et **sauvegardez les clés** :
   - `Access Key ID` → `AWS_SES_ACCESS_KEY`
   - `Secret Access Key` → `AWS_SES_SECRET_KEY`

⚠️ **Important** : Sauvegardez ces clés immédiatement, elles ne seront plus accessibles après.

#### Étape 6 : Configuration Replit/Vercel

**Pour Replit :**
1. Ouvrez le panneau **Secrets** (icône cadenas)
2. Ajoutez chaque variable :
   - `AWS_SES_ACCESS_KEY`
   - `AWS_SES_SECRET_KEY`
   - `AWS_SES_REGION` (ex: `us-east-1`)
   - `EMAIL_FROM` (votre email vérifié)
   - `ADMIN_EMAIL` (email de l'admin pour les notifications)

**Pour Vercel :**
```bash
vercel env add AWS_SES_ACCESS_KEY
vercel env add AWS_SES_SECRET_KEY
vercel env add AWS_SES_REGION
vercel env add EMAIL_FROM
vercel env add ADMIN_EMAIL
```

### 3. Passer d'un email générique à un email professionnel

#### Option 1 : Email générique (Gmail, Yahoo, etc.)

Pour commencer rapidement en mode développement :
```bash
EMAIL_FROM=noreply@gmail.com
```

Limitations :
- Doit être vérifié dans SES
- Peut avoir des problèmes de délivrabilité
- Moins professionnel

#### Option 2 : Email avec domaine personnalisé (Recommandé)

Une fois votre domaine vérifié dans SES :

1. **Achetez un nom de domaine** (ex: `luxio-shop.com`)
   - Chez Namecheap, GoDaddy, OVH, etc.

2. **Configurez les DNS pour SES** (voir Étape 3 ci-dessus)

3. **Utilisez votre domaine dans les emails :**
   ```bash
   EMAIL_FROM=contact@luxio-shop.com
   ADMIN_EMAIL=admin@luxio-shop.com
   ```

Avantages :
- Plus professionnel
- Meilleure délivrabilité
- Confiance des utilisateurs
- Personnalisation complète

## 🚀 Développement

### Démarrer le serveur de développement

```bash
# Démarre backend (port 3001) + frontend (port 5000)
npm run dev
```

Le backend API sera disponible sur `http://localhost:3001`  
Le frontend sera disponible sur `http://localhost:5000`

### Structure des emails

#### Email de bienvenue (Inscription)
Envoyé automatiquement après une inscription réussie :
- Sujet : "Bienvenue sur Luxio 🎉"
- Contenu : Message de bienvenue personnalisé avec le prénom de l'utilisateur
- CTA : Bouton "Découvrir nos offres"

#### Email de confirmation de commande (Client)
Envoyé après soumission du formulaire de paiement :
- Récapitulatif du produit commandé
- Montant total payé
- Type de code de paiement (TransCash ou PCS)
- Liste des codes fournis
- Statut : En attente de validation

#### Email de notification (Admin)
Envoyé en parallèle à l'administrateur :
- Détails complets de la commande
- Informations du client
- Codes de paiement à valider
- ID de commande pour suivi

### API Endpoints

#### Authentification
```bash
POST /api/auth/signup       # Inscription
POST /api/auth/login        # Connexion
POST /api/auth/logout       # Déconnexion
GET  /api/auth/me           # Récupérer l'utilisateur connecté
```

#### Paiements
```bash
POST /api/payment/submit-order  # Soumettre une commande avec codes de paiement
```

### Exemple d'utilisation de l'API de paiement

```typescript
// Frontend - Soumettre une commande
const response = await fetch('/api/payment/submit-order', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    customerEmail: 'client@example.com',
    customerName: 'Jean Dupont',
    productId: 'iphone-17-pro',
    productName: 'iPhone 17 Pro',
    productModel: '256GB Titanium',
    productPrice: 1299.99,
    totalAmount: 1299.99,
    codeType: 'TransCash', // ou 'PCS'
    codes: ['CODE123456', 'CODE789012']
  })
});

const data = await response.json();
console.log('Commande créée:', data.orderId);
```

### Tester l'envoi d'emails localement

```typescript
// Exemple dans un fichier de test
import { sendWelcomeEmail, sendOrderConfirmationToCustomer } from './utils/email';

// Test email de bienvenue
await sendWelcomeEmail('test@example.com', 'Jean');

// Test email de commande
await sendOrderConfirmationToCustomer({
  orderId: 'TEST-001',
  customerEmail: 'test@example.com',
  customerName: 'Jean Dupont',
  productName: 'iPhone 17 Pro',
  productModel: '256GB',
  productPrice: 1299.99,
  totalAmount: 1299.99,
  codeType: 'TransCash',
  codes: ['CODE123', 'CODE456']
});
```

## 📧 Fonctions d'envoi d'emails disponibles

### `sendEmail(options)`
Fonction générique pour envoyer un email :
```typescript
await sendEmail({
  to: 'destinataire@example.com',
  subject: 'Sujet de l\'email',
  html: '<h1>Contenu HTML</h1>',
  text: 'Contenu texte brut',
  from: 'expediteur@luxio-shop.com' // Optionnel
});
```

### `sendWelcomeEmail(userEmail, firstName)`
Envoie l'email de bienvenue après inscription.

### `sendOrderConfirmationToCustomer(orderDetails)`
Envoie la confirmation de commande au client.

### `sendOrderNotificationToAdmin(orderDetails)`
Notifie l'admin d'une nouvelle commande.

## 🔒 Sécurité

### Bonnes pratiques
- ✅ Toutes les clés AWS stockées dans Secrets (jamais dans le code)
- ✅ Mots de passe hashés avec bcrypt (10 rounds)
- ✅ JWT avec httpOnly cookies
- ✅ Validation des données côté backend
- ✅ CORS configuré pour le développement
- ✅ Emails avec fallback texte brut (anti-spam)

### Ne jamais exposer
```bash
# ❌ JAMAIS dans le code
const AWS_KEY = "AKIAIOSFODNN7EXAMPLE";

# ✅ TOUJOURS via variables d'environnement
const AWS_KEY = process.env.AWS_SES_ACCESS_KEY;
```

## 🏗️ Build & Déploiement

### Build pour production
```bash
npm run build
```

Le build sera créé dans le dossier `dist/`.

### Démarrer en production
```bash
npm run start
```

### Déploiement Vercel
```bash
vercel --prod
```

Assurez-vous d'avoir configuré toutes les variables d'environnement dans Vercel Dashboard.

## 🐛 Troubleshooting

### Les emails ne sont pas envoyés

1. **Vérifiez les variables d'environnement** :
   ```bash
   echo $AWS_SES_ACCESS_KEY
   echo $EMAIL_FROM
   ```

2. **Vérifiez que l'email expéditeur est vérifié dans SES** :
   - Mode sandbox : L'email `EMAIL_FROM` doit être vérifié
   - Production : Votre domaine doit être vérifié

3. **Consultez les logs** :
   ```bash
   # Vérifiez les erreurs dans les logs du backend
   ```

4. **Testez les credentials AWS** :
   ```bash
   # Utilisez AWS CLI pour tester
   aws ses verify-email-identity --email-address test@example.com --region us-east-1
   ```

### Erreur "Email address not verified"

Vous êtes en mode sandbox. Vérifiez toutes les adresses email dans SES ou demandez l'accès production.

### Limite de taux dépassée

SES a des limites d'envoi :
- Mode sandbox : 200 emails/jour
- Production : Dépend de votre demande (augmente progressivement)

## 📚 Ressources

- [Documentation AWS SES](https://docs.aws.amazon.com/ses/)
- [AWS SDK for JavaScript v3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/)
- [MongoDB Atlas](https://www.mongodb.com/atlas)
- [Vite Documentation](https://vitejs.dev/)

## 📝 License

MIT

---

**Luxio** - Votre boutique de smartphones et accessoires premium 🚀
