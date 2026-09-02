/**
 * Session Management Utilities
 * 
 * Provides utilities for session lifecycle management, timeout tracking,
 * idle detection, and session extension.
 */

import type { Session } from '../types';
import { generateSecureId } from './crypto';

/**
 * Session state constants
 */
export enum SessionState {
  ACTIVE = 'active',
  IDLE = 'idle',
  EXPIRING = 'expiring',
  EXPIRED = 'expired',
}

/**
 * Create a new session
 * 
 * @param userId - User ID
 * @param sessionConfig - Session configuration
 * @returns Created Session
 */
export function createSession(
  userId: string,
  sessionConfig: {
    sessionTimeout?: number; // in minutes
    idleTimeout?: number; // in minutes
    maxSessionDuration?: number; // in hours
  } = {}
): Session {
  const now = new Date();
  const sessionTimeout = (sessionConfig.sessionTimeout || 30) * 60 * 1000; // Convert to ms
  const idleTimeout = (sessionConfig.idleTimeout || 15) * 60 * 1000; // Convert to ms
  const maxSessionDuration = (sessionConfig.maxSessionDuration || 24) * 60 * 60 * 1000; // Convert to ms

  return {
    id: generateSessionId(),
    userId,
    createdAt: now,
    expiresAt: new Date(now.getTime() + sessionTimeout),
    lastActivityAt: now,
    idleExpiresAt: new Date(now.getTime() + idleTimeout),
    maxExpiresAt: new Date(now.getTime() + maxSessionDuration),
    isActive: true,
    sessionStartTime: now,
    remainingTime: sessionTimeout,
    sessionDuration: sessionTimeout,
    idleDuration: idleTimeout,
    deviceInfo: {},
    ipAddress: 'client',
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'N/A',
  };
}

/**
 * Generate a unique session ID
 */
function generateSessionId(): string {
  // Session identifiers must be unpredictable to resist session-guessing/
  // fixation attacks, so use a cryptographically-secure random suffix.
  return generateSecureId('sess');
}

/**
 * Get current session state
 * 
 * @param session - Session to check
 * @returns Current session state
 */
export function getSessionState(session: Session): SessionState {
  if (!session.isActive) {
    return SessionState.EXPIRED;
  }

  const now = new Date();

  // Check if session has expired
  if (now > session.expiresAt) {
    return SessionState.EXPIRED;
  }

  // Check if idle timeout reached
  if (now > session.idleExpiresAt) {
    return SessionState.EXPIRED;
  }

  // Check if max session duration exceeded
  if (now > session.maxExpiresAt) {
    return SessionState.EXPIRED;
  }

  // Check if session is expiring soon (within 5 minutes)
  const timeUntilExpiry = session.expiresAt.getTime() - now.getTime();
  if (timeUntilExpiry < 5 * 60 * 1000) {
    return SessionState.EXPIRING;
  }

  // Check if idle
  const timeSinceActivity = now.getTime() - session.lastActivityAt.getTime();
  const idleThreshold = session.idleExpiresAt.getTime() - session.createdAt.getTime();
  if (timeSinceActivity > idleThreshold * 0.8) {
    return SessionState.IDLE;
  }

  return SessionState.ACTIVE;
}

/**
 * Check if session is active
 * 
 * @param session - Session to check
 * @returns true if session is active, false otherwise
 */
export function isSessionActive(session: Session): boolean {
  return getSessionState(session) === SessionState.ACTIVE;
}

/**
 * Check if session is expired
 * 
 * @param session - Session to check
 * @returns true if session is expired, false otherwise
 */
export function isSessionExpired(session: Session): boolean {
  if (!session.isActive) {
    return true;
  }

  const now = new Date();
  return (
    now > session.expiresAt ||
    now > session.idleExpiresAt ||
    now > session.maxExpiresAt
  );
}

/**
 * Update session last activity timestamp
 * 
 * @param session - Session to update
 * @returns Updated session
 */
export function updateSessionActivity(session: Session): Session {
  const now = new Date();
  const idleTimeout =
    session.idleExpiresAt.getTime() - session.createdAt.getTime();

  return {
    ...session,
    lastActivityAt: now,
    idleExpiresAt: new Date(now.getTime() + idleTimeout),
  };
}

/**
 * Extend session expiration
 * 
 * @param session - Session to extend
 * @param extensionMinutes - Minutes to extend (default: 30)
 * @returns Extended session
 */
export function extendSession(
  session: Session,
  extensionMinutes: number = 30
): Session {
  const extensionMs = extensionMinutes * 60 * 1000;
  const newExpiresAt = new Date(session.expiresAt.getTime() + extensionMs);

  // Ensure extension doesn't exceed max session duration
  if (newExpiresAt > session.maxExpiresAt) {
    return {
      ...session,
      expiresAt: session.maxExpiresAt,
    };
  }

  return {
    ...session,
    expiresAt: newExpiresAt,
  };
}

/**
 * Terminate session
 * 
 * @param session - Session to terminate
 * @returns Terminated session
 */
export function terminateSession(session: Session): Session {
  return {
    ...session,
    isActive: false,
    expiresAt: new Date(),
  };
}

