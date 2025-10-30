import { MongoClient } from 'mongodb';

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
    const orderId = params.orderId;
    const trackId = params.trackId;
    const lang = params.lang || 'fr';

    console.log('[OxaPay Return] Params:', { status, orderId, trackId, lang });

    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      return res.status(500).json({ error: 'Configuration MongoDB manquante' });
    }

    const client = new MongoClient(mongoUri);

    try {
      await client.connect();

      const db = client.db('luxio');
      const ordersCollection = db.collection('oxapay_orders');

      let order: any = null;
      if (orderId) {
        order = await ordersCollection.findOne({ orderReference: orderId });
      } else if (trackId) {
        order = await ordersCollection.findOne({ oxapayTrackId: trackId });
      }

      let paymentSuccess = false;
      let redirectPath = '/payment';

      if (status === 'Paid') {
        paymentSuccess = true;
        redirectPath = order ? `/payment?success=true&order=${order.orderReference}&lang=${lang}` : `/payment?success=true&lang=${lang}`;
      } else if (status === 'Expired' || status === 'Canceled') {
        redirectPath = `/payment?cancelled=true&lang=${lang}`;
      } else {
        redirectPath = order ? `/payment?pending=true&order=${order.orderReference}&lang=${lang}` : `/payment?pending=true&lang=${lang}`;
      }

      const replitDomain = process.env.REPLIT_DOMAINS ? `https://${process.env.REPLIT_DOMAINS}` : '';
      const frontendUrl = process.env.FRONTEND_URL || replitDomain || 'https://luxios.vercel.app';
      const redirectUrl = `${frontendUrl}${redirectPath}`;
      
      console.log(`[OxaPay Return] Redirecting to: ${redirectUrl}`);

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
    console.error('Erreur lors du traitement du retour OxaPay:', error);

    const replitDomain = process.env.REPLIT_DOMAINS ? `https://${process.env.REPLIT_DOMAINS}` : '';
    const frontendUrl = process.env.FRONTEND_URL || replitDomain || 'https://luxios.vercel.app';
    const errorRedirectUrl = `${frontendUrl}/payment?error=true&lang=${req.query?.lang || 'fr'}`;

    if (req.method === 'GET') {
      res.setHeader('Location', errorRedirectUrl);
      return res.status(302).end();
    }

    return res.status(500).json({
      error: 'Erreur serveur',
      details: error instanceof Error ? error.message : 'Unknown error',
      redirectUrl: errorRedirectUrl
    });
  }
}

export default handler;
