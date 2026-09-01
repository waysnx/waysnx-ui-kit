/**
 * @file components/ContextMenu/ContextMenu.stories.tsx
 * Storybook stories for ContextMenu component
 */

import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { useState } from 'react';
import { ContextMenu } from '@waysnx/ui-navigation';
import type { NavigationItem, ContextMenuPosition } from '@waysnx/ui-navigation';

const meta = {
  title: 'Navigation/ContextMenu',
  component: ContextMenu,
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
} satisfies Meta<typeof ContextMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample context menu items
const sampleItems: NavigationItem[] = [
  {
    id: 'cut',
    label: 'Cut',
    icon: '✂️',
  },
  {
    id: 'copy',
    label: 'Copy',
    icon: '📋',
  },
  {
    id: 'paste',
    label: 'Paste',
    icon: '📄',
  },
  {
    id: 'separator-1',
    label: 'separator',
    isDivider: true,
  },
  {
    id: 'delete',
    label: 'Delete',
    icon: '🗑️',
  },
  {
    id: 'rename',
    label: 'Rename',
    icon: '✏️',
  },
];

const nestedItems: NavigationItem[] = [
  {
    id: 'file',
    label: 'File',
    icon: '📁',
    children: [
      { id: 'new', label: 'New', icon: '✨' },
      { id: 'open', label: 'Open', icon: '📂' },
      { id: 'save', label: 'Save', icon: '💾' },
    ],
  },
  {
    id: 'edit',
    label: 'Edit',
    icon: '✏️',
    children: [
      { id: 'undo', label: 'Undo', icon: '↶' },
      { id: 'redo', label: 'Redo', icon: '↷' },
      { id: 'separator-2', label: 'separator', isDivider: true },
      { id: 'select-all', label: 'Select All', icon: '✓' },
    ],
  },
  {
    id: 'view',
    label: 'View',
    icon: '👁️',
    children: [
      { id: 'zoom-in', label: 'Zoom In', icon: '🔍+' },
      { id: 'zoom-out', label: 'Zoom Out', icon: '🔍-' },
      { id: 'fit', label: 'Fit to Window', icon: '⛶' },
    ],
  },
];

const itemsWithBadges: NavigationItem[] = [
  {
    id: 'inbox',
    label: 'Inbox',
    icon: '📧',
    badge: '5',
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: '🔔',
    badge: '12',
  },
  {
    id: 'messages',
    label: 'Messages',
    icon: '💬',
    badge: '2',
  },
];

/**
 * Default context menu with basic items
 */
export const Default: Story = {
  args: {
    items: sampleItems,
    density: 'normal',
    variant: 'default',
    isOpen: true,
    position: { x: 100, y: 100 },
  },
  render: (args) => {
    const [contextMenu, setContextMenu] = useState<ContextMenuPosition | null>(
      args.position || null
    );
    const [selected, setSelected] = useState<string>('');

    const handleContextMenu = (e: React.MouseEvent) => {
      e.preventDefault();
      setContextMenu({ x: e.clientX, y: e.clientY });
    };

    return (
      <div style={{ padding: '2rem', minHeight: '400px' }}>
        <div
          onContextMenu={handleContextMenu}
          style={{
            padding: '2rem',
            backgroundColor: '#f5f5f5',
            border: '2px dashed #ccc',
            borderRadius: '8px',
            cursor: 'context-menu',
            textAlign: 'center',
          }}
        >
          Right-click here to open context menu
          {selected && <div style={{ marginTop: '1rem', color: '#666' }}>Selected: {selected}</div>}
        </div>

        {contextMenu && (
          <ContextMenu
            {...args}
            position={contextMenu}
            isOpen={true}
            onItemClick={(item) => {
              setSelected(item.label);
              args.onItemClick?.(item);
            }}
            onClose={() => setContextMenu(null)}
          />
        )}
      </div>
    );
  },
};

/**
 * Compact density context menu
 */
