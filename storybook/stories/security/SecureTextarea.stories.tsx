// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { SecureTextarea } from '@waysnx/ui-security';

const meta = {
  title: 'Security/Secure Inputs/SecureTextarea',
  component: SecureTextarea,
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
    label: { control: 'text', description: 'Textarea label' },
    placeholder: { control: 'text', description: 'Placeholder text' },
  },
  args: {
    label: 'Private Notes',
    placeholder: 'Enter sensitive information...',
  },
} satisfies Meta<typeof SecureTextarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { label: 'SSH Key', placeholder: 'Paste your SSH private key...' },
};

