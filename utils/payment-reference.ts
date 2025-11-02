/**
 * Generates a standardized payment reference in the format: "FirstNameLastName + 4 random digits"
 * This format is used consistently across:
 * - Dashboard
 * - Email notifications
 * - Bank transfer instructions
 * - Payment methods display
 * 
 * @param customerName - Full name of the customer (e.g., "Jean Dupont")
 * @returns Payment reference (e.g., "JeanDupont1234")
 */
export function generatePaymentReference(customerName: string): string {
  // Generate 4 random digits
  const randomDigits = Math.floor(1000 + Math.random() * 9000).toString();
  
  // Clean and normalize the customer name (remove all spaces)
  const cleanName = customerName.trim().replace(/\s+/g, '');
  
  // Fallback to "User" if name is empty after trimming
  const safeName = cleanName || 'User';
  
  // Return format: "Name + 4 digits" (no space)
  return `${safeName}${randomDigits}`;
}

/**
 * Generates the bank transfer deposit motif with translated "Deposit" word
 * @param reference - The payment reference
 * @param language - The user's language (fr, en, es, pt, de, it, hu, pl)
 * @returns Formatted deposit motif (e.g., "Dépôt JeanDupont1234" or "Deposit JeanDupont1234")
 */
export function generateDepositMotif(reference: string, language: string = 'fr'): string {
  const depositTranslations: Record<string, string> = {
    fr: 'Dépôt',
    en: 'Deposit',
    es: 'Depósito',
    pt: 'Depósito',
    de: 'Einzahlung',
    it: 'Deposito',
    hu: 'Befizetés',
    pl: 'Wpłata'
  };
  
  const depositWord = depositTranslations[language] || depositTranslations.fr;
  return `${depositWord} ${reference}`;
}

/**
 * Legacy function for backward compatibility
 * Generates an order reference in the old format: "LX-timestamp-random"
 * 
 * @deprecated Use generatePaymentReference with customer name instead
 */
export function generateLegacyOrderReference(): string {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `LX-${timestamp}-${randomStr}`;
}
