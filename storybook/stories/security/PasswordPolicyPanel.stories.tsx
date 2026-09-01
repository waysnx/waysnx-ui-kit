// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { PasswordPolicyPanel } from '@waysnx/ui-security';

const meta = {
  title: 'Security/Password/PasswordPolicyPanel',
  component: PasswordPolicyPanel,
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
    policy: {
      minLength: 8,
      maxLength: 64,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: true,
      preventReuse: 5,
    },
  },
} satisfies Meta<typeof PasswordPolicyPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const StrictPolicy: Story = {
  args: {
    policy: {
      minLength: 12,
      maxLength: 128,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: true,
      preventReuse: 10,
    },
  },
};

export const RelaxedPolicy: Story = {
  args: {
    policy: {
      minLength: 6,
      maxLength: 64,
      requireUppercase: false,
      requireLowercase: true,
      requireNumbers: false,
      requireSpecialChars: false,
      preventReuse: 0,
    },
  },
};

