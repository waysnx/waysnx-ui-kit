/**
 * @file types/index.ts
 * Core type definitions for security components and infrastructure
 * 
 * Domain-specific types are organized in separate files and should be imported directly:
 * - import type { PermissionDefinition } from '@waysnx/ui-security/types/authorization'
 * - import type { SessionInfo } from '@waysnx/ui-security/types/session'
 * - import type { MFAConfiguration } from '@waysnx/ui-security/types/mfa'
 * - import type { EncryptedData } from '@waysnx/ui-security/types/encryption'
 * - import type { AuditEvent } from '@waysnx/ui-security/types/audit'
 */

/**
 * @file types/index.ts
 * Common security types - core utilities and base types
 * 
 * Domain-specific types are organized in separate modules:
 * - authorization.ts: Permission, Role, AuthorizationContext
 * - session.ts: SessionInfo, SessionConfig
 * - mfa.ts: MFAConfiguration, MFAMethodDefinition, etc.
 * - encryption.ts: EncryptedData, EncryptionKey
 * - audit.ts: AuditEvent, AuditEventType
 */

// Re-export common domain types for backward compatibility with utils
export type { PermissionDefinition as Permission } from './authorization';
export type { RoleDefinition as Role } from './authorization';
export type { AuthorizationContext } from './authorization';
export type { AuditEvent } from './audit';
export type { SessionInfo as Session } from './session';

// Re-export MFA types (but not MFAStatus which is used for the component)
export type {
  MFAMethodType,
  MFAMethodDefinition,
  MFAConfiguration,
  BackupCode,
  TOTPSecret,
  MFAVerificationRequest,
  MFAVerificationResult,
  MFASetupStep,
  MFASetupWizardState,
  AuthenticatorQRCode,
  DeviceVerificationChallenge,
  BiometricCredential,
  SecurityKeyInfo,
  MFAPolicy,
  MFAEvent,
  MFAEventType,
  MFAChallenge,
} from './mfa';

/**
 * User representation in security context
 */
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  roles?: string[];
  permissions?: string[];
  lastLogin?: Date;
  passwordExpiry?: Date;
  mfaEnabled?: boolean;
  trustedDevices?: TrustedDeviceInfo[];
  metadata?: Record<string, any>;
}

/**
 * Trusted device information
 */
export interface TrustedDeviceInfo {
  id: string;
  userId: string;
  deviceId: string;
  name: string;
  fingerprint: string;
  status: 'unverified' | 'pending' | 'verified' | 'compromised' | 'revoked';
  createdAt: Date;
  verifiedAt?: Date;
  lastUsedAt?: Date;
  expiresAt: Date;
  isRevoked: boolean;
}

/**
 * Authentication result
 */
export interface AuthenticationResult {
  success: boolean;
  user?: User;
  token?: string;
  refreshToken?: string;
  mfaRequired?: boolean;
  mfaMethods?: string[];
  error?: string;
  details?: Record<string, any>;
}

/**
 * Device information
 */
export interface DeviceInfo {
  id: string;
  os: string;
  browser: string;
  userAgent: string;
  isMobile: boolean;
  screenResolution: string;
  timezone: string;
  language: string;
  touchSupport: boolean;
  webglSupport: boolean;
  localStorageSupport: boolean;
  sessionStorageSupport: boolean;
  cookiesEnabled: boolean;
  doNotTrack: boolean;
}

/**
 * Risk score calculation
 */
export interface RiskScore {
  overall: number;
  password: number;
  mfa: number;
  devices: number;
  sessions: number;
  activity: number;
  timestamp: Date;
}

/**
 * Login credentials
 */
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
  trustedDevice?: boolean;
}

/**
 * OTP verification data
 */
export interface OTPVerificationData {
  code: string;
  method: 'sms' | 'email' | 'totp';
  target?: string;
  attempt?: number;
  maxAttempts?: number;
  expiresAt?: Date;
}

/**
 * Password reset data
 */
export interface PasswordResetData {
  token: string;
  email: string;
  newPassword: string;
  confirmPassword: string;
  expiresAt: Date;
}

/**
 * Change password data
 */
export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

/**
 * Password policy
 */
export interface PasswordPolicy {
  minLength: number;
  maxLength?: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSpecialChars: boolean;
  minStrengthScore?: number;
  expiryDays?: number;
  historyCount?: number;
  metadata?: Record<string, any>;
}

/**
 * Security policy configuration
 */
export interface SecurityPolicy {
  id: string;
  name: string;
  description?: string;
  maxLoginAttempts?: number;
  lockoutDuration?: number;
  passwordPolicy?: PasswordPolicy;
  mfaRequired?: boolean;
  metadata?: Record<string, any>;
}

/**
 * Generic API response
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: Date;
  details?: Record<string, any>;
}

/**
 * Generic error response
 */
export interface ErrorResponse {
  code: string;
  message: string;
  statusCode: number;
  timestamp: Date;
  path?: string;
  details?: Record<string, any>;
}

/**
 * Pagination
 */
export interface PaginationParams {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  pageCount: number;
  hasMore: boolean;
}

// Type aliases for backward compatibility
export type { ChangePasswordData as ChangePassword };
