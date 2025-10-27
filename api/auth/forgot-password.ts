import { MongoClient } from 'mongodb';
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
    const { email, locale } = req.body;

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
      // Utiliser la langue fournie par le frontend, sinon celle de l'utilisateur, sinon 'en'
      const language = locale || user?.language || 'en';
      const firstName = user?.firstName || '';

      console.log('[Forgot Password] Attempting to send reset email...');
      console.log('[Forgot Password] To:', email);
      console.log('[Forgot Password] Language:', language);
      console.log('[Forgot Password] Locale from frontend:', locale);

      const emailSent = await sendPasswordResetEmail(
        email.toLowerCase(),
        {
          firstName,
          locale: language,
          db
        }
      );

      if (!emailSent) {
        console.error('[Forgot Password] Failed to send reset email to:', email);
        return res.status(500).json({ 
          error: 'Error sending email',
          details: 'Failed to send password reset email. Please check SendGrid configuration.'
        });
      }

      console.log('[Forgot Password] Reset email sent successfully to:', email);
      // Toujours renvoyer succès pour éviter la fuite d'existence d'un compte
      return res.status(200).json({ 
        success: true,
        message: 'If this email exists, a reset link has been sent.'
      });
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
