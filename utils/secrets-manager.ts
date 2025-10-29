interface SecretVersion {
  value: string;
  version: number;
  createdAt: number;
}

class SecretsManager {
  private secrets: Map<string, SecretVersion[]> = new Map();

  addSecretVersion(key: string, value: string): void {
    const versions = this.secrets.get(key) || [];
    
    const newVersion: SecretVersion = {
      value,
      version: versions.length + 1,
      createdAt: Date.now()
    };
    
    versions.push(newVersion);
    
    if (versions.length > 3) {
      versions.shift();
    }
    
    this.secrets.set(key, versions);
  }

  getCurrentSecret(key: string): string | null {
    const versions = this.secrets.get(key);
    if (!versions || versions.length === 0) {
      return null;
    }
    return versions[versions.length - 1].value;
  }

  verifyWithAnyVersion(key: string, valueToCheck: string): boolean {
    const versions = this.secrets.get(key);
    if (!versions || versions.length === 0) {
      return false;
    }
    
    return versions.some(v => v.value === valueToCheck);
  }

  getAllVersions(key: string): SecretVersion[] {
    return this.secrets.get(key) || [];
  }

  rotateSecret(key: string, newValue: string): void {
    this.addSecretVersion(key, newValue);
    console.log(`[Secrets] Secret '${key}' rotated to version ${this.secrets.get(key)?.length || 0}`);
  }
}

const secretsManager = new SecretsManager();

export function initializeSecrets(): void {
  const jwtSecret = process.env.JWT_SECRET;
  const encryptionKey = process.env.ENCRYPTION_KEY;
  const sessionSecret = process.env.SESSION_SECRET;

  if (jwtSecret) {
    secretsManager.addSecretVersion('JWT_SECRET', jwtSecret);
  }

  if (encryptionKey) {
    secretsManager.addSecretVersion('ENCRYPTION_KEY', encryptionKey);
  }

  if (sessionSecret) {
    secretsManager.addSecretVersion('SESSION_SECRET', sessionSecret);
  }

  console.log('[Secrets] Initialized secrets manager');
}

export function getJWTSecret(): string {
  return secretsManager.getCurrentSecret('JWT_SECRET') || process.env.JWT_SECRET || '';
}

export function getEncryptionKey(): string {
  return secretsManager.getCurrentSecret('ENCRYPTION_KEY') || process.env.ENCRYPTION_KEY || '';
}

export function getSessionSecret(): string {
  return secretsManager.getCurrentSecret('SESSION_SECRET') || process.env.SESSION_SECRET || process.env.JWT_SECRET || 'default-secret-change-in-production';
}

export function rotateJWTSecret(newSecret: string): void {
  secretsManager.rotateSecret('JWT_SECRET', newSecret);
}

export function rotateEncryptionKey(newKey: string): void {
  secretsManager.rotateSecret('ENCRYPTION_KEY', newKey);
}

export function sanitizeForLogging(obj: any): any {
  const sensitiveKeys = [
    'password', 'token', 'secret', 'key', 'authorization',
    'jwt', 'csrf', 'api_key', 'apikey', 'auth',
    'MONGODB_URI', 'JWT_SECRET', 'ENCRYPTION_KEY', 'SESSION_SECRET',
    'STRIPE_SECRET_KEY', 'NOWPAYMENTS_API_KEY', 'SENDGRID_API_KEY'
  ];

  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeForLogging(item));
  }

  const sanitized: any = {};

  for (const [key, value] of Object.entries(obj)) {
    const keyLower = key.toLowerCase();
    const isSensitive = sensitiveKeys.some(sk => keyLower.includes(sk.toLowerCase()));

    if (isSensitive) {
      sanitized[key] = '***REDACTED***';
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeForLogging(value);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
}

export function secureLog(message: string, data?: any): void {
  if (data) {
    console.log(message, sanitizeForLogging(data));
  } else {
    console.log(message);
  }
}

export default secretsManager;
