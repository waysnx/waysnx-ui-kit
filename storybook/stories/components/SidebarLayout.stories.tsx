import type { Meta, StoryObj } from '@storybook/react';
import { SidebarLayout } from '@waysnx/ui-layout';
import { TestBadge } from '../TestBadge';

const meta = {
  title: 'Components/SidebarLayout',
  component: SidebarLayout,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div>
        <TestBadge componentName="SidebarLayout" />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SidebarLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <SidebarLayout sidebar={<div>Sidebar</div>}>
      <div>Main content</div>
    </SidebarLayout>
  ),
};
