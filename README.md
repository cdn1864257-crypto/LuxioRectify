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
- **KingSMTP** pour l'envoi d'emails transactionnels

## 📦 Installation

### Prérequis
- Node.js 20+
- npm ou yarn
- Compte MongoDB Atlas
- Compte KingSMTP pour l'envoi d'emails

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

#### KingSMTP (Envoi d'emails)
```bash
SMTP_HOST=smtp.kingsmtp.com
SMTP_PORT=587
SMTP_USER=votre_username_kingsmtp
SMTP_PASS=votre_password_kingsmtp
EMAIL_FROM=noreply@luxio-shop.eu
ADMIN_EMAIL=support@luxio-shop.eu
```

### 2. Configuration KingSMTP

#### Étape 1 : Créer un compte KingSMTP
1. Créez un compte sur [KingSMTP](https://www.kingsmtp.com/)
2. Accédez à votre tableau de bord

#### Étape 2 : Obtenir les identifiants SMTP

1. Dans votre tableau de bord KingSMTP, trouvez vos identifiants SMTP
2. Notez les informations suivantes :
   - **SMTP Host** : généralement `smtp.kingsmtp.com`
   - **SMTP Port** : `587` (TLS) ou `465` (SSL)
   - **Username** : votre nom d'utilisateur KingSMTP
   - **Password** : votre mot de passe KingSMTP

#### Étape 3 : Configuration Replit

**Pour Replit :**
1. Ouvrez le panneau **Secrets** (icône cadenas)
2. Ajoutez chaque variable :
   - `SMTP_HOST` : `smtp.kingsmtp.com`
   - `SMTP_PORT` : `587`
   - `SMTP_USER` : votre username KingSMTP
   - `SMTP_PASS` : votre password KingSMTP
   - `EMAIL_FROM` : `noreply@luxio-shop.eu`
   - `ADMIN_EMAIL` : `support@luxio-shop.eu`

⚠️ **Important** : Gardez vos identifiants KingSMTP en sécurité et ne les partagez jamais.

### 3. Configuration des emails

Configurez vos adresses email d'expéditeur :
```bash
EMAIL_FROM=noreply@luxio-shop.eu  # Email d'expédition
ADMIN_EMAIL=support@luxio-shop.eu # Email support pour notifications
```

Avantages de KingSMTP :
- Configuration simple et rapide
- Haute délivrabilité
- Support technique réactif
- Tarification flexible

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
POST /api/payment/submit-order     # Soumettre une commande avec codes de paiement (PCS/TransCash)
POST /api/payment/bank-transfer    # Créer une commande par virement bancaire
POST /api/payment/maxelpay-return  # Callback de retour Maxelpay
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

2. **Vérifiez la connexion KingSMTP** :
   - Assurez-vous que vos identifiants sont corrects
   - Vérifiez que le port SMTP est bien 587 ou 465
   - Consultez les logs du backend pour voir les erreurs de connexion

3. **Consultez les logs** :
   - Recherchez les messages d'erreur dans la console backend
   - Vérifiez que KingSMTP est bien configuré

### Erreur de connexion SMTP

Si vous obtenez une erreur de connexion :
- Vérifiez que `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER` et `SMTP_PASS` sont correctement configurés
- Assurez-vous que votre compte KingSMTP est actif
- Vérifiez que vous n'avez pas de pare-feu bloquant le port SMTP

## 📚 Ressources

- [Documentation KingSMTP](https://www.kingsmtp.com/)
- [MongoDB Atlas](https://www.mongodb.com/atlas)
- [Vite Documentation](https://vitejs.dev/)
- [Nodemailer](https://nodemailer.com/)

## 📝 License

MIT

---

**Luxio** - Votre boutique de smartphones et accessoires premium 🚀
