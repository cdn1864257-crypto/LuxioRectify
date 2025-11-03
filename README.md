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

#### OxaPay (Paiement crypto)
```bash
OXAPAY_API_KEY=votre_api_key_oxapay
```

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
Envoyé après soumission d'une commande :
- Récapitulatif des produits commandés
- Montant total
- Méthode de paiement utilisée
- Statut de la commande

#### Email de notification (Admin)
Envoyé en parallèle à l'administrateur :
- Détails complets de la commande
- Informations du client
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
POST /api/payment/bank-transfer      # Créer une commande par virement bancaire
POST /api/payment/oxapay-init        # Initialiser un paiement OxaPay (crypto)
POST /api/payment/oxapay-webhook     # Webhook OxaPay pour notifications
POST /api/payment/oxapay-return      # Callback de retour OxaPay
```

## 💳 Méthodes de paiement

Luxio propose **2 méthodes de paiement** sécurisées :

### 1. 🏦 Virement bancaire

**Détails bancaires** :
- **Bénéficiaire** : Matt Luxio
- **IBAN** : ES6115632626383268707364
- **BIC** : NTSBESM1XXX
- **Référence** : Numéro de commande unique généré automatiquement

**Processus** :
1. Le client sélectionne "Virement bancaire"
2. Un numéro de commande unique est généré
3. La commande est enregistrée avec le statut "En attente de virement"
4. Le client reçoit un email avec les détails du virement
5. L'administrateur reçoit une notification de la nouvelle commande

**Emails envoyés** :
- ✅ **Client** : Confirmation avec détails bancaires et numéro de référence
- ✅ **Admin** : Notification avec détails de la commande à vérifier

### 2. 💰 OxaPay - Paiements Crypto (Recommandé)

**Configuration** :
```bash
OXAPAY_API_KEY=votre_api_key_oxapay
```

**Cryptomonnaies acceptées** :
- Bitcoin (BTC)
- Ethereum (ETH)
- USDT (Tether)
- BNB (Binance Coin)
- Et plus encore...

**Processus** :
1. Le client clique sur "Payer avec OxaPay"
2. La commande est créée avec un `orderReference` unique
3. Le client est redirigé vers la plateforme sécurisée OxaPay
4. Le client choisit sa cryptomonnaie et effectue le paiement
5. OxaPay envoie une notification webhook à notre serveur
6. Le statut de la commande est mis à jour automatiquement

**Sécurité** :
- API Key sécurisée
- Webhook signatures pour vérifier l'authenticité des notifications
- Matching des commandes par `orderReference`
- Redirections sécurisées après paiement

**Emails envoyés** :
- ✅ **Client** : Confirmation de commande avec lien de paiement
- ✅ **Admin** : Notification de nouvelle commande

### Exemple d'utilisation de l'API de paiement

```typescript
// Frontend - Créer une commande par virement bancaire
const response = await fetch('/api/payment/bank-transfer', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    customerEmail: 'client@example.com',
    customerName: 'Jean Dupont',
    totalAmount: 1299.99,
    cartItems: [
      {
        id: 'iphone-17-pro',
        name: 'iPhone 17 Pro',
        price: 1299.99,
        quantity: 1
      }
    ]
  })
});

const data = await response.json();
console.log('Commande créée:', data.orderReference);
```

```typescript
// Frontend - Initialiser un paiement OxaPay
const response = await fetch('/api/payment/oxapay-init', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    customerEmail: 'client@example.com',
    customerName: 'Jean Dupont',
    totalAmount: 1299.99,
    language: 'fr',
    cartItems: [
      {
        id: 'iphone-17-pro',
        name: 'iPhone 17 Pro',
        price: 1299.99,
        quantity: 1
      }
    ]
  })
});

const data = await response.json();
// Rediriger l'utilisateur vers l'URL de paiement OxaPay
window.location.href = data.redirectUrl;
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
