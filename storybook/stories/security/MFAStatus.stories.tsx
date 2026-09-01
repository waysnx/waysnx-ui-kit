// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { MFAStatus } from '@waysnx/ui-security';

const meta = {
  title: 'Security/MFA/MFAStatus',
  component: MFAStatus,
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
    enabled: { control: 'boolean', description: 'Whether MFA is enabled' },
    isLoading: { control: 'boolean', description: 'Loading state' },
  },
  args: {
    enabled: true,
    methods: ['totp', 'sms'],
  },
} satisfies Meta<typeof MFAStatus>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Enabled: Story = {};

export const Disabled: Story = {
  args: { enabled: false, methods: [] },
};

export const Loading: Story = {
  args: { isLoading: true },
};

export const SingleMethod: Story = {
  args: { methods: ['totp'] },
};

