/**
 * @file RecentItems.stories.tsx
 * Storybook stories for RecentItems component
 */

import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { RecentItems } from '@waysnx/ui-navigation';
import type { RecentItem } from '@waysnx/ui-navigation';
import { useState } from 'react';

const now = new Date();
const EXAMPLE_RECENTS: RecentItem[] = [
  {
    id: '1',
    label: 'Q3 Financial Report',
    href: '/reports/q3',
    icon: '📊',
    type: 'Report',
    timestamp: new Date(now.getTime() - 5 * 60000),
  },
  {
    id: '2',
    label: 'Product Roadmap',
    href: '/docs/roadmap',
    icon: '🗺️',
    type: 'Document',
    timestamp: new Date(now.getTime() - 30 * 60000),
  },
  {
    id: '3',
    label: 'Marketing Dashboard',
    href: '/dashboards/marketing',
    icon: '📈',
    type: 'Dashboard',
    timestamp: new Date(now.getTime() - 2 * 3600000),
  },
  {
    id: '4',
    label: 'User Analytics',
    href: '/analytics/users',
    icon: '👥',
    type: 'Analytics',
    timestamp: new Date(now.getTime() - 24 * 3600000),
  },
  {
    id: '5',
    label: 'Team Settings',
    href: '/settings/team',
    icon: '⚙️',
    type: 'Settings',
    timestamp: new Date(now.getTime() - 72 * 3600000),
  },
];

const meta: Meta<typeof RecentItems> = {
  title: 'Enterprise/RecentItems',
  component: RecentItems,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['dropdown', 'list', 'compact'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    showClearButton: {
      control: 'boolean',
    },
    showTimestamps: {
      control: 'boolean',
    },
    showTypes: {
      control: 'boolean',
    },
    groupByType: {
      control: 'boolean',
    },
  },
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

// Default dropdown variant
export const Default: Story = {
  render: (args) => (
    <RecentItems
      {...args}
      items={EXAMPLE_RECENTS}
      onItemSelect={(item) => console.log('Selected:', item.label)}
    />
  ),
  args: {
    variant: 'dropdown',
    size: 'md',
    showClearButton: true,
    showTimestamps: true,
    showTypes: true,
    groupByType: false,
  },
};

// List variant
export const List: Story = {
  render: (args) => (
    <div style={{ maxWidth: '400px' }}>
      <RecentItems
        {...args}
        items={EXAMPLE_RECENTS}
        onItemSelect={(item) => console.log('Selected:', item.label)}
      />
    </div>
  ),
  args: {
    variant: 'list',
    size: 'md',
    showClearButton: true,
    showTimestamps: true,
    showTypes: true,
    groupByType: true,
  },
};

// Compact variant
export const Compact: Story = {
  render: (args) => (
    <RecentItems
      {...args}
      items={EXAMPLE_RECENTS}
      onItemSelect={(item) => console.log('Selected:', item.label)}
    />
  ),
  args: {
    variant: 'compact',
    size: 'md',
    showClearButton: false,
    showTimestamps: false,
    showTypes: false,
  },
};

// With grouped items
export const GroupedByType: Story = {
  render: (args) => (
    <div style={{ maxWidth: '400px' }}>
      <RecentItems
        {...args}
        items={EXAMPLE_RECENTS}
        onItemSelect={(item) => console.log('Selected:', item.label)}
      />
    </div>
  ),
  args: {
    variant: 'dropdown',
    size: 'md',
    showClearButton: true,
    showTimestamps: true,
    showTypes: true,
    groupByType: true,
  },
};

// Without timestamps
export const NoTimestamps: Story = {
  render: (args) => (
    <RecentItems
      {...args}
      items={EXAMPLE_RECENTS}
      onItemSelect={(item) => console.log('Selected:', item.label)}
    />
  ),
  args: {
    variant: 'dropdown',
    size: 'md',
    showClearButton: true,
    showTimestamps: false,
    showTypes: true,
  },
};

// Size variations - Small
export const Small: Story = {
  render: (args) => (
    <RecentItems
      {...args}
      items={EXAMPLE_RECENTS}
      onItemSelect={(item) => console.log('Selected:', item.label)}
    />
  ),
  args: {
    variant: 'dropdown',
    size: 'sm',
    showClearButton: true,
    showTimestamps: true,
  },
};

// Size variations - Large
export const Large: Story = {
  render: (args) => (
    <RecentItems
      {...args}
      items={EXAMPLE_RECENTS}
      onItemSelect={(item) => console.log('Selected:', item.label)}
    />
  ),
  args: {
    variant: 'dropdown',
    size: 'lg',
    showClearButton: true,
    showTimestamps: true,
  },
};

// Empty state
export const Empty: Story = {
  render: (args) => (
    <RecentItems
      {...args}
      items={[]}
      onItemSelect={(item) => console.log('Selected:', item.label)}
    />
  ),
  args: {
    variant: 'dropdown',
    size: 'md',
    showClearButton: true,
  },
};

// Limited items
export const LimitedItems: Story = {
  render: (args) => (
    <RecentItems
      {...args}
      items={EXAMPLE_RECENTS}
      maxItems={3}
      onItemSelect={(item) => console.log('Selected:', item.label)}
    />
  ),
  args: {
    variant: 'dropdown',
    size: 'md',
    showClearButton: true,
    showTimestamps: true,
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
      <div>
        <h3>Dropdown</h3>
        <RecentItems
          variant="dropdown"
          items={EXAMPLE_RECENTS}
          onItemSelect={(item) => console.log('Selected:', item.label)}
        />
      </div>
      <div>
        <h3>List</h3>
        <div style={{ maxWidth: '400px' }}>
          <RecentItems
            variant="list"
            items={EXAMPLE_RECENTS}
            onItemSelect={(item) => console.log('Selected:', item.label)}
          />
        </div>
      </div>
      <div>
        <h3>Compact</h3>
        <RecentItems
          variant="compact"
          items={EXAMPLE_RECENTS}
          onItemSelect={(item) => console.log('Selected:', item.label)}
        />
      </div>
    </div>
  ),
};

// Interactive example
export const Interactive: Story = {
  render: (args) => {
    const [lastSelected, setLastSelected] = useState<string>('');

    return (
      <div>
        <RecentItems
          {...args}
          items={EXAMPLE_RECENTS}
          onItemSelect={(item) => setLastSelected(item.label)}
        />
        {lastSelected && (
          <div style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>
            Last selected: <strong>{lastSelected}</strong>
          </div>
        )}
      </div>
    );
  },
  args: {
    variant: 'dropdown',
    size: 'md',
    showClearButton: true,
    showTimestamps: true,
    showTypes: true,
  },
};
