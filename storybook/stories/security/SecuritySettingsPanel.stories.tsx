// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { fn } from '@storybook/test';
import { SecuritySettingsPanel } from '@waysnx/ui-security';

const meta = {
  title: 'Security/Panels/SecuritySettingsPanel',
  component: SecuritySettingsPanel,
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
    settings: [
      { id: 'mfa', label: 'Two-Factor Authentication', enabled: true },
      { id: 'alerts', label: 'Security Alerts', enabled: true },
      { id: 'sessions', label: 'Session Management', enabled: false },
      { id: 'audit', label: 'Audit Logging', enabled: true },
    ],
    onToggle: fn(),
  },
} satisfies Meta<typeof SecuritySettingsPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllEnabled: Story = {
  args: {
    settings: [
      { id: 'mfa', label: 'Two-Factor Authentication', enabled: true },
      { id: 'alerts', label: 'Security Alerts', enabled: true },
      { id: 'sessions', label: 'Session Management', enabled: true },
    ],
  },
};

export const AllDisabled: Story = {
  args: {
    settings: [
      { id: 'mfa', label: 'Two-Factor Authentication', enabled: false },
      { id: 'alerts', label: 'Security Alerts', enabled: false },
      { id: 'sessions', label: 'Session Management', enabled: false },
    ],
  },
};

