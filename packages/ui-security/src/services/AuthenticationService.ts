/**
 * @file services/AuthenticationService.ts
 * Core authentication service - credential validation, token lifecycle, MFA coordination
 * 
 * No external HTTP dependency - HTTP client injected by application
 */

import type {
  LoginCredentials,
  AuthenticationResult,
  PasswordPolicy,
  OTPVerificationData,
} from '../types';
import {
  InvalidCredentialsError,
  AccountLockedError,
  ValidationError,
} from './errors';

export interface HttpClient {
  post<T>(url: string, data: any): Promise<T>;
  get<T>(url: string): Promise<T>;
}

export interface AuthenticationConfig {
  tokenExpiryMs: number;
  refreshTokenExpiryMs: number;
  maxLoginAttempts: number;
  lockoutDurationMs: number;
  passwordPolicy: PasswordPolicy;
}

interface LoginAttempt {
  count: number;
  lastAttemptAt: Date;
  lockedUntil?: Date;
}

/**
 * AuthenticationService
 * 
 * Manages user authentication including:
 * - Credential validation
 * - Token lifecycle (generate, refresh, revoke)
 * - MFA coordination
 * - Password policy enforcement
 * - Account lockout
 * 
 * @example
 * ```tsx
 * const authService = new AuthenticationService(
 *   httpClient,
 *   encryptionService,
 *   {
 *     tokenExpiryMs: 3600000,
 *     refreshTokenExpiryMs: 86400000,
 *     maxLoginAttempts: 5,
 *     lockoutDurationMs: 1800000,
 *     passwordPolicy: { ... }
 *   }
 * );
 * 
 * const result = await authService.login({
 *   email: 'user@example.com',
 *   password: 'SecurePass123!',
 *   rememberMe: true
 * });
 * ```
 */
export class AuthenticationService {
  private loginAttempts = new Map<string, LoginAttempt>();
  private tokenBlacklist = new Set<string>();
  private activeSessions = new Map<string, { userId: string; expiresAt: Date }>();

  constructor(
    private http: HttpClient,
    private config: AuthenticationConfig
  ) {
    // Cleanup expired tokens periodically
    setInterval(() => this.cleanupExpiredTokens(), 60000);
  }

  /**
   * Login with email and password
   * 
   * @param credentials - User credentials
   * @returns Authentication result with token or MFA requirement
   * @throws InvalidCredentialsError, AccountLockedError, ValidationError
   */
  async login(credentials: LoginCredentials): Promise<AuthenticationResult> {
    // Validate input
    const validation = this.validateCredentials(credentials);
    if (!validation.isValid) {
      throw new ValidationError(validation.errors);
    }

    const email = credentials.email.toLowerCase();

    // Check account lockout
    const attempt = this.loginAttempts.get(email);
    if (attempt?.lockedUntil && attempt.lockedUntil > new Date()) {
      throw new AccountLockedError(attempt.lockedUntil);
    }

    try {
      // Delegate HTTP to injected client
      const response = await this.http.post<any>('/auth/login', {
        email: credentials.email,
        password: credentials.password,
      });

      // Validate response
      if (!response.success) {
        this.recordFailedLoginAttempt(email);
        throw new InvalidCredentialsError({
          email: credentials.email,
          attempts: (this.loginAttempts.get(email)?.count || 0) + 1,
        });
      }

      // Handle MFA requirement
      if (response.mfaRequired) {
        return {
          success: false,
          error: 'MFA_REQUIRED',
          mfaRequired: true,
          mfaMethods: response.mfaMethods || ['totp', 'sms'],
          details: { sessionId: response.sessionId },
        };
      }

      // Success - process tokens
      this.clearLoginAttempts(email);
      this.storeSession(response.sessionId, response.userId);

      return {
        success: true,
        token: response.token,
        refreshToken: response.refreshToken,
        user: response.user,
      };
    } catch (error) {
      if (error instanceof InvalidCredentialsError || error instanceof ValidationError) {
        throw error;
      }
      throw new InvalidCredentialsError({ originalError: String(error) });
    }
  }

  /**
   * Verify MFA code
   * 
   * @param sessionId - Temporary session ID from MFA requirement
   * @param verification - OTP code or MFA method response
   * @returns Full authentication result if successful
   * @throws ValidationError, InvalidCredentialsError
   */
  async verifyMFA(
    sessionId: string,
    verification: OTPVerificationData
  ): Promise<AuthenticationResult> {
    if (!sessionId) {
      throw new ValidationError(['Session ID required']);
    }

    if (!verification.code) {
      throw new ValidationError(['Verification code required']);
    }

    try {
      const response = await this.http.post<any>('/auth/verify-mfa', {
        sessionId,
        code: verification.code,
        method: verification.method || 'totp',
      });

      if (!response.success) {
        throw new InvalidCredentialsError({ method: verification.method });
      }

      this.storeSession(response.sessionId, response.userId);

      return {
        success: true,
        token: response.token,
        refreshToken: response.refreshToken,
        user: response.user,
      };
    } catch (error) {
      if (error instanceof InvalidCredentialsError || error instanceof ValidationError) {
        throw error;
      }
      throw new InvalidCredentialsError({ originalError: String(error) });
    }
  }

