import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from '@waysnx/ui-feedback';
import { TestBadge } from '../TestBadge';

const meta = {
  title: 'Components/Toast',
  component: Toast,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div>
        <TestBadge componentName="Toast" />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Toast type="info" message="Toast message" />,
};
