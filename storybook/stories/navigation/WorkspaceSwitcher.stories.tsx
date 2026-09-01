/**
 * @file WorkspaceSwitcher.stories.tsx
 * Storybook stories for WorkspaceSwitcher component
 */

import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { WorkspaceSwitcher } from '@waysnx/ui-navigation';
import type { Workspace } from '@waysnx/ui-navigation';
import { useState } from 'react';

// Example workspaces with icons
const workspaceEmojis = {
  dev: '🛠️',
  prod: '🚀',
  staging: '🧪',
  design: '🎨',
};

const EXAMPLE_WORKSPACES: Workspace[] = [
  {
    id: 'dev',
    name: 'Development',
    icon: workspaceEmojis.dev,
    description: 'Local development environment',
    active: true,
  },
  {
    id: 'staging',
    name: 'Staging',
    icon: workspaceEmojis.staging,
    description: 'Pre-production testing environment',
    active: false,
  },
  {
    id: 'prod',
    name: 'Production',
    icon: workspaceEmojis.prod,
    description: 'Live production environment',
    active: false,
  },
  {
    id: 'design',
    name: 'Design',
    icon: workspaceEmojis.design,
    description: 'Design system workspace',
    active: false,
  },
];

const meta: Meta<typeof WorkspaceSwitcher> = {
  title: 'Navigation/WorkspaceSwitcher',
  component: WorkspaceSwitcher,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['dropdown', 'pills', 'minimal'],
      description: 'Display variant of the switcher',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
    },
    showIcons: {
      control: 'boolean',
      description: 'Show workspace icons',
    },
    showDescriptions: {
      control: 'boolean',
      description: 'Show workspace descriptions (dropdown only)',
    },
    enableKeyboardNav: {
      control: 'boolean',
      description: 'Enable keyboard navigation',
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

// Default story with dropdown variant
export const Default: Story = {
  render: (args) => {
    const [activeWorkspace, setActiveWorkspace] = useState<Workspace | undefined>(
      EXAMPLE_WORKSPACES[0]
    );

    return (
      <WorkspaceSwitcher
        {...args}
        workspaces={EXAMPLE_WORKSPACES}
        activeWorkspace={activeWorkspace}
        onWorkspaceChange={setActiveWorkspace}
      />
    );
  },
  args: {
    variant: 'dropdown',
    size: 'md',
    showIcons: true,
    showDescriptions: false,
    enableKeyboardNav: true,
  },
};

// Dropdown variant with descriptions
export const DropdownWithDescriptions: Story = {
  render: (args) => {
    const [activeWorkspace, setActiveWorkspace] = useState<Workspace | undefined>(
      EXAMPLE_WORKSPACES[0]
    );

    return (
      <WorkspaceSwitcher
        {...args}
        workspaces={EXAMPLE_WORKSPACES}
        activeWorkspace={activeWorkspace}
        onWorkspaceChange={setActiveWorkspace}
      />
    );
  },
  args: {
    variant: 'dropdown',
    size: 'md',
    showIcons: true,
    showDescriptions: true,
    enableKeyboardNav: true,
  },
};

// Pills variant
export const Pills: Story = {
  render: (args) => {
    const [activeWorkspace, setActiveWorkspace] = useState<Workspace | undefined>(
      EXAMPLE_WORKSPACES[0]
    );

    return (
      <WorkspaceSwitcher
        {...args}
        workspaces={EXAMPLE_WORKSPACES}
        activeWorkspace={activeWorkspace}
        onWorkspaceChange={setActiveWorkspace}
      />
    );
  },
  args: {
    variant: 'pills',
    size: 'md',
    showIcons: true,
    showDescriptions: false,
    enableKeyboardNav: true,
  },
};

// Minimal variant
export const Minimal: Story = {
  render: (args) => {
    const [activeWorkspace, setActiveWorkspace] = useState<Workspace | undefined>(
      EXAMPLE_WORKSPACES[0]
    );

    return (
      <div style={{ width: '200px' }}>
        <WorkspaceSwitcher
          {...args}
          workspaces={EXAMPLE_WORKSPACES}
          activeWorkspace={activeWorkspace}
          onWorkspaceChange={setActiveWorkspace}
        />
      </div>
    );
  },
  args: {
    variant: 'minimal',
    size: 'md',
    showIcons: true,
    showDescriptions: false,
    enableKeyboardNav: true,
  },
};

// Size variations - Small
export const Small: Story = {
  render: (args) => {
    const [activeWorkspace, setActiveWorkspace] = useState<Workspace | undefined>(
      EXAMPLE_WORKSPACES[0]
    );

    return (
      <WorkspaceSwitcher
        {...args}
        workspaces={EXAMPLE_WORKSPACES}
        activeWorkspace={activeWorkspace}
        onWorkspaceChange={setActiveWorkspace}
      />
    );
  },
  args: {
    variant: 'dropdown',
    size: 'sm',
    showIcons: true,
    showDescriptions: false,
  },
};

// Size variations - Large
export const Large: Story = {
  render: (args) => {
    const [activeWorkspace, setActiveWorkspace] = useState<Workspace | undefined>(
      EXAMPLE_WORKSPACES[0]
    );

    return (
      <WorkspaceSwitcher
        {...args}
        workspaces={EXAMPLE_WORKSPACES}
        activeWorkspace={activeWorkspace}
        onWorkspaceChange={setActiveWorkspace}
      />
    );
  },
  args: {
    variant: 'dropdown',
    size: 'lg',
    showIcons: true,
    showDescriptions: false,
  },
};

// Without icons
export const WithoutIcons: Story = {
  render: (args) => {
    const [activeWorkspace, setActiveWorkspace] = useState<Workspace | undefined>(
      EXAMPLE_WORKSPACES[0]
    );

    return (
      <WorkspaceSwitcher
        {...args}
        workspaces={EXAMPLE_WORKSPACES}
        activeWorkspace={activeWorkspace}
        onWorkspaceChange={setActiveWorkspace}
      />
    );
  },
  args: {
    variant: 'dropdown',
    size: 'md',
    showIcons: false,
    showDescriptions: true,
  },
};

// Interactive example showing all variants
export const AllVariants: Story = {
  render: () => {
    const [activeWorkspace, setActiveWorkspace] = useState<Workspace | undefined>(
      EXAMPLE_WORKSPACES[0]
    );

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div>
          <h3>Dropdown</h3>
          <WorkspaceSwitcher
            variant="dropdown"
            workspaces={EXAMPLE_WORKSPACES}
            activeWorkspace={activeWorkspace}
            onWorkspaceChange={setActiveWorkspace}
            showDescriptions
          />
        </div>
        <div>
          <h3>Pills</h3>
          <WorkspaceSwitcher
            variant="pills"
            workspaces={EXAMPLE_WORKSPACES}
            activeWorkspace={activeWorkspace}
            onWorkspaceChange={setActiveWorkspace}
          />
        </div>
        <div>
          <h3>Minimal</h3>
          <div style={{ width: '200px' }}>
            <WorkspaceSwitcher
              variant="minimal"
              workspaces={EXAMPLE_WORKSPACES}
              activeWorkspace={activeWorkspace}
              onWorkspaceChange={setActiveWorkspace}
            />
          </div>
        </div>
      </div>
    );
  },
};

// Example with many workspaces (shows scrolling)
export const ManyWorkspaces: Story = {
  render: (args) => {
    const manyWorkspaces: Workspace[] = Array.from({ length: 12 }, (_, i) => ({
      id: `workspace-${i}`,
      name: `Workspace ${i + 1}`,
      icon: ['🛠️', '🚀', '🧪', '🎨', '📊', '🔧'][i % 6],
      description: `Description for workspace ${i + 1}`,
    }));

    const [activeWorkspace, setActiveWorkspace] = useState<Workspace | undefined>(
      manyWorkspaces[0]
    );

    return (
      <WorkspaceSwitcher
        {...args}
        workspaces={manyWorkspaces}
        activeWorkspace={activeWorkspace}
        onWorkspaceChange={setActiveWorkspace}
      />
    );
  },
  args: {
    variant: 'dropdown',
    size: 'md',
    showIcons: true,
    showDescriptions: true,
  },
};
