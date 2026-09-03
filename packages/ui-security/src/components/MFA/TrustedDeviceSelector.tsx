/**
 * TrustedDeviceSelector Component
 * 
 * Selector to mark current device as trusted and skip MFA verification.
 */

import React, { useState } from 'react';
import { Checkbox } from '@waysnx/ui-core';
import { Stack } from '@waysnx/ui-layout';

export interface TrustedDeviceSelectorProps {
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
        style={{
          padding: 12,
          background: 'var(--wx-color-background-alt, #f3f3f5)',
          borderRadius: 8,
          marginBottom: 16,
          border: '1px solid var(--wx-color-border, #ccc)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <Checkbox
            checked={selected}
            onChange={(e: any) => handleChange(e.target.checked)}
            disabled={disabled}
          />
          <div style={{ flex: 1 }}>
            <span style={{ display: 'block', fontWeight: 700, marginBottom: 4 }}>
              Trust {deviceName}
            </span>
            <span style={{ display: 'block', fontSize: '0.875rem', color: 'var(--wx-color-text-muted, #717182)' }}>
              {message.replace('{days}', selectedDuration.toString())}
            </span>
          </div>
        </div>
      </div>

      {/* Duration Selection */}
      {selected && (
        <div
          style={{
            padding: 12,
            background: 'var(--wx-color-info, #2563eb)',
            borderRadius: 8,
            marginBottom: 16,
            borderLeft: '4px solid var(--wx-color-info, #2563eb)',
          }}
        >
          <span style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, marginBottom: 12 }}>
            How long to trust this device?
          </span>

          <Stack gap="sm">
            {[7, 14, 30, 90].map(days => (
              <div
                key={days}
                style={{
                  padding: 8,
                  background: 'var(--wx-color-background, #ffffff)',
                  borderRadius: 8,
                  cursor: 'pointer',
                  border: `2px solid ${selectedDuration === days ? 'var(--wx-color-primary, #030213)' : 'var(--wx-color-border, #ccc)'}`,
                }}
                onClick={() => handleDurationChange(days)}
              >
                <span style={{ fontSize: '0.875rem' }}>
                  {days} days {days === 30 ? '(Recommended)' : ''}
                </span>
              </div>
            ))}
          </Stack>
        </div>
      )}

      {/* Security Notice */}
      <div
        style={{
          padding: 12,
          background: 'var(--wx-color-warning, #f59e0b)',
          borderRadius: 8,
          borderLeft: '4px solid var(--wx-color-warning, #f59e0b)',
        }}
      >
        <span style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, marginBottom: 4 }}>
          ⚠ Security Notice
        </span>
        <span style={{ display: 'block', fontSize: '0.875rem' }}>
          Only trust devices you own and use in secure locations. Public computers should not be
          trusted.
        </span>
      </div>

      {/* Info Box */}
      {selected && (
        <div
          style={{
            padding: 12,
            background: 'var(--wx-color-success, #16a34a)',
            borderRadius: 8,
            marginTop: 16,
            textAlign: 'center',
          }}
        >
          <span style={{ fontSize: '0.875rem', fontWeight: 700 }}>
            ✓ Device will be trusted for {selectedDuration} days
          </span>
        </div>
      )}
    </div>
  );
};

TrustedDeviceSelector.displayName = 'TrustedDeviceSelector';

export default TrustedDeviceSelector;
