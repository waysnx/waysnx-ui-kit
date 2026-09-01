// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { fn } from '@storybook/test';
import { SecurityBanner } from '@waysnx/ui-security';

const meta = {
  title: 'Security/Status/SecurityBanner',
  component: SecurityBanner,
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
    message: { control: 'text', description: 'Banner message' },
    type: { control: 'select', options: ['info', 'warning', 'error'], description: 'Banner type' },
  },
  args: {
    message: 'Your password will expire in 5 days. Please update it.',
    type: 'warning',
    onDismiss: fn(),
  },
} satisfies Meta<typeof SecurityBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Warning: Story = {};

export const Info: Story = {
  args: { message: 'Two-factor authentication is now available for your account.', type: 'info' },
};

export const Error: Story = {
  args: { message: 'Your account has been flagged for suspicious activity.', type: 'error' },
};

