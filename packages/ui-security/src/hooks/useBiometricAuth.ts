/**
 * useBiometricAuth Hook
 *
 * Handle biometric authentication via WebAuthn
 */

import { useState, useCallback } from 'react';

export interface BiometricAuthOptions {
  /**
   * Biometric type
   */
  type?: 'fingerprint' | 'face' | 'auto';
  /**
   * Challenge from server
   */
  challenge?: string;
  /**
   * Timeout in milliseconds
   */
  timeoutMs?: number;
}

export interface BiometricAuthResult {
  success: boolean;
  token?: string;
  error?: Error;
}

/**
 * useBiometricAuth - Hook for biometric authentication
 */
export const useBiometricAuth = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isSupported, _setIsSupported] = useState<boolean>(() => {
    return typeof window !== 'undefined' && window.PublicKeyCredential !== undefined;
  });
  const [error, setError] = useState<Error | null>(null);

  const authenticate = useCallback(
    async (_options: BiometricAuthOptions = {}): Promise<BiometricAuthResult> => {
      setIsAuthenticating(true);
      setError(null);

      try {
        if (!isSupported) {
          throw new Error('Biometric authentication is not supported');
        }

        if (!window.PublicKeyCredential) {
          throw new Error('WebAuthn not available');
        }

        // Check if platform authenticator is available
        const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
        if (!available) {
          throw new Error('Biometric authenticator not available');
        }

        // In production, implement full WebAuthn get() flow
        // For now, simulate successful authentication
        await new Promise(resolve => setTimeout(resolve, 1000));

        const result: BiometricAuthResult = {
          success: true,
          token: 'mock-biometric-token',
        };

        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Biometric authentication failed');
        setError(error);
        return { success: false, error };
      } finally {
        setIsAuthenticating(false);
      }
    },
    [isSupported]
  );

  const isAvailable = useCallback(async (): Promise<boolean> => {
    try {
      if (!window.PublicKeyCredential) {
        return false;
      }

      return await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
    } catch {
      return false;
    }
  }, []);

  return {
    authenticate,
    isAuthenticating,
    isSupported,
    isAvailable,
    error,
  };
};

export default useBiometricAuth;
