/**
 * DeviceVerificationDialog Component
 * 
 * Device verification/trust dialog:
 * - Display device information
 * - Confirm device trust
 * - Security information
 * - Uses @waysnx/ui-feedback Modal and @waysnx/ui-core Button
 */

import React, { useCallback } from 'react';
import { Modal } from '@waysnx/ui-feedback';
import { Button } from '@waysnx/ui-core';
import { Alert } from '@waysnx/ui-feedback';
import type { DeviceInfo } from '../../types';

export interface DeviceVerificationDialogProps {
  [key: string]: any;
  /**
   * Whether dialog is open
   */
  open: boolean;

  /**
   * Callback to close dialog
   */
  onClose: () => void;

  /**
   * Device information to display
   */
  device?: DeviceInfo;

  /**
   * Callback when user approves device
   */
  onApprove: () => void | Promise<void>;

  /**
   * Callback when user rejects device
   */
  onReject: () => void | Promise<void>;

  /**
   * Loading state
   */
  loading?: boolean;

  /**
   * Error message
   */
  error?: string;

  /**
   * Title for the dialog
   */
  title?: string;

  /**
   * Description
   */
  description?: string;

  /**
   * Test ID
   */
  testId?: string;
}

/**
 * DeviceVerificationDialog Component
 */
