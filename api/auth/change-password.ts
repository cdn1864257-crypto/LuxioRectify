import { MongoClient, ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { parse } from 'cookie';

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
      return res.status(400).json({ error: 'Mot de passe actuel et nouveau mot de passe requis' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'Le nouveau mot de passe doit contenir au moins 6 caractères' });
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
      return res.status(401).json({ error: 'Non authentifié - Token manquant' });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return res.status(500).json({ error: 'Configuration JWT manquante' });
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, jwtSecret);
    } catch (error) {
      return res.status(401).json({ error: 'Votre session a expiré, veuillez vous reconnecter' });
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

      const user = await usersCollection.findOne({ _id: new ObjectId(decoded.userId) });
      
      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé' });
      }

      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
      
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Mot de passe actuel incorrect' });
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
    return res.status(500).json({ error: 'Erreur serveur lors du changement de mot de passe' });
  }
}

export default handler;
