import { Request, Response, NextFunction } from 'express';

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

class HybridRateLimiter {
  private ipStore: Map<string, RateLimitRecord> = new Map();
  private userStore: Map<string, RateLimitRecord> = new Map();
  
  private readonly ipWindowMs: number;
  private readonly userWindowMs: number;
  private readonly ipMaxRequests: number;
  private readonly userMaxRequests: number;
  
  constructor(options: {
    ipWindowMs: number;
    userWindowMs: number;
    ipMaxRequests: number;
    userMaxRequests: number;
  }) {
    this.ipWindowMs = options.ipWindowMs;
    this.userWindowMs = options.userWindowMs;
    this.ipMaxRequests = options.ipMaxRequests;
    this.userMaxRequests = options.userMaxRequests;
    
    setInterval(() => this.cleanup(), 60000);
  }
  
  private cleanup() {
    const now = Date.now();
    
    this.ipStore.forEach((record, key) => {
      if (now > record.resetTime) {
        this.ipStore.delete(key);
      }
    });
    
    this.userStore.forEach((record, key) => {
      if (now > record.resetTime) {
        this.userStore.delete(key);
      }
    });
  }
  
  private getClientIp(req: Request): string {
    const xForwardedFor = req.headers['x-forwarded-for'];
    if (xForwardedFor) {
      const ips = typeof xForwardedFor === 'string'
        ? xForwardedFor.split(',').map(ip => ip.trim())
        : Array.isArray(xForwardedFor)
          ? xForwardedFor[0].split(',').map(ip => ip.trim())
          : [];
      return ips[0] || req.socket.remoteAddress || 'unknown';
    }
    return req.socket.remoteAddress || 'unknown';
  }
  
  private getUserId(req: any): string | null {
    if (req.session?.user?.id) {
      return req.session.user.id;
    }
    return null;
  }
  
  private checkLimit(
    store: Map<string, RateLimitRecord>,
    key: string,
    maxRequests: number,
    windowMs: number
  ): { allowed: boolean; remaining: number; resetTime: number } {
    const now = Date.now();
    const record = store.get(key);
    
    if (!record || now > record.resetTime) {
      const resetTime = now + windowMs;
      store.set(key, { count: 1, resetTime });
      return { allowed: true, remaining: maxRequests - 1, resetTime };
    }
    
    if (record.count >= maxRequests) {
      return { allowed: false, remaining: 0, resetTime: record.resetTime };
    }
    
    record.count++;
    return { allowed: true, remaining: maxRequests - record.count, resetTime: record.resetTime };
  }
  
  middleware() {
    return (req: Request, res: Response, next: NextFunction) => {
      const ip = this.getClientIp(req);
      const userId = this.getUserId(req);
      
      const ipCheck = this.checkLimit(this.ipStore, ip, this.ipMaxRequests, this.ipWindowMs);
      
      if (userId) {
        const userCheck = this.checkLimit(this.userStore, userId, this.userMaxRequests, this.userWindowMs);
        
        res.setHeader('X-RateLimit-Limit-User', this.userMaxRequests.toString());
        res.setHeader('X-RateLimit-Remaining-User', userCheck.remaining.toString());
        res.setHeader('X-RateLimit-Reset-User', Math.ceil(userCheck.resetTime / 1000).toString());
        
        if (!userCheck.allowed) {
          const retryAfter = Math.ceil((userCheck.resetTime - Date.now()) / 1000);
          res.setHeader('Retry-After', retryAfter.toString());
          
          return res.status(429).json({
            success: false,
            error: 'TOO_MANY_REQUESTS',
            message: `Trop de requêtes. Réessayez dans ${retryAfter} secondes.`,
            retryAfter
          });
        }
      }
      
      res.setHeader('X-RateLimit-Limit-IP', this.ipMaxRequests.toString());
      res.setHeader('X-RateLimit-Remaining-IP', ipCheck.remaining.toString());
      res.setHeader('X-RateLimit-Reset-IP', Math.ceil(ipCheck.resetTime / 1000).toString());
      
      if (!ipCheck.allowed) {
        const retryAfter = Math.ceil((ipCheck.resetTime - Date.now()) / 1000);
        res.setHeader('Retry-After', retryAfter.toString());
        
        return res.status(429).json({
          success: false,
          error: 'TOO_MANY_REQUESTS',
          message: `Trop de requêtes depuis cette IP. Réessayez dans ${retryAfter} secondes.`,
          retryAfter
        });
      }
      
      next();
    };
  }
}

export function createHybridRateLimiter(options: {
  ipWindowMs: number;
  userWindowMs: number;
  ipMaxRequests: number;
  userMaxRequests: number;
}) {
  return new HybridRateLimiter(options);
}

