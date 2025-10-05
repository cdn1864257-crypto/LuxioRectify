import { MongoClient } from 'mongodb';
import { sendMaxelPayConfirmationToCustomer, sendMaxelPayNotificationToAdmin } from '../../utils/email.js';

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
      orderId,
      status,
      transactionId
    } = req.body;

    if (!orderId || !status) {
      return res.status(400).json({
        error: 'Données Maxelpay incomplètes'
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
      const ordersCollection = db.collection('maxelpay_orders');

      // Récupérer la commande pour obtenir les informations et la langue
      const order = await ordersCollection.findOne({ orderReference: orderId });

      if (!order) {
        return res.status(404).json({
          error: 'Commande non trouvée'
        });
      }

      await ordersCollection.updateOne(
        { orderReference: orderId },
        {
          $set: {
            paymentStatus: status,
            transactionId: transactionId || null,
            paidAt: status === 'success' ? new Date() : null,
            updatedAt: new Date()
          }
        }
      );

      // Envoyer les emails de confirmation si le paiement est réussi
      if (status === 'success') {
        const maxelPayOrder = {
          orderReference: order.orderReference,
          customerEmail: order.customerEmail,
          customerName: order.customerName,
          totalAmount: order.totalAmount,
          transactionId: transactionId || '',
          cartItems: order.cartItems || [],
          language: order.language || 'fr'
        };

        try {
          await Promise.all([
            sendMaxelPayConfirmationToCustomer(maxelPayOrder),
            sendMaxelPayNotificationToAdmin(maxelPayOrder)
          ]);
        } catch (error) {
          console.error('Erreur lors de l\'envoi des emails Maxelpay:', error);
        }
      }

      return res.status(200).json({
        success: true,
        message: 'Statut de paiement mis à jour',
        orderId,
        status
      });
    } finally {
      await client.close();
    }

  } catch (error) {
    console.error('Erreur lors du traitement du retour Maxelpay:', error);
    return res.status(500).json({
      error: 'Erreur serveur',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export default handler;
