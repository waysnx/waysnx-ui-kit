/**
 * @file services/SessionService.ts
 * Session management and idle timeout service
 * 
 * Manages session lifecycle, activity tracking, idle detection, and concurrent sessions.
 * Provides session renewal, timeout warnings, and activity monitoring.
 * 
 * @example
 * ```tsx
 * const sessionService = new SessionService({
 *   maxDuration: 28800000, // 8 hours
 *   idleTimeout: 900000, // 15 minutes
 *   trackActivity: true,
 * });
 * 
 * // Create session
 * const session = sessionService.createSession('user123', 'device-id');
 * 
 * // Track activity
 * sessionService.recordActivity('session-id', 'user_action');
 * 
 * // Check idle
 * const idle = sessionService.isIdle('session-id');
 * 
 * // Get session info
 * const info = sessionService.getSessionInfo('session-id');
 * ```
 */

import {
  SessionConfig,
  SessionInfo,
  SessionActivity,
  IdleTimeoutState,
  SessionTimeoutWarning,
  SessionRenewalResult,
  ActiveSession,
  SessionEvent,
  SessionEventType,
  KeepAliveConfig,
  SessionCountdownState,
  SessionLockState,
  SessionValidationResult,
} from '../types/session';
import { generateSecureId } from '../utils/crypto';

/**
 * Session service configuration
 */
interface SessionServiceConfig extends SessionConfig {
  keepAliveConfig?: KeepAliveConfig;
  enableConcurrentSessions?: boolean;
  sessionStorageType?: 'memory' | 'localStorage';
}

/**
 * Session storage item
 */
interface StoredSession {
  session: SessionInfo;
  activities: SessionActivity[];
  events: SessionEvent[];
  locked: boolean;
}

/**
 * Session service
 */
export class SessionService {
  private config: SessionServiceConfig;
  private sessions = new Map<string, StoredSession>();
  private sessionsByUserId = new Map<string, Set<string>>();
  private activityListeners = new Map<string, ((activity: SessionActivity) => void)[]>();
  private timeoutListeners = new Map<string, ((warning: SessionTimeoutWarning) => void)[]>();
  private expiryTimers = new Map<string, number>();
  private idleTimers = new Map<string, number>();

  constructor(config: SessionServiceConfig) {
    this.config = {
      maxDuration: config.maxDuration || 28800000, // 8 hours
      idleTimeout: config.idleTimeout || 900000, // 15 minutes
      renewalThreshold: config.renewalThreshold || 300000, // 5 minutes before expiry
      allowConcurrentSessions: config.allowConcurrentSessions !== false,
      maxConcurrentSessions: config.maxConcurrentSessions || 5,
      trackActivity: config.trackActivity !== false,
      warningTime: config.warningTime || 300000, // 5 minutes before expiry
      logoutOnExpiry: config.logoutOnExpiry !== false,
      keepAliveConfig: config.keepAliveConfig || {
        enabled: false,
        interval: 60000,
        method: 'ping',
        failureThreshold: 3,
        retryAttempts: 2,
        retryDelay: 5000,
      },
      enableConcurrentSessions: config.enableConcurrentSessions !== false,
      sessionStorageType: config.sessionStorageType || 'memory',
    };
  }

  /**
   * Create new session
   */
  createSession(
    userId: string,
    deviceInfo?: Record<string, any>
  ): SessionInfo {
    const sessionId = this.generateSessionId();
    const now = new Date();
    const expiresAt = new Date(now.getTime() + this.config.maxDuration);
    const idleExpiresAt = new Date(now.getTime() + this.config.idleTimeout);

    const session: SessionInfo = {
      id: sessionId,
      userId,
      createdAt: now,
      expiresAt,
      lastActivityAt: now,
      idleExpiresAt,
      maxExpiresAt: expiresAt,
      isActive: true,
      sessionStartTime: now,
      remainingTime: this.config.maxDuration,
      sessionDuration: this.config.maxDuration,
      idleDuration: this.config.idleTimeout,
      deviceInfo,
      metadata: {},
    };

    // Check concurrent sessions
    if (!this.config.allowConcurrentSessions) {
      const userSessions = this.sessionsByUserId.get(userId) || new Set();
      if (userSessions.size > 0) {
        // Revoke existing sessions
        userSessions.forEach(sessionId => this.revokeSession(sessionId));
      }
    } else if (this.config.maxConcurrentSessions) {
      const userSessions = this.sessionsByUserId.get(userId) || new Set();
      if (userSessions.size >= this.config.maxConcurrentSessions) {
        // Revoke oldest session
        const oldestSessionId = userSessions.values().next().value;
        if (oldestSessionId) {
          this.revokeSession(oldestSessionId);
        }
      }
    }

    // Store session
    this.sessions.set(sessionId, {
      session,
      activities: [],
      events: [],
      locked: false,
    });

    // Track user sessions
    const userSessions = this.sessionsByUserId.get(userId) || new Set();
    userSessions.add(sessionId);
    this.sessionsByUserId.set(userId, userSessions);

    // Set up expiry timer
    this.setupExpiryTimer(sessionId);
    this.setupIdleTimer(sessionId);

    // Record event
    this.recordEvent(sessionId, 'session_created', {
      userId,
      timestamp: now,
    });

    return session;
  }