export const hybridGeneralLimiter = createHybridRateLimiter({
  ipWindowMs: 15 * 60 * 1000,
  userWindowMs: 15 * 60 * 1000,
  ipMaxRequests: 100,
  userMaxRequests: 200
});

export const hybridAuthLimiter = createHybridRateLimiter({
  ipWindowMs: 15 * 60 * 1000,
  userWindowMs: 15 * 60 * 1000,
  ipMaxRequests: 5,
  userMaxRequests: 10
});

// SECURITY: Specialized rate limiter for webhooks that tracks both IP and event identifiers
class WebhookRateLimiter {
  private ipStore: Map<string, RateLimitRecord> = new Map();
  private eventStore: Map<string, RateLimitRecord> = new Map();
  
  private readonly windowMs = 1 * 60 * 1000; // 1 minute
  private readonly ipMaxRequests = 100;
  private readonly eventMaxRequests = 5; // Max 5 attempts per unique event signature
  
  constructor() {
    setInterval(() => this.cleanup(), 60000);
  }
  
  private cleanup() {
    const now = Date.now();
    
    this.ipStore.forEach((record, key) => {
      if (now > record.resetTime) {
        this.ipStore.delete(key);
      }
    });
    
    this.eventStore.forEach((record, key) => {
      if (now > record.resetTime) {
        this.eventStore.delete(key);
      }
    });
  }
  
  private getClientIp(req: Request): string {
    const xForwardedFor = req.headers['x-forwarded-for'];
    if (xForwardedFor) {
      const ips = typeof xForwardedFor === 'string'
        ? xForwardedFor.split(',').map(ip => ip.trim())
        : Array.isArray(xForwardedFor)
          ? xForwardedFor[0].split(',').map(ip => ip.trim())
          : [];
      return ips[0] || req.socket.remoteAddress || 'unknown';
    }
    return req.socket.remoteAddress || 'unknown';
  }
  
  private checkLimit(
    store: Map<string, RateLimitRecord>,
    key: string,
    maxRequests: number
  ): { allowed: boolean; remaining: number; resetTime: number } {
    const now = Date.now();
    const record = store.get(key);
    
    if (!record || now > record.resetTime) {
      const resetTime = now + this.windowMs;
      store.set(key, { count: 1, resetTime });
      return { allowed: true, remaining: maxRequests - 1, resetTime };
    }
    
    if (record.count >= maxRequests) {
      return { allowed: false, remaining: 0, resetTime: record.resetTime };
    }
    
    record.count++;
    return { allowed: true, remaining: maxRequests - record.count, resetTime: record.resetTime };
  }
  
  middleware() {
    return (req: Request, res: Response, next: NextFunction) => {
      const ip = this.getClientIp(req);
      
      // SECURITY: Check IP-based limit first
      const ipCheck = this.checkLimit(this.ipStore, ip, this.ipMaxRequests);
      
      res.setHeader('X-RateLimit-Limit-IP', this.ipMaxRequests.toString());
      res.setHeader('X-RateLimit-Remaining-IP', ipCheck.remaining.toString());
      
      if (!ipCheck.allowed) {
        const retryAfter = Math.ceil((ipCheck.resetTime - Date.now()) / 1000);
        res.setHeader('Retry-After', retryAfter.toString());
        
        return res.status(429).json({
          success: false,
          error: 'TOO_MANY_REQUESTS',
          message: `Too many webhook requests from this IP. Retry in ${retryAfter} seconds.`
        });
      }
      
      // SECURITY: Check event-based limit (webhook signature or event ID)
      // Extract webhook identifier from headers (HMAC signature or event ID)
      const webhookId = (req.headers['hmac'] as string) || 
                       (req.headers['stripe-signature'] as string) ||
                       ((req as any).body?.trackId) ||
                       ((req as any).body?.id);
      
      if (webhookId) {
        const eventCheck = this.checkLimit(this.eventStore, webhookId, this.eventMaxRequests);
        
        res.setHeader('X-RateLimit-Limit-Event', this.eventMaxRequests.toString());
        res.setHeader('X-RateLimit-Remaining-Event', eventCheck.remaining.toString());
        
        if (!eventCheck.allowed) {
          const retryAfter = Math.ceil((eventCheck.resetTime - Date.now()) / 1000);
          res.setHeader('Retry-After', retryAfter.toString());
          
          return res.status(429).json({
            success: false,
            error: 'TOO_MANY_REQUESTS',
            message: `Webhook event already processed. Retry in ${retryAfter} seconds.`
          });
        }
      }
      
      next();
    };
  }
}

// SECURITY: Webhook rate limiter with IP + event identifier tracking
export const hybridWebhookLimiter = new WebhookRateLimiter();
