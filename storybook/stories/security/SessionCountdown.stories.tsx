// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { SessionCountdown } from '@waysnx/ui-security';

const meta = {
  title: 'Security/Sessions/SessionCountdown',
  component: SessionCountdown,
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
    totalDuration: { control: 'number', description: 'Total session duration in seconds' },
    remainingTime: { control: 'number', description: 'Remaining time in seconds' },
    format: { control: 'select', options: ['compact', 'detailed'], description: 'Display format' },
  },
  args: {
    totalDuration: 3600,
    remainingTime: 1800,
  },
} satisfies Meta<typeof SessionCountdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AlmostExpired: Story = {
  args: { remainingTime: 120 },
};

export const Compact: Story = {
  args: { format: 'compact' },
};

export const Detailed: Story = {
  args: { format: 'detailed' },
};

