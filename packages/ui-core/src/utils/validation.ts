/**
 * Validation utility functions for form components.
 * Supports i18n through optional message parameters.
 * When used within a TranslationProvider, default messages come from the active locale.
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validate required field
 */
export function validateRequired(value: any, message = 'This field is required'): ValidationResult {
  const isEmpty = value === null || value === undefined || value === '' || 
                  (Array.isArray(value) && value.length === 0);
  
  return {
    isValid: !isEmpty,
    error: isEmpty ? message : undefined
  };
}

/**
 * Validate email format
 */
export function validateEmail(value: string, message = 'Please enter a valid email address'): ValidationResult {
  if (!value) return { isValid: true };
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(value);
  
  return {
    isValid,
    error: isValid ? undefined : message
  };
}

/**
 * Validate pattern (regex)
 */
export function validatePattern(value: string, pattern: string | RegExp, message = 'Invalid format'): ValidationResult {
  if (!value) return { isValid: true };
  
  const regex = typeof pattern === 'string' ? new RegExp(pattern) : pattern;
  const isValid = regex.test(value);
  
  return {
    isValid,
    error: isValid ? undefined : message
  };
}

/**
 * Validate minimum length
 */
export function validateMinLength(value: string, minLength: number, message?: string): ValidationResult {
  if (!value) return { isValid: true };
  
  const isValid = value.length >= minLength;
  const defaultMessage = `Minimum ${minLength} characters required`;
  
  return {
    isValid,
    error: isValid ? undefined : (message || defaultMessage)
  };
}

/**
 * Validate maximum length
 */
export function validateMaxLength(value: string, maxLength: number, message?: string): ValidationResult {
  if (!value) return { isValid: true };
  
  const isValid = value.length <= maxLength;
  const defaultMessage = `Maximum ${maxLength} characters allowed`;
  
  return {
    isValid,
    error: isValid ? undefined : (message || defaultMessage)
  };
}

/**
 * Validate minimum value
 */
export function validateMin(value: number | string, min: number, message?: string): ValidationResult {
  if (value === null || value === undefined || value === '' || (typeof value === 'number' && isNaN(value))) return { isValid: true };
  
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  const isValid = numValue >= min;
  const defaultMessage = `Value must be at least ${min}`;
  
  return {
    isValid,
    error: isValid ? undefined : (message || defaultMessage)
  };
}

/**
 * Validate maximum value
 */
export function validateMax(value: number | string, max: number, message?: string): ValidationResult {
  if (value === null || value === undefined || value === '' || (typeof value === 'number' && isNaN(value))) return { isValid: true };
  
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  const isValid = numValue <= max;
  const defaultMessage = `Value must be at most ${max}`;
  
  return {
    isValid,
    error: isValid ? undefined : (message || defaultMessage)
  };
}

/**
 * Validate enum (value in allowed list)
 */
export function validateEnum(value: any, allowedValues: any[], message = 'Invalid value'): ValidationResult {
  if (!value) return { isValid: true };
  
  const isValid = allowedValues.includes(value);
  
  return {
    isValid,
    error: isValid ? undefined : message
  };
}

/**
 * Validate minimum selected items (for multi-select, checkbox group)
 */
export function validateMinSelected(values: any[], minSelected: number, message?: string): ValidationResult {
  const count = Array.isArray(values) ? values.filter(Boolean).length : 0;
  const isValid = count >= minSelected;
  const defaultMessage = `Please select at least ${minSelected} item${minSelected > 1 ? 's' : ''}`;
  
  return {
    isValid,
    error: isValid ? undefined : (message || defaultMessage)
  };
}

/**
 * Validate maximum selected items (for multi-select, checkbox group)
 */
export function validateMaxSelected(values: any[], maxSelected: number, message?: string): ValidationResult {
  const count = Array.isArray(values) ? values.filter(Boolean).length : 0;
  const isValid = count <= maxSelected;
  const defaultMessage = `Please select at most ${maxSelected} item${maxSelected > 1 ? 's' : ''}`;
  
  return {
    isValid,
    error: isValid ? undefined : (message || defaultMessage)
  };
}

/**
 * Validate match with another field
 */
export function validateMatchWith(value: any, matchValue: any, fieldName: string, message?: string): ValidationResult {
  if (!value || !matchValue) return { isValid: true };
  
  const isValid = value === matchValue;
  const defaultMessage = `Must match ${fieldName}`;
  
  return {
    isValid,
    error: isValid ? undefined : (message || defaultMessage)
  };
}

/**
 * Run all validations and return first error
 */
export function runValidations(validations: (() => ValidationResult)[]): ValidationResult {
  for (const validate of validations) {
    const result = validate();
    if (!result.isValid) {
      return result;
    }
  }
  
  return { isValid: true };
}

/**
 * Create a translated validation runner that uses messages from the translation context.
 * Use this with useTranslation() to get locale-aware validation.
 *
 * @example
 * const { t } = useTranslation();
 * const validate = createTranslatedValidators(t);
 * 
 * validate.required(value); // Uses translated "required" message
 * validate.email(value);    // Uses translated "email" message
 * validate.minLength(value, 3); // Uses translated "minLength" with {min: 3}
 */
export function createTranslatedValidators(
  t: (key: string, params?: Record<string, string | number>) => string
) {
  return {
    required: (value: any) =>
      validateRequired(value, t('validation.required')),

    email: (value: string) =>
      validateEmail(value, t('validation.email')),

    pattern: (value: string, pattern: string | RegExp) =>
      validatePattern(value, pattern, t('validation.pattern')),

    minLength: (value: string, min: number) =>
      validateMinLength(value, min, t('validation.minLength', { min })),

    maxLength: (value: string, max: number) =>
      validateMaxLength(value, max, t('validation.maxLength', { max })),

    min: (value: number | string, min: number) =>
      validateMin(value, min, t('validation.min', { min })),

    max: (value: number | string, max: number) =>
      validateMax(value, max, t('validation.max', { max })),

    enum: (value: any, allowedValues: any[]) =>
      validateEnum(value, allowedValues, t('validation.enum')),

    minSelected: (values: any[], min: number) =>
      validateMinSelected(values, min, t('validation.minSelected', { min })),

    maxSelected: (values: any[], max: number) =>
      validateMaxSelected(values, max, t('validation.maxSelected', { max })),

    matchWith: (value: any, matchValue: any, fieldName: string) =>
      validateMatchWith(value, matchValue, fieldName, t('validation.matchWith', { field: fieldName })),
  };
}