  /**
   * Refresh access token
   * 
   * @param refreshToken - Refresh token
   * @returns New access token and refresh token
   * @throws ValidationError, InvalidCredentialsError
   */
  async refreshToken(refreshToken: string): Promise<{
    token: string;
    refreshToken: string;
  }> {
    if (!refreshToken) {
      throw new ValidationError(['Refresh token required']);
    }

    if (this.tokenBlacklist.has(refreshToken)) {
      throw new InvalidCredentialsError({ reason: 'Token has been revoked' });
    }

    try {
      const response = await this.http.post<any>('/auth/refresh', {
        refreshToken,
      });

      if (!response.success) {
        throw new InvalidCredentialsError({ reason: 'Invalid refresh token' });
      }

      return {
        token: response.token,
        refreshToken: response.refreshToken,
      };
    } catch (error) {
      if (error instanceof ValidationError || error instanceof InvalidCredentialsError) {
        throw error;
      }
      throw new InvalidCredentialsError({ originalError: String(error) });
    }
  }

  /**
   * Logout - invalidate tokens
   * 
   * @param token - Access token to revoke
   * @param sessionId - Session ID to close
   */
  async logout(token: string, sessionId?: string): Promise<void> {
    // Add token to blacklist
    if (token) {
      this.tokenBlacklist.add(token);
    }

    // Remove session
    if (sessionId) {
      this.activeSessions.delete(sessionId);
    }

    // Notify server (fire and forget)
    try {
      await this.http.post('/auth/logout', { token, sessionId });
    } catch {
      // Logout fails gracefully - client-side token revocation is sufficient
    }
  }

  /**
   * Validate password against policy
   * 
   * @param password - Password to validate
   * @param policy - Password policy (uses default if not provided)
   * @returns Validation result with errors if invalid
   */
  validatePassword(password: string, policy?: PasswordPolicy): { isValid: boolean; errors: string[] } {
    const p = policy || this.config.passwordPolicy;
    const errors: string[] = [];

    if (!password) {
      errors.push('Password is required');
      return { isValid: false, errors };
    }

    if (password.length < p.minLength) {
      errors.push(`Password must be at least ${p.minLength} characters`);
    }

    if (p.maxLength && password.length > p.maxLength) {
      errors.push(`Password must be at most ${p.maxLength} characters`);
    }

    if (p.requireUppercase && !/[A-Z]/.test(password)) {
      errors.push('Password must contain uppercase letters (A-Z)');
    }

    if (p.requireLowercase && !/[a-z]/.test(password)) {
      errors.push('Password must contain lowercase letters (a-z)');
    }

    if (p.requireNumbers && !/\d/.test(password)) {
      errors.push('Password must contain numbers (0-9)');
    }

    if (p.requireSpecialChars && !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      errors.push('Password must contain special characters');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validate credentials format
   * 
   * @private
   */
  private validateCredentials(credentials: LoginCredentials): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!credentials.email) {
      errors.push('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.email.trim())) {
      errors.push('Email format is invalid');
    }

    if (!credentials.password) {
      errors.push('Password is required');
    } else if (credentials.password.length < 1) {
      errors.push('Password cannot be empty');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Record failed login attempt
   * 
   * @private
   */
  private recordFailedLoginAttempt(email: string): void {
    const attempt = this.loginAttempts.get(email) || {
      count: 0,
      lastAttemptAt: new Date(),
    };

    attempt.count++;
    attempt.lastAttemptAt = new Date();

    if (attempt.count >= this.config.maxLoginAttempts) {
      attempt.lockedUntil = new Date(Date.now() + this.config.lockoutDurationMs);
    }

    this.loginAttempts.set(email, attempt);
  }

  /**
   * Clear login attempts for successful login
   * 
   * @private
   */
  private clearLoginAttempts(email: string): void {
    this.loginAttempts.delete(email);
  }

  /**
   * Store active session
   * 
   * @private
   */
  private storeSession(sessionId: string, userId: string): void {
    this.activeSessions.set(sessionId, {
      userId,
      expiresAt: new Date(Date.now() + this.config.tokenExpiryMs),
    });
  }

  /**
   * Cleanup expired tokens and sessions
   * 
   * @private
   */
  private cleanupExpiredTokens(): void {
    const now = new Date();

    // Clean expired sessions
    for (const [sessionId, session] of this.activeSessions.entries()) {
      if (session.expiresAt <= now) {
        this.activeSessions.delete(sessionId);
      }
    }

    // Clean old login attempts
    for (const [email, attempt] of this.loginAttempts.entries()) {
      const age = Date.now() - attempt.lastAttemptAt.getTime();
      if (age > this.config.lockoutDurationMs * 2) {
        this.loginAttempts.delete(email);
      }
    }
  }

  /**
   * Get active session info
   * 
   * @internal
   */
  getSessionInfo(sessionId: string) {
    return this.activeSessions.get(sessionId);
  }

  /**
   * Check if token is blacklisted
   * 
   * @internal
   */
  isTokenBlacklisted(token: string): boolean {
    return this.tokenBlacklist.has(token);
  }
}
