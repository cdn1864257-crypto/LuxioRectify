import jwt from 'jsonwebtoken';
import { parse } from 'cookie';
import type { MongoClient } from 'mongodb';
import { withMongoDb } from './mongodb-pool.js';

interface VercelRequest {
  query: { [key: string]: string | string[] | undefined };
  body: any;
  cookies: { [key: string]: string };
  method: string;
  url: string;
  headers: { [key: string]: string };
}

interface JWTPayload {
  userId: string;
  email: string;
}

const ADMIN_EMAILS = [
  'support@luxiomarket.shop',
];

export async function verifyAdminAuth(req: VercelRequest): Promise<boolean> {
  try {
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
      return false;
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return false;
    }

    let decoded: JWTPayload;
    try {
      decoded = jwt.verify(token, jwtSecret) as JWTPayload;
    } catch (error) {
      return false;
    }

    const result = await withMongoDb(async (db) => {
      const usersCollection = db.collection('users');
      const user = await usersCollection.findOne({ email: decoded.email.toLowerCase() });

      if (!user) {
        return false;
      }

      return ADMIN_EMAILS.includes(user.email.toLowerCase());
    });

    return result;

  } catch (error) {
    console.error('Admin auth verification error:', error);
    return false;
  }
}

export function isAdminEmail(email: string): boolean {
  return ADMIN_EMAILS.includes(email.toLowerCase());
}
