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

const ADMIN_EMAILS = [
  'support@luxiomarket.shop',
];

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
  if (req.method !== 'DELETE') {
    res.setHeader('Allow', ['DELETE']);
    return res.status(405).json({ 
      success: false,
      error: `Method ${req.method} Not Allowed` 
    });
  }

  try {
    // Check admin access (CSRF protection handled by Express middleware)
    const adminCheck = await isAdmin(req);
    if (!adminCheck.isAdmin) {
      return res.status(403).json({
        success: false,
        error: adminCheck.error || 'Accès non autorisé'
      });
    }

    const { id } = req.query;
    if (!id || typeof id !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'ID du produit manquant'
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
      const productsCollection = db.collection('products');

      const result = await productsCollection.deleteOne({ 
        _id: new ObjectId(id) 
      });

      if (result.deletedCount === 0) {
        return res.status(404).json({
          success: false,
          error: 'Produit non trouvé'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Produit supprimé avec succès'
      });
    } finally {
      await client.close();
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    return res.status(500).json({
      success: false,
      error: 'Erreur serveur lors de la suppression du produit',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export default handler;
