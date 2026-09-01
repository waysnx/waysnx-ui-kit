// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { AuthenticatorQRCode } from '@waysnx/ui-security';

const meta = {
  title: 'Security/MFA/AuthenticatorQRCode',
  component: AuthenticatorQRCode,
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
    secret: { control: 'text', description: 'TOTP secret key' },
    accountName: { control: 'text', description: 'Account name for the authenticator' },
    isLoading: { control: 'boolean', description: 'Loading state' },
  },
  args: {
    secret: 'JBSWY3DPEHPK3PXP',
    accountName: 'john@example.com',
    uri: 'otpauth://totp/WaysNX:john@example.com?secret=JBSWY3DPEHPK3PXP&issuer=WaysNX',
  },
} satisfies Meta<typeof AuthenticatorQRCode>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
  args: { isLoading: true },
};

export const DifferentAccount: Story = {
  args: {
    accountName: 'admin@company.com',
    uri: 'otpauth://totp/WaysNX:admin@company.com?secret=JBSWY3DPEHPK3PXP&issuer=WaysNX',
  },
};

