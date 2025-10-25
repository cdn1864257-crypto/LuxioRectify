import { MongoClient, ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
import { parse } from 'cookie';
import { getErrorMessage, getLanguageFromRequest } from '../../server/utils/multilingual-messages.js';

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

interface JWTPayload {
  userId: string;
  email: string;
}

async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'DELETE') {
    res.setHeader('Allow', ['DELETE']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    let token: string | undefined;
    
    const cookieHeader = req.headers.cookie;
    if (cookieHeader) {
      const cookies = parse(cookieHeader);
      token = cookies.auth_token;
    }
    
    if (!token && req.headers.authorization) {
      const authHeader = req.headers.authorization;
      if (authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      }
    }

    if (!token) {
      const lang = getLanguageFromRequest(req);
      return res.status(401).json({ 
        success: false,
        error: 'TOKEN_MISSING',
        message: getErrorMessage('TOKEN_MISSING', lang)
      });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return res.status(500).json({ 
        success: false,
        error: 'INTERNAL_SERVER_ERROR',
        message: 'Configuration JWT manquante' 
      });
    }

    let decoded: JWTPayload;
    try {
      decoded = jwt.verify(token, jwtSecret) as JWTPayload;
    } catch (error) {
      const lang = getLanguageFromRequest(req);
      return res.status(401).json({ 
        success: false,
        error: 'TOKEN_INVALID',
        message: getErrorMessage('TOKEN_INVALID', lang)
      });
    }

    const userEmail = decoded.email;
    const orderId = req.query.orderId as string;

    if (!orderId) {
      return res.status(400).json({ error: 'Order ID manquant' });
    }

    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      return res.status(500).json({ 
        success: false,
        error: 'INTERNAL_SERVER_ERROR',
        message: 'Configuration MongoDB manquante' 
      });
    }

    const client = new MongoClient(mongoUri);

    try {
      await client.connect();
      const db = client.db('luxio');

      const normalizedEmail = userEmail.toLowerCase();

      // Try to find and delete the order from all possible collections
      const collections = ['bank_transfer_orders', 'nowpayments_orders', 'orders'];
      let deletedCount = 0;

      for (const collectionName of collections) {
        try {
          const collection = db.collection(collectionName);
          
          // Try with ObjectId first
          let result;
          try {
            result = await collection.deleteOne({
              _id: new ObjectId(orderId),
              customerEmail: normalizedEmail,
              status: { $nin: ['delivered', 'completed', 'shipped'] } // Only allow deletion of pending orders
            });
          } catch (err) {
            // If ObjectId conversion fails, try with string ID
            result = await collection.deleteOne({
              _id: orderId,
              customerEmail: normalizedEmail,
              status: { $nin: ['delivered', 'completed', 'shipped'] }
            });
          }

          if (result.deletedCount > 0) {
            deletedCount += result.deletedCount;
            break; // Order found and deleted, no need to check other collections
          }
        } catch (err) {
          console.error(`Error deleting from ${collectionName}:`, err);
          // Continue to next collection
        }
      }

      if (deletedCount === 0) {
        const lang = getLanguageFromRequest(req);
        return res.status(404).json({ 
          success: false,
          error: 'ORDER_NOT_FOUND',
          message: getErrorMessage('ORDER_NOT_FOUND', lang),
          details: 'The order does not exist, does not belong to you, or has already been shipped/delivered'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Commande annulée avec succès'
      });

    } finally {
      await client.close();
    }

  } catch (error) {
    console.error('Erreur lors de l\'annulation de la commande:', error);
    return res.status(500).json({
      error: 'Erreur serveur lors de l\'annulation de la commande',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

export default handler;
