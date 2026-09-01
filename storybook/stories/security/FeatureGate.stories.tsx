// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { FeatureGate } from '@waysnx/ui-security';

const meta = {
  title: 'Security/Authorization/FeatureGate',
  component: FeatureGate,
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
    featureId: { control: 'text', description: 'Feature flag identifier' },
    isEnabled: { control: 'boolean', description: 'Whether the feature is enabled' },
  },
  args: {
    featureId: 'new-dashboard',
    isEnabled: true,
    children: 'This content is only visible when the feature flag is enabled.',
  },
} satisfies Meta<typeof FeatureGate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Enabled: Story = {};

export const Disabled: Story = {
  args: { isEnabled: false },
};

