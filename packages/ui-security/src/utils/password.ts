/**
 * Password Policy and Management Utilities
 * 
 * Provides utilities for password validation, strength checking, generation,
 * and policy enforcement according to security best practices.
 */

import type { PasswordPolicy } from '../types';

/**
 * Password strength levels
 */
export enum PasswordStrengthLevel {
  VERY_WEAK = 'veryWeak',
  WEAK = 'weak',
  FAIR = 'fair',
  GOOD = 'good',
  STRONG = 'strong',
  VERY_STRONG = 'veryStrong',
}

/**
 * Password strength score result
 */
export interface PasswordStrengthScore {
  score: number; // 0-100
  level: PasswordStrengthLevel;
  feedback: string[];
}

/**
 * Password validation result
 */
export interface PasswordValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Check if password contains uppercase letters
 */
function hasUpperCase(password: string): boolean {
  return /[A-Z]/.test(password);
}

/**
 * Check if password contains lowercase letters
 */
function hasLowerCase(password: string): boolean {
  return /[a-z]/.test(password);
}

/**
 * Check if password contains numbers
 */
function hasNumbers(password: string): boolean {
  return /\d/.test(password);
}

/**
 * Check if password contains special characters
 */
function hasSpecialChars(password: string): boolean {
  return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
}

/**
 * Check if password contains sequential characters (e.g., "abc", "123")
 */
function hasSequentialChars(password: string): boolean {
  for (let i = 0; i < password.length - 2; i++) {
    const charCode = password.charCodeAt(i);
    const nextCode = password.charCodeAt(i + 1);
    const thirdCode = password.charCodeAt(i + 2);

    if (
      nextCode === charCode + 1 &&
      thirdCode === charCode + 2
    ) {
      return true;
    }
  }
  return false;
}

/**
 * Check if password contains repeated characters (e.g., "aaa", "111")
 */
function hasRepeatedChars(password: string): boolean {
  return /(.)\1{2,}/.test(password);
}

/**
 * Calculate password strength score (0-100)
 * 
 * @param password - Password to evaluate
 * @returns PasswordStrengthScore with score, level, and feedback
 */
export function calculatePasswordStrength(password: string): PasswordStrengthScore {
  if (!password) {
    return {
      score: 0,
      level: PasswordStrengthLevel.VERY_WEAK,
      feedback: ['Password cannot be empty'],
    };
  }

  let score = 0;
  const feedback: string[] = [];

  // Length scoring
  const length = password.length;
  if (length < 8) {
    score += Math.min(length, 5);
    feedback.push('Password is too short');
  } else if (length < 12) {
    score += 15;
  } else if (length < 16) {
    score += 20;
  } else {
    score += 25;
  }

  // Character type scoring
  if (hasLowerCase(password)) {
    score += 10;
  } else {
    feedback.push('Add lowercase letters');
  }

  if (hasUpperCase(password)) {
    score += 10;
  } else {
    feedback.push('Add uppercase letters');
  }

  if (hasNumbers(password)) {
    score += 10;
  } else {
    feedback.push('Add numbers');
  }

  if (hasSpecialChars(password)) {
    score += 15;
  } else {
    feedback.push('Add special characters');
  }

  // Deduct points for common patterns
  if (hasSequentialChars(password)) {
    score -= 10;
    feedback.push('Avoid sequential characters');
  }

  if (hasRepeatedChars(password)) {
    score -= 10;
    feedback.push('Avoid repeated characters');
  }

  // Clamp score between 0-100
  score = Math.max(0, Math.min(100, score));

  // Determine level
  let level: PasswordStrengthLevel;
  if (score < 20) {
    level = PasswordStrengthLevel.VERY_WEAK;
  } else if (score < 40) {
    level = PasswordStrengthLevel.WEAK;
  } else if (score < 60) {
    level = PasswordStrengthLevel.FAIR;
  } else if (score < 75) {
    level = PasswordStrengthLevel.GOOD;
  } else if (score < 90) {
    level = PasswordStrengthLevel.STRONG;
  } else {
    level = PasswordStrengthLevel.VERY_STRONG;
  }

  return { score, level, feedback };
}

/**
 * Validate password against a password policy
 * 
 * @param password - Password to validate
 * @param policy - Password policy to enforce
 * @returns PasswordValidationResult with validation status and messages
 */
