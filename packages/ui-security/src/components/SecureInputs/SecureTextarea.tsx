/**
 * SecureTextarea Component
 * 
 * Enhanced textarea input with security features and content protection.
 */

import React, { useState, useRef, useCallback } from 'react';


export interface SecureTextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'children' | 'onChange'> {
  /**
   * Label text
   */
  label?: string;
  /**
   * Whether to disable autocomplete
   * @default true
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
   * Callback when textarea is cleared
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
   * Maximum character count with warning
   */
  maxCharacters?: number;
  /**
   * Show character counter
   */
  showCounter?: boolean;
}

/**
 * SecureTextarea - Textarea input with enhanced security features
 */
export const SecureTextarea = React.forwardRef<
  HTMLTextAreaElement,
  SecureTextareaProps
>(
  (
    {
      label,
      disableAutocomplete = true,
      clearOnBlur = false,
      onChange,
      onClear,
      validate,
      error: externalError,
      maxCharacters,
      showCounter = false,
      disabled,
      required,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const internalRef = useRef<HTMLTextAreaElement>(null);
    const [internalError, setInternalError] = useState<string>('');
    const [hasBeenTouched, setHasBeenTouched] = useState(false);
    const [charCount, setCharCount] = useState(0);

    const displayError = externalError || (hasBeenTouched ? internalError : '');

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        const newCharCount = value.length;

        // Check max characters
        if (maxCharacters && newCharCount > maxCharacters) {
          setInternalError(`Maximum ${maxCharacters} characters allowed`);
        } else {
          // Run custom validation
          if (validate && hasBeenTouched) {
            const validationResult = validate(value);
            setInternalError(
              validationResult === true ? '' : (validationResult as string) || ''
            );
          } else {
            setInternalError('');
          }
        }

        setCharCount(newCharCount);
        onChange?.(value);
      },
      [validate, maxCharacters, hasBeenTouched, onChange]
    );

    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLTextAreaElement>) => {
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
          setCharCount(0);
        }

        props.onBlur?.(e);
      },
      [validate, clearOnBlur, onChange, onClear, props]
    );

    const handleFocus = useCallback(() => {
      setInternalError('');
    }, []);

    // Combine refs
    const setRefs = (element: HTMLTextAreaElement) => {
      internalRef.current = element;
      if (typeof ref === 'function') {
        ref(element);
      } else if (ref) {
        ref.current = element;
      }
    };

    const counterColor =
      maxCharacters && charCount > maxCharacters * 0.9 ? 'warning' : 'muted';

    return (
      <div>
        {label && (
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            {label}
            {required && <span style={{ color: 'var(--color-danger, red)' }}> *</span>}
          </label>
        )}

        <textarea
          ref={setRefs}
          disabled={disabled}
          required={required}
          rows={rows}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          autoComplete={disableAutocomplete ? 'off' : 'on'}
          spellCheck="true"
          style={{
            width: '100%',
            padding: '0.5rem',
            borderRadius: '4px',
            border: '1px solid var(--color-border, #ccc)',
            fontFamily: 'inherit',
            fontSize: 'inherit',
          }}
          {...props}
        />

        {/* Character Counter */}
        {showCounter && maxCharacters && (
          <div
            display="flex"
            justifyContent="flex-end"
            marginTop="0.25rem"
            fontSize="sm"
            color={counterColor}
          >
            {charCount} / {maxCharacters}
          </div>
        )}

        {/* Error Message */}
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

SecureTextarea.displayName = 'SecureTextarea';

export default SecureTextarea;
