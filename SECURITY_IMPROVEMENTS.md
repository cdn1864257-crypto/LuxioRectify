# Améliorations de Sécurité - Luxio E-Commerce

Ce document décrit toutes les améliorations de sécurité implémentées pour sécuriser et optimiser le site luxiomarket.shop.

## 1. Webhooks Sécurisés (NowPayments & Stripe)

### ✅ Implémenté

**Fichier**: `utils/webhook-security.ts`

- **Déduplication**: Cache en mémoire (1 heure) pour éviter le traitement multiple des webhooks
- **Protection Replay Attack**: Validation du timestamp avec tolérance de 5 minutes
- **Whitelist IP**: Liste blanche des IPs NowPayments autorisées
- **Verification Signature**:
  - NowPayments: HMAC SHA-512 avec IPN_SECRET
  - Stripe: Verification native via `stripe.webhooks.constructEvent()`

**Endpoints**:
- `/api/payment/nowpayments-webhook`: Sécurisé avec IP whitelist + signature + déduplication
- `/api/payment/stripe-webhook`: Nouveau handler avec vérification signature Stripe

### Configuration Render/Vercel

**Variables d'environnement requises**:
```env
NOWPAYMENTS_IPN_SECRET=votre_secret_ipn
STRIPE_WEBHOOK_SECRET=whsec_votre_secret
```

## 2. Protection CSRF Améliorée

### ✅ Implémenté

**Fichier**: `frontend/src/lib/config.ts`

- **Rotation Automatique**: Tokens CSRF renouvelés toutes les 15 minutes
- **Persistance**: Stockage en localStorage avec fallback en mémoire
- **Protection Boucle Infinie**: Maximum 1 retry en cas d'échec
- **Validation**: Vérification côté serveur pour toutes les requêtes POST/PUT/PATCH/DELETE

### Utilisation

```typescript
import { fetchWithCsrf } from '@/lib/config';

// Le token CSRF est automatiquement ajouté
const response = await fetchWithCsrf('/api/endpoint', {
  method: 'POST',
  body: JSON.stringify(data)
});
```

## 3. Rate Limiting Hybride (IP + User ID)

### ✅ Implémenté

**Fichier**: `utils/hybrid-rate-limiter.ts`

- **Rate Limiting IP**: 100 req/15min (général), 5 req/15min (auth)
- **Rate Limiting User**: 200 req/15min (général), 10 req/15min (auth)
- **Headers Informatifs**: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`
- **Retry-After**: Header indiquant quand réessayer

### Configuration

```typescript
// Général (pour tous les endpoints)
app.use(hybridGeneralLimiter.middleware());

// Authentification (endpoints sensibles)
app.use('/api/auth/*', hybridAuthLimiter.middleware());
```

## 4. Gestion Sécurisée des Secrets

### ✅ Implémenté

**Fichier**: `utils/secrets-manager.ts`

- **Versioning**: Jusqu'à 3 versions de chaque secret maintenues
- **Rotation**: Fonction `rotateJWTSecret()` et `rotateEncryptionKey()`
- **Protection Logs**: Fonction `sanitizeForLogging()` masque automatiquement les secrets
- **Validation Multi-Version**: Vérifie tokens JWT avec anciennes versions pendant rotation

### Utilisation

```typescript
import { getJWTSecret, sanitizeForLogging } from './utils/secrets-manager';

// Récupérer le secret actuel
const jwtSecret = getJWTSecret();

// Logger de manière sécurisée
console.log('User data:', sanitizeForLogging(userData));
// Résultat: { name: "John", password: "***REDACTED***" }
```

### Rotation des Secrets

```bash
# Générer un nouveau secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Ajouter comme nouvelle variable d'environnement
# L'ancien secret reste valide pendant la transition
```

## 5. MongoDB Connection Pooling

### ✅ Implémenté

**Fichier**: `utils/mongodb-pool.ts`

- **Connection Pooling**: 2-10 connexions simultanées
- **Timeouts**: Connect (10s), Socket (45s), Server Selection (10s)
- **Retry Automatique**: 3 tentatives avec backoff exponentiel (1s, 2s, 4s)
- **Reconnexion**: Détection automatique de perte de connexion
- **Graceful Shutdown**: Fermeture propre sur SIGTERM/SIGINT

### Utilisation

```typescript
import { withMongoDb } from './utils/mongodb-pool';

