// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { ActivityFeed } from '@waysnx/ui-security';

const meta = {
  title: 'Security/Audit/ActivityFeed',
  component: ActivityFeed,
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
    activities: [
      { id: 'a1', type: 'login', description: 'User logged in successfully', timestamp: new Date(Date.now() - 300000), status: 'completed', actor: 'John Doe', icon: '🔑' },
      { id: 'a2', type: 'update', description: 'Profile information updated', timestamp: new Date(Date.now() - 3600000), status: 'completed', actor: 'John Doe', icon: '✏️' },
      { id: 'a3', type: 'security', description: 'Password changed', timestamp: new Date(Date.now() - 86400000), status: 'completed', actor: 'John Doe', icon: '🔒' },
      { id: 'a4', type: 'alert', description: 'Suspicious login attempt blocked', timestamp: new Date(Date.now() - 172800000), status: 'failed', actor: 'Unknown', icon: '⚠️' },
    ],
  },
} satisfies Meta<typeof ActivityFeed>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  args: { activities: [] },
};

