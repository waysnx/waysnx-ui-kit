/**
 * Multi-Factor Authentication (MFA) Utilities
 * 
 * Provides utilities for MFA setup, verification, OTP generation,
 * backup codes, and recovery workflows.
 */

import { generateSecureId, secureRandomString } from './crypto';

/**
 * MFA configuration interface
 */
interface MFAConfig {
  id: string;
  primaryMethod: string;
  backupMethods: string[];
  isEnabled: boolean;
  status: MFAStatusEnum;
  createdAt: Date;
  verifiedAt?: Date;
  disabledAt?: Date;
  lastUsedAt?: Date;
}

/**
 * MFA methods enum
 */
export enum MFAMethodEnum {
  TOTP = 'totp', // Time-based OTP (Google Authenticator, Authy)
  SMS = 'sms',
  EMAIL = 'email',
  BACKUP_CODES = 'backup_codes',
  BIOMETRIC = 'biometric',
  SECURITY_KEY = 'security_key', // FIDO2/WebAuthn
}

/**
 * MFA status enum
 */
export enum MFAStatusEnum {
  NOT_CONFIGURED = 'not_configured',
  PENDING_VERIFICATION = 'pending_verification',
  VERIFIED = 'verified',
  DISABLED = 'disabled',
}

/**
 * TOTP verification result
 */
export interface TOTPVerificationResult {
  isValid: boolean;
  remainingAttempts?: number;
  lockoutUntil?: Date;
}

/**
 * Generate TOTP secret
 * 
 * @param length - Secret length (default: 32)
 * @returns Base32-encoded secret
 */
export function generateTOTPSecret(length: number = 32): string {
  // RFC 4648 base32 alphabet. Each character carries 5 bits of entropy, so the
  // default 32-character secret provides 160 bits — the standard for TOTP.
  // Uses cryptographically-secure, unbiased selection (Web Crypto) rather than
  // Math.random().
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  return secureRandomString(length, alphabet);
}

/**
 * Generate TOTP QR code URL
 * 
 * @param accountName - Account identifier (e.g., email)
 * @param issuer - Service issuer name
 * @param secret - TOTP secret
 * @returns QR code URL for Google Charts API
 */
export function generateTOTPQRCodeURL(
  accountName: string,
  issuer: string,
  secret: string
): string {
  const label = encodeURIComponent(`${issuer}:${accountName}`);
  const params = new URLSearchParams({
    secret,
    issuer,
  });

  return `otpauth://totp/${label}?${params.toString()}`;
}

/**
 * Encode secret to base32 format (simplified)
 * Note: For production, use a proper base32 encoding library
 * 
 * @param input - Input string
 * @returns Base32-encoded string
 */
export function encodeBase32(input: string): string {
  // Simplified base32 encoding - in production, use proper library
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  let binary = '';

  for (let i = 0; i < input.length; i++) {
    binary += input.charCodeAt(i).toString(2).padStart(8, '0');
  }

  binary = binary.padEnd(Math.ceil(binary.length / 5) * 5, '0');

  let encoded = '';
  for (let i = 0; i < binary.length; i += 5) {
    encoded += alphabet[parseInt(binary.slice(i, i + 5), 2)];
  }

  return encoded.padEnd(Math.ceil(encoded.length / 8) * 8, '=');
}

// Genuine RFC 6238 TOTP primitives live in ./totp (isolated so they depend only
// on Web Crypto and remain independently testable). Re-exported here to keep the
// public MFA API surface stable.
export { base32Decode, generateTOTPCode, verifyTOTPCode } from './totp';

/**
 * Generate backup codes
 * 
 * @param count - Number of codes to generate (default: 10)
 * @param format - Code format (default: 'XXXX-XXXX' where X is alphanumeric)
 * @returns Array of backup codes
 */
export function generateBackupCodes(
  count: number = 10,
  format: string = 'XXXX-XXXX'
): string[] {
  const codes: string[] = [];
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  for (let i = 0; i < count; i++) {
    let code = '';

    // Backup codes are single-use authentication credentials, so each 'X'
    // placeholder is filled with a cryptographically-secure random character.
    for (let j = 0; j < format.length; j++) {
      code += format[j] === 'X' ? secureRandomString(1, characters) : format[j];
    }

    codes.push(code);
  }

  return codes;
}

/**
 * Hash a backup code
 * Note: In production, use proper bcrypt or Argon2
 * 
 * @param code - Backup code to hash
 * @returns Hashed code
 */
