// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { SecurityStatusCard } from '@waysnx/ui-security';

const meta = {
  title: 'Security/Status/SecurityStatusCard',
  component: SecurityStatusCard,
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
    title: { control: 'text', description: 'Card title' },
    status: { control: 'select', options: ['good', 'warning', 'critical'], description: 'Status level' },
    actionLabel: { control: 'text', description: 'Action button label' },
  },
  args: {
    title: 'Security Status',
    status: 'good',
    lastChecked: new Date().toISOString(),
  },
} satisfies Meta<typeof SecurityStatusCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Good: Story = {};

export const Warning: Story = {
  args: { status: 'warning', title: 'Attention Required' },
};

export const Critical: Story = {
  args: { status: 'critical', title: 'Action Required' },
};

