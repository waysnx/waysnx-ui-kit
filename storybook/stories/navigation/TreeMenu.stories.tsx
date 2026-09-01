/**
 * @file components/TreeMenu/TreeMenu.stories.tsx
 * Storybook stories for TreeMenu component
 */

import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { useState } from 'react';
import { TreeMenu } from '@waysnx/ui-navigation';
import type { NavigationItem } from '@waysnx/ui-navigation';

const meta = {
  title: 'Navigation/TreeMenu',
  component: TreeMenu,
  parameters: {
    layout: 'padded',
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
} satisfies Meta<typeof TreeMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

// File system tree structure
const fileSystemTree: NavigationItem[] = [
  {
    id: 'documents',
    label: 'Documents',
    icon: '📁',
    children: [
      { id: 'projects', label: 'Projects', icon: '📂', badge: '5' },
      { id: 'archive', label: 'Archive', icon: '📦' },
      { id: 'templates', label: 'Templates', icon: '📋', children: [] },
    ],
  },
  {
    id: 'pictures',
    label: 'Pictures',
    icon: '🖼️',
    children: [
      { id: 'vacation', label: 'Vacation 2024', icon: '📸' },
      { id: 'family', label: 'Family', icon: '👨‍👩‍👧' },
    ],
  },
  {
    id: 'music',
    label: 'Music',
    icon: '🎵',
    children: [
      { id: 'rock', label: 'Rock', icon: '🎸' },
      { id: 'jazz', label: 'Jazz', icon: '🎷' },
      { id: 'classical', label: 'Classical', icon: '🎼' },
    ],
  },
  {
    id: 'downloads',
    label: 'Downloads',
    icon: '⬇️',
    children: [
      { id: 'recent', label: 'Recent', icon: '⏱️' },
      { id: 'applications', label: 'Applications', icon: '💾' },
    ],
  },
];

// Department organizational structure
const organizationTree: NavigationItem[] = [
  {
    id: 'engineering',
    label: 'Engineering',
    icon: '⚙️',
    children: [
      { id: 'frontend', label: 'Frontend', icon: '💻', children: [] },
      { id: 'backend', label: 'Backend', icon: '🖥️', children: [] },
      { id: 'devops', label: 'DevOps', icon: '🚀', children: [] },
    ],
  },
  {
    id: 'product',
    label: 'Product',
    icon: '📦',
    children: [
      { id: 'management', label: 'Management', icon: '👔', children: [] },
      { id: 'design', label: 'Design', icon: '🎨', children: [] },
    ],
  },
  {
    id: 'operations',
    label: 'Operations',
    icon: '⚡',
    children: [
      { id: 'finance', label: 'Finance', icon: '💰', children: [] },
      { id: 'hr', label: 'Human Resources', icon: '👥', children: [] },
    ],
  },
];

/**
 * Default tree menu
 */
export const Default: Story = {
  args: {
    items: fileSystemTree,
    density: 'normal',
    variant: 'default',
    showIcons: true,
    keyboardNav: true,
  },
  render: (args) => {
    const [selected, setSelected] = useState<NavigationItem>();

    return (
      <div style={{ display: 'flex', gap: '2rem' }}>
        <div style={{ flex: 1, maxWidth: '400px' }}>
          <TreeMenu {...args} selectedItem={selected} onItemSelect={setSelected} />
        </div>
        <div style={{ flex: 1 }}>
          {selected ? (
            <div>
              <h3>Selected Item</h3>
              <p><strong>Label:</strong> {selected.label}</p>
              <p><strong>ID:</strong> {selected.id}</p>
              {selected.badge && <p><strong>Badge:</strong> {selected.badge}</p>}
            </div>
          ) : (
            <p>Select an item from the tree</p>
          )}
        </div>
      </div>
    );
  },
};

/**
 * Compact density tree
 */
export const Compact: Story = {
  args: {
    items: fileSystemTree,
    density: 'compact',
    variant: 'default',
    showIcons: true,
  },
  render: (args) => {
    const [selected, setSelected] = useState<NavigationItem>();
    return (
      <div style={{ maxWidth: '400px' }}>
        <TreeMenu {...args} selectedItem={selected} onItemSelect={setSelected} />
      </div>
    );
  },
};

/**
 * Spacious density tree
 */
export const Spacious: Story = {
  args: {
    items: fileSystemTree,
    density: 'spacious',
    variant: 'default',
    showIcons: true,
  },
  render: (args) => {
    const [selected, setSelected] = useState<NavigationItem>();
    return (
      <div style={{ maxWidth: '400px' }}>
        <TreeMenu {...args} selectedItem={selected} onItemSelect={setSelected} />
      </div>
    );
  },
};

/**
 * Organization structure (expanded by default)
 */
export const ExpandedByDefault: Story = {
  args: {
    items: organizationTree,
    density: 'normal',
    variant: 'default',
    showIcons: true,
    expandAll: true,
  },
  render: (args) => {
    const [selected, setSelected] = useState<NavigationItem>();
    return (
      <div style={{ maxWidth: '400px' }}>
        <TreeMenu {...args} selectedItem={selected} onItemSelect={setSelected} />
      </div>
    );
  },
};

/**
 * Multi-select tree menu
 */
export const MultiSelect: Story = {
  args: {
    items: fileSystemTree,
    density: 'normal',
    variant: 'default',
    showIcons: true,
    multiSelect: true,
  },
  render: (args) => {
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

    return (
      <div style={{ display: 'flex', gap: '2rem' }}>
        <div style={{ flex: 1, maxWidth: '400px' }}>
          <TreeMenu
            {...args}
            selectedIds={selectedIds}
            onSelectionChange={setSelectedIds}
          />
        </div>
        <div style={{ flex: 1 }}>
          <h3>Selected Items ({selectedIds.size})</h3>
          {selectedIds.size > 0 ? (
            <ul>
              {Array.from(selectedIds).map((id) => (
                <li key={id}>{id}</li>
              ))}
            </ul>
          ) : (
            <p>No items selected</p>
          )}
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
    items: fileSystemTree,
    density: 'normal',
    variant: 'default',
    showIcons: false,
  },
  render: (args) => {
    const [selected, setSelected] = useState<NavigationItem>();
    return (
      <div style={{ maxWidth: '400px' }}>
        <TreeMenu {...args} selectedItem={selected} onItemSelect={setSelected} />
      </div>
    );
  },
};

/**
 * With badges
 */
export const WithBadges: Story = {
  args: {
    items: [
      {
        id: 'inbox',
        label: 'Inbox',
        icon: '📧',
        badge: '5',
        children: [
          { id: 'important', label: 'Important', icon: '⭐', badge: '2' },
          { id: 'urgent', label: 'Urgent', icon: '🔴', badge: '1' },
        ],
      },
      {
        id: 'drafts',
        label: 'Drafts',
        icon: '📝',
        badge: '3',
        children: [
          { id: 'saved', label: 'Saved Drafts', icon: '💾' },
        ],
      },
    ],
    density: 'normal',
    variant: 'default',
    showIcons: true,
    showBadges: true,
  },
  render: (args) => {
    const [selected, setSelected] = useState<NavigationItem>();
    return (
      <div style={{ maxWidth: '400px' }}>
        <TreeMenu {...args} selectedItem={selected} onItemSelect={setSelected} />
      </div>
    );
  },
};

/**
 * Minimal variant
 */
export const Minimal: Story = {
  args: {
    items: fileSystemTree,
    density: 'normal',
    variant: 'minimal',
    showIcons: true,
  },
  render: (args) => {
    const [selected, setSelected] = useState<NavigationItem>();
    return (
      <div style={{ maxWidth: '400px' }}>
        <TreeMenu {...args} selectedItem={selected} onItemSelect={setSelected} />
      </div>
    );
  },
};

/**
 * Elevated variant
 */
export const Elevated: Story = {
  args: {
    items: fileSystemTree,
    density: 'normal',
    variant: 'elevated',
    showIcons: true,
  },
  render: (args) => {
    const [selected, setSelected] = useState<NavigationItem>();
    return (
      <div style={{ maxWidth: '400px' }}>
        <TreeMenu {...args} selectedItem={selected} onItemSelect={setSelected} />
      </div>
    );
  },
};

/**
 * Custom indent size
 */
export const CustomIndent: Story = {
  args: {
    items: fileSystemTree,
    density: 'normal',
    variant: 'default',
    showIcons: true,
    indentSize: 30,
  },
  render: (args) => {
    const [selected, setSelected] = useState<NavigationItem>();
    return (
      <div style={{ maxWidth: '500px' }}>
        <TreeMenu {...args} selectedItem={selected} onItemSelect={setSelected} />
      </div>
    );
  },
};

/**
 * Without expand/collapse icons
 */
export const WithoutExpandIcons: Story = {
  args: {
    items: fileSystemTree,
    density: 'normal',
    variant: 'default',
    showIcons: true,
    showExpandIcons: false,
  },
  render: (args) => {
    const [selected, setSelected] = useState<NavigationItem>();
    return (
      <div style={{ maxWidth: '400px' }}>
        <TreeMenu {...args} selectedItem={selected} onItemSelect={setSelected} />
      </div>
    );
  },
};

/**
 * Deeply nested structure
 */
export const DeeplyNested: Story = {
  args: {
    items: [
      {
        id: 'root',
        label: 'Root',
        icon: '📂',
        children: [
          {
            id: 'level1',
            label: 'Level 1',
            icon: '📂',
            children: [
              {
                id: 'level2',
                label: 'Level 2',
                icon: '📂',
                children: [
                  {
                    id: 'level3',
                    label: 'Level 3',
                    icon: '📂',
                    children: [
                      { id: 'leaf', label: 'Leaf Node', icon: '📄' },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    density: 'normal',
    variant: 'default',
    showIcons: true,
    expandAll: true,
  },
  render: (args) => {
    const [selected, setSelected] = useState<NavigationItem>();
    return (
      <div style={{ maxWidth: '500px' }}>
        <TreeMenu {...args} selectedItem={selected} onItemSelect={setSelected} />
      </div>
    );
  },
};

/**
 * Keyboard navigation
 */
export const KeyboardNavigation: Story = {
  args: {
    items: organizationTree,
    density: 'normal',
    variant: 'default',
    showIcons: true,
    keyboardNav: true,
    expandAll: true,
  },
  render: (args) => {
    const [selected, setSelected] = useState<NavigationItem>();
    return (
      <div>
        <div style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: '#f0f0f0', borderRadius: '0.5rem' }}>
          <strong>Keyboard Navigation:</strong>
          <ul style={{ margin: '0.5rem 0 0 1.5rem' }}>
            <li>↑/↓ - Navigate up/down</li>
            <li>→ - Expand item</li>
            <li>← - Collapse item</li>
            <li>Enter/Space - Select item</li>
            <li>Home/End - Go to first/last item</li>
          </ul>
        </div>
        <div style={{ maxWidth: '400px' }}>
          <TreeMenu {...args} selectedItem={selected} onItemSelect={setSelected} />
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
    items: fileSystemTree,
    density: 'normal',
    variant: 'elevated',
    showIcons: true,
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#1a1a1a', padding: '2rem', minHeight: '100vh' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => {
    const [selected, setSelected] = useState<NavigationItem>();
    return (
      <div style={{ maxWidth: '400px' }}>
        <TreeMenu {...args} selectedItem={selected} onItemSelect={setSelected} />
      </div>
    );
  },
};

/**
 * Disabled items
 */
export const DisabledItems: Story = {
  args: {
    items: [
      {
        id: 'available',
        label: 'Available',
        icon: '✅',
        children: [
          { id: 'sub1', label: 'Subitem 1', icon: '📄' },
          { id: 'sub2', label: 'Subitem 2', icon: '📄' },
        ],
      },
      {
        id: 'disabled',
        label: 'Disabled (Maintenance)',
        icon: '⚠️',
        disabled: true,
        children: [
          { id: 'sub3', label: 'Subitem 3', icon: '📄' },
        ],
      },
    ],
    density: 'normal',
    variant: 'default',
    showIcons: true,
  },
  render: (args) => {
    const [selected, setSelected] = useState<NavigationItem>();
    return (
      <div style={{ maxWidth: '400px' }}>
        <TreeMenu {...args} selectedItem={selected} onItemSelect={setSelected} />
      </div>
    );
  },
};
