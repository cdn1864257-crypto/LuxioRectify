import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import { sendWelcomeEmail } from '../../utils/email.js';
import { detectLanguageFromIP, getClientIP } from '../../utils/language-detection.js';

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

interface SignupData {
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  password: string;
  language?: string;
}

async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const { firstName, lastName, country, city, address, phone, email, password, language }: SignupData = req.body;

    // Vérification que les champs obligatoires sont remplis
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        error: 'Les champs prénom, nom, email et mot de passe sont obligatoires',
        missing: {
          firstName: !firstName,
          lastName: !lastName,
          email: !email,
          password: !password
        }
      });
    }

    // Validation basique de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Format email invalide' });
    }

    // Validation du mot de passe (minimum 6 caractères)
    if (password.length < 6) {
      return res.status(400).json({ error: 'Le mot de passe doit contenir au moins 6 caractères' });
    }

    // Connexion à MongoDB
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      return res.status(500).json({ error: 'Configuration MongoDB manquante' });
    }

    const client = new MongoClient(mongoUri);
    
    try {
      await client.connect();
      
      const db = client.db('luxio');
      const usersCollection = db.collection('users');

      // Vérifier si l'email existe déjà
      const existingUser = await usersCollection.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        return res.status(409).json({ error: 'Cet email est déjà utilisé' });
      }

      // Hashage du mot de passe avec bcrypt (10 rounds de salting)
      const hashedPassword = await bcrypt.hash(password, 10);

      // Détecter la langue automatiquement basée sur l'IP de l'utilisateur
      const clientIP = getClientIP(req.headers);
      let detectedLanguage = 'fr';
      
      if (clientIP) {
        detectedLanguage = await detectLanguageFromIP(clientIP);
        console.log(`📍 IP détectée: ${clientIP} → Langue: ${detectedLanguage}`);
      } else {
        console.log('⚠️  Impossible de détecter l\'IP, langue par défaut: fr');
      }

      // Validation et normalisation de la langue (utiliser langue détectée si non fournie)
      const validLanguages = ['fr', 'en', 'es', 'pt', 'pl', 'it', 'hu'];
      const userLanguage = language && validLanguages.includes(language.toLowerCase()) 
        ? language.toLowerCase() 
        : (validLanguages.includes(detectedLanguage) ? detectedLanguage : 'fr');

      // Création de l'utilisateur
      const newUser = {
        firstName,
        lastName,
        country: country || '',
        city: city || '',
        address: address || '',
        phone: phone || '',
        email: email.toLowerCase(),
        password: hashedPassword,
        language: userLanguage,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const result = await usersCollection.insertOne(newUser);

      // Retourner l'utilisateur sans le mot de passe
      const userResponse = {
        id: result.insertedId,
        firstName,
        lastName,
        country,
        city,
        address,
        phone,
        email: email.toLowerCase(),
        createdAt: newUser.createdAt
      };

      // Envoyer l'email de bienvenue dans la langue de l'utilisateur (sans bloquer la réponse)
      console.log(`📧 Envoi de l'email de bienvenue à ${email.toLowerCase()} en langue: ${userLanguage}`);
      sendWelcomeEmail(email.toLowerCase(), firstName, userLanguage).catch((error: Error) => {
        console.error('❌ Erreur lors de l\'envoi de l\'email de bienvenue:', error);
      });

      // Générer un JWT pour connexion automatique
      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        console.warn('JWT_SECRET manquant - connexion automatique impossible');
        return res.status(201).json({
          message: 'Inscription réussie',
          user: userResponse
        });
      }

      const token = jwt.sign(
        {
          userId: result.insertedId.toString(),
          email: email.toLowerCase()
        },
        jwtSecret,
        { expiresIn: '7d' }
      );

      // Créer le cookie httpOnly et secure
      const isProduction = process.env.NODE_ENV === 'production';
      const cookie = serialize('auth_token', token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax', // 'none' requis pour cross-domain en production
        maxAge: 60 * 60 * 24 * 7, // 7 jours
        path: '/'
      });

      res.setHeader('Set-Cookie', cookie);

      return res.status(201).json({
        message: 'Inscription réussie',
        user: userResponse
      });
    } finally {
      await client.close();
    }

  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    return res.status(500).json({
      error: 'Erreur serveur lors de l\'inscription',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export default handler;
