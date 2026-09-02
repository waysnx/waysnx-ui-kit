/**
 * @file utils/input.ts
 * Input sanitization and validation utilities
 */

import DOMPurify from 'dompurify';
import { secureRandomString } from './crypto';

/**
 * Sanitize user input to prevent XSS
 */
export function sanitizeInput(input: string): string {
  if (!input) return '';
  return input
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '');
}

/**
 * Sanitize HTML content
 */
export function sanitizeHTML(html: string): string {
  if (!html) return '';
  return DOMPurify.sanitize(html, { ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br'] });
}

/**
 * Mask sensitive values
 */
export function maskValue(
  value: string,
  visibleStart: number = 0,
  visibleEnd: number = 0
): string {
  if (!value) return '';
  if (value.length <= visibleStart + visibleEnd) return value;

  const start = value.substring(0, visibleStart);
  const end = value.substring(value.length - visibleEnd);
  const masked = '*'.repeat(value.length - visibleStart - visibleEnd);

  return `${start}${masked}${end}`;
}

/**
 * Mask email address
 */
export function maskEmail(email: string): string {
  if (!email || !email.includes('@')) return email;
  const [local, domain] = email.split('@');
  return `${local.substring(0, 1)}***@${domain}`;
}

/**
 * Mask credit card number
 */
export function maskCreditCard(cardNumber: string): string {
  const cleaned = cardNumber.replace(/\s/g, '');
  return `****-****-****-${cleaned.substring(cleaned.length - 4)}`;
}

/**
 * Mask phone number
 */
export function maskPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  return `***-***-${cleaned.substring(cleaned.length - 4)}`;
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Validate password strength
 */
export function validatePasswordStrength(password: string): {
  isValid: boolean;
  strength: number;
  feedback: string[];
} {
  const feedback: string[] = [];
  let strength = 0;

  if (password.length < 8) {
    feedback.push('Password must be at least 8 characters long');
  } else {
    strength++;
  }

  if (!/[A-Z]/.test(password)) {
    feedback.push('Password must contain at least one uppercase letter');
  } else {
    strength++;
  }

  if (!/[a-z]/.test(password)) {
    feedback.push('Password must contain at least one lowercase letter');
  } else {
    strength++;
  }

  if (!/[0-9]/.test(password)) {
    feedback.push('Password must contain at least one number');
  } else {
    strength++;
  }

  if (!/[^A-Za-z0-9]/.test(password)) {
    feedback.push('Password must contain at least one special character');
  } else {
    strength++;
  }

  return {
    isValid: feedback.length === 0,
    strength,
    feedback,
  };
}

/**
 * Validate strong password (contains all requirements)
 */
export function isStrongPassword(password: string): boolean {
  const { isValid } = validatePasswordStrength(password);
  return isValid;
}

/**
 * Generate OTP
 */
export function generateOTP(length: number = 6): string {
  // OTPs are single-use authentication credentials, so digits are drawn with
  // cryptographically-secure, unbiased randomness rather than Math.random().
  return secureRandomString(length, '0123456789');
}

/**
 * Verify OTP
 */
export function verifyOTP(providedOTP: string, actualOTP: string): boolean {
  return providedOTP === actualOTP;
}
