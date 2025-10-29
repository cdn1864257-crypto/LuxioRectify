interface WebhookEvent {
  id: string;
  timestamp: number;
}

class WebhookDeduplicationCache {
  private cache: Map<string, number> = new Map();
  private readonly CLEANUP_INTERVAL = 3600000;
  private readonly MAX_AGE = 3600000;

  constructor() {
    setInterval(() => this.cleanup(), this.CLEANUP_INTERVAL);
  }

  isProcessed(eventId: string): boolean {
    const timestamp = this.cache.get(eventId);
    if (!timestamp) return false;
    
    if (Date.now() - timestamp > this.MAX_AGE) {
      this.cache.delete(eventId);
      return false;
    }
    
    return true;
  }

  markAsProcessed(eventId: string): void {
    this.cache.set(eventId, Date.now());
  }

  private cleanup(): void {
    const now = Date.now();
    const toDelete: string[] = [];
    
    this.cache.forEach((timestamp, eventId) => {
      if (now - timestamp > this.MAX_AGE) {
        toDelete.push(eventId);
      }
    });
    
    toDelete.forEach(id => this.cache.delete(id));
    
    if (toDelete.length > 0) {
      console.log(`[Webhook Cache] Cleaned up ${toDelete.length} expired entries`);
    }
  }

  getSize(): number {
    return this.cache.size;
  }
}

export const webhookCache = new WebhookDeduplicationCache();

export function validateReplayAttack(
  timestamp: number | undefined,
  toleranceSeconds: number = 300
): { valid: boolean; error?: string } {
  if (!timestamp) {
    return {
      valid: false,
      error: 'Missing timestamp'
    };
  }

  const now = Math.floor(Date.now() / 1000);
  const diff = Math.abs(now - timestamp);

  if (diff > toleranceSeconds) {
    return {
      valid: false,
      error: `Timestamp too old or too far in future. Difference: ${diff}s (max: ${toleranceSeconds}s)`
    };
  }

  return { valid: true };
}

const NOWPAYMENTS_IPS = [
  '54.214.8.122',
  '52.10.88.21',
  '52.37.146.28',
  '52.43.253.199',
  '34.221.175.249',
  '18.237.171.121',
  '18.237.98.84',
  '34.210.229.209',
  '52.42.249.70',
  '52.26.160.186'
];

export function isNowPaymentsIP(ip: string | undefined): boolean {
  if (!ip) return false;
  
  const cleanIp = ip.replace(/^::ffff:/, '');
  
  const isAllowed = NOWPAYMENTS_IPS.includes(cleanIp);
  
  if (!isAllowed) {
    console.warn(`[Webhook Security] Unauthorized IP attempt: ${cleanIp}`);
  }
  
  return isAllowed;
}

export function getClientIP(headers: { [key: string]: string | string[] | undefined }): string | undefined {
  const xForwardedFor = headers['x-forwarded-for'];
  const xRealIp = headers['x-real-ip'];
  
  if (xForwardedFor) {
    const ips = typeof xForwardedFor === 'string' 
      ? xForwardedFor.split(',').map(ip => ip.trim())
      : Array.isArray(xForwardedFor) 
        ? xForwardedFor[0].split(',').map(ip => ip.trim())
        : [];
    return ips[0];
  }
  
  if (xRealIp) {
    return typeof xRealIp === 'string' ? xRealIp : xRealIp[0];
  }
  
  return undefined;
}
