// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { fn } from '@storybook/test';
import { TrustedDevicesPanel } from '@waysnx/ui-security';

const meta = {
  title: 'Security/Devices/TrustedDevicesPanel',
  component: TrustedDevicesPanel,
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
    devices: [
      { id: '1', name: 'Chrome on Windows', lastUsed: new Date().toISOString(), trusted: true },
      { id: '2', name: 'Safari on iPhone', lastUsed: new Date(Date.now() - 86400000).toISOString(), trusted: true },
      { id: '3', name: 'Firefox on MacOS', lastUsed: new Date(Date.now() - 604800000).toISOString(), trusted: true },
    ],
    onRevoke: fn(),
  },
} satisfies Meta<typeof TrustedDevicesPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SingleDevice: Story = {
  args: {
    devices: [
      { id: '1', name: 'Chrome on Windows', lastUsed: new Date().toISOString(), trusted: true },
    ],
  },
};

export const Empty: Story = {
  args: { devices: [] },
};

