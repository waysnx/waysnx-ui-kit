import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { useState } from 'react';
import { Menu } from '@waysnx/ui-navigation';
import type { NavigationItem } from '@waysnx/ui-navigation';

const meta = {
  title: 'Navigation/Menu',
  component: Menu,
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
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample menu items
const sampleItems: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/dashboard',
    icon: '📊',
  },
  {
    id: 'users',
    label: 'Users',
    href: '/users',
    icon: '👥',
    children: [
      {
        id: 'users-list',
        label: 'List',
        href: '/users/list',
      },
      {
        id: 'users-new',
        label: 'New User',
        href: '/users/new',
      },
      {
        id: 'users-roles',
        label: 'Roles',
        href: '/users/roles',
      },
    ],
  },
  {
    id: 'products',
    label: 'Products',
    href: '/products',
    icon: '📦',
    children: [
      {
        id: 'products-list',
        label: 'All Products',
        href: '/products',
      },
      {
        id: 'products-new',
        label: 'Add Product',
        href: '/products/new',
      },
      {
        id: 'products-categories',
        label: 'Categories',
        href: '/products/categories',
        children: [
          {
            id: 'cat-electronics',
            label: 'Electronics',
            href: '/products/categories/electronics',
          },
          {
            id: 'cat-clothing',
            label: 'Clothing',
            href: '/products/categories/clothing',
          },
        ],
      },
    ],
  },
  {
    id: 'settings',
    label: 'Settings',
    href: '/settings',
    icon: '⚙️',
  },
];

export const Vertical: Story = {
  args: {
    items: sampleItems,
    orientation: 'vertical',
    density: 'normal',
  },
  render: (args) => {
    const [activeItem, setActiveItem] = useState<NavigationItem | undefined>();
    return (
      <Menu
        {...args}
        activeItem={activeItem}
        onActiveChange={setActiveItem}
      />
    );
  },
};

export const Horizontal: Story = {
  args: {
    items: sampleItems.slice(0, 4),
    orientation: 'horizontal',
    density: 'normal',
  },
  render: (args) => {
    const [activeItem, setActiveItem] = useState<NavigationItem | undefined>();
    return (
      <div style={{ width: '100%' }}>
        <Menu
          {...args}
          activeItem={activeItem}
          onActiveChange={setActiveItem}
        />
      </div>
    );
  },
};

export const Compact: Story = {
  args: {
    items: sampleItems,
    orientation: 'vertical',
    density: 'compact',
  },
  render: (args) => {
    const [activeItem, setActiveItem] = useState<NavigationItem | undefined>();
    return (
      <Menu
        {...args}
        activeItem={activeItem}
        onActiveChange={setActiveItem}
      />
    );
  },
};

export const Spacious: Story = {
  args: {
    items: sampleItems,
    orientation: 'vertical',
    density: 'spacious',
  },
  render: (args) => {
    const [activeItem, setActiveItem] = useState<NavigationItem | undefined>();
    return (
      <Menu
        {...args}
        activeItem={activeItem}
        onActiveChange={setActiveItem}
      />
    );
  },
};

export const WithoutIcons: Story = {
  args: {
    items: sampleItems,
    orientation: 'vertical',
    showIcons: false,
  },
  render: (args) => {
    const [activeItem, setActiveItem] = useState<NavigationItem | undefined>();
    return (
      <Menu
        {...args}
        activeItem={activeItem}
        onActiveChange={setActiveItem}
      />
    );
  },
};

export const WithBadges: Story = {
  args: {
    items: [
      {
        id: 'inbox',
        label: 'Inbox',
        href: '/inbox',
        badge: 5,
        icon: '📬',
      },
      {
        id: 'notifications',
        label: 'Notifications',
        href: '/notifications',
        badge: 12,
        icon: '🔔',
      },
      {
        id: 'messages',
        label: 'Messages',
        href: '/messages',
        badge: 3,
        icon: '💬',
      },
    ],
    orientation: 'vertical',
    showBadges: true,
  },
  render: (args) => {
    const [activeItem, setActiveItem] = useState<NavigationItem | undefined>();
    return (
      <Menu
        {...args}
        activeItem={activeItem}
        onActiveChange={setActiveItem}
      />
    );
  },
};

