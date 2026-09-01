import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@waysnx/ui-core';
import { useState } from 'react';
import { TestBadge } from './TestBadge';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel'],
      description: 'Input type',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the input',
    },
    required: {
      control: 'boolean',
      description: 'Mark as required',
    },
    label: {
      control: 'text',
      description: 'Input label',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
  },
  decorators: [
    (Story) => (
      <div>
        <TestBadge componentName="Input" />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'Enter your name',
    type: 'text',
  },
};

export const Email: Story = {
  args: {
    type: 'email',
    label: 'Email Address',
    placeholder: 'you@example.com',
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    label: 'Password',
    placeholder: 'Enter password',
  },
};

export const Number: Story = {
  args: {
    type: 'number',
    label: 'Age',
    placeholder: 'Enter your age',
  },
};

export const Telephone: Story = {
  args: {
    type: 'tel',
    label: 'Phone Number',
    placeholder: '+1 (555) 000-0000',
  },
};

export const WithError: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    error: 'Username is required',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Field',
    placeholder: 'Cannot edit',
    disabled: true,
  },
};

export const Required: Story = {
  args: {
    label: 'Required Field',
    placeholder: 'This field is required',
    required: true,
  },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Input
        label="Interactive Input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type something..."
      />
    );
  },
};
