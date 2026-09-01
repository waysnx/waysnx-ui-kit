// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { SecurityScore } from '@waysnx/ui-security';

const meta = {
  title: 'Security/Status/SecurityScore',
  component: SecurityScore,
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
    score: { control: { type: 'range', min: 0, max: 100 }, description: 'Security score value' },
    maxScore: { control: 'number', description: 'Maximum score' },
  },
  args: {
    score: 78,
    maxScore: 100,
  },
} satisfies Meta<typeof SecurityScore>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const HighScore: Story = {
  args: { score: 95 },
};

export const LowScore: Story = {
  args: { score: 30 },
};

export const CriticalScore: Story = {
  args: { score: 10 },
};

