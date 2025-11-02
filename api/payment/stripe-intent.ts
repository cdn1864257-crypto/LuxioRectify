import type { VercelRequest, VercelResponse } from '@vercel/node';

// Import static products for server-side validation
import { products as staticProducts, type Product, type ProductVariant } from '../lib/products';

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

// Helper function to log only in development
const debugLog = (...args: any[]) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(...args);
  }
};

// Helper function to find product and variant price
function getProductPrice(productId: string, description?: string): number | null {
  const product = staticProducts.find((p: Product) => p.id === productId);
  
  if (!product) {
    return null;
  }

  // If no description (variant), return base price
  if (!description || !product.hasVariants) {
    return product.price;
  }

  // Find variant price based on description
  const variant = product.variants?.find((v: ProductVariant) => 
    description.includes(v.color || '') && description.includes(v.capacity || '')
  );

  return variant ? variant.price : product.price;
}

// Validate cart total against server-side prices
function validateCartTotal(cart: StripeIntentData['cart']): { valid: boolean; serverTotal: number; error?: string } {
  let serverTotal = 0;

  for (const item of cart) {
    // SECURITY: Validate quantity is a positive integer with reasonable max
    const MAX_QUANTITY = 999;
    if (!Number.isInteger(item.quantity) || item.quantity <= 0 || item.quantity > MAX_QUANTITY) {
      return {
        valid: false,
        serverTotal: 0,
        error: `Quantité invalide pour ${item.name}`
      };
    }

    const serverPrice = getProductPrice(item.id, item.description);
    
    if (serverPrice === null) {
      return {
        valid: false,
        serverTotal: 0,
        error: `Produit invalide: ${item.id}`
      };
    }

    // Check if client-provided price matches server price
    if (Math.abs(item.price - serverPrice) > 0.01) {
      return {
        valid: false,
        serverTotal: 0,
        error: `Prix invalide pour ${item.name}. Prix attendu: ${serverPrice}€, reçu: ${item.price}€`
      };
    }

    serverTotal += serverPrice * item.quantity;
  }

  return { valid: true, serverTotal };
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  debugLog('[Stripe Intent] Début de la requête');
  
  // Méthode POST uniquement
  if (req.method !== 'POST') {
    debugLog(`[Stripe Intent] Méthode non autorisée: ${req.method}`);
    return res.status(405).json({
      ok: false,
      error: 'Méthode non autorisée'
    });
  }

  try {
    const { amount, currency, cart } = req.body as StripeIntentData;

    // Validation des données
    if (!amount || amount <= 0) {
      debugLog('[Stripe Intent] Montant invalide');
      return res.status(400).json({
        ok: false,
        error: 'Montant invalide'
      });
    }

    // SECURITY: Whitelist accepted currencies
    const ALLOWED_CURRENCIES = ['EUR', 'USD', 'GBP'];
    if (!currency || !ALLOWED_CURRENCIES.includes(currency.toUpperCase())) {
      debugLog(`[Stripe Intent] Devise non autorisée: ${currency}`);
      return res.status(400).json({
        ok: false,
        error: 'Devise non autorisée'
      });
    }

    if (!cart || cart.length === 0) {
      debugLog('[Stripe Intent] Panier vide');
      return res.status(400).json({
        ok: false,
        error: 'Panier vide'
      });
    }

    // SECURITY: Validate cart total against server-side prices
    const validation = validateCartTotal(cart);
    
    if (!validation.valid) {
      console.error(`[Stripe Security] Cart validation failed: ${validation.error}`);
      return res.status(400).json({
        ok: false,
        error: validation.error || 'Validation du panier échouée'
      });
    }

    // Convert to cents and validate amount matches server calculation
    const serverAmountInCents = Math.round(validation.serverTotal * 100);
    const clientAmountInCents = Math.round(amount);

    if (Math.abs(serverAmountInCents - clientAmountInCents) > 1) {
      console.error(`[Stripe Security] Amount mismatch - Server: ${serverAmountInCents}, Client: ${clientAmountInCents}`);
      return res.status(400).json({
        ok: false,
        error: `Montant invalide. Montant calculé: ${validation.serverTotal}€`
      });
    }

    // Use server-calculated amount (never trust client)
    const finalAmount = serverAmountInCents;

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
      apiVersion: '2025-09-30.clover',
    });

    debugLog(`[Stripe Intent] Création Payment Intent pour ${finalAmount / 100}€ (validé)`);

    // Créer le Payment Intent avec le montant validé
    const paymentIntent = await stripe.paymentIntents.create({
      amount: finalAmount, // Montant en centimes (validé côté serveur)
      currency: currency.toLowerCase(),
      metadata: {
        cart_items: JSON.stringify(cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          description: item.description || ''
        }))),
        validated_total: (finalAmount / 100).toFixed(2),
        order_date: new Date().toISOString(),
      },
      description: `Luxio Order - ${cart.length} item(s) - €${(finalAmount / 100).toFixed(2)}`,
    });

    // Log payment intent creation (important for monitoring)
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
