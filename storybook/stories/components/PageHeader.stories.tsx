import type { Meta, StoryObj } from '@storybook/react';
import { PageHeader } from '@waysnx/ui-layout';
import { TestBadge } from '../TestBadge';

const meta = {
  title: 'Components/PageHeader',
  component: PageHeader,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div>
        <TestBadge componentName="PageHeader" />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <PageHeader>
      <h1>Header</h1>
    </PageHeader>
  ),
};
