/**
 * @file QuickActions.stories.tsx
 * Storybook stories for QuickActions component
 */

import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { QuickActions } from '@waysnx/ui-navigation';
import type { QuickAction, QuickActionGroup } from '@waysnx/ui-navigation';
import { useState } from 'react';

const EXAMPLE_ACTIONS: QuickAction[] = [
  {
    id: 'save',
    label: 'Save',
    icon: '💾',
    shortcut: 'Ctrl+S',
    tooltip: 'Save the document',
    onClick: () => console.log('Save clicked'),
  },
  {
    id: 'undo',
    label: 'Undo',
    icon: '↶',
    shortcut: 'Ctrl+Z',
    tooltip: 'Undo last action',
    onClick: () => console.log('Undo clicked'),
  },
  {
    id: 'redo',
    label: 'Redo',
    icon: '↷',
    shortcut: 'Ctrl+Y',
    tooltip: 'Redo last action',
    onClick: () => console.log('Redo clicked'),
  },
  {
    id: 'copy',
    label: 'Copy',
    icon: '📋',
    shortcut: 'Ctrl+C',
    tooltip: 'Copy to clipboard',
    onClick: () => console.log('Copy clicked'),
  },
  {
    id: 'paste',
    label: 'Paste',
    icon: '📄',
    shortcut: 'Ctrl+V',
    tooltip: 'Paste from clipboard',
    onClick: () => console.log('Paste clicked'),
  },
  {
    id: 'export',
    label: 'Export',
    icon: '📤',
    tooltip: 'Export document',
    onClick: () => console.log('Export clicked'),
  },
];

const GROUPED_ACTIONS: QuickActionGroup[] = [
  {
    id: 'edit-group',
    label: 'Edit',
    actions: [
      {
        id: 'cut',
        label: 'Cut',
        icon: '✂️',
        shortcut: 'Ctrl+X',
        onClick: () => console.log('Cut'),
      },
      {
        id: 'copy',
        label: 'Copy',
        icon: '📋',
        shortcut: 'Ctrl+C',
        onClick: () => console.log('Copy'),
      },
      {
        id: 'paste',
        label: 'Paste',
        icon: '📄',
        shortcut: 'Ctrl+V',
        onClick: () => console.log('Paste'),
      },
    ],
  },
  {
    id: 'file-group',
    label: 'File',
    actions: [
      {
        id: 'new',
        label: 'New',
        icon: '📄',
        shortcut: 'Ctrl+N',
        onClick: () => console.log('New'),
      },
      {
        id: 'open',
        label: 'Open',
        icon: '📂',
        shortcut: 'Ctrl+O',
        onClick: () => console.log('Open'),
      },
      {
        id: 'save',
        label: 'Save',
        icon: '💾',
        shortcut: 'Ctrl+S',
        onClick: () => console.log('Save'),
      },
    ],
  },
];

