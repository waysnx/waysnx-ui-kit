/**
 * ForgotPasswordForm Component
 * 
 * Form for password reset flow:
 * 1. Enter email to receive reset link
 * 2. Enter reset token (from email)
 * 3. Create new password
 * - Email validation
 * - Token verification
 * - Password policy compliance
 * - Uses @waysnx/ui-core Input and Button components
 */

import React, { useState, useCallback } from 'react';
import { Input, Button } from '@waysnx/ui-core';
import { Alert } from '@waysnx/ui-feedback';
import { validatePasswordAgainstPolicy, calculatePasswordStrength } from '../../utils';
import type { PasswordPolicy } from '../../types';

export interface PasswordResetFormData {
  /**
   * Reset token from email
   */
  token: string;

  /**
   * User email address
   */
  email: string;

  /**
   * New password
   */
  newPassword: string;

  /**
   * Password confirmation
   */
  confirmPassword: string;
}

export interface ForgotPasswordFormProps {
  [key: string]: any;
  /**
   * Password policy for validation
   */
  policy: PasswordPolicy;

  /**
   * Callback when email is submitted
   */
  onSubmitEmail?: (email: string) => void | Promise<void>;

  /**
   * Callback when reset form is submitted
   */
  onSubmitReset?: (data: PasswordResetFormData) => void | Promise<void>;

  /**
   * Loading state
   */
  loading?: boolean;

  /**
   * Error message
   */
  error?: string;

  /**
   * Success message
   */
  success?: string;

  /**
   * Callback to return to login
   */
  onBackToLogin?: () => void;

  /**
   * Custom CSS class
   */
  className?: string;

  /**
   * Show password strength feedback
   */
  showStrength?: boolean;
}

type FormStep = 'email' | 'token' | 'password';

/**
 * ForgotPasswordForm Component
 */
