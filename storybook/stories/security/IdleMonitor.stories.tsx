// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { fn } from '@storybook/test';
import { IdleMonitor } from '@waysnx/ui-security';

const meta = {
  title: 'Security/Sessions/IdleMonitor',
  component: IdleMonitor,
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
    timeout: { control: 'number', description: 'Idle timeout in milliseconds' },
  },
  args: {
    timeout: 300000,
    onIdle: fn(),
    onActive: fn(),
  },
} satisfies Meta<typeof IdleMonitor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ShortTimeout: Story = {
  args: { timeout: 10000 },
};

