/**
 * MFAStatus Component
 * 
 * Display current MFA setup status and available methods.
 */

import React from 'react';
import { Button } from '@waysnx/ui-core';
import { Stack } from '@waysnx/ui-layout';
import { Badge } from '@waysnx/ui-feedback';
import type { MFAConfiguration } from '../../types/mfa';

export interface MFAStatusProps {
  /**
   * Current MFA configuration
   */
  config?: MFAConfiguration;
  /**
   * Callback to enable MFA
   */
  onEnable?: () => void;
  /**
   * Callback to disable MFA
   */
  onDisable?: () => void;
  /**
   * Callback to change MFA method
   */
  onChangeMethod?: () => void;
  /**
   * Whether operations are loading
   */
  isLoading?: boolean;
  /**
   * Allow disabling MFA
   */
  allowDisable?: boolean;
}

/**
 * MFAStatus - Display MFA configuration status
 */
export const MFAStatus: React.FC<MFAStatusProps> = ({
  config,
  onEnable,
  onDisable,
  onChangeMethod,
  isLoading = false,
  allowDisable = true,
}) => {
  const isMFAEnabled = config?.isEnabled ?? false;
  const methods = config?.backupMethods ?? [];
  const primaryMethod = config?.primaryMethod;

  const getMethodLabel = (method: string) => {
    const labels: Record<string, string> = {
      totp: 'Authenticator App',
      sms: 'SMS Text Message',
      email: 'Email',
      'backup-codes': 'Backup Codes',
      webauthn: 'Security Key',
    };
    return labels[method] || method;
  };

  return (
    <div>
      {/* Main Status Card */}
      <div
        style={{
          padding: 16,
          background: isMFAEnabled ? 'var(--wx-color-success, #16a34a)' : 'var(--wx-color-background-alt, #f3f3f5)',
          borderRadius: 8,
          marginBottom: 16,
          border: `1px solid ${isMFAEnabled ? 'var(--wx-color-success, #16a34a)' : 'var(--wx-color-border, #ccc)'}`,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 4 }}>
              Multi-Factor Authentication
            </h3>
            <span style={{ fontSize: '0.875rem', color: 'var(--wx-color-text-muted, #717182)' }}>
              {isMFAEnabled ? 'Your account is protected' : 'Not currently enabled'}
            </span>
          </div>
          <Badge color={isMFAEnabled ? 'success' : 'warning'}>
            {isMFAEnabled ? '✓ Enabled' : 'Disabled'}
          </Badge>
        </div>
      </div>

      {/* Enabled Methods */}
      {isMFAEnabled && methods.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <span style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, marginBottom: 12 }}>
            Active Methods:
          </span>
          <Stack gap="sm">
            {methods.map((method: any) => (
              <div
                key={method}
                style={{
                  padding: 12,
                  background: 'var(--wx-color-background-alt, #f3f3f5)',
                  borderRadius: 8,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <span style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700 }}>
                    {getMethodLabel(method)}
                  </span>
                  {primaryMethod === method && (
                    <div style={{ marginTop: 4 }}>
                      <Badge color="info">
                        Primary
                      </Badge>
                    </div>
                  )}
                </div>
                <div style={{ fontSize: '1.125rem' }}>✓</div>
              </div>
            ))}
          </Stack>
        </div>
      )}

      {/* Info Box */}
      <div
        style={{
          padding: 12,
          background: 'var(--wx-color-info, #2563eb)',
          borderRadius: 8,
          marginBottom: 16,
          borderLeft: '4px solid var(--wx-color-info, #2563eb)',
        }}
      >
        <span style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, marginBottom: 4 }}>
          ℹ Multi-Factor Authentication
        </span>
        <span style={{ display: 'block', fontSize: '0.875rem' }}>
          {isMFAEnabled
            ? 'You have MFA enabled on your account, which adds an extra layer of security beyond your password.'
            : 'Enable MFA to add an extra layer of security to your account. You will need to provide a verification code in addition to your password when logging in.'}
        </span>
      </div>

      {/* Action Buttons */}
      <Stack gap="md" direction="horizontal">
        {isMFAEnabled ? (
          <>
            <Button
              variant="outline"
              onClick={onChangeMethod}
              disabled={isLoading}
            >
              Change Method
            </Button>
            {allowDisable && (
              <Button
                variant="outline"
                onClick={onDisable}
                disabled={isLoading}
              >
                Disable MFA
              </Button>
            )}
          </>
        ) : (
          <Button
            variant="primary"
            onClick={onEnable}
            disabled={isLoading}
          >
            Enable Multi-Factor Authentication
          </Button>
        )}
      </Stack>
    </div>
  );
};

MFAStatus.displayName = 'MFAStatus';

export default MFAStatus;
