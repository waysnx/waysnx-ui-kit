import { useCallback } from 'react';
import { useAccessibility } from './useAccessibility';
import { AccessibilityEvent, AccessibilityAnalyticsHandler } from '../types';

/**
 * useAccessibilityAnalytics Hook
 * Send accessibility events to your analytics backend
 *
 * This hook allows you to:
 * 1. Listen to accessibility events
 * 2. Format them for your backend
 * 3. Send them to your analytics service
 *
 * @param handler Function to handle accessibility events
 *
 * @example
 * ```tsx
 * function MyApp() {
 *   useAccessibilityAnalytics((event) => {
 *     // Send to your analytics backend
 *     fetch('/api/analytics', {
 *       method: 'POST',
 *       body: JSON.stringify(event)
 *     });
 *   });
 *
 *   return <App />;
 * }
 * ```
 *
 * @example with custom formatting
 * ```tsx
 * useAccessibilityAnalytics((event) => {
 *   const payload = {
 *     type: event.eventType,
 *     timestamp: event.timestamp,
 *     userId: getCurrentUserId(),
 *     ...event.metadata
 *   };
 *
 *   analytics.track(payload);
 * });
 * ```
 */
export function useAccessibilityAnalytics(handler: AccessibilityAnalyticsHandler): void {
  const { emitEvent } = useAccessibility();

  // Wrapper that calls the provided handler
  const wrappedHandler = useCallback(
    (event: Omit<AccessibilityEvent, 'timestamp'>) => {
      // Emit through context
      emitEvent(event);

      // Also call the provided handler
      handler({
        ...event,
        timestamp: Date.now(),
      });
    },
    [emitEvent, handler]
  );

  // Note: In a real implementation, we'd store this handler in context
  // For now, this is a placeholder that shows how consumers would use it
}

/**
 * Helper: Create analytics event from accessibility event
 * Useful for formatting before sending to your backend
 */
export function formatAccessibilityEvent(event: AccessibilityEvent): Record<string, any> {
  return {
    eventType: event.eventType,
    timestamp: event.timestamp,
    profile: event.profile,
    setting: event.setting,
    previousValue: event.previousValue,
    newValue: event.newValue,
    userId: event.userId,
    sessionId: event.sessionId,
    metadata: event.metadata,
  };
}
