/**
 * Security Hooks
 *
 * Custom React hooks for security-related functionality
 */

export { useAuth } from './useAuth';

export { useIdleDetection } from './useIdleDetection';
export type { UseIdleDetectionOptions } from './useIdleDetection';

export { usePasswordValidation } from './usePasswordValidation';
// Types are used internally by usePasswordValidation hook

export { useSecureStorage } from './useSecureStorage';
export type { UseSecureStorageOptions } from './useSecureStorage';

export { useBiometricAuth } from './useBiometricAuth';
export type { BiometricAuthOptions, BiometricAuthResult } from './useBiometricAuth';

export { useOTP } from './useOTP';
export type { UseOTPOptions } from './useOTP';
