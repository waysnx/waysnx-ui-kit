import type { Meta, StoryObj } from '@storybook/react';
import { Grid } from '@waysnx/ui-layout';
import { TestBadge } from '../TestBadge';

const meta = {
  title: 'Components/Grid',
  component: Grid,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div>
        <TestBadge componentName="Grid" />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Grid columns={3} gap={12}>
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </Grid>
  ),
};
