import { MongoClient } from 'mongodb';
import jwt from 'jsonwebtoken';
import { getUserStatus, getSuspensionEndDate, formatSuspensionEndDate } from '../../utils/account-suspension.js';

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
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const token = req.cookies.token;
    
    if (!token) {
      return res.status(401).json({ error: 'Non authentifié' });
    }

    const jwtSecret = process.env.JWT_SECRET || 'dev_secret_12345';
    let decoded: any;
    
    try {
      decoded = jwt.verify(token, jwtSecret);
    } catch (error) {
      return res.status(401).json({ error: 'Token invalide' });
    }

    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      return res.status(500).json({ error: 'Configuration MongoDB manquante' });
    }

    const client = new MongoClient(mongoUri);
    
    try {
      await client.connect();
      const db = client.db('luxio');
      const usersCollection = db.collection('users');

      const user = await usersCollection.findOne({ email: decoded.email });
      
      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé' });
      }

      const currentStatus = getUserStatus(user);
      const suspensionEndDate = getSuspensionEndDate(user);
      const unpaidHistory = user.unpaidHistory || [];
      
      const last30Days = new Date();
      last30Days.setDate(last30Days.getDate() - 30);
      
      const recentUnpaidOrders = unpaidHistory.filter((order: any) => {
        const orderDate = new Date(order.createdAt);
        return orderDate >= last30Days;
      });

      const response: any = {
        status: currentStatus,
        isSuspended: currentStatus === 'suspended',
        unpaidOrdersCount: recentUnpaidOrders.length,
        recentUnpaidOrders: recentUnpaidOrders.map((order: any) => ({
          orderId: order.orderId,
          amount: order.amount,
          status: order.status,
          createdAt: order.createdAt
        }))
      };

      if (suspensionEndDate) {
        response.suspendedUntil = suspensionEndDate;
        response.suspendedUntilFormatted = formatSuspensionEndDate(suspensionEndDate, user.language || 'fr');
      }

      return res.status(200).json(response);
      
    } finally {
      await client.close();
    }
    
  } catch (error) {
    console.error('Error fetching suspension status:', error);
    return res.status(500).json({
      error: 'Erreur serveur',
      details: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : 'Unknown error') : undefined
    });
  }
}

export default handler;
