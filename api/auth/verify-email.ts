import { MongoClient, ObjectId } from 'mongodb';
import { sendWelcomeEmail } from '../../utils/email.js';

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

    if (!token || typeof token !== 'string') {
      return res.status(400).json({ 
        error: 'Token de vérification manquant',
        success: false 
      });
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

      const user = await usersCollection.findOne({
        emailVerificationToken: token,
        emailVerificationExpires: { $gt: new Date() }
      });

      if (!user) {
        return res.status(400).json({ 
          error: 'Token de vérification invalide ou expiré',
          success: false 
        });
      }

      if (user.isEmailVerified) {
        return res.status(200).json({ 
          message: 'Votre email est déjà vérifié',
          success: true,
          alreadyVerified: true
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

      console.log(`✅ Email vérifié pour l'utilisateur: ${user.email}`);
      
      sendWelcomeEmail(user.email, user.firstName, user.language || 'fr').catch((error: Error) => {
        console.error('❌ Erreur lors de l\'envoi de l\'email de bienvenue:', error);
      });

      return res.status(200).json({
        message: 'Email vérifié avec succès ! Un email de bienvenue vous a été envoyé.',
        success: true,
        user: {
          id: user._id.toString(),
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        }
      });
    } finally {
      await client.close();
    }

  } catch (error) {
    console.error('Erreur lors de la vérification de l\'email:', error);
    return res.status(500).json({
      error: 'Erreur serveur lors de la vérification',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export default handler;