export async function hashBackupCode(code: string): Promise<string> {
  // Simple hash for demonstration
  // In production, use bcrypt: await bcrypt.hash(code, 10)
  const encoder = new TextEncoder();
  const data = encoder.encode(code);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Verify backup code
 * Note: In production, use proper bcrypt or Argon2 comparison
 * 
 * @param code - Backup code to verify
 * @param hashedCode - Hashed backup code
 * @returns true if code matches hash, false otherwise
 */
export async function verifyBackupCode(
  code: string,
  hashedCode: string
): Promise<boolean> {
  // Simple verification for demonstration
  // In production, use bcrypt: await bcrypt.compare(code, hashedCode)
  const codeHash = await hashBackupCode(code);
  return codeHash === hashedCode;
}

/**
 * Create MFA configuration
 * 
 * @param primaryMethod - Primary MFA method
 * @param backupMethods - Backup methods
 * @returns MFA configuration
 */
export function createMFAConfig(
  primaryMethod: string,
  backupMethods: string[] = []
): MFAConfig {
  return {
    id: generateMFAConfigId(),
    primaryMethod,
    backupMethods,
    isEnabled: false,
    status: MFAStatusEnum.NOT_CONFIGURED,
    createdAt: new Date(),
    verifiedAt: undefined,
    disabledAt: undefined,
    lastUsedAt: undefined,
  };
}

/**
 * Generate MFA config ID
 */
function generateMFAConfigId(): string {
  return generateSecureId('mfa');
}

/**
 * Enable MFA
 * 
 * @param mfaConfig - MFA configuration
 * @returns Updated MFA configuration
 */
export function enableMFA(mfaConfig: MFAConfig): MFAConfig {
  return {
    ...mfaConfig,
    isEnabled: true,
    status: MFAStatusEnum.PENDING_VERIFICATION,
  };
}

/**
 * Verify MFA
 * 
 * @param mfaConfig - MFA configuration
 * @returns Updated MFA configuration
 */
export function verifyMFA(mfaConfig: MFAConfig): MFAConfig {
  return {
    ...mfaConfig,
    status: MFAStatusEnum.VERIFIED,
    verifiedAt: new Date(),
  };
}

/**
 * Disable MFA
 * 
 * @param mfaConfig - MFA configuration
 * @returns Updated MFA configuration
 */
export function disableMFA(mfaConfig: MFAConfig): MFAConfig {
  return {
    ...mfaConfig,
    isEnabled: false,
    status: MFAStatusEnum.DISABLED,
    disabledAt: new Date(),
  };
}

/**
 * Update MFA last used time
 * 
 * @param mfaConfig - MFA configuration
 * @returns Updated MFA configuration
 */
export function updateMFALastUsed(mfaConfig: MFAConfig): MFAConfig {
  return {
    ...mfaConfig,
    lastUsedAt: new Date(),
  };
}

/**
 * Check if MFA is ready for use
 * 
 * @param mfaConfig - MFA configuration
 * @returns true if MFA is enabled and verified, false otherwise
 */
export function isMFAReady(mfaConfig: MFAConfig): boolean {
  return (
    mfaConfig.isEnabled &&
    mfaConfig.status === MFAStatusEnum.VERIFIED &&
    mfaConfig.verifiedAt !== undefined
  );
}

/**
 * Get MFA method display name
 * 
 * @param method - MFA method
 * @returns Display name
 */
export function getMFAMethodName(method: string): string {
  const names: Record<string, string> = {
    totp: 'Authenticator App',
    sms: 'SMS Text Message',
    email: 'Email',
    backup_codes: 'Backup Codes',
    biometric: 'Biometric',
    security_key: 'Security Key (FIDO2)',
  };

  return names[method] || method;
}

/**
 * Validate OTP code format
 * 
 * @param code - Code to validate
 * @returns true if code format is valid, false otherwise
 */
export function isValidOTPFormat(code: string): boolean {
  // Standard OTP is 6 digits
  return /^\d{6}$/.test(code);
}

/**
 * Format OTP code for display
 * 
 * @param code - Code to format
 * @returns Formatted code (e.g., "123 456")
 */
export function formatOTPCode(code: string): string {
  if (!isValidOTPFormat(code)) {
    return code;
  }

  return `${code.slice(0, 3)} ${code.slice(3, 6)}`;
}

/**
 * Calculate OTP expiration time
 * 
 * @param currentTime - Current time (default: now)
 * @param timeStep - Time step in seconds (default: 30)
 * @returns Expiration time in seconds
 */
export function getOTPExpirationTime(
  currentTime: Date = new Date(),
  timeStep: number = 30
): number {
  const secondsSinceEpoch = Math.floor(currentTime.getTime() / 1000);
  const currentTimeStep = Math.floor(secondsSinceEpoch / timeStep);
  const nextTimeStepSeconds = (currentTimeStep + 1) * timeStep;
  return nextTimeStepSeconds - secondsSinceEpoch;
}

/**
 * Check if backup code should be regenerated
 * 
 * @param usedCodesCount - Number of used codes
 * @param totalCodesCount - Total number of codes
 * @param regenerateThreshold - Percentage threshold for regeneration (default: 50)
 * @returns true if codes should be regenerated, false otherwise
 */
export function shouldRegenerateBackupCodes(
  usedCodesCount: number,
  totalCodesCount: number,
  regenerateThreshold: number = 50
): boolean {
  const usagePercentage = (usedCodesCount / totalCodesCount) * 100;
  return usagePercentage >= regenerateThreshold;
}

/**
 * Validate MFA recovery flow
 * 
 * @param mfaConfig - MFA configuration
 * @param backupCodesRemaining - Number of backup codes remaining
 * @returns true if recovery is possible, false otherwise
 */
export function canRecoverMFA(
  mfaConfig: MFAConfig,
  backupCodesRemaining: number
): boolean {
  return (
    mfaConfig.isEnabled &&
    mfaConfig.backupMethods.includes('backup_codes') &&
    backupCodesRemaining > 0
  );
}

/**
 * Get recommended MFA methods for user
 * 
 * @param userContext - User context (e.g., capabilities)
 * @returns Recommended MFA methods sorted by security
 */
export function getRecommendedMFAMethods(userContext: {
  supportsWebAuthn?: boolean;
  supportsEmail?: boolean;
  supportsSMS?: boolean;
}): string[] {
  const methods: string[] = [];

  // Security key (FIDO2) - highest security
  if (userContext.supportsWebAuthn !== false) {
    methods.push('security_key');
  }

  // TOTP - high security, no external dependency
  methods.push('totp');

  // Email - medium security
  if (userContext.supportsEmail !== false) {
    methods.push('email');
  }

  // SMS - lower security but widely supported
  if (userContext.supportsSMS !== false) {
    methods.push('sms');
  }

  return methods;
}
