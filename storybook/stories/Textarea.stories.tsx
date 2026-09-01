import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Textarea } from '@waysnx/ui-core';
import { TestBadge } from './TestBadge';

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the textarea',
    },
    rows: {
      control: 'number',
      description: 'Number of rows',
    },
  },
  decorators: [
    (Story) => (
      <div>
        <TestBadge componentName="Textarea" />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your message...',
    rows: 4,
  },
};

export const WithValue: Story = {
  args: {
    placeholder: 'Enter your message...',
    rows: 4,
    defaultValue: 'This is a sample message',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Enter your message...',
    rows: 4,
    disabled: true,
    defaultValue: 'This textarea is disabled',
  },
};

export const LargeTextarea: Story = {
  args: {
    placeholder: 'Enter a long message...',
    rows: 8,
  },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '300px' }}>
        <Textarea
          placeholder="Type something..."
          rows={4}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <p style={{ fontSize: '12px', color: '#666' }}>
          Characters: {value.length}
        </p>
      </div>
    );
  },
};
