/**
 * @file NotificationCenter.stories.tsx
 * Storybook stories for NotificationCenter component
 */

import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { NotificationCenter } from '@waysnx/ui-navigation';

const meta: Meta<typeof NotificationCenter> = {
  title: 'Navigation/NotificationCenter',
  component: NotificationCenter,
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

const basicNotifications = [
  {
    id: '1',
    title: 'Welcome back!',
    message: 'You have not been here for 7 days',
    type: 'info' as const,
    read: false,
    timestamp: new Date(),
  },
  {
    id: '2',
    title: 'Project approved',
    message: 'Your project has been approved by the manager',
    type: 'success' as const,
    read: false,
    timestamp: new Date(Date.now() - 3600000),
  },
  {
    id: '3',
    title: 'Failed deployment',
    message: 'Deployment to production failed',
    type: 'error' as const,
    read: true,
    timestamp: new Date(Date.now() - 86400000),
  },
  {
    id: '4',
    title: 'API rate limit warning',
    message: 'You are approaching your API rate limit',
    type: 'warning' as const,
    read: true,
    timestamp: new Date(Date.now() - 172800000),
  },
];

/**
 * Basic NotificationCenter with default configuration
 */
export const Basic: Story = {
  args: {
    notifications: basicNotifications,
    onMarkAsRead: (id: string) => console.log('Mark as read:', id),
    onDelete: (id: string) => console.log('Delete:', id),
  },
};

/**
 * NotificationCenter with hover trigger
 */
export const HoverTrigger: Story = {
  args: {
    ...Basic.args,
    trigger: 'hover',
  },
};

/**
 * NotificationCenter with no notifications
 */
export const Empty: Story = {
  args: {
    notifications: [],
    emptyMessage: 'You are all caught up!',
  },
};

/**
 * NotificationCenter with many notifications
 */
export const ManyNotifications: Story = {
  args: {
    notifications: Array.from({ length: 25 }, (_, i) => ({
      id: `${i}`,
      title: `Notification ${i + 1}`,
      message: `This is notification number ${i + 1}`,
      type: (['info', 'success', 'warning', 'error'] as const)[i % 4],
      read: i > 10,
      timestamp: new Date(Date.now() - i * 3600000),
    })),
    maxNotifications: 10,
  },
};

/**
 * NotificationCenter with categories
 */
export const WithCategories: Story = {
  args: {
    notifications: [
      {
        id: '1',
        title: 'System Update',
        message: 'System maintenance scheduled',
        category: 'system',
        type: 'info' as const,
        read: false,
      },
      {
        id: '2',
        title: 'Profile Updated',
        message: 'Your profile was successfully updated',
        category: 'user',
        type: 'success' as const,
        read: false,
      },
      {
        id: '3',
        title: 'New Message',
        message: 'You have a new message',
        category: 'messages',
        type: 'info' as const,
        read: true,
      },
    ],
    showCategories: true,
    categories: [
      { id: 'system', label: 'System', icon: '⚙️' },
      { id: 'user', label: 'User', icon: '👤' },
      { id: 'messages', label: 'Messages', icon: '💬' },
    ],
  },
};

/**
 * NotificationCenter with notification actions
 */
export const WithActions: Story = {
  args: {
    notifications: [
      {
        id: '1',
        title: 'Changes saved',
        message: 'Your document was saved',
        type: 'success' as const,
        read: false,
        action: { label: 'View', onClick: () => alert('View clicked') },
      },
      {
        id: '2',
        title: 'Item deleted',
        message: 'The item has been deleted',
        type: 'warning' as const,
        read: false,
        action: { label: 'Undo', onClick: () => alert('Undo clicked') },
      },
    ],
  },
};

/**
 * NotificationCenter with avatars
 */
export const WithAvatars: Story = {
  args: {
    notifications: [
      {
        id: '1',
        title: 'John Doe commented',
        message: '"Great work on this!"',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
        read: false,
      },
      {
        id: '2',
        title: 'Jane Smith liked',
        message: 'Your post got a like',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
        read: false,
      },
    ],
  },
};

/**
 * NotificationCenter with icons
 */
export const WithIcons: Story = {
  args: {
    notifications: [
      {
        id: '1',
        title: 'Email received',
        icon: '📧',
        type: 'info' as const,
        read: false,
      },
      {
        id: '2',
        title: 'File uploaded',
        icon: '📁',
        type: 'success' as const,
        read: false,
      },
      {
        id: '3',
        title: 'Server error',
        icon: '❌',
        type: 'error' as const,
        read: true,
      },
    ],
  },
};

/**
 * NotificationCenter with badge hidden
 */
export const NoBadge: Story = {
  args: {
    ...Basic.args,
    showBadge: false,
  },
};

/**
 * NotificationCenter positioned left
 */
export const PositionLeft: Story = {
  args: {
    ...Basic.args,
    position: 'left',
  },
};

/**
 * NotificationCenter with custom width
 */
export const CustomWidth: Story = {
  args: {
    ...Basic.args,
    menuWidth: 450,
  },
};

/**
 * NotificationCenter in dark mode
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
 * NotificationCenter enterprise example
 */
export const EnterpriseExample: Story = {
  args: {
    notifications: [
      {
        id: '1',
        title: 'Report generated',
        message: 'Monthly sales report is ready for review',
        category: 'reports',
        type: 'success' as const,
        read: false,
        timestamp: new Date(),
        icon: '📊',
      },
      {
        id: '2',
        title: 'Quota exceeded',
        message: 'Your team has exceeded the monthly quota',
        category: 'alerts',
        type: 'warning' as const,
        read: false,
        timestamp: new Date(Date.now() - 3600000),
        icon: '⚠️',
      },
      {
        id: '3',
        title: 'Approval required',
        message: 'Purchase order #12345 awaits your approval',
        category: 'workflow',
        type: 'info' as const,
        read: false,
        timestamp: new Date(Date.now() - 7200000),
        action: { label: 'Review', onClick: () => {} },
      },
      {
        id: '4',
        title: 'Database backup failed',
        message: 'Automatic backup could not be completed',
        category: 'system',
        type: 'error' as const,
        read: true,
        timestamp: new Date(Date.now() - 86400000),
      },
    ],
    showCategories: true,
    categories: [
      { id: 'reports', label: 'Reports', icon: '📊' },
      { id: 'alerts', label: 'Alerts', icon: '🔔' },
      { id: 'workflow', label: 'Workflow', icon: '⚡' },
      { id: 'system', label: 'System', icon: '⚙️' },
    ],
    showBadge: true,
    showClearAll: true,
  },
};

/**
 * NotificationCenter with long content
 */
export const LongContent: Story = {
  args: {
    notifications: [
      {
        id: '1',
        title: 'This is a very long notification title that might wrap to multiple lines',
        message:
          'This notification has a very long message that contains detailed information about what happened. It provides context and details that users might need to understand the notification better.',
        type: 'info' as const,
        read: false,
      },
    ],
  },
};

/**
 * NotificationCenter without clear all button
 */
export const NoClearAll: Story = {
  args: {
    ...Basic.args,
    showClearAll: false,
  },
};

/**
 * NotificationCenter mobile-friendly
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
 * NotificationCenter with accessibility focus
 */
export const AccessibilityFocus: Story = {
  args: {
    ...Basic.args,
    ariaLabel: 'Notification center - press Enter to open, use arrow keys to navigate',
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
 * NotificationCenter minimal (no badge, no clear all)
 */
export const Minimal: Story = {
  args: {
    notifications: basicNotifications.slice(0, 2),
    showBadge: false,
    showClearAll: false,
  },
};

/**
 * NotificationCenter with all unread
 */
export const AllUnread: Story = {
  args: {
    notifications: basicNotifications.map((n) => ({ ...n, read: false })),
  },
};

/**
 * NotificationCenter with all read
 */
export const AllRead: Story = {
  args: {
    notifications: basicNotifications.map((n) => ({ ...n, read: true })),
  },
};
