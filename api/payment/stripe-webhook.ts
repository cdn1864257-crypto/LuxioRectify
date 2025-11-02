import type { VercelRequest, VercelResponse } from '@vercel/node';
import { MongoClient } from 'mongodb';
import { webhookCache } from '../../utils/webhook-security.js';

interface StripeWebhookEvent {
  id: string;
  type: string;
  data: {
    object: any;
  };
  created: number;
}

// Helper function to log only in development
const debugLog = (...args: any[]) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(...args);
  }
};

async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!stripeSecretKey || !webhookSecret) {
      console.error('[Stripe Webhook] Missing configuration');
      return res.status(500).json({ error: 'Configuration manquante' });
    }

    const Stripe = (await import('stripe')).default;
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2025-09-30.clover',
    });

    const sig = req.headers['stripe-signature'];
    
    if (!sig || typeof sig !== 'string') {
      console.error('[Stripe Webhook] Missing signature');
      return res.status(400).json({ error: 'Signature manquante' });
    }

    let event: StripeWebhookEvent;

    try {
      let rawBody: string | Buffer;
      if (Buffer.isBuffer(req.body)) {
        rawBody = req.body;
      } else if (typeof req.body === 'string') {
        rawBody = req.body;
      } else {
        rawBody = JSON.stringify(req.body);
      }
      
      event = stripe.webhooks.constructEvent(
        rawBody,
        sig,
        webhookSecret
      ) as StripeWebhookEvent;
      
      debugLog(`[Stripe Webhook] Signature verified for event: ${event.id}`);
    } catch (err) {
      console.error('[Stripe Webhook] Signature verification failed:', err);
      return res.status(400).json({ 
        error: 'Invalid signature',
        details: err instanceof Error ? err.message : 'Unknown error'
      });
    }

    const eventId = `stripe_${event.id}`;
    
    if (webhookCache.isProcessed(eventId)) {
      console.warn(`[Stripe Webhook] Duplicate event detected: ${eventId}`);
      return res.status(200).json({
        received: true,
        message: 'Event already processed (deduplicated)'
      });
    }
    
    webhookCache.markAsProcessed(eventId);

    const paymentIntent = event.data.object;

    debugLog(`[Stripe Webhook] Processing event type: ${event.type}`);

    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentSuccess(paymentIntent);
        break;
      
      case 'payment_intent.payment_failed':
        await handlePaymentFailure(paymentIntent);
        break;
      
      case 'payment_intent.canceled':
        debugLog(`[Stripe Webhook] Payment intent canceled: ${paymentIntent.id}`);
        break;
      
      default:
        debugLog(`[Stripe Webhook] Unhandled event type: ${event.type}`);
    }

    return res.status(200).json({ received: true });

  } catch (error) {
    console.error('[Stripe Webhook] Error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

async function handlePaymentSuccess(paymentIntent: any) {
  // Log payment success (important for monitoring)
  console.log(`[Stripe Webhook] Payment succeeded: ${paymentIntent.id}`);
  debugLog(`[Stripe Webhook] Amount: ${paymentIntent.amount / 100} ${paymentIntent.currency.toUpperCase()}`);

  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error('[Stripe Webhook] MongoDB URI missing');
    return;
  }

  const client = new MongoClient(mongoUri);

  try {
    await client.connect();
    const db = client.db('luxio');
    const ordersCollection = db.collection('stripe_orders');

    const metadata = paymentIntent.metadata || {};
    const cartItems = metadata.cart_items ? JSON.parse(metadata.cart_items) : [];

    await ordersCollection.insertOne({
      paymentIntentId: paymentIntent.id,
      amount: paymentIntent.amount / 100,
      currency: paymentIntent.currency,
      status: 'succeeded',
      cartItems: cartItems,
      validatedTotal: metadata.validated_total,
      orderDate: metadata.order_date || new Date().toISOString(),
      createdAt: new Date(),
      updatedAt: new Date()
    });

    debugLog(`[Stripe Webhook] Order saved for payment intent: ${paymentIntent.id}`);

  } catch (error) {
    console.error('[Stripe Webhook] Error saving order:', error);
  } finally {
    await client.close();
  }
}

async function handlePaymentFailure(paymentIntent: any) {
  // Log payment failure (important for monitoring)
  console.log(`[Stripe Webhook] Payment failed: ${paymentIntent.id}`);
  debugLog(`[Stripe Webhook] Reason: ${paymentIntent.last_payment_error?.message || 'Unknown'}`);
}

export default handler;
