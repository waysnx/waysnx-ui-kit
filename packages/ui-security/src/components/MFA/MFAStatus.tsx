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
        padding="lg"
        backgroundColor={isMFAEnabled ? 'success' : 'background-alt'}
        borderRadius="md"
        marginBottom="lg"
        border={`1px solid ${isMFAEnabled ? 'var(--color-success, green)' : 'var(--color-border, #ccc)'}`}
      >
        <div display="flex" justifyContent="space-between" alignItems="center">
          <div>
            <span as="h3" fontSize="base" fontWeight="bold" marginBottom="xs">
              Multi-Factor Authentication
            </span>
            <span fontSize="sm" color="muted">
              {isMFAEnabled ? 'Your account is protected' : 'Not currently enabled'}
            </span>
          </div>
          <Badge color={isMFAEnabled ? 'success' : 'warning'}>
            {isMFAEnabled ? 'âœ“ Enabled' : 'Disabled'}
          </Badge>
        </div>
      </div>

      {/* Enabled Methods */}
      {isMFAEnabled && methods.length > 0 && (
        <div marginBottom="lg">
          <span fontSize="sm" fontWeight="bold" marginBottom="md">
            Active Methods:
          </span>
          <Stack gap="sm">
            {methods.map((method: any) => (
              <div
                key={method}
                padding="md"
                backgroundColor="background-alt"
                borderRadius="md"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <div>
                  <span fontSize="sm" fontWeight="bold">
                    {getMethodLabel(method)}
                  </span>
                  {primaryMethod === method && (
                    <Badge color="primary" marginTop="xs">
                      Primary
                    </Badge>
                  )}
                </div>
                <div fontSize="lg">âœ“</div>
              </div>
            ))}
          </Stack>
        </div>
      )}

      {/* Info Box */}
      <div
        padding="md"
        backgroundColor="info"
        borderRadius="md"
        marginBottom="lg"
        borderLeft="4px solid"
        borderLeftColor="info"
      >
        <span fontSize="sm" fontWeight="bold" marginBottom="xs">
          ðŸ’¡ Multi-Factor Authentication
        </span>
        <span fontSize="sm">
          {isMFAEnabled
            ? 'You have MFA enabled on your account, which adds an extra layer of security beyond your password.'
            : 'Enable MFA to add an extra layer of security to your account. You will need to provide a verification code in addition to your password when logging in.'}
        </span>
      </div>

      {/* Action Buttons */}
      <Stack gap="md" direction="row">
        {isMFAEnabled ? (
          <>
            <Button
              variant="outline"
              flex={1}
              onClick={onChangeMethod}
              disabled={isLoading}
            >
              Change Method
            </Button>
            {allowDisable && (
              <Button
                variant="outline"
                color="danger"
                flex={1}
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
