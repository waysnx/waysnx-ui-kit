/**
 * MaskedInput Component
 * 
 * Text input with input masking (credit cards, phone numbers, etc).
 */

import React, { useState, useRef, useCallback } from 'react';
import { Input } from '@waysnx/ui-core';

export interface MaskedInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  [key: string]: any;
  /**
   * Input mask pattern (e.g., '(999) 999-9999')
   * 9 = digit, A = letter, X = alphanumeric
   */
  mask: string;
  /**
   * Character used to display mask (default is space)
   */
  maskChar?: string;
  /**
   * Label text
   */
  label?: string;
  /**
   * Callback with unmasked value
   */
  onChange?: (unmaskedValue: string) => void;
  /**
   * Callback with masked value
   */
  onChangeFormatted?: (maskedValue: string) => void;
  /**
   * Error message
   */
  error?: string;
  /**
   * Whether input is complete
   */
  isComplete?: boolean;
}

/**
 * MaskedInput - Text input with pattern masking
 */
export const MaskedInput = React.forwardRef<HTMLInputElement, MaskedInputProps>(
  (
    {
      mask,
      maskChar = ' ',
      label,
      onChange,
      onChangeFormatted,
      error,
      disabled,
      required,
      ...props
    },
    ref
  ) => {
    const internalRef = useRef<HTMLInputElement>(null);
    const [maskedValue, setMaskedValue] = useState('');

    // Apply mask to input value
    const applyMask = useCallback(
      (value: string): { masked: string; unmasked: string } => {
        const unmasked = value.replace(/\D/g, '');
        let masked = '';
        let unmaskedIndex = 0;

        for (let i = 0; i < mask.length; i++) {
          const maskChar_ = mask[i];

          if (maskChar_ === '9') {
            // Digit
            if (unmaskedIndex < unmasked.length) {
              masked += unmasked[unmaskedIndex];
              unmaskedIndex++;
            } else {
              masked += maskChar;
            }
          } else if (maskChar_ === 'A') {
            // Letter
            if (unmaskedIndex < unmasked.length) {
              const char = unmasked[unmaskedIndex];
              if (/[a-zA-Z]/.test(char)) {
                masked += char;
                unmaskedIndex++;
              }
            } else {
              masked += maskChar;
            }
          } else if (maskChar_ === 'X') {
            // Alphanumeric
            if (unmaskedIndex < unmasked.length) {
              masked += unmasked[unmaskedIndex];
              unmaskedIndex++;
            } else {
              masked += maskChar;
            }
          } else {
            // Literal character
            masked += maskChar_;
          }
        }

        return {
          masked: masked.replace(new RegExp(`\\${maskChar}+$`), ''),
          unmasked: unmasked.slice(0, unmaskedIndex),
        };
      },
      [mask, maskChar]
    );

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const { masked, unmasked } = applyMask(e.target.value);

        setMaskedValue(masked);
        if (internalRef.current) {
          internalRef.current.value = masked;
        }

        onChange?.(unmasked);
        onChangeFormatted?.(masked);
      },
      [applyMask, onChange, onChangeFormatted]
    );

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
          type="text"
          value={maskedValue}
          onChange={handleChange}
          disabled={disabled}
          placeholder={mask}
          {...props}
        />

        {error && (
          <div
            as="span"
            display="block"
            fontSize="sm"
            color="danger"
            marginTop="0.25rem"
            role="alert"
          >
            {error}
          </div>
        )}
      </div>
    );
  }
);

MaskedInput.displayName = 'MaskedInput';

export default MaskedInput;
