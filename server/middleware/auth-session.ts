import { Request, Response, NextFunction } from 'express';
import { parse } from 'cookie';
import { MongoClient, ObjectId } from 'mongodb';
import { validateSession, deleteSession } from '../session-service.js';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
  };
  sessionId?: string;
}

export async function authSession(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    let sessionToken: string | undefined;
    
    const cookieHeader = req.headers.cookie;
    if (cookieHeader) {
      const cookies = parse(cookieHeader);
      sessionToken = cookies.session_token;
    }

    if (!sessionToken) {
      res.status(401).json({
        success: false,
        error: 'SESSION_MISSING',
        message: 'No active session found'
      });
      return;
    }

    const session = await validateSession(sessionToken);
    
    if (!session) {
      res.status(401).json({
        success: false,
        error: 'SESSION_INVALID',
        message: 'Session expired or invalid'
      });
      return;
    }

    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      res.status(500).json({
        success: false,
        error: 'INTERNAL_SERVER_ERROR',
        message: 'Server configuration error'
      });
      return;
    }

    const client = new MongoClient(mongoUri);
    
    try {
      await client.connect();
      const db = client.db('luxio');
      const usersCollection = db.collection('users');
      
      const user = await usersCollection.findOne({ _id: new ObjectId(session.userId) });
      
      if (!user) {
        await deleteSession(sessionToken);
        res.status(401).json({
          success: false,
          error: 'USER_NOT_FOUND',
          message: 'User associated with session not found'
        });
        return;
      }
      
      req.user = {
        id: user._id.toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      };
      req.sessionId = session.sessionId;
      
    } finally {
      await client.close();
    }

    next();
  } catch (error) {
    console.error('Session validation error:', error);
    res.status(500).json({
      success: false,
      error: 'INTERNAL_SERVER_ERROR',
      message: 'Error validating session'
    });
  }
}

export function optionalAuthSession(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  const cookieHeader = req.headers.cookie;
  if (cookieHeader) {
    const cookies = parse(cookieHeader);
    if (cookies.session_token) {
      authSession(req, res, next);
      return;
    }
  }
  next();
}
