import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

if (!ENCRYPTION_KEY) {
  console.warn('⚠️  ENCRYPTION_KEY not set. Using development key. DO NOT use in production!');
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
