// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { fn } from '@storybook/test';
import { GoogleLoginButton } from '@waysnx/ui-security';

const meta = {
  title: 'Security/Social Login/GoogleLoginButton',
  component: GoogleLoginButton,
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
    isLoading: { control: 'boolean', description: 'Loading state' },
    variant: { control: 'select', options: ['primary', 'outline', 'ghost'], description: 'Button style variant' },
    label: { control: 'text', description: 'Button label' },
  },
  args: {
    onLogin: fn(),
  },
} satisfies Meta<typeof GoogleLoginButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
  args: { isLoading: true },
};

export const Outline: Story = {
  args: { variant: 'outline' },
};

export const Ghost: Story = {
  args: { variant: 'ghost' },
};

