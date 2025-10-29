# Configuration Stripe Webhook sur Vercel

## Problème

Les webhooks Stripe nécessitent le body brut de la requête HTTP pour vérifier la signature. Par défaut, Vercel parse automatiquement le body en JSON, ce qui casse la vérification de signature.

## Solution

Créer un fichier `vercel.json` avec la configuration suivante pour désactiver le parsing automatique du body pour le webhook Stripe :

```json
{
  "functions": {
    "api/payment/stripe-webhook.ts": {
      "memory": 1024,
      "maxDuration": 10
    }
  },
  "rewrites": [
    {
      "source": "/api/payment/stripe-webhook",
      "destination": "/api/payment/stripe-webhook"
    }
  ]
}
```

## Configuration Alternative

Si la configuration ci-dessus ne fonctionne pas, utiliser cette approche dans le code du webhook :

```typescript
export const config = {
  api: {
    bodyParser: false,
  },
};
```

## Configuration Stripe Dashboard

1. Aller dans **Developers → Webhooks** dans le dashboard Stripe
2. Ajouter un endpoint : `https://api.luxiomarket.shop/api/payment/stripe-webhook`
3. Sélectionner les événements :
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `payment_intent.canceled`
4. Copier le **Signing Secret** (`whsec_...`)
5. Ajouter dans les variables d'environnement Vercel :
   ```
   STRIPE_WEBHOOK_SECRET=whsec_votre_secret
   ```

## Test du Webhook

Utiliser Stripe CLI pour tester localement :

```bash
# Installer Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks vers localhost
stripe listen --forward-to localhost:3001/api/payment/stripe-webhook

# Trigger un événement test
stripe trigger payment_intent.succeeded
```

## Vérification

Le webhook devrait logger :
```
[Stripe Webhook] Signature verified for event: evt_...
[Stripe Webhook] Processing event type: payment_intent.succeeded
[Stripe Webhook] Payment succeeded: pi_...
```

Si vous voyez "Signature verification failed", vérifiez que le body brut est bien passé à `stripe.webhooks.constructEvent()`.

## Render Configuration

Pour Render, le code actuel devrait fonctionner car Express reçoit le body brut par défaut avec `express.raw({ type: 'application/json' })`.

Pas de configuration spéciale nécessaire côté Render.
