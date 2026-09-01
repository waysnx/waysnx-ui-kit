import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Radio } from '@waysnx/ui-core';
import { TestBadge } from './TestBadge';

const meta = {
  title: 'Components/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'Radio group name',
    },
    value: {
      control: 'text',
      description: 'Selected value',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the radio',
    },
    label: {
      control: 'text',
      description: 'Radio label',
    },
  },
  decorators: [
    (Story) => (
      <div>
        <TestBadge componentName="Radio" />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

const options = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
];

export const Default: Story = {
  args: {
    name: 'option',
    options,
  },
};

export const WithValue: Story = {
  args: {
    name: 'option',
    options,
    value: 'option1',
  },
};

export const Disabled: Story = {
  args: {
    name: 'option',
    options,
    disabled: true,
    value: 'option1',
  },
};

export const WithLabel: Story = {
  args: {
    name: 'option',
    label: 'Choose an option',
    options,
  },
};

export const RadioGroup: Story = {
  args: { name: 'options' },
  render: () => {
    const [selected, setSelected] = useState<string | number>('option1');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Radio
          name="options"
          options={options}
          value={selected}
          onChange={(val) => setSelected(val)}
        />
        <p style={{ fontSize: '12px', color: '#666' }}>Selected: {selected}</p>
      </div>
    );
  },
};
