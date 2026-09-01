// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { AuditHistoryTable } from '@waysnx/ui-security';

const meta = {
  title: 'Security/Audit/AuditHistoryTable',
  component: AuditHistoryTable,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div>
        <TestBadge componentName="Security" />
        <Story />
      </div>
    ),
  ],
  args: {
    events: [
      { id: '1', eventType: 'auth.login', severity: 'info', action: 'Login', description: 'User logged in successfully', userEmail: 'john@example.com', timestamp: new Date(Date.now() - 3600000), username: 'John Doe' },
      { id: '2', eventType: 'auth.password_change', severity: 'medium', action: 'Password Changed', description: 'User changed their password', userEmail: 'john@example.com', timestamp: new Date(Date.now() - 7200000), username: 'John Doe' },
      { id: '3', eventType: 'auth.login_failed', severity: 'high', action: 'Failed Login', description: 'Failed login attempt from unknown IP', userEmail: 'unknown@test.com', timestamp: new Date(Date.now() - 86400000), username: 'Unknown' },
      { id: '4', eventType: 'auth.mfa_enabled', severity: 'info', action: 'MFA Enabled', description: 'Two-factor authentication was enabled', userEmail: 'jane@example.com', timestamp: new Date(Date.now() - 172800000), username: 'Jane Smith' },
    ],
  },
} satisfies Meta<typeof AuditHistoryTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const HighSeverityOnly: Story = {
  args: {
    events: [
      { id: '1', eventType: 'auth.login_failed', severity: 'high', action: 'Failed Login', description: 'Multiple failed login attempts', userEmail: 'attacker@test.com', timestamp: new Date(), username: 'Unknown' },
      { id: '2', eventType: 'auth.account_locked', severity: 'high', action: 'Account Locked', description: 'Account locked due to suspicious activity', userEmail: 'john@example.com', timestamp: new Date(), username: 'John Doe' },
    ],
  },
};

export const Empty: Story = {
  args: { events: [] },
};

