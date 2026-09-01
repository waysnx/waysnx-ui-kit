import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DateRangePicker } from '@waysnx/ui-core';
import { TestBadge } from './TestBadge';

const meta = {
  title: 'Components/DateRangePicker',
  component: DateRangePicker,
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
      description: 'Disable the date range picker',
    },
  },
  decorators: [
    (Story) => (
      <div>
        <TestBadge componentName="DateRangePicker" />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DateRangePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Select date range',
  },
};

export const WithValue: Story = {
  args: {
    placeholder: 'Select date range',
    startDate: new Date('2026-03-01'),
    endDate: new Date('2026-03-31'),
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Select date range',
    disabled: true,
  },
};

export const Interactive: Story = {
  render: () => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '300px' }}>
        <DateRangePicker
          placeholder="Select date range"
          startDate={startDate}
          endDate={endDate}
          onChange={([start, end]) => { setStartDate(start); setEndDate(end); }}
        />
        {startDate && endDate && (
          <p style={{ fontSize: '12px', color: '#666' }}>
            Range: {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
          </p>
        )}
      </div>
    );
  },
};
