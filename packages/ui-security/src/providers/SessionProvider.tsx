/**
 * SessionProvider
 *
 * Context provider for session management and timeout handling
 */

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import type { SessionService } from '../services/SessionService';
import type { SessionInfo } from '../types/session';

export interface SessionContextValue {
  sessions: SessionInfo[];
  currentSession: SessionInfo | null;
  isIdle: boolean;
  idleTimeRemaining: number;
  extendSession: () => Promise<void>;
  terminateSession: (sessionId: string) => Promise<void>;
  terminateAllOtherSessions: () => Promise<void>;
  markActivity: () => void;
}

const SessionContext = createContext<SessionContextValue | undefined>(undefined);

export interface SessionProviderProps {
  children: ReactNode;
  sessionService: SessionService;
  idleTimeoutMs?: number;
  warningTimeoutMs?: number;
  onSessionExpire?: () => void;
  onIdleWarning?: () => void;
}

/**
 * SessionProvider - Manages session state and idle detection
 */
export const SessionProvider: React.FC<SessionProviderProps> = ({
  children,
  sessionService: _sessionService,
  idleTimeoutMs = 300000, // 5 minutes
  warningTimeoutMs = 240000, // 4 minutes
  onSessionExpire,
  onIdleWarning,
}) => {
  const [sessions, setSessions] = useState<SessionInfo[]>([]);
  const [currentSession, _setCurrentSession] = useState<SessionInfo | null>(null);
  const [isIdle, setIsIdle] = useState(false);
  const [idleTimeRemaining, setIdleTimeRemaining] = useState(idleTimeoutMs);
  const lastActivityRef = React.useRef<number>(Date.now());

  const markActivity = useCallback(() => {
    lastActivityRef.current = Date.now();
    setIsIdle(false);
    setIdleTimeRemaining(idleTimeoutMs);
  }, [idleTimeoutMs]);

  const extendSession = useCallback(async () => {
    markActivity();
    try {
      // Call service to extend session
    } catch (error) {
      console.error('Failed to extend session:', error);
    }
  }, [markActivity]);

  const terminateSession = useCallback(
    async (sessionId: string) => {
      try {
        // Call service to terminate session
        setSessions(prev => prev.filter(s => s.id !== sessionId));
      } catch (error) {
        console.error('Failed to terminate session:', error);
      }
    },
    []
  );

  const terminateAllOtherSessions = useCallback(async () => {
    try {
      // Call service to terminate all other sessions
      if (currentSession) {
        setSessions([currentSession]);
      }
    } catch (error) {
      console.error('Failed to terminate other sessions:', error);
    }
  }, [currentSession]);

  // Monitor idle state
  useEffect(() => {
    const interval = setInterval(() => {
      const timeSinceActivity = Date.now() - lastActivityRef.current;
      const remaining = Math.max(0, idleTimeoutMs - timeSinceActivity);

      setIdleTimeRemaining(remaining);

      // Check for warning threshold
      if (timeSinceActivity >= warningTimeoutMs && !isIdle) {
        onIdleWarning?.();
      }

      // Check for idle state
      if (timeSinceActivity >= idleTimeoutMs && !isIdle) {
        setIsIdle(true);
        onSessionExpire?.();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [idleTimeoutMs, warningTimeoutMs, isIdle, onIdleWarning, onSessionExpire]);

  // Setup activity listeners
  useEffect(() => {
    const handleActivity = () => markActivity();

    const events = ['mousedown', 'keydown', 'touchstart', 'click'];
    events.forEach(event => {
      document.addEventListener(event, handleActivity, { passive: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity);
      });
    };
  }, [markActivity]);

  const value: SessionContextValue = {
    sessions,
    currentSession,
    isIdle,
    idleTimeRemaining,
    extendSession,
    terminateSession,
    terminateAllOtherSessions,
    markActivity,
  };

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};

/**
 * useSession - Hook to access session context
 */
export const useSession = (): SessionContextValue => {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error('useSession must be used within SessionProvider');
  }

  return context;
};

export default SessionProvider;
