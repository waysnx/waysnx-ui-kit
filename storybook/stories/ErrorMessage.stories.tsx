import type { Meta, StoryObj } from '@storybook/react';
import { ErrorMessage } from '@waysnx/ui-core';
import { TestBadge } from './TestBadge';

const meta = {
  title: 'Components/ErrorMessage',
  component: ErrorMessage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    error: {
      control: 'text',
      description: 'Error message text',
    },
    show: {
      control: 'boolean',
      description: 'Show or hide the error message',
    },
  },
  decorators: [
    (Story) => (
      <div>
        <TestBadge componentName="ErrorMessage" />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ErrorMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    error: 'This field is required',
    show: true,
  },
};

export const ValidationError: Story = {
  args: {
    error: 'Please enter a valid email address',
    show: true,
  },
};

export const LongError: Story = {
  args: {
    error: 'This password is too weak. Please use at least 8 characters including uppercase, lowercase, numbers, and special characters.',
    show: true,
  },
};

export const Multiple: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <ErrorMessage error="Email is required" show />
      <ErrorMessage error="Password must be at least 8 characters" show />
      <ErrorMessage error="Passwords do not match" show />
    </div>
  ),
};
