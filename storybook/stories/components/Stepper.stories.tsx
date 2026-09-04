import type { Meta, StoryObj } from '@storybook/react';
import { Stepper } from '@waysnx/ui-layout';
import { TestBadge } from '../TestBadge';

const meta = {
  title: 'Components/Stepper',
  component: Stepper,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div>
        <TestBadge componentName="Stepper" />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Stepper
      currentStep={1}
      steps={[{ label: 'Step 1' }, { label: 'Step 2' }, { label: 'Step 3' }]}
    />
  ),
};
