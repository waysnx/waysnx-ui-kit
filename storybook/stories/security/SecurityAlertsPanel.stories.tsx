// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { fn } from '@storybook/test';
import { SecurityAlertsPanel } from '@waysnx/ui-security';

const meta = {
  title: 'Security/Panels/SecurityAlertsPanel',
  component: SecurityAlertsPanel,
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
    alerts: [
      { id: '1', title: 'Unusual login detected', severity: 'high', timestamp: new Date(Date.now() - 1800000).toISOString(), read: false },
      { id: '2', title: 'Password expiring soon', severity: 'medium', timestamp: new Date(Date.now() - 86400000).toISOString(), read: true },
      { id: '3', title: 'New device registered', severity: 'low', timestamp: new Date(Date.now() - 172800000).toISOString(), read: true },
    ],
    onDismiss: fn(),
  },
} satisfies Meta<typeof SecurityAlertsPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllUnread: Story = {
  args: {
    alerts: [
      { id: '1', title: 'Brute force attempt detected', severity: 'high', timestamp: new Date().toISOString(), read: false },
      { id: '2', title: 'Account locked', severity: 'high', timestamp: new Date().toISOString(), read: false },
    ],
  },
};

export const Empty: Story = {
  args: { alerts: [] },
};

