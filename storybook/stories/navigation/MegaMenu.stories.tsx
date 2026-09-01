/**
 * @file components/MegaMenu/MegaMenu.stories.tsx
 * Storybook stories for MegaMenu component
 */

import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { useState } from 'react';
import { MegaMenu } from '@waysnx/ui-navigation';
import type { NavigationItem } from '@waysnx/ui-navigation';

const meta = {
  title: 'Navigation/MegaMenu',
  component: MegaMenu,
  parameters: {
    layout: 'fullscreen',
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
} satisfies Meta<typeof MegaMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample mega menu items with nested structure
const sampleMenuItems: NavigationItem[] = [
  {
    id: 'products',
    label: 'Products',
    icon: '📦',
    children: [
      {
        id: 'electronics',
        label: 'Electronics',
        children: [
          { id: 'phones', label: 'Smartphones', icon: '📱' },
          { id: 'tablets', label: 'Tablets', icon: '📱' },
          { id: 'laptops', label: 'Laptops', icon: '💻' },
        ],
      },
      {
        id: 'clothing',
        label: 'Clothing',
        children: [
          { id: 'mens', label: "Men's", icon: '👔' },
          { id: 'womens', label: "Women's", icon: '👗' },
          { id: 'kids', label: 'Kids', icon: '👶' },
        ],
      },
      {
        id: 'home',
        label: 'Home & Garden',
        children: [
          { id: 'furniture', label: 'Furniture', icon: '🛋️' },
          { id: 'decor', label: 'Decor', icon: '🖼️' },
          { id: 'kitchen', label: 'Kitchen', icon: '🍳' },
        ],
      },
    ],
  },
  {
    id: 'services',
    label: 'Services',
    icon: '🛠️',
    children: [
      {
        id: 'support',
        label: 'Support',
        children: [
          { id: 'help-center', label: 'Help Center', icon: '❓' },
          { id: 'contact', label: 'Contact Us', icon: '📞' },
          { id: 'status', label: 'System Status', icon: '🔄' },
        ],
      },
      {
        id: 'enterprise',
        label: 'Enterprise',
        children: [
          { id: 'sales', label: 'Sales', icon: '💼' },
          { id: 'solutions', label: 'Solutions', icon: '💡' },
          { id: 'security', label: 'Security', icon: '🔒' },
        ],
      },
    ],
  },
  {
    id: 'developers',
    label: 'Developers',
    icon: '👨‍💻',
    children: [
      {
        id: 'docs',
        label: 'Documentation',
        children: [
          { id: 'api', label: 'API Reference', icon: '📚' },
          { id: 'guides', label: 'Getting Started', icon: '🚀' },
          { id: 'examples', label: 'Code Examples', icon: '💻' },
        ],
      },
      {
        id: 'tools',
        label: 'Tools & SDKs',
        children: [
          { id: 'sdk-js', label: 'JavaScript SDK', icon: '📦' },
          { id: 'sdk-python', label: 'Python SDK', icon: '🐍' },
          { id: 'cli', label: 'CLI Tool', icon: '⚙️' },
        ],
      },
    ],
  },
  {
    id: 'company',
    label: 'Company',
    icon: '🏢',
    children: [
      {
        id: 'about',
        label: 'About',
        children: [
          { id: 'story', label: 'Our Story', icon: '📖' },
          { id: 'team', label: 'Our Team', icon: '👥' },
          { id: 'careers', label: 'Careers', icon: '💼' },
        ],
      },
      {
        id: 'legal',
        label: 'Legal',
        children: [
          { id: 'privacy', label: 'Privacy Policy', icon: '🔐' },
          { id: 'terms', label: 'Terms of Service', icon: '📋' },
          { id: 'cookies', label: 'Cookie Policy', icon: '🍪' },
        ],
      },
    ],
  },
];

/**
 * Default MegaMenu with 3-column layout
 */
export const Default: Story = {
  args: {
    items: sampleMenuItems,
    density: 'normal',
    variant: 'default',
    gridColumns: 3,
    hoverToOpen: true,
  },
  render: (args) => {
    const [selected, setSelected] = useState<string>('');

    return (
      <div>
        <MegaMenu {...args} onItemClick={(item) => setSelected(item.label)} />
        <div style={{ padding: '2rem', minHeight: '400px', backgroundColor: '#f9f9f9' }}>
          <h2>Mega Menu Example</h2>
          <p>Hover over menu items to open dropdowns</p>
          {selected && <p>Last selected: <strong>{selected}</strong></p>}
        </div>
      </div>
    );
  },
};

/**
 * Compact density mega menu
 */
export const Compact: Story = {
  args: {
    items: sampleMenuItems,
    density: 'compact',
    variant: 'default',
    gridColumns: 3,
    hoverToOpen: true,
  },
  render: Default.render,
};

/**
 * Spacious density mega menu
 */
export const Spacious: Story = {
  args: {
    items: sampleMenuItems,
    density: 'spacious',
    variant: 'default',
    gridColumns: 3,
    hoverToOpen: true,
  },
  render: Default.render,
};

/**
 * 2-column grid layout
 */
export const TwoColumns: Story = {
  args: {
    items: sampleMenuItems,
    density: 'normal',
    variant: 'default',
    gridColumns: 2,
    hoverToOpen: true,
  },
  render: Default.render,
};

/**
 * 4-column grid layout
 */
export const FourColumns: Story = {
  args: {
    items: sampleMenuItems,
    density: 'normal',
    variant: 'default',
    gridColumns: 4,
    hoverToOpen: true,
  },
  render: Default.render,
};

/**
 * Minimal variant without border
 */
export const Minimal: Story = {
  args: {
    items: sampleMenuItems,
    density: 'normal',
    variant: 'minimal',
    gridColumns: 3,
    hoverToOpen: true,
  },
  render: Default.render,
};

/**
 * Elevated variant with shadow
 */
export const Elevated: Story = {
  args: {
    items: sampleMenuItems,
    density: 'normal',
    variant: 'elevated',
    gridColumns: 3,
    hoverToOpen: true,
  },
  render: Default.render,
};

/**
 * Large grid gap
 */
export const LargeGap: Story = {
  args: {
    items: sampleMenuItems,
    density: 'normal',
    variant: 'default',
    gridColumns: 3,
    gridGap: 'lg',
    hoverToOpen: true,
  },
  render: Default.render,
};

/**
 * Small grid gap
 */
export const SmallGap: Story = {
  args: {
    items: sampleMenuItems,
    density: 'normal',
    variant: 'default',
    gridColumns: 3,
    gridGap: 'sm',
    hoverToOpen: true,
  },
  render: Default.render,
};

/**
 * Click to open (not hover)
 */
export const ClickToOpen: Story = {
  args: {
    items: sampleMenuItems,
    density: 'normal',
    variant: 'default',
    gridColumns: 3,
    hoverToOpen: false,
  },
  render: (args) => {
    const [selected, setSelected] = useState<string>('');

    return (
      <div>
        <MegaMenu {...args} onItemClick={(item) => setSelected(item.label)} />
        <div style={{ padding: '2rem', minHeight: '400px', backgroundColor: '#f9f9f9' }}>
          <h2>Click to Open</h2>
          <p>Click menu items to open dropdowns</p>
          {selected && <p>Last selected: <strong>{selected}</strong></p>}
        </div>
      </div>
    );
  },
};

/**
 * Without icons
 */
export const WithoutIcons: Story = {
  args: {
    items: sampleMenuItems,
    density: 'normal',
    variant: 'default',
    gridColumns: 3,
    showIcons: false,
    hoverToOpen: true,
  },
  render: Default.render,
};

/**
 * With badges
 */
export const WithBadges: Story = {
  args: {
    items: [
      {
        id: 'products',
        label: 'Products',
        icon: '📦',
        children: [
          {
            id: 'electronics',
            label: 'Electronics',
            children: [
              { id: 'phones', label: 'Smartphones', icon: '📱', badge: 'New' },
              { id: 'tablets', label: 'Tablets', icon: '📱' },
              { id: 'laptops', label: 'Laptops', icon: '💻', badge: '5' },
            ],
          },
          {
            id: 'clothing',
            label: 'Clothing',
            children: [
              { id: 'mens', label: "Men's", icon: '👔' },
              { id: 'womens', label: "Women's", icon: '👗', badge: 'Sale' },
              { id: 'kids', label: 'Kids', icon: '👶' },
            ],
          },
        ],
      },
      {
        id: 'services',
        label: 'Services',
        icon: '🛠️',
        badge: '10',
        children: [
          {
            id: 'support',
            label: 'Support',
            children: [
              { id: 'help-center', label: 'Help Center', icon: '❓' },
              { id: 'contact', label: 'Contact Us', icon: '📞' },
              { id: 'status', label: 'System Status', icon: '🔄' },
            ],
          },
        ],
      },
    ],
    density: 'normal',
    variant: 'default',
    gridColumns: 3,
    showBadges: true,
    hoverToOpen: true,
  },
  render: Default.render,
};

/**
 * Allow multiple dropdowns open
 */
export const AllowMultipleOpen: Story = {
  args: {
    items: sampleMenuItems,
    density: 'normal',
    variant: 'default',
    gridColumns: 3,
    hoverToOpen: false,
    allowMultipleOpen: true,
  },
  render: (args) => {
    const [selected, setSelected] = useState<string>('');

    return (
      <div>
        <MegaMenu {...args} onItemClick={(item) => setSelected(item.label)} />
        <div style={{ padding: '2rem', minHeight: '400px', backgroundColor: '#f9f9f9' }}>
          <h2>Multiple Dropdowns</h2>
          <p>You can open multiple dropdowns at the same time</p>
          {selected && <p>Last selected: <strong>{selected}</strong></p>}
        </div>
      </div>
    );
  },
};

/**
 * Interactive example
 */
export const Interactive: Story = {
  args: {
    items: sampleMenuItems,
    density: 'normal',
    variant: 'elevated',
    gridColumns: 3,
    hoverToOpen: true,
  },
  render: (args) => {
    const [selected, setSelected] = useState<string>('');
    const [history, setHistory] = useState<string[]>([]);

    return (
      <div>
        <MegaMenu
          {...args}
          onItemClick={(item) => {
            setSelected(item.label);
            setHistory((prev) => [item.label, ...prev.slice(0, 4)]);
          }}
        />
        <div style={{ padding: '2rem', minHeight: '400px', backgroundColor: '#f9f9f9' }}>
          <h2>Interactive MegaMenu</h2>
          {selected && (
            <>
              <p>Last selected: <strong>{selected}</strong></p>
              {history.length > 1 && (
                <>
                  <h3>Recent selections:</h3>
                  <ul>
                    {history.slice(1).map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </>
              )}
            </>
          )}
        </div>
      </div>
    );
  },
};

/**
 * Accessibility example with keyboard navigation
 */
export const Accessibility: Story = {
  args: {
    items: sampleMenuItems,
    density: 'normal',
    variant: 'default',
    gridColumns: 3,
    hoverToOpen: false,
    keyboardNav: true,
    ariaLabel: 'Main navigation menu',
  },
  render: (args) => {
    return (
      <div>
        <MegaMenu {...args} />
        <div style={{ padding: '2rem' }}>
          <h2>Keyboard Navigation</h2>
          <ul>
            <li><strong>Arrow Left/Right</strong> - Navigate between menu items</li>
            <li><strong>Arrow Down</strong> - Move focus to first submenu item</li>
            <li><strong>Arrow Up</strong> - Move focus back to main menu</li>
            <li><strong>Enter/Space</strong> - Open/close dropdown or select item</li>
            <li><strong>Escape</strong> - Close all dropdowns</li>
          </ul>
        </div>
      </div>
    );
  },
};

/**
 * Dark mode
 */
export const DarkMode: Story = {
  args: {
    items: sampleMenuItems,
    density: 'normal',
    variant: 'elevated',
    gridColumns: 3,
    hoverToOpen: true,
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#1a1a1a', minHeight: '100vh', padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => {
    const [selected, setSelected] = useState<string>('');

    return (
      <div>
        <MegaMenu {...args} onItemClick={(item) => setSelected(item.label)} />
        <div style={{ padding: '2rem', minHeight: '400px', backgroundColor: '#2a2a2a', color: '#fff' }}>
          <h2>Dark Mode MegaMenu</h2>
          <p>Hover over menu items</p>
          {selected && <p>Last selected: <strong>{selected}</strong></p>}
        </div>
      </div>
    );
  },
};
