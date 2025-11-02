import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
const NODE_ENV = process.env.NODE_ENV;

// SECURITY: In production, ENCRYPTION_KEY is mandatory
if (!ENCRYPTION_KEY) {
  if (NODE_ENV === 'production') {
    throw new Error('⚠️  CRITICAL: ENCRYPTION_KEY must be set in production! Cannot start application without encryption key.');
  } else {
    console.warn('⚠️  ENCRYPTION_KEY not set. Using development key. DO NOT use in production!');
  }
}

const key: string = ENCRYPTION_KEY || 'dev-only-key-please-set-encryption-key-in-production';

export function encryptCode(code: string): string {
  return CryptoJS.AES.encrypt(code, key).toString();
}

export function decryptCode(encryptedCode: string): string {
  const bytes = CryptoJS.AES.decrypt(encryptedCode, key);
  return bytes.toString(CryptoJS.enc.Utf8);
}

export function encryptCodes(codes: string[]): string[] {
  return codes.map(code => encryptCode(code));
}

export function decryptCodes(encryptedCodes: string[]): string[] {
  return encryptedCodes.map(code => decryptCode(code));
}
