// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { SecureDownloadButton } from '@waysnx/ui-security';

const meta = {
  title: 'Security/Secure Inputs/SecureDownloadButton',
  component: SecureDownloadButton,
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
    fileName: { control: 'text', description: 'File name to download' },
    label: { control: 'text', description: 'Button label' },
    loadingLabel: { control: 'text', description: 'Label while downloading' },
    disabled: { control: 'boolean', description: 'Disabled state' },
    size: { control: 'select', options: ['sm', 'md', 'lg'], description: 'Button size' },
    variant: { control: 'select', options: ['primary', 'secondary', 'outline', 'ghost'], description: 'Button variant' },
  },
  args: {
    fileName: 'backup-codes.pdf',
    label: 'Download securely',
  },
} satisfies Meta<typeof SecureDownloadButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Small: Story = {
  args: { size: 'sm' },
};

export const Outline: Story = {
  args: { variant: 'outline' },
};