export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  policy,
  onSubmitEmail,
  onSubmitReset,
  loading = false,
  error,
  success,
  onBackToLogin,
  className = '',
  showStrength = true,
}) => {
  const [step, setStep] = useState<FormStep>('email');
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const newPasswordStrength = calculatePasswordStrength(newPassword);
  const newPasswordValidation = validatePasswordAgainstPolicy(newPassword, policy);

  // Email validation
  const validateEmail = useCallback((emailValue: string): boolean => {
    if (!emailValue.trim()) {
      setFieldErrors((prev) => ({ ...prev, email: 'Email is required' }));
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      setFieldErrors((prev) => ({ ...prev, email: 'Please enter a valid email address' }));
      return false;
    }

    setFieldErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.email;
      return newErrors;
    });
    return true;
  }, []);

  // Token validation
  const validateToken = useCallback((tokenValue: string): boolean => {
    if (!tokenValue.trim()) {
      setFieldErrors((prev) => ({ ...prev, token: 'Reset token is required' }));
      return false;
    }

    setFieldErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.token;
      return newErrors;
    });
    return true;
  }, []);

  // Password validation
  const validatePasswords = useCallback((): boolean => {
    const errors: Record<string, string> = {};

    if (!newPassword.trim()) {
      errors.newPassword = 'New password is required';
    } else if (!newPasswordValidation.isValid) {
      errors.newPassword = newPasswordValidation.errors[0] || 'Password does not meet requirements';
    }

    if (newPassword !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return false;
    }

    setFieldErrors({});
    return true;
  }, [newPassword, confirmPassword, newPasswordValidation]);

  const handleEmailSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!validateEmail(email)) {
        return;
      }

      try {
        await onSubmitEmail?.(email);
        setStep('token');
      } catch (err) {
        console.error('Email submission error:', err);
      }
    },
    [email, validateEmail, onSubmitEmail]
  );

  const handleTokenSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!validateToken(token)) {
        return;
      }

      setStep('password');
    },
    [token, validateToken]
  );

  const handlePasswordSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!validatePasswords()) {
        return;
      }

      try {
        await onSubmitReset?.({
          token,
          email,
          newPassword,
          confirmPassword,
        } as PasswordResetFormData);

        // Reset form on success
        setEmail('');
        setToken('');
        setNewPassword('');
        setConfirmPassword('');
        setStep('email');
        setTouched({});
      } catch (err) {
        console.error('Password reset error:', err);
      }
    },
    [token, email, newPassword, confirmPassword, validatePasswords, onSubmitReset]
  );

  const handleBack = useCallback(() => {
    if (step === 'email') {
      onBackToLogin?.();
    } else if (step === 'token') {
      setStep('email');
      setToken('');
    } else {
      setStep('token');
      setNewPassword('');
      setConfirmPassword('');
    }
  }, [step, onBackToLogin]);

  const handleChange = useCallback((fieldName: string, value: string) => {
    if (fieldName === 'email') setEmail(value);
    if (fieldName === 'token') setToken(value);
    if (fieldName === 'newPassword') setNewPassword(value);
    if (fieldName === 'confirmPassword') setConfirmPassword(value);

    // Clear error when user starts typing
    if (fieldErrors[fieldName]) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  }, [fieldErrors]);

  const handleBlur = useCallback((fieldName: string) => {
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
  }, []);

  const getStrengthColor = () => {
    if (!newPassword) return '#d1d5db';
    switch (newPasswordStrength.level) {
      case 'veryStrong':
        return '#22c55e';
      case 'strong':
        return '#84cc16';
      case 'good':
        return '#eab308';
      case 'fair':
        return '#f97316';
      default:
        return '#ef4444';
    }
  };

  const getStrengthLabel = () => {
    switch (newPasswordStrength.level) {
      case 'veryStrong':
        return 'Very Strong';
      case 'strong':
        return 'Strong';
      case 'good':
        return 'Good';
      case 'fair':
        return 'Fair';
      case 'weak':
        return 'Weak';
      default:
        return 'Very Weak';
    }
  };

  return (
    <div className={`waysnx-forgot-password-form ${className}`}>
      {error && (
        <Alert type="error" testId="forgot-password-error">
          {error}
        </Alert>
      )}

      {success && (
        <Alert type="success" testId="forgot-password-success">
          {success}
        </Alert>
      )}

      {/* Step 1: Email */}
      {step === 'email' && (
        <form onSubmit={handleEmailSubmit} noValidate>
          <h3 className="waysnx-form-title">Forgot Password?</h3>
          <p className="waysnx-form-description">
            Enter your email address and we'll send you a link to reset your password.
          </p>

          <div className="waysnx-form-group">
            <Input
              id="forgot-email"
              type="email"
              label="Email Address"
              placeholder="Enter your email"
              value={email}
              onChange={(e: any) => handleChange('email', e.target.value)}
              onBlur={() => handleBlur('email')}
              error={touched.email ? fieldErrors.email : undefined}
              required
              disabled={loading}
              testId="forgot-email-input"
              ariaLabel="Email address"
            />
          </div>

          <div className="waysnx-form-actions">
            <Button
              type="submit"
              variant="primary"
              disabled={loading}
              testId="forgot-email-submit"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </Button>
            {onBackToLogin && (
              <Button
                type="button"
                variant="ghost"
                onClick={handleBack}
                disabled={loading}
                testId="back-to-login"
              >
                Back to Login
              </Button>
            )}
          </div>
        </form>
      )}

      {/* Step 2: Token */}
      {step === 'token' && (
        <form onSubmit={handleTokenSubmit} noValidate>
          <h3 className="waysnx-form-title">Verify Reset Token</h3>
          <p className="waysnx-form-description">
            Enter the token from the reset email we sent to <strong>{email}</strong>
          </p>

          <div className="waysnx-form-group">
            <Input
              id="reset-token"
              type="text"
              label="Reset Token"
              placeholder="Enter the token from your email"
              value={token}
              onChange={(e: any) => handleChange('token', e.target.value)}
              onBlur={() => handleBlur('token')}
              error={touched.token ? fieldErrors.token : undefined}
              required
              disabled={loading}
              testId="reset-token-input"
              ariaLabel="Reset token"
            />
          </div>

          <div className="waysnx-form-actions">
            <Button
              type="submit"
              variant="primary"
              disabled={loading}
              testId="token-verify-submit"
            >
              {loading ? 'Verifying...' : 'Verify Token'}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={handleBack}
              disabled={loading}
              testId="back-to-email"
            >
              Back
            </Button>
          </div>
        </form>
      )}

      {/* Step 3: New Password */}
      {step === 'password' && (
        <form onSubmit={handlePasswordSubmit} noValidate>
          <h3 className="waysnx-form-title">Create New Password</h3>
          <p className="waysnx-form-description">
            Enter your new password to reset your account.
          </p>

          <div className="waysnx-form-group">
            <Input
              id="reset-new-password"
              type="password"
              label="New Password"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e: any) => handleChange('newPassword', e.target.value)}
              onBlur={() => handleBlur('newPassword')}
              error={touched.newPassword ? fieldErrors.newPassword : undefined}
              required
              disabled={loading}
              testId="reset-new-password-input"
              ariaLabel="New password"
            />

            {showStrength && newPassword && (
              <div className="waysnx-password-strength-info" role="status">
                <div className="waysnx-strength-bar-container">
                  <div
                    className="waysnx-strength-bar"
                    style={{
                      width: `${newPasswordStrength.score}%`,
                      backgroundColor: getStrengthColor(),
                      height: '4px',
                      transition: 'all 0.3s ease',
                    }}
                  />
                </div>
                <span className="waysnx-strength-label" style={{ color: getStrengthColor() }}>
                  Strength: {getStrengthLabel()}
                </span>
              </div>
            )}
          </div>

          <div className="waysnx-form-group">
            <Input
              id="reset-confirm-password"
              type="password"
              label="Confirm Password"
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={(e: any) => handleChange('confirmPassword', e.target.value)}
              onBlur={() => handleBlur('confirmPassword')}
              error={touched.confirmPassword ? fieldErrors.confirmPassword : undefined}
              required
              disabled={loading}
              testId="reset-confirm-password-input"
              ariaLabel="Confirm new password"
            />
          </div>

          <div className="waysnx-form-actions">
            <Button
              type="submit"
              variant="primary"
              disabled={loading}
              testId="reset-password-submit"
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={handleBack}
              disabled={loading}
              testId="back-to-token"
            >
              Back
            </Button>
          </div>
        </form>
      )}

      <style>{`
        .waysnx-forgot-password-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          width: 100%;
          max-width: 400px;
        }

        .waysnx-form-title {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary, #1f2937);
        }

        .waysnx-form-description {
          margin: 0;
          font-size: 0.875rem;
          color: var(--text-secondary, #6b7280);
          line-height: 1.5;
        }

        .waysnx-form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .waysnx-password-strength-info {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding: 0.5rem;
          background-color: var(--bg-secondary, #f3f4f6);
          border-radius: 0.375rem;
        }

        .waysnx-strength-bar-container {
          width: 100%;
          height: 4px;
          background-color: var(--bg-tertiary, #e5e7eb);
          border-radius: 2px;
          overflow: hidden;
        }

        .waysnx-strength-bar {
          height: 100%;
          width: 0%;
          transition: width 0.3s ease, background-color 0.3s ease;
        }

        .waysnx-strength-label {
          font-size: 0.75rem;
          font-weight: 500;
        }

        .waysnx-form-actions {
          display: flex;
          gap: 0.75rem;
          padding-top: 0.5rem;
        }

        /* Dark mode */
        @media (prefers-color-scheme: dark) {
          .waysnx-form-title {
            color: var(--text-primary-dark, #f3f4f6);
          }

          .waysnx-form-description {
            color: var(--text-secondary-dark, #9ca3af);
          }

          .waysnx-password-strength-info {
            background-color: var(--bg-secondary-dark, #374151);
          }

          .waysnx-strength-bar-container {
            background-color: var(--bg-tertiary-dark, #4b5563);
          }
        }

        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          .waysnx-strength-bar {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
};

ForgotPasswordForm.displayName = 'ForgotPasswordForm';

export default ForgotPasswordForm;
