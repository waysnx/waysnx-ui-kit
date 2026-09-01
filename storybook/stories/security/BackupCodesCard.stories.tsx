// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { fn } from '@storybook/test';
import { BackupCodesCard } from '@waysnx/ui-security';

const meta = {
  title: 'Security/MFA/BackupCodesCard',
  component: BackupCodesCard,
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
  args: {
    codes: ['ABC123', 'DEF456', 'GHI789', 'JKL012', 'MNO345', 'PQR678', 'STU901', 'VWX234'],
    onRegenerate: fn(),
  },
} satisfies Meta<typeof BackupCodesCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FewCodes: Story = {
  args: { codes: ['ABC123', 'DEF456'] },
};

