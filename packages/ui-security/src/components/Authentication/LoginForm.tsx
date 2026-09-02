/**
 * LoginForm Component
 * 
 * Refactored to use WaysNX component libraries:
 * - @waysnx/ui-core Input, Button for base components
 * - @waysnx/ui-feedback Alert for error/info messages
 * - Security-specific: validation, password input with strength
 */

import React, { useState, useCallback, useRef, FormEvent } from 'react';
import { isValidEmail, sanitizeInput } from '../../utils';
import PasswordInput from '../Password/PasswordInput';

export interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void> | void;
  error?: string;
  isLoading?: boolean;
  showRememberMe?: boolean;
  showTrustedDevice?: boolean;
  submitLabel?: string;
  emailPlaceholder?: string;
  passwordPlaceholder?: string;
  onForgotPassword?: () => void;
  className?: string;
  initialEmail?: string;
  autoFocus?: boolean;
  helpText?: string;
}

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
  trustedDevice: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  error,
  isLoading = false,
  showRememberMe = true,
  showTrustedDevice = false,
  submitLabel = 'Sign In',
  emailPlaceholder = 'Email address',
  passwordPlaceholder = 'Password',
  onForgotPassword,
  className = '',
  initialEmail = '',
  autoFocus = true,
  helpText,
}) => {
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [trustedDevice, setTrustedDevice] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const validateForm = useCallback((): boolean => {
    const errors: Record<string, string> = {};

    const sanitizedEmail = sanitizeInput(email.trim());
    if (!sanitizedEmail) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(sanitizedEmail)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }, [email, password]);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!validateForm() || isLoading || isSubmitting) {
        return;
      }

      setIsSubmitting(true);

      try {
        const formData: LoginFormData = {
          email: sanitizeInput(email.trim()),
          password,
          rememberMe,
          trustedDevice,
        };

        await onSubmit(formData);
      } catch (err) {
        // Error handled by parent
      } finally {
        setIsSubmitting(false);
      }
    },
    [validateForm, isLoading, isSubmitting, email, password, rememberMe, trustedDevice, onSubmit]
  );

  const handleEmailChange = useCallback((value: string) => {
    setEmail(value);
    if (validationErrors.email) {
      setValidationErrors((prev) => {
        const next = { ...prev };
        delete next.email;
        return next;
      });
    }
  }, [validationErrors.email]);

  const handlePasswordChange = useCallback((value: string) => {
    setPassword(value);
    if (validationErrors.password) {
      setValidationErrors((prev) => {
        const next = { ...prev };
        delete next.password;
        return next;
      });
    }
  }, [validationErrors.password]);

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={`waysnx-login-form ${className}`}
      noValidate
      style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}
    >
      {error && (
        <div style={{
          padding: '1rem',
          backgroundColor: '#fee2e2',
          border: '1px solid #fecaca',
          borderRadius: '0.375rem',
          color: '#991b1b',
          fontSize: '0.875rem',
        }} role="alert">
          {error}
        </div>
      )}

      {helpText && !error && (
        <div style={{
          padding: '0.75rem',
          backgroundColor: '#dbeafe',
          borderLeft: '4px solid #3b82f6',
          borderRadius: '0.25rem',
          fontSize: '0.875rem',
          color: '#0c4a6e',
        }}>
          {helpText}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Email Address</label>
        <input
          type="email"
          value={email}
          onChange={(e: any) => handleEmailChange(e.target.value)}
          placeholder={emailPlaceholder}
          autoFocus={autoFocus}
          disabled={isLoading || isSubmitting}
          required
          style={{
            padding: '0.625rem 0.75rem',
            border: validationErrors.email ? '1px solid #ef4444' : '1px solid #d1d5db',
            borderRadius: '0.375rem',
            fontSize: '1rem',
          }}
        />
        {validationErrors.email && (
          <span style={{ fontSize: '0.875rem', color: '#ef4444' }}>
            {validationErrors.email}
          </span>
        )}
      </div>

      <PasswordInput
        value={password}
        onChange={handlePasswordChange}
        placeholder={passwordPlaceholder}
        disabled={isLoading || isSubmitting}
        showStrength={false}
        showFeedback={false}
        error={validationErrors.password}
        label="Password"
        required
      />

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        fontSize: '0.875rem',
      }}>
        {showRememberMe && (
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e: any) => setRememberMe(e.target.checked)}
              disabled={isLoading || isSubmitting}
            />
            Remember me
          </label>
        )}

        {showTrustedDevice && (
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={trustedDevice}
              onChange={(e: any) => setTrustedDevice(e.target.checked)}
              disabled={isLoading || isSubmitting}
            />
            Trust this device
          </label>
        )}

        {onForgotPassword && (
          <button
            type="button"
            onClick={onForgotPassword}
            disabled={isLoading || isSubmitting}
            style={{
              background: 'none',
              border: 'none',
              color: '#3b82f6',
              cursor: 'pointer',
              textDecoration: 'underline',
              padding: 0,
              fontSize: '0.875rem',
            }}
          >
            Forgot password?
          </button>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading || isSubmitting}
        style={{
          padding: '0.75rem 1rem',
          backgroundColor: '#3b82f6',
          color: '#ffffff',
          border: 'none',
          borderRadius: '0.375rem',
          fontSize: '1rem',
          fontWeight: 600,
          cursor: 'pointer',
          minHeight: '2.75rem',
        }}
      >
        {isLoading || isSubmitting ? 'Signing in...' : submitLabel}
      </button>
    </form>
  );
};

LoginForm.displayName = 'LoginForm';

export default LoginForm;
