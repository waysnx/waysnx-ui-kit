// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { PolicyGate } from '@waysnx/ui-security';

const meta = {
  title: 'Security/Authorization/PolicyGate',
  component: PolicyGate,
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
    policyId: { control: 'text', description: 'Policy identifier' },
    isPolicyMet: { control: 'boolean', description: 'Whether the policy condition is met' },
  },
  args: {
    policyId: 'canEditDocument',
    isPolicyMet: true,
    children: 'This content is gated by the canEditDocument policy.',
  },
} satisfies Meta<typeof PolicyGate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PolicyMet: Story = {};

export const PolicyNotMet: Story = {
  args: { isPolicyMet: false },
};

