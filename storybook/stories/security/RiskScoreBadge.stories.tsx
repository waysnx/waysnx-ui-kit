// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { RiskScoreBadge } from '@waysnx/ui-security';

const meta = {
  title: 'Security/Status/RiskScoreBadge',
  component: RiskScoreBadge,
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
    score: { control: { type: 'range', min: 0, max: 100 }, description: 'Risk score value' },
    label: { control: 'text', description: 'Badge label' },
  },
  args: {
    score: 35,
    label: 'Low Risk',
  },
} satisfies Meta<typeof RiskScoreBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LowRisk: Story = {};

export const MediumRisk: Story = {
  args: { score: 55, label: 'Medium Risk' },
};

export const HighRisk: Story = {
  args: { score: 85, label: 'High Risk' },
};

export const CriticalRisk: Story = {
  args: { score: 95, label: 'Critical' },
};

