// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { SecureInput } from '@waysnx/ui-security';

const meta = {
  title: 'Security/Secure Inputs/SecureInput',
  component: SecureInput,
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
    label: { control: 'text', description: 'Input label' },
    placeholder: { control: 'text', description: 'Placeholder text' },
    type: { control: 'select', options: ['text', 'password', 'email', 'tel', 'url'], description: 'Input type' },
    maskInput: { control: 'boolean', description: 'Whether to mask the input' },
  },
  args: {
    label: 'API Key',
    placeholder: 'Enter API key',
  },
} satisfies Meta<typeof SecureInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Password: Story = {
  args: { label: 'Secret Token', type: 'password', placeholder: 'Enter secret token' },
};

export const Masked: Story = {
  args: { label: 'Credit Card', maskInput: true, placeholder: '•••• •••• •••• ••••' },
};

export const Email: Story = {
  args: { label: 'Email', type: 'email', placeholder: 'Enter email' },
};

