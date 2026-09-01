/**
 * PasswordInput Component
 * 
 * A secure password input component with:
 * - Visibility toggle for showing/hiding password
 * - Real-time strength validation with feedback
 * - Policy compliance checking
 * - Accessibility support (ARIA labels, keyboard navigation)
 * - Dark/light theme support
 */

import React, { useState, useCallback, forwardRef } from 'react';
import { validatePasswordAgainstPolicy, calculatePasswordStrength } from '../../utils';
import type { PasswordPolicy } from '../../types';

export interface PasswordInputProps {
  /**
   * Input value (controlled component)
   */
  value: string;

  /**
   * Change handler
   */
  onChange: (value: string) => void;

  /**
   * Password policy for validation
   */
  policy?: PasswordPolicy;

  /**
   * Show strength meter
   */
  showStrength?: boolean;

  /**
   * Show validation feedback
   */
  showFeedback?: boolean;

  /**
   * Placeholder text
   */
  placeholder?: string;

  /**
   * Input label
   */
  label?: string;

  /**
   * Error message
   */
  error?: string;

  /**
   * Help text
   */
  helperText?: string;

  /**
   * Disabled state
   */
  disabled?: boolean;

  /**
   * Required field
   */
  required?: boolean;

  /**
   * Auto-focus on mount
   */
  autoFocus?: boolean;

  /**
   * Custom CSS class
   */
  className?: string;

  /**
   * Additional props
   */
  [key: string]: any;
}

/**
 * PasswordInput Component
 */
