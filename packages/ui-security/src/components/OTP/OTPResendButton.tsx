/**
 * OTPResendButton Component
 * 
 * Button for resending OTP with countdown timer:
 * - Displays countdown (e.g., "Resend in 60s")
 * - Prevents clicking during countdown
 * - Resets countdown after successful resend
 * - Uses @waysnx/ui-core Button component
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@waysnx/ui-core';

export interface OTPResendButtonProps {
  /**
   * Initial countdown time in seconds
   */
  initialCountdown?: number;

  /**
   * Callback when button is clicked to resend OTP
   */
  onResend: () => void | Promise<void>;

  /**
   * Loading state while resending
   */
  loading?: boolean;

  /**
   * Disabled state
   */
  disabled?: boolean;

  /**
   * Text to show during countdown (use {seconds} for replacement)
   */
  countdownText?: string;

  /**
   * Text to show for resend button
   */
  resendText?: string;

  /**
   * Custom CSS class
   */
  className?: string;

  /**
   * Test ID
   */
  testId?: string;

  /**
   * Callback when countdown completes
   */
  onCountdownComplete?: () => void;

  /**
   * Button variant
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
}

/**
 * OTPResendButton Component
 */
export const OTPResendButton: React.FC<OTPResendButtonProps> = ({
  initialCountdown = 60,
  onResend,
  loading = false,
  disabled = false,
  countdownText = 'Resend in {seconds}s',
  resendText = 'Resend OTP',
  className = '',
  testId,
  onCountdownComplete,
  variant = 'secondary',
}) => {
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isActive, setIsActive] = useState(false);

  // Start countdown effect
  useEffect(() => {
    if (!isActive || countdown === null) {
      return;
    }

    if (countdown <= 0) {
      setIsActive(false);
      setCountdown(null);
      onCountdownComplete?.();
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === null) return null;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, countdown, onCountdownComplete]);

  const handleResend = useCallback(async () => {
    try {
      await onResend();
      // Start countdown after successful resend
      setCountdown(initialCountdown);
      setIsActive(true);
    } catch (err) {
      console.error('Resend OTP error:', err);
      // Don't start countdown on error
    }
  }, [onResend, initialCountdown]);

  const isDisabledState = disabled || isActive || loading;
  const displayText = isActive && countdown !== null 
    ? countdownText.replace('{seconds}', countdown.toString())
    : resendText;

  return (
    <div className={`waysnx-otp-resend-button-wrapper ${className}`} data-testid={testId}>
      <Button
        onClick={handleResend}
        disabled={isDisabledState}
        variant={variant}
        className="waysnx-otp-resend-button"
        aria-label={displayText}
        aria-disabled={isDisabledState}
        testId={`${testId}-button`}
      >
        {displayText}
      </Button>

      {isActive && countdown !== null && (
        <span
          className="waysnx-countdown-text"
          role="status"
          aria-live="polite"
          aria-label={`Resend available in ${countdown} seconds`}
        >
          {countdown}s remaining
        </span>
      )}

      <style>{`
        .waysnx-otp-resend-button-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          width: 100%;
        }

        .waysnx-otp-resend-button {
          width: 100%;
          min-width: 150px;
        }

        .waysnx-countdown-text {
          font-size: 0.75rem;
          color: var(--text-secondary, #6b7280);
          animation: pulse 1s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        /* Dark mode */
        @media (prefers-color-scheme: dark) {
          .waysnx-countdown-text {
            color: var(--text-secondary-dark, #9ca3af);
          }
        }

        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          .waysnx-countdown-text {
            animation: none;
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

OTPResendButton.displayName = 'OTPResendButton';

export default OTPResendButton;
