// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { fn } from '@storybook/test';
import { KeepAliveButton } from '@waysnx/ui-security';

const meta = {
  title: 'Security/Sessions/KeepAliveButton',
  component: KeepAliveButton,
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
    variant: { control: 'select', options: ['primary', 'secondary', 'outline', 'ghost'], description: 'Button variant' },
    label: { control: 'text', description: 'Button label' },
    loadingLabel: { control: 'text', description: 'Label while loading' },
  },
  args: {
    onKeepAlive: fn(),
    label: 'Stay signed in',
  },
} satisfies Meta<typeof KeepAliveButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Small: Story = {
  args: { size: 'sm' },
};

export const Outline: Story = {
  args: { variant: 'outline' },
};

