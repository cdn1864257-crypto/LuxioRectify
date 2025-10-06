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

interface MaxelpayInitData {
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
    }: MaxelpayInitData = req.body;

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

    const maxelpayApiKey = process.env.MAXELPAY_API_KEY;
    const maxelpaySecretKey = process.env.MAXELPAY_SECRET_KEY;
    
    if (!maxelpayApiKey || !maxelpaySecretKey) {
      return res.status(500).json({ 
        error: 'Configuration Maxelpay manquante',
        missing: {
          MAXELPAY_API_KEY: !maxelpayApiKey,
          MAXELPAY_SECRET_KEY: !maxelpaySecretKey
        }
      });
    }

    const client = new MongoClient(mongoUri);

    try {
      await client.connect();

      const db = client.db('luxio');
      const ordersCollection = db.collection('maxelpay_orders');
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
        paymentMethod: 'maxelpay',
        status: 'pending',
        language: userLanguage,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const result = await ordersCollection.insertOne(newOrder);
      const orderId = result.insertedId.toString();

      const returnUrl = `${req.headers.origin || 'https://luxio-shop.eu'}/api/payment/maxelpay-return`;
      const cancelUrl = `${req.headers.origin || 'https://luxio-shop.eu'}/payment?cancelled=true`;
      const webhookUrl = `${req.headers.origin || 'https://luxio-shop.eu'}/api/payment/maxelpay-webhook`;

      const timestamp = Math.floor(Date.now() / 1000);
      
      const paymentData = {
        orderID: orderReference,
        amount: totalAmount.toFixed(2),
        currency: 'EUR',
        timestamp: timestamp.toString(),
        userName: customerName,
        siteName: 'Luxio',
        userEmail: customerEmail,
        redirectUrl: returnUrl,
        websiteUrl: req.headers.origin || 'https://luxio-shop.eu',
        cancelUrl: cancelUrl,
        webhookUrl: webhookUrl
      };

      // Utiliser l'URL de production MaxelPay
      // Mode TEST: utilisez la variable MAXELPAY_MODE=test si disponible
      const maxelpayMode = process.env.MAXELPAY_MODE || 'production';
      const apiUrl = maxelpayMode === 'test' 
        ? 'https://api.maxelpay.com/v1/test/merchant/order/checkout'
        : 'https://api.maxelpay.com/v1/prod/merchant/order/checkout';

      console.log(`[MaxelPay] Mode: ${maxelpayMode}, URL: ${apiUrl}`);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': maxelpayApiKey,
          'X-SECRET-KEY': maxelpaySecretKey
        },
        body: JSON.stringify(paymentData)
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Erreur MaxelPay API:', errorData);
        return res.status(500).json({ 
          error: 'Erreur lors de la création du paiement MaxelPay',
          details: errorData
        });
      }

      const maxelpayResponse = await response.json();
      const redirectUrl = maxelpayResponse.paymentUrl || maxelpayResponse.url;

      return res.status(200).json({
        success: true,
        orderId,
        orderReference,
        redirectUrl
      });
    } finally {
      await client.close();
    }

  } catch (error) {
    console.error('Erreur lors de l\'initialisation du paiement Maxelpay:', error);
    return res.status(500).json({
      error: 'Erreur serveur lors de l\'initialisation du paiement',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export default handler;
