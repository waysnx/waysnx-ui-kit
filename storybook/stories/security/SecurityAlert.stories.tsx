// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { fn } from '@storybook/test';
import { SecurityAlert } from '@waysnx/ui-security';

const meta = {
  title: 'Security/Status/SecurityAlert',
  component: SecurityAlert,
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
    title: { control: 'text', description: 'Alert title' },
    description: { control: 'text', description: 'Alert description' },
    severity: { control: 'select', options: ['low', 'medium', 'high', 'critical'], description: 'Alert severity' },
  },
  args: {
    title: 'Security Alert',
    description: 'Unusual login activity detected on your account.',
    severity: 'high',
    onDismiss: fn(),
  },
} satisfies Meta<typeof SecurityAlert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const High: Story = {};

export const Critical: Story = {
  args: { title: 'Critical Security Issue', description: 'Your account may have been compromised.', severity: 'critical' },
};

export const Medium: Story = {
  args: { title: 'Password Expiring', description: 'Your password will expire in 3 days.', severity: 'medium' },
};

export const Low: Story = {
  args: { title: 'New Device Login', description: 'A new device was used to access your account.', severity: 'low' },
};

