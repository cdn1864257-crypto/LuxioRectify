import { MongoClient } from 'mongodb';
import { parse } from 'cookie';
import jwt from 'jsonwebtoken';

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
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({
      success: false,
      error: `Method ${req.method} Not Allowed`
    });
  }

  try {
    let userEmail: string | null = null;

    const cookieHeader = req.headers.cookie;
    if (cookieHeader) {
      const cookies = parse(cookieHeader);
      const token = cookies.auth_token;
      
      if (token) {
        const jwtSecret = process.env.JWT_SECRET;
        if (jwtSecret) {
          try {
            const decoded = jwt.verify(token, jwtSecret) as JWTPayload;
            userEmail = decoded.email.toLowerCase();
          } catch (error) {
          }
        }
      }
    }

    if (!userEmail) {
      return res.status(401).json({
        success: false,
        error: 'Authentication requise'
      });
    }

    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      return res.status(500).json({
        success: false,
        error: 'Configuration MongoDB manquante'
      });
    }

    const client = new MongoClient(mongoUri);

    try {
      await client.connect();
      const db = client.db('luxio');
      
      const now = new Date();
      const thirtyMinutesAgo = new Date(now.getTime() - 30 * 60 * 1000);
      const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

      const oxapayCollection = db.collection('oxapay_orders');
      const bankTransferCollection = db.collection('bank_transfer_orders');

      const [oxapayResult, bankTransferResult] = await Promise.all([
        oxapayCollection.updateMany(
          {
            customerEmail: userEmail,
            status: 'pending',
            createdAt: { $lt: thirtyMinutesAgo }
          },
          {
            $set: {
              status: 'expired',
              updatedAt: now
            }
          }
        ),
        bankTransferCollection.updateMany(
          {
            customerEmail: userEmail,
            status: 'pending',
            createdAt: { $lt: twentyFourHoursAgo }
          },
          {
            $set: {
              status: 'expired',
              updatedAt: now
            }
          }
        )
      ]);

      const totalUpdated = oxapayResult.modifiedCount + bankTransferResult.modifiedCount;

      return res.status(200).json({
        success: true,
        message: 'Vérification des statuts effectuée',
        updated: totalUpdated
      });
    } finally {
      await client.close();
    }
  } catch (error) {
    console.error('Error checking order status:', error);
    return res.status(500).json({
      success: false,
      error: 'Erreur lors de la vérification des statuts',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export default handler;
