/**
 * usePasswordValidation Hook
 *
 * Validates passwords against policy requirements
 */

import { useState, useCallback } from 'react';

export interface PasswordPolicy {
  /**
   * Minimum password length
   */
  minLength?: number;
  /**
   * Maximum password length
   */
  maxLength?: number;
  /**
   * Require uppercase letters
   */
  requireUppercase?: boolean;
  /**
   * Require lowercase letters
   */
  requireLowercase?: boolean;
  /**
   * Require numbers
   */
  requireNumbers?: boolean;
  /**
   * Require special characters
   */
  requireSpecialChars?: boolean;
  /**
   * Forbidden patterns
   */
  forbiddenPatterns?: RegExp[];
}

export interface PasswordValidationResult {
  isValid: boolean;
  strength: 'weak' | 'fair' | 'good' | 'strong';
  errors: string[];
  requirements: {
    name: string;
    met: boolean;
  }[];
}

const DEFAULT_POLICY: PasswordPolicy = {
  minLength: 12,
  maxLength: 128,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
};

/**
 * usePasswordValidation - Hook for password validation and strength checking
 */
export const usePasswordValidation = (policy: PasswordPolicy = DEFAULT_POLICY) => {
  const [validationResult, setValidationResult] = useState<PasswordValidationResult | null>(
    null
  );

  const validatePassword = useCallback(
    (password: string): PasswordValidationResult => {
      const errors: string[] = [];
      const requirements: { name: string; met: boolean }[] = [];
      let strengthScore = 0;

      // Length check
      if (policy.minLength && password.length < policy.minLength) {
        errors.push(`Password must be at least ${policy.minLength} characters`);
        requirements.push({ name: `Minimum ${policy.minLength} characters`, met: false });
      } else {
        requirements.push({ name: `Minimum ${policy.minLength} characters`, met: true });
        strengthScore++;
      }

      if (policy.maxLength && password.length > policy.maxLength) {
        errors.push(`Password must not exceed ${policy.maxLength} characters`);
        requirements.push({ name: `Maximum ${policy.maxLength} characters`, met: false });
      } else {
        requirements.push({ name: `Maximum ${policy.maxLength} characters`, met: true });
      }

      // Uppercase check
      if (policy.requireUppercase) {
        const hasUppercase = /[A-Z]/.test(password);
        if (!hasUppercase) {
          errors.push('Password must contain uppercase letters');
        }
        requirements.push({ name: 'Uppercase letter (A-Z)', met: hasUppercase });
        if (hasUppercase) strengthScore++;
      }

      // Lowercase check
      if (policy.requireLowercase) {
        const hasLowercase = /[a-z]/.test(password);
        if (!hasLowercase) {
          errors.push('Password must contain lowercase letters');
        }
        requirements.push({ name: 'Lowercase letter (a-z)', met: hasLowercase });
        if (hasLowercase) strengthScore++;
      }

      // Numbers check
      if (policy.requireNumbers) {
        const hasNumbers = /\d/.test(password);
        if (!hasNumbers) {
          errors.push('Password must contain numbers');
        }
        requirements.push({ name: 'Number (0-9)', met: hasNumbers });
        if (hasNumbers) strengthScore++;
      }

      // Special characters check
      if (policy.requireSpecialChars) {
        const hasSpecialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
        if (!hasSpecialChars) {
          errors.push('Password must contain special characters');
        }
        requirements.push({ name: 'Special character (!@#$%^&*)', met: hasSpecialChars });
        if (hasSpecialChars) strengthScore++;
      }

      // Forbidden patterns
      if (policy.forbiddenPatterns) {
        for (const pattern of policy.forbiddenPatterns) {
          if (pattern.test(password)) {
            errors.push('Password contains forbidden pattern');
            break;
          }
        }
      }

      // Determine strength
      let strength: 'weak' | 'fair' | 'good' | 'strong' = 'weak';
      if (strengthScore >= 3) strength = 'fair';
      if (strengthScore >= 4) strength = 'good';
      if (strengthScore >= 5) strength = 'strong';

      const result: PasswordValidationResult = {
        isValid: errors.length === 0,
        strength,
        errors,
        requirements,
      };

      setValidationResult(result);
      return result;
    },
    [policy]
  );

  return {
    validate: validatePassword,
    result: validationResult,
  };
};

export default usePasswordValidation;
