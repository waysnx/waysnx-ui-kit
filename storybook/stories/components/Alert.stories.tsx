import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from '@waysnx/ui-feedback';
import { TestBadge } from '../TestBadge';

const meta = {
  title: 'Components/Alert',
  component: Alert,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div>
        <TestBadge componentName="Alert" />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Alert type="info">This is an alert</Alert>,
};
