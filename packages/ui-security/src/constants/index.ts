/**
 * @file constants/index.ts
 * Security-related constants
 */

/**
 * Default password policy
 */
export const DEFAULT_PASSWORD_POLICY = {
  minLength: 8,
  maxLength: 128,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
  expiryDays: 90,
  historyCount: 5,
};

/**
 * Default session policy
 */
export const DEFAULT_SESSION_POLICY = {
  maxDuration: 24 * 60 * 60 * 1000, // 24 hours
  idleTimeout: 30 * 60 * 1000, // 30 minutes
  renewalThreshold: 5 * 60 * 1000, // 5 minutes before expiry
  allowConcurrentSessions: false,
  maxConcurrentSessions: 1,
};

/**
 * Default MFA policy
 */
export const DEFAULT_MFA_POLICY = {
  required: false,
  allowedMethods: ['totp', 'sms', 'email'] as const,
  backupCodesCount: 10,
};

/**
 * Password strength levels
 */
export const PASSWORD_STRENGTH = {
  VERY_WEAK: 0,
  WEAK: 1,
  FAIR: 2,
  GOOD: 3,
  STRONG: 4,
  VERY_STRONG: 5,
} as const;

/**
 * Password strength scores
 */
export const PASSWORD_STRENGTH_SCORES = {
  0: { label: 'Very Weak', color: '#dc3545', percentage: 10 },
  1: { label: 'Weak', color: '#fd7e14', percentage: 25 },
  2: { label: 'Fair', color: '#ffc107', percentage: 50 },
  3: { label: 'Good', color: '#28a745', percentage: 75 },
  4: { label: 'Strong', color: '#20c997', percentage: 90 },
  5: { label: 'Very Strong', color: '#007bff', percentage: 100 },
} as const;

/**
 * OTP timeout in milliseconds
 */
export const OTP_TIMEOUT = 5 * 60 * 1000; // 5 minutes

/**
 * OTP max attempts
 */
export const OTP_MAX_ATTEMPTS = 5;

/**
 * Token storage keys
 */
export const STORAGE_KEYS = {
  ACCESS_TOKEN: '@waysnx/ui-security/access-token',
  REFRESH_TOKEN: '@waysnx/ui-security/refresh-token',
  SESSION: '@waysnx/ui-security/session',
  USER: '@waysnx/ui-security/user',
  MFA_CONFIG: '@waysnx/ui-security/mfa-config',
  SECURITY_POLICY: '@waysnx/ui-security/security-policy',
} as const;

/**
 * Security event types
 */
export const SECURITY_EVENT_TYPES = {
  LOGIN: 'login',
  LOGOUT: 'logout',
  FAILED_LOGIN: 'failed_login',
  PASSWORD_CHANGE: 'password_change',
  MFA_SETUP: 'mfa_setup',
  MFA_VERIFICATION: 'mfa_verification',
  PERMISSION_DENIED: 'permission_denied',
  SUSPICIOUS_ACTIVITY: 'suspicious_activity',
  DEVICE_ADDED: 'device_added',
  DEVICE_REMOVED: 'device_removed',
  SESSION_EXPIRED: 'session_expired',
  TOKEN_REFRESH: 'token_refresh',
} as const;

/**
 * HTTP status codes for security
 */
export const SECURITY_STATUS_CODES = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  SESSION_EXPIRED: 440,
  MFA_REQUIRED: 450,
} as const;

/**
 * Risk score thresholds
 */
export const RISK_THRESHOLDS = {
  LOW: 33,
  MEDIUM: 66,
  HIGH: 100,
} as const;

/**
 * MFA methods
 */
export const MFA_METHODS = {
  TOTP: 'totp',
  SMS: 'sms',
  EMAIL: 'email',
  WEBAUTHN: 'webauthn',
  BACKUP_CODES: 'backup-codes',
} as const;
