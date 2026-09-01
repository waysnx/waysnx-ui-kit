/**
 * SecurityAlertsPanel Component
 * 
 * Security alerts and notification preferences.
 */

import React from 'react';
import { Button, Checkbox } from '@waysnx/ui-core';
import { Stack } from '@waysnx/ui-layout';

export interface SecurityAlertsPanelProps {
  [key: string]: any;
  onSave?: (prefs: any) => void;
}

export const SecurityAlertsPanel: React.FC<SecurityAlertsPanelProps> = ({ onSave }) => {
  const [prefs, setPrefs] = React.useState({
    failedLogins: true,
    newDevice: true,
    passwordChange: true,
    mfaChange: true,
    riskAlert: true,
  });

  return (
    <div>
      <span style={{ display: 'block', fontSize: '1rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
        Security Alerts
      </span>

      <Stack gap="lg">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Checkbox checked={prefs.failedLogins} onChange={(e: any) => setPrefs({ ...prefs, failedLogins: e.target.checked })} />
          <span style={{ fontSize: '0.875rem' }}>Alert on failed login attempts</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Checkbox checked={prefs.newDevice} onChange={(e: any) => setPrefs({ ...prefs, newDevice: e.target.checked })} />
          <span style={{ fontSize: '0.875rem' }}>Alert on new device login</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Checkbox checked={prefs.passwordChange} onChange={(e: any) => setPrefs({ ...prefs, passwordChange: e.target.checked })} />
          <span style={{ fontSize: '0.875rem' }}>Alert on password change</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Checkbox checked={prefs.mfaChange} onChange={(e: any) => setPrefs({ ...prefs, mfaChange: e.target.checked })} />
          <span style={{ fontSize: '0.875rem' }}>Alert on MFA settings change</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Checkbox checked={prefs.riskAlert} onChange={(e: any) => setPrefs({ ...prefs, riskAlert: e.target.checked })} />
          <span style={{ fontSize: '0.875rem' }}>Alert on account risk detection</span>
        </div>
      </Stack>

      <div style={{ marginTop: '1.5rem' }}>
        <Button variant="primary" onClick={() => onSave?.(prefs)}>Save Preferences</Button>
      </div>
    </div>
  );
};

SecurityAlertsPanel.displayName = 'SecurityAlertsPanel';
export default SecurityAlertsPanel;
