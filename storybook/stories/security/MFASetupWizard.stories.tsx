// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { fn } from '@storybook/test';
import { MFASetupWizard } from '@waysnx/ui-security';

const meta = {
  title: 'Security/MFA/MFASetupWizard',
  component: MFASetupWizard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div>
        <TestBadge componentName="Security" />
        <Story />
      </div>
    ),
  ],
  argTypes: {
    isLoading: { control: 'boolean', description: 'Loading state' },
  },
  args: {
    onComplete: fn(),
    onCancel: fn(),
  },
} satisfies Meta<typeof MFASetupWizard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
  args: { isLoading: true },
};

