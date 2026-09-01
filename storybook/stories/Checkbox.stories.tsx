import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '@waysnx/ui-core';
import { useState } from 'react';
import { TestBadge } from './TestBadge';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Disable the checkbox',
    },
    label: {
      control: 'text',
      description: 'Checkbox label',
    },
  },
  decorators: [
    (Story) => (
      <div>
        <TestBadge componentName="Checkbox" />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
  },
};

export const Checked: Story = {
  args: {
    label: 'I agree to the terms',
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled checkbox',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled and checked',
    disabled: true,
    checked: true,
  },
};

export const Interactive: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox
        label="Interactive checkbox"
        checked={checked}
        onChange={(val) => setChecked(val as boolean)}
      />
    );
  },
};

export const MultipleOptions: Story = {
  render: () => {
    const [selected, setSelected] = useState<(string | number)[]>([]);

    return (
      <Checkbox
        label="Choose options"
        options={[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
          { value: 'option3', label: 'Option 3' },
        ]}
        value={selected}
        onChange={(val) => setSelected(val as (string | number)[])}
      />
    );
  },
};
