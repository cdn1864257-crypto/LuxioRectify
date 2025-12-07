import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';
import { serialize } from 'cookie';
import { getErrorMessage, getLanguageFromRequest } from '../../server/utils/multilingual-messages.js';
import { createSession, getSessionCookieOptions } from '../../server/session-service.js';
import { generateAccessToken } from '../../server/services/jwt-service.js';

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

    if (!email || !password) {
      const lang = getLanguageFromRequest(req);
      return res.status(400).json({ 
        success: false,
        error: 'REQUIRED_FIELDS',
        message: getErrorMessage('REQUIRED_FIELDS', lang)
      });
    }

    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      const lang = getLanguageFromRequest(req);
      return res.status(500).json({ 
        success: false,
        error: 'INTERNAL_SERVER_ERROR',
        message: getErrorMessage('INTERNAL_SERVER_ERROR', lang)
      });
    }

    const client = new MongoClient(mongoUri);
    let user: any;
    
    try {
      await client.connect();
      
      const db = client.db('luxio');
      const usersCollection = db.collection('users');

      user = await usersCollection.findOne({ email: email.toLowerCase() });
      
      if (!user) {
        const lang = getLanguageFromRequest(req);
        return res.status(401).json({ 
          success: false,
          error: 'INVALID_CREDENTIALS',
          message: getErrorMessage('INVALID_CREDENTIALS', lang)
        });
      }

      if (user.isEmailVerified === false) {
        const lang = getLanguageFromRequest(req);
        return res.status(403).json({ 
          success: false,
          error: 'EMAIL_NOT_VERIFIED',
          message: getErrorMessage('EMAIL_NOT_VERIFIED', lang)
        });
      }

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

    const ipAddress = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || undefined;
    const userAgent = req.headers['user-agent'] || undefined;
    
    const session = await createSession(
      user._id.toString(),
      typeof ipAddress === 'string' ? ipAddress : ipAddress?.[0],
      userAgent
    );

    const isProduction = process.env.NODE_ENV === 'production';
    const cookieOptions = getSessionCookieOptions(isProduction);
    const cookie = serialize('session_token', session.sessionId, cookieOptions);

    res.setHeader('Set-Cookie', cookie);

    const jwtResult = generateAccessToken({
      userId: user._id.toString(),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    });

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
      success: true,
      message: 'Connexion réussie',
      user: userResponse,
      token: jwtResult.success ? jwtResult.token : undefined,
      expiresIn: jwtResult.success ? jwtResult.expiresIn : undefined
    });

  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Erreur lors de la connexion:', error);
    }
    const lang = getLanguageFromRequest(req);
    return res.status(500).json({
      success: false,
      error: 'INTERNAL_SERVER_ERROR',
      message: getErrorMessage('INTERNAL_SERVER_ERROR', lang),
      details: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : 'Unknown error') : undefined
    });
  }
}

export default handler;
