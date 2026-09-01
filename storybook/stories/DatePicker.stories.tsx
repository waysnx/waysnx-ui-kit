import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DatePicker } from '@waysnx/ui-core';
import { TestBadge } from './TestBadge';

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
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
      description: 'Disable the date picker',
    },
  },
  decorators: [
    (Story) => (
      <div>
        <TestBadge componentName="DatePicker" />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Select a date',
  },
};

export const WithValue: Story = {
  args: {
    placeholder: 'Select a date',
    value: new Date('2026-03-31'),
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Select a date',
    disabled: true,
  },
};

export const Interactive: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '300px' }}>
        <DatePicker
          placeholder="Select a date"
          value={date}
          onChange={(d) => setDate(d)}
        />
        {date && (
          <p style={{ fontSize: '12px', color: '#666' }}>
            Selected: {date.toLocaleDateString()}
          </p>
        )}
      </div>
    );
  },
};
