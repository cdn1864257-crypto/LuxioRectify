import { MongoClient } from 'mongodb';
import { sendNowPaymentsConfirmationToCustomer, sendNowPaymentsNotificationToAdmin } from '../../utils/email.js';

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

async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const {
      order_id,
      payment_id,
      payment_status,
      pay_amount,
      pay_currency,
      outcome_amount,
      outcome_currency
    } = req.body;

    console.log('[NowPayments Webhook] Received:', {
      order_id,
      payment_id,
      payment_status,
      pay_amount,
      pay_currency
    });

    if (!order_id || !payment_status) {
      return res.status(400).json({
        error: 'Données webhook NowPayments incomplètes'
      });
    }

    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      return res.status(500).json({ error: 'Configuration MongoDB manquante' });
    }

    const client = new MongoClient(mongoUri);

    try {
      await client.connect();

      const db = client.db('luxio');
      const ordersCollection = db.collection('nowpayments_orders');

      const order = await ordersCollection.findOne({ orderReference: order_id });

      if (!order) {
        console.error(`[NowPayments Webhook] Order not found: ${order_id}`);
        return res.status(404).json({
          error: 'Commande non trouvée'
        });
      }

      // Map NowPayments statuses to our internal statuses
      // NowPayments statuses: waiting, confirming, confirmed, sending, partially_paid, finished, failed, refunded, expired
      let paymentStatus = 'pending';
      
      switch(payment_status) {
        case 'finished':
        case 'confirmed':
          paymentStatus = 'success';
          break;
        case 'failed':
        case 'refunded':
        case 'expired':
          paymentStatus = 'failed';
          break;
        case 'waiting':
        case 'confirming':
        case 'sending':
        case 'partially_paid':
          paymentStatus = 'pending';
          break;
        default:
          paymentStatus = 'unknown';
      }

      await ordersCollection.updateOne(
        { orderReference: order_id },
        {
          $set: {
            paymentStatus: paymentStatus,
            nowpaymentsStatus: payment_status,
            paymentId: payment_id,
            payAmount: pay_amount,
            payCurrency: pay_currency,
            outcomeAmount: outcome_amount,
            outcomeCurrency: outcome_currency,
            paidAt: paymentStatus === 'success' ? new Date() : null,
            updatedAt: new Date()
          }
        }
      );

      // Envoyer les emails de confirmation si le paiement est confirmé
      if (paymentStatus === 'success') {
        const nowPaymentsOrder = {
          orderReference: order.orderReference,
          customerEmail: order.customerEmail,
          customerName: order.customerName,
          totalAmount: order.totalAmount,
          transactionId: payment_id || '',
          payAmount: pay_amount,
          payCurrency: pay_currency,
          cartItems: order.cartItems || [],
          language: order.language || 'fr'
        };

        try {
          await Promise.all([
            sendNowPaymentsConfirmationToCustomer(nowPaymentsOrder),
            sendNowPaymentsNotificationToAdmin(nowPaymentsOrder)
          ]);
          console.log(`[NowPayments Webhook] Confirmation emails sent for order ${order_id}`);
        } catch (error) {
          console.error('Erreur lors de l\'envoi des emails NowPayments:', error);
        }
      }

      console.log(`[NowPayments Webhook] Order ${order_id} updated to status: ${paymentStatus}`);

      return res.status(200).json({
        success: true,
        message: 'Webhook traité avec succès'
      });
    } finally {
      await client.close();
    }

  } catch (error) {
    console.error('Erreur lors du traitement du webhook NowPayments:', error);
    return res.status(500).json({
      error: 'Erreur serveur',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export default handler;
