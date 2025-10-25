import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
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

interface LoginData {
  email: string;
  password: string;
}

async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const { email, password }: LoginData = req.body;

    // Vérification des champs
    if (!email || !password) {
      return res.status(400).json({ error: 'REQUIRED_FIELDS', errorCode: 'REQUIRED_FIELDS' });
    }

    // Connexion à MongoDB
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      return res.status(500).json({ error: 'DATABASE_CONFIG_ERROR', errorCode: 'DATABASE_CONFIG_ERROR' });
    }

    const client = new MongoClient(mongoUri);
    let user: any;
    
    try {
      await client.connect();
      
      const db = client.db('luxio');
      const usersCollection = db.collection('users');

      // Rechercher l'utilisateur par email
      user = await usersCollection.findOne({ email: email.toLowerCase() });
      
      if (!user) {
        const lang = getLanguageFromRequest(req);
        return res.status(401).json({ 
          success: false,
          error: 'INVALID_CREDENTIALS',
          message: getErrorMessage('INVALID_CREDENTIALS', lang)
        });
      }

      // Vérifier le mot de passe
      const isPasswordValid = await bcrypt.compare(password, user.password);
      
      if (!isPasswordValid) {
        const lang = getLanguageFromRequest(req);
        return res.status(401).json({ 
          success: false,
          error: 'INVALID_CREDENTIALS',
          message: getErrorMessage('INVALID_CREDENTIALS', lang)
        });
      }
    } finally {
      await client.close();
    }

    // Générer le JWT
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return res.status(500).json({ error: 'JWT_CONFIG_ERROR', errorCode: 'JWT_CONFIG_ERROR' });
    }

    const token = jwt.sign(
      {
        userId: user._id.toString(),
        email: user.email
      },
      jwtSecret,
      { expiresIn: '7d' } // Token valide 7 jours
    );

    // Créer le cookie httpOnly et secure
    const isProduction = process.env.NODE_ENV === 'production';
    const cookie = serialize('auth_token', token, {
      httpOnly: true,
      secure: isProduction, // HTTPS uniquement en production
      sameSite: isProduction ? 'none' : 'lax', // 'none' requis pour cross-domain en production
      maxAge: 60 * 60 * 24 * 7, // 7 jours en secondes
      path: '/'
    });

    res.setHeader('Set-Cookie', cookie);

    // Retourner les infos utilisateur sans le mot de passe
    const userResponse = {
      id: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      country: user.country,
      city: user.city,
      address: user.address,
      phone: user.phone,
      email: user.email
    };

    return res.status(200).json({
      message: 'Connexion réussie',
      user: userResponse
    });

  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    return res.status(500).json({
      error: 'SERVER_ERROR',
      errorCode: 'SERVER_ERROR',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export default handler;
