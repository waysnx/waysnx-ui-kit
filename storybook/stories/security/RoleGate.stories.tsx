// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { RoleGate } from '@waysnx/ui-security';

const meta = {
  title: 'Security/Authorization/RoleGate',
  component: RoleGate,
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
    role: { control: 'text', description: 'Required role' },
    userRoles: { control: 'object', description: 'User roles array' },
  },
  args: {
    role: 'admin',
    userRoles: ['admin', 'editor'],
    children: 'This content is only visible to users with the admin role.',
  },
} satisfies Meta<typeof RoleGate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HasRole: Story = {};

export const NoRole: Story = {
  args: { userRoles: ['viewer'] },
};

