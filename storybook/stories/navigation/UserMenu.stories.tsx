/**
 * @file UserMenu.stories.tsx
 * Storybook stories for UserMenu component
 */

import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { UserMenu } from '@waysnx/ui-navigation';

const meta: Meta<typeof UserMenu> = {
  title: 'Navigation/UserMenu',
  component: UserMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div>
        <TestBadge componentName="Navigation" />
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic UserMenu with minimal configuration
 */
export const Basic: Story = {
  args: {
    user: {
      name: 'John Doe',
      email: 'john@example.com',
      status: 'online',
    },
    items: [
      { id: 'profile', label: 'Profile', onClick: () => alert('Profile clicked') },
      { id: 'settings', label: 'Settings', onClick: () => alert('Settings clicked') },
      { id: 'logout', label: 'Logout', onClick: () => alert('Logout clicked'), destructive: true },
    ],
    trigger: 'click',
  },
};

/**
 * UserMenu with avatar image
 */
export const WithAvatar: Story = {
  args: {
    ...Basic.args,
    user: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
      status: 'online',
    },
  },
};

/**
 * UserMenu with hover trigger
 */
export const HoverTrigger: Story = {
  args: {
    ...Basic.args,
    trigger: 'hover',
  },
  parameters: {
    docs: {
      description: {
        story: 'The menu opens on hover instead of click.',
      },
    },
  },
};

/**
 * UserMenu with different status indicators
 */
export const WithStatusOnline: Story = {
  args: {
    ...Basic.args,
    user: {
      name: 'John Doe',
      status: 'online',
    },
    showStatus: true,
  },
};

export const WithStatusAway: Story = {
  args: {
    ...Basic.args,
    user: {
      name: 'John Doe',
      status: 'away',
    },
    showStatus: true,
  },
};

export const WithStatusBusy: Story = {
  args: {
    ...Basic.args,
    user: {
      name: 'John Doe',
      status: 'busy',
    },
    showStatus: true,
  },
};

export const WithStatusOffline: Story = {
  args: {
    ...Basic.args,
    user: {
      name: 'John Doe',
      status: 'offline',
    },
    showStatus: true,
  },
};

/**
 * UserMenu with custom trigger element
 */
export const CustomTrigger: Story = {
  args: {
    ...Basic.args,
    showTrigger: false,
    customTrigger: (
      <button style={{ padding: '8px 12px', background: '#e5e7eb', borderRadius: '4px' }}>
        👤 Menu
      </button>
    ),
  },
};

/**
 * UserMenu positioned to the left
 */
export const PositionLeft: Story = {
  args: {
    ...Basic.args,
    position: 'left',
  },
  parameters: {
    docs: {
      description: {
        story: 'The dropdown menu appears on the left side of the trigger.',
      },
    },
  },
};

/**
 * UserMenu with many menu items and dividers
 */
export const ManyItems: Story = {
  args: {
    ...Basic.args,
    items: [
      { id: 'profile', label: 'View Profile', icon: '👤', onClick: () => {} },
      { id: 'account', label: 'Account Settings', icon: '⚙️', onClick: () => {} },
      { id: 'privacy', label: 'Privacy Settings', icon: '🔒', onClick: () => {} },
      { id: 'sep1', label: '', divider: true, onClick: () => {} },
      { id: 'theme', label: 'Theme', icon: '🌙', onClick: () => {} },
      { id: 'language', label: 'Language', icon: '🌐', onClick: () => {} },
      { id: 'sep2', label: '', divider: true, onClick: () => {} },
      { id: 'help', label: 'Help & Support', icon: '❓', onClick: () => {} },
      { id: 'feedback', label: 'Send Feedback', icon: '💬', onClick: () => {} },
      { id: 'sep3', label: '', divider: true, onClick: () => {} },
      { id: 'logout', label: 'Sign Out', icon: '🚪', onClick: () => {}, destructive: true },
    ],
  },
};

/**
 * UserMenu with icons on menu items
 */
