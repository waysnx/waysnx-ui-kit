/**
 * UnauthorizedPage Component
 * 
 * Full-page unauthorized error screen.
 */

import React from 'react';
import { Button } from '@waysnx/ui-core';
import { Stack } from '@waysnx/ui-layout';

export interface UnauthorizedPageProps {
  /**
   * Page title
   */
  title?: string;
  /**
   * Error message
   */
  message?: string;
  /**
   * Error code to display
   */
  statusCode?: number | string;
  /**
   * Callback for login button
   */
  onLogin?: () => void;
  /**
   * Callback for home button
   */
  onHome?: () => void;
  /**
   * Additional CSS class
   */
  className?: string;
}

/**
 * UnauthorizedPage - Full page unauthorized error screen
 */
export const UnauthorizedPage: React.FC<UnauthorizedPageProps> = ({
  title = 'Unauthorized',
  message = 'You are not authorized to access this page. Please log in with an authorized account.',
  statusCode = 401,
  onLogin,
  onHome,
  className,
}) => {
  return (
    <div
      className={className}
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      padding="lg"
      backgroundColor="background"
    >
      <div maxWidth="500px" textAlign="center">
        {/* Status Code */}
        <div marginBottom="2xl">
          <span as="div" fontSize="5xl" fontWeight="bold" color="error" marginBottom="md">
            {statusCode}
          </span>
          <span as="h1" fontSize="2xl" fontWeight="bold" marginBottom="md">
            {title}
          </span>
          <span fontSize="base" color="muted" lineHeight="relaxed">
            {message}
          </span>
        </div>

        {/* Actions */}
        <Stack gap="md" direction="row" justifyContent="center">
          {onLogin && (
            <Button variant="primary" onClick={onLogin}>
              Log In
            </Button>
          )}
          {onHome && (
            <Button variant="outline" onClick={onHome}>
              Go Home
            </Button>
          )}
        </Stack>

        {/* Additional Info */}
        <div marginTop="2xl" paddingTop="2xl" borderTop="1px solid">
          <span fontSize="xs" color="muted">
            If you believe this is an error, please contact support.
          </span>
        </div>
      </div>
    </div>
  );
};

UnauthorizedPage.displayName = 'UnauthorizedPage';

export default UnauthorizedPage;
