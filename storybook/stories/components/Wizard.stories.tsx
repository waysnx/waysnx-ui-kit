import type { Meta, StoryObj } from '@storybook/react';
import { Wizard, WizardStep } from '@waysnx/ui-layout';
import { TestBadge } from '../TestBadge';

const meta = {
  title: 'Components/Wizard',
  component: Wizard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div>
        <TestBadge componentName="Wizard" />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Wizard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Wizard>
      <WizardStep id="step-1" title="Step 1">
        Step 1 content
      </WizardStep>
      <WizardStep id="step-2" title="Step 2">
        Step 2 content
      </WizardStep>
    </Wizard>
  ),
};
