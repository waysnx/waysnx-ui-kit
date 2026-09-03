/**
 * MFAVerificationDialog Component
 * 
 * Dialog for entering MFA verification code during login.
 */

import React, { useState, useRef } from 'react';
import { Button } from '@waysnx/ui-core';
import { Modal } from '@waysnx/ui-feedback';
import { Stack } from '@waysnx/ui-layout';
import { PINInput } from '../SecureInputs/PINInput';

export type MFAMethod = 'totp' | 'sms' | 'email' | 'webauthn';

export interface MFAVerificationDialogProps {
  /**
   * Whether dialog is open
   */
  isOpen: boolean;
  /**
   * MFA method being used
   */
  method?: MFAMethod;
  /**
   * Callback to verify code
   */
  onVerify?: (code: string) => Promise<void>;
  /**
   * Callback to use backup code instead
   */
  onUseBackupCode?: () => void;
  /**
   * Callback to cancel verification
   */
  onCancel?: () => void;
  /**
   * Whether verification is in progress
   */
  isLoading?: boolean;
  /**
   * Error message
   */
  error?: string;
  /**
   * Custom title
   */
  title?: string;
}

/**
 * MFAVerificationDialog - Enter MFA verification code
 */
export const MFAVerificationDialog: React.FC<MFAVerificationDialogProps> = ({
  isOpen,
  method = 'totp',
  onVerify,
  onUseBackupCode,
  onCancel,
  isLoading = false,
  error,
  title = 'Verify Your Identity',
}) => {
  const [code, setCode] = useState('');
  const [verificationError, setVerificationError] = useState<string>('');

  const handleVerify = async () => {
    if (code.length < 6) {
      setVerificationError('Please enter a 6-digit code');
      return;
    }

    setVerificationError('');

    try {
      await onVerify?.(code);
      setCode('');
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Verification failed';
      setVerificationError(errorMsg);
    }
  };

  const handleClose = () => {
    setCode('');
    setVerificationError('');
    onCancel?.();
  };

  const displayError = error || verificationError;

  const getMethodLabel = () => {
    switch (method) {
      case 'totp':
        return 'your authenticator app';
      case 'sms':
        return 'your phone via SMS';
      case 'email':
        return 'your email';
      case 'webauthn':
        return 'your security key';
      default:
        return 'your device';
    }
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <div style={{ padding: '1.5rem' }}>
        <span style={{ display: 'block', fontSize: '1.125rem', fontWeight: 700, marginBottom: '1rem' }}>
          {title}
        </span>

        <span style={{ display: 'block', fontSize: '1rem', color: 'var(--wx-color-text-muted, #717182)', marginBottom: '1.5rem' }}>
          Enter the verification code from {getMethodLabel()}.
        </span>

        {/* Code Input */}
        <div style={{ marginBottom: '1.5rem' }}>
          <PINInput
            length={6}
            label="Verification Code"
            onChange={setCode}
            onComplete={handleVerify}
            error={displayError}
            disabled={isLoading}
            masked={false}
          />
        </div>

        {/* Alternative Options */}
        {onUseBackupCode && (
          <div
            style={{
              padding: '1rem',
              background: 'var(--wx-color-background-alt, #f3f3f5)',
              borderRadius: '0.375rem',
              marginBottom: '1.5rem',
              textAlign: 'center',
            }}
          >
            <span style={{ display: 'block', fontSize: '0.875rem', color: 'var(--wx-color-text-muted, #717182)', marginBottom: '0.5rem' }}>
              Can&apos;t access your authentication device?
            </span>
            <Button
              variant="ghost"
              onClick={onUseBackupCode}
              disabled={isLoading}
            >
              Use a backup code instead
            </Button>
          </div>
        )}

        {/* Security Notice */}
        <div
          style={{
            padding: '1rem',
            background: 'var(--wx-color-info, #2563eb)',
            borderRadius: '0.375rem',
            marginBottom: '1.5rem',
            borderLeft: '4px solid var(--wx-color-info, #2563eb)',
          }}
        >
          <span style={{ fontSize: '0.875rem' }}>
            🔒 Never share your verification code with anyone.
          </span>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Stack gap="md" direction="horizontal">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleVerify}
              disabled={isLoading || code.length < 6}
            >
              Verify
            </Button>
          </Stack>
        </div>
      </div>
    </Modal>
  );
};

MFAVerificationDialog.displayName = 'MFAVerificationDialog';

export default MFAVerificationDialog;
