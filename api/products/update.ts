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
  'replitprojet97@gmail.com',
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
  if (req.method !== 'PUT') {
    res.setHeader('Allow', ['PUT']);
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

    const updates = req.body;
    delete updates._id; // Don't allow updating _id

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

      // Add updatedAt timestamp
      updates.updatedAt = new Date();

      const result = await productsCollection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: updates },
        { returnDocument: 'after' }
      );

      if (!result) {
        return res.status(404).json({
          success: false,
          error: 'Produit non trouvé'
        });
      }

      return res.status(200).json({
        success: true,
        product: {
          id: result._id.toString(),
          ...result
        },
        message: 'Produit mis à jour avec succès'
      });
    } finally {
      await client.close();
    }
  } catch (error) {
    console.error('Error updating product:', error);
    return res.status(500).json({
      success: false,
      error: 'Erreur serveur lors de la mise à jour du produit',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export default handler;
