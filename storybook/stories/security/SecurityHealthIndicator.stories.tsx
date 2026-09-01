// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { SecurityHealthIndicator } from '@waysnx/ui-security';

const meta = {
  title: 'Security/Status/SecurityHealthIndicator',
  component: SecurityHealthIndicator,
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
    overallHealth: { control: 'select', options: ['good', 'warning', 'critical'], description: 'Overall health status' },
  },
  args: {
    overallHealth: 'good',
    factors: [
      { label: 'MFA Enabled', status: 'pass' },
      { label: 'Strong Password', status: 'pass' },
      { label: 'Recent Login Review', status: 'warning' },
      { label: 'Device Trust', status: 'pass' },
    ],
  },
} satisfies Meta<typeof SecurityHealthIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Good: Story = {};

export const Warning: Story = {
  args: {
    overallHealth: 'warning',
    factors: [
      { label: 'MFA Enabled', status: 'pass' },
      { label: 'Weak Password', status: 'fail' },
      { label: 'Recent Login Review', status: 'warning' },
    ],
  },
};

export const Critical: Story = {
  args: {
    overallHealth: 'critical',
    factors: [
      { label: 'MFA Disabled', status: 'fail' },
      { label: 'Weak Password', status: 'fail' },
      { label: 'Suspicious Activity', status: 'fail' },
    ],
  },
};

