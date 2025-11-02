import { MongoClient } from 'mongodb';
import crypto from 'crypto';
import { sendOxaPayConfirmationToCustomer, sendOxaPayNotificationToAdmin } from '../../utils/email.js';
import { addUnpaidOrder, checkAndApplySuspension } from '../../utils/account-suspension.js';
import { sendSuspensionEmail } from '../../utils/email.js';

interface VercelRequest {
  query: { [key: string]: string | string[] | undefined };
  body: any;
  cookies: { [key: string]: string };
  method: string;
  url: string;
  headers: { [key: string]: string };
}

interface VercelResponse {
  status: (code: number) => VercelResponse;
  json: (object: any) => VercelResponse;
  setHeader: (name: string, value: string | string[]) => VercelResponse;
  end: (chunk?: any) => void;
}

class WebhookCache {
  private cache: Map<string, number>;
  private readonly TTL = 3600000;

  constructor() {
    this.cache = new Map();
  }

  isProcessed(eventId: string): boolean {
    const timestamp = this.cache.get(eventId);
    if (!timestamp) return false;
    
    if (Date.now() - timestamp > this.TTL) {
      this.cache.delete(eventId);
      return false;
    }
    
    return true;
  }

  markAsProcessed(eventId: string): void {
    this.cache.set(eventId, Date.now());
  }

  cleanup(): void {
    const now = Date.now();
    this.cache.forEach((timestamp, key) => {
      if (now - timestamp > this.TTL) {
        this.cache.delete(key);
      }
    });
  }
}

const webhookCache = new WebhookCache();

setInterval(() => {
  webhookCache.cleanup();
}, 600000);

// Helper function to log only in development
const debugLog = (...args: any[]) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(...args);
  }
};

function verifyOxaPaySignature(body: any, receivedSignature: string | undefined, apiKey: string): boolean {
  if (!receivedSignature) {
    return false;
  }

  const bodyString = JSON.stringify(body);
  const calculatedSignature = crypto
    .createHmac('sha512', apiKey)
    .update(bodyString)
    .digest('hex');

  return calculatedSignature === receivedSignature;
}

async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    // Only log sensitive data in development
    debugLog('[OxaPay Webhook] Received webhook:', JSON.stringify(req.body, null, 2));

    const oxapayApiKey = process.env.OXAPAY_API_KEY;
    
    if (!oxapayApiKey) {
      console.error('[OxaPay Webhook] OXAPAY_API_KEY non configuré - CRITIQUE!');
      return res.status(500).json({
        error: 'Configuration de sécurité manquante'
      });
    }
    
    const hmacHeader = req.headers['hmac'];
    
    if (!verifyOxaPaySignature(req.body, hmacHeader, oxapayApiKey)) {
      console.error('[OxaPay Webhook] Invalid HMAC signature - potential security threat!');
      return res.status(401).json({
        error: 'Signature invalide'
      });
    }
    
    debugLog('[OxaPay Webhook] HMAC signature verified successfully');

    const {
      trackId,
      orderId,
      status,
      amount,
      currency,
      payAmount,
      payCurrency,
      email
    } = req.body;

    if (!trackId || !orderId || !status) {
      console.error('[OxaPay Webhook] Missing required fields');
      return res.status(400).json({
        error: 'Données webhook invalides'
      });
    }

    const eventId = `oxapay_${trackId}_${status}`;
    
    if (webhookCache.isProcessed(eventId)) {
      console.warn(`[OxaPay Webhook] Duplicate event detected: ${eventId}`);
      return res.status(200).json({
        success: true,
        message: 'Event already processed (deduplicated)'
      });
    }
    
    webhookCache.markAsProcessed(eventId);
    debugLog(`[OxaPay Webhook] Event marked as processed: ${eventId}`);

    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      return res.status(500).json({ error: 'Configuration MongoDB manquante' });
    }

    const client = new MongoClient(mongoUri);

    try {
      await client.connect();

      const db = client.db('luxio');
      const ordersCollection = db.collection('oxapay_orders');

      const order = await ordersCollection.findOne({ orderReference: orderId });

      if (!order) {
        console.error(`[OxaPay Webhook] Order not found: ${orderId}`);
        return res.status(404).json({
          error: 'Commande non trouvée'
        });
      }

      let paymentStatus = 'pending';
      
      switch(status) {
        case 'Paid':
          paymentStatus = 'success';
          break;
        case 'Expired':
        case 'Canceled':
          paymentStatus = 'failed';
          break;
        case 'Waiting':
        case 'Confirming':
          paymentStatus = 'pending';
          break;
        default:
          paymentStatus = 'unknown';
      }

      await ordersCollection.updateOne(
        { orderReference: orderId },
        {
          $set: {
            paymentStatus: paymentStatus,
            oxapayStatus: status,
            trackId: trackId,
            payAmount: payAmount,
            payCurrency: payCurrency,
            paidAt: paymentStatus === 'success' ? new Date() : null,
            updatedAt: new Date()
          }
        }
      );

      if (status === 'Expired' || status === 'Canceled') {
        const usersCollection = db.collection('users');
        const customerEmail = order.customerEmail;
        
        if (customerEmail) {
          try {
            await addUnpaidOrder(
              usersCollection,
              customerEmail,
              orderId,
              order.totalAmount || 0,
              status === 'Expired' ? 'expired' : 'cancelled'
            );
            
            const suspensionResult = await checkAndApplySuspension(usersCollection, customerEmail);
            
            if (suspensionResult.suspended) {
              const user = await usersCollection.findOne({ email: customerEmail.toLowerCase() });
              if (user) {
                await sendSuspensionEmail(
                  customerEmail,
                  user.firstName || 'Client',
                  user.suspendedUntil,
                  user.language || 'fr'
                ).catch((error: Error) => {
                  console.error('[Suspension] Error sending suspension email:', error);
                });
              }
            }
          } catch (error) {
            console.error(`[OxaPay Webhook] Error tracking unpaid order for ${customerEmail}:`, error);
          }
        }
      }

      if (paymentStatus === 'success') {
        const oxaPayOrder = {
          orderReference: order.orderReference,
          customerEmail: order.customerEmail,
          customerName: order.customerName,
          totalAmount: order.totalAmount,
          transactionId: trackId || '',
          payAmount: payAmount,
          payCurrency: payCurrency,
          cartItems: order.cartItems || [],
          language: order.language || 'fr'
        };

        try {
          await Promise.all([
            sendOxaPayConfirmationToCustomer(oxaPayOrder),
            sendOxaPayNotificationToAdmin(oxaPayOrder)
          ]);
          // Log email sending in production (important for monitoring)
          console.log(`[OxaPay Webhook] Confirmation emails sent for order ${orderId}`);
        } catch (error) {
          console.error('Erreur lors de l\'envoi des emails OxaPay:', error);
        }
      }

      // Log order status updates (important for monitoring)
      console.log(`[OxaPay Webhook] Order ${orderId} updated to status: ${paymentStatus}`);

      return res.status(200).json({
        success: true,
        message: 'Webhook traité avec succès'
      });
    } finally {
      await client.close();
    }

  } catch (error) {
    console.error('Erreur lors du traitement du webhook OxaPay:', error);
    return res.status(500).json({
      error: 'Erreur serveur',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export default handler;
