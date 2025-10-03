import { MongoClient } from 'mongodb';
import { sendBankTransferEmail } from '../../utils/email.js';

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

interface BankTransferData {
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
    }: BankTransferData = req.body;

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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerEmail)) {
      return res.status(400).json({ error: 'Format email invalide' });
    }

    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      return res.status(500).json({ error: 'Configuration MongoDB manquante' });
    }

    const client = new MongoClient(mongoUri);

    try {
      await client.connect();

      const db = client.db('luxio');
      const ordersCollection = db.collection('bank_transfer_orders');

      const orderReference = generateOrderReference();

      const newOrder = {
        customerEmail: customerEmail.toLowerCase(),
        customerName,
        totalAmount,
        cartItems,
        orderReference,
        paymentMethod: 'bank_transfer',
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const result = await ordersCollection.insertOne(newOrder);
      const orderId = result.insertedId.toString();

      const bankDetails = {
        orderId,
        customerEmail: customerEmail.toLowerCase(),
        customerName,
        totalAmount,
        bankName: 'Matt Luxio',
        iban: 'ES6115632626383268707364',
        bic: 'NTSBESM1XXX',
        reference: `Dépôt+${customerName} #${orderReference}`
      };

      sendBankTransferEmail(bankDetails).catch((error: Error) => {
        console.error('Erreur lors de l\'envoi de l\'email de virement:', error);
      });

      return res.status(201).json({
        success: true,
        message: 'Commande enregistrée avec succès',
        orderId,
        orderReference,
        status: 'pending',
        bankDetails: {
          bankName: bankDetails.bankName,
          iban: bankDetails.iban,
          bic: bankDetails.bic,
          reference: bankDetails.reference,
          amount: totalAmount
        }
      });
    } finally {
      await client.close();
    }

  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de la commande par virement:', error);
    return res.status(500).json({
      error: 'Erreur serveur lors de l\'enregistrement de la commande',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export default handler;
