/**
 * useOTP Hook
 *
 * Manage OTP (One-Time Password) generation and validation
 */

import { useState, useCallback, useEffect } from 'react';
import { generateOTP as generateSecureOTP } from '../utils/input';

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
    // Delegate to the cryptographically-secure OTP generator in utils/input.
    const generatedOTP = generateSecureOTP(length);

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
