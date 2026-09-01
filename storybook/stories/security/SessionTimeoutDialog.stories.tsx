// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { fn } from '@storybook/test';
import { SessionTimeoutDialog } from '@waysnx/ui-security';

const meta = {
  title: 'Security/Sessions/SessionTimeoutDialog',
  component: SessionTimeoutDialog,
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
    isOpen: { control: 'boolean', description: 'Whether dialog is open' },
    remainingTime: { control: 'number', description: 'Remaining time in seconds' },
  },
  args: {
    isOpen: true,
    onExtend: fn(),
    onLogout: fn(),
    remainingTime: 300,
  },
} satisfies Meta<typeof SessionTimeoutDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AlmostExpired: Story = {
  args: { remainingTime: 30 },
};

export const Closed: Story = {
  args: { isOpen: false },
};

