// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { SecurityLogsPanel } from '@waysnx/ui-security';

const meta = {
  title: 'Security/Panels/SecurityLogsPanel',
  component: SecurityLogsPanel,
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
    logs: [
      { id: '1', event: 'Login attempt', status: 'success', timestamp: new Date(Date.now() - 600000).toISOString(), details: 'Chrome on Windows' },
      { id: '2', event: 'MFA verification', status: 'success', timestamp: new Date(Date.now() - 1200000).toISOString(), details: 'TOTP code accepted' },
      { id: '3', event: 'Password change', status: 'success', timestamp: new Date(Date.now() - 3600000).toISOString(), details: 'Password updated' },
      { id: '4', event: 'Login attempt', status: 'failed', timestamp: new Date(Date.now() - 7200000).toISOString(), details: 'Invalid password' },
    ],
  },
} satisfies Meta<typeof SecurityLogsPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  args: { logs: [] },
};

