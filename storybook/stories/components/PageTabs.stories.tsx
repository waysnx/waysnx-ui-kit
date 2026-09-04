import type { Meta, StoryObj } from '@storybook/react';
import { PageTabs } from '@waysnx/ui-layout';
import { TestBadge } from '../TestBadge';

const meta = {
  title: 'Components/PageTabs',
  component: PageTabs,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div>
        <TestBadge componentName="PageTabs" />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PageTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <PageTabs
      activeTab="overview"
      tabs={[
        { id: 'overview', label: 'Overview' },
        { id: 'details', label: 'Details' },
      ]}
      onTabChange={() => {}}
    />
  ),
};
