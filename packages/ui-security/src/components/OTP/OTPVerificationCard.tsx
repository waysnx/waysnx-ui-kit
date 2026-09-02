/**
 * OTPVerificationCard Component
 * 
 * Complete OTP verification flow container:
 * - OTPInput for entering digits
 * - OTPResendButton for resending
 * - Error/success messages
 * - Status display
 * - Uses @waysnx/ui-layout Card component as base
 */

import React, { useState, useCallback } from 'react';
import { Card } from '@waysnx/ui-layout';
import { Alert } from '@waysnx/ui-feedback';
import { OTPInput } from './OTPInput';
import { OTPResendButton } from './OTPResendButton';

export interface OTPVerificationCardProps {
  /**
   * Title for the card
   */
  title?: string;

  /**
   * Description/instructions
   */
  description?: string;

  /**
   * OTP length (default 6)
   */
  otpLength?: number;

  /**
   * Callback when OTP is complete
   */
  onVerify: (otp: string) => void | Promise<void>;

  /**
   * Callback to resend OTP
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
   * Email or phone for display (e.g., "****1234")
   */
  maskedContact?: string;

  /**
   * Custom CSS class
   */
  className?: string;

  /**
   * Test ID
   */
  testId?: string;

  /**
   * Show password placeholder
   */
  placeholder?: string;
}

/**
 * OTPVerificationCard Component
 */
export const OTPVerificationCard: React.FC<OTPVerificationCardProps> = ({
  title = 'Verify OTP',
  description,
  otpLength = 6,
  onVerify,
  onResend,
  loading = false,
  error,
  success,
  resendCountdown = 60,
  maskedContact,
  className = '',
  testId,
  placeholder = 'â€¢',
}) => {
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(error || null);

  const handleOTPComplete = useCallback(
    async (completedOtp: string) => {
      setOtp(completedOtp);
      setIsVerifying(true);
      setVerificationError(null);

      try {
        await onVerify(completedOtp);
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Verification failed';
        setVerificationError(errorMsg);
        setOtp('');
      } finally {
        setIsVerifying(false);
      }
    },
    [onVerify]
  );

  const handleOTPChange = useCallback((newOtp: string) => {
    setOtp(newOtp);
    if (verificationError) {
      setVerificationError(null);
    }
  }, [verificationError]);

  const handleResend = useCallback(async () => {
    setOtp('');
    setVerificationError(null);
    try {
      await onResend();
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to resend OTP';
      setVerificationError(errorMsg);
    }
  }, [onResend]);

  const displayError = verificationError || error;

  return (
    <Card className={`waysnx-otp-verification-card ${className}`} testId={testId}>
      <div className="waysnx-otp-card-content">
        {title && <h2 className="waysnx-otp-card-title">{title}</h2>}

        {description && (
          <p className="waysnx-otp-card-description">{description}</p>
        )}

        {maskedContact && (
          <p className="waysnx-otp-card-contact">
            Sent to <strong>{maskedContact}</strong>
          </p>
        )}

        {displayError && (
          <Alert type="error" testId="otp-card-error">
            {displayError}
          </Alert>
        )}

        {success && (
          <Alert type="success" testId="otp-card-success">
            {success}
          </Alert>
        )}

        <div className="waysnx-otp-card-fields">
          <OTPInput
            length={otpLength}
            value={otp}
            onChange={handleOTPChange}
            onComplete={handleOTPComplete}
            disabled={loading || isVerifying}
            placeholder={placeholder}
            label="Enter Verification Code"
            error={displayError ? 'Invalid code' : undefined}
            helperText="Check your email or SMS for the code"
            testId="otp-input"
          />
        </div>

        <div className="waysnx-otp-card-resend">
          <OTPResendButton
            onResend={handleResend}
           
            initialCountdown={resendCountdown}
            testId="otp-resend"
          />
        </div>

        <div className="waysnx-otp-card-info" role="status" aria-live="polite">
          <p className="waysnx-otp-card-info-text">
            {isVerifying ? 'Verifying...' : success ? 'Verification successful!' : ''}
          </p>
        </div>
      </div>

      <style>{`
        .waysnx-otp-verification-card {
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
        }

        .waysnx-otp-card-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .waysnx-otp-card-title {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary, #1f2937);
        }

        .waysnx-otp-card-description {
          margin: 0;
          font-size: 0.875rem;
          color: var(--text-secondary, #6b7280);
          line-height: 1.5;
        }

        .waysnx-otp-card-contact {
          margin: 0;
          font-size: 0.875rem;
          color: var(--text-primary, #1f2937);
          background-color: var(--bg-secondary, #f3f4f6);
          padding: 0.75rem;
          border-radius: 0.375rem;
        }

        .waysnx-otp-card-fields {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .waysnx-otp-card-resend {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .waysnx-otp-card-info {
          text-align: center;
          min-height: 1.5rem;
        }

        .waysnx-otp-card-info-text {
          margin: 0;
          font-size: 0.875rem;
          color: var(--success-color, #22c55e);
          font-weight: 500;
        }

        /* Dark mode */
        @media (prefers-color-scheme: dark) {
          .waysnx-otp-card-title {
            color: var(--text-primary-dark, #f3f4f6);
          }

          .waysnx-otp-card-description {
            color: var(--text-secondary-dark, #9ca3af);
          }

          .waysnx-otp-card-contact {
            color: var(--text-primary-dark, #f3f4f6);
            background-color: var(--bg-secondary-dark, #374151);
          }
        }

        /* Responsive */
        @media (max-width: 480px) {
          .waysnx-otp-verification-card {
            max-width: 100%;
          }

          .waysnx-otp-card-content {
            gap: 1rem;
          }

          .waysnx-otp-card-title {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </Card>
  );
};

OTPVerificationCard.displayName = 'OTPVerificationCard';

export default OTPVerificationCard;
