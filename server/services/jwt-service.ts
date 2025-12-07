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

export interface TokenResult {
  success: boolean;
  token?: string;
  expiresIn?: number;
  error?: string;
}

export interface VerifyResult {
  success: boolean;
  payload?: JwtPayload;
  error?: 'JWT_EXPIRED' | 'JWT_INVALID' | 'JWT_MISSING' | 'INTERNAL_ERROR';
  message?: string;
  expiredAt?: Date;
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1h';
const JWT_REFRESH_EXPIRATION = process.env.JWT_REFRESH_EXPIRATION || '7d';

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

export function generateAccessToken(payload: Omit<JwtPayload, 'iat' | 'exp'>): TokenResult {
  try {
    const expiresIn = parseExpirationToSeconds(JWT_EXPIRATION);
    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: expiresIn
    });
    
    return {
      success: true,
      token,
      expiresIn
    };
  } catch (error) {
    console.error('Error generating access token:', error);
    return {
      success: false,
      error: 'Failed to generate access token'
    };
  }
}

export function generateRefreshToken(payload: Omit<JwtPayload, 'iat' | 'exp'>): TokenResult {
  try {
    const expiresIn = parseExpirationToSeconds(JWT_REFRESH_EXPIRATION);
    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: expiresIn
    });
    
    return {
      success: true,
      token,
      expiresIn
    };
  } catch (error) {
    console.error('Error generating refresh token:', error);
    return {
      success: false,
      error: 'Failed to generate refresh token'
    };
  }
}

export function verifyToken(token: string): VerifyResult {
  if (!token) {
    return {
      success: false,
      error: 'JWT_MISSING',
      message: 'No token provided'
    };
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
    
    return {
      success: true,
      payload
    };
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return {
        success: false,
        error: 'JWT_EXPIRED',
        message: 'Your session has expired. Please login again.',
        expiredAt: error.expiredAt
      };
    }
    
    if (error instanceof JsonWebTokenError) {
      return {
        success: false,
        error: 'JWT_INVALID',
        message: 'Invalid authentication token'
      };
    }
    
    console.error('Token verification error:', error);
    return {
      success: false,
      error: 'INTERNAL_ERROR',
      message: 'Error verifying token'
    };
  }
}

export function decodeToken(token: string): JwtPayload | null {
  try {
    return jwt.decode(token) as JwtPayload;
  } catch {
    return null;
  }
}

export function getTokenExpiration(): {
  accessTokenExpiration: number;
  refreshTokenExpiration: number;
} {
  return {
    accessTokenExpiration: parseExpirationToSeconds(JWT_EXPIRATION),
    refreshTokenExpiration: parseExpirationToSeconds(JWT_REFRESH_EXPIRATION)
  };
}

export function isTokenExpiringSoon(token: string, thresholdSeconds: number = 300): boolean {
  try {
    const payload = jwt.decode(token) as JwtPayload;
    if (!payload || !payload.exp) return true;
    
    const expirationTime = payload.exp * 1000;
    const currentTime = Date.now();
    const timeUntilExpiration = expirationTime - currentTime;
    
    return timeUntilExpiration <= thresholdSeconds * 1000;
  } catch {
    return true;
  }
}
