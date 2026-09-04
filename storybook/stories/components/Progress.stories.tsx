import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from '@waysnx/ui-feedback';
import { TestBadge } from '../TestBadge';

const meta = {
  title: 'Components/Progress',
  component: Progress,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div>
        <TestBadge componentName="Progress" />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <Progress value={60} max={100} label="Loading" showValue />
    </div>
  ),
};
