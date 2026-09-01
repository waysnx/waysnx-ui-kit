/**
 * ConcurrentSessionDialog Component
 * 
 * Dialog shown when detecting concurrent session login from different device/location.
 * Allows user to approve or reject the new session.
 */

import React from 'react';
import { Button } from '@waysnx/ui-core';
import { Modal } from '@waysnx/ui-feedback';
import { Stack } from '@waysnx/ui-layout';
import { Badge } from '@waysnx/ui-feedback';
import type { SessionInfo } from '../../types/session';

export interface ConcurrentSessionDialogProps {
  [key: string]: any;
  /**
   * Whether dialog is open
   */
  isOpen: boolean;
  /**
   * New session attempting to login
   */
  newSession?: SessionInfo;
  /**
   * Current/existing session
   */
  currentSession?: SessionInfo;
  /**
   * Callback to approve new session (and end current)
   */
  onApprove?: () => Promise<void>;
  /**
   * Callback to reject new session
   */
  onReject?: () => Promise<void>;
  /**
   * Whether operation is in progress
   */
  isLoading?: boolean;
  /**
   * Custom dialog title
   */
  title?: string;
}

/**
 * ConcurrentSessionDialog - Alert user about new concurrent session login
 */
export const ConcurrentSessionDialog: React.FC<ConcurrentSessionDialogProps> = ({
  isOpen,
  newSession,
  currentSession,
  onApprove,
  onReject,
  isLoading = false,
  title = 'New Login Detected',
}) => {
  const handleApprove = async () => {
    await onApprove?.();
  };

  const handleReject = async () => {
    await onReject?.();
  };

  const formatSessionInfo = (session: SessionInfo | undefined) => {
    if (!session) return null;

    return (
      <div
        style={{
          padding: '1rem',
          backgroundColor: 'var(--color-background-alt, #f9f9f9)',
          borderRadius: '0.375rem',
          marginBottom: '1rem',
        }}
      >
        <Stack gap="sm">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold' }}>{session.deviceInfo?.['name'] || 'Unknown' || 'Unknown Device'}</span>
            {session.ipAddress && (
              <Badge>{session.ipAddress}</Badge>
            )}
          </div>

          {session.userAgent && (
            <span style={{ fontSize: '0.875rem', color: 'var(--color-muted, #666)' }}>
              {session.userAgent}
            </span>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
            <span style={{ color: 'var(--color-muted, #666)' }}>Time:</span>
            <span>
              {session.createdAt
                ? new Date(session.createdAt).toLocaleString()
                : 'Unknown'}
            </span>
          </div>

          {session.metadata?.['location'] && (
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
              <span style={{ color: 'var(--color-muted, #666)' }}>Location:</span>
              <span>{session.metadata?.['location']}</span>
            </div>
          )}
        </Stack>
      </div>
    );
  };

  return (
    <Modal open={isOpen} onClose={handleReject}>
      <div style={{ padding: '1.5rem' }}>
        <span style={{ display: 'block', fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          {title}
        </span>

        <span style={{ display: 'block', fontSize: '1rem', color: 'var(--color-muted, #666)', marginBottom: '1.5rem' }}>
          We detected a login from a new device or location. If this wasn't you, we
          recommend rejecting this login to protect your account.
        </span>

        {/* New Session Info */}
        {newSession && (
          <div style={{ marginBottom: '1.5rem' }}>
            <span style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--color-warning, #856404)' }}>
              New Login From:
            </span>
            {formatSessionInfo(newSession)}
          </div>
        )}

        {/* Current Session Info */}
        {currentSession && (
          <div style={{ marginBottom: '1.5rem' }}>
            <span style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--color-info, #0c5460)' }}>
              Your Current Session:
            </span>
            {formatSessionInfo(currentSession)}
          </div>
        )}

        {/* Warning Box */}
        <div
          style={{
            padding: '1rem',
            backgroundColor: 'var(--color-warning, #fff3cd)',
            borderRadius: '0.375rem',
            marginBottom: '1.5rem',
            borderLeft: '4px solid var(--color-warning, #ffc107)',
          }}
        >
          <span style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>
            ⚠️ Security Notice
          </span>
          <span style={{ fontSize: '0.875rem' }}>
            If you don't recognize this login, reject it immediately. Your current session
            will remain active.
          </span>
        </div>

        {/* Action Buttons */}
        <Stack gap="md" direction="row" justifyContent="flex-end">
          <Button
            variant="outline"
            onClick={handleReject}
            disabled={isLoading}
          >
            Reject Login
          </Button>
          <Button
            variant="primary"
            onClick={handleApprove}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Approve & Continue'}
          </Button>
        </Stack>
      </div>
    </Modal>
  );
};

ConcurrentSessionDialog.displayName = 'ConcurrentSessionDialog';

export default ConcurrentSessionDialog;
