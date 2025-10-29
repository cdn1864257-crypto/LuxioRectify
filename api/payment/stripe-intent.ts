import type { VercelRequest, VercelResponse } from '@vercel/node';

// Interface pour la réponse Vercel compatible
interface CompatibleResponse extends VercelResponse {
  send: (body: any) => CompatibleResponse;
  json: (body: any) => CompatibleResponse;
  status: (code: number) => CompatibleResponse;
  setHeader: (name: string, value: string | string[]) => CompatibleResponse;
  end: (chunk?: any) => void;
}

interface StripeIntentData {
  amount: number; // en centimes
  currency: string;
  cart: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    description?: string;
  }>;
}

export default async function handler(
  req: VercelRequest,
  res: CompatibleResponse
) {
  console.log('[Stripe Intent] Début de la requête');
  
  // Méthode POST uniquement
  if (req.method !== 'POST') {
    console.log(`[Stripe Intent] Méthode non autorisée: ${req.method}`);
    return res.status(405).json({
      ok: false,
      error: 'Méthode non autorisée'
    });
  }

  try {
    const { amount, currency, cart } = req.body as StripeIntentData;

    // Validation des données
    if (!amount || amount <= 0) {
      console.log('[Stripe Intent] Montant invalide');
      return res.status(400).json({
        ok: false,
        error: 'Montant invalide'
      });
    }

    if (!currency) {
      console.log('[Stripe Intent] Devise invalide');
      return res.status(400).json({
        ok: false,
        error: 'Devise invalide'
      });
    }

    if (!cart || cart.length === 0) {
      console.log('[Stripe Intent] Panier vide');
      return res.status(400).json({
        ok: false,
        error: 'Panier vide'
      });
    }

    // Vérifier la présence de la clé API Stripe
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      console.error('[Stripe Intent] STRIPE_SECRET_KEY manquante');
      return res.status(500).json({
        ok: false,
        error: 'Configuration Stripe manquante'
      });
    }

    // Importer Stripe dynamiquement
    const Stripe = (await import('stripe')).default;
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2024-11-20.acacia',
    });

    console.log(`[Stripe Intent] Création Payment Intent pour ${amount / 100}€`);

    // Créer le Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // Montant en centimes
      currency: currency.toLowerCase(),
      metadata: {
        cart_items: JSON.stringify(cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          description: item.description || ''
        }))),
        order_date: new Date().toISOString(),
      },
      description: `Luxio Order - ${cart.length} item(s)`,
    });

    console.log(`[Stripe Intent] Payment Intent créé: ${paymentIntent.id}`);

    // Retourner le client secret au frontend
    return res.status(200).json({
      ok: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });

  } catch (error: any) {
    console.error('[Stripe Intent] Erreur:', error);
    
    return res.status(500).json({
      ok: false,
      error: error.message || 'Erreur lors de la création du Payment Intent',
    });
  }
}