  /**
   * Get session info
   */
  getSessionInfo(sessionId: string): SessionInfo | null {
    const stored = this.sessions.get(sessionId);
    if (!stored) {
      return null;
    }

    const session = stored.session;
    const now = new Date();
    
    // Update remaining time
    session.remainingTime = Math.max(0, session.expiresAt.getTime() - now.getTime());
    session.idleDuration = Math.max(0, session.idleExpiresAt.getTime() - now.getTime());

    return session;
  }

  /**
   * Validate session
   */
  validateSession(sessionId: string): SessionValidationResult {
    const stored = this.sessions.get(sessionId);
    
    if (!stored) {
      return {
        isValid: false,
        reason: 'Session not found',
      };
    }

    const session = stored.session;
    const now = new Date();

    if (!session.isActive) {
      return {
        isValid: false,
        reason: 'Session is inactive',
      };
    }

    if (now > session.expiresAt) {
      session.isActive = false;
      return {
        isValid: false,
        reason: 'Session expired',
        shouldRefresh: false,
      };
    }

    if (now > session.idleExpiresAt) {
      session.isActive = false;
      return {
        isValid: false,
        reason: 'Session idle timeout',
        shouldRefresh: false,
      };
    }

    // Check if should refresh
    const shouldRefresh = (session.expiresAt.getTime() - now.getTime()) < (this.config.renewalThreshold || 300000);

    return {
      isValid: true,
      session,
      shouldRefresh,
    };
  }

  /**
   * Record session activity
   */
  recordActivity(
    sessionId: string,
    type: 'user_action' | 'page_focus' | 'network_request' | 'keyboard' | 'mouse' | 'touch',
    details?: Record<string, any>
  ): boolean {
    const stored = this.sessions.get(sessionId);
    if (!stored) {
      return false;
    }

    const now = new Date();
    const activity: SessionActivity = {
      timestamp: now,
      type,
      details,
    };

    stored.activities.push(activity);

    // Update idle timer
    const session = stored.session;
    session.lastActivityAt = now;
    session.idleExpiresAt = new Date(now.getTime() + this.config.idleTimeout);

    // Reset idle timer
    this.resetIdleTimer(sessionId);

    // Notify listeners
    const listeners = this.activityListeners.get(sessionId) || [];
    listeners.forEach(listener => listener(activity));

    return true;
  }

  /**
   * Check if session is idle
   */
  isIdle(sessionId: string): boolean {
    const stored = this.sessions.get(sessionId);
    if (!stored) {
      return false;
    }

    const now = new Date();
    return now > stored.session.idleExpiresAt;
  }

  /**
   * Get idle timeout state
   */
  getIdleState(sessionId: string): IdleTimeoutState {
    const stored = this.sessions.get(sessionId);
    if (!stored) {
      return {
        isIdle: true,
        idleTime: 0,
        remainingIdleTime: 0,
        lastActivityTime: new Date(),
        warningIssued: false,
      };
    }

    const now = new Date();
    const session = stored.session;
    const isIdle = now > session.idleExpiresAt;
    const remainingIdleTime = Math.max(0, session.idleExpiresAt.getTime() - now.getTime());
    const idleTime = this.config.idleTimeout - remainingIdleTime;

    return {
      isIdle,
      idleTime,
      remainingIdleTime,
      lastActivityTime: session.lastActivityAt,
      warningIssued: remainingIdleTime < (this.config.warningTime || 300000),
    };
  }

  /**
   * Renew session
   */
  renewSession(sessionId: string): SessionRenewalResult {
    const stored = this.sessions.get(sessionId);
    if (!stored) {
      return {
        success: false,
        error: 'Session not found',
      };
    }

    const session = stored.session;
    const now = new Date();

    if (!session.isActive) {
      return {
        success: false,
        error: 'Session is inactive',
      };
    }

    // Extend expiry
    session.expiresAt = new Date(now.getTime() + this.config.maxDuration);
    session.idleExpiresAt = new Date(now.getTime() + this.config.idleTimeout);
    session.remainingTime = this.config.maxDuration;
    session.lastActivityAt = now;

    // Reset timers
    this.resetExpiryTimer(sessionId);
    this.resetIdleTimer(sessionId);

    // Record event
    this.recordEvent(sessionId, 'session_renewed', {
      timestamp: now,
    });

    return {
      success: true,
      session,
    };
  }

