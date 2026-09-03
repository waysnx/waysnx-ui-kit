/**
 * AccessDenied Component
 * 
 * User-friendly error screen for access denied scenarios.
 */

import React from 'react';
import { Button } from '@waysnx/ui-core';
import { Stack } from '@waysnx/ui-layout';

export interface AccessDeniedProps {
  /**
   * Access denied reason
   */
  reason?: string;
  /**
   * Additional details
   */
  details?: string;
  /**
   * Button label for going back
   */
  backLabel?: string;
  /**
   * Callback when back button is clicked
   */
  onBack?: () => void;
  /**
   * Button label for contacting support
   */
  supportLabel?: string;
  /**
   * Callback when support button is clicked
   */
  onSupport?: () => void;
  /**
   * Additional CSS class
   */
  className?: string;
}

const MUTED = 'var(--wx-color-text-muted, #717182)';

/**
 * AccessDenied - Screen for access denied errors
 */
export const AccessDenied: React.FC<AccessDeniedProps> = ({
  reason = "You don't have permission to access this resource",
  details,
  backLabel = 'Go Back',
  onBack,
  supportLabel = 'Contact Support',
  onSupport,
  className,
}) => {
  return (
    <div
      className={className}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 400, padding: 16 }}
    >
      <div style={{ maxWidth: 400, textAlign: 'center' }}>
        <div style={{ marginBottom: 16 }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--wx-color-danger, #d4183d)', marginBottom: 12 }}>
            Access Denied
          </h2>
          <span style={{ display: 'block', fontSize: '1rem', color: MUTED, marginBottom: 8 }}>
            {reason}
          </span>
          {details && (
            <span style={{ display: 'block', fontSize: '0.875rem', color: MUTED }}>
              {details}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Stack gap="md" direction="horizontal">
            {onBack && (
              <Button variant="outline" onClick={onBack}>
                {backLabel}
              </Button>
            )}
            {onSupport && (
              <Button variant="primary" onClick={onSupport}>
                {supportLabel}
              </Button>
            )}
          </Stack>
        </div>
      </div>
    </div>
  );
};

AccessDenied.displayName = 'AccessDenied';

export default AccessDenied;
