// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { PermissionGate } from '@waysnx/ui-security';

const meta = {
  title: 'Security/Authorization/PermissionGate',
  component: PermissionGate,
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
    permission: { control: 'text', description: 'Required permission' },
    hasPermission: { control: 'boolean', description: 'Whether user has the permission' },
  },
  args: {
    permission: 'edit',
    hasPermission: true,
    children: 'This content requires edit permission to view.',
  },
} satisfies Meta<typeof PermissionGate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HasPermission: Story = {};

export const NoPermission: Story = {
  args: { hasPermission: false },
};

