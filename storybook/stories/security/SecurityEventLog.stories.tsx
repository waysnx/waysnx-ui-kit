// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { SecurityEventLog } from '@waysnx/ui-security';

const meta = {
  title: 'Security/Panels/SecurityEventLog',
  component: SecurityEventLog,
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
      { id: '1', type: 'auth', action: 'login', timestamp: new Date(Date.now() - 600000).toISOString(), user: 'john@example.com', status: 'success' },
      { id: '2', type: 'auth', action: 'mfa_verify', timestamp: new Date(Date.now() - 1200000).toISOString(), user: 'john@example.com', status: 'success' },
      { id: '3', type: 'auth', action: 'login_failed', timestamp: new Date(Date.now() - 7200000).toISOString(), user: 'unknown@test.com', status: 'failed' },
      { id: '4', type: 'session', action: 'revoke', timestamp: new Date(Date.now() - 86400000).toISOString(), user: 'admin@example.com', status: 'success' },
    ],
  },
} satisfies Meta<typeof SecurityEventLog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  args: { events: [] },
};