export const DeviceVerificationDialog: React.FC<DeviceVerificationDialogProps> = ({
  open,
  onClose,
  device,
  onApprove,
  onReject,
  loading = false,
  error,
  title = 'Verify Device',
  description = 'We detected a sign-in from a new device. Please verify to continue.',
  testId,
}) => {
  const [isApproving, setIsApproving] = React.useState(false);
  const [isRejecting, setIsRejecting] = React.useState(false);

  const handleApprove = useCallback(async () => {
    setIsApproving(true);
    try {
      await onApprove();
      onClose();
    } catch (err) {
      console.error('Device approval error:', err);
    } finally {
      setIsApproving(false);
    }
  }, [onApprove, onClose]);

  const handleReject = useCallback(async () => {
    setIsRejecting(true);
    try {
      await onReject();
      onClose();
    } catch (err) {
      console.error('Device rejection error:', err);
    } finally {
      setIsRejecting(false);
    }
  }, [onReject, onClose]);

  const isProcessing = loading || isApproving || isRejecting;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
     
      showCloseButton={false}
      closeOnBackdrop={false}
      closeOnEscape={false}
      testId={testId}
      footer={
        <div className="waysnx-dialog-footer">
          <Button
            variant="secondary"
            onClick={handleReject}
            disabled={isProcessing}
            testId="device-reject"
          >
            {isRejecting ? 'Rejecting...' : 'Reject Device'}
          </Button>
          <Button
            variant="primary"
            onClick={handleApprove}
            disabled={isProcessing}
            testId="device-approve"
          >
            {isApproving ? 'Verifying...' : 'Trust This Device'}
          </Button>
        </div>
      }
    >
      <div className="waysnx-device-verification-content">
        {description && (
          <p className="waysnx-device-description">{description}</p>
        )}

        {error && (
          <Alert type="error" testId="device-error">
            {error}
          </Alert>
        )}

        {device && (
          <div className="waysnx-device-info">
            <h3 className="waysnx-device-info-title">Device Information</h3>

            <div className="waysnx-device-detail">
              <span className="waysnx-device-label">Browser:</span>
              <span className="waysnx-device-value">{device.browser || 'Unknown'}</span>
            </div>

            <div className="waysnx-device-detail">
              <span className="waysnx-device-label">Operating System:</span>
              <span className="waysnx-device-value">{device.os || 'Unknown'}</span>
            </div>

            <div className="waysnx-device-detail">
              <span className="waysnx-device-label">Resolution:</span>
              <span className="waysnx-device-value">{device.screenResolution || 'Unknown'}</span>
            </div>

            <div className="waysnx-device-detail">
              <span className="waysnx-device-label">Mobile:</span>
              <span className="waysnx-device-value">{device.isMobile ? 'Yes' : 'No'}</span>
            </div>

            <div className="waysnx-device-detail">
              <span className="waysnx-device-label">Timezone:</span>
              <span className="waysnx-device-value">{device.timezone || 'Unknown'}</span>
            </div>

            {device.userAgent && (
              <div className="waysnx-device-detail">
                <span className="waysnx-device-label">User Agent:</span>
                <span className="waysnx-device-value waysnx-device-value-small">
                  {device.userAgent}
                </span>
              </div>
            )}
          </div>
        )}

        <div className="waysnx-device-warning" role="status">
          <p className="waysnx-warning-text">
            Only trust this device if you recognize it. You can revoke trust at any time in your security settings.
          </p>
        </div>

        <div className="waysnx-device-security-tips">
          <h4 className="waysnx-security-tips-title">Security Tips</h4>
          <ul className="waysnx-security-tips-list">
            <li>Never trust shared or public computers</li>
            <li>Always verify the device before approving</li>
            <li>You can revoke device access anytime</li>
            <li>Enable MFA for additional security</li>
          </ul>
        </div>
      </div>

      <style>{`
        .waysnx-device-verification-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .waysnx-device-description {
          margin: 0;
          font-size: 0.875rem;
          color: var(--text-primary, #1f2937);
          line-height: 1.5;
        }

        .waysnx-device-info {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          padding: 1rem;
          background-color: var(--bg-secondary, #f3f4f6);
          border-radius: 0.375rem;
        }

        .waysnx-device-info-title {
          margin: 0;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary, #1f2937);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .waysnx-device-detail {
          display: flex;
          justify-content: space-between;
          font-size: 0.875rem;
          gap: 1rem;
        }

        .waysnx-device-label {
          font-weight: 500;
          color: var(--text-secondary, #6b7280);
          min-width: 120px;
        }

        .waysnx-device-value {
          color: var(--text-primary, #1f2937);
          text-align: right;
          word-break: break-word;
        }

        .waysnx-device-value-small {
          font-size: 0.75rem;
          font-family: monospace;
          max-width: 150px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .waysnx-device-warning {
          padding: 0.75rem;
          background-color: var(--warning-bg, #fef08a);
          border-left: 3px solid var(--warning-color, #eab308);
          border-radius: 0.25rem;
        }

        .waysnx-warning-text {
          margin: 0;
          font-size: 0.875rem;
          color: var(--warning-text, #713f12);
          line-height: 1.5;
        }

        .waysnx-device-security-tips {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding: 0.75rem;
          background-color: var(--info-bg, #dbeafe);
          border-radius: 0.375rem;
        }

        .waysnx-security-tips-title {
          margin: 0;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--info-text, #0c4a6e);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .waysnx-security-tips-list {
          margin: 0;
          padding-left: 1.25rem;
          font-size: 0.75rem;
          color: var(--info-text, #0c4a6e);
          line-height: 1.6;
        }

        .waysnx-security-tips-list li {
          margin: 0.25rem 0;
        }

        .waysnx-dialog-footer {
          display: flex;
          gap: 0.75rem;
          justify-content: flex-end;
          padding-top: 1rem;
          border-top: 1px solid var(--border-color, #e5e7eb);
        }

        /* Dark mode */
        @media (prefers-color-scheme: dark) {
          .waysnx-device-description {
            color: var(--text-primary-dark, #f3f4f6);
          }

          .waysnx-device-info {
            background-color: var(--bg-secondary-dark, #374151);
          }

          .waysnx-device-info-title {
            color: var(--text-primary-dark, #f3f4f6);
          }

          .waysnx-device-label {
            color: var(--text-secondary-dark, #9ca3af);
          }

          .waysnx-device-value {
            color: var(--text-primary-dark, #f3f4f6);
          }

          .waysnx-device-warning {
            background-color: var(--warning-bg-dark, #713f12);
            color: var(--warning-text-dark, #fef08a);
          }

          .waysnx-warning-text {
            color: var(--warning-text-dark, #fef08a);
          }

          .waysnx-device-security-tips {
            background-color: var(--info-bg-dark, #0c2d4a);
            color: var(--info-text-dark, #93c5fd);
          }

          .waysnx-security-tips-title {
            color: var(--info-text-dark, #93c5fd);
          }

          .waysnx-security-tips-list {
            color: var(--info-text-dark, #93c5fd);
          }

          .waysnx-dialog-footer {
            border-top-color: var(--border-color-dark, #4b5563);
          }
        }
      `}</style>
    </Modal>
  );
};

DeviceVerificationDialog.displayName = 'DeviceVerificationDialog';

export default DeviceVerificationDialog;
