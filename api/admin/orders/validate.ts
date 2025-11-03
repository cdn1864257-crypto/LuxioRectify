import { MongoClient, ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
import { parse } from 'cookie';

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

// Load admin emails from environment variable (semicolon-separated for security)
const getAdminEmails = (): string[] => {
  const adminEmailsEnv = process.env.ADMIN_EMAILS;
  if (!adminEmailsEnv) {
    console.error('⚠️  CRITICAL: ADMIN_EMAILS environment variable is not set!');
    return [];
  }
  return adminEmailsEnv.split(';').map(email => email.trim().toLowerCase()).filter(email => email.length > 0);
};

const ADMIN_EMAILS = getAdminEmails();

async function isAdmin(req: VercelRequest): Promise<{ isAdmin: boolean; error?: string }> {
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
      return { isAdmin: false, error: 'No authentication token' };
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return { isAdmin: false, error: 'JWT configuration error' };
    }

    let decoded: JWTPayload;
    try {
      decoded = jwt.verify(token, jwtSecret) as JWTPayload;
    } catch (error) {
      return { isAdmin: false, error: 'Invalid token' };
    }

    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      return { isAdmin: false, error: 'Database error' };
    }

    const client = new MongoClient(mongoUri);
    
    try {
      await client.connect();
      const db = client.db('luxio');
      const usersCollection = db.collection('users');
      const user = await usersCollection.findOne({ email: decoded.email.toLowerCase() });

      if (!user) {
        return { isAdmin: false, error: 'User not found' };
      }

      const isUserAdmin = ADMIN_EMAILS.includes(user.email.toLowerCase());
      return { isAdmin: isUserAdmin, error: isUserAdmin ? undefined : 'Not authorized' };
    } finally {
      await client.close();
    }
  } catch (error) {
    return { isAdmin: false, error: 'Authentication error' };
  }
}

async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({
      success: false,
      error: `Method ${req.method} Not Allowed`
    });
  }

  const adminCheck = await isAdmin(req);
  
  if (!adminCheck.isAdmin) {
    return res.status(403).json({
      success: false,
      error: adminCheck.error || 'Accès non autorisé'
    });
  }

  try {
    const { orderReference, paymentMethod, newStatus } = req.body;

    if (!orderReference || !paymentMethod || !newStatus) {
      return res.status(400).json({
        success: false,
        error: 'orderReference, paymentMethod et newStatus sont requis'
      });
    }

    if (!['success', 'cancelled', 'pending'].includes(newStatus)) {
      return res.status(400).json({
        success: false,
        error: 'Statut invalide. Utilisez: success, cancelled, ou pending'
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
      
      let collectionName = '';
      if (paymentMethod === 'bank_transfer') {
        collectionName = 'bank_transfer_orders';
      } else if (paymentMethod === 'oxapay') {
        collectionName = 'oxapay_orders';
      } else {
        return res.status(400).json({
          success: false,
          error: 'Méthode de paiement invalide'
        });
      }

      const ordersCollection = db.collection(collectionName);
      
      const order = await ordersCollection.findOne({ orderReference });

      if (!order) {
        return res.status(404).json({
          success: false,
          error: 'Commande non trouvée'
        });
      }

      const updateData: any = {
        status: newStatus,
        updatedAt: new Date()
      };

      if (newStatus === 'success') {
        updateData.paidAt = new Date();
        updateData.validatedBy = 'admin';
      }

      const result = await ordersCollection.updateOne(
        { orderReference },
        { $set: updateData }
      );

      if (result.modifiedCount === 0) {
        return res.status(400).json({
          success: false,
          error: 'Aucune modification effectuée'
        });
      }

      return res.status(200).json({
        success: true,
        message: `Commande ${orderReference} mise à jour avec succès`,
        newStatus,
        orderReference
      });
    } finally {
      await client.close();
    }
  } catch (error) {
    console.error('Error validating order:', error);
    return res.status(500).json({
      success: false,
      error: 'Erreur lors de la validation de la commande',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export default handler;
