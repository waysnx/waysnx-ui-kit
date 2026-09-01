// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { PasswordAgeIndicator } from '@waysnx/ui-security';

const meta = {
  title: 'Security/Password/PasswordAgeIndicator',
  component: PasswordAgeIndicator,
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
    maxAgeDays: { control: 'number', description: 'Maximum password age in days' },
  },
  args: {
    lastChanged: new Date(Date.now() - 86400000 * 45).toISOString(),
    maxAgeDays: 90,
  },
} satisfies Meta<typeof PasswordAgeIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const RecentlyChanged: Story = {
  args: { lastChanged: new Date(Date.now() - 86400000 * 2).toISOString() },
};

export const Expiring: Story = {
  args: { lastChanged: new Date(Date.now() - 86400000 * 85).toISOString() },
};

export const Expired: Story = {
  args: { lastChanged: new Date(Date.now() - 86400000 * 100).toISOString() },
};

