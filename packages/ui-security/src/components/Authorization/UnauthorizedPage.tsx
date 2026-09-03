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
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: 16,
        background: 'var(--wx-color-background, #ffffff)',
      }}
    >
      <div style={{ maxWidth: '500px', textAlign: 'center' }}>
        {/* Status Code */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--wx-color-danger, #d4183d)', marginBottom: 12 }}>
            {statusCode}
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 12 }}>
            {title}
          </h1>
          <span style={{ display: 'block', fontSize: '1rem', color: 'var(--wx-color-text-muted, #717182)', lineHeight: 1.625 }}>
            {message}
          </span>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Stack gap="md" direction="horizontal">
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
        </div>

        {/* Additional Info */}
        <div style={{ marginTop: 32, paddingTop: 32, borderTop: '1px solid var(--wx-color-border, #ccc)' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--wx-color-text-muted, #717182)' }}>
            If you believe this is an error, please contact support.
          </span>
        </div>
      </div>
    </div>
  );
};

UnauthorizedPage.displayName = 'UnauthorizedPage';

export default UnauthorizedPage;
