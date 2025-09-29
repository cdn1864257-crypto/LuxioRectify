import type { VercelRequest, VercelResponse } from '@vercel/node';

interface User {
  id: string;
  username: string;
  email: string;
}

// Simuler une base de données en mémoire pour l'exemple
let users: User[] = [];

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      // GET /api/users - Récupérer tous les utilisateurs
      res.status(200).json({ users });
      break;
      
    case 'POST':
      // POST /api/users - Créer un nouvel utilisateur
      const { username, email } = req.body;
      
      if (!username || !email) {
        return res.status(400).json({ error: 'Username and email are required' });
      }
      
      const newUser: User = {
        id: Date.now().toString(),
        username,
        email
      };
      
      users.push(newUser);
      res.status(201).json({ user: newUser });
      break;
      
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}