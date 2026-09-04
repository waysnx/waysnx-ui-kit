import type { Meta, StoryObj } from '@storybook/react';
import { Spacer } from '@waysnx/ui-layout';
import { TestBadge } from '../TestBadge';

const meta = {
  title: 'Components/Spacer',
  component: Spacer,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div>
        <TestBadge componentName="Spacer" />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Spacer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div>
      <div>Above</div>
      <Spacer size="md" />
      <div>Below</div>
    </div>
  ),
};
