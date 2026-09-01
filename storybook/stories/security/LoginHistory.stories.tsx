// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { LoginHistory } from '@waysnx/ui-security';

const meta = {
  title: 'Security/Audit/LoginHistory',
  component: LoginHistory,
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
    records: [
      { id: '1', timestamp: new Date(Date.now() - 3600000).toISOString(), ip: '192.168.1.1', device: 'Chrome on Windows', location: 'New York, US', status: 'success' },
      { id: '2', timestamp: new Date(Date.now() - 86400000).toISOString(), ip: '10.0.0.5', device: 'Safari on iPhone', location: 'London, UK', status: 'success' },
      { id: '3', timestamp: new Date(Date.now() - 172800000).toISOString(), ip: '172.16.0.1', device: 'Firefox on MacOS', location: 'Berlin, DE', status: 'failed' },
      { id: '4', timestamp: new Date(Date.now() - 259200000).toISOString(), ip: '192.168.1.1', device: 'Chrome on Windows', location: 'New York, US', status: 'success' },
    ],
  },
} satisfies Meta<typeof LoginHistory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllSuccessful: Story = {
  args: {
    records: [
      { id: '1', timestamp: new Date(Date.now() - 3600000).toISOString(), ip: '192.168.1.1', device: 'Chrome', location: 'New York', status: 'success' },
      { id: '2', timestamp: new Date(Date.now() - 86400000).toISOString(), ip: '10.0.0.5', device: 'Safari', location: 'London', status: 'success' },
    ],
  },
};

export const Empty: Story = {
  args: { records: [] },
};

