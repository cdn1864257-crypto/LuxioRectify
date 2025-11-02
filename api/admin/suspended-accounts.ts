import { MongoClient } from 'mongodb';
import jwt from 'jsonwebtoken';
import { getUserStatus, liftSuspension } from '../../utils/account-suspension.js';
import { verifyAdminAuth } from '../../utils/admin-auth.js';

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
  // Vérifier l'authentification admin
  const isAdmin = await verifyAdminAuth(req);
  if (!isAdmin) {
    return res.status(403).json({ error: 'Accès interdit - Admin uniquement' });
  }

  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    return res.status(500).json({ error: 'Configuration MongoDB manquante' });
  }

  const client = new MongoClient(mongoUri);
  
  try {
    await client.connect();
    const db = client.db('luxio');
    const usersCollection = db.collection('users');

    if (req.method === 'GET') {
      const suspendedUsers = await usersCollection.find({
        status: 'suspended',
        suspendedUntil: { $ne: null }
      }).toArray();

      const formattedUsers = suspendedUsers.map(user => {
        const unpaidHistory = user.unpaidHistory || [];
        const last30Days = new Date();
        last30Days.setDate(last30Days.getDate() - 30);
        
        const recentUnpaidCount = unpaidHistory.filter((order: any) => {
          const orderDate = new Date(order.createdAt);
          return orderDate >= last30Days;
        }).length;

        return {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          suspendedUntil: user.suspendedUntil,
          unpaidOrdersCount: recentUnpaidCount,
          createdAt: user.createdAt
        };
      });

      return res.status(200).json({
        suspendedAccounts: formattedUsers,
        total: formattedUsers.length
      });
      
    } else if (req.method === 'POST') {
      const { email, action } = req.body;
      
      if (!email) {
        return res.status(400).json({ error: 'Email requis' });
      }

      if (action === 'reactivate') {
        const user = await usersCollection.findOne({ email: email.toLowerCase() });
        
        if (!user) {
          return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
        
        await liftSuspension(usersCollection, email);
        
        // Envoyer l'email de réactivation
        try {
          const { sendReactivationEmail } = await import('../../utils/suspension-emails.js');
          await sendReactivationEmail(
            user.email,
            user.firstName || 'Client',
            user.language || 'fr'
          );
        } catch (emailError) {
          console.error('Failed to send reactivation email:', emailError);
        }
        
        return res.status(200).json({
          message: 'Compte réactivé avec succès',
          email
        });
      } else {
        return res.status(400).json({ error: 'Action non reconnue' });
      }
      
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
    
  } catch (error) {
    console.error('Error managing suspended accounts:', error);
    return res.status(500).json({
      error: 'Erreur serveur',
      details: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : 'Unknown error') : undefined
    });
  } finally {
    await client.close();
  }
}

export default handler;
