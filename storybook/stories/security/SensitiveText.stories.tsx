// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { SensitiveText } from '@waysnx/ui-security';

const meta = {
  title: 'Security/Secure Inputs/SensitiveText',
  component: SensitiveText,
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
    text: { control: 'text', description: 'Sensitive text value' },
    masked: { control: 'boolean', description: 'Whether text is masked' },
    revealLabel: { control: 'text', description: 'Reveal button label' },
    hideLabel: { control: 'text', description: 'Hide button label' },
  },
  args: {
    text: 'sk_live_abc123xyz789def456',
    masked: true,
  },
} satisfies Meta<typeof SensitiveText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Masked: Story = {};

export const Revealed: Story = {
  args: { masked: false },
};

export const APIKey: Story = {
  args: { text: 'api_key_9f8e7d6c5b4a3210' },
};

export const CustomLabels: Story = {
  args: { revealLabel: 'Show', hideLabel: 'Hide' },
};

