import { MongoClient, ObjectId } from 'mongodb';
import { parse } from 'cookie';
import { getErrorMessage, getLanguageFromRequest } from '../../server/utils/multilingual-messages.js';
import { validateSession } from '../../server/session-service.js';

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
    let sessionToken: string | undefined;
    
    const cookieHeader = req.headers.cookie;
    if (cookieHeader) {
      const cookies = parse(cookieHeader);
      sessionToken = cookies.session_token;
    }

    if (!sessionToken) {
      const lang = getLanguageFromRequest(req);
      return res.status(401).json({ 
        success: false,
        error: 'SESSION_MISSING',
        message: getErrorMessage('TOKEN_MISSING', lang)
      });
    }

    const session = await validateSession(sessionToken);
    
    if (!session) {
      const lang = getLanguageFromRequest(req);
      return res.status(401).json({ 
        success: false,
        error: 'SESSION_INVALID',
        message: getErrorMessage('TOKEN_INVALID', lang)
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

      const user = await usersCollection.findOne({ _id: new ObjectId(session.userId) });

      if (!user) {
        const lang = getLanguageFromRequest(req);
        return res.status(404).json({ 
          success: false,
          error: 'USER_NOT_FOUND',
          message: getErrorMessage('USER_NOT_FOUND', lang)
        });
      }

      const userResponse = {
        id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        country: user.country,
        city: user.city,
        address: user.address,
        phone: user.phone,
        email: user.email,
        createdAt: user.createdAt
      };

      return res.status(200).json({
        success: true,
        user: userResponse
      });
    } finally {
      await client.close();
    }

  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur:', error);
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
