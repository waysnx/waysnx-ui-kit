// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { fn } from '@storybook/test';
import { PINInput } from '@waysnx/ui-security';

const meta = {
  title: 'Security/Secure Inputs/PINInput',
  component: PINInput,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div>
        <TestBadge componentName="Security" />
        <Story />
      </div>
    ),
  ],
  argTypes: {
    length: { control: { type: 'range', min: 4, max: 8 }, description: 'Number of PIN digits' },
    disabled: { control: 'boolean', description: 'Disabled state' },
    masked: { control: 'boolean', description: 'Mask PIN digits' },
    label: { control: 'text', description: 'Input label' },
  },
  args: {
    length: 4,
    onComplete: fn(),
  },
} satisfies Meta<typeof PINInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SixDigits: Story = {
  args: { length: 6 },
};

export const Masked: Story = {
  args: { masked: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const WithLabel: Story = {
  args: { label: 'Enter PIN' },
};

