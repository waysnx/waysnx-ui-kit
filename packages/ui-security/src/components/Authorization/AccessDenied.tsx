/**
 * AccessDenied Component
 * 
 * User-friendly error screen for access denied scenarios.
 */

import React from 'react';
import { Button } from '@waysnx/ui-core';
import { Stack } from '@waysnx/ui-layout';

export interface AccessDeniedProps {
  [key: string]: any;
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
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="400px"
      padding="lg"
    >
      <div maxWidth="400px" textAlign="center">
        <div marginBottom="lg">
          <span as="h2" fontSize="2xl" fontWeight="bold" color="error" marginBottom="md">
            Access Denied
          </span>
          <span fontSize="base" color="muted" marginBottom="sm">
            {reason}
          </span>
          {details && (
            <span fontSize="sm" color="muted">
              {details}
            </span>
          )}
        </div>

        <Stack gap="md" direction="row" justifyContent="center">
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
  );
};

AccessDenied.displayName = 'AccessDenied';

export default AccessDenied;
