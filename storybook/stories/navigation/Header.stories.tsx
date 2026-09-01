import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { Header } from '@waysnx/ui-navigation';
import type { BreadcrumbItem } from '@waysnx/ui-navigation';

const meta = {
  title: 'Navigation/Header',
  component: Header,
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
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleBreadcrumbs: BreadcrumbItem[] = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'products', label: 'Products', href: '/products' },
  { id: 'current', label: 'Current Page' },
];

export const Default: Story = {
  args: {
    title: 'Page Title',
    subtitle: 'This is a page subtitle',
    breadcrumbs: sampleBreadcrumbs,
  },
  render: (args) => (
    <div>
      <Header {...args} />
      <div style={{ padding: '20px' }}>
        <p>Page content goes here</p>
      </div>
    </div>
  ),
};

export const WithIcon: Story = {
  args: {
    title: 'Dashboard',
    subtitle: 'Welcome to your dashboard',
    icon: '📊',
    breadcrumbs: [
      { id: 'home', label: 'Home', href: '/' },
      { id: 'current', label: 'Dashboard' },
    ],
  },
  render: (args) => (
    <div>
      <Header {...args} />
      <div style={{ padding: '20px' }}>
        <p>Page content goes here</p>
      </div>
    </div>
  ),
};

export const WithActions: Story = {
  args: {
    title: 'Users',
    subtitle: 'Manage application users',
    right: (
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button style={{ padding: '0.5rem 1rem', borderRadius: '4px' }}>
          Add User
        </button>
        <button style={{ padding: '0.5rem 1rem', borderRadius: '4px' }}>
          Export
        </button>
      </div>
    ),
    breadcrumbs: sampleBreadcrumbs,
  },
  render: (args) => (
    <div>
      <Header {...args} />
      <div style={{ padding: '20px' }}>
        <p>Page content goes here</p>
      </div>
    </div>
  ),
};

export const Small: Story = {
  args: {
    title: 'Small Header',
    size: 'sm',
    breadcrumbs: sampleBreadcrumbs,
  },
  render: (args) => (
    <div>
      <Header {...args} />
      <div style={{ padding: '20px' }}>
        <p>Page content goes here</p>
      </div>
    </div>
  ),
};

export const Large: Story = {
  args: {
    title: 'Large Header',
    subtitle: 'This is a large header with more prominence',
    size: 'lg',
    icon: '🎯',
    breadcrumbs: sampleBreadcrumbs,
  },
  render: (args) => (
    <div>
      <Header {...args} />
      <div style={{ padding: '20px' }}>
        <p>Page content goes here</p>
      </div>
    </div>
  ),
};

export const Minimal: Story = {
  args: {
    title: 'Minimal Header',
    variant: 'minimal',
    showBreadcrumb: false,
  },
  render: (args) => (
    <div>
      <Header {...args} />
      <div style={{ padding: '20px' }}>
        <p>Page content goes here</p>
      </div>
    </div>
  ),
};

export const Elevated: Story = {
  args: {
    title: 'Elevated Header',
    subtitle: 'This header has a shadow',
    variant: 'elevated',
    breadcrumbs: sampleBreadcrumbs,
  },
  render: (args) => (
    <div>
      <Header {...args} />
      <div style={{ padding: '20px' }}>
        <p>Page content goes here</p>
      </div>
    </div>
  ),
};

export const Sticky: Story = {
  args: {
    title: 'Sticky Header',
    subtitle: 'This header stays at the top when scrolling',
    sticky: true,
    breadcrumbs: sampleBreadcrumbs,
  },
  render: (args) => (
    <div>
      <Header {...args} />
      <div style={{ padding: '20px', height: '100vh', overflow: 'auto' }}>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        {Array.from({ length: 50 }).map((_, i) => (
          <p key={i}>
            Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        ))}
      </div>
    </div>
  ),
};

export const NoBreadcrumb: Story = {
  args: {
    title: 'No Breadcrumb',
    subtitle: 'Breadcrumb is hidden',
    showBreadcrumb: false,
  },
  render: (args) => (
    <div>
      <Header {...args} />
      <div style={{ padding: '20px' }}>
        <p>Page content goes here</p>
      </div>
    </div>
  ),
};

export const WithLeftContent: Story = {
  args: {
    title: 'Header with Left Content',
    subtitle: 'Additional content on the left',
    left: (
      <div style={{ display: 'flex', gap: '1rem' }}>
        <span style={{ padding: '0.5rem 1rem', backgroundColor: '#e0e0e0', borderRadius: '4px' }}>
          Filter
        </span>
      </div>
    ),
    breadcrumbs: sampleBreadcrumbs,
  },
  render: (args) => (
    <div>
      <Header {...args} />
      <div style={{ padding: '20px' }}>
        <p>Page content goes here</p>
      </div>
    </div>
  ),
};

export const DarkMode: Story = {
  args: {
    title: 'Dark Mode Header',
    subtitle: 'This header is in dark mode',
    breadcrumbs: sampleBreadcrumbs,
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#1e1e1e', color: '#fff' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <div>
      <Header {...args} />
      <div style={{ padding: '20px' }}>
        <p>Page content goes here</p>
      </div>
    </div>
  ),
};

export const ComplexBreadcrumb: Story = {
  args: {
    title: 'Products',
    subtitle: 'Product management',
    breadcrumbs: [
      { id: 'home', label: 'Home', href: '/' },
      { id: 'admin', label: 'Admin', href: '/admin' },
      { id: 'inventory', label: 'Inventory', href: '/admin/inventory' },
      { id: 'products', label: 'Products', href: '/admin/inventory/products' },
      { id: 'current', label: 'Product List' },
    ],
    right: (
      <button style={{ padding: '0.5rem 1rem', borderRadius: '4px' }}>
        Add Product
      </button>
    ),
  },
  render: (args) => (
    <div>
      <Header {...args} />
      <div style={{ padding: '20px' }}>
        <p>Page content goes here</p>
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  args: {
    title: 'Interactive Header',
    subtitle: 'Click breadcrumb items to navigate',
    breadcrumbs: sampleBreadcrumbs,
  },
  render: (args) => (
    <div>
      <Header
        {...args}
        onBreadcrumbClick={(item) => {
          alert(`Clicked: ${item.label}`);
        }}
      />
      <div style={{ padding: '20px' }}>
        <p>Page content goes here</p>
      </div>
    </div>
  ),
};

export const Accessibility: Story = {
  args: {
    title: 'Accessible Header',
    subtitle: 'This header is fully accessible',
    breadcrumbs: sampleBreadcrumbs,
  },
  parameters: {
    docs: {
      description: {
        story: 'Header with full keyboard navigation and ARIA support for screen readers.',
      },
    },
  },
  render: (args) => (
    <div>
      <Header {...args} />
      <div style={{ padding: '20px' }}>
        <p>Page content goes here</p>
      </div>
    </div>
  ),
};
