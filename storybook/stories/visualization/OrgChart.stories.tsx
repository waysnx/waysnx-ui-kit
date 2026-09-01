import type { Meta, StoryObj } from '@storybook/react';
import { OrgChart } from '@waysnx/ui-visualization';
import type { VisNode } from '@waysnx/ui-visualization';
import '@waysnx/ui-visualization/dist/index.css';
import { TestBadge } from '../TestBadge';

const meta = {
  title: 'Visualization/OrgChart',
  component: OrgChart,
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
} satisfies Meta<typeof OrgChart>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleNodes: VisNode[] = [
  {
    id: '1',
    label: 'Emma Johnson',
    subtitle: 'Chief Executive Officer',
    status: 'online',
    expanded: true,
  },
  {
    id: '2',
    label: 'Liam Anderson',
    subtitle: 'Chief Operating Officer',
    parentId: '1',
    status: 'online',
    expanded: true,
  },
  {
    id: '3',
    label: 'Olivia Martinez',
    subtitle: 'Chief Technology Officer',
    parentId: '1',
    status: 'away',
    expanded: true,
  },
  {
    id: '4',
    label: 'Noah Williams',
    subtitle: 'Chief Financial Officer',
    parentId: '1',
    status: 'online',
    expanded: true,
  },
  {
    id: '5',
    label: 'Ava Thompson',
    subtitle: 'Operations Manager',
    parentId: '2',
    status: 'online',
  },
  {
    id: '6',
    label: 'James Wilson',
    subtitle: 'Supply Chain Lead',
    parentId: '2',
    status: 'offline',
  },
  {
    id: '7',
    label: 'Isabella Garcia',
    subtitle: 'Engineering Manager',
    parentId: '3',
    status: 'online',
    expanded: true,
  },
  {
    id: '8',
    label: 'Mason Brown',
    subtitle: 'Product Manager',
    parentId: '3',
    status: 'busy',
  },
  {
    id: '9',
    label: 'Sophia Davis',
    subtitle: 'Finance Manager',
    parentId: '4',
    status: 'online',
  },
  {
    id: '10',
    label: 'Ethan Moore',
    subtitle: 'Senior Engineer',
    parentId: '7',
    status: 'online',
  },
  {
    id: '11',
    label: 'Mia Taylor',
    subtitle: 'Senior Engineer',
    parentId: '7',
    status: 'away',
  },
  {
    id: '12',
    label: 'Lucas Harris',
    subtitle: 'Junior Engineer',
    parentId: '7',
    status: 'online',
  },
];

export const Default: Story = {
  args: {
    nodes: sampleNodes,
    height: '600px',
    showToolbar: true,
    showSearch: true,
    showMiniMap: true,
    showGrid: true,
    onNodeClick: (event) => console.log('Node clicked:', event.node),
  },
};

export const DarkTheme: Story = {
  args: {
    nodes: sampleNodes,
    height: '600px',
    dark: true,
    showToolbar: true,
    showSearch: true,
    showMiniMap: true,
  },
};

export const MinimalUI: Story = {
  args: {
    nodes: sampleNodes,
    height: '500px',
    showToolbar: false,
    showSearch: false,
    showMiniMap: false,
    showGrid: false,
  },
};

export const LargeDataset: Story = {
  args: {
    nodes: Array.from({ length: 200 }, (_, i) => ({
      id: `node-${i}`,
      label: `Employee ${i + 1}`,
      subtitle: i === 0 ? 'CEO' : `Position ${i + 1}`,
      parentId: i === 0 ? undefined : `node-${Math.floor((i - 1) / 4)}`,
      status: (['online', 'offline', 'away', 'busy'] as const)[i % 4],
      expanded: i < 20,
    })),
    height: '600px',
    showToolbar: true,
    showMiniMap: true,
    config: {
      virtualize: true,
      virtualizeThreshold: 50,
    },
  },
};

export const WithBadges: Story = {
  args: {
    nodes: sampleNodes.map((n, i) =>
      i % 2 === 0 ? { ...n, badge: Math.floor(Math.random() * 10) } : n
    ),
    height: '600px',
    showToolbar: true,
    showSearch: true,
  },
};

export const Accessibility: Story = {
  args: {
    nodes: sampleNodes.slice(0, 6),
    height: '500px',
    'aria-label': 'Company organizational structure',
    config: {
      enableKeyboard: true,
      selection: 'single',
    },
  },
  parameters: {
    a11y: {
      config: {
        rules: [
          { id: 'aria-allowed-attr', enabled: true },
          { id: 'aria-required-attr', enabled: true },
          { id: 'aria-valid-attr', enabled: true },
          { id: 'aria-valid-attr-value', enabled: true },
          { id: 'button-name', enabled: true },
          { id: 'keyboard-navigation', enabled: true },
        ],
      },
    },
  },
};

export const Responsive: Story = {
  args: {
    nodes: sampleNodes,
    width: '100%',
    height: '100vh',
    showToolbar: true,
    showSearch: true,
    showMiniMap: true,
  },
  parameters: {
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '667px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1440px', height: '900px' } },
      },
    },
  },
};
