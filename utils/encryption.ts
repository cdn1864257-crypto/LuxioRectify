import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

if (!ENCRYPTION_KEY) {
  throw new Error('ENCRYPTION_KEY environment variable is required for secure payment code encryption');
}

const key: string = ENCRYPTION_KEY;

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
