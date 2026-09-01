/**
 * @waysnx/ui-security
 * Enterprise-grade security components for React applications
 * 
 * This library provides:
 * - Authentication components (login, logout, session management)
 * - Authorization components (permission, role, feature gates)
 * - MFA components (setup, verification, recovery)
 * - Password management components
 * - OTP verification
 * - Secure input components
 * - Security dashboard components
 * - Audit and logging components
 * 
 * @license Apache-2.0
 */

import './styles/index.css';

// Export types (use explicit imports to avoid naming conflicts with components)
export type {
  User,
  TrustedDeviceInfo,
  AuthenticationResult,
  DeviceInfo,
  RiskScore,
  LoginCredentials,
  OTPVerificationData,
  PasswordResetData,
  ChangePasswordData,
  PasswordPolicy,
  SecurityPolicy,
  ApiResponse,
  ErrorResponse,
  PaginationParams,
  PaginatedResponse,
  Permission,
  Role,
  AuthorizationContext,
  AuditEvent,
  Session,
} from './types';

// Components (MFAStatus component re-exported from components)
export * from './components';

// Export hooks
export * from './hooks';

// Export providers
export * from './providers';

// Export services
export * from './services';

// Export utilities
export * from './utils';

// Export constants
export * from './constants';

// Export themes
export * from './themes';
