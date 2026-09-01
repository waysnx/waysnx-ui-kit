import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { Breadcrumb } from '@waysnx/ui-navigation';
import type { BreadcrumbItem } from '@waysnx/ui-navigation';

const meta = {
  title: 'Navigation/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'centered',
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
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems: BreadcrumbItem[] = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'products', label: 'Products', href: '/products' },
  { id: 'electronics', label: 'Electronics', href: '/products/electronics' },
  { id: 'current', label: 'Smartphones' },
];

export const Default: Story = {
  args: {
    items: sampleItems,
  },
};

export const SimpleThreeLevels: Story = {
  args: {
    items: [
      { id: 'home', label: 'Home', href: '/' },
      { id: 'about', label: 'About', href: '/about' },
      { id: 'current', label: 'Team' },
    ],
  },
};

export const WithCustomSeparator: Story = {
  args: {
    items: sampleItems,
    separator: ' > ',
  },
};

export const WithArrowSeparator: Story = {
  args: {
    items: sampleItems,
    separator: '→',
  },
};

export const WithDotSeparator: Story = {
  args: {
    items: sampleItems,
    separator: '•',
  },
};

export const Small: Story = {
  args: {
    items: sampleItems,
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    items: sampleItems,
    size: 'lg',
  },
};

export const Truncated: Story = {
  args: {
    items: [
      { id: 'home', label: 'Home', href: '/' },
      { id: 'admin', label: 'Admin', href: '/admin' },
      { id: 'users', label: 'Users', href: '/admin/users' },
      { id: 'roles', label: 'Roles', href: '/admin/roles' },
      { id: 'permissions', label: 'Permissions', href: '/admin/roles/permissions' },
      { id: 'current', label: 'Edit' },
    ],
    maxItems: 3,
  },
};

export const SingleItem: Story = {
  args: {
    items: [
      { id: 'home', label: 'Home', href: '/' },
    ],
  },
};

export const AllClickable: Story = {
  args: {
    items: [
      { id: 'home', label: 'Home', href: '/', onClick: () => alert('Home clicked') },
      { id: 'products', label: 'Products', href: '/products', onClick: () => alert('Products clicked') },
      { id: 'electronics', label: 'Electronics', href: '/products/electronics', onClick: () => alert('Electronics clicked') },
      { id: 'current', label: 'Smartphones', onClick: () => alert('Smartphones clicked') },
    ],
  },
};

export const MixedClickable: Story = {
  args: {
    items: [
      { id: 'home', label: 'Home', href: '/' },
      { id: 'products', label: 'Products', href: '/products', onClick: () => alert('Products clicked') },
      { id: 'current', label: 'Current Page' },
    ],
  },
};

export const DarkMode: Story = {
  args: {
    items: sampleItems,
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#1e1e1e', color: '#fff', padding: '20px', borderRadius: '8px' }}>
        <Story />
      </div>
    ),
  ],
};

export const WithVeryLongLabels: Story = {
  args: {
    items: [
      { id: 'home', label: 'Home', href: '/' },
      { id: 'products', label: 'Products & Services', href: '/products' },
      { id: 'electronics', label: 'Electronics & Digital Devices', href: '/products/electronics' },
      { id: 'current', label: 'Smartphones & Mobile Devices' },
    ],
  },
};

export const MultiLevel: Story = {
  args: {
    items: [
      { id: 'home', label: 'Home', href: '/' },
      { id: 'company', label: 'Company', href: '/company' },
      { id: 'departments', label: 'Departments', href: '/company/departments' },
      { id: 'sales', label: 'Sales', href: '/company/departments/sales' },
      { id: 'regions', label: 'Regions', href: '/company/departments/sales/regions' },
      { id: 'current', label: 'North America' },
    ],
  },
};

export const Disabled: Story = {
  args: {
    items: [
      { id: 'home', label: 'Home', href: '/' },
      { id: 'products', label: 'Products (Disabled)', href: '/products' },
      { id: 'current', label: 'Current' },
    ],
  },
};

export const Interactive: Story = {
  args: {
    items: sampleItems,
    showActive: true,
  },
  render: (args) => (
    <div>
      <Breadcrumb
        {...args}
        onItemClick={(item) => {
          alert(`Navigated to: ${item.label}`);
        }}
      />
    </div>
  ),
};

export const WithSeparatorSlot: Story = {
  args: {
    items: sampleItems,
    separator: (
      <span style={{ fontSize: '1.25rem', margin: '0 0.5rem' }}>
        ⟩
      </span>
    ),
  },
};

export const DocumentationExample: Story = {
  args: {
    items: [
      { id: 'home', label: 'Documentation', href: '/docs' },
      { id: 'guide', label: 'Getting Started', href: '/docs/getting-started' },
      { id: 'install', label: 'Installation', href: '/docs/getting-started/installation' },
      { id: 'current', label: 'Setup' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Example breadcrumb for a documentation site showing hierarchical navigation.',
      },
    },
  },
};

export const EcommercePath: Story = {
  args: {
    items: [
      { id: 'home', label: 'Home', href: '/' },
      { id: 'catalog', label: 'Catalog', href: '/catalog' },
      { id: 'category', label: 'Clothing', href: '/catalog/clothing' },
      { id: 'subcategory', label: 'Men', href: '/catalog/clothing/men' },
      { id: 'current', label: 'Shirts' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Example breadcrumb for an e-commerce product page.',
      },
    },
  },
};

export const Accessibility: Story = {
  args: {
    items: sampleItems,
  },
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb with full accessibility support including ARIA attributes and keyboard navigation.',
      },
    },
  },
};
