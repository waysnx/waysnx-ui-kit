/**
 * OTPInput Component
 * 
 * One-Time Password input with:
 * - Multiple digit fields (configurable, typically 6)
 * - Auto-focus between fields
 * - Keyboard navigation support
 * - Paste support (auto-distribute digits)
 * - Full accessibility
 * - Does NOT use ui-core Input (custom numeric input)
 */

import React, { useRef, useEffect, useCallback, useState } from 'react';

export interface OTPInputProps {
  /**
   * Number of OTP digits
   */
  length?: number;

  /**
   * Callback when OTP is complete
   */
  onComplete?: (otp: string) => void;

  /**
   * Callback for value changes
   */
  onChange?: (value: string) => void;

  /**
   * Current OTP value
   */
  value?: string;

  /**
   * Disable input
   */
  disabled?: boolean;

  /**
   * Input placeholder character
   */
  placeholder?: string;

  /**
   * Label
   */
  label?: string;

  /**
   * Error message
   */
  error?: string;

  /**
   * Helper text
   */
  helperText?: string;

  /**
   * Custom CSS class
   */
  className?: string;

  /**
   * Test ID
   */
  testId?: string;
}

/**
 * OTPInput Component
 */
export const OTPInput: React.FC<OTPInputProps> = ({
  length = 6,
  onComplete,
  onChange,
  value = '',
  disabled = false,
  placeholder = 'â€¢',
  label,
  error,
  helperText,
  className = '',
  testId,
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));

  // Initialize OTP from value prop
  useEffect(() => {
    if (value) {
      const digits = value.split('').slice(0, length);
      setOtp([...digits, ...Array(length - digits.length).fill('')]);
    }
  }, [value, length]);

  const handleChange = useCallback(
    (index: number, val: string) => {
      // Only allow digits
      if (val && !/^\d$/.test(val)) {
        return;
      }

      const newOtp = [...otp];
      newOtp[index] = val;
      setOtp(newOtp);

      const otpString = newOtp.join('');
      onChange?.(otpString);

      // Auto-focus next field if digit is entered
      if (val && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }

      // Call onComplete when all digits are filled
      if (otpString.length === length && /^\d+$/.test(otpString)) {
        onComplete?.(otpString);
      }
    },
    [otp, length, onChange, onComplete]
  );

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case 'Backspace':
          e.preventDefault();
          // If field is empty, move to previous field and delete
          if (!otp[index]) {
            if (index > 0) {
              const newOtp = [...otp];
              newOtp[index - 1] = '';
              setOtp(newOtp);
              onChange?.(newOtp.join(''));
              inputRefs.current[index - 1]?.focus();
            }
          } else {
            // Clear current field
            handleChange(index, '');
          }
          break;

        case 'ArrowLeft':
          e.preventDefault();
          if (index > 0) {
            inputRefs.current[index - 1]?.focus();
          }
          break;

        case 'ArrowRight':
          e.preventDefault();
          if (index < length - 1) {
            inputRefs.current[index + 1]?.focus();
          }
          break;

        case 'ArrowUp':
        case 'ArrowDown':
          e.preventDefault();
          break;

        default:
          // Handle paste
          if (e.ctrlKey && e.key === 'v') {
            e.preventDefault();
          }
          if (e.metaKey && e.key === 'v') {
            e.preventDefault();
          }
      }
    },
    [otp, length, onChange, handleChange]
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const paste = e.clipboardData.getData('text');
      const digits = paste.replace(/\D/g, '').split('').slice(0, length);

      if (digits.length > 0) {
        const newOtp = [...digits, ...Array(length - digits.length).fill('')];
        setOtp(newOtp);
        const otpString = digits.join('');
        onChange?.(otpString);

        // Focus the next empty field or last field
        const nextIndex = Math.min(digits.length, length - 1);
        inputRefs.current[nextIndex]?.focus();

        // Call onComplete if all digits are filled
        if (digits.length === length) {
          onComplete?.(otpString);
        }
      }
    },
    [length, onChange, onComplete]
  );

  const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    // Select content on focus for better UX
    e.currentTarget.select();
  }, []);

  return (
    <div className={`waysnx-otp-input-wrapper ${className}`} data-testid={testId}>
      {label && (
        <label className="waysnx-otp-label" htmlFor="otp-field-0">
          {label}
        </label>
      )}

      <div className="waysnx-otp-fields" role="group" aria-label={label || 'OTP input'}>
        {Array.from({ length }).map((_, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            id={`otp-field-${index}`}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={otp[index]}
            onChange={(e: any) => handleChange(index, e.target.value)}
            onKeyDown={(e: any) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            onFocus={handleFocus}
            disabled={disabled}
            placeholder={placeholder}
            aria-label={`OTP digit ${index + 1} of ${length}`}
            aria-invalid={!!error}
            className={`waysnx-otp-field ${error ? 'waysnx-error' : ''}`}
            data-testid={`otp-field-${index}`}
          />
        ))}
      </div>

      {error && (
        <div className="waysnx-otp-error" role="alert" id="otp-error">
          {error}
        </div>
      )}

      {helperText && !error && (
        <div className="waysnx-otp-helper" id="otp-helper">
          {helperText}
        </div>
      )}

      <style>{`
        .waysnx-otp-input-wrapper {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          width: 100%;
        }

        .waysnx-otp-label {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-primary, #1f2937);
        }

        .waysnx-otp-fields {
          display: flex;
          gap: 0.5rem;
          justify-content: center;
          flex-wrap: nowrap;
        }

        .waysnx-otp-field {
          width: 2.5rem;
          height: 2.5rem;
          font-size: 1.25rem;
          font-weight: 600;
          text-align: center;
          border: 2px solid var(--border-color, #d1d5db);
          border-radius: 0.375rem;
          background-color: var(--input-bg, #ffffff);
          color: var(--text-primary, #1f2937);
          transition: border-color 0.2s, box-shadow 0.2s;
          padding: 0;
          -moz-appearance: textfield;
        }

        .waysnx-otp-field::-webkit-outer-spin-button,
        .waysnx-otp-field::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        .waysnx-otp-field:focus {
          outline: none;
          border-color: var(--primary-color, #3b82f6);
          box-shadow: 0 0 0 3px var(--primary-color-light, rgba(59, 130, 246, 0.1));
        }

        .waysnx-otp-field.waysnx-error {
          border-color: var(--error-color, #ef4444);
        }

        .waysnx-otp-field.waysnx-error:focus {
          box-shadow: 0 0 0 3px var(--error-color-light, rgba(239, 68, 68, 0.1));
        }

        .waysnx-otp-field:disabled {
          background-color: var(--disabled-bg, #f3f4f6);
          color: var(--text-disabled, #d1d5db);
          cursor: not-allowed;
          opacity: 0.6;
        }

        .waysnx-otp-error {
          font-size: 0.875rem;
          color: var(--error-color, #ef4444);
          text-align: center;
        }

        .waysnx-otp-helper {
          font-size: 0.75rem;
          color: var(--text-secondary, #6b7280);
          text-align: center;
        }

        /* Dark mode */
        @media (prefers-color-scheme: dark) {
          .waysnx-otp-label {
            color: var(--text-primary-dark, #f3f4f6);
          }

          .waysnx-otp-field {
            border-color: var(--border-color-dark, #4b5563);
            background-color: var(--input-bg-dark, #1f2937);
            color: var(--text-primary-dark, #f3f4f6);
          }

          .waysnx-otp-field:focus {
            border-color: var(--primary-color-dark, #60a5fa);
            box-shadow: 0 0 0 3px var(--primary-color-light-dark, rgba(96, 165, 250, 0.1));
          }

          .waysnx-otp-field:disabled {
            background-color: var(--disabled-bg-dark, #111827);
            color: var(--text-disabled-dark, #6b7280);
          }

          .waysnx-otp-helper {
            color: var(--text-secondary-dark, #9ca3af);
          }
        }

        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          .waysnx-otp-field {
            transition: none;
          }
        }

        /* High contrast */
        @media (prefers-contrast: more) {
          .waysnx-otp-field {
            border-width: 3px;
          }
        }
      `}</style>
    </div>
  );
};

OTPInput.displayName = 'OTPInput';

export default OTPInput;
