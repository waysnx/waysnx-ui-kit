// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { fn } from '@storybook/test';
import { ConcurrentSessionDialog } from '@waysnx/ui-security';

const meta = {
  title: 'Security/Sessions/ConcurrentSessionDialog',
  component: ConcurrentSessionDialog,
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
    isLoading: { control: 'boolean', description: 'Loading state' },
  },
  args: {
    isOpen: true,
    onClose: fn(),
    onTerminate: fn(),
  },
} satisfies Meta<typeof ConcurrentSessionDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
  args: { isLoading: true },
};

export const Closed: Story = {
  args: { isOpen: false },
};

