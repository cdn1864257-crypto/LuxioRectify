export function sanitizeEmail(email: string): string {
  return email.toLowerCase().trim().replace(/[^\w\s@.\-+]/g, '');
}

export function sanitizeName(name: string): string {
  return name.trim().replace(/[<>]/g, '').substring(0, 100);
}

export function sanitizeString(input: string, maxLength: number = 500): string {
  return input.trim().replace(/[<>]/g, '').substring(0, maxLength);
}

export function sanitizeNumeric(value: any): number | null {
  const num = parseFloat(value);
  return isNaN(num) ? null : num;
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

export function validatePassword(password: string): { valid: boolean; error?: string } {
  if (password.length < 8) {
    return { valid: false, error: 'Le mot de passe doit contenir au moins 8 caractères' };
  }
  
  if (password.length > 128) {
    return { valid: false, error: 'Le mot de passe est trop long (max 128 caractères)' };
  }
  
  if (!/[a-z]/.test(password)) {
    return { valid: false, error: 'Le mot de passe doit contenir au moins une lettre minuscule' };
  }
  
  if (!/[A-Z]/.test(password)) {
    return { valid: false, error: 'Le mot de passe doit contenir au moins une lettre majuscule' };
  }
  
  if (!/[0-9]/.test(password)) {
    return { valid: false, error: 'Le mot de passe doit contenir au moins un chiffre' };
  }
  
  return { valid: true };
}

export function validateAmount(amount: number): { valid: boolean; error?: string } {
  if (amount <= 0) {
    return { valid: false, error: 'Le montant doit être positif' };
  }
  
  if (amount > 1000000) {
    return { valid: false, error: 'Le montant est trop élevé' };
  }
  
  if (!Number.isFinite(amount)) {
    return { valid: false, error: 'Le montant doit être un nombre valide' };
  }
  
  return { valid: true };
}

export function validateQuantity(quantity: number): { valid: boolean; error?: string } {
  if (!Number.isInteger(quantity)) {
    return { valid: false, error: 'La quantité doit être un nombre entier' };
  }
  
  if (quantity <= 0) {
    return { valid: false, error: 'La quantité doit être positive' };
  }
  
  if (quantity > 999) {
    return { valid: false, error: 'La quantité maximale est 999' };
  }
  
  return { valid: true };
}

export function validateCurrency(currency: string): boolean {
  const allowedCurrencies = ['EUR', 'USD', 'GBP'];
  return allowedCurrencies.includes(currency.toUpperCase());
}

export function sanitizeCartItem(item: any): { valid: boolean; sanitized?: any; error?: string } {
  if (!item || typeof item !== 'object') {
    return { valid: false, error: 'Article invalide' };
  }

  const quantityValidation = validateQuantity(item.quantity);
  if (!quantityValidation.valid) {
    return { valid: false, error: quantityValidation.error };
  }

  const amountValidation = validateAmount(item.price);
  if (!amountValidation.valid) {
    return { valid: false, error: amountValidation.error };
  }

  return {
    valid: true,
    sanitized: {
      id: sanitizeString(item.id, 100),
      name: sanitizeString(item.name, 200),
      price: parseFloat(item.price.toFixed(2)),
      quantity: parseInt(item.quantity, 10),
      description: item.description ? sanitizeString(item.description, 500) : undefined
    }
  };
}

export function validateOrderAmount(
  clientAmount: number,
  serverAmount: number,
  tolerance: number = 0.01
): { valid: boolean; error?: string } {
  if (Math.abs(clientAmount - serverAmount) > tolerance) {
    return {
      valid: false,
      error: `Montant invalide. Attendu: ${serverAmount.toFixed(2)}€, reçu: ${clientAmount.toFixed(2)}€`
    };
  }

  return { valid: true };
}
