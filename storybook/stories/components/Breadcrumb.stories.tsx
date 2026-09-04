import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb } from '@waysnx/ui-layout';
import { TestBadge } from '../TestBadge';

const meta = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div>
        <TestBadge componentName="Breadcrumb" />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', href: '#' },
      { label: 'Library', href: '#' },
      { label: 'Data' },
    ],
  },
};
