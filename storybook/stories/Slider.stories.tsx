import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Slider } from '@waysnx/ui-core';
import { TestBadge } from './TestBadge';

const meta = {
  title: 'Components/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    min: {
      control: 'number',
      description: 'Minimum value',
    },
    max: {
      control: 'number',
      description: 'Maximum value',
    },
    step: {
      control: 'number',
      description: 'Step value',
    },
    showValue: {
      control: 'boolean',
      description: 'Show current value',
    },
  },
  decorators: [
    (Story) => (
      <div>
        <TestBadge componentName="Slider" />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    min: 0,
    max: 100,
    step: 1,
  },
};

export const WithValue: Story = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    value: 50,
    showValue: true,
  },
};

export const CustomRange: Story = {
  args: {
    min: 0,
    max: 1000,
    step: 10,
    value: 500,
    showValue: true,
  },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState(50);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '300px' }}>
        <Slider
          min={0}
          max={100}
          step={1}
          value={value}
          onChange={(val) => setValue(val)}
          showValue
        />
        <p style={{ fontSize: '12px', color: '#666' }}>
          Value: {value}%
        </p>
      </div>
    );
  },
};
