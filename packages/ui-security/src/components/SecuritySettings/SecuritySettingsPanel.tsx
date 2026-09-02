/**
 * SecuritySettingsPanel Component
 * 
 * Main security settings configuration panel.
 */

import React, { useState } from 'react';
import { Button } from '@waysnx/ui-core';
import { Stack } from '@waysnx/ui-layout';

export interface SecuritySettingsPanelProps {
  /**
   * Callback for password settings
   */
  onPasswordSettings?: () => void;
  /**
   * Callback for MFA settings
   */
  onMFASettings?: () => void;
  /**
   * Callback for session settings
   */
  onSessionSettings?: () => void;
  /**
   * Callback for trusted devices
   */
  onTrustedDevices?: () => void;
  /**
   * Callback for privacy settings
   */
  onPrivacySettings?: () => void;
}

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'password', label: 'Password' },
  { id: 'mfa', label: 'MFA' },
  { id: 'sessions', label: 'Sessions' },
  { id: 'devices', label: 'Devices' },
  { id: 'privacy', label: 'Privacy' },
] as const;

/**
 * SecuritySettingsPanel - Main security settings dashboard
 */
export const SecuritySettingsPanel: React.FC<SecuritySettingsPanelProps> = ({
  onPasswordSettings,
  onMFASettings,
  onSessionSettings,
  onTrustedDevices,
  onPrivacySettings,
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <span style={{ display: 'block', fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
          Security Settings
        </span>
        <span style={{ display: 'block', fontSize: '0.875rem', color: 'var(--color-muted, #666)' }}>
          Manage your account security and privacy settings.
        </span>
      </div>

      {/* Tab Navigation */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border, #ccc)' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '0.5rem 1rem',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              fontWeight: activeTab === tab.id ? 'bold' : 'normal',
              borderBottom: activeTab === tab.id ? '2px solid var(--color-primary, #007bff)' : '2px solid transparent',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <Stack gap="md" style={{ marginTop: '1.5rem' }}>
          <div
            style={{ padding: '1.5rem', backgroundColor: 'var(--color-background-alt, #f9f9f9)', borderRadius: '0.375rem' }}
          >
            <span style={{ display: 'block', fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              Security Overview
            </span>
            <span style={{ display: 'block', fontSize: '0.875rem', color: 'var(--color-muted, #666)', marginBottom: '1rem' }}>
              Review and manage your account security settings.
            </span>
            <Stack gap="sm">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.875rem' }}>Password</span>
                <Button variant="outline" onClick={onPasswordSettings}>
                  Configure
                </Button>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.875rem' }}>Multi-Factor Authentication</span>
                <Button variant="outline" onClick={onMFASettings}>
                  Configure
                </Button>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.875rem' }}>Session Settings</span>
                <Button variant="outline" onClick={onSessionSettings}>
                  Configure
                </Button>
              </div>
            </Stack>
          </div>
        </Stack>
      )}

      {activeTab === 'password' && (
        <div style={{ padding: '1.5rem', marginTop: '1.5rem' }}>
          <Button variant="primary" onClick={onPasswordSettings}>
            Manage Password Settings
          </Button>
        </div>
      )}

      {activeTab === 'mfa' && (
        <div style={{ padding: '1.5rem', marginTop: '1.5rem' }}>
          <Button variant="primary" onClick={onMFASettings}>
            Manage MFA
          </Button>
        </div>
      )}

      {activeTab === 'sessions' && (
        <div style={{ padding: '1.5rem', marginTop: '1.5rem' }}>
          <Button variant="primary" onClick={onSessionSettings}>
            Manage Sessions
          </Button>
        </div>
      )}

      {activeTab === 'devices' && (
        <div style={{ padding: '1.5rem', marginTop: '1.5rem' }}>
          <Button variant="primary" onClick={onTrustedDevices}>
            Manage Trusted Devices
          </Button>
        </div>
      )}

      {activeTab === 'privacy' && (
        <div style={{ padding: '1.5rem', marginTop: '1.5rem' }}>
          <Button variant="primary" onClick={onPrivacySettings}>
            Manage Privacy Settings
          </Button>
        </div>
      )}
    </div>
  );
};

SecuritySettingsPanel.displayName = 'SecuritySettingsPanel';

export default SecuritySettingsPanel;
