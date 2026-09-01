/**
 * Security Utilities
 * 
 * Comprehensive collection of security utilities for:
 * - Cryptography (encryption, hashing, random generation)
 * - Input handling (sanitization, validation, masking)
 * - JWT token management
 * - Permission and role-based access control
 * - Password policies and strength validation
 * - Audit logging and event tracking
 * - Session lifecycle management
 * - Multi-factor authentication
 * - Device management and fingerprinting
 */

// Cryptography utilities
export {
  encrypt,
  decrypt,
  hash,
  verifyHash,
  generateRandomBytes,
  generateRandomString,
} from './crypto';

// Input handling utilities
export {
  sanitizeInput,
  sanitizeHTML,
  maskValue,
  maskEmail,
  maskCreditCard,
  maskPhoneNumber,
  validatePasswordStrength,
  isStrongPassword,
  generateOTP,
  verifyOTP,
  isValidEmail,
} from './input';

// JWT token utilities
export {
  decodeJWT,
  isTokenExpired,
  getTokenExpirationTime,
  getJWTClaims,
  getUserIdFromToken,
  shouldRefreshToken,
  formatTokenForDisplay,
} from './token';

// Permission and authorization utilities
export {
  hasPermission,
  hasAllPermissions,
  hasAnyPermission,
  hasRole,
  hasAllRoles,
  hasAnyRole,
  isFeatureEnabled,
  hasScope,
  hasAllScopes,
  hasAnyScope,
  evaluateAuthorizationContext,
} from './permission';

// Password policy utilities
export {
  calculatePasswordStrength,
  validatePasswordAgainstPolicy,
  generatePassword,
  passwordsMatch,
  getPasswordExpirationDate,
  isPasswordExpired,
  getDaysUntilPasswordExpiration,
  shouldShowPasswordExpirationWarning,
} from './password';

export type {
  PasswordStrengthLevel,
  PasswordStrengthScore,
  PasswordValidationResult,
} from './password';

// Audit logging utilities
export {
  AuditSeverity,
  AuditEventType,
  createAuditEvent,
  createLoginAuditEvent,
  createLogoutAuditEvent,
  createPasswordChangeAuditEvent,
  createMFAAuditEvent,
  createPermissionAuditEvent,
  createAccessDenialAuditEvent,
  createDataAuditEvent,
  createSuspiciousActivityAuditEvent,
  filterAuditEvents,
  sortAuditEvents,
  groupAuditEventsByDate,
  getAuditEventStats,
  formatAuditEvent,
  exportAuditEventsToCSV,
  isSuspiciousEvent,
} from './audit';

// Session management utilities
export {
  SessionState,
  createSession,
  getSessionState,
  isSessionActive,
  isSessionExpired,
  updateSessionActivity,
  extendSession,
  terminateSession,
  getSessionTimeRemaining,
  getSessionIdleTime,
  isSessionIdle,
  isSessionExpiringSoon,
  formatSessionTimeRemaining,
  validateSessionSecurity,
  getSessionSummary,
  getSessionDuration,
  getSessionAge,
  areSessionsEqual,
} from './session';

// MFA utilities
export {
  MFAMethodEnum,
  MFAStatusEnum,
  generateTOTPSecret,
  generateTOTPQRCodeURL,
  encodeBase32,
  verifyTOTPCode,
  generateBackupCodes,
  hashBackupCode,
  verifyBackupCode,
  createMFAConfig,
  enableMFA,
  verifyMFA,
  disableMFA,
  updateMFALastUsed,
  isMFAReady,
  getMFAMethodName,
  isValidOTPFormat,
  formatOTPCode,
  getOTPExpirationTime,
  shouldRegenerateBackupCodes,
  canRecoverMFA,
  getRecommendedMFAMethods,
} from './mfa';

export type {
  TOTPVerificationResult,
} from './mfa';

// Device management utilities
export {
  DeviceVerificationStatus,
  DeviceOS,
  DeviceBrowser,
  detectDeviceOS,
  detectBrowser,
  isMobileDevice,
  collectDeviceInfo,
  generateDeviceId,
  createDeviceFingerprint,
  verifyDeviceFingerprint,
  createTrustedDevice,
  verifyTrustedDevice,
  updateTrustedDeviceLastUsed,
  revokeTrustedDevice,
  isTrustedDevice,
  isTrustedDeviceExpired,
  getDaysUntilDeviceExpiration,
  shouldShowDeviceTrustWarning,
  extendTrustedDeviceTrust,
  detectSuspiciousActivity,
  requiresDeviceReVerification,
  getDeviceSummary,
  filterDevicesByStatus,
  sortDevicesByLastUsed,
} from './device';