/**
 * Get time remaining in session (in seconds)
 * 
 * @param session - Session to check
 * @returns Seconds until expiration, or 0 if expired
 */
export function getSessionTimeRemaining(session: Session): number {
  if (!isSessionActive(session)) {
    return 0;
  }

  const now = new Date();
  const timeRemaining = session.expiresAt.getTime() - now.getTime();
  return Math.max(0, Math.ceil(timeRemaining / 1000));
}

/**
 * Get session idle time (in seconds)
 * 
 * @param session - Session to check
 * @returns Seconds since last activity
 */
export function getSessionIdleTime(session: Session): number {
  const now = new Date();
  const idleTime = now.getTime() - session.lastActivityAt.getTime();
  return Math.ceil(idleTime / 1000);
}

/**
 * Check if session is idle
 * 
 * @param session - Session to check
 * @param idleThresholdMs - Idle threshold in milliseconds
 * @returns true if session is idle, false otherwise
 */
export function isSessionIdle(
  session: Session,
  idleThresholdMs: number = 15 * 60 * 1000
): boolean {
  const now = new Date();
  const timeSinceActivity = now.getTime() - session.lastActivityAt.getTime();
  return timeSinceActivity > idleThresholdMs;
}

/**
 * Check if session is expiring soon
 * 
 * @param session - Session to check
 * @param warningMinutes - Minutes before expiration to warn (default: 5)
 * @returns true if session is expiring soon, false otherwise
 */
export function isSessionExpiringSoon(
  session: Session,
  warningMinutes: number = 5
): boolean {
  if (!isSessionActive(session)) {
    return false;
  }

  const now = new Date();
  const warningThresholdMs = warningMinutes * 60 * 1000;
  const timeUntilExpiry = session.expiresAt.getTime() - now.getTime();

  return timeUntilExpiry > 0 && timeUntilExpiry < warningThresholdMs;
}

/**
 * Get session formatted time remaining
 * 
 * @param session - Session to check
 * @returns Formatted time string (e.g., "5m 30s", "1h 30m")
 */
export function formatSessionTimeRemaining(session: Session): string {
  const seconds = getSessionTimeRemaining(session);

  if (seconds <= 0) {
    return 'Expired';
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const parts: string[] = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (secs > 0 || parts.length === 0) parts.push(`${secs}s`);

  return parts.join(' ');
}

/**
 * Validate session security
 * 
 * @param session - Session to validate
 * @param expectedDeviceInfo - Expected device information
 * @param expectedIpAddress - Expected IP address
 * @returns Validation result with issues
 */
export function validateSessionSecurity(
  session: Session,
  expectedDeviceInfo?: Record<string, any>,
  expectedIpAddress?: string
): { isValid: boolean; issues: string[] } {
  const issues: string[] = [];

  // Check if session is active
  if (!session.isActive) {
    issues.push('Session is inactive');
  }

  // Check if session is expired
  if (isSessionExpired(session)) {
    issues.push('Session has expired');
  }

  // Device info mismatch
  if (expectedDeviceInfo) {
    if (JSON.stringify(session.deviceInfo) !== JSON.stringify(expectedDeviceInfo)) {
      issues.push('Device information has changed');
    }
  }

  // IP address mismatch
  if (expectedIpAddress && session.ipAddress !== expectedIpAddress) {
    issues.push('IP address has changed');
  }

  // User agent mismatch (browser environment)
  if (
    typeof navigator !== 'undefined' &&
    session.userAgent !== navigator.userAgent
  ) {
    issues.push('User agent has changed');
  }

  return {
    isValid: issues.length === 0,
    issues,
  };
}

/**
 * Get session summary information
 * 
 * @param session - Session to summarize
 * @returns Session summary
 */
export function getSessionSummary(session: Session): {
  sessionId: string;
  userId: string;
  state: SessionState;
  createdAt: Date;
  expiresAt: Date;
  lastActivityAt: Date;
  timeRemaining: number;
  idleTime: number;
  isExpiringSoon: boolean;
} {
  return {
    sessionId: session.id,
    userId: session.userId,
    state: getSessionState(session),
    createdAt: session.createdAt,
    expiresAt: session.expiresAt,
    lastActivityAt: session.lastActivityAt,
    timeRemaining: getSessionTimeRemaining(session),
    idleTime: getSessionIdleTime(session),
    isExpiringSoon: isSessionExpiringSoon(session),
  };
}

/**
 * Compare two sessions
 * 
 * @param session1 - First session
 * @param session2 - Second session
 * @returns true if sessions are the same, false otherwise
 */
export function areSessionsEqual(session1: Session, session2: Session): boolean {
  return session1.id === session2.id;
}

/**
 * Get session duration (in seconds)
 * 
 * @param session - Session to measure
 * @returns Session duration in seconds
 */
export function getSessionDuration(session: Session): number {
  const duration = session.maxExpiresAt.getTime() - session.createdAt.getTime();
  return Math.ceil(duration / 1000);
}

/**
 * Get session age (in seconds)
 * 
 * @param session - Session to measure
 * @returns Session age in seconds
 */
export function getSessionAge(session: Session): number {
  const now = new Date();
  const age = now.getTime() - session.createdAt.getTime();
  return Math.ceil(age / 1000);
}
