// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { fn } from '@storybook/test';
import { SecurityKeyButton } from '@waysnx/ui-security';

const meta = {
  title: 'Security/Social Login/SecurityKeyButton',
  component: SecurityKeyButton,
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
    disabled: { control: 'boolean', description: 'Disabled state' },
    size: { control: 'select', options: ['sm', 'md', 'lg'], description: 'Button size' },
    variant: { control: 'select', options: ['primary', 'secondary', 'outline', 'ghost'], description: 'Button style variant' },
    label: { control: 'text', description: 'Button label' },
    loadingLabel: { control: 'text', description: 'Label while loading' },
  },
  args: {
    onAuthenticate: fn(),
    label: 'Use Security Key',
  },
} satisfies Meta<typeof SecurityKeyButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Small: Story = {
  args: { size: 'sm' },
};

export const Large: Story = {
  args: { size: 'lg' },
};

export const Outline: Story = {
  args: { variant: 'outline' },
};

