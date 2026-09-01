/**
 * @file services/errors/SecurityError.ts
 * Base security error class
 */

/**
 * Base error for all security-related errors
 * 
 * @example
 * ```tsx
 * try {
 *   await authService.login(credentials);
 * } catch (error) {
 *   if (error instanceof SecurityError) {
 *     console.error(`[${error.code}] ${error.message}`);
 *     handleSecurityError(error);
 *   }
 * }
 * ```
 */
export class SecurityError extends Error {
  /**
   * @param message - Human-readable error message
   * @param code - Machine-readable error code (e.g., 'AUTH_INVALID_CREDENTIALS')
   * @param details - Additional error context
   */
  constructor(
    message: string,
    public code: string,
    public details?: Record<string, any>
  ) {
    super(message);
    this.name = 'SecurityError';
    Object.setPrototypeOf(this, SecurityError.prototype);
  }

  /**
   * Serialize error for logging/transmission
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      details: this.details,
    };
  }
}

/**
 * Authentication error
 */
export class AuthenticationError extends SecurityError {
  constructor(message: string, details?: Record<string, any>) {
    super(message, 'AUTH_ERROR', details);
    this.name = 'AuthenticationError';
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
}

/**
 * Invalid credentials error
 */
export class InvalidCredentialsError extends AuthenticationError {
  constructor(details?: Record<string, any>) {
    super('Invalid email or password', {
      ...details,
      attempts: details?.attempts || 1,
    });
    this.code = 'AUTH_INVALID_CREDENTIALS';
    this.name = 'InvalidCredentialsError';
    Object.setPrototypeOf(this, InvalidCredentialsError.prototype);
  }
}

/**
 * MFA required error
 */
export class MFARequiredError extends AuthenticationError {
  constructor(public sessionId: string, public methods: string[]) {
    super('Multi-factor authentication required', { sessionId, methods });
    this.code = 'AUTH_MFA_REQUIRED';
    this.name = 'MFARequiredError';
    Object.setPrototypeOf(this, MFARequiredError.prototype);
  }
}

/**
 * Account locked error
 */
export class AccountLockedError extends AuthenticationError {
  constructor(public unlockAt: Date) {
    super('Account is locked due to too many failed login attempts', {
      unlockAt: unlockAt.toISOString(),
    });
    this.code = 'AUTH_ACCOUNT_LOCKED';
    this.name = 'AccountLockedError';
    Object.setPrototypeOf(this, AccountLockedError.prototype);
  }
}

/**
 * Password expired error
 */
export class PasswordExpiredError extends AuthenticationError {
  constructor() {
    super('Password has expired. Please reset your password.');
    this.code = 'AUTH_PASSWORD_EXPIRED';
    this.name = 'PasswordExpiredError';
    Object.setPrototypeOf(this, PasswordExpiredError.prototype);
  }
}

/**
 * Authorization error
 */
export class AuthorizationError extends SecurityError {
  constructor(message: string, details?: Record<string, any>) {
    super(message, 'AUTHZ_ERROR', details);
    this.name = 'AuthorizationError';
    Object.setPrototypeOf(this, AuthorizationError.prototype);
  }
}

/**
 * Permission denied error
 */
export class PermissionDeniedError extends AuthorizationError {
  constructor(permission: string, resource?: string) {
    super(`Permission denied: ${permission}${resource ? ` on ${resource}` : ''}`, {
      permission,
      resource,
    });
    this.code = 'AUTHZ_PERMISSION_DENIED';
    this.name = 'PermissionDeniedError';
    Object.setPrototypeOf(this, PermissionDeniedError.prototype);
  }
}

/**
 * Validation error
 */
export class ValidationError extends SecurityError {
  constructor(public errors: string[]) {
    super('Validation failed', 'VALIDATION_ERROR', { errors });
    this.name = 'ValidationError';
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

/**
 * Not found error
 */
export class NotFoundError extends SecurityError {
  constructor(resource: string, id?: string) {
    super(`${resource} not found${id ? `: ${id}` : ''}`, 'NOT_FOUND', {
      resource,
      id,
    });
    this.name = 'NotFoundError';
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

/**
 * Conflict error
 */
export class ConflictError extends SecurityError {
  constructor(message: string, details?: Record<string, any>) {
    super(message, 'CONFLICT', details);
    this.name = 'ConflictError';
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}

/**
 * Encryption error
 */
export class EncryptionError extends SecurityError {
  constructor(message: string, details?: Record<string, any>) {
    super(message, 'ENCRYPTION_ERROR', details);
    this.name = 'EncryptionError';
    Object.setPrototypeOf(this, EncryptionError.prototype);
  }
}

/**
 * Session error
 */
export class SessionError extends SecurityError {
  constructor(message: string, details?: Record<string, any>) {
    super(message, 'SESSION_ERROR', details);
    this.name = 'SessionError';
    Object.setPrototypeOf(this, SessionError.prototype);
  }
}

/**
 * Session expired error
 */
export class SessionExpiredError extends SessionError {
  constructor() {
    super('Session has expired. Please log in again.');
    this.code = 'SESSION_EXPIRED';
    this.name = 'SessionExpiredError';
    Object.setPrototypeOf(this, SessionExpiredError.prototype);
  }
}
