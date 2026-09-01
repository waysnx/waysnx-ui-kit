/**
 * useIdleDetection Hook
 *
 * Detects user inactivity and triggers callbacks
 */

import { useEffect, useRef, useCallback, useState } from 'react';

export interface UseIdleDetectionOptions {
  /**
   * Idle timeout in milliseconds
   */
  idleTimeoutMs?: number;
  /**
   * Warning threshold in milliseconds
   */
  warningTimeoutMs?: number;
  /**
   * Callback when idle
   */
  onIdle?: () => void;
  /**
   * Callback for warning
   */
  onWarning?: () => void;
  /**
   * Callback when activity detected
   */
  onActive?: () => void;
  /**
   * Monitor page visibility
   */
  monitorPageVisibility?: boolean;
}

/**
 * useIdleDetection - Hook for detecting user inactivity
 */
export const useIdleDetection = ({
  idleTimeoutMs = 300000, // 5 minutes
  warningTimeoutMs = 240000, // 4 minutes
  onIdle,
  onWarning,
  onActive,
  monitorPageVisibility = true,
}: UseIdleDetectionOptions = {}) => {
  const [isIdle, setIsIdle] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(idleTimeoutMs);
  const lastActivityRef = useRef<number>(performance.now());
  const isIdleRef = useRef<boolean>(false);
  const warningTriggeredRef = useRef<boolean>(false);
  const isPageVisibleRef = useRef<boolean>(true);

  const recordActivity = useCallback(() => {
    lastActivityRef.current = performance.now();

    if (isIdleRef.current) {
      isIdleRef.current = false;
      warningTriggeredRef.current = false;
      setIsIdle(false);
      onActive?.();
    } else if (warningTriggeredRef.current) {
      warningTriggeredRef.current = false;
    }
  }, [onActive]);

  const handleVisibilityChange = useCallback(() => {
    isPageVisibleRef.current = document.visibilityState === 'visible';
    if (isPageVisibleRef.current) {
      recordActivity();
    }
  }, [recordActivity]);

  // Monitor idle state
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPageVisibleRef.current) return;

      const timeSinceActivity = performance.now() - lastActivityRef.current;

      setTimeRemaining(Math.max(0, idleTimeoutMs - timeSinceActivity));

      // Check idle state
      if (timeSinceActivity >= idleTimeoutMs && !isIdleRef.current) {
        isIdleRef.current = true;
        setIsIdle(true);
        onIdle?.();
      }

      // Check warning threshold
      if (
        timeSinceActivity >= warningTimeoutMs &&
        !warningTriggeredRef.current &&
        !isIdleRef.current
      ) {
        warningTriggeredRef.current = true;
        onWarning?.();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [idleTimeoutMs, warningTimeoutMs, onIdle, onWarning]);

  // Monitor user input
  useEffect(() => {
    const events = ['mousedown', 'keydown', 'touchstart', 'click'];
    events.forEach(event => {
      document.addEventListener(event, recordActivity, { passive: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, recordActivity);
      });
    };
  }, [recordActivity]);

  // Monitor page visibility
  useEffect(() => {
    if (monitorPageVisibility) {
      document.addEventListener('visibilitychange', handleVisibilityChange);
      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    }
  }, [monitorPageVisibility, handleVisibilityChange]);

  return {
    isIdle,
    timeRemaining,
    recordActivity,
  };
};

export default useIdleDetection;
