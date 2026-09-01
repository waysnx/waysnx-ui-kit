/**
 * PasswordGenerator Component
 * 
 * A password generator utility with:
 * - Configurable generation options
 * - Copy to clipboard functionality
 * - Refresh/regenerate button
 * - Strength indicator
 * - Accessibility support
 */

import React, { useState, useCallback } from 'react';
import { generatePassword } from '../../utils';
import PasswordStrengthMeter from './PasswordStrengthMeter';

export interface PasswordGeneratorProps {
  [key: string]: any;
  /**
   * Default password length
   */
  defaultLength?: number;

  /**
   * Min password length
   */
  minLength?: number;

  /**
   * Max password length
   */
  maxLength?: number;

  /**
   * Include uppercase letters
   */
  includeUppercase?: boolean;

  /**
   * Include lowercase letters
   */
  includeLowercase?: boolean;

  /**
   * Include numbers
   */
  includeNumbers?: boolean;

  /**
   * Include special characters
   */
  includeSpecialChars?: boolean;

  /**
   * On password generated callback
   */
  onGenerate?: (password: string) => void;

  /**
   * On copy callback
   */
  onCopy?: (password: string) => void;

  /**
   * Custom CSS class
   */
  className?: string;

  /**
   * Show strength meter
   */
  showStrength?: boolean;

  /**
   * Show options
   */
  showOptions?: boolean;
}

/**
 * PasswordGenerator Component
 */
