/**
 * PrivacySettingsPanel Component
 * 
 * Privacy and data sharing preferences.
 */

import React from 'react';
import { Button, Checkbox } from '@waysnx/ui-core';
import { Stack } from '@waysnx/ui-layout';

export interface PrivacySettingsPanelProps {
  [key: string]: any;
  onSave?: (settings: any) => void;
}

export const PrivacySettingsPanel: React.FC<PrivacySettingsPanelProps> = ({ onSave }) => {
  const [settings, setSettings] = React.useState({
    allowAnalytics: false,
    shareActivity: false,
    dataRetention: 90,
  });

  return (
    <div>
      <span style={{ display: 'block', fontSize: '1rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
        Privacy Settings
      </span>

      <Stack gap="lg">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Checkbox checked={settings.allowAnalytics} onChange={(e: any) => setSettings({ ...settings, allowAnalytics: e.target.checked })} />
          <span style={{ fontSize: '0.875rem' }}>Allow analytics and usage data collection</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Checkbox checked={settings.shareActivity} onChange={(e: any) => setSettings({ ...settings, shareActivity: e.target.checked })} />
          <span style={{ fontSize: '0.875rem' }}>Share activity with trusted partners</span>
        </div>

        <div>
          <span style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Data Retention: {settings.dataRetention} days
          </span>
          <input
            type="range"
            min="30"
            max="365"
            value={settings.dataRetention}
            onChange={(e: any) => setSettings({ ...settings, dataRetention: parseInt(e.target.value) })}
            style={{ width: '100%' }}
          />
        </div>
      </Stack>

      <div style={{ marginTop: '1.5rem' }}>
        <Button variant="primary" onClick={() => onSave?.(settings)}>Save Settings</Button>
      </div>
    </div>
  );
};

PrivacySettingsPanel.displayName = 'PrivacySettingsPanel';
export default PrivacySettingsPanel;
