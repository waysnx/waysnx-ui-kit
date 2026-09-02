/**
 * PINInput Component
 * 
 * Specialized numeric input for PIN/code entry with auto-focus and masked display.
 */

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Stack } from '@waysnx/ui-layout';

export interface PINInputProps {
  /**
   * Number of PIN digits
   * @default 4
   */
  length?: number;
  /**
   * Callback when PIN is complete
   */
  onComplete?: (pin: string) => void;
  /**
   * Callback on value change
   */
  onChange?: (value: string) => void;
  /**
   * Whether to mask digits with dots
   * @default true
   */
  masked?: boolean;
  /**
   * Label text
   */
  label?: string;
  /**
   * Error message
   */
  error?: string;
  /**
   * Whether input is disabled
   */
  disabled?: boolean;
  /**
   * Auto-submit after completing PIN
   * @default true
   */
  autoComplete?: boolean;
}

/**
 * PINInput - Numeric code input with auto-advancing
 * 
 * Features:
 * - Auto-focus to next field
 * - Masked digit display
 * - Keyboard navigation (backspace to previous)
 * - Paste support
 */
export const PINInput: React.FC<PINInputProps> = ({
  length = 4,
  onComplete,
  onChange,
  masked = true,
  label,
  error,
  disabled = false,
  autoComplete = true,
}) => {
  const [pin, setPin] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleInputChange = useCallback(
    (index: number, value: string) => {
      // Only allow digits
      const digit = value.replace(/\D/g, '').slice(0, 1);

      const newPin = [...pin];
      newPin[index] = digit;
      setPin(newPin);

      const pinString = newPin.join('');
      onChange?.(pinString);

      // Auto-focus to next field
      if (digit && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }

      // Call onComplete when all digits filled
      if (pinString.length === length && autoComplete) {
        onComplete?.(pinString);
      }
    },
    [pin, length, onChange, onComplete, autoComplete]
  );

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace') {
        e.preventDefault();

        if (pin[index]) {
          // Clear current field
          handleInputChange(index, '');
        } else if (index > 0) {
          // Move to previous field on backspace
          inputRefs.current[index - 1]?.focus();
        }
      } else if (e.key === 'ArrowLeft' && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else if (e.key === 'ArrowRight' && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [pin, length, handleInputChange]
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();

      const pastedData = e.clipboardData.getData('text');
      const digits = pastedData.replace(/\D/g, '').slice(0, length);

      if (digits.length > 0) {
        const newPin = [...digits.padEnd(length, '').split('')];
        setPin(newPin);

        const pinString = newPin.join('');
        onChange?.(pinString);

        // Focus last field or call onComplete
        if (digits.length === length && autoComplete) {
          onComplete?.(pinString);
        } else {
          inputRefs.current[Math.min(digits.length, length - 1)]?.focus();
        }
      }
    },
    [length, onChange, onComplete, autoComplete]
  );

  return (
    <div>
      {label && (
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
          {label}
        </label>
      )}

      <Stack gap="sm" direction="row" justifyContent="center">
        {Array.from({ length }).map((_, index) => (
          <input
            key={index}
            ref={el => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            value={masked && pin[index] ? 'â€¢' : pin[index]}
            onChange={(e: any) => handleInputChange(index, e.target.value)}
            onKeyDown={(e: any) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            disabled={disabled}
            maxLength={1}
            style={{
              width: '50px',
              height: '50px',
              fontSize: '24px',
              textAlign: 'center',
              borderRadius: '8px',
              border: '2px solid var(--color-border, #ccc)',
              fontWeight: 'bold',
              backgroundColor: 'var(--color-background, #fff)',
            }}
            aria-label={`PIN digit ${index + 1} of ${length}`}
          />
        ))}
      </Stack>

      {error && (
        <div
          as="span"
          display="block"
          fontSize="sm"
          color="danger"
          marginTop="0.5rem"
          textAlign="center"
          role="alert"
        >
          {error}
        </div>
      )}
    </div>
  );
};

PINInput.displayName = 'PINInput';

export default PINInput;
