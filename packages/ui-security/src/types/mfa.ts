/**
 * @file types/mfa.ts
 * Multi-factor authentication types
 */

/**
 * MFA method type
 */
export type MFAMethodType = 'totp' | 'sms' | 'email' | 'webauthn' | 'backup-codes' | 'biometric';

/**
 * MFA method definition
 */
export interface MFAMethodDefinition {
  id: string;
  type: MFAMethodType;
  name: string;
  description?: string;
  isEnabled: boolean;
  isVerified: boolean;
  createdAt: Date;
  verifiedAt?: Date;
  lastUsedAt?: Date;
  priority?: number;
  metadata?: Record<string, any>;
}

/**
 * MFA configuration
 */
export interface MFAConfiguration {
  [key: string]: any;
  id: string;
  userId: string;
  primaryMethod: MFAMethodType;
  backupMethods: MFAMethodType[];
  isEnabled: boolean;
  status: 'not_configured' | 'pending_verification' | 'verified' | 'disabled' | 'compromised';
  createdAt: Date;
  verifiedAt?: Date;
  disabledAt?: Date;
  lastUsedAt?: Date;
  backupCodes?: BackupCode[];
  metadata?: Record<string, any>;
}

/**
 * Backup code
 */
export interface BackupCode {
  id: string;
  code: string;
  isUsed: boolean;
  usedAt?: Date;
  createdAt: Date;
}

/**
 * TOTP secret
 */
export interface TOTPSecret {
  [key: string]: any;
  secret: string;
  backupCodes: string[];
  qrCode?: string; // Data URI
  manualEntryKey?: string;
  algorithm: 'SHA1' | 'SHA256' | 'SHA512';
  digits: number;
  period: number;
}

/**
 * MFA verification request
 */
export interface MFAVerificationRequest {
  method: MFAMethodType;
  code?: string; // For TOTP, SMS, email
  deviceId?: string; // For WebAuthn
  target?: string; // Phone number or email
  attempt?: number;
}

/**
 * MFA verification result
 */
export interface MFAVerificationResult {
  [key: string]: any;
  success: boolean;
  method: MFAMethodType;
  verified: boolean;
  timestamp: Date;
  nextStep?: MFAMethodType;
  backupCodeUsed?: boolean;
  remainingBackupCodes?: number;
  error?: string;
  details?: Record<string, any>;
}

/**
 * MFA setup step
 */
export interface MFASetupStep {
  step: number;
  title: string;
  description?: string;
  method: MFAMethodType;
  status: 'pending' | 'in_progress' | 'completed' | 'skipped';
  optional?: boolean;
  data?: Record<string, any>;
}

/**
 * MFA setup wizard state
 */
export interface MFASetupWizardState {
  [key: string]: any;
  currentStep: number;
  totalSteps: number;
  steps: MFASetupStep[];
  selectedMethods: MFAMethodType[];
  completedMethods: MFAMethodType[];
  primaryMethod?: MFAMethodType;
  backupCodes?: string[];
  isComplete: boolean;
  canSkip: boolean;
  canGoPrevious: boolean;
  canProceed: boolean;
}

/**
 * MFA status information
 */
export interface MFAStatus {
  isEnabled: boolean;
  primaryMethod?: MFAMethodType;
  methods: MFAMethodDefinition[];
  backupCodesAvailable: number;
  lastVerifiedAt?: Date;
  requiresSetup: boolean;
  requiresVerification: boolean;
  status: 'not_configured' | 'pending_verification' | 'verified' | 'disabled';
}

/**
 * Authenticator QR code
 */
export interface AuthenticatorQRCode {
  [key: string]: any;
  qrCodeUrl: string; // Data URI
  manualEntryKey: string;
  algorithm: string;
  digits: number;
  period: number;
  issuer: string;
  accountName: string;
}

/**
 * Trusted device
 */
export interface TrustedDeviceInfo {
  id: string;
  userId: string;
  deviceId: string;
  name: string;
  fingerprint: string;
  os: string;
  browser: string;
  userAgent: string;
  ipAddress: string;
  status: 'unverified' | 'pending' | 'verified' | 'compromised' | 'revoked';
  createdAt: Date;
  verifiedAt?: Date;
  lastUsedAt?: Date;
  expiresAt: Date;
  isRevoked: boolean;
  trustScore?: number;
}

/**
 * Device verification challenge
 */
export interface DeviceVerificationChallenge {
  [key: string]: any;
  id: string;
  type: 'sms' | 'email' | 'app_notification' | 'security_question';
  challenge: string;
  expiresAt: Date;
  attempts: number;
  maxAttempts: number;
}

/**
 * Biometric credential
 */
export interface BiometricCredential {
  id: string;
  userId: string;
  type: 'fingerprint' | 'face' | 'iris' | 'voice' | 'behavior';
  isEnabled: boolean;
  isVerified: boolean;
  createdAt: Date;
  verifiedAt?: Date;
  lastUsedAt?: Date;
  riskScore?: number;
  metadata?: Record<string, any>;
}

/**
 * Security key information
 */
export interface SecurityKeyInfo {
  [key: string]: any;
  id: string;
  userId: string;
  type: 'fido2' | 'u2f' | 'webauthn';
  name: string;
  credentialId: string;
  isEnabled: boolean;
  isVerified: boolean;
  createdAt: Date;
  verifiedAt?: Date;
  lastUsedAt?: Date;
  expiresAt?: Date;
}

/**
 * MFA policy
 */
export interface MFAPolicy {
  id: string;
  required: boolean;
  requiredMethods?: number; // How many methods must be configured
  allowedMethods: MFAMethodType[];
  gracePeriod?: number; // Days before enforcement
  backupCodesRequired: boolean;
  backupCodesCount: number;
  toleranceWindow?: number; // For TOTP/SMS window
  rememberDevice?: boolean;
  rememberDeviceDays?: number;
  metadata?: Record<string, any>;
}

/**
 * MFA event
 */
export interface MFAEvent {
  [key: string]: any;
  id: string;
  userId: string;
  type: MFAEventType;
  method: MFAMethodType;
  timestamp: Date;
  success: boolean;
  details?: Record<string, any>;
}

/**
 * MFA event types
 */
export type MFAEventType =
  | 'setup_started'
  | 'setup_completed'
  | 'verification_succeeded'
  | 'verification_failed'
  | 'method_added'
  | 'method_removed'
  | 'method_verified'
  | 'backup_codes_generated'
  | 'backup_code_used'
  | 'device_trusted'
  | 'device_revoked'
  | string;

/**
 * MFA challenge
 */
export interface MFAChallenge {
  [key: string]: any;
  id: string;
  userId: string;
  methods: MFAMethodType[];
  expiresAt: Date;
  attemptedMethods: Set<MFAMethodType>;
  completedMethods: Set<MFAMethodType>;
  verificationRequired: boolean;
}
