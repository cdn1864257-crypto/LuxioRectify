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
- **SendGrid SMTP** pour l'envoi d'emails transactionnels

## 📦 Installation

### Prérequis
- Node.js 20+
- npm ou yarn
- Compte MongoDB Atlas
- Compte SendGrid pour l'envoi d'emails

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

#### SendGrid SMTP (Envoi d'emails)
```bash
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=votre_cle_api_sendgrid
EMAIL_FROM=support@luxiomarket.shop
ADMIN_EMAIL=support@luxiomarket.shop
```

#### Maxelpay (Paiement en ligne)
```bash
MAXELPAY_MERCHANT_ID=votre_merchant_id_maxelpay
MAXELPAY_API_KEY=votre_api_key_maxelpay
```

#### Sécurité
```bash
ENCRYPTION_KEY=votre_cle_de_chiffrement_minimum_32_caracteres
```

⚠️ **Important** : La clé de chiffrement `ENCRYPTION_KEY` est utilisée pour sécuriser les codes de paiement PCS/Transcash stockés en base de données. Utilisez une clé forte et ne la partagez jamais.

### 2. Configuration SendGrid SMTP

#### Étape 1 : Créer un compte SendGrid
1. Créez un compte sur [SendGrid](https://sendgrid.com/)
2. Accédez à votre tableau de bord

#### Étape 2 : Obtenir la clé API

1. Dans votre tableau de bord SendGrid, allez dans Settings > API Keys
2. Créez une nouvelle clé API avec les permissions d'envoi d'emails
3. Copiez la clé API (elle ne sera affichée qu'une seule fois)

#### Étape 3 : Configuration Replit

**Pour Replit :**
1. Ouvrez le panneau **Secrets** (icône cadenas)
2. Ajoutez chaque variable :
   - `SMTP_HOST` : `smtp.sendgrid.net`
   - `SMTP_PORT` : `587`
   - `SMTP_USER` : `apikey`
   - `SMTP_PASS` : votre clé API SendGrid
   - `EMAIL_FROM` : `support@luxiomarket.shop`
   - `ADMIN_EMAIL` : `support@luxiomarket.shop`

⚠️ **Important** : Gardez votre clé API SendGrid en sécurité et ne la partagez jamais.

### 3. Configuration des emails

Configurez vos adresses email d'expéditeur :
```bash
EMAIL_FROM=support@luxiomarket.shop  # Email d'expédition
ADMIN_EMAIL=support@luxiomarket.shop # Email support pour notifications
```

Avantages de SendGrid :
- Haute délivrabilité
- API simple et documentation complète
- Statistiques d'envoi détaillées
- Plan gratuit disponible (100 emails/jour)

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
POST /api/payment/submit-order       # Soumettre une commande avec codes de paiement (PCS/TransCash)
POST /api/payment/bank-transfer      # Créer une commande par virement bancaire
POST /api/payment/maxelpay-init      # Initialiser un paiement Maxelpay
POST /api/payment/maxelpay-return    # Callback de retour Maxelpay
```

## 💳 Méthodes de paiement

Luxio propose **3 méthodes de paiement** sécurisées :

### 1. 🏦 Virement bancaire

**Détails bancaires** :
- **Bénéficiaire** : Matt Luxio
- **IBAN** : ES6115632626383268707364
- **BIC** : NTSBESM1XXX
- **Référence** : Numéro de commande unique généré automatiquement

**Processus** :
1. Le client sélectionne "Virement bancaire"
2. Un numéro de commande unique est généré (ex: LX-1730673481234-ABC123)
3. La commande est enregistrée avec le statut "En attente de virement"
4. Le client reçoit un email avec les détails du virement
5. L'administrateur reçoit une notification de la nouvelle commande

**Emails envoyés** :
- ✅ **Client** : Confirmation avec détails bancaires et numéro de référence
- ✅ **Admin** : Notification avec détails de la commande à vérifier

### 2. 💳 Maxelpay (Recommandé)

**Configuration** :
```bash
MAXELPAY_MERCHANT_ID=votre_merchant_id
MAXELPAY_API_KEY=votre_api_key
```

**Processus** :
1. Le client clique sur "Payer avec Maxelpay"
2. La commande est créée avec un `orderReference` unique
3. Le client est redirigé vers la plateforme sécurisée Maxelpay
4. Après paiement, Maxelpay redirige vers `/api/payment/maxelpay-return`
5. Le statut de la commande est mis à jour automatiquement

**Sécurité** :
- API Key incluse dans chaque requête
- Matching des commandes par `orderReference` (pas par ID)
- Webhook de retour sécurisé

### 3. 🎫 Tickets PCS/Transcash

**Sécurité** :
```bash
ENCRYPTION_KEY=votre_cle_minimum_32_caracteres_aleatoire
```

⚠️ **Important** : Les codes PCS/Transcash sont **chiffrés avec AES-256** avant stockage en base de données. La clé `ENCRYPTION_KEY` est **obligatoire** et doit être :
- Au minimum 32 caractères
- Générée aléatoirement
- Gardée secrète (jamais commitée dans Git)

**Processus** :
1. Le client sélectionne le type de ticket (PCS ou Transcash)
2. Le montant total est calculé automatiquement
3. Le client saisit les codes de paiement
4. Les codes sont **chiffrés** avant stockage en base de données
5. La commande est créée avec le statut "En attente de validation"

**Emails envoyés** :
- ✅ **Client** : Confirmation de soumission avec récapitulatif
- ✅ **Support** : Notification avec codes chiffrés à valider

**Chiffrement** :
```typescript
// Les codes sont automatiquement chiffrés
import { encryptCode, decryptCode } from './utils/encryption';

const encrypted = encryptCode('CODE123456'); // Stocké en base
const original = decryptCode(encrypted);      // Récupéré pour validation
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
- ✅ Toutes les clés SMTP stockées dans Secrets (jamais dans le code)
- ✅ Mots de passe hashés avec bcrypt (10 rounds)
- ✅ JWT avec httpOnly cookies
- ✅ Validation des données côté backend
- ✅ CORS configuré pour le développement
- ✅ Emails avec fallback texte brut (anti-spam)

### Ne jamais exposer
```bash
# ❌ JAMAIS dans le code
const SMTP_PASS = "mon_mot_de_passe_secret";

# ✅ TOUJOURS via variables d'environnement
const SMTP_PASS = process.env.SMTP_PASS;
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
   echo $SMTP_HOST
   echo $SMTP_USER
   echo $EMAIL_FROM
   ```

2. **Vérifiez la connexion SMTP** :
   - Assurez-vous que votre clé API SendGrid est correcte
   - Vérifiez que le port SMTP est bien 587
   - Consultez les logs du backend pour voir les erreurs de connexion

3. **Consultez les logs** :
   - Recherchez les messages d'erreur dans la console backend
   - Vérifiez que SendGrid SMTP est bien configuré

### Erreur de connexion SMTP

Si vous obtenez une erreur de connexion :
- Vérifiez que `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER` et `SMTP_PASS` sont correctement configurés
- Assurez-vous que votre clé API SendGrid est active et a les bonnes permissions
- Vérifiez que vous n'avez pas de pare-feu bloquant le port SMTP

## 📚 Ressources

- [Documentation SendGrid](https://sendgrid.com/docs/)
- [MongoDB Atlas](https://www.mongodb.com/atlas)
- [Vite Documentation](https://vitejs.dev/)
- [Nodemailer](https://nodemailer.com/)

## 📝 License

MIT

---

**Luxio** - Votre boutique de smartphones et accessoires premium 🚀
