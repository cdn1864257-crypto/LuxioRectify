import { MongoClient } from 'mongodb';
import crypto from 'crypto';
import { sendPasswordResetEmail } from '../../utils/email.js';

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
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'REQUIRED_FIELDS' });
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

      const user = await usersCollection.findOne({ email: email.toLowerCase() });

      // Pour la sécurité, on retourne toujours success même si l'email n'existe pas
      if (!user) {
        return res.status(200).json({ success: true });
      }

      // Générer un token de réinitialisation
      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 heure

      // Sauvegarder le token
      await usersCollection.updateOne(
        { email: email.toLowerCase() },
        {
          $set: {
            resetToken,
            resetTokenExpiry,
            updatedAt: new Date()
          }
        }
      );

      const language = user.language || 'fr';

      console.log('[Forgot Password] Attempting to send reset email...');
      console.log('[Forgot Password] To:', user.email);
      console.log('[Forgot Password] Language:', language);
      console.log('[Forgot Password] Reset Token:', resetToken);

      const emailSent = await sendPasswordResetEmail(
        user.email,
        user.firstName,
        resetToken,
        language
      );

      if (!emailSent) {
        console.error('[Forgot Password] Failed to send reset email to:', user.email);
        return res.status(500).json({ 
          error: 'Error sending email',
          details: 'Failed to send password reset email. Please check SendGrid configuration.'
        });
      }

      console.log('[Forgot Password] Reset email sent successfully to:', user.email);
      return res.status(200).json({ success: true });
    } finally {
      await client.close();
    }
  } catch (error) {
    console.error('Erreur lors de la demande de réinitialisation:', error);
    return res.status(500).json({
      error: 'Erreur serveur',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export default handler;
