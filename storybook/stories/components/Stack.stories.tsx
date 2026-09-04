import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from '@waysnx/ui-layout';
import { TestBadge } from '../TestBadge';

const meta = {
  title: 'Components/Stack',
  component: Stack,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div>
        <TestBadge componentName="Stack" />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Stack gap="md" direction="vertical">
      <div>A</div>
      <div>B</div>
    </Stack>
  ),
};
