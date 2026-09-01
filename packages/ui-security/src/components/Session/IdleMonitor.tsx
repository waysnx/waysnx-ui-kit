/**
 * IdleMonitor Component
 * 
 * Detects user inactivity and triggers callbacks at configurable idle thresholds.
 * Uses browser APIs: Page Visibility, Mouse/Keyboard events, requestAnimationFrame
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';

export interface IdleMonitorProps {
  [key: string]: any;
  /**
   * Time in milliseconds before marking as idle
   * @default 300000 (5 minutes)
   */
  idleTimeoutMs?: number;
  /**
   * Time in milliseconds before warning about idle
   * @default 240000 (4 minutes)
   */
  warningTimeoutMs?: number;
  /**
   * Callback when user becomes idle
   */
  onIdle?: () => void;
  /**
   * Callback when idle warning is triggered
   */
  onIdleWarning?: () => void;
  /**
   * Callback when user returns from idle
   */
  onActive?: () => void;
  /**
   * Whether to monitor page visibility (tab/window focus)
   * @default true
   */
  monitorPageVisibility?: boolean;
  /**
   * Whether to monitor user input (keyboard/mouse)
   * @default true
   */
  monitorUserInput?: boolean;
}

/**
 * IdleMonitor - Invisible component that tracks user activity and inactivity
 * 
 * Detects idle state using:
 * - Mouse/keyboard events
 * - Page visibility changes
 * - requestAnimationFrame for efficient idle timeout checking
 */
export const IdleMonitor: React.FC<IdleMonitorProps> = ({
  idleTimeoutMs = 300000, // 5 minutes
  warningTimeoutMs = 240000, // 4 minutes
  onIdle,
  onIdleWarning,
  onActive,
  monitorPageVisibility = true,
  monitorUserInput = true,
}) => {
  const lastActivityTimeRef = useRef<number>(performance.now());
  const isIdleRef = useRef<boolean>(false);
  const warningTriggeredRef = useRef<boolean>(false);
  const raFrameIdRef = useRef<number | null>(null);
  const isPageVisibleRef = useRef<boolean>(true);

  // Reset activity time and return from idle if needed
  const recordActivity = useCallback(() => {
    lastActivityTimeRef.current = performance.now();

    if (isIdleRef.current) {
      isIdleRef.current = false;
      warningTriggeredRef.current = false;
      onActive?.();
    } else if (warningTriggeredRef.current) {
      warningTriggeredRef.current = false;
    }
  }, [onActive]);

  // Handle page visibility changes
  const handleVisibilityChange = useCallback(() => {
    const isVisible = document.visibilityState === 'visible';
    isPageVisibleRef.current = isVisible;

    if (isVisible) {
      // Page became visible, treat as activity
      recordActivity();
    }
  }, [recordActivity]);

  // Monitor idle state using requestAnimationFrame for efficiency
  useEffect(() => {
    const checkIdleState = () => {
      if (!isPageVisibleRef.current) {
        // Don't update idle state while page is hidden
        raFrameIdRef.current = requestAnimationFrame(checkIdleState);
        return;
      }

      const timeSinceActivity = performance.now() - lastActivityTimeRef.current;

      // Check for idle state
      if (timeSinceActivity >= idleTimeoutMs && !isIdleRef.current) {
        isIdleRef.current = true;
        onIdle?.();
      }

      // Check for warning threshold
      if (
        timeSinceActivity >= warningTimeoutMs &&
        !warningTriggeredRef.current &&
        !isIdleRef.current
      ) {
        warningTriggeredRef.current = true;
        onIdleWarning?.();
      }

      raFrameIdRef.current = requestAnimationFrame(checkIdleState);
    };

    raFrameIdRef.current = requestAnimationFrame(checkIdleState);

    return () => {
      if (raFrameIdRef.current !== null) {
        cancelAnimationFrame(raFrameIdRef.current);
      }
    };
  }, [idleTimeoutMs, warningTimeoutMs, onIdle, onIdleWarning]);

  // Monitor user input events
  useEffect(() => {
    if (!monitorUserInput) return;

    const handleUserInput = () => recordActivity();

    const events = ['mousedown', 'keydown', 'touchstart', 'click'];
    events.forEach(event => {
      document.addEventListener(event, handleUserInput, { passive: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserInput);
      });
    };
  }, [monitorUserInput, recordActivity]);

  // Monitor page visibility
  useEffect(() => {
    if (!monitorPageVisibility) return;

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [monitorPageVisibility, handleVisibilityChange]);

  // This is an invisible monitoring component
  return null;
};

IdleMonitor.displayName = 'IdleMonitor';

export default IdleMonitor;