export const WithIcons: Story = {
  args: {
    ...Basic.args,
    items: [
      { id: 'profile', label: 'My Profile', icon: '👤', onClick: () => {} },
      { id: 'settings', label: 'Settings', icon: '⚙️', onClick: () => {} },
      { id: 'billing', label: 'Billing', icon: '💳', onClick: () => {} },
      { id: 'help', label: 'Help', icon: '❓', onClick: () => {} },
      { id: 'logout', label: 'Logout', icon: '🚪', onClick: () => {}, destructive: true },
    ],
  },
};

/**
 * UserMenu with disabled items
 */
export const WithDisabledItems: Story = {
  args: {
    ...Basic.args,
    items: [
      { id: 'profile', label: 'Profile', onClick: () => {} },
      { id: 'settings', label: 'Settings (unavailable)', onClick: () => {}, disabled: true },
      { id: 'logout', label: 'Logout', onClick: () => {}, destructive: true },
    ],
  },
};

/**
 * UserMenu without user info header
 */
export const NoUserInfo: Story = {
  args: {
    ...Basic.args,
    showUserInfo: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'The user info header is hidden, showing only the menu items.',
      },
    },
  },
};

/**
 * UserMenu with custom header content
 */
export const CustomHeader: Story = {
  args: {
    ...Basic.args,
    headerContent: (
      <div style={{ padding: '12px 16px', fontSize: '12px', color: '#6b7280' }}>
        Organization: ACME Inc.
      </div>
    ),
  },
};

/**
 * UserMenu with different menu widths
 */
export const CustomWidth: Story = {
  args: {
    ...Basic.args,
    menuWidth: 320,
  },
};

/**
 * UserMenu in dark mode
 */
export const DarkMode: Story = {
  args: {
    ...Basic.args,
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#1f2937', padding: '40px', borderRadius: '8px' }}>
        <style>{`
          :root {
            color-scheme: dark;
          }
        `}</style>
        <Story />
      </div>
    ),
  ],
};

/**
 * UserMenu with very long user name and email
 */
export const LongContent: Story = {
  args: {
    ...Basic.args,
    user: {
      name: 'Alexander Hamilton The Third',
      email: 'alexander.hamilton.the.third@verylongdomain.com',
      status: 'online',
    },
  },
};

/**
 * UserMenu enterprise example
 */
export const EnterpriseExample: Story = {
  args: {
    user: {
      name: 'Sarah Johnson',
      email: 'sarah.johnson@enterprise.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      status: 'online',
    },
    items: [
      { id: 'profile', label: 'My Profile', icon: '👤', onClick: () => {} },
      { id: 'org', label: 'Organization Settings', icon: '🏢', onClick: () => {} },
      { id: 'billing', label: 'Billing & Plans', icon: '💳', onClick: () => {} },
      { id: 'sep1', label: '', divider: true, onClick: () => {} },
      { id: 'api', label: 'API Keys', icon: '🔑', onClick: () => {} },
      { id: 'integrations', label: 'Integrations', icon: '🔗', onClick: () => {} },
      { id: 'sep2', label: '', divider: true, onClick: () => {} },
      { id: 'docs', label: 'Documentation', icon: '📚', onClick: () => {} },
      { id: 'support', label: 'Support', icon: '💬', onClick: () => {} },
      { id: 'sep3', label: '', divider: true, onClick: () => {} },
      { id: 'logout', label: 'Sign Out', icon: '🚪', onClick: () => {}, destructive: true },
    ],
    trigger: 'click',
    position: 'right',
    showStatus: true,
  },
};

/**
 * UserMenu mobile-friendly example
 */
export const Mobile: Story = {
  args: {
    ...Basic.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

/**
 * UserMenu with accessibility focus
 */
export const AccessibilityFocus: Story = {
  args: {
    ...Basic.args,
    ariaLabel: 'User account menu - Press Enter to open, Arrow Down to navigate items',
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates proper ARIA labels and keyboard navigation support.',
      },
    },
  },
};

/**
 * UserMenu with initials instead of avatar
 */
export const WithInitials: Story = {
  args: {
    ...Basic.args,
    user: {
      name: 'Robert Johnson',
      email: 'robert@example.com',
      status: 'online',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'When no avatar is provided, displays user initials instead.',
      },
    },
  },
};
