/**
 * PhoneVerificationCard Component
 * 
 * Phone number verification flow:
 * - Phone number input with formatting
 * - OTP/Code verification
 * - Send SMS option
 * - Error/success messaging
 * - Uses @waysnx/ui-layout Card and @waysnx/ui-core Input
 */

import React, { useState, useCallback } from 'react';
import { Card } from '@waysnx/ui-layout';
import { Input, Button } from '@waysnx/ui-core';
import { Alert } from '@waysnx/ui-feedback';
import { OTPInput } from '../OTP/OTPInput';
import { OTPResendButton } from '../OTP/OTPResendButton';

export interface PhoneVerificationCardProps {
  [key: string]: any;
  /**
   * Title for the card
   */
  title?: string;

  /**
   * Description/instructions
   */
  description?: string;

  /**
   * Step in verification flow: 'phone' or 'otp'
   */
  step?: 'phone' | 'otp';

  /**
   * Callback when phone number is submitted
   */
  onSubmitPhone: (phone: string) => void | Promise<void>;

  /**
   * Callback when OTP is verified
   */
  onVerifyOTP: (otp: string) => void | Promise<void>;

  /**
   * Callback to resend verification code
   */
  onResendCode: () => void | Promise<void>;

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
   * Phone number (for step 2)
   */
  phoneNumber?: string;

  /**
   * OTP length
   */
  otpLength?: number;

