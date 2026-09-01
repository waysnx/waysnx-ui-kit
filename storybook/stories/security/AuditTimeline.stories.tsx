// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { AuditTimeline } from '@waysnx/ui-security';

const meta = {
  title: 'Security/Audit/AuditTimeline',
  component: AuditTimeline,
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
      { id: '1', eventType: 'auth.login', severity: 'info', action: 'Account created', description: 'Account was created', timestamp: new Date(Date.now() - 86400000 * 30), username: 'System' },
      { id: '2', eventType: 'mfa.enabled', severity: 'info', action: 'MFA enabled', description: 'Two-factor authentication enabled', timestamp: new Date(Date.now() - 86400000 * 7), username: 'John Doe' },
      { id: '3', eventType: 'auth.password_change', severity: 'info', action: 'Password changed', description: 'Password was updated', timestamp: new Date(Date.now() - 3600000), username: 'John Doe' },
      { id: '4', eventType: 'auth.login', severity: 'info', action: 'Login', description: 'Logged in from new device', timestamp: new Date(), username: 'John Doe' },
    ],
  },
} satisfies Meta<typeof AuditTimeline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SingleEvent: Story = {
  args: {
    events: [
      { id: '1', eventType: 'auth.login', severity: 'info', action: 'Account created', description: 'Account was created', timestamp: new Date(), username: 'System' },
    ],
  },
};

export const Empty: Story = {
  args: { events: [] },
};

