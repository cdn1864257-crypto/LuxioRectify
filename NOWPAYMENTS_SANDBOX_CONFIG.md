# Configuration NOWPayments Sandbox ✅

## ✅ Modifications effectuées

Le code a été modifié pour **utiliser correctement le mode sandbox** de NOWPayments.

### 📝 Changements dans `api/payment/nowpayments-init.ts`

**Avant :**
```typescript
const npApi = new NowPaymentsApi({ apiKey: nowpaymentsApiKey });
// ❌ Utilisait toujours l'API de production par défaut
```

**Après :**
```typescript
const nowpaymentsMode = process.env.NOWPAYMENTS_MODE || 'Production';
const isSandbox = nowpaymentsMode.toLowerCase() === 'sandbox';

const baseURL = isSandbox 
  ? (process.env.NOWPAYMENTS_TEST_URL || 'https://api-sandbox.nowpayments.io/v1')
  : (process.env.NOWPAYMENTS_LIVE_URL || 'https://api.nowpayments.io/v1');

console.log(`[NowPayments] 🔧 Mode: ${nowpaymentsMode}`);
console.log(`[NowPayments] 🌐 Base URL: ${baseURL}`);
console.log(`[NowPayments] ${isSandbox ? '⚠️  SANDBOX MODE - Test payments only' : '✅ PRODUCTION MODE - Real payments'}`);

const npApi = new NowPaymentsApi({ 
  apiKey: nowpaymentsApiKey,
  baseURL: baseURL
} as any);
// ✅ Utilise maintenant le bon environnement selon NOWPAYMENTS_MODE
```

## 🔧 Variables d'environnement requises

Selon votre capture d'écran, voici les variables à configurer :

### ✅ Variables correctes (déjà configurées)

| Variable | Votre valeur | Status |
|----------|-------------|---------|
| `NOWPAYMENTS_API_KEY` | `1680H0P-F6WNHEJ-G000V91-35V0805` | ✅ OK |
| `NOWPAYMENTS_IPN_SECRET` | `0KyC4037S0NYP8akeeqCiqJjJz-MN7of` | ✅ OK |
| `NOWPAYMENTS_MODE` | `Sandbox` | ✅ OK |
| `NOWPAYMENTS_TEST_URL` | `https://api-sandbox.nowpayments.io/v1` | ✅ OK |
| `NOWPAYMENTS_LIVE_URL` | `https://api.nowpayments.io/v1` | ✅ OK |

### ⚠️ Variable à corriger

| Variable | Valeur actuelle | Valeur correcte |
|----------|----------------|-----------------|
| `NOWPAYMENTS_WEBHOOK_URL` | `https://api.luxiomarket.shop/nowpayments/webhook` ❌ | `https://api.luxiomarket.shop/api/payment/nowpayments-webhook` ✅ |

**Action requise :** Mettez à jour l'URL du webhook dans :
1. Vos variables d'environnement (si utilisée)
2. Le dashboard NOWPayments → Settings → IPN Settings

## 📋 Configuration dans NOWPayments Dashboard

### Pour le Sandbox
1. Aller sur [account-sandbox.nowpayments.io](https://account-sandbox.nowpayments.io)
2. Settings → IPN Settings
3. IPN Callback URL : `https://api.luxiomarket.shop/api/payment/nowpayments-webhook`
4. Vérifier que l'IPN Secret correspond à `NOWPAYMENTS_IPN_SECRET`

## 🧪 Comment tester

### 1. Vérifier les logs au démarrage
Après le déploiement, vérifiez les logs du backend. Vous devriez voir :
```
[NowPayments] 🔧 Mode: Sandbox
[NowPayments] 🌐 Base URL: https://api-sandbox.nowpayments.io/v1
[NowPayments] ⚠️  SANDBOX MODE - Test payments only
```

### 2. Créer un paiement de test
1. Ajoutez un produit au panier
2. Procédez au paiement
3. Choisissez "Pay with Crypto"
4. Vérifiez que vous êtes redirigé vers le sandbox NOWPayments (URL commençant par `sandbox.nowpayments.io`)

### 3. Vérifier les webhooks
Les logs du backend devraient afficher :
```
[NowPayments Webhook] IP verified: xxx.xxx.xxx.xxx
[NowPayments Webhook] Signature verified successfully ✅
[NowPayments Webhook] Order XXX updated to status: success
```

## 🔄 Passer en production

Quand vous serez prêt à accepter de vrais paiements :

1. **Créer un compte de production** sur [nowpayments.io](https://nowpayments.io)
2. **Générer une API Key de production**
3. **Mettre à jour les variables d'environnement :**
   ```env
   NOWPAYMENTS_MODE=Production
   NOWPAYMENTS_API_KEY=votre_clé_api_de_production
   NOWPAYMENTS_IPN_SECRET=votre_ipn_secret_de_production
   ```
4. **Configurer le webhook de production** avec la même URL

## 🆘 Dépannage

### Le mode sandbox n'est pas détecté
**Solution :** Vérifiez que `NOWPAYMENTS_MODE=Sandbox` (avec un S majuscule ou minuscule, le code gère les deux)

### Les webhooks ne fonctionnent pas
**Solution :** 
1. Vérifiez que l'URL webhook est exactement : `/api/payment/nowpayments-webhook`
2. Vérifiez que `NOWPAYMENTS_IPN_SECRET` correspond au secret dans le dashboard
3. Consultez les logs pour voir les erreurs de signature

### Les paiements utilisent toujours la production
**Solution :** 
1. Redémarrez le backend après avoir changé `NOWPAYMENTS_MODE`
2. Vérifiez les logs au démarrage pour confirmer le mode

## 📚 Documentation

- **Sandbox API** : https://documenter.getpostman.com/view/7907941/T1LSCRHC
- **Production API** : https://documenter.getpostman.com/view/7907941/S1a32n38
- **Dashboard Sandbox** : https://account-sandbox.nowpayments.io
