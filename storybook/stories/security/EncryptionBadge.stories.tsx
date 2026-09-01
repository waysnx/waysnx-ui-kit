// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { EncryptionBadge } from '@waysnx/ui-security';

const meta = {
  title: 'Security/Status/EncryptionBadge',
  component: EncryptionBadge,
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
    encrypted: { control: 'boolean', description: 'Whether data is encrypted' },
    algorithm: { control: 'text', description: 'Encryption algorithm' },
  },
  args: {
    encrypted: true,
    algorithm: 'AES-256',
  },
} satisfies Meta<typeof EncryptionBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Encrypted: Story = {};

export const NotEncrypted: Story = {
  args: { encrypted: false, algorithm: '' },
};

export const RSA: Story = {
  args: { algorithm: 'RSA-4096' },
};