// Exécuter une opération avec le pool
const result = await withMongoDb(async (db) => {
  return db.collection('users').findOne({ email });
});
```

### Configuration Render/Vercel

```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/luxio?retryWrites=true&w=majority
```

## 6. Validation Serveur & Sanitization

### ✅ Implémenté

**Fichier**: `utils/input-sanitization.ts`

- **Validation Email**: Format + longueur max 254 caractères
- **Validation Mot de Passe**: Min 8 chars, majuscule, minuscule, chiffre
- **Validation Montants**: Positifs, max 1M€, nombres valides
- **Validation Quantités**: Entiers positifs, max 999
- **Sanitization**: Suppression balises HTML, limitation longueur
- **Validation Devise**: Whitelist (EUR, USD, GBP)

### Exemple d'utilisation

```typescript
import { sanitizeEmail, validateAmount, sanitizeCartItem } from './utils/input-sanitization';

const email = sanitizeEmail(req.body.email);
const amountCheck = validateAmount(req.body.amount);

if (!amountCheck.valid) {
  return res.status(400).json({ error: amountCheck.error });
}
```

## 7. Queue d'Emails avec Retry

### ✅ Implémenté

**Fichier**: `utils/email-queue.ts`

- **Queue en Mémoire**: Traitement asynchrone des emails
- **Retry Automatique**: 3 tentatives maximum
- **Backoff Exponentiel**: Délais croissants (1s, 2s, 4s... max 60s)
- **Logging**: Suivi détaillé des envois et échecs
- **Non-Bloquant**: N'impacte pas les réponses API

### Utilisation

```typescript
import { queueEmail } from './utils/email-queue';

// Ajouter un email à la queue
const jobId = await queueEmail({
  to: 'user@example.com',
  from: 'noreply@luxiomarket.shop',
  subject: 'Confirmation de commande',
  html: emailHtml,
  maxAttempts: 3
});
```

## 8. Configuration CORS Sécurisée

### ✅ Vérifié

**Fichier**: `server/index-render.ts`

- **Pas de Wildcard**: Aucun `*` dans les origines autorisées
- **Domaines Spécifiques**: 
  - Production: `luxiomarket.shop`, `www.luxiomarket.shop`, `luxios.vercel.app`
  - Dev: `localhost:5000`, `localhost:3000`, `*.replit.dev`
- **Credentials**: `Access-Control-Allow-Credentials: true`
- **Headers**: Liste blanche explicite incluant `X-CSRF-Token`

### Configuration Actuelle

```typescript
const productionOrigins = [
  'https://luxiomarket.shop',
  'https://www.luxiomarket.shop',
  'https://luxios.vercel.app'
];
```

## Résumé des Variables d'Environnement

### Requises pour la Sécurité

```env
# MongoDB
MONGODB_URI=mongodb+srv://...

# JWT & Encryption
JWT_SECRET=secret_32_chars_minimum
ENCRYPTION_KEY=key_32_chars_minimum
SESSION_SECRET=secret_32_chars_minimum

# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# NowPayments
NOWPAYMENTS_API_KEY=...
NOWPAYMENTS_IPN_SECRET=...

# SendGrid
SENDGRID_API_KEY=SG...
SENDGRID_FROM_EMAIL=noreply@luxiomarket.shop

# CSRF
CSRF_SECRET=secret_32_chars_minimum

# URLs
FRONTEND_URL=https://luxiomarket.shop
BACKEND_URL=https://api.luxiomarket.shop
```

## Checklist Déploiement Render/Vercel

### Render (Backend)
- [ ] Configurer toutes les variables d'environnement ci-dessus
- [ ] Vérifier `NODE_ENV=production`
- [ ] S'assurer que MongoDB URI inclut `retryWrites=true`
- [ ] Configurer les logs (éviter de logger les secrets)

### Vercel (Frontend)
- [ ] Configurer `VITE_API_URL=https://api.luxiomarket.shop`
- [ ] Vérifier que les appels API utilisent HTTPS
- [ ] Tester le workflow CSRF avec le backend en production

## Tests de Sécurité Recommandés

1. **Webhooks**: Tester avec des webhooks dupliqués
2. **CSRF**: Tenter des requêtes POST sans token
3. **Rate Limiting**: Envoyer 200+ requêtes rapidement
4. **MongoDB**: Simuler une perte de connexion
5. **Emails**: Vérifier les retries en cas d'échec SendGrid

## Monitoring

- Surveiller les logs pour détecter tentatives d'attaques
- Vérifier régulièrement les taux d'erreur 429 (rate limiting)
- Monitorer les webhooks rejetés (IP/signature invalides)
- Suivre les échecs d'envoi d'emails

## Contact Support

Pour toute question sur ces améliorations de sécurité, contacter l'équipe technique Luxio.

---

**Date de mise à jour**: 29 Octobre 2025  
**Version**: 1.0.0