export const Compact: Story = {
  args: {
    items: sampleItems,
    density: 'compact',
    variant: 'default',
    isOpen: true,
    position: { x: 100, y: 100 },
  },
  render: Default.render,
};

/**
 * Spacious density context menu
 */
export const Spacious: Story = {
  args: {
    items: sampleItems,
    density: 'spacious',
    variant: 'default',
    isOpen: true,
    position: { x: 100, y: 100 },
  },
  render: Default.render,
};

/**
 * Minimal variant context menu
 */
export const Minimal: Story = {
  args: {
    items: sampleItems,
    density: 'normal',
    variant: 'minimal',
    isOpen: true,
    position: { x: 100, y: 100 },
  },
  render: Default.render,
};

/**
 * Elevated variant context menu
 */
export const Elevated: Story = {
  args: {
    items: sampleItems,
    density: 'normal',
    variant: 'elevated',
    isOpen: true,
    position: { x: 100, y: 100 },
  },
  render: Default.render,
};

/**
 * Context menu with nested items
 */
export const WithNestedItems: Story = {
  args: {
    items: nestedItems,
    density: 'normal',
    variant: 'default',
    isOpen: true,
    position: { x: 100, y: 100 },
  },
  render: Default.render,
};

/**
 * Context menu with badges
 */
export const WithBadges: Story = {
  args: {
    items: itemsWithBadges,
    density: 'normal',
    variant: 'default',
    showBadges: true,
    isOpen: true,
    position: { x: 100, y: 100 },
  },
  render: Default.render,
};

/**
 * Context menu without icons
 */
export const WithoutIcons: Story = {
  args: {
    items: sampleItems,
    density: 'normal',
    variant: 'default',
    showIcons: false,
    isOpen: true,
    position: { x: 100, y: 100 },
  },
  render: Default.render,
};

/**
 * Context menu with position adjustment (near viewport edge)
 */
export const PositionAdjustment: Story = {
  args: {
    items: sampleItems,
    density: 'normal',
    variant: 'default',
    isOpen: true,
    position: { x: window.innerWidth - 50, y: window.innerHeight - 50 },
    viewportPadding: 8,
  },
  render: (args) => {
    const [contextMenu, setContextMenu] = useState<ContextMenuPosition | null>(
      args.position || null
    );

    const handleContextMenu = (e: React.MouseEvent) => {
      e.preventDefault();
      setContextMenu({ x: e.clientX, y: e.clientY });
    };

    return (
      <div style={{ padding: '2rem', minHeight: '400px' }}>
        <p>Right-click near the bottom-right corner to see position adjustment</p>
        <div
          onContextMenu={handleContextMenu}
          style={{
            padding: '2rem',
            backgroundColor: '#f5f5f5',
            border: '2px dashed #ccc',
            borderRadius: '8px',
            cursor: 'context-menu',
            textAlign: 'center',
            minHeight: '200px',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
          }}
        >
          <div>Right-click here</div>
        </div>

        {contextMenu && (
          <ContextMenu
            {...args}
            position={contextMenu}
            isOpen={true}
            onClose={() => setContextMenu(null)}
          />
        )}
      </div>
    );
  },
};

/**
 * Context menu with custom offset
 */
export const WithCustomOffset: Story = {
  args: {
    items: sampleItems,
    density: 'normal',
    variant: 'default',
    isOpen: true,
    position: { x: 100, y: 100 },
    offset: { x: 10, y: 10 },
  },
  render: Default.render,
};

/**
 * Interactive context menu with multiple actions
 */
