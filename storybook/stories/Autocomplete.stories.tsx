import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Autocomplete } from '@waysnx/ui-core';
import { TestBadge } from './TestBadge';

const meta = {
  title: 'Components/Autocomplete',
  component: Autocomplete,
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
      description: 'Disable the autocomplete',
    },
  },
  decorators: [
    (Story) => (
      <div>
        <TestBadge componentName="Autocomplete" />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Autocomplete>;

export default meta;
type Story = StoryObj<typeof meta>;

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Date', value: 'date' },
  { label: 'Elderberry', value: 'elderberry' },
];

export const Default: Story = {
  args: {
    placeholder: 'Search fruits...',
    options,
  },
};

export const WithValue: Story = {
  args: {
    placeholder: 'Search fruits...',
    options,
    value: 'apple',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Search fruits...',
    options,
    disabled: true,
  },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '300px' }}>
        <Autocomplete
          placeholder="Search fruits..."
          options={options}
          value={value}
          onChange={(val) => setValue(val)}
        />
        {value && (
          <p style={{ fontSize: '12px', color: '#666' }}>
            Selected: {value}
          </p>
        )}
      </div>
    );
  },
};
