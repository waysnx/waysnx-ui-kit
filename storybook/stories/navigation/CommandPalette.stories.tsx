/**
 * @file components/CommandPalette/CommandPalette.stories.tsx
 * Storybook stories for CommandPalette component
 */

import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { useState } from 'react';
import { CommandPalette, type Command } from '@waysnx/ui-navigation';

const meta = {
  title: 'Navigation/CommandPalette',
  component: CommandPalette,
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
} satisfies Meta<typeof CommandPalette>;

export default meta;
type Story = StoryObj<typeof CommandPalette>;

const defaultCommands: Command[] = [
  {
    id: 'create-doc',
    title: 'Create Document',
    description: 'Create a new document',
    category: 'documents',
    shortcut: 'Ctrl+N',
    icon: '📄',
    action: () => console.log('Creating document'),
  },
  {
    id: 'open-file',
    title: 'Open File',
    description: 'Open an existing file',
    category: 'files',
    shortcut: 'Ctrl+O',
    icon: '📁',
    action: () => console.log('Opening file'),
  },
  {
    id: 'save-file',
    title: 'Save File',
    description: 'Save current file',
    category: 'files',
    shortcut: 'Ctrl+S',
    icon: '💾',
    action: () => console.log('Saving file'),
  },
  {
    id: 'settings',
    title: 'Settings',
    description: 'Open application settings',
    category: 'general',
    icon: '⚙️',
    action: () => console.log('Opening settings'),
  },
  {
    id: 'help',
    title: 'Help',
    description: 'Show help documentation',
    category: 'general',
    shortcut: 'Ctrl+H',
    icon: '❓',
    action: () => console.log('Showing help'),
  },
  {
    id: 'search',
    title: 'Search',
    description: 'Search across application',
    category: 'general',
    shortcut: 'Ctrl+F',
    icon: '🔍',
    action: () => console.log('Searching'),
  },
];

/**
 * Default command palette (closed initially)
 */
export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <button
          onClick={() => setIsOpen(true)}
          style={{ padding: '0.75rem 1.5rem', cursor: 'pointer', marginBottom: '1rem' }}
        >
          Open Command Palette (Ctrl+K)
        </button>
        <CommandPalette
          commands={defaultCommands}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </div>
    );
  },
};

/**
 * Open command palette
 */
export const Open: Story = {
  render: () => (
    <CommandPalette
      commands={defaultCommands}
      isOpen={true}
      onClose={() => console.log('Closed')}
    />
  ),
};

/**
 * With search results
 */
export const WithSearch: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <div>
        <CommandPalette
          commands={defaultCommands}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </div>
    );
  },
};

/**
 * With categories
 */
export const WithCategories: Story = {
  render: () => (
    <CommandPalette
      commands={defaultCommands}
      isOpen={true}
      onClose={() => console.log('Closed')}
    />
  ),
};

/**
 * Many commands
 */
export const ManyCommands: Story = {
  render: () => {
    const manyCommands = Array.from({ length: 30 }, (_, i) => ({
      id: `cmd-${i}`,
      title: `Command ${i}`,
      description: `This is command number ${i}`,
      category: `category-${Math.floor(i / 10)}`,
      shortcut: i < 10 ? `Ctrl+${i}` : undefined,
      icon: ['📄', '📁', '💾', '⚙️', '❓', '🔍'][i % 6],
      action: () => console.log(`Command ${i} executed`),
    }));

    return (
      <CommandPalette
        commands={manyCommands}
        isOpen={true}
        onClose={() => console.log('Closed')}
      />
    );
  },
};

/**
 * Without shortcuts display
 */
export const NoShortcuts: Story = {
  render: () => (
    <CommandPalette
      commands={defaultCommands}
      isOpen={true}
      showShortcuts={false}
      onClose={() => console.log('Closed')}
    />
  ),
};

/**
 * With permission filtering
 */
export const WithPermissions: Story = {
  render: () => {
    const commandsWithPerms: Command[] = [
      ...defaultCommands.slice(0, 3).map((cmd) => ({
        ...cmd,
        permissions: ['create'],
      })),
      ...defaultCommands.slice(3).map((cmd) => ({
        ...cmd,
        permissions: ['admin'],
      })),
    ];

    return (
      <CommandPalette
        commands={commandsWithPerms}
        isOpen={true}
        permissions={['create']}
        onClose={() => console.log('Closed')}
      />
    );
  },
};

/**
 * With role filtering
 */
export const WithRoles: Story = {
  render: () => {
    const commandsWithRoles: Command[] = [
      ...defaultCommands.slice(0, 3).map((cmd) => ({
        ...cmd,
        roles: ['user'],
      })),
      ...defaultCommands.slice(3).map((cmd) => ({
        ...cmd,
        roles: ['admin'],
      })),
    ];

    return (
      <CommandPalette
        commands={commandsWithRoles}
        isOpen={true}
        roles={['user']}
        onClose={() => console.log('Closed')}
      />
    );
  },
};

/**
 * Empty state
 */
export const Empty: Story = {
  render: () => (
    <CommandPalette commands={[]} isOpen={true} onClose={() => console.log('Closed')} />
  ),
};

/**
 * Dark mode
 */
export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#1a1a1a', minHeight: '100vh' }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <CommandPalette
      commands={defaultCommands}
      isOpen={true}
      onClose={() => console.log('Closed')}
    />
  ),
};

/**
 * With callback handlers
 */
export const WithCallbacks: Story = {
  render: () => {
    const [lastAction, setLastAction] = useState<string>('');

    return (
      <div>
        <div
          style={{
            padding: '1rem',
            backgroundColor: '#f0f0f0',
            marginBottom: '1rem',
            borderRadius: '4px',
          }}
        >
          <strong>Last Action:</strong> {lastAction || 'None'}
        </div>
        <CommandPalette
          commands={defaultCommands}
          isOpen={true}
          onCommandSelect={(cmd) => setLastAction(`Selected: ${cmd.title}`)}
          onClose={() => setLastAction('Closed')}
        />
      </div>
    );
  },
};

/**
 * Limited results
 */
export const LimitedResults: Story = {
  render: () => (
    <CommandPalette
      commands={defaultCommands}
      isOpen={true}
      maxResults={3}
      onClose={() => console.log('Closed')}
    />
  ),
};

/**
 * Custom placeholder
 */
export const CustomPlaceholder: Story = {
  render: () => (
    <CommandPalette
      commands={defaultCommands}
      isOpen={true}
      searchPlaceholder="Type to search commands..."
      onClose={() => console.log('Closed')}
    />
  ),
};
