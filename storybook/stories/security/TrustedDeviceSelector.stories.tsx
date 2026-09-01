// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { fn } from '@storybook/test';
import { TrustedDeviceSelector } from '@waysnx/ui-security';

const meta = {
  title: 'Security/Devices/TrustedDeviceSelector',
  component: TrustedDeviceSelector,
  parameters: { layout: 'centered' },
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
    disabled: { control: 'boolean', description: 'Disabled state' },
  },
  args: {
    devices: [
      { id: '1', name: 'Chrome on Windows', lastUsed: new Date().toISOString() },
      { id: '2', name: 'Safari on iPhone', lastUsed: new Date(Date.now() - 86400000).toISOString() },
      { id: '3', name: 'Firefox on MacOS', lastUsed: new Date(Date.now() - 604800000).toISOString() },
    ],
    onSelect: fn(),
  },
} satisfies Meta<typeof TrustedDeviceSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
};

