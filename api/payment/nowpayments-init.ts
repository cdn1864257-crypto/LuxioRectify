import { MongoClient } from 'mongodb';
import NowPaymentsApi from '@nowpaymentsio/nowpayments-api-js';

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

interface NowPaymentsInitData {
  customerEmail: string;
  customerName: string;
  totalAmount: number;
  cartItems: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
}

function generateOrderReference(): string {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `LX-${timestamp}-${randomStr}`;
}

async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const {
      customerEmail,
      customerName,
      totalAmount,
      cartItems
    }: NowPaymentsInitData = req.body;

    if (!customerEmail || !customerName || !totalAmount || !cartItems || cartItems.length === 0) {
      return res.status(400).json({
        error: 'Tous les champs sont obligatoires',
        missing: {
          customerEmail: !customerEmail,
          customerName: !customerName,
          totalAmount: !totalAmount,
          cartItems: !cartItems || cartItems.length === 0
        }
      });
    }

    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      return res.status(500).json({ error: 'Configuration MongoDB manquante' });
    }

    const nowpaymentsApiKey = process.env.NOWPAYMENTS_API_KEY;
    
    if (!nowpaymentsApiKey) {
      return res.status(500).json({ 
        error: 'Configuration NowPayments manquante',
        missing: {
          NOWPAYMENTS_API_KEY: !nowpaymentsApiKey
        }
      });
    }

    const client = new MongoClient(mongoUri);

    try {
      await client.connect();

      const db = client.db('luxio');
      const ordersCollection = db.collection('nowpayments_orders');
      const usersCollection = db.collection('users');

      // Récupérer la langue de l'utilisateur
      const user = await usersCollection.findOne({ email: customerEmail.toLowerCase() });
      const userLanguage = user?.language || 'fr';

      const orderReference = generateOrderReference();

      const newOrder = {
        customerEmail: customerEmail.toLowerCase(),
        customerName,
        totalAmount,
        cartItems,
        orderReference,
        paymentMethod: 'nowpayments',
        status: 'pending',
        language: userLanguage,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const result = await ordersCollection.insertOne(newOrder);
      const orderId = result.insertedId.toString();

      // Initialize NowPayments API client
      const npApi = new NowPaymentsApi({ apiKey: nowpaymentsApiKey });

      // URLs pour les callbacks
      const replitDomain = process.env.REPLIT_DOMAINS ? `https://${process.env.REPLIT_DOMAINS}` : '';
      const baseUrl = req.headers.origin || replitDomain || 'https://luxio-shop.eu';
      const successUrl = `${baseUrl}/api/payment/nowpayments-return?status=finished`;
      const cancelUrl = `${baseUrl}/payment?cancelled=true`;
      const ipnCallbackUrl = `${baseUrl}/api/payment/nowpayments-webhook`;
      
      console.log(`[NowPayments] Using base URL: ${baseUrl}`);

      // Créer le paiement avec NowPayments
      // Note: NowPayments accepte les paiements en crypto, donc on spécifie EUR comme devise de prix
      const paymentResponse: any = await npApi.createPayment({
        price_amount: totalAmount,
        price_currency: 'eur',
        pay_currency: 'btc', // Par défaut BTC, peut être changé côté utilisateur
        order_id: orderReference,
        order_description: `Luxio Order - ${orderReference}`,
        ipn_callback_url: ipnCallbackUrl
      });

      // Vérifier que la réponse est valide
      if (!paymentResponse || !paymentResponse.payment_id) {
        console.error('[NowPayments] Invalid payment response:', paymentResponse);
        throw new Error('Réponse invalide de NowPayments');
      }

      // Mettre à jour la commande avec le payment_id de NowPayments
      await ordersCollection.updateOne(
        { orderReference: orderReference },
        {
          $set: {
            nowpaymentsId: paymentResponse.payment_id,
            payAddress: paymentResponse.pay_address,
            payAmount: paymentResponse.pay_amount,
            payCurrency: paymentResponse.pay_currency,
            updatedAt: new Date()
          }
        }
      );

      console.log(`[NowPayments] Payment created: ${paymentResponse.payment_id} for order ${orderReference}`);
      console.log('[NowPayments] Payment response:', JSON.stringify(paymentResponse, null, 2));

      // NowPayments invoice_url pour la redirection
      const redirectUrl = paymentResponse.invoice_url || paymentResponse.payment_url || `https://nowpayments.io/payment/?iid=${paymentResponse.payment_id}`;
      
      console.log(`[NowPayments] Redirect URL: ${redirectUrl}`);

      return res.status(200).json({
        success: true,
        orderId,
        orderReference,
        paymentId: paymentResponse.payment_id,
        payAddress: paymentResponse.pay_address,
        payAmount: paymentResponse.pay_amount,
        payCurrency: paymentResponse.pay_currency,
        paymentStatus: paymentResponse.payment_status,
        redirectUrl: redirectUrl
      });
    } finally {
      await client.close();
    }

  } catch (error) {
    console.error('Erreur lors de l\'initialisation du paiement NowPayments:', error);
    return res.status(500).json({
      error: 'Erreur serveur lors de l\'initialisation du paiement',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export default handler;
