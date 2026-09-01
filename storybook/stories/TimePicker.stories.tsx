import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { TimePicker } from '@waysnx/ui-core';
import { TestBadge } from './TestBadge';

const meta = {
  title: 'Components/TimePicker',
  component: TimePicker,
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
      description: 'Disable the time picker',
    },
  },
  decorators: [
    (Story) => (
      <div>
        <TestBadge componentName="TimePicker" />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TimePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Select a time',
  },
};

export const WithValue: Story = {
  args: {
    placeholder: 'Select a time',
    value: new Date('2026-03-31T14:30:00'),
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Select a time',
    disabled: true,
  },
};

export const Interactive: Story = {
  render: () => {
    const [time, setTime] = useState<Date | null>(null);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '300px' }}>
        <TimePicker
          placeholder="Select a time"
          value={time}
          onChange={(t) => setTime(t)}
        />
        {time && (
          <p style={{ fontSize: '12px', color: '#666' }}>
            Selected: {time.toLocaleTimeString()}
          </p>
        )}
      </div>
    );
  },
};
