/**
 * @file services/index.ts
 * Barrel export for all services
 */

export { AuthenticationService } from './AuthenticationService';
export { AuthorizationService } from './AuthorizationService';
export { SessionService } from './SessionService';
export { EncryptionService } from './EncryptionService';
export { AuditService } from './AuditService';

// Export errors
export {
  SecurityError,
  AuthenticationError,
  InvalidCredentialsError,
  MFARequiredError,
  AccountLockedError,
  PasswordExpiredError,
  AuthorizationError,
  PermissionDeniedError,
  ValidationError,
  NotFoundError,
  ConflictError,
  EncryptionError,
  SessionError,
  SessionExpiredError,
} from './errors/SecurityError';

export default {
  AuthenticationService: require('./AuthenticationService').default,
  AuthorizationService: require('./AuthorizationService').default,
  SessionService: require('./SessionService').default,
  EncryptionService: require('./EncryptionService').default,
  AuditService: require('./AuditService').default,
};
