// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { AccessDenied } from '@waysnx/ui-security';

const meta = {
  title: 'Security/Pages/AccessDenied',
  component: AccessDenied,
  parameters: { layout: 'padded' },
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
    message: { control: 'text', description: 'Denial message' },
    backLabel: { control: 'text', description: 'Back button label' },
    supportLabel: { control: 'text', description: 'Support link label' },
  },
  args: {
    message: 'You do not have permission to access this resource.',
  },
} satisfies Meta<typeof AccessDenied>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomMessage: Story = {
  args: { message: 'This page is restricted to administrators only.' },
};

export const WithLabels: Story = {
  args: { backLabel: 'Go Back', supportLabel: 'Contact Support' },
};

