/**
 * TrustedDeviceSelector Component
 * 
 * Selector to mark current device as trusted and skip MFA verification.
 */

import React, { useState } from 'react';
import { Button, Checkbox } from '@waysnx/ui-core';
import { Stack } from '@waysnx/ui-layout';

export interface TrustedDeviceSelectorProps {
  [key: string]: any;
  /**
   * Current device name
   */
  deviceName?: string;
  /**
   * How long to trust device (in days)
   */
  trustDurationDays?: number;
  /**
   * Whether device is selected as trusted
   */
  isTrusted?: boolean;
  /**
   * Callback when trust state changes
   */
  onTrustChange?: (isTrusted: boolean, durationDays?: number) => void;
  /**
   * Whether selection is disabled
   */
  disabled?: boolean;
  /**
   * Custom message
   */
  message?: string;
}

/**
 * TrustedDeviceSelector - Mark device as trusted
 */
export const TrustedDeviceSelector: React.FC<TrustedDeviceSelectorProps> = ({
  deviceName = 'This device',
  trustDurationDays = 30,
  isTrusted = false,
  onTrustChange,
  disabled = false,
  message = "You won't need to enter a verification code on this device for the next {days} days.",
}) => {
  const [selected, setSelected] = useState(isTrusted);
  const [selectedDuration, setSelectedDuration] = useState(trustDurationDays);

  const handleChange = (checked: boolean) => {
    setSelected(checked);
    onTrustChange?.(checked, checked ? selectedDuration : undefined);
  };

  const handleDurationChange = (days: number) => {
    setSelectedDuration(days);
    if (selected) {
      onTrustChange?.(true, days);
    }
  };

  return (
    <div>
      {/* Trust Checkbox */}
      <div
        padding="md"
        backgroundColor="background-alt"
        borderRadius="md"
        marginBottom="lg"
        border="1px solid var(--color-border, #ccc)"
      >
        <div display="flex" alignItems="flex-start" gap="md">
          <Checkbox
            checked={selected}
            onChange={(e: any) => handleChange(e.target.checked)}
            disabled={disabled}
          />
          <div flex={1}>
            <span fontWeight="bold" marginBottom="xs">
              Trust {deviceName}
            </span>
            <span fontSize="sm" color="muted">
              {message.replace('{days}', selectedDuration.toString())}
            </span>
          </div>
        </div>
      </div>

      {/* Duration Selection */}
      {selected && (
        <div
          padding="md"
          backgroundColor="info"
          borderRadius="md"
          marginBottom="lg"
          borderLeft="4px solid"
          borderLeftColor="info"
        >
          <span fontSize="sm" fontWeight="bold" marginBottom="md">
            How long to trust this device?
          </span>

          <Stack gap="sm">
            {[7, 14, 30, 90].map(days => (
              <div
                key={days}
                padding="sm"
                backgroundColor="background"
                borderRadius="md"
                cursor="pointer"
                border={`2px solid ${selectedDuration === days ? 'var(--color-primary, blue)' : 'var(--color-border, #ccc)'}`}
                onClick={() => handleDurationChange(days)}
              >
                <span fontSize="sm">
                  {days} days {days === 30 ? '(Recommended)' : ''}
                </span>
              </div>
            ))}
          </Stack>
        </div>
      )}

      {/* Security Notice */}
      <div
        padding="md"
        backgroundColor="warning"
        borderRadius="md"
        borderLeft="4px solid"
        borderLeftColor="warning"
      >
        <span fontSize="sm" fontWeight="bold" marginBottom="xs">
          ⚠️ Security Notice
        </span>
        <span fontSize="sm">
          Only trust devices you own and use in secure locations. Public computers should not be
          trusted.
        </span>
      </div>

      {/* Info Box */}
      {selected && (
        <div
          padding="md"
          backgroundColor="success"
          borderRadius="md"
          marginTop="lg"
          textAlign="center"
        >
          <span fontSize="sm" fontWeight="bold">
            ✓ Device will be trusted for {selectedDuration} days
          </span>
        </div>
      )}
    </div>
  );
};

TrustedDeviceSelector.displayName = 'TrustedDeviceSelector';

export default TrustedDeviceSelector;
