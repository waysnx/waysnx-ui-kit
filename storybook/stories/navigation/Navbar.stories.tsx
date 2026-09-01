import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { useState } from 'react';
import { Navbar } from '@waysnx/ui-navigation';
import type { NavigationItem } from '@waysnx/ui-navigation';

const meta = {
  title: 'Navigation/Navbar',
  component: Navbar,
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
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems: NavigationItem[] = [
  {
    id: 'home',
    label: 'Home',
    href: '/',
    icon: '🏠',
  },
  {
    id: 'products',
    label: 'Products',
    href: '/products',
    icon: '📦',
  },
  {
    id: 'docs',
    label: 'Docs',
    href: '/docs',
    icon: '📖',
  },
  {
    id: 'contact',
    label: 'Contact',
    href: '/contact',
    icon: '💬',
  },
];

export const Default: Story = {
  args: {
    items: sampleItems,
    logo: <div style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>MyApp</div>,
    title: 'Application',
    sticky: true,
  },
  render: (args) => {
    const [activeItem, setActiveItem] = useState<NavigationItem | undefined>();
    return (
      <div>
        <Navbar
          {...args}
          activeItem={activeItem}
          onActiveChange={setActiveItem}
        />
        <div style={{ padding: '20px' }}>
          <h1>Page Content</h1>
          <p>Active: {activeItem?.label || 'None'}</p>
        </div>
      </div>
    );
  },
};

export const WithRightContent: Story = {
  args: {
    items: sampleItems,
    logo: <div style={{ fontWeight: 'bold' }}>App</div>,
    right: (
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <button style={{ padding: '0.5rem 1rem', borderRadius: '4px' }}>
          Sign In
        </button>
      </div>
    ),
  },
  render: (args) => {
    const [activeItem, setActiveItem] = useState<NavigationItem | undefined>();
    return (
      <div>
        <Navbar
          {...args}
          activeItem={activeItem}
          onActiveChange={setActiveItem}
        />
        <div style={{ padding: '20px' }}>
          <h1>Page Content</h1>
          <p>Active: {activeItem?.label || 'None'}</p>
        </div>
      </div>
    );
  },
};

export const WithLeftContent: Story = {
  args: {
    items: sampleItems,
    logo: <div style={{ fontWeight: 'bold' }}>App</div>,
    left: (
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <button style={{ padding: '0.5rem 1rem', borderRadius: '4px' }}>
          Search
        </button>
      </div>
    ),
  },
  render: (args) => {
    const [activeItem, setActiveItem] = useState<NavigationItem | undefined>();
    return (
      <div>
        <Navbar
          {...args}
          activeItem={activeItem}
          onActiveChange={setActiveItem}
        />
        <div style={{ padding: '20px' }}>
          <h1>Page Content</h1>
          <p>Active: {activeItem?.label || 'None'}</p>
        </div>
      </div>
    );
  },
};

export const Static: Story = {
  args: {
    items: sampleItems,
    logo: <div style={{ fontWeight: 'bold' }}>App</div>,
    position: 'static',
  },
  render: (args) => {
    const [activeItem, setActiveItem] = useState<NavigationItem | undefined>();
    return (
      <div>
        <Navbar
          {...args}
          activeItem={activeItem}
          onActiveChange={setActiveItem}
        />
        <div style={{ padding: '20px' }}>
          <h1>Page Content</h1>
          <p>Active: {activeItem?.label || 'None'}</p>
        </div>
      </div>
    );
  },
};

export const Fixed: Story = {
  args: {
    items: sampleItems,
    logo: <div style={{ fontWeight: 'bold' }}>App</div>,
    position: 'fixed',
  },
  render: (args) => {
    const [activeItem, setActiveItem] = useState<NavigationItem | undefined>();
    return (
      <div>
        <Navbar
          {...args}
          activeItem={activeItem}
          onActiveChange={setActiveItem}
        />
        <div style={{ padding: '20px', marginTop: '3.5rem' }}>
          <h1>Page Content</h1>
          <p>Active: {activeItem?.label || 'None'}</p>
          <p>Lorem ipsum dolor sit amet...</p>
        </div>
      </div>
    );
  },
};

export const NoShadow: Story = {
  args: {
    items: sampleItems,
    logo: <div style={{ fontWeight: 'bold' }}>App</div>,
    shadow: 'none',
  },
  render: (args) => {
    const [activeItem, setActiveItem] = useState<NavigationItem | undefined>();
    return (
      <div>
        <Navbar
          {...args}
          activeItem={activeItem}
          onActiveChange={setActiveItem}
        />
        <div style={{ padding: '20px' }}>
          <h1>Page Content</h1>
          <p>Active: {activeItem?.label || 'None'}</p>
        </div>
      </div>
    );
  },
};

export const CompactDensity: Story = {
  args: {
    items: sampleItems,
    logo: <div style={{ fontWeight: 'bold' }}>App</div>,
    density: 'compact',
  },
  render: (args) => {
    const [activeItem, setActiveItem] = useState<NavigationItem | undefined>();
    return (
      <div>
        <Navbar
          {...args}
          activeItem={activeItem}
          onActiveChange={setActiveItem}
        />
        <div style={{ padding: '20px' }}>
          <h1>Page Content</h1>
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
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#1e1e1e', color: '#fff' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => {
    const [activeItem, setActiveItem] = useState<NavigationItem | undefined>();
    return (
      <div>
        <Navbar
          {...args}
          activeItem={activeItem}
          onActiveChange={setActiveItem}
        />
        <div style={{ padding: '20px' }}>
          <h1>Page Content</h1>
          <p>Active: {activeItem?.label || 'None'}</p>
        </div>
      </div>
    );
  },
};

export const WithTitle: Story = {
  args: {
    items: sampleItems.slice(0, 3),
    logo: <div style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>🎯</div>,
    title: 'Dashboard',
  },
  render: (args) => {
    const [activeItem, setActiveItem] = useState<NavigationItem | undefined>();
    return (
      <div>
        <Navbar
          {...args}
          activeItem={activeItem}
          onActiveChange={setActiveItem}
        />
        <div style={{ padding: '20px' }}>
          <h1>Page Content</h1>
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
    showMobileMenu: true,
  },
  render: (args) => {
    const [activeItem, setActiveItem] = useState<NavigationItem | undefined>();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
      <div>
        <Navbar
          {...args}
          activeItem={activeItem}
          onActiveChange={setActiveItem}
          onMobileMenuToggle={setMobileMenuOpen}
        />
        <div style={{ padding: '20px' }}>
          <h1>Page Content</h1>
          <p>Active: {activeItem?.label || 'None'}</p>
          <p>Mobile Menu Open: {mobileMenuOpen ? 'Yes' : 'No'}</p>
        </div>
      </div>
    );
  },
};

export const Accessibility: Story = {
  args: {
    items: sampleItems,
    logo: <div style={{ fontWeight: 'bold' }}>App</div>,
    keyboardNav: true,
    ariaLabel: 'Main navigation bar',
  },
  parameters: {
    docs: {
      description: {
        story: 'Navbar with full keyboard navigation and ARIA support.',
      },
    },
  },
  render: (args) => {
    const [activeItem, setActiveItem] = useState<NavigationItem | undefined>();
    return (
      <div>
        <Navbar
          {...args}
          activeItem={activeItem}
          onActiveChange={setActiveItem}
        />
        <div style={{ padding: '20px' }}>
          <h1>Page Content</h1>
          <p>Active: {activeItem?.label || 'None'}</p>
        </div>
      </div>
    );
  },
};