const meta: Meta<typeof QuickActions> = {
  title: 'Enterprise/QuickActions',
  component: QuickActions,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    variant: {
      control: 'select',
      options: ['bar', 'grid', 'compact'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    showLabels: {
      control: 'boolean',
    },
    showIcons: {
      control: 'boolean',
    },
    enableKeyboardShortcuts: {
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

// Default bar variant
export const Default: Story = {
  render: (args) => (
    <QuickActions
      {...args}
      actions={EXAMPLE_ACTIONS}
      onActionClick={(action) => console.log('Action clicked:', action.label)}
    />
  ),
  args: {
    variant: 'bar',
    orientation: 'horizontal',
    size: 'md',
    showLabels: true,
    showIcons: true,
    enableKeyboardShortcuts: true,
  },
};

// Compact bar variant
export const Compact: Story = {
  render: (args) => (
    <QuickActions
      {...args}
      actions={EXAMPLE_ACTIONS}
      onActionClick={(action) => console.log('Action clicked:', action.label)}
    />
  ),
  args: {
    variant: 'compact',
    orientation: 'horizontal',
    size: 'md',
    showLabels: false,
    showIcons: true,
  },
};

// Grid variant
export const Grid: Story = {
  render: (args) => (
    <QuickActions
      {...args}
      actions={EXAMPLE_ACTIONS}
      onActionClick={(action) => console.log('Action clicked:', action.label)}
    />
  ),
  args: {
    variant: 'grid',
    orientation: 'horizontal',
    size: 'md',
    showLabels: true,
    showIcons: true,
  },
};

// Vertical orientation
export const Vertical: Story = {
  render: (args) => (
    <QuickActions
      {...args}
      actions={EXAMPLE_ACTIONS}
      onActionClick={(action) => console.log('Action clicked:', action.label)}
    />
  ),
  args: {
    variant: 'bar',
    orientation: 'vertical',
    size: 'md',
    showLabels: true,
    showIcons: true,
  },
};

// With max visible (More menu)
export const WithMoreMenu: Story = {
  render: (args) => (
    <QuickActions
      {...args}
      actions={EXAMPLE_ACTIONS}
      onActionClick={(action) => console.log('Action clicked:', action.label)}
      maxVisible={3}
    />
  ),
  args: {
    variant: 'bar',
    orientation: 'horizontal',
    size: 'md',
    showLabels: true,
    showIcons: true,
  },
};

// Icons only
export const IconsOnly: Story = {
  render: (args) => (
    <QuickActions
      {...args}
      actions={EXAMPLE_ACTIONS}
      onActionClick={(action) => console.log('Action clicked:', action.label)}
    />
  ),
  args: {
    variant: 'bar',
    orientation: 'horizontal',
    size: 'md',
    showLabels: false,
    showIcons: true,
  },
};

// Size variations - Small
export const Small: Story = {
  render: (args) => (
    <QuickActions
      {...args}
      actions={EXAMPLE_ACTIONS}
      onActionClick={(action) => console.log('Action clicked:', action.label)}
    />
  ),
  args: {
    variant: 'bar',
    orientation: 'horizontal',
    size: 'sm',
    showLabels: true,
    showIcons: true,
  },
};

// Size variations - Large
export const Large: Story = {
  render: (args) => (
    <QuickActions
      {...args}
      actions={EXAMPLE_ACTIONS}
      onActionClick={(action) => console.log('Action clicked:', action.label)}
    />
  ),
  args: {
    variant: 'bar',
    orientation: 'horizontal',
    size: 'lg',
    showLabels: true,
    showIcons: true,
  },
};

// With grouped actions
export const GroupedActions: Story = {
  render: (args) => (
    <QuickActions
      {...args}
      actions={GROUPED_ACTIONS}
      onActionClick={(action) => console.log('Action clicked:', action.label)}
    />
  ),
  args: {
    variant: 'bar',
    orientation: 'horizontal',
    size: 'md',
    showLabels: true,
    showIcons: true,
  },
};

// With disabled actions
export const DisabledActions: Story = {
  render: (args) => {
    const disabledActions = EXAMPLE_ACTIONS.map((action, idx) => ({
      ...action,
      disabled: idx > 2,
    }));

    return (
      <QuickActions
        {...args}
        actions={disabledActions}
        onActionClick={(action) => console.log('Action clicked:', action.label)}
      />
    );
  },
  args: {
    variant: 'bar',
    orientation: 'horizontal',
    size: 'md',
    showLabels: true,
    showIcons: true,
  },
};

// With permission filtering
export const WithPermissions: Story = {
  render: (args) => {
    const permissionActions = [
      ...EXAMPLE_ACTIONS.slice(0, 2),
      {
        ...EXAMPLE_ACTIONS[2],
        requiredPermissions: ['admin'],
      },
      ...EXAMPLE_ACTIONS.slice(3),
    ];

    return (
      <QuickActions
        {...args}
        actions={permissionActions}
        permissions={['user', 'editor']}
        onActionClick={(action) => console.log('Action clicked:', action.label)}
      />
    );
  },
  args: {
    variant: 'bar',
    orientation: 'horizontal',
    size: 'md',
    showLabels: true,
    showIcons: true,
  },
};

// Interactive with state
export const Interactive: Story = {
  render: (args) => {
    const [lastAction, setLastAction] = useState<string>('');

    return (
      <div>
        <QuickActions
          {...args}
          actions={EXAMPLE_ACTIONS}
          onActionClick={(action) => setLastAction(action.label)}
        />
        {lastAction && (
          <div style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>
            Last action: <strong>{lastAction}</strong>
          </div>
        )}
      </div>
    );
  },
  args: {
    variant: 'bar',
    orientation: 'horizontal',
    size: 'md',
    showLabels: true,
    showIcons: true,
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h3>Bar Variant</h3>
        <QuickActions
          variant="bar"
          actions={EXAMPLE_ACTIONS}
          onActionClick={(action) => console.log('Action:', action.label)}
        />
      </div>
      <div>
        <h3>Grid Variant</h3>
        <QuickActions
          variant="grid"
          actions={EXAMPLE_ACTIONS}
          onActionClick={(action) => console.log('Action:', action.label)}
        />
      </div>
      <div>
        <h3>Compact Variant</h3>
        <QuickActions
          variant="compact"
          actions={EXAMPLE_ACTIONS}
          showLabels={false}
          onActionClick={(action) => console.log('Action:', action.label)}
        />
      </div>
    </div>
  ),
};
