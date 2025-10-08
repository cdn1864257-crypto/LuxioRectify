export type PasswordStrength = 'weak' | 'medium' | 'strong';

export interface PasswordValidation {
  strength: PasswordStrength;
  hasMinLength: boolean;
  hasLetter: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
  score: number;
}

export function validatePasswordStrength(password: string): PasswordValidation {
  const hasMinLength = password.length >= 8;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

  let score = 0;
  if (hasMinLength) score++;
  if (hasLetter) score++;
  if (hasNumber) score++;
  if (hasSpecialChar) score++;

  let strength: PasswordStrength = 'weak';
  if (score >= 4) {
    strength = 'strong';
  } else if (score >= 3) {
    strength = 'medium';
  }

  return {
    strength,
    hasMinLength,
    hasLetter,
    hasNumber,
    hasSpecialChar,
    score
  };
}

export function isPasswordValid(password: string): boolean {
  const validation = validatePasswordStrength(password);
  return validation.strength !== 'weak' && validation.hasLetter && validation.hasNumber;
}
