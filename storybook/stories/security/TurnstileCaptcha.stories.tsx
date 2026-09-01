// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { fn } from '@storybook/test';
import { TurnstileCaptcha } from '@waysnx/ui-security';

const meta = {
  title: 'Security/Captcha/TurnstileCaptcha',
  component: TurnstileCaptcha,
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
    size: { control: 'select', options: ['normal', 'compact'], description: 'Captcha size' },
    theme: { control: 'select', options: ['light', 'dark'], description: 'Captcha theme' },
  },
  args: {
    onVerify: fn(),
    siteKey: 'demo-site-key',
  },
} satisfies Meta<typeof TurnstileCaptcha>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Compact: Story = {
  args: { size: 'compact' },
};

export const Dark: Story = {
  args: { theme: 'dark' },
};

