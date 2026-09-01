// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { fn } from '@storybook/test';
import { PrivacySettingsPanel } from '@waysnx/ui-security';

const meta = {
  title: 'Security/Panels/PrivacySettingsPanel',
  component: PrivacySettingsPanel,
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
      { id: 'analytics', label: 'Usage Analytics', enabled: true },
      { id: 'cookies', label: 'Third-party Cookies', enabled: false },
      { id: 'tracking', label: 'Activity Tracking', enabled: true },
      { id: 'personalization', label: 'Personalized Content', enabled: true },
    ],
    onToggle: fn(),
  },
} satisfies Meta<typeof PrivacySettingsPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllDisabled: Story = {
  args: {
    settings: [
      { id: 'analytics', label: 'Usage Analytics', enabled: false },
      { id: 'cookies', label: 'Third-party Cookies', enabled: false },
      { id: 'tracking', label: 'Activity Tracking', enabled: false },
    ],
  },
};

