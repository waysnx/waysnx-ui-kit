/**
 * EmailVerificationCard Component
 * 
 * Email verification flow:
 * - Display email to be verified
 * - OTP/Code input field
 * - Resend verification email option
 * - Success/error messaging
 * - Uses @waysnx/ui-layout Card and @waysnx/ui-core Input
 */

import React, { useState, useCallback } from 'react';
import { Card } from '@waysnx/ui-layout';
import { Input, Button } from '@waysnx/ui-core';
import { Alert } from '@waysnx/ui-feedback';
import { OTPResendButton } from '../OTP/OTPResendButton';

export interface EmailVerificationCardProps {
  [key: string]: any;
  /**
   * Email address to verify
   */
  email: string;

  /**
   * Title for the card
   */
  title?: string;

  /**
   * Description/instructions
   */
  description?: string;

  /**
   * Callback when verification code is submitted
   */
  onVerify: (code: string) => void | Promise<void>;

  /**
   * Callback to resend verification email
   */
  onResend: () => void | Promise<void>;

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
   * Countdown time for resend button
   */
  resendCountdown?: number;

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
 * EmailVerificationCard Component
 */
export const EmailVerificationCard: React.FC<EmailVerificationCardProps> = ({
  email,
  title = 'Verify Email Address',
  description,
  onVerify,
  onResend,
  loading = false,
  error,
  success,
  resendCountdown = 60,
  className = '',
  testId,
}) => {
  const [code, setCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(error || null);
  const [touched, setTouched] = useState(false);

  const handleCodeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
    if (verificationError) {
      setVerificationError(null);
    }
  }, [verificationError]);

  const handleCodeBlur = useCallback(() => {
    setTouched(true);
  }, []);

  const handleVerify = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!code.trim()) {
        setVerificationError('Verification code is required');
        setTouched(true);
        return;
      }

      setIsVerifying(true);
      setVerificationError(null);

      try {
        await onVerify(code);
        setCode('');
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Verification failed';
        setVerificationError(errorMsg);
      } finally {
        setIsVerifying(false);
      }
    },
    [code, onVerify]
  );

  const handleResend = useCallback(async () => {
    setCode('');
    setVerificationError(null);
    setTouched(false);
    try {
      await onResend();
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to resend verification email';
      setVerificationError(errorMsg);
    }
  }, [onResend]);

  // Mask email for display
  const maskEmail = (emailAddr: string): string => {
    const [localPart, domain] = emailAddr.split('@');
    if (!localPart || !domain) return emailAddr;
    const masked = localPart.substring(0, 2) + '*'.repeat(Math.max(0, localPart.length - 4)) + localPart.slice(-2);
    return `${masked}@${domain}`;
  };

  const displayError = verificationError || error;

  return (
    <Card className={`waysnx-email-verification-card ${className}`} testId={testId}>
      <div className="waysnx-email-card-content">
        {title && <h2 className="waysnx-email-card-title">{title}</h2>}

        {description && (
          <p className="waysnx-email-card-description">{description}</p>
        )}

        <div className="waysnx-email-address-display">
          <p className="waysnx-email-label">Verification code sent to:</p>
          <p className="waysnx-email-value">{maskEmail(email)}</p>
          <p className="waysnx-email-hint">Check your email for the verification code</p>
        </div>

        {displayError && (
          <Alert type="error" testId="email-card-error">
            {displayError}
          </Alert>
        )}

        {success && (
          <Alert type="success" testId="email-card-success">
            {success}
          </Alert>
        )}

        <form onSubmit={handleVerify} noValidate>
          <div className="waysnx-form-group">
            <Input
              id="email-verification-code"
              type="text"
              label="Verification Code"
              placeholder="Enter the 6-digit code"
              value={code}
              onChange={handleCodeChange}
              onBlur={handleCodeBlur}
              error={touched && displayError ? displayError : undefined}
              required
              disabled={loading || isVerifying}
              testId="email-verification-code"
              ariaLabel="Email verification code"
              ariaDescribedBy={displayError ? 'email-error' : undefined}
            />
          </div>

          <div className="waysnx-form-actions">
            <Button
              type="submit"
              variant="primary"
              disabled={loading || isVerifying || !code.trim()}
              testId="email-verify-submit"
              aria-label="Verify email"
            >
              {isVerifying ? 'Verifying...' : 'Verify Email'}
            </Button>
          </div>
        </form>

        <div className="waysnx-email-resend-section">
          <p className="waysnx-email-resend-label">Didn't receive the code?</p>
          <OTPResendButton
            onResend={handleResend}
           
            initialCountdown={resendCountdown}
            resendText="Resend Code"
            countdownText="Resend in {seconds}s"
            variant="ghost"
            testId="email-resend"
          />
        </div>

        {success && (
          <div className="waysnx-email-success-info" role="status" aria-live="polite">
            <p className="waysnx-email-success-text">Email verified successfully!</p>
          </div>
        )}
      </div>

      <style>{`
        .waysnx-email-verification-card {
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
        }

        .waysnx-email-card-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .waysnx-email-card-title {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary, #1f2937);
        }

        .waysnx-email-card-description {
          margin: 0;
          font-size: 0.875rem;
          color: var(--text-secondary, #6b7280);
          line-height: 1.5;
        }

        .waysnx-email-address-display {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding: 0.75rem;
          background-color: var(--bg-secondary, #f3f4f6);
          border-radius: 0.375rem;
        }

        .waysnx-email-label {
          margin: 0;
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--text-secondary, #6b7280);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .waysnx-email-value {
          margin: 0;
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary, #1f2937);
          word-break: break-all;
        }

        .waysnx-email-hint {
          margin: 0;
          font-size: 0.75rem;
          color: var(--text-secondary, #6b7280);
          font-style: italic;
        }

        .waysnx-form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .waysnx-form-actions {
          display: flex;
          gap: 0.75rem;
        }

        .waysnx-email-resend-section {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          align-items: center;
          text-align: center;
        }

        .waysnx-email-resend-label {
          margin: 0;
          font-size: 0.875rem;
          color: var(--text-secondary, #6b7280);
        }

        .waysnx-email-success-info {
          display: flex;
          justify-content: center;
          padding: 0.75rem;
          background-color: var(--success-bg, #dcfce7);
          border-radius: 0.375rem;
        }

        .waysnx-email-success-text {
          margin: 0;
          font-size: 0.875rem;
          color: var(--success-color, #22c55e);
          font-weight: 600;
        }

        /* Dark mode */
        @media (prefers-color-scheme: dark) {
          .waysnx-email-card-title {
            color: var(--text-primary-dark, #f3f4f6);
          }

          .waysnx-email-card-description {
            color: var(--text-secondary-dark, #9ca3af);
          }

          .waysnx-email-address-display {
            background-color: var(--bg-secondary-dark, #374151);
          }

          .waysnx-email-value {
            color: var(--text-primary-dark, #f3f4f6);
          }

          .waysnx-email-label,
          .waysnx-email-hint,
          .waysnx-email-resend-label {
            color: var(--text-secondary-dark, #9ca3af);
          }

          .waysnx-email-success-info {
            background-color: var(--success-bg-dark, #064e3b);
          }

          .waysnx-email-success-text {
            color: var(--success-color-dark, #86efac);
          }
        }

        /* Responsive */
        @media (max-width: 480px) {
          .waysnx-email-verification-card {
            max-width: 100%;
          }

          .waysnx-email-card-content {
            gap: 1rem;
          }

          .waysnx-email-card-title {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </Card>
  );
};

EmailVerificationCard.displayName = 'EmailVerificationCard';

export default EmailVerificationCard;
