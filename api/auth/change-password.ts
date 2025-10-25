import { MongoClient, ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
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

interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const { currentPassword, newPassword }: ChangePasswordData = req.body;

    if (!currentPassword || !newPassword) {
      const lang = getLanguageFromRequest(req);
      return res.status(400).json({ 
        success: false,
        error: 'REQUIRED_FIELDS',
        message: getErrorMessage('REQUIRED_FIELDS', lang)
      });
    }

    if (newPassword.length < 6) {
      const lang = getLanguageFromRequest(req);
      return res.status(400).json({ 
        success: false,
        error: 'PASSWORD_TOO_SHORT',
        message: getErrorMessage('PASSWORD_TOO_SHORT', lang)
      });
    }

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
      const lang = getLanguageFromRequest(req);
      return res.status(500).json({ 
        success: false,
        error: 'INTERNAL_SERVER_ERROR',
        message: getErrorMessage('INTERNAL_SERVER_ERROR', lang)
      });
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, jwtSecret);
    } catch (error) {
      const lang = getLanguageFromRequest(req);
      return res.status(401).json({ 
        success: false,
        error: 'SESSION_EXPIRED',
        message: getErrorMessage('SESSION_EXPIRED', lang)
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
    
    try {
      await client.connect();
      
      const db = client.db('luxio');
      const usersCollection = db.collection('users');

      const user = await usersCollection.findOne({ _id: new ObjectId(decoded.userId) });
      
      if (!user) {
        const lang = getLanguageFromRequest(req);
        return res.status(404).json({ 
          success: false,
          error: 'USER_NOT_FOUND',
          message: getErrorMessage('USER_NOT_FOUND', lang)
        });
      }

      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
      
      if (!isPasswordValid) {
        const lang = getLanguageFromRequest(req);
        return res.status(401).json({ 
          success: false,
          error: 'INCORRECT_CURRENT_PASSWORD',
          message: getErrorMessage('INCORRECT_CURRENT_PASSWORD', lang)
        });
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);

      await usersCollection.updateOne(
        { _id: new ObjectId(decoded.userId) },
        { $set: { password: hashedNewPassword } }
      );

      return res.status(200).json({ 
        success: true, 
        message: 'Mot de passe modifié avec succès' 
      });

    } finally {
      await client.close();
    }

  } catch (error) {
    console.error('Erreur lors du changement de mot de passe:', error);
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
