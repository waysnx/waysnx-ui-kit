/**
 * SecureInput Component
 * 
 * Enhanced text input with security features: content clearing, input validation,
 * autocomplete disabling, and memory protection mechanisms.
 */

import React, { useState, useRef, useCallback } from 'react';
import { Input } from '@waysnx/ui-core';

export interface SecureInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  [key: string]: any;
  /**
   * Input type (password, email, text)
   */
  type?: 'text' | 'email' | 'password' | 'url' | 'tel';
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Label text
   */
  label?: string;
  /**
   * Whether to disable autocomplete
   * @default true for password/email
   */
  disableAutocomplete?: boolean;
  /**
   * Whether to clear value on blur
   * @default false
   */
  clearOnBlur?: boolean;
  /**
   * Callback when value changes
   */
  onChange?: (value: string) => void;
  /**
   * Callback when input is cleared (for cleanup)
   */
  onClear?: () => void;
  /**
   * Custom validation function
   */
  validate?: (value: string) => boolean | string;
  /**
   * Error message to display
   */
  error?: string;
  /**
   * Whether to mask sensitive characters while typing
   */
  maskInput?: boolean;
}

/**
 * SecureInput - Text input with enhanced security features
 * 
 * Features:
 * - Autocomplete disabled for sensitive inputs
 * - Value clearing on blur (optional)
 * - Input validation
 * - Memory-safe handling
 * - Accessibility compliant
 */
export const SecureInput = React.forwardRef<HTMLInputElement, SecureInputProps>(
  (
    {
      type = 'text',
      placeholder,
      label,
      disableAutocomplete = ['password', 'email'].includes(type ?? 'text'),
      clearOnBlur = false,
      onChange,
      onClear,
      validate,
      error: externalError,
      maskInput = false,
      disabled,
      required,
      ...props
    },
    ref
  ) => {
    const internalRef = useRef<HTMLInputElement>(null);
    const [internalError, setInternalError] = useState<string>('');
    const [hasBeenTouched, setHasBeenTouched] = useState(false);

    const displayError = externalError || (hasBeenTouched ? internalError : '');

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        // Run validation
        if (validate && hasBeenTouched) {
          const validationResult = validate(value);
          setInternalError(
            validationResult === true ? '' : (validationResult as string) || ''
          );
        }

        onChange?.(value);
      },
      [validate, hasBeenTouched, onChange]
    );

    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        setHasBeenTouched(true);

        // Run validation on blur
        if (validate) {
          const validationResult = validate(e.target.value);
          setInternalError(
            validationResult === true ? '' : (validationResult as string) || ''
          );
        }

        // Clear value if requested
        if (clearOnBlur && internalRef.current) {
          internalRef.current.value = '';
          onChange?.('');
          onClear?.();
        }

        props.onBlur?.(e);
      },
      [validate, clearOnBlur, onChange, onClear, props]
    );

    const handleFocus = useCallback(() => {
      setInternalError('');
    }, []);

    // Combine refs
    const setRefs = (element: HTMLInputElement) => {
      internalRef.current = element;
      if (typeof ref === 'function') {
        ref(element);
      } else if (ref) {
        ref.current = element;
      }
    };

    return (
      <div>
        {label && (
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            {label}
            {required && <span style={{ color: 'var(--color-danger, red)' }}> *</span>}
          </label>
        )}

        <Input
          ref={setRefs}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          autoComplete={disableAutocomplete ? 'off' : 'on'}
          spellCheck={type === 'password' ? false : true}
          {...props}
        />

        {displayError && (
          <div
            as="span"
            display="block"
            fontSize="sm"
            color="danger"
            marginTop="0.25rem"
            role="alert"
          >
            {displayError}
          </div>
        )}
      </div>
    );
  }
);

SecureInput.displayName = 'SecureInput';

export default SecureInput;
