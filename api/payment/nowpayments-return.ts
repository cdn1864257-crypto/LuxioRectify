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
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const params = req.method === 'GET' ? req.query : req.body;
    
    const status = params.status;
    const orderId = params.order || params.order_id;

    console.log('[NowPayments Return] Params:', { status, orderId });

    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      return res.status(500).json({ error: 'Configuration MongoDB manquante' });
    }

    const client = new MongoClient(mongoUri);

    try {
      await client.connect();

      const db = client.db('luxio');
      const ordersCollection = db.collection('nowpayments_orders');

      let order = null;
      if (orderId) {
        order = await ordersCollection.findOne({ orderReference: orderId });
      }

      // Déterminer le statut de redirection
      let paymentSuccess = false;
      let redirectPath = '/payment';

      if (status === 'finished' || status === 'confirmed') {
        paymentSuccess = true;
        redirectPath = order ? `/payment?success=true&order=${order.orderReference}` : '/payment?success=true';
      } else if (status === 'failed' || status === 'expired') {
        redirectPath = '/payment?cancelled=true';
      } else {
        // Status 'waiting', 'confirming', etc. - considéré comme en attente
        redirectPath = order ? `/payment?pending=true&order=${order.orderReference}` : '/payment?pending=true';
      }

      const replitDomain = process.env.REPLIT_DOMAINS ? `https://${process.env.REPLIT_DOMAINS}` : '';
      const baseUrl = req.headers.origin || replitDomain || 'https://luxio-shop.eu';
      const redirectUrl = `${baseUrl}${redirectPath}`;

      if (req.method === 'GET') {
        res.setHeader('Location', redirectUrl);
        return res.status(302).end();
      }

      return res.status(200).json({
        success: paymentSuccess,
        message: paymentSuccess ? 'Paiement confirmé' : 'Paiement en attente ou annulé',
        orderId: order?.orderReference,
        redirectUrl
      });
    } finally {
      await client.close();
    }

  } catch (error) {
    console.error('Erreur lors du traitement du retour NowPayments:', error);
    
    const replitDomain = process.env.REPLIT_DOMAINS ? `https://${process.env.REPLIT_DOMAINS}` : '';
    const baseUrl = req.headers.origin || replitDomain || 'https://luxio-shop.eu';
    const errorRedirectUrl = `${baseUrl}/payment?error=true`;
    
    if (req.method === 'GET') {
      res.setHeader('Location', errorRedirectUrl);
      return res.status(302).end();
    }
    
    return res.status(500).json({
      error: 'Erreur serveur',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export default handler;