export function validatePasswordAgainstPolicy(
  password: string,
  policy: PasswordPolicy
): PasswordValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!password) {
    errors.push('Password is required');
    return { isValid: false, errors, warnings };
  }

  // Check minimum length
  if (password.length < policy.minLength) {
    errors.push(
      `Password must be at least ${policy.minLength} characters long`
    );
  }

  // Check maximum length
  if (policy.maxLength && password.length > policy.maxLength) {
    errors.push(
      `Password must not exceed ${policy.maxLength} characters`
    );
  }

  // Check uppercase requirement
  if (policy.requireUppercase && !hasUpperCase(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  // Check lowercase requirement
  if (policy.requireLowercase && !hasLowerCase(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  // Check number requirement
  if (policy.requireNumbers && !hasNumbers(password)) {
    errors.push('Password must contain at least one number');
  }

  // Check special character requirement
  if (policy.requireSpecialChars && !hasSpecialChars(password)) {
    errors.push(
      'Password must contain at least one special character (!@#$%^&* etc.)'
    );
  }

  // Check strength requirement
  if (policy.minStrengthScore !== undefined) {
    const { score } = calculatePasswordStrength(password);
    if (score < policy.minStrengthScore) {
      errors.push(
        `Password strength score must be at least ${policy.minStrengthScore}%`
      );
    }
  }

  // Warnings for pattern issues
  if (hasSequentialChars(password)) {
    warnings.push('Password contains sequential characters');
  }

  if (hasRepeatedChars(password)) {
    warnings.push('Password contains repeated characters');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Generate a strong random password
 * 
 * @param length - Password length (default: 16)
 * @param options - Generation options
 * @returns Generated password
 */
export function generatePassword(
  length: number = 16,
  options: {
    includeUppercase?: boolean;
    includeLowercase?: boolean;
    includeNumbers?: boolean;
    includeSpecialChars?: boolean;
  } = {}
): string {
  const {
    includeUppercase = true,
    includeLowercase = true,
    includeNumbers = true,
    includeSpecialChars = true,
  } = options;

  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  let chars = '';
  let password = '';

  if (includeUppercase) chars += uppercase;
  if (includeLowercase) chars += lowercase;
  if (includeNumbers) chars += numbers;
  if (includeSpecialChars) chars += specialChars;

  if (!chars) {
    // Fallback to alphanumeric if no character types specified
    chars = lowercase + uppercase + numbers;
  }

  // Generate password with at least one character from each required type
  const requirements: string[] = [];
  if (includeUppercase) requirements.push(uppercase);
  if (includeLowercase) requirements.push(lowercase);
  if (includeNumbers) requirements.push(numbers);
  if (includeSpecialChars) requirements.push(specialChars);

  // Add one character from each requirement
  for (const req of requirements) {
    if (password.length < length) {
      const randomIndex = Math.floor(Math.random() * req.length);
      password += req[randomIndex];
    }
  }

  // Fill remaining length with random characters
  for (let i = password.length; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }

  // Shuffle the password
  return password
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');
}

/**
 * Check if two passwords match
 * 
 * @param password1 - First password
 * @param password2 - Second password
 * @returns true if passwords match, false otherwise
 */
export function passwordsMatch(password1: string, password2: string): boolean {
  if (!password1 || !password2) {
    return false;
  }
  return password1 === password2;
}

/**
 * Get password expiration date
 * 
 * @param lastChangedDate - Date when password was last changed
 * @param expirationDays - Days until password expires (0 = no expiration)
 * @returns Expiration date or null if no expiration
 */
export function getPasswordExpirationDate(
  lastChangedDate: Date,
  expirationDays: number
): Date | null {
  if (expirationDays <= 0) {
    return null;
  }

  const expirationDate = new Date(lastChangedDate);
  expirationDate.setDate(expirationDate.getDate() + expirationDays);
  return expirationDate;
}

/**
 * Check if password is expired
 * 
 * @param lastChangedDate - Date when password was last changed
 * @param expirationDays - Days until password expires
 * @returns true if password is expired, false otherwise
 */
export function isPasswordExpired(
  lastChangedDate: Date,
  expirationDays: number
): boolean {
  if (expirationDays <= 0) {
    return false;
  }

  const expirationDate = getPasswordExpirationDate(lastChangedDate, expirationDays);
  if (!expirationDate) {
    return false;
  }

  return new Date() > expirationDate;
}

/**
 * Get days until password expires
 * 
 * @param lastChangedDate - Date when password was last changed
 * @param expirationDays - Days until password expires
 * @returns Number of days until expiration (negative if already expired)
 */
export function getDaysUntilPasswordExpiration(
  lastChangedDate: Date,
  expirationDays: number
): number {
  if (expirationDays <= 0) {
    return -1; // No expiration
  }

  const expirationDate = getPasswordExpirationDate(lastChangedDate, expirationDays);
  if (!expirationDate) {
    return -1;
  }

  const now = new Date();
  const timeDiff = expirationDate.getTime() - now.getTime();
  return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
}

/**
 * Check if password expiration warning should be shown
 * 
 * @param lastChangedDate - Date when password was last changed
 * @param expirationDays - Days until password expires
 * @param warningDays - Days before expiration to show warning
 * @returns true if warning should be shown, false otherwise
 */
export function shouldShowPasswordExpirationWarning(
  lastChangedDate: Date,
  expirationDays: number,
  warningDays: number = 14
): boolean {
  const daysUntilExpiration = getDaysUntilPasswordExpiration(
    lastChangedDate,
    expirationDays
  );

  return daysUntilExpiration >= 0 && daysUntilExpiration <= warningDays;
}
