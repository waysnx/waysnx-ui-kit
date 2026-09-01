/**
 * @file types/session.ts
 * Session management and idle timeout types
 */

/**
 * Session configuration
 */
export interface SessionConfig {
  maxDuration: number; // ms
  idleTimeout: number; // ms
  renewalThreshold?: number; // ms before expiry to trigger renewal
  allowConcurrentSessions: boolean;
  maxConcurrentSessions?: number;
  trackActivity: boolean;
  warningTime?: number; // ms before expiry to warn user
  logoutOnExpiry?: boolean;
}

/**
 * Session information
 */
export interface SessionInfo {
  [key: string]: any;
  id: string;
  userId: string;
  createdAt: Date;
  expiresAt: Date;
  lastActivityAt: Date;
  idleExpiresAt: Date;
  maxExpiresAt: Date;
  isActive: boolean;
  sessionStartTime: Date;
  remainingTime: number; // ms
  sessionDuration: number; // ms
  idleDuration: number; // ms
  deviceInfo?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, any>;
}

/**
 * Session activity
 */
export interface SessionActivity {
  timestamp: Date;
  type: 'user_action' | 'page_focus' | 'network_request' | 'keyboard' | 'mouse' | 'touch';
  details?: Record<string, any>;
}

/**
 * Idle timeout state
 */
export interface IdleTimeoutState {
  [key: string]: any;
  isIdle: boolean;
  idleTime: number; // ms
  remainingIdleTime: number; // ms
  lastActivityTime: Date;
  warningIssued: boolean;
  warningTime?: Date;
}

/**
 * Session timeout warning
 */
export interface SessionTimeoutWarning {
  type: 'warning' | 'critical' | 'expired';
  message: string;
  remainingTime: number; // ms
  action?: 'renew' | 'logout' | 'stay_logged_in';
  timestamp: Date;
}

/**
 * Session renewal request
 */
export interface SessionRenewalRequest {
  [key: string]: any;
  sessionId: string;
  refreshToken: string;
  reason?: 'idle' | 'expiry_warning' | 'activity' | 'manual';
}

/**
 * Session renewal result
 */
export interface SessionRenewalResult {
  success: boolean;
  session?: SessionInfo;
  newToken?: string;
  newRefreshToken?: string;
  error?: string;
}

/**
 * Active session item
 */
export interface ActiveSession {
  [key: string]: any;
  id: string;
  deviceName: string;
  deviceType: 'desktop' | 'mobile' | 'tablet' | 'unknown';
  os: string;
  browser: string;
  ipAddress: string;
  location?: string;
  lastActivity: Date;
  createdAt: Date;
  isCurrentSession: boolean;
  isTrusted?: boolean;
}

/**
 * Concurrent session conflict
 */
export interface ConcurrentSessionConflict {
  existingSession: ActiveSession;
  newSession: ActiveSession;
  maxSessions: number;
  action: 'allow_new' | 'keep_existing' | 'allow_both' | 'prompt_user';
}

/**
 * Session event
 */
export interface SessionEvent {
  [key: string]: any;
  id: string;
  sessionId: string;
  userId: string;
  type: SessionEventType;
  timestamp: Date;
  details?: Record<string, any>;
}

/**
 * Session event types
 */
export type SessionEventType =
  | 'session_created'
  | 'session_renewed'
  | 'session_expired'
  | 'session_revoked'
  | 'idle_timeout_warning'
  | 'session_locked'
  | 'session_unlocked'
  | 'device_verified'
  | 'concurrent_session_detected'
  | string;

/**
 * Keep-alive configuration
 */
export interface KeepAliveConfig {
  enabled: boolean;
  interval: number; // ms
  method: 'ping' | 'refresh' | 'heartbeat';
  failureThreshold: number;
  retryAttempts: number;
  retryDelay: number; // ms
}

/**
 * Keep-alive result
 */
export interface KeepAliveResult {
  [key: string]: any;
  success: boolean;
  sessionId: string;
  newExpiryTime?: Date;
  error?: string;
}

/**
 * Session countdown state
 */
export interface SessionCountdownState {
  totalTime: number; // ms
  remainingTime: number; // ms
  percentRemaining: number; // 0-100
  isWarning: boolean;
  isCritical: boolean;
  isExpired: boolean;
  formattedTime: string; // HH:MM:SS
}

/**
 * Session lock state
 */
export interface SessionLockState {
  [key: string]: any;
  isLocked: boolean;
  lockedAt?: Date;
  lockReason?: string;
  unlockAttempts?: number;
  maxUnlockAttempts?: number;
}

/**
 * Session validation result
 */
export interface SessionValidationResult {
  [key: string]: any;
  isValid: boolean;
  session?: SessionInfo;
  reason?: string;
  shouldRefresh?: boolean;
  error?: string;
}
