/**
 * @file FavoritesMenu.stories.tsx
 * Storybook stories for FavoritesMenu component
 */

import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { FavoritesMenu } from '@waysnx/ui-navigation';
import type { FavoriteItem } from '@waysnx/ui-navigation';
import { useState } from 'react';

const EXAMPLE_FAVORITES: FavoriteItem[] = [
  {
    id: '1',
    label: 'Home',
    href: '/',
    icon: '🏠',
    category: 'Pages',
    timestamp: new Date(),
  },
  {
    id: '2',
    label: 'Dashboard',
    href: '/dashboard',
    icon: '📊',
    category: 'Pages',
    timestamp: new Date(),
  },
  {
    id: '3',
    label: 'Settings',
    href: '/settings',
    icon: '⚙️',
    category: 'Admin',
    timestamp: new Date(),
  },
  {
    id: '4',
    label: 'Profile',
    href: '/profile',
    icon: '👤',
    category: 'User',
    timestamp: new Date(),
  },
  {
    id: '5',
    label: 'Analytics',
    href: '/analytics',
    icon: '📈',
    category: 'Pages',
    timestamp: new Date(),
  },
  {
    id: '6',
    label: 'Reports',
    href: '/reports',
    icon: '📋',
    category: 'Admin',
    timestamp: new Date(),
  },
];

const meta: Meta<typeof FavoritesMenu> = {
  title: 'Enterprise/FavoritesMenu',
  component: FavoritesMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['dropdown', 'inline', 'compact'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    showBadge: {
      control: 'boolean',
    },
    showCategories: {
      control: 'boolean',
    },
    enableDragDrop: {
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
    <FavoritesMenu
      {...args}
      items={EXAMPLE_FAVORITES}
      onItemSelect={(item) => console.log('Selected:', item.label)}
    />
  ),
  args: {
    variant: 'dropdown',
    size: 'md',
    showBadge: true,
    showCategories: true,
    enableDragDrop: false,
  },
};

// Inline variant
export const Inline: Story = {
  render: (args) => (
    <FavoritesMenu
      {...args}
      items={EXAMPLE_FAVORITES}
      onItemSelect={(item) => console.log('Selected:', item.label)}
    />
  ),
  args: {
    variant: 'inline',
    size: 'md',
    showBadge: false,
    showCategories: true,
  },
};

// Compact variant
export const Compact: Story = {
  render: (args) => (
    <FavoritesMenu
      {...args}
      items={EXAMPLE_FAVORITES}
      onItemSelect={(item) => console.log('Selected:', item.label)}
    />
  ),
  args: {
    variant: 'compact',
    size: 'md',
    showBadge: false,
    showCategories: false,
  },
};

// With toggle favorite
export const WithToggleFavorite: Story = {
  render: (args) => {
    const [favorites] = useState(EXAMPLE_FAVORITES);
    const [favorited, setFavorited] = useState(new Set(EXAMPLE_FAVORITES.map((f) => f.id)));

    const handleToggle = (item: FavoriteItem, isFav: boolean) => {
      if (isFav) {
        setFavorited((prev) => new Set(prev).add(item.id));
      } else {
        setFavorited((prev) => {
          const newSet = new Set(prev);
          newSet.delete(item.id);
          return newSet;
        });
      }
    };

    return (
      <FavoritesMenu
        {...args}
        items={favorites}
        onItemSelect={(item) => console.log('Selected:', item.label)}
        onToggleFavorite={handleToggle}
        isFavorited={(id) => favorited.has(id)}
      />
    );
  },
  args: {
    variant: 'dropdown',
    size: 'md',
    showBadge: true,
    showCategories: true,
  },
};

// Size variations - Small
export const Small: Story = {
  render: (args) => (
    <FavoritesMenu
      {...args}
      items={EXAMPLE_FAVORITES}
      onItemSelect={(item) => console.log('Selected:', item.label)}
    />
  ),
  args: {
    variant: 'dropdown',
    size: 'sm',
    showBadge: true,
  },
};

// Size variations - Large
export const Large: Story = {
  render: (args) => (
    <FavoritesMenu
      {...args}
      items={EXAMPLE_FAVORITES}
      onItemSelect={(item) => console.log('Selected:', item.label)}
    />
  ),
  args: {
    variant: 'dropdown',
    size: 'lg',
    showBadge: true,
  },
};

// Empty state
export const Empty: Story = {
  render: (args) => (
    <FavoritesMenu
      {...args}
      items={[]}
      onItemSelect={(item) => console.log('Selected:', item.label)}
    />
  ),
  args: {
    variant: 'dropdown',
    size: 'md',
    showBadge: true,
  },
};

// Limited display
export const LimitedDisplay: Story = {
  render: (args) => (
    <FavoritesMenu
      {...args}
      items={EXAMPLE_FAVORITES}
      maxDisplayed={3}
      onItemSelect={(item) => console.log('Selected:', item.label)}
    />
  ),
  args: {
    variant: 'dropdown',
    size: 'md',
    showBadge: true,
  },
};

// Without categories
export const WithoutCategories: Story = {
  render: (args) => (
    <FavoritesMenu
      {...args}
      items={EXAMPLE_FAVORITES}
      onItemSelect={(item) => console.log('Selected:', item.label)}
    />
  ),
  args: {
    variant: 'inline',
    size: 'md',
    showCategories: false,
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
      <div>
        <h3>Dropdown</h3>
        <FavoritesMenu
          variant="dropdown"
          items={EXAMPLE_FAVORITES}
          onItemSelect={(item) => console.log('Selected:', item.label)}
        />
      </div>
      <div>
        <h3>Inline</h3>
        <div style={{ maxWidth: '400px' }}>
          <FavoritesMenu
            variant="inline"
            items={EXAMPLE_FAVORITES}
            onItemSelect={(item) => console.log('Selected:', item.label)}
          />
        </div>
      </div>
      <div>
        <h3>Compact</h3>
        <FavoritesMenu
          variant="compact"
          items={EXAMPLE_FAVORITES}
          onItemSelect={(item) => console.log('Selected:', item.label)}
        />
      </div>
    </div>
  ),
};

// Interactive with state
export const Interactive: Story = {
  render: (args) => {
    const [lastSelected, setLastSelected] = useState<string>('');

    return (
      <div>
        <FavoritesMenu
          {...args}
          items={EXAMPLE_FAVORITES}
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
    showBadge: true,
    showCategories: true,
  },
};
