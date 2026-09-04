import type { Meta, StoryObj } from '@storybook/react';
import { PageLayout } from '@waysnx/ui-layout';
import { TestBadge } from '../TestBadge';

const meta = {
  title: 'Components/PageLayout',
  component: PageLayout,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div>
        <TestBadge componentName="PageLayout" />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PageLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <PageLayout>
      <p>Page</p>
    </PageLayout>
  ),
};