export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      value,
      onChange,
      policy,
      showStrength = true,
      showFeedback = true,
      placeholder = 'Enter password',
      label,
      error,
      helperText,
      disabled = false,
      required = false,
      autoFocus = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    // Validate password against policy
    const validation = policy
      ? validatePasswordAgainstPolicy(value, policy)
      : { isValid: true, errors: [], warnings: [] };

    // Calculate strength
    const strength = calculatePasswordStrength(value);

    const handleToggleVisibility = useCallback(() => {
      setShowPassword((prev) => !prev);
    }, []);

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
      },
      [onChange]
    );

    const handleFocus = useCallback(() => {
      setIsFocused(true);
    }, []);

    const handleBlur = useCallback(() => {
      setIsFocused(false);
    }, []);

    const getStrengthColor = () => {
      switch (strength.level) {
        case 'veryWeak':
        case 'weak':
          return '#ef4444';
        case 'fair':
          return '#f97316';
        case 'good':
          return '#eab308';
        case 'strong':
          return '#84cc16';
        case 'veryStrong':
          return '#22c55e';
        default:
          return '#d1d5db';
      }
    };

    const getStrengthLabel = () => {
      const labels: Record<string, string> = {
        veryWeak: 'Very Weak',
        weak: 'Weak',
        fair: 'Fair',
        good: 'Good',
        strong: 'Strong',
        veryStrong: 'Very Strong',
      };
      return labels[strength.level] || 'Unknown';
    };

    return (
      <div className={`waysnx-password-input-wrapper ${className}`}>
        {label && (
          <label
            className="waysnx-password-input-label"
            htmlFor="password-input"
          >
            {label}
            {required && <span className="waysnx-required-indicator">*</span>}
          </label>
        )}

        <div className="waysnx-password-input-field">
          <input
            ref={ref}
            id="password-input"
            type={showPassword ? 'text' : 'password'}
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            autoFocus={autoFocus}
            aria-label={label || 'Password input'}
            aria-invalid={!validation.isValid}
            aria-describedby={error ? 'password-error' : undefined}
            className={`waysnx-password-input ${
              !validation.isValid ? 'waysnx-invalid' : ''
            } ${isFocused ? 'waysnx-focused' : ''}`}
            {...props}
          />

          <button
            type="button"
            onClick={handleToggleVisibility}
            disabled={disabled}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="waysnx-password-toggle"
            tabIndex={-1}
          >
            {showPassword ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M3.98 8.223A10.477 10.477 0 001.934 12c2.292 5.118 7.806 8.5 13.066 8.5.914 0 1.823-.102 2.716-.306m-6.402-3.78a6.5 6.5 0 100-11.995" />
                <path d="M15.426 15.426l3.536-3.536m-9.172 0L9.172 9.172" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        </div>

        {showStrength && value && (
          <div className="waysnx-password-strength">
            <div className="waysnx-strength-bar-container">
              <div
                className="waysnx-strength-bar"
                style={{
                  width: `${strength.score}%`,
                  backgroundColor: getStrengthColor(),
                }}
              />
            </div>
            <span className="waysnx-strength-label" style={{ color: getStrengthColor() }}>
              Strength: {getStrengthLabel()}
            </span>
          </div>
        )}

        {showFeedback && validation.errors.length > 0 && (
          <div className="waysnx-password-errors" id="password-error">
            {validation.errors.map((err, idx) => (
              <div key={idx} className="waysnx-error-message">
                {err}
              </div>
            ))}
          </div>
        )}

        {showFeedback && strength.feedback.length > 0 && value && (
          <div className="waysnx-password-feedback">
            {strength.feedback.map((feedback, idx) => (
              <div key={idx} className="waysnx-feedback-item">
                {feedback}
              </div>
            ))}
          </div>
        )}

        {helperText && (
          <div className="waysnx-helper-text">{helperText}</div>
        )}

        {error && (
          <div className="waysnx-error-text">{error}</div>
        )}

        <style>{`
          .waysnx-password-input-wrapper {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }

          .waysnx-password-input-label {
            font-size: 0.875rem;
            font-weight: 500;
            color: var(--text-primary, #1f2937);
          }

          .waysnx-required-indicator {
            color: var(--error-color, #ef4444);
            margin-left: 0.25rem;
          }

          .waysnx-password-input-field {
            position: relative;
            display: flex;
            align-items: center;
          }

          .waysnx-password-input {
            width: 100%;
            padding: 0.5rem 2.5rem 0.5rem 0.75rem;
            border: 1px solid var(--border-color, #d1d5db);
            border-radius: 0.375rem;
            font-size: 1rem;
            transition: border-color 0.2s, box-shadow 0.2s;
            background-color: var(--input-bg, #ffffff);
            color: var(--text-primary, #1f2937);
          }

          .waysnx-password-input:focus {
            outline: none;
            border-color: var(--primary-color, #3b82f6);
            box-shadow: 0 0 0 3px var(--primary-color-light, rgba(59, 130, 246, 0.1));
          }

          .waysnx-password-input.waysnx-invalid {
            border-color: var(--error-color, #ef4444);
          }

          .waysnx-password-input:disabled {
            background-color: var(--disabled-bg, #f3f4f6);
            cursor: not-allowed;
            opacity: 0.6;
          }

          .waysnx-password-toggle {
            position: absolute;
            right: 0.75rem;
            background: none;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 1.5rem;
            height: 1.5rem;
            color: var(--text-secondary, #6b7280);
            transition: color 0.2s;
            padding: 0;
          }

          .waysnx-password-toggle:hover:not(:disabled) {
            color: var(--text-primary, #1f2937);
          }

          .waysnx-password-toggle:disabled {
            cursor: not-allowed;
            opacity: 0.5;
          }

          .waysnx-password-toggle svg {
            width: 1.25rem;
            height: 1.25rem;
            stroke-width: 2;
          }

          .waysnx-password-strength {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
          }

          .waysnx-strength-bar-container {
            width: 100%;
            height: 0.375rem;
            background-color: var(--bg-secondary, #f3f4f6);
            border-radius: 0.25rem;
            overflow: hidden;
          }

          .waysnx-strength-bar {
            height: 100%;
            transition: width 0.3s ease, background-color 0.3s ease;
          }

          .waysnx-strength-label {
            font-size: 0.75rem;
            font-weight: 500;
          }

          .waysnx-password-errors {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
          }

          .waysnx-error-message {
            font-size: 0.875rem;
            color: var(--error-color, #ef4444);
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          .waysnx-error-message::before {
            content: '✕';
            font-weight: bold;
          }

          .waysnx-password-feedback {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
            padding: 0.5rem;
            background-color: var(--info-bg, #dbeafe);
            border-left: 2px solid var(--info-color, #3b82f6);
            border-radius: 0.25rem;
          }

          .waysnx-feedback-item {
            font-size: 0.875rem;
            color: var(--info-text, #0c4a6e);
          }

          .waysnx-helper-text {
            font-size: 0.875rem;
            color: var(--text-secondary, #6b7280);
          }

          .waysnx-error-text {
            font-size: 0.875rem;
            color: var(--error-color, #ef4444);
          }

          /* Dark mode support */
          @media (prefers-color-scheme: dark) {
            .waysnx-password-input-label {
              color: var(--text-primary-dark, #f3f4f6);
            }

            .waysnx-password-input {
              background-color: var(--input-bg-dark, #1f2937);
              color: var(--text-primary-dark, #f3f4f6);
              border-color: var(--border-color-dark, #374151);
            }

            .waysnx-password-input:focus {
              border-color: var(--primary-color-dark, #60a5fa);
              box-shadow: 0 0 0 3px var(--primary-color-light-dark, rgba(96, 165, 250, 0.1));
            }

            .waysnx-password-input:disabled {
              background-color: var(--disabled-bg-dark, #111827);
            }

            .waysnx-password-toggle {
              color: var(--text-secondary-dark, #9ca3af);
            }

            .waysnx-password-toggle:hover:not(:disabled) {
              color: var(--text-primary-dark, #f3f4f6);
            }

            .waysnx-strength-bar-container {
              background-color: var(--bg-secondary-dark, #374151);
            }

            .waysnx-password-feedback {
              background-color: var(--info-bg-dark, #0c2d4a);
              color: var(--info-text-dark, #93c5fd);
            }

            .waysnx-helper-text {
              color: var(--text-secondary-dark, #9ca3af);
            }
          }

          /* Accessibility */
          @media (prefers-reduced-motion: reduce) {
            .waysnx-password-input,
            .waysnx-strength-bar,
            .waysnx-password-toggle {
              transition: none;
            }
          }

          /* High contrast mode */
          @media (prefers-contrast: more) {
            .waysnx-password-input {
              border-width: 2px;
            }

            .waysnx-strength-bar {
              border: 1px solid currentColor;
            }
          }
        `}</style>
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
