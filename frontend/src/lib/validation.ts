import { countriesCities } from './countries-cities';

// Liste des pays réels (depuis countriesCities)
export const VALID_COUNTRIES = countriesCities.map(c => c.en);

// Normaliser le texte pour comparaison
function normalizeText(text: string): string {
  return text.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .trim();
}

// Vérifier si un pays est valide
export function isValidCountry(country: string): boolean {
  const normalized = normalizeText(country);
  return VALID_COUNTRIES.some(validCountry => 
    normalizeText(validCountry) === normalized
  );
}

// Vérifier si une ville semble réelle (longueur minimale et caractères valides)
export function isValidCity(city: string): boolean {
  if (city.length < 2) return false;
  // Autoriser les lettres, espaces, tirets et apostrophes
  const validCityPattern = /^[a-zA-ZÀ-ÿ\s\-']+$/;
  return validCityPattern.test(city);
}

// Vérifier si une adresse semble réelle
export function isValidAddress(address: string): boolean {
  if (address.length < 5) return false;
  // Doit contenir au moins un chiffre (numéro de rue) et des lettres
  const hasNumber = /\d/.test(address);
  const hasLetter = /[a-zA-ZÀ-ÿ]/.test(address);
  return hasNumber && hasLetter;
}

// Vérifier si un email est valide et non temporaire
export function isValidRealEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return false;

  // Liste des domaines d'emails temporaires/jetables courants
  const disposableEmailDomains = [
    'tempmail.com', 'guerrillamail.com', '10minutemail.com', 'mailinator.com',
    'throwaway.email', 'temp-mail.org', 'fakeinbox.com', 'trashmail.com',
    'yopmail.com', 'maildrop.cc', 'getnada.com', 'emailondeck.com',
    'tempr.email', 'sharklasers.com', 'guerrillamailblock.com'
  ];

  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain) return false;

  // Bloquer les domaines temporaires
  if (disposableEmailDomains.some(disposable => domain.includes(disposable))) {
    return false;
  }

  return true;
}

// Vérifier si un numéro de téléphone est valide
export function isValidPhone(phone: string): boolean {
  // Enlever les espaces et tirets
  const cleanPhone = phone.replace(/[\s\-()]/g, '');
  
  // Vérifier le format international (commence par + ou 00)
  const internationalPattern = /^(\+|00)[1-9]\d{6,14}$/;
  
  // Vérifier le format local (10 chiffres pour France, etc.)
  const localPattern = /^0[1-9]\d{8}$/;
  
  return internationalPattern.test(cleanPhone) || localPattern.test(cleanPhone);
}

// Messages d'erreur
export const VALIDATION_MESSAGES = {
  invalidCountry: "Veuillez entrer un pays valide",
  invalidCity: "Veuillez entrer une ville valide",
  invalidAddress: "L'adresse doit contenir un numéro et un nom de rue",
  invalidEmail: "Veuillez utiliser une adresse email valide et non temporaire",
  invalidPhone: "Veuillez entrer un numéro de téléphone valide (ex: +33612345678 ou 0612345678)"
};