export const Minimal: Story = {
  args: {
    items: sampleItems,
    variant: 'minimal',
    orientation: 'vertical',
  },
  render: (args) => {
    const [activeItem, setActiveItem] = useState<NavigationItem | undefined>();
    return (
      <Menu
        {...args}
        activeItem={activeItem}
        onActiveChange={setActiveItem}
      />
    );
  },
};

export const Elevated: Story = {
  args: {
    items: sampleItems,
    variant: 'elevated',
    orientation: 'vertical',
  },
  render: (args) => {
    const [activeItem, setActiveItem] = useState<NavigationItem | undefined>();
    return (
      <Menu
        {...args}
        activeItem={activeItem}
        onActiveChange={setActiveItem}
      />
    );
  },
};

export const WithDisabledItems: Story = {
  args: {
    items: [
      {
        id: 'enabled',
        label: 'Enabled Item',
        href: '/enabled',
        icon: '✅',
      },
      {
        id: 'disabled',
        label: 'Disabled Item',
        href: '/disabled',
        disabled: true,
        icon: '🚫',
      },
      {
        id: 'hidden',
        label: 'Hidden Item',
        href: '/hidden',
        hidden: true,
        icon: '👁️',
      },
    ],
    orientation: 'vertical',
  },
  render: (args) => {
    const [activeItem, setActiveItem] = useState<NavigationItem | undefined>();
    return (
      <Menu
        {...args}
        activeItem={activeItem}
        onActiveChange={setActiveItem}
      />
    );
  },
};

export const DarkMode: Story = {
  args: {
    items: sampleItems,
    orientation: 'vertical',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#1e1e1e', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => {
    const [activeItem, setActiveItem] = useState<NavigationItem | undefined>();
    return (
      <Menu
        {...args}
        activeItem={activeItem}
        onActiveChange={setActiveItem}
      />
    );
  },
};

export const NestedMenu: Story = {
  args: {
    items: [
      {
        id: 'parent1',
        label: 'Parent 1',
        href: '/parent1',
        children: [
          {
            id: 'child1-1',
            label: 'Child 1.1',
            href: '/parent1/child1',
            children: [
              {
                id: 'grandchild1-1-1',
                label: 'Grandchild 1.1.1',
                href: '/parent1/child1/grandchild1',
              },
            ],
          },
          {
            id: 'child1-2',
            label: 'Child 1.2',
            href: '/parent1/child2',
          },
        ],
      },
      {
        id: 'parent2',
        label: 'Parent 2',
        href: '/parent2',
        children: [
          {
            id: 'child2-1',
            label: 'Child 2.1',
            href: '/parent2/child1',
          },
        ],
      },
    ],
    orientation: 'vertical',
  },
  render: (args) => {
    const [activeItem, setActiveItem] = useState<NavigationItem | undefined>();
    return (
      <Menu
        {...args}
        activeItem={activeItem}
        onActiveChange={setActiveItem}
      />
    );
  },
};

export const Accessibility: Story = {
  args: {
    items: sampleItems,
    orientation: 'vertical',
    keyboardNav: true,
    ariaLabel: 'Main navigation menu',
  },
  parameters: {
    docs: {
      description: {
        story: 'This menu supports keyboard navigation (arrow keys, enter, escape) and ARIA attributes for screen readers.',
      },
    },
  },
  render: (args) => {
    const [activeItem, setActiveItem] = useState<NavigationItem | undefined>();
    return (
      <Menu
        {...args}
        activeItem={activeItem}
        onActiveChange={setActiveItem}
      />
    );
  },
};
