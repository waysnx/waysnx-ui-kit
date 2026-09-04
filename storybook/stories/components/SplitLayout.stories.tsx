import type { Meta, StoryObj } from '@storybook/react';
import { SplitLayout } from '@waysnx/ui-layout';
import { TestBadge } from '../TestBadge';

const meta = {
  title: 'Components/SplitLayout',
  component: SplitLayout,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div>
        <TestBadge componentName="SplitLayout" />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SplitLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 480, height: 240 }}>
      <SplitLayout direction="horizontal">
        <div>Pane A</div>
        <div>Pane B</div>
      </SplitLayout>
    </div>
  ),
};