export const Interactive: Story = {
  args: {
    items: sampleItems,
    density: 'normal',
    variant: 'default',
    closeOnItemClick: true,
    isOpen: true,
    position: { x: 100, y: 100 },
  },
  render: (args) => {
    const [contextMenu, setContextMenu] = useState<ContextMenuPosition | null>(
      args.position || null
    );
    const [lastAction, setLastAction] = useState<string>('');
    const [actionHistory, setActionHistory] = useState<string[]>([]);

    const handleContextMenu = (e: React.MouseEvent) => {
      e.preventDefault();
      setContextMenu({ x: e.clientX, y: e.clientY });
    };

    const handleItemClick = (item: any) => {
      setLastAction(item.label);
      setActionHistory((prev) => [item.label, ...prev.slice(0, 4)]);
      setContextMenu(null);
    };

    return (
      <div style={{ padding: '2rem', minHeight: '400px' }}>
        <div
          onContextMenu={handleContextMenu}
          style={{
            padding: '2rem',
            backgroundColor: '#f5f5f5',
            border: '2px dashed #ccc',
            borderRadius: '8px',
            cursor: 'context-menu',
            marginBottom: '2rem',
          }}
        >
          Right-click to perform actions
        </div>

        {lastAction && (
          <div style={{ marginBottom: '1rem' }}>
            <strong>Last action:</strong> {lastAction}
          </div>
        )}

        {actionHistory.length > 0 && (
          <div>
            <strong>History:</strong>
            <ul>
              {actionHistory.map((action, i) => (
                <li key={i}>{action}</li>
              ))}
            </ul>
          </div>
        )}

        {contextMenu && (
          <ContextMenu
            {...args}
            position={contextMenu}
            isOpen={true}
            onItemClick={handleItemClick}
            onClose={() => setContextMenu(null)}
          />
        )}
      </div>
    );
  },
};

/**
 * Accessibility example - keyboard navigation
 */
export const Accessibility: Story = {
  args: {
    items: nestedItems,
    density: 'normal',
    variant: 'default',
    keyboardNav: true,
    ariaLabel: 'Application context menu',
    isOpen: true,
    position: { x: 100, y: 100 },
  },
  render: (args) => {
    const [contextMenu, setContextMenu] = useState<ContextMenuPosition | null>(
      args.position || null
    );

    const handleContextMenu = (e: React.MouseEvent) => {
      e.preventDefault();
      setContextMenu({ x: e.clientX, y: e.clientY });
    };

    return (
      <div style={{ padding: '2rem' }}>
        <p>
          <strong>Keyboard Navigation:</strong>
        </p>
        <ul style={{ marginBottom: '2rem' }}>
          <li>Arrow Up/Down to navigate items</li>
          <li>Arrow Right to expand nested items</li>
          <li>Arrow Left to collapse nested items</li>
          <li>Enter or Space to select item</li>
          <li>Escape to close menu</li>
        </ul>

        <div
          onContextMenu={handleContextMenu}
          style={{
            padding: '2rem',
            backgroundColor: '#f5f5f5',
            border: '2px dashed #ccc',
            borderRadius: '8px',
            cursor: 'context-menu',
          }}
        >
          Right-click to open and use keyboard navigation
        </div>

        {contextMenu && (
          <ContextMenu
            {...args}
            position={contextMenu}
            isOpen={true}
            onClose={() => setContextMenu(null)}
          />
        )}
      </div>
    );
  },
};

/**
 * Dark mode context menu
 */
export const DarkMode: Story = {
  args: {
    items: sampleItems,
    density: 'normal',
    variant: 'elevated',
    isOpen: true,
    position: { x: 100, y: 100 },
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#1a1a1a', minHeight: '400px', padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => {
    const [contextMenu, setContextMenu] = useState<ContextMenuPosition | null>(
      args.position || null
    );

    const handleContextMenu = (e: React.MouseEvent) => {
      e.preventDefault();
      setContextMenu({ x: e.clientX, y: e.clientY });
    };

    return (
      <div>
        <div
          onContextMenu={handleContextMenu}
          style={{
            padding: '2rem',
            backgroundColor: '#2a2a2a',
            border: '2px dashed #555',
            borderRadius: '8px',
            cursor: 'context-menu',
            color: '#fff',
          }}
        >
          Right-click here (dark mode)
        </div>

        {contextMenu && (
          <ContextMenu
            {...args}
            position={contextMenu}
            isOpen={true}
            onClose={() => setContextMenu(null)}
          />
        )}
      </div>
    );
  },
};
