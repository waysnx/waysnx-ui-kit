// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { ScopeGate } from '@waysnx/ui-security';

const meta = {
  title: 'Security/Authorization/ScopeGate',
  component: ScopeGate,
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
    scope: { control: 'text', description: 'Required scope' },
    grantedScopes: { control: 'object', description: 'User granted scopes array' },
  },
  args: {
    scope: 'read:users',
    grantedScopes: ['read:users', 'write:users'],
    children: 'This content requires the read:users scope.',
  },
} satisfies Meta<typeof ScopeGate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HasScope: Story = {};

export const NoScope: Story = {
  args: { grantedScopes: ['read:posts'] },
};

