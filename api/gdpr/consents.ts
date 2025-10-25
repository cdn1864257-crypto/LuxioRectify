import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDatabase } from '../../server/db/mongodb';
import { verifyToken } from '../../server/auth/jwt';
import cookie from 'cookie';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies.token;

    if (!token) {
      return res.status(401).json({ error: 'UNAUTHORIZED' });
    }

    const decoded = verifyToken(token);
    if (!decoded || !decoded.userId) {
      return res.status(401).json({ error: 'INVALID_TOKEN' });
    }

    const { db } = await connectToDatabase();
    const { ObjectId } = require('mongodb');
    
    const userId = new ObjectId(decoded.userId);

    if (req.method === 'GET') {
      const user = await db.collection('users').findOne({ _id: userId });
      
      if (!user) {
        return res.status(404).json({ error: 'USER_NOT_FOUND' });
      }

      const consents = {
        essentialCookies: true,
        marketingEmails: user.consents?.marketingEmails ?? false,
        analyticsTracking: user.consents?.analyticsTracking ?? false,
        thirdPartySharing: user.consents?.thirdPartySharing ?? false,
        updatedAt: user.consents?.updatedAt ?? user.createdAt
      };

      return res.status(200).json({ consents });

    } else if (req.method === 'POST') {
      const { marketingEmails, analyticsTracking, thirdPartySharing } = req.body;

      if (typeof marketingEmails !== 'boolean' || 
          typeof analyticsTracking !== 'boolean' || 
          typeof thirdPartySharing !== 'boolean') {
        return res.status(400).json({ error: 'INVALID_CONSENT_DATA' });
      }

      const updatedConsents = {
        essentialCookies: true,
        marketingEmails,
        analyticsTracking,
        thirdPartySharing,
        updatedAt: new Date()
      };

      await db.collection('users').updateOne(
        { _id: userId },
        { 
          $set: { 
            consents: updatedConsents,
            updatedAt: new Date()
          } 
        }
      );

      return res.status(200).json({ 
        message: 'CONSENTS_UPDATED_SUCCESSFULLY',
        consents: updatedConsents 
      });

    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }

  } catch (error) {
    console.error('Error managing consents:', error);
    return res.status(500).json({ error: 'INTERNAL_SERVER_ERROR' });
  }
}
