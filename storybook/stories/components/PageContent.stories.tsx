import type { Meta, StoryObj } from '@storybook/react';
import { PageContent } from '@waysnx/ui-layout';
import { TestBadge } from '../TestBadge';

const meta = {
  title: 'Components/PageContent',
  component: PageContent,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div>
        <TestBadge componentName="PageContent" />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PageContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <PageContent>
      <p>Content</p>
    </PageContent>
  ),
};
