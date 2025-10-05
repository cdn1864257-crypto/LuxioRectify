import { MongoClient, ObjectId } from 'mongodb';
import { sendOrderConfirmationToCustomer, sendOrderNotificationToAdmin } from '../../utils/email.js';
import { sendTicketConfirmationToCustomer, sendTicketNotificationToSupport } from '../../utils/email.js';
import { encryptCodes } from '../../utils/encryption.js';

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

interface OrderSubmissionData {
  customerEmail: string;
  customerName: string;
  productId: string;
  productName: string;
  productModel?: string;
  productPrice: number;
  totalAmount: number;
  codeType: "TransCash" | "PCS";
  codes: string[];
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
      productId,
      productName,
      productModel,
      productPrice,
      totalAmount,
      codeType,
      codes
    }: OrderSubmissionData = req.body;

    // Validation des champs obligatoires
    if (!customerEmail || !customerName || !productId || !productName || !productPrice || !totalAmount || !codeType || !codes || codes.length === 0) {
      return res.status(400).json({
        error: 'Tous les champs sont obligatoires',
        missing: {
          customerEmail: !customerEmail,
          customerName: !customerName,
          productId: !productId,
          productName: !productName,
          productPrice: !productPrice,
          totalAmount: !totalAmount,
          codeType: !codeType,
          codes: !codes || codes.length === 0
        }
      });
    }

    // Validation du type de code
    if (codeType !== 'TransCash' && codeType !== 'PCS') {
      return res.status(400).json({
        error: 'Type de code invalide. Valeurs acceptées : TransCash, PCS'
      });
    }

    // Validation des codes (non vides)
    if (codes.some((code: string) => !code || code.trim() === '')) {
      return res.status(400).json({
        error: 'Tous les codes doivent être renseignés'
      });
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerEmail)) {
      return res.status(400).json({ error: 'Format email invalide' });
    }

    // Connexion à MongoDB
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      return res.status(500).json({ error: 'Configuration MongoDB manquante' });
    }

    const client = new MongoClient(mongoUri);

    try {
      await client.connect();

      const db = client.db('luxio');
      const ordersCollection = db.collection('orders');
      const usersCollection = db.collection('users');

      // Récupérer la langue de l'utilisateur
      const user = await usersCollection.findOne({ email: customerEmail.toLowerCase() });
      const userLanguage = user?.language || 'fr';

      const encryptedCodes = encryptCodes(codes);
      
      const newOrder = {
        customerEmail: customerEmail.toLowerCase(),
        customerName,
        productId,
        productName,
        productModel: productModel || '',
        productPrice,
        totalAmount,
        codeType,
        codes: encryptedCodes,
        status: 'pending',
        language: userLanguage,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const result = await ordersCollection.insertOne(newOrder);
      const orderId = result.insertedId.toString();

      const ticketOrderDetails = {
        orderId,
        orderReference: orderId,
        customerEmail: customerEmail.toLowerCase(),
        customerName,
        totalAmount,
        ticketType: codeType,
        ticketCodes: codes,
        language: userLanguage
      };

      Promise.all([
        sendTicketConfirmationToCustomer(ticketOrderDetails),
        sendTicketNotificationToSupport(ticketOrderDetails)
      ]).catch((error: Error) => {
        console.error('Erreur lors de l\'envoi des emails de tickets:', error);
      });

      // Retourner la confirmation de commande
      return res.status(201).json({
        success: true,
        message: 'Commande enregistrée avec succès',
        orderId,
        status: 'pending',
        customerEmail: customerEmail.toLowerCase(),
        totalAmount
      });
    } finally {
      await client.close();
    }

  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de la commande:', error);
    return res.status(500).json({
      error: 'Erreur serveur lors de l\'enregistrement de la commande',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export default handler;
