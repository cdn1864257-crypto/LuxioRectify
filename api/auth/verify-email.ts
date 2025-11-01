import { MongoClient, ObjectId } from 'mongodb';
import { sendWelcomeEmail } from '../../utils/email.js';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import { getErrorMessage } from '../../server/utils/multilingual-messages.js';

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
  if (req.method !== 'POST' && req.method !== 'GET') {
    res.setHeader('Allow', ['POST', 'GET']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const token = req.method === 'POST' ? req.body.token : req.query.token;
    const frontendUrl = process.env.FRONTEND_URL || 'https://luxiomarket.shop';

    if (!token || typeof token !== 'string') {
      if (req.method === 'GET') {
        res.setHeader('Location', `${frontendUrl}/verify-failed`);
        return res.status(302).end();
      }
      return res.status(400).json({ 
        error: 'VERIFICATION_TOKEN_MISSING',
        message: getErrorMessage('VERIFICATION_TOKEN_MISSING', 'en'),
        success: false 
      });
    }

    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      if (req.method === 'GET') {
        res.setHeader('Location', `${frontendUrl}/verify-failed`);
        return res.status(302).end();
      }
      return res.status(500).json({ 
        error: 'INTERNAL_SERVER_ERROR',
        message: getErrorMessage('INTERNAL_SERVER_ERROR', 'en')
      });
    }

    const client = new MongoClient(mongoUri);
    
    try {
      await client.connect();
      
      const db = client.db('luxio');
      const usersCollection = db.collection('users');

      let user = await usersCollection.findOne({
        emailVerificationToken: token,
        emailVerificationExpires: { $gt: new Date() }
      });

      if (!user) {
        const userWithExpiredToken = await usersCollection.findOne({
          emailVerificationToken: token
        });

        if (userWithExpiredToken && userWithExpiredToken.isEmailVerified) {
          if (req.method === 'GET') {
            res.setHeader('Location', `${frontendUrl}/verify-success`);
            return res.status(302).end();
          }
          const userLanguage = userWithExpiredToken.language || 'en';
          return res.status(200).json({ 
            message: getErrorMessage('EMAIL_ALREADY_VERIFIED', userLanguage),
            success: true,
            alreadyVerified: true,
            language: userLanguage
          });
        }

        if (req.method === 'GET') {
          res.setHeader('Location', `${frontendUrl}/verify-failed`);
          return res.status(302).end();
        }
        return res.status(400).json({ 
          error: 'VERIFICATION_TOKEN_INVALID',
          message: getErrorMessage('VERIFICATION_TOKEN_INVALID', 'en'),
          success: false 
        });
      }

      const userLanguage = user.language || 'en';

      if (user.isEmailVerified) {
        if (req.method === 'GET') {
          res.setHeader('Location', `${frontendUrl}/verify-success`);
          return res.status(302).end();
        }
        return res.status(200).json({ 
          message: getErrorMessage('EMAIL_ALREADY_VERIFIED', userLanguage),
          success: true,
          alreadyVerified: true,
          language: userLanguage
        });
      }

      await usersCollection.updateOne(
        { _id: user._id },
        { 
          $set: { 
            isEmailVerified: true,
            updatedAt: new Date()
          },
          $unset: { 
            emailVerificationToken: "",
            emailVerificationExpires: ""
          }
        }
      );

      if (process.env.NODE_ENV !== 'production') {
        console.log(`✅ Email vérifié pour l'utilisateur: ${user.email}`);
      }
      
      sendWelcomeEmail(user.email, user.firstName, userLanguage).catch((error: Error) => {
        if (process.env.NODE_ENV !== 'production') {
          console.error('❌ Erreur lors de l\'envoi de l\'email de bienvenue:', error);
        }
      });

      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        if (process.env.NODE_ENV !== 'production') {
          console.error('⚠️ JWT_SECRET not configured, user will need to login manually');
        }
        if (req.method === 'GET') {
          res.setHeader('Location', `${frontendUrl}/verify-success`);
          return res.status(302).end();
        }
        return res.status(200).json({
          message: getErrorMessage('EMAIL_VERIFIED_SUCCESS', userLanguage),
          success: true,
          language: userLanguage,
          autoLogin: false,
          user: {
            id: user._id.toString(),
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
          }
        });
      }

      const authToken = jwt.sign(
        {
          userId: user._id.toString(),
          email: user.email
        },
        jwtSecret,
        { expiresIn: '7d' }
      );

      const isProduction = process.env.NODE_ENV === 'production';
      const cookieDomain = isProduction ? (process.env.COOKIE_DOMAIN || '.luxiomarket.shop') : undefined;
      const cookie = serialize('auth_token', authToken, {
        domain: cookieDomain,
        httpOnly: true,
        secure: isProduction,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
        path: '/'
      });

      res.setHeader('Set-Cookie', cookie);

      if (req.method === 'GET') {
        res.setHeader('Location', `${frontendUrl}/verify-success`);
        return res.status(302).end();
      }

      return res.status(200).json({
        message: getErrorMessage('EMAIL_VERIFIED_SUCCESS', userLanguage),
        success: true,
        language: userLanguage,
        autoLogin: true,
        user: {
          id: user._id.toString(),
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          country: user.country,
          city: user.city,
          address: user.address,
          phone: user.phone
        }
      });
    } finally {
      await client.close();
    }

  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Erreur lors de la vérification de l\'email:', error);
    }
    const frontendUrl = process.env.FRONTEND_URL || 'https://luxiomarket.shop';
    if (req.method === 'GET') {
      res.setHeader('Location', `${frontendUrl}/verify-failed`);
      return res.status(302).end();
    }
    return res.status(500).json({
      error: 'INTERNAL_SERVER_ERROR',
      message: getErrorMessage('INTERNAL_SERVER_ERROR', 'en'),
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export default handler;
