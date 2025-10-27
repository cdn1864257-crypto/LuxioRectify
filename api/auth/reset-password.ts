import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';
import { verifyResetToken } from '../../utils/email.js';

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
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ error: 'REQUIRED_FIELDS' });
    }

    if (password.length < 8) {
      return res.status(400).json({ error: 'PASSWORD_TOO_SHORT' });
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

      const user = await verifyResetToken(db, token);

      if (!user) {
        return res.status(400).json({ error: 'INVALID_OR_EXPIRED_TOKEN' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await usersCollection.updateOne(
        { _id: user._id },
        {
          $set: {
            password: hashedPassword,
            updatedAt: new Date()
          },
          $unset: {
            'security.resetPassword': ""
          }
        }
      );

      return res.status(200).json({ success: true });
    } finally {
      await client.close();
    }
  } catch (error) {
    console.error('Erreur lors de la réinitialisation du mot de passe:', error);
    return res.status(500).json({
      error: 'Erreur serveur',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export default handler;