export const PasswordGenerator: React.FC<PasswordGeneratorProps> = ({
  defaultLength = 16,
  minLength = 8,
  maxLength = 32,
  includeUppercase = true,
  includeLowercase = true,
  includeNumbers = true,
  includeSpecialChars = true,
  onGenerate,
  onCopy,
  className = '',
  showStrength = true,
  showOptions = true,
}) => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(defaultLength);
  const [options, setOptions] = useState({
    uppercase: includeUppercase,
    lowercase: includeLowercase,
    numbers: includeNumbers,
    specialChars: includeSpecialChars,
  });
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = useCallback(async () => {
    setIsGenerating(true);
    try {
      const newPassword = generatePassword(length, {
        includeUppercase: options.uppercase,
        includeLowercase: options.lowercase,
        includeNumbers: options.numbers,
        includeSpecialChars: options.specialChars,
      });
      setPassword(newPassword);
      onGenerate?.(newPassword);
    } finally {
      setIsGenerating(false);
    }
  }, [length, options, onGenerate]);

  const handleCopy = useCallback(async () => {
    if (!password) return;

    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      onCopy?.(password);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy password:', err);
    }
  }, [password, onCopy]);

  const handleOptionChange = useCallback((key: keyof typeof options) => {
    setOptions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);

  // Generate initial password on mount
  React.useEffect(() => {
    handleGenerate();
  }, []);

  return (
    <div className={`waysnx-password-generator ${className}`}>
      {/* Password Display */}
      <div className="waysnx-generator-display">
        <div className="waysnx-password-output">
          <code className="waysnx-password-text">{password || 'Click generate'}</code>
        </div>

        <div className="waysnx-generator-actions">
          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating}
            aria-label="Generate new password"
            className="waysnx-generator-btn waysnx-regenerate"
            title="Generate new password"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M1 4v6h6M23 20v-6h-6" />
              <path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 03.51 15" />
            </svg>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            disabled={!password}
            aria-label={copied ? 'Copied!' : 'Copy password'}
            className="waysnx-generator-btn waysnx-copy"
            title={copied ? 'Copied!' : 'Copy to clipboard'}
          >
            {copied ? (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
                <path d="M15 2H9a1 1 0 00-1 1v0a1 1 0 001 1h6a1 1 0 001-1v0a1 1 0 00-1-1z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Strength Meter */}
      {showStrength && password && (
        <PasswordStrengthMeter
          password={password}
          showLabel
          showPercentage
          variant="small"
        />
      )}

      {/* Options */}
      {showOptions && (
        <div className="waysnx-generator-options">
          {/* Length Slider */}
          <div className="waysnx-option-group">
            <label htmlFor="password-length" className="waysnx-option-label">
              Length: <span className="waysnx-length-value">{length}</span>
            </label>
            <input
              id="password-length"
              type="range"
              min={minLength}
              max={maxLength}
              value={length}
              onChange={(e: any) => setLength(parseInt(e.target.value))}
              className="waysnx-length-slider"
            />
            <div className="waysnx-length-bounds">
              <span>{minLength}</span>
              <span>{maxLength}</span>
            </div>
          </div>

          {/* Character Type Checkboxes */}
          <fieldset className="waysnx-character-types">
            <legend className="waysnx-option-label">Character Types</legend>

            <div className="waysnx-checkbox-group">
              <input
                id="uppercase"
                type="checkbox"
                checked={options.uppercase}
                onChange={() => handleOptionChange('uppercase')}
                className="waysnx-checkbox-input"
              />
              <label htmlFor="uppercase" className="waysnx-checkbox-label">
                Uppercase (A-Z)
              </label>
            </div>

            <div className="waysnx-checkbox-group">
              <input
                id="lowercase"
                type="checkbox"
                checked={options.lowercase}
                onChange={() => handleOptionChange('lowercase')}
                className="waysnx-checkbox-input"
              />
              <label htmlFor="lowercase" className="waysnx-checkbox-label">
                Lowercase (a-z)
              </label>
            </div>

            <div className="waysnx-checkbox-group">
              <input
                id="numbers"
                type="checkbox"
                checked={options.numbers}
                onChange={() => handleOptionChange('numbers')}
                className="waysnx-checkbox-input"
              />
              <label htmlFor="numbers" className="waysnx-checkbox-label">
                Numbers (0-9)
              </label>
            </div>

            <div className="waysnx-checkbox-group">
              <input
                id="specialChars"
                type="checkbox"
                checked={options.specialChars}
                onChange={() => handleOptionChange('specialChars')}
                className="waysnx-checkbox-input"
              />
              <label htmlFor="specialChars" className="waysnx-checkbox-label">
                Special (!@#$%)
              </label>
            </div>
          </fieldset>
        </div>
      )}

      <style>{`
        .waysnx-password-generator {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          width: 100%;
          padding: 1.5rem;
          background-color: var(--bg-primary, #ffffff);
          border: 1px solid var(--border-color, #e5e7eb);
          border-radius: 0.5rem;
        }

        .waysnx-generator-display {
          display: flex;
          gap: 0.75rem;
          align-items: stretch;
        }

        .waysnx-password-output {
          flex: 1;
          display: flex;
          align-items: center;
          padding: 0.75rem;
          background-color: var(--bg-secondary, #f3f4f6);
          border: 1px solid var(--border-color, #d1d5db);
          border-radius: 0.375rem;
          overflow-x: auto;
          font-family: 'Monaco', 'Courier New', monospace;
          font-size: 0.875rem;
        }

        .waysnx-password-text {
          word-break: break-all;
          color: var(--text-primary, #1f2937);
          margin: 0;
        }

        .waysnx-generator-actions {
          display: flex;
          gap: 0.5rem;
        }

        .waysnx-generator-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.75rem;
          height: 2.75rem;
          padding: 0;
          background-color: var(--primary-color, #3b82f6);
          color: #ffffff;
          border: none;
          border-radius: 0.375rem;
          cursor: pointer;
          transition: background-color 0.2s, box-shadow 0.2s;
        }

        .waysnx-generator-btn:hover:not(:disabled) {
          background-color: var(--primary-color-dark, #1d4ed8);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .waysnx-generator-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .waysnx-generator-btn svg {
          width: 1.25rem;
          height: 1.25rem;
          stroke-width: 2;
        }

        .waysnx-generator-options {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 1rem;
          background-color: var(--bg-secondary, #f9fafb);
          border: 1px solid var(--border-color, #e5e7eb);
          border-radius: 0.375rem;
        }

        .waysnx-option-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .waysnx-option-label {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary, #1f2937);
        }

        .waysnx-length-value {
          color: var(--primary-color, #3b82f6);
          font-weight: 700;
          margin-left: 0.5rem;
        }

        .waysnx-length-slider {
          width: 100%;
          height: 0.5rem;
          cursor: pointer;
          accent-color: var(--primary-color, #3b82f6);
        }

        .waysnx-length-bounds {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          color: var(--text-secondary, #6b7280);
        }

        .waysnx-character-types {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          border: none;
          padding: 0;
          margin: 0;
        }

        .waysnx-character-types legend {
          padding: 0;
          margin-bottom: 0.25rem;
        }

        .waysnx-checkbox-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
        }

        .waysnx-checkbox-input {
          width: 1rem;
          height: 1rem;
          cursor: pointer;
          accent-color: var(--primary-color, #3b82f6);
        }

        .waysnx-checkbox-label {
          cursor: pointer;
          user-select: none;
          color: var(--text-primary, #1f2937);
        }

        /* Dark mode */
        @media (prefers-color-scheme: dark) {
          .waysnx-password-generator {
            background-color: var(--bg-primary-dark, #1f2937);
            border-color: var(--border-color-dark, #374151);
          }

          .waysnx-password-output {
            background-color: var(--bg-secondary-dark, #111827);
            border-color: var(--border-color-dark, #374151);
          }

          .waysnx-password-text {
            color: var(--text-primary-dark, #f3f4f6);
          }

          .waysnx-generator-options {
            background-color: var(--bg-secondary-dark, #374151);
            border-color: var(--border-color-dark, #4b5563);
          }

          .waysnx-option-label {
            color: var(--text-primary-dark, #f3f4f6);
          }

          .waysnx-checkbox-label {
            color: var(--text-primary-dark, #f3f4f6);
          }
        }

        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          .waysnx-generator-btn {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
};

PasswordGenerator.displayName = 'PasswordGenerator';

export default PasswordGenerator;
