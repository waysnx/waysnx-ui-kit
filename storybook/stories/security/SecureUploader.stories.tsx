// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { fn } from '@storybook/test';
import { SecureUploader } from '@waysnx/ui-security';

const meta = {
  title: 'Security/Secure Inputs/SecureUploader',
  component: SecureUploader,
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
    label: { control: 'text', description: 'Upload label' },
    multiple: { control: 'boolean', description: 'Allow multiple files' },
    isLoading: { control: 'boolean', description: 'Loading state' },
  },
  args: {
    label: 'Secure file upload',
    onUpload: fn(),
  },
} satisfies Meta<typeof SecureUploader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Multiple: Story = {
  args: { multiple: true, label: 'Upload multiple files' },
};

export const Loading: Story = {
  args: { isLoading: true },
};

