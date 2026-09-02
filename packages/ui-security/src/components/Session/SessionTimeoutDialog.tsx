/**
 * SessionTimeoutDialog Component
 * 
 * Modal dialog warning user about impending session timeout.
 */

import React, { useState, useEffect } from 'react';
import { Button } from '@waysnx/ui-core';
import { Modal } from '@waysnx/ui-feedback';
import { Stack } from '@waysnx/ui-layout';

export interface SessionTimeoutDialogProps {
  /**
   * Whether dialog is open
   */
  isOpen: boolean;
  /**
   * Minutes until session timeout
   */
  minutesRemaining?: number;
  /**
   * Callback to extend session
   */
  onExtend?: () => void;
  /**
   * Callback to logout
   */
  onLogout?: () => void;
  /**
   * Warning title
   */
  title?: string;
  /**
   * Warning message
   */
  message?: string;
}

/**
 * SessionTimeoutDialog - Warning dialog for session timeout
 */
export const SessionTimeoutDialog: React.FC<SessionTimeoutDialogProps> = ({
  isOpen,
  minutesRemaining = 5,
  onExtend,
  onLogout,
  title = 'Session Expiring Soon',
  message,
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState(minutesRemaining * 60);

  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      setSecondsRemaining(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen]);

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  return (
    <Modal open={isOpen} onClose={onLogout}>
      <div style={{ padding: '1.5rem' }}>
        <span style={{ display: 'block', fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          {title}
        </span>

        <span style={{ display: 'block', fontSize: '1rem', color: 'var(--color-muted, #666)', marginBottom: '1.5rem' }}>
          {message ||
            `Your session will expire in ${minutes}:${seconds.toString().padStart(2, '0')} minutes. Would you like to continue your session?`}
        </span>

        <div
          style={{
            padding: '1rem',
            backgroundColor: 'var(--color-warning, #fff3cd)',
            borderRadius: '0.375rem',
            marginBottom: '1.5rem',
            textAlign: 'center',
          }}
        >
          <span style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>
            {minutes}:{seconds.toString().padStart(2, '0')}
          </span>
        </div>

        <Stack gap="md" direction="row" justifyContent="flex-end">
          {onLogout && (
            <Button variant="outline" onClick={onLogout}>
              Logout
            </Button>
          )}
          {onExtend && (
            <Button variant="primary" onClick={onExtend}>
              Continue Session
            </Button>
          )}
        </Stack>
      </div>
    </Modal>
  );
};

SessionTimeoutDialog.displayName = 'SessionTimeoutDialog';

export default SessionTimeoutDialog;
