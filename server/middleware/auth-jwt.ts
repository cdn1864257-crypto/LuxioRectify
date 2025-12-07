import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const TokenExpiredError = (jwt as any).TokenExpiredError;
const JsonWebTokenError = (jwt as any).JsonWebTokenError;

export interface JwtPayload {
  userId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  iat?: number;
  exp?: number;
}

export interface AuthenticatedJwtRequest extends Request {
  user?: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
  };
  token?: string;
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1h';

function parseExpirationToSeconds(expiration: string): number {
  const match = expiration.match(/^(\d+)(s|m|h|d)$/);
  if (!match) return 3600;
  
  const value = parseInt(match[1], 10);
  const unit = match[2];
  
  switch (unit) {
    case 's': return value;
    case 'm': return value * 60;
    case 'h': return value * 3600;
    case 'd': return value * 86400;
    default: return 3600;
  }
}

export function signJwtToken(payload: Omit<JwtPayload, 'iat' | 'exp'>): string {
  const expiresInSeconds = parseExpirationToSeconds(JWT_EXPIRATION);
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: expiresInSeconds
  });
}

export function verifyJwtToken(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}

export function getTokenExpirationTime(): number {
  const match = JWT_EXPIRATION.match(/^(\d+)(s|m|h|d)$/);
  if (!match) return 3600;
  
  const value = parseInt(match[1], 10);
  const unit = match[2];
  
  switch (unit) {
    case 's': return value;
    case 'm': return value * 60;
    case 'h': return value * 3600;
    case 'd': return value * 86400;
    default: return 3600;
  }
}

export async function authJwt(
  req: AuthenticatedJwtRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    let token: string | undefined;
    
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    }
    
    if (!token) {
      const cookieHeader = req.headers.cookie;
      if (cookieHeader) {
        const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
          const [key, value] = cookie.trim().split('=');
          acc[key] = value;
          return acc;
        }, {} as Record<string, string>);
        token = cookies['auth_token'];
      }
    }

    if (!token) {
      res.status(401).json({
        success: false,
        error: 'JWT_MISSING',
        message: 'No authentication token provided'
      });
      return;
    }

    try {
      const decoded = verifyJwtToken(token);
      
      req.user = {
        id: decoded.userId,
        email: decoded.email,
        firstName: decoded.firstName,
        lastName: decoded.lastName
      };
      req.token = token;
      
      next();
    } catch (jwtError) {
      if (jwtError instanceof TokenExpiredError) {
        res.status(401).json({
          success: false,
          error: 'JWT_EXPIRED',
          message: 'Your session has expired. Please login again.',
          expiredAt: jwtError.expiredAt
        });
        return;
      }
      
      if (jwtError instanceof JsonWebTokenError) {
        res.status(401).json({
          success: false,
          error: 'JWT_INVALID',
          message: 'Invalid authentication token'
        });
        return;
      }
      
      throw jwtError;
    }
  } catch (error) {
    console.error('JWT authentication error:', error);
    res.status(500).json({
      success: false,
      error: 'INTERNAL_SERVER_ERROR',
      message: 'Error validating authentication token'
    });
  }
}

export function optionalAuthJwt(
  req: AuthenticatedJwtRequest,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;
  const hasToken = authHeader && authHeader.startsWith('Bearer ');
  
  if (!hasToken) {
    const cookieHeader = req.headers.cookie;
    if (cookieHeader && cookieHeader.includes('auth_token=')) {
      authJwt(req, res, next);
      return;
    }
  }
  
  if (hasToken) {
    authJwt(req, res, next);
    return;
  }
  
  next();
}
