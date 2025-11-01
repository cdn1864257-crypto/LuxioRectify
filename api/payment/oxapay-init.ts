import { MongoClient } from 'mongodb';
import axios from 'axios';
import { generatePaymentReference } from '../../utils/payment-reference.js';

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

interface OxaPayInitData {
  customerEmail: string;
  customerName: string;
  totalAmount: number;
  language?: string;
  cartItems: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
}

// REMOVED: Old generateOrderReference() function
// Now using centralized generatePaymentReference() from utils/payment-reference.ts
// This ensures consistent format: "FirstName LastName + 4 digits" everywhere

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
      language,
      cartItems
    }: OxaPayInitData = req.body;

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

    const oxapayApiKey = process.env.OXAPAY_API_KEY;
    
    if (!oxapayApiKey) {
      return res.status(500).json({ 
        error: 'Configuration OxaPay manquante',
        missing: {
          OXAPAY_API_KEY: !oxapayApiKey
        }
      });
    }

    const client = new MongoClient(mongoUri);

    try {
      await client.connect();

      const db = client.db('luxio');
      const ordersCollection = db.collection('oxapay_orders');
      const usersCollection = db.collection('users');

      const user = await usersCollection.findOne({ email: customerEmail.toLowerCase() });
      const userLanguage = language || user?.language || 'fr';

      // Generate standardized payment reference: "FirstName LastName + 4 digits"
      const paymentReference = generatePaymentReference(customerName);

      const newOrder = {
        customerEmail: customerEmail.toLowerCase(),
        customerName,
        totalAmount,
        cartItems,
        orderReference: paymentReference,  // Use standardized reference
        paymentMethod: 'oxapay',
        status: 'pending',
        language: userLanguage,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const result = await ordersCollection.insertOne(newOrder);
      const orderId = result.insertedId.toString();

      const backendUrl = process.env.BACKEND_URL || 'https://luxio.onrender.com';
      const frontendUrl = process.env.FRONTEND_URL || 'https://luxios.vercel.app';
      
      const callbackUrl = `${backendUrl}/api/payment/oxapay-webhook`;
      const returnUrl = `${backendUrl}/api/payment/oxapay-return?lang=${userLanguage}`;
      
      console.log(`[OxaPay] Backend URL: ${backendUrl}`);
      console.log(`[OxaPay] Frontend URL: ${frontendUrl}`);
      console.log(`[OxaPay] Callback URL: ${callbackUrl}`);
      console.log(`[OxaPay] Return URL: ${returnUrl}`);

      const oxapayRequestData = {
        merchant: oxapayApiKey,
        amount: totalAmount,
        currency: 'EUR',
        lifeTime: 30,
        feePaidByPayer: 0,
        underPaidCover: 2.5,
        callbackUrl: callbackUrl,
        returnUrl: returnUrl,
        description: `Luxio Order - ${paymentReference}`,
        orderId: paymentReference,  // ✅ Standardized reference
        email: customerEmail
      };

      console.log('[OxaPay] Creating invoice with data:', JSON.stringify(oxapayRequestData, null, 2));

      const paymentResponse = await axios.post(
        'https://api.oxapay.com/merchants/request',
        oxapayRequestData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const responseData = paymentResponse.data;

      if (!responseData || responseData.result !== 100 || !responseData.trackId) {
        console.error('[OxaPay] Invalid payment response:', responseData);
        throw new Error(`Réponse invalide de OxaPay: ${responseData?.message || 'Unknown error'}`);
      }

      await ordersCollection.updateOne(
        { orderReference: paymentReference },
        {
          $set: {
            oxapayTrackId: responseData.trackId,
            payLink: responseData.payLink,
            updatedAt: new Date()
          }
        }
      );

      console.log(`[OxaPay] Payment created: ${responseData.trackId} for order ${paymentReference}`);
      console.log('[OxaPay] Payment response:', JSON.stringify(responseData, null, 2));

      return res.status(200).json({
        success: true,
        orderId,
        orderReference: paymentReference,  // ✅ Standardized reference
        trackId: responseData.trackId,
        payLink: responseData.payLink,
        redirectUrl: responseData.payLink
      });
    } finally {
      await client.close();
    }

  } catch (error) {
    console.error('Erreur lors de l\'initialisation du paiement OxaPay:', error);
    return res.status(500).json({
      error: 'Erreur serveur lors de l\'initialisation du paiement',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export default handler;
