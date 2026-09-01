// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { fn } from '@storybook/test';
import { MFASettingsPanel } from '@waysnx/ui-security';

const meta = {
  title: 'Security/MFA/MFASettingsPanel',
  component: MFASettingsPanel,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div>
        <TestBadge componentName="Security" />
        <Story />
      </div>
    ),
  ],
  args: {
    methods: [
      { id: 'totp', name: 'Authenticator App', enabled: true, type: 'totp' },
      { id: 'sms', name: 'SMS', enabled: false, type: 'sms' },
      { id: 'email', name: 'Email', enabled: false, type: 'email' },
    ],
    onToggle: fn(),
  },
} satisfies Meta<typeof MFASettingsPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllEnabled: Story = {
  args: {
    methods: [
      { id: 'totp', name: 'Authenticator App', enabled: true, type: 'totp' },
      { id: 'sms', name: 'SMS', enabled: true, type: 'sms' },
      { id: 'email', name: 'Email', enabled: true, type: 'email' },
    ],
  },
};

export const NoneEnabled: Story = {
  args: {
    methods: [
      { id: 'totp', name: 'Authenticator App', enabled: false, type: 'totp' },
      { id: 'sms', name: 'SMS', enabled: false, type: 'sms' },
    ],
  },
};

