/**
 * Generates a standardized payment reference in the format: "FirstName LastName + 4 random digits"
 * This format is used consistently across:
 * - Dashboard display
 * - Payment methods  
 * - Bank transfer instructions
 * - Email notifications
 * 
 * @param customerName - Full name of the customer (e.g., "Jean Dupont")
 * @returns Payment reference (e.g., "Jean Dupont 1234")
 */
export function generatePaymentReference(customerName: string): string {
  // Generate 4 random digits
  const randomDigits = Math.floor(1000 + Math.random() * 9000).toString();
  
  // Clean and normalize the customer name
  const cleanName = customerName.trim();
  
  // Fallback to "User" if name is empty after trimming
  const safeName = cleanName || 'User';
  
  // Return format: "Name + 4 digits"
  return `${safeName} ${randomDigits}`;
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
