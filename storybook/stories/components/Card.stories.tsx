import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '@waysnx/ui-layout';
import { TestBadge } from '../TestBadge';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div>
        <TestBadge componentName="Card" />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card title="Card title">
      <p>Card body</p>
    </Card>
  ),
};