  /**
   * Countdown time for resend
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
 * PhoneVerificationCard Component
 */
export const PhoneVerificationCard: React.FC<PhoneVerificationCardProps> = ({
  title = 'Verify Phone Number',
  description,
  step = 'phone',
  onSubmitPhone,
  onVerifyOTP,
  onResendCode,
  loading = false,
  error,
  success,
  phoneNumber = '',
  otpLength = 6,
  resendCountdown = 60,
  className = '',
  testId,
}) => {
  const [phone, setPhone] = useState(phoneNumber);
  const [otp, setOtp] = useState('');
  const [currentStep, setCurrentStep] = useState<'phone' | 'otp'>(step);
  const [isProcessing, setIsProcessing] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  // Validate phone number (basic format)
  const validatePhone = useCallback((phoneValue: string): boolean => {
    const cleaned = phoneValue.replace(/\D/g, '');
    if (cleaned.length < 10) {
      setPhoneError('Phone number must be at least 10 digits');
      return false;
    }
    if (cleaned.length > 15) {
      setPhoneError('Phone number must not exceed 15 digits');
      return false;
    }
    setPhoneError(null);
    return true;
  }, []);

  // Format phone number display
  const formatPhone = (phoneValue: string): string => {
    const cleaned = phoneValue.replace(/\D/g, '');
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
  };

  // Mask phone for display
  const maskPhone = (phoneValue: string): string => {
    const cleaned = phoneValue.replace(/\D/g, '');
    const last4 = cleaned.slice(-4);
    const masked = '*'.repeat(cleaned.length - 4) + last4;
    return `+1 ${formatPhone(masked)}`;
  };

  const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setPhone(value);
    if (phoneError) {
      setPhoneError(null);
    }
  }, [phoneError]);

  const handlePhoneBlur = useCallback(() => {
    setTouched(true);
  }, []);

  const handlePhoneSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!phone.trim()) {
        setPhoneError('Phone number is required');
        return;
      }

      if (!validatePhone(phone)) {
        return;
      }

      setIsProcessing(true);
      setPhoneError(null);

      try {
        await onSubmitPhone(phone);
        setCurrentStep('otp');
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Failed to send verification code';
        setPhoneError(errorMsg);
      } finally {
        setIsProcessing(false);
      }
    },
    [phone, validatePhone, onSubmitPhone]
  );

  const handleOTPComplete = useCallback(
    async (completedOtp: string) => {
      setOtp(completedOtp);
      setIsProcessing(true);
      setOtpError(null);

      try {
        await onVerifyOTP(completedOtp);
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Verification failed';
        setOtpError(errorMsg);
        setOtp('');
      } finally {
        setIsProcessing(false);
      }
    },
    [onVerifyOTP]
  );

  const handleOTPChange = useCallback((newOtp: string) => {
    setOtp(newOtp);
    if (otpError) {
      setOtpError(null);
    }
  }, [otpError]);

  const handleResendCode = useCallback(async () => {
    setOtp('');
    setOtpError(null);
    try {
      await onResendCode();
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to resend code';
      setOtpError(errorMsg);
    }
  }, [onResendCode]);

  const handleBackToPhone = useCallback(() => {
    setCurrentStep('phone');
    setOtp('');
    setOtpError(null);
  }, []);

  const displayPhoneError = phoneError || (currentStep === 'phone' ? error : null);
  const displayOtpError = otpError || (currentStep === 'otp' ? error : null);

  return (
    <Card className={`waysnx-phone-verification-card ${className}`} testId={testId}>
      <div className="waysnx-phone-card-content">
        {title && <h2 className="waysnx-phone-card-title">{title}</h2>}

        {description && (
          <p className="waysnx-phone-card-description">{description}</p>
        )}

        {/* Step 1: Phone Number */}
        {currentStep === 'phone' && (
          <>
            {displayPhoneError && (
              <Alert type="error" testId="phone-error">
                {displayPhoneError}
              </Alert>
            )}

            {success && currentStep === 'phone' && (
              <Alert type="success" testId="phone-success">
                {success}
              </Alert>
            )}

            <form onSubmit={handlePhoneSubmit} noValidate>
              <div className="waysnx-form-group">
                <Input
                  id="phone-number"
                  type="tel"
                  label="Phone Number"
                  placeholder="(123) 456-7890"
                  value={formatPhone(phone)}
                  onChange={handlePhoneChange}
                  onBlur={handlePhoneBlur}
                  error={touched && displayPhoneError ? displayPhoneError : undefined}
                  required
                  disabled={loading || isProcessing}
                  testId="phone-input"
                  ariaLabel="Phone number"
                />
              </div>

              <p className="waysnx-phone-info">
                We'll send a verification code via SMS to this number.
              </p>

              <div className="waysnx-form-actions">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={loading || isProcessing || !phone.trim()}
                  testId="phone-submit"
                >
                  {isProcessing ? 'Sending Code...' : 'Send Verification Code'}
                </Button>
              </div>
            </form>
          </>
        )}

        {/* Step 2: OTP Verification */}
        {currentStep === 'otp' && (
          <>
            <div className="waysnx-phone-number-display">
              <p className="waysnx-phone-label">Verification code sent to:</p>
              <p className="waysnx-phone-value">{maskPhone(phone)}</p>
            </div>

            {displayOtpError && (
              <Alert type="error" testId="otp-error">
                {displayOtpError}
              </Alert>
            )}

            {success && currentStep === 'otp' && (
              <Alert type="success" testId="otp-success">
                {success}
              </Alert>
            )}

            <div className="waysnx-otp-section">
              <OTPInput
                length={otpLength}
                value={otp}
                onChange={handleOTPChange}
                onComplete={handleOTPComplete}
                disabled={loading || isProcessing}
                label="Enter Verification Code"
                error={displayOtpError ? 'Invalid code' : undefined}
                helperText="Enter the 6-digit code sent to your phone"
                testId="phone-otp-input"
              />
            </div>

            <div className="waysnx-resend-section">
              <OTPResendButton
                onResend={handleResendCode}
               
                initialCountdown={resendCountdown}
                resendText="Resend Code via SMS"
                testId="phone-resend"
              />
            </div>

            <div className="waysnx-form-actions">
              <Button
                type="button"
                variant="ghost"
                onClick={handleBackToPhone}
                disabled={loading || isProcessing}
                testId="back-to-phone"
              >
                Edit Number
              </Button>
            </div>
          </>
        )}
      </div>

      <style>{`
        .waysnx-phone-verification-card {
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
        }

        .waysnx-phone-card-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .waysnx-phone-card-title {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary, #1f2937);
        }

        .waysnx-phone-card-description {
          margin: 0;
          font-size: 0.875rem;
          color: var(--text-secondary, #6b7280);
          line-height: 1.5;
        }

        .waysnx-phone-info {
          margin: 0;
          font-size: 0.875rem;
          color: var(--text-secondary, #6b7280);
          padding: 0.75rem;
          background-color: var(--bg-secondary, #f3f4f6);
          border-radius: 0.375rem;
        }

        .waysnx-phone-number-display {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding: 0.75rem;
          background-color: var(--bg-secondary, #f3f4f6);
          border-radius: 0.375rem;
        }

        .waysnx-phone-label {
          margin: 0;
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--text-secondary, #6b7280);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .waysnx-phone-value {
          margin: 0;
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary, #1f2937);
        }

        .waysnx-form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .waysnx-otp-section {
          display: flex;
          justify-content: center;
        }

        .waysnx-resend-section {
          display: flex;
          justify-content: center;
        }

        .waysnx-form-actions {
          display: flex;
          gap: 0.75rem;
          justify-content: center;
        }

        /* Dark mode */
        @media (prefers-color-scheme: dark) {
          .waysnx-phone-card-title {
            color: var(--text-primary-dark, #f3f4f6);
          }

          .waysnx-phone-card-description {
            color: var(--text-secondary-dark, #9ca3af);
          }

          .waysnx-phone-info {
            background-color: var(--bg-secondary-dark, #374151);
            color: var(--text-secondary-dark, #9ca3af);
          }

          .waysnx-phone-number-display {
            background-color: var(--bg-secondary-dark, #374151);
          }

          .waysnx-phone-value {
            color: var(--text-primary-dark, #f3f4f6);
          }

          .waysnx-phone-label {
            color: var(--text-secondary-dark, #9ca3af);
          }
        }

        /* Responsive */
        @media (max-width: 480px) {
          .waysnx-phone-verification-card {
            max-width: 100%;
          }

          .waysnx-phone-card-content {
            gap: 1rem;
          }

          .waysnx-phone-card-title {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </Card>
  );
};

PhoneVerificationCard.displayName = 'PhoneVerificationCard';

export default PhoneVerificationCard;
