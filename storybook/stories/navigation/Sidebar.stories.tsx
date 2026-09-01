import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { useState } from 'react';
import { Sidebar } from '@waysnx/ui-navigation';
import type { NavigationItem } from '@waysnx/ui-navigation';

const meta = {
  title: 'Navigation/Sidebar',
  component: Sidebar,
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
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/dashboard',
    icon: '📊',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    href: '/analytics',
    icon: '📈',
    children: [
      {
        id: 'analytics-overview',
        label: 'Overview',
        href: '/analytics/overview',
      },
      {
        id: 'analytics-reports',
        label: 'Reports',
        href: '/analytics/reports',
      },
    ],
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
        label: 'New',
        href: '/users/new',
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

export const Default: Story = {
  args: {
    items: sampleItems,
    logo: <div style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>Logo</div>,
    collapsible: true,
  },
  render: (args) => {
    const [activeItem, setActiveItem] = useState<NavigationItem | undefined>();
    return (
      <div style={{ display: 'flex', height: '100vh' }}>
        <Sidebar
          {...args}
          activeItem={activeItem}
          onActiveChange={setActiveItem}
        />
        <div style={{ flex: 1, padding: '20px', overflow: 'auto' }}>
          <h1>Content Area</h1>
          <p>Active: {activeItem?.label || 'None'}</p>
        </div>
      </div>
    );
  },
};

export const Collapsed: Story = {
  args: {
    items: sampleItems,
    logo: <div style={{ fontWeight: 'bold' }}>L</div>,
    collapsible: true,
    isCollapsed: true,
  },
  render: (args) => {
    const [activeItem, setActiveItem] = useState<NavigationItem | undefined>();
    return (
      <div style={{ display: 'flex', height: '100vh' }}>
        <Sidebar
          {...args}
          activeItem={activeItem}
          onActiveChange={setActiveItem}
        />
        <div style={{ flex: 1, padding: '20px', overflow: 'auto' }}>
          <h1>Content Area</h1>
          <p>Active: {activeItem?.label || 'None'}</p>
        </div>
      </div>
    );
  },
};

export const WithFooter: Story = {
  args: {
    items: sampleItems,
    logo: <div style={{ fontWeight: 'bold' }}>App</div>,
    collapsible: true,
    footer: (
      <div style={{ fontSize: '0.875rem', color: '#666' }}>
        <div>© 2024</div>
        <div>Version 1.0</div>
      </div>
    ),
  },
  render: (args) => {
    const [activeItem, setActiveItem] = useState<NavigationItem | undefined>();
    return (
      <div style={{ display: 'flex', height: '100vh' }}>
        <Sidebar
          {...args}
          activeItem={activeItem}
          onActiveChange={setActiveItem}
        />
        <div style={{ flex: 1, padding: '20px', overflow: 'auto' }}>
          <h1>Content Area</h1>
          <p>Active: {activeItem?.label || 'None'}</p>
        </div>
      </div>
    );
  },
};

export const NotCollapsible: Story = {
  args: {
    items: sampleItems,
    logo: <div style={{ fontWeight: 'bold' }}>App</div>,
    collapsible: false,
  },
  render: (args) => {
    const [activeItem, setActiveItem] = useState<NavigationItem | undefined>();
    return (
      <div style={{ display: 'flex', height: '100vh' }}>
        <Sidebar
          {...args}
          activeItem={activeItem}
          onActiveChange={setActiveItem}
        />
        <div style={{ flex: 1, padding: '20px', overflow: 'auto' }}>
          <h1>Content Area</h1>
          <p>Active: {activeItem?.label || 'None'}</p>
        </div>
      </div>
    );
  },
};

export const CompactDensity: Story = {
  args: {
    items: sampleItems,
    logo: <div style={{ fontWeight: 'bold' }}>L</div>,
    collapsible: true,
    density: 'compact',
  },
  render: (args) => {
    const [activeItem, setActiveItem] = useState<NavigationItem | undefined>();
    return (
      <div style={{ display: 'flex', height: '100vh' }}>
        <Sidebar
          {...args}
          activeItem={activeItem}
          onActiveChange={setActiveItem}
        />
        <div style={{ flex: 1, padding: '20px', overflow: 'auto' }}>
          <h1>Content Area</h1>
          <p>Active: {activeItem?.label || 'None'}</p>
        </div>
      </div>
    );
  },
};

export const RightPosition: Story = {
  args: {
    items: sampleItems,
    logo: <div style={{ fontWeight: 'bold' }}>L</div>,
    collapsible: true,
    position: 'right',
  },
  render: (args) => {
    const [activeItem, setActiveItem] = useState<NavigationItem | undefined>();
    return (
      <div style={{ display: 'flex', height: '100vh', flexDirection: 'row-reverse' }}>
        <Sidebar
          {...args}
          activeItem={activeItem}
          onActiveChange={setActiveItem}
        />
        <div style={{ flex: 1, padding: '20px', overflow: 'auto' }}>
          <h1>Content Area</h1>
          <p>Active: {activeItem?.label || 'None'}</p>
        </div>
      </div>
    );
  },
};

export const DarkMode: Story = {
  args: {
    items: sampleItems,
    logo: <div style={{ fontWeight: 'bold' }}>App</div>,
    collapsible: true,
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#1e1e1e', color: '#fff', height: '100vh' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => {
    const [activeItem, setActiveItem] = useState<NavigationItem | undefined>();
    return (
      <div style={{ display: 'flex', height: '100vh' }}>
        <Sidebar
          {...args}
          activeItem={activeItem}
          onActiveChange={setActiveItem}
        />
        <div style={{ flex: 1, padding: '20px', overflow: 'auto' }}>
          <h1>Content Area</h1>
          <p>Active: {activeItem?.label || 'None'}</p>
        </div>
      </div>
    );
  },
};

export const DarkColorScheme: Story = {
  args: {
    items: sampleItems,
    logo: <div style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>WaysNX</div>,
    collapsible: true,
    colorScheme: 'dark',
  },
  parameters: {
    docs: {
      description: {
        story: 'Dark sidebar on a light-themed app using the `colorScheme="dark"` prop. The sidebar renders with dark background and light text independently of the app theme — a common enterprise admin pattern.',
      },
    },
  },
  render: (args) => {
    const [activeItem, setActiveItem] = useState<NavigationItem | undefined>();
    return (
      <div style={{ display: 'flex', height: '100vh', background: '#f8fafc' }}>
        <Sidebar
          {...args}
          activeItem={activeItem}
          onActiveChange={setActiveItem}
        />
        <div style={{ flex: 1, padding: '20px', overflow: 'auto' }}>
          <h1>Light App with Dark Sidebar</h1>
          <p>The sidebar uses <code>colorScheme="dark"</code> while the content area stays light.</p>
          <p>Active: {activeItem?.label || 'None'}</p>
        </div>
      </div>
    );
  },
};

export const LightColorScheme: Story = {
  args: {
    items: sampleItems,
    logo: <div style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>WaysNX</div>,
    collapsible: true,
    colorScheme: 'light',
  },
  parameters: {
    docs: {
      description: {
        story: 'Explicit light sidebar using `colorScheme="light"` — forces light colors even inside a dark-themed app.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#1e1e1e', height: '100vh' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => {
    const [activeItem, setActiveItem] = useState<NavigationItem | undefined>();
    return (
      <div style={{ display: 'flex', height: '100vh' }}>
        <Sidebar
          {...args}
          activeItem={activeItem}
          onActiveChange={setActiveItem}
        />
        <div style={{ flex: 1, padding: '20px', overflow: 'auto', color: '#fff' }}>
          <h1>Dark App with Light Sidebar</h1>
          <p>Active: {activeItem?.label || 'None'}</p>
        </div>
      </div>
    );
  },
};

export const Interactive: Story = {
  args: {
    items: sampleItems,
    logo: <div style={{ fontWeight: 'bold' }}>WaysNX</div>,
    collapsible: true,
    persistState: true,
  },
  render: (args) => {
    const [activeItem, setActiveItem] = useState<NavigationItem | undefined>();
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
      <div style={{ display: 'flex', height: '100vh' }}>
        <Sidebar
          {...args}
          isCollapsed={isCollapsed}
          onCollapseChange={setIsCollapsed}
          activeItem={activeItem}
          onActiveChange={setActiveItem}
        />
        <div style={{ flex: 1, padding: '20px', overflow: 'auto' }}>
          <h1>Interactive Sidebar</h1>
          <p>Active: {activeItem?.label || 'None'}</p>
          <p>Collapsed: {isCollapsed ? 'Yes' : 'No'}</p>
        </div>
      </div>
    );
  },
};

export const Accessibility: Story = {
  args: {
    items: sampleItems,
    logo: <div style={{ fontWeight: 'bold' }}>App</div>,
    collapsible: true,
    keyboardNav: true,
    ariaLabel: 'Application sidebar navigation',
  },
  parameters: {
    docs: {
      description: {
        story: 'Sidebar with full keyboard navigation and ARIA support for accessibility.',
      },
    },
  },
  render: (args) => {
    const [activeItem, setActiveItem] = useState<NavigationItem | undefined>();
    return (
      <div style={{ display: 'flex', height: '100vh' }}>
        <Sidebar
          {...args}
          activeItem={activeItem}
          onActiveChange={setActiveItem}
        />
        <div style={{ flex: 1, padding: '20px', overflow: 'auto' }}>
          <h1>Content Area</h1>
          <p>Active: {activeItem?.label || 'None'}</p>
        </div>
      </div>
    );
  },
};
