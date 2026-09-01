/**
 * useOTP Hook
 *
 * Manage OTP (One-Time Password) generation and validation
 */

import { useState, useCallback, useEffect } from 'react';

export interface UseOTPOptions {
  /**
   * OTP length
   */
  length?: number;
  /**
   * OTP validity duration in seconds
   */
  expirySeconds?: number;
  /**
   * Callback on expiry
   */
  onExpiry?: () => void;
  /**
   * Initial OTP value
   */
  initialOtp?: string;
}

/**
 * useOTP - Hook for OTP management
 */
export const useOTP = ({
  length = 6,
  expirySeconds = 300, // 5 minutes
  onExpiry,
  initialOtp,
}: UseOTPOptions = {}) => {
  const [otp, setOtp] = useState<string>(initialOtp || '');
  const [timeRemaining, setTimeRemaining] = useState(expirySeconds);
  const [isExpired, setIsExpired] = useState(false);

  // Generate OTP
  const generateOTP = useCallback((): string => {
    const digits = '0123456789';
    let generatedOTP = '';

    for (let i = 0; i < length; i++) {
      generatedOTP += digits.charAt(Math.floor(Math.random() * 10));
    }

    setOtp(generatedOTP);
    setTimeRemaining(expirySeconds);
    setIsExpired(false);

    return generatedOTP;
  }, [length, expirySeconds]);

  // Validate OTP
  const validateOTP = useCallback(
    (inputOTP: string): boolean => {
      if (isExpired) {
        return false;
      }

      return inputOTP === otp && inputOTP.length === length;
    },
    [otp, isExpired, length]
  );

  // Handle expiry countdown
  useEffect(() => {
    if (isExpired || !otp) return;

    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        const newTime = prev - 1;

        if (newTime <= 0) {
          setIsExpired(true);
          onExpiry?.();
          clearInterval(interval);
          return 0;
        }

        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isExpired, otp, onExpiry]);

  const clear = useCallback(() => {
    setOtp('');
    setTimeRemaining(expirySeconds);
    setIsExpired(false);
  }, [expirySeconds]);

  return {
    otp,
    generateOTP,
    validateOTP,
    isExpired,
    timeRemaining,
    clear,
  };
};

export default useOTP;
