import { MongoClient } from 'mongodb';
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

// Admin email whitelist
const ADMIN_EMAILS = [
  'replitprojet97@gmail.com',
  // Add more admin emails here
];

async function isAdmin(req: VercelRequest): Promise<{ isAdmin: boolean; userId?: string; error?: string }> {
  try {
    // Extract token from cookie or Authorization header
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
      return { isAdmin: false, error: 'No authentication token provided' };
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return { isAdmin: false, error: 'JWT configuration error' };
    }

    // Verify JWT
    let decoded: JWTPayload;
    try {
      decoded = jwt.verify(token, jwtSecret) as JWTPayload;
    } catch (error) {
      return { isAdmin: false, error: 'Invalid or expired token' };
    }

    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      return { isAdmin: false, error: 'Database configuration error' };
    }

    const client = new MongoClient(mongoUri);
    
    try {
      await client.connect();
      const db = client.db('luxio');
      const usersCollection = db.collection('users');

      // Get user from database
      const user = await usersCollection.findOne({ email: decoded.email.toLowerCase() });

      if (!user) {
        return { isAdmin: false, error: 'User not found' };
      }

      // Check if user email is in admin list
      const isUserAdmin = ADMIN_EMAILS.includes(user.email.toLowerCase());

      return { 
        isAdmin: isUserAdmin, 
        userId: user._id.toString(),
        error: isUserAdmin ? undefined : 'Unauthorized: Admin access required'
      };
    } finally {
      await client.close();
    }
  } catch (error) {
    console.error('Admin check error:', error);
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

  try {
    // Check admin access (CSRF protection handled by Express middleware)
    const adminCheck = await isAdmin(req);
    if (!adminCheck.isAdmin) {
      return res.status(403).json({
        success: false,
        error: adminCheck.error || 'Accès non autorisé'
      });
    }

    const {
      name,
      description,
      price,
      originalPrice,
      discount,
      image,
      category,
      features,
      variants,
      hasVariants,
      available
    } = req.body;

    // Validate required fields
    if (!name || !price || !image || !category) {
      return res.status(400).json({
        success: false,
        error: 'Les champs nom, prix, image et catégorie sont obligatoires'
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

      const newProduct = {
        name,
        description: description || '',
        price: parseFloat(price),
        originalPrice: originalPrice ? parseFloat(originalPrice) : undefined,
        discount: discount ? parseInt(discount) : undefined,
        image,
        category,
        features: features || [],
        variants: variants || [],
        hasVariants: hasVariants || false,
        available: available !== false,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const result = await productsCollection.insertOne(newProduct);

      return res.status(201).json({
        success: true,
        product: {
          id: result.insertedId.toString(),
          ...newProduct
        },
        message: 'Produit créé avec succès'
      });
    } finally {
      await client.close();
    }
  } catch (error) {
    console.error('Error creating product:', error);
    return res.status(500).json({
      success: false,
      error: 'Erreur serveur lors de la création du produit',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export default handler;