  /**
   * Revoke session
   */
  revokeSession(sessionId: string): boolean {
    const stored = this.sessions.get(sessionId);
    if (!stored) {
      return false;
    }

    const session = stored.session;
    session.isActive = false;

    // Clear timers
    this.clearExpiryTimer(sessionId);
    this.clearIdleTimer(sessionId);

    // Record event
    this.recordEvent(sessionId, 'session_revoked', {
      timestamp: new Date(),
    });

    return true;
  }

  /**
   * Logout - revoke all sessions for user
   */
  logoutUser(userId: string): number {
    const userSessions = this.sessionsByUserId.get(userId);
    if (!userSessions) {
      return 0;
    }

    let count = 0;
    userSessions.forEach(sessionId => {
      if (this.revokeSession(sessionId)) {
        count++;
      }
    });

    this.sessionsByUserId.delete(userId);

    return count;
  }

  /**
   * Get active sessions for user
   */
  getActiveSessions(userId: string): ActiveSession[] {
    const userSessions = this.sessionsByUserId.get(userId) || new Set();
    const active: ActiveSession[] = [];

    userSessions.forEach(sessionId => {
      const session = this.getSessionInfo(sessionId);
      if (session && session.isActive) {
        active.push({
          id: sessionId,
          deviceName: session.deviceInfo?.deviceInfo?.['name'] || 'Unknown' || 'Unknown',
          deviceType: (session.deviceInfo?.deviceType as any) || 'unknown',
          os: session.deviceInfo?.os || 'Unknown',
          browser: session.deviceInfo?.browser || 'Unknown',
          ipAddress: session.ipAddress || 'Unknown',
          location: session.deviceInfo?.metadata?.['location'],
          lastActivity: session.lastActivityAt,
          createdAt: session.createdAt,
          isCurrentSession: false,
          isTrusted: session.deviceInfo?.isTrusted || false,
        });
      }
    });

    return active;
  }

  /**
   * Lock session (require re-authentication)
   */
  lockSession(sessionId: string, reason?: string): boolean {
    const stored = this.sessions.get(sessionId);
    if (!stored) {
      return false;
    }

    stored.locked = true;
    this.recordEvent(sessionId, 'session_locked', {
      reason,
      timestamp: new Date(),
    });

    return true;
  }

  /**
   * Unlock session
   */
  unlockSession(sessionId: string): boolean {
    const stored = this.sessions.get(sessionId);
    if (!stored) {
      return false;
    }

    stored.locked = false;
    this.recordEvent(sessionId, 'session_unlocked', {
      timestamp: new Date(),
    });

    return true;
  }

  /**
   * Get lock state
   */
  getLockState(sessionId: string): SessionLockState {
    const stored = this.sessions.get(sessionId);
    if (!stored) {
      return {
        isLocked: false,
      };
    }

    return {
      isLocked: stored.locked,
    };
  }

