import type { Meta, StoryObj } from '@storybook/react';
import { Hierarchy } from '@waysnx/ui-visualization';
import type { VisNode } from '@waysnx/ui-visualization';
import '@waysnx/ui-visualization/dist/index.css';
import { TestBadge } from '../TestBadge';

const meta = {
  title: 'Visualization/Hierarchy',
  component: Hierarchy,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div>
        <TestBadge componentName="Visualization" />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Hierarchy>;

export default meta;
type Story = StoryObj<typeof meta>;

const businessNodes: VisNode[] = [
  { id: '1', label: 'Organization', subtitle: 'Root', expanded: true },
  { id: '2', label: 'Operations', subtitle: 'Division', parentId: '1', expanded: true },
  { id: '3', label: 'Technology', subtitle: 'Division', parentId: '1', expanded: true },
  { id: '4', label: 'Finance', subtitle: 'Division', parentId: '1', expanded: false },
  { id: '5', label: 'Manufacturing', subtitle: 'Department', parentId: '2' },
  { id: '6', label: 'Logistics', subtitle: 'Department', parentId: '2' },
  { id: '7', label: 'Engineering', subtitle: 'Department', parentId: '3', badge: '12' },
  { id: '8', label: 'Product', subtitle: 'Department', parentId: '3', badge: '8' },
  { id: '9', label: 'Accounting', subtitle: 'Department', parentId: '4' },
  { id: '10', label: 'Treasury', subtitle: 'Department', parentId: '4' },
  { id: '11', label: 'Frontend Team', subtitle: 'Team', parentId: '7', badge: '5' },
  { id: '12', label: 'Backend Team', subtitle: 'Team', parentId: '7', badge: '7' },
];

const productNodes: VisNode[] = [
  { id: 'p1', label: 'Electronics', expanded: true },
  { id: 'p2', label: 'Computers', parentId: 'p1', expanded: true },
  { id: 'p3', label: 'Phones', parentId: 'p1', expanded: false },
  { id: 'p4', label: 'Laptops', parentId: 'p2', badge: '24' },
  { id: 'p5', label: 'Desktops', parentId: 'p2', badge: '15' },
  { id: 'p6', label: 'Smartphones', parentId: 'p3', badge: '50' },
  { id: 'p7', label: 'Tablets', parentId: 'p3', badge: '12' },
];

export const Default: Story = {
  args: {
    nodes: businessNodes,
    height: '600px',
    showMiniMap: true,
    showToolbar: true,
    showGrid: true,
  },
};

export const DarkTheme: Story = {
  args: {
    nodes: businessNodes,
    height: '600px',
    dark: true,
    showMiniMap: true,
    showToolbar: true,
  },
};

export const ProductHierarchy: Story = {
  args: {
    nodes: productNodes,
    height: '500px',
    showMiniMap: true,
    showToolbar: true,
  },
};

export const MinimalUI: Story = {
  args: {
    nodes: businessNodes,
    height: '500px',
    showMiniMap: false,
    showToolbar: false,
    showGrid: false,
  },
};

export const WithSelection: Story = {
  args: {
    nodes: businessNodes,
    height: '600px',
    showMiniMap: true,
    showToolbar: true,
    config: {
      selection: 'multiple',
    },
    onNodeClick: (event) => console.log('Selected:', event.node),
  },
};

export const Accessibility: Story = {
  args: {
    nodes: productNodes,
    height: '500px',
    'aria-label': 'Product category hierarchy',
    config: {
      enableKeyboard: true,
    },
  },
  parameters: {
    a11y: {
      config: {
        rules: [
          { id: 'aria-allowed-attr', enabled: true },
          { id: 'keyboard-navigation', enabled: true },
        ],
      },
    },
  },
};

export const Responsive: Story = {
  args: {
    nodes: businessNodes,
    width: '100%',
    height: '100vh',
    showMiniMap: true,
    showToolbar: true,
  },
};
