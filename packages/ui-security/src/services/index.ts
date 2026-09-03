/**
 * @file services/index.ts
 * Barrel export for all services
 */

import { AuthenticationService } from './AuthenticationService';
import { AuthorizationService } from './AuthorizationService';
import { SessionService } from './SessionService';
import { EncryptionService } from './EncryptionService';
import { AuditService } from './AuditService';

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

// ESM-safe default barrel built from the imported classes. (Previously used
// CommonJS `require(...)`, which throws "Can't find variable: require" in
// browser/ESM contexts such as Storybook/Vite.)
export default {
  AuthenticationService,
  AuthorizationService,
  SessionService,
  EncryptionService,
  AuditService,
};
