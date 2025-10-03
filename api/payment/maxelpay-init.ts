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

    const maxelpayMerchantId = process.env.MAXELPAY_MERCHANT_ID;
    const maxelpayApiKey = process.env.MAXELPAY_API_KEY;
    
    if (!maxelpayMerchantId || !maxelpayApiKey) {
      return res.status(500).json({ 
        error: 'Configuration Maxelpay manquante',
        missing: {
          MAXELPAY_MERCHANT_ID: !maxelpayMerchantId,
          MAXELPAY_API_KEY: !maxelpayApiKey
        }
      });
    }

    const client = new MongoClient(mongoUri);

    try {
      await client.connect();

      const db = client.db('luxio');
      const ordersCollection = db.collection('maxelpay_orders');

      const orderReference = generateOrderReference();

      const newOrder = {
        customerEmail: customerEmail.toLowerCase(),
        customerName,
        totalAmount,
        cartItems,
        orderReference,
        paymentMethod: 'maxelpay',
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const result = await ordersCollection.insertOne(newOrder);
      const orderId = result.insertedId.toString();

      const returnUrl = `${req.headers.origin || 'https://luxio-shop.eu'}/api/payment/maxelpay-return`;
      const cancelUrl = `${req.headers.origin || 'https://luxio-shop.eu'}/payment?cancelled=true`;

      const params = new URLSearchParams({
        merchant_id: maxelpayMerchantId,
        amount: totalAmount.toFixed(2),
        currency: 'EUR',
        reference: orderReference,
        order_id: orderId,
        description: `Luxio Order ${orderReference}`,
        customer_email: customerEmail,
        customer_name: customerName,
        return_url: returnUrl,
        cancel_url: cancelUrl,
        api_key: maxelpayApiKey
      });

      const redirectUrl = `https://checkout.maxelpay.com/?${params.toString()}`;

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
