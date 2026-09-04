import type { Meta, StoryObj } from '@storybook/react';
import { Column } from '@waysnx/ui-layout';
import { TestBadge } from '../TestBadge';

const meta = {
  title: 'Components/Column',
  component: Column,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div>
        <TestBadge componentName="Column" />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Column>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Column gap={12}>
      <div>Item 1</div>
      <div>Item 2</div>
    </Column>
  ),
};
