// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { fn } from '@storybook/test';
import { SessionPolicyPanel } from '@waysnx/ui-security';

const meta = {
  title: 'Security/Sessions/SessionPolicyPanel',
  component: SessionPolicyPanel,
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
  argTypes: {},
  args: {
    policy: { maxSessionDuration: 480, idleTimeout: 30, maxConcurrentSessions: 3 },
    onSave: fn(),
  },
} satisfies Meta<typeof SessionPolicyPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const StrictPolicy: Story = {
  args: {
    policy: { maxSessionDuration: 60, idleTimeout: 10, maxConcurrentSessions: 1 },
  },
};

