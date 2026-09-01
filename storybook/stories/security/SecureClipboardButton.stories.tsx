// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { SecureClipboardButton } from '@waysnx/ui-security';

const meta = {
  title: 'Security/Secure Inputs/SecureClipboardButton',
  component: SecureClipboardButton,
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
    content: { control: 'text', description: 'Content to copy' },
    label: { control: 'text', description: 'Button label' },
    successLabel: { control: 'text', description: 'Label after successful copy' },
    disabled: { control: 'boolean', description: 'Disabled state' },
    size: { control: 'select', options: ['sm', 'md', 'lg'], description: 'Button size' },
    variant: { control: 'select', options: ['primary', 'secondary', 'outline', 'ghost'], description: 'Button variant' },
  },
  args: {
    content: 'sk_live_abc123xyz789',
    label: 'Copy to clipboard',
  },
} satisfies Meta<typeof SecureClipboardButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Small: Story = {
  args: { size: 'sm' },
};

export const Outline: Story = {
  args: { variant: 'outline' },
};

