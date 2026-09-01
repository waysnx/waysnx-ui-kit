/**
 * ChangePasswordForm Component
 * 
 * Form for users to change their existing password
 * - Requires current password verification
 * - Validates new password against policy
 * - Shows password strength feedback
 * - Full accessibility support
 * - Uses @waysnx/ui-core Input and Button components
 */

import React, { useState, useCallback } from 'react';
import { Input, Button } from '@waysnx/ui-core';
import { Alert } from '@waysnx/ui-feedback';
import { validatePasswordAgainstPolicy, calculatePasswordStrength } from '../../utils';
import type { PasswordPolicy, ChangePassword } from '../../types';

export interface ChangePasswordFormProps {
  /**
   * Password policy for validation
   */
  policy: PasswordPolicy;

  /**
   * Callback when form is submitted
   */
  onSubmit: (data: ChangePassword) => void | Promise<void>;

  /**
   * Loading state (shows spinner on button)
   */
  loading?: boolean;

  /**
   * Error message to display
   */
  error?: string;

  /**
   * Success message (typically cleared after timeout)
   */
  success?: string;

  /**
   * Custom CSS class
   */
  className?: string;

  /**
   * Show password strength feedback
   */
  showStrength?: boolean;
}

interface FormData {
  [key: string]: any;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface FormErrors {
  [key: string]: any;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

/**
 * ChangePasswordForm Component
 */
export const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({
  policy,
  onSubmit,
  loading = false,
  error,
  success,
  className = '',
  showStrength = true,
}) => {
  const [formData, setFormData] = useState<FormData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  // Calculate password strength for new password
  const newPasswordStrength = calculatePasswordStrength(formData.newPassword);
  const newPasswordValidation = validatePasswordAgainstPolicy(formData.newPassword, policy);

  // Validate form
  const validateForm = useCallback((): boolean => {
    const errors: FormErrors = {};

    // Current password is required
    if (!formData.currentPassword.trim()) {
      errors.currentPassword = 'Current password is required';
    }

    // New password is required
    if (!formData.newPassword.trim()) {
      errors.newPassword = 'New password is required';
    } else if (!newPasswordValidation.isValid) {
      // Validate against policy
      errors.newPassword = newPasswordValidation.errors[0] || 'Password does not meet requirements';
    }

    // New passwords must match
    if (formData.newPassword !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    // Current password cannot be same as new password
    if (formData.currentPassword === formData.newPassword) {
      errors.newPassword = 'New password must be different from current password';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData, newPasswordValidation, policy]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));

      // Clear error for this field when user starts typing
      if (formErrors[name as keyof FormErrors]) {
        setFormErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    [formErrors]
  );

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!validateForm()) {
        return;
      }

      try {
        await onSubmit({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmPassword,
        });

        // Clear form on success
        setFormData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
        setTouched({
          currentPassword: false,
          newPassword: false,
          confirmPassword: false,
        });
      } catch (err) {
        // Error is handled by parent component via error prop
        console.error('Form submission error:', err);
      }
    },
    [validateForm, onSubmit, formData]
  );

  const strengthColor =
    newPasswordStrength.level === 'veryStrong'
      ? '#22c55e'
      : newPasswordStrength.level === 'strong'
        ? '#84cc16'
        : newPasswordStrength.level === 'good'
          ? '#eab308'
          : newPasswordStrength.level === 'fair'
            ? '#f97316'
            : '#ef4444';

  const strengthLabel =
    newPasswordStrength.level === 'veryStrong'
      ? 'Very Strong'
      : newPasswordStrength.level === 'strong'
        ? 'Strong'
        : newPasswordStrength.level === 'good'
          ? 'Good'
          : newPasswordStrength.level === 'fair'
            ? 'Fair'
            : newPasswordStrength.level === 'weak'
              ? 'Weak'
              : 'Very Weak';

  return (
    <div className={`waysnx-change-password-form ${className}`}>
      {error && (
        <Alert type="error" testId="change-password-error">
          {error}
        </Alert>
      )}

      {success && (
        <Alert type="success" testId="change-password-success">
          {success}
        </Alert>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="waysnx-form-group">
          <Input
            id="current-password"
            type="password"
            name="currentPassword"
            label="Current Password"
            placeholder="Enter your current password"
            value={formData.currentPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.currentPassword ? formErrors.currentPassword : undefined}
            required
            disabled={loading}
            testId="current-password-input"
            ariaLabel="Current password"
            ariaDescribedBy={
              touched.currentPassword && formErrors.currentPassword
                ? 'current-password-error'
                : undefined
            }
          />
        </div>

        <div className="waysnx-form-group">
          <Input
            id="new-password"
            type="password"
            name="newPassword"
            label="New Password"
            placeholder="Enter a new password"
            value={formData.newPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.newPassword ? formErrors.newPassword : undefined}
            required
            disabled={loading}
            testId="new-password-input"
            ariaLabel="New password"
            ariaDescribedBy={
              touched.newPassword && formErrors.newPassword ? 'new-password-error' : 'password-strength'
            }
          />

          {showStrength && formData.newPassword && (
            <div id="password-strength" className="waysnx-password-strength-info" role="status">
              <div className="waysnx-strength-bar-container">
                <div
                  className="waysnx-strength-bar"
                  style={{
                    width: `${newPasswordStrength.score}%`,
                    backgroundColor: strengthColor,
                    height: '4px',
                    transition: 'all 0.3s ease',
                  }}
                />
              </div>
              <span className="waysnx-strength-label" style={{ color: strengthColor }}>
                Strength: {strengthLabel}
              </span>
            </div>
          )}
        </div>

        <div className="waysnx-form-group">
          <Input
            id="confirm-password"
            type="password"
            name="confirmPassword"
            label="Confirm New Password"
            placeholder="Confirm your new password"
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.confirmPassword ? formErrors.confirmPassword : undefined}
            required
            disabled={loading}
            testId="confirm-password-input"
            ariaLabel="Confirm new password"
            ariaDescribedBy={
              touched.confirmPassword && formErrors.confirmPassword
                ? 'confirm-password-error'
                : undefined
            }
          />
        </div>

        <div className="waysnx-form-actions">
          <Button
            type="submit"
            variant="primary"
            disabled={loading}
            testId="change-password-submit"
            aria-label="Change password"
          >
            {loading ? 'Changing Password...' : 'Change Password'}
          </Button>
        </div>
      </form>

      <style>{`
        .waysnx-change-password-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          width: 100%;
          max-width: 400px;
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

ChangePasswordForm.displayName = 'ChangePasswordForm';

export default ChangePasswordForm;
