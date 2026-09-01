// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { fn } from '@storybook/test';
import { ActiveSessions } from '@waysnx/ui-security';

const meta = {
  title: 'Security/Sessions/ActiveSessions',
  component: ActiveSessions,
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
  argTypes: {
    currentSessionId: { control: 'text', description: 'Current session ID' },
  },
  args: {
    sessions: [
      { id: 's1', userId: 'u1', createdAt: new Date(), expiresAt: new Date(Date.now() + 3600000), lastActivityAt: new Date(), isActive: true, device: 'Chrome on Windows', ip: '192.168.1.1', location: 'New York, US' },
      { id: 's2', userId: 'u1', createdAt: new Date(Date.now() - 7200000), expiresAt: new Date(Date.now() + 1800000), lastActivityAt: new Date(Date.now() - 3600000), isActive: true, device: 'Safari on iPhone', ip: '10.0.0.5', location: 'London, UK' },
      { id: 's3', userId: 'u1', createdAt: new Date(Date.now() - 86400000), expiresAt: new Date(Date.now() + 900000), lastActivityAt: new Date(Date.now() - 7200000), isActive: false, device: 'Firefox on MacOS', ip: '172.16.0.1', location: 'Berlin, DE' },
    ],
    currentSessionId: 's1',
    onRevokeSession: fn(),
  },
} satisfies Meta<typeof ActiveSessions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SingleSession: Story = {
  args: {
    sessions: [
      { id: 's1', userId: 'u1', createdAt: new Date(), expiresAt: new Date(Date.now() + 3600000), lastActivityAt: new Date(), isActive: true, device: 'Chrome on Windows', ip: '192.168.1.1', location: 'New York, US' },
    ],
  },
};

