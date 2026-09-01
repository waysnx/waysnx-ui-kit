import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DateTimePicker } from '@waysnx/ui-core';
import { TestBadge } from './TestBadge';

const meta = {
  title: 'Components/DateTimePicker',
  component: DateTimePicker,
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
      description: 'Disable the date time picker',
    },
  },
  decorators: [
    (Story) => (
      <div>
        <TestBadge componentName="DateTimePicker" />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DateTimePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Select date and time',
  },
};

export const WithValue: Story = {
  args: {
    placeholder: 'Select date and time',
    value: new Date('2026-03-31T14:30:00'),
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Select date and time',
    disabled: true,
  },
};

export const Interactive: Story = {
  render: () => {
    const [dateTime, setDateTime] = useState<Date | null>(null);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '300px' }}>
        <DateTimePicker
          placeholder="Select date and time"
          value={dateTime}
          onChange={(dt) => setDateTime(dt)}
        />
        {dateTime && (
          <p style={{ fontSize: '12px', color: '#666' }}>
            Selected: {dateTime.toLocaleString()}
          </p>
        )}
      </div>
    );
  },
};