  /**
   * Get session countdown state
   */
  getCountdownState(sessionId: string): SessionCountdownState {
    const stored = this.sessions.get(sessionId);
    if (!stored) {
      return {
        totalTime: 0,
        remainingTime: 0,
        percentRemaining: 0,
        isWarning: false,
        isCritical: false,
        isExpired: true,
        formattedTime: '00:00:00',
      };
    }

    const now = new Date();
    const session = stored.session;
    const remainingTime = Math.max(0, session.expiresAt.getTime() - now.getTime());
    const percentRemaining = Math.round((remainingTime / session.sessionDuration) * 100);
    const warningThreshold = this.config.warningTime || 300000;
    const isWarning = remainingTime < warningThreshold && remainingTime > 60000;
    const isCritical = remainingTime <= 60000 && remainingTime > 0;

    // Format time as HH:MM:SS
    const totalSeconds = Math.floor(remainingTime / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    return {
      totalTime: session.sessionDuration,
      remainingTime,
      percentRemaining,
      isWarning,
      isCritical,
      isExpired: remainingTime === 0,
      formattedTime,
    };
  }

  /**
   * Add timeout listener
   */
  onTimeout(sessionId: string, listener: (warning: SessionTimeoutWarning) => void): () => void {
    const listeners = this.timeoutListeners.get(sessionId) || [];
    listeners.push(listener);
    this.timeoutListeners.set(sessionId, listeners);

    // Return unsubscribe function
    return () => {
      const idx = listeners.indexOf(listener);
      if (idx > -1) {
        listeners.splice(idx, 1);
      }
    };
  }

  /**
   * Add activity listener
   */
  onActivity(sessionId: string, listener: (activity: SessionActivity) => void): () => void {
    const listeners = this.activityListeners.get(sessionId) || [];
    listeners.push(listener);
    this.activityListeners.set(sessionId, listeners);

    // Return unsubscribe function
    return () => {
      const idx = listeners.indexOf(listener);
      if (idx > -1) {
        listeners.splice(idx, 1);
      }
    };
  }

  /**
   * Get session events
   */
  getSessionEvents(sessionId: string): SessionEvent[] {
    const stored = this.sessions.get(sessionId);
    return stored?.events || [];
  }

  /**
   * Clear all sessions
   */
  clearAllSessions(): void {
    // Clear timers
    this.expiryTimers.forEach(timerId => clearTimeout(timerId));
    this.idleTimers.forEach(timerId => clearTimeout(timerId));

    // Clear storage
    this.sessions.clear();
    this.sessionsByUserId.clear();
    this.expiryTimers.clear();
    this.idleTimers.clear();
  }

  // Private helper methods

  /**
   * Generate unique session ID
   */
  private generateSessionId(): string {
    // Unpredictable session identifiers (Web Crypto) to resist session-guessing.
    return generateSecureId('session');
  }

  /**
   * Setup expiry timer
   */
  private setupExpiryTimer(sessionId: string): void {
    const stored = this.sessions.get(sessionId);
    if (!stored) {
      return;
    }

    const session = stored.session;
    const warningTime = this.config.warningTime || 300000;
    const now = new Date();
    const timeUntilWarning = session.expiresAt.getTime() - now.getTime() - warningTime;

    if (timeUntilWarning > 0) {
      const timerId = window.setTimeout(() => {
        // Emit warning
        const listeners = this.timeoutListeners.get(sessionId) || [];
        const warning: SessionTimeoutWarning = {
          type: 'warning',
          message: 'Your session will expire soon',
          remainingTime: warningTime,
          timestamp: new Date(),
        };
        listeners.forEach(listener => listener(warning));
      }, timeUntilWarning);

      this.expiryTimers.set(sessionId, timerId);
    }
  }

  /**
   * Reset expiry timer
   */
  private resetExpiryTimer(sessionId: string): void {
    this.clearExpiryTimer(sessionId);
    this.setupExpiryTimer(sessionId);
  }

  /**
   * Clear expiry timer
   */
  private clearExpiryTimer(sessionId: string): void {
    const timerId = this.expiryTimers.get(sessionId);
    if (timerId) {
      clearTimeout(timerId);
      this.expiryTimers.delete(sessionId);
    }
  }

  /**
   * Setup idle timer
   */
  private setupIdleTimer(sessionId: string): void {
    const stored = this.sessions.get(sessionId);
    if (!stored) {
      return;
    }

    const timerId = window.setTimeout(() => {
      const session = stored.session;
      session.isActive = false;

      // Emit timeout
      const listeners = this.timeoutListeners.get(sessionId) || [];
      const warning: SessionTimeoutWarning = {
        type: 'expired',
        message: 'Your session has expired due to inactivity',
        remainingTime: 0,
        timestamp: new Date(),
      };
      listeners.forEach(listener => listener(warning));

      this.recordEvent(sessionId, 'session_expired', {
        reason: 'idle',
        timestamp: new Date(),
      });
    }, this.config.idleTimeout);

    this.idleTimers.set(sessionId, timerId);
  }

  /**
   * Reset idle timer
   */
  private resetIdleTimer(sessionId: string): void {
    this.clearIdleTimer(sessionId);
    this.setupIdleTimer(sessionId);
  }

  /**
   * Clear idle timer
   */
  private clearIdleTimer(sessionId: string): void {
    const timerId = this.idleTimers.get(sessionId);
    if (timerId) {
      clearTimeout(timerId);
      this.idleTimers.delete(sessionId);
    }
  }

  /**
   * Record session event
   */
  private recordEvent(
    sessionId: string,
    eventType: SessionEventType,
    details?: Record<string, any>
  ): void {
    const stored = this.sessions.get(sessionId);
    if (!stored) {
      return;
    }

    const event: SessionEvent = {
      id: `event_${Date.now()}`,
      sessionId,
      userId: stored.session.userId,
      type: eventType,
      timestamp: new Date(),
      details,
    };

    stored.events.push(event);
  }
}

export default SessionService;
