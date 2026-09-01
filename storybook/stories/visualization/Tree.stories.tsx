import type { Meta, StoryObj } from '@storybook/react';
import { Tree } from '@waysnx/ui-visualization';
import type { VisNode } from '@waysnx/ui-visualization';
import '@waysnx/ui-visualization/dist/index.css';
import { TestBadge } from '../TestBadge';

const meta = {
  title: 'Visualization/Tree',
  component: Tree,
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
} satisfies Meta<typeof Tree>;

export default meta;
type Story = StoryObj<typeof meta>;

const fileSystemNodes: VisNode[] = [
  { id: 'root', label: 'Project Root', expanded: true },
  { id: 'src', label: 'src/', parentId: 'root', expanded: true },
  { id: 'components', label: 'components/', parentId: 'src', expanded: true },
  { id: 'Button', label: 'Button.tsx', parentId: 'components' },
  { id: 'Input', label: 'Input.tsx', parentId: 'components' },
  { id: 'Select', label: 'Select.tsx', parentId: 'components' },
  { id: 'utils', label: 'utils/', parentId: 'src', expanded: false },
  { id: 'helpers', label: 'helpers.ts', parentId: 'utils' },
  { id: 'validators', label: 'validators.ts', parentId: 'utils' },
  { id: 'public', label: 'public/', parentId: 'root', expanded: true },
  { id: 'index', label: 'index.html', parentId: 'public' },
  { id: 'assets', label: 'assets/', parentId: 'public' },
  { id: 'logo', label: 'logo.svg', parentId: 'assets' },
];

const taxonomyNodes: VisNode[] = [
  { id: 'animals', label: 'Animals', expanded: true },
  { id: 'mammals', label: 'Mammals', parentId: 'animals', expanded: true },
  { id: 'dogs', label: 'Dogs', parentId: 'mammals' },
  { id: 'cats', label: 'Cats', parentId: 'mammals' },
  { id: 'birds', label: 'Birds', parentId: 'animals', expanded: false },
  { id: 'eagles', label: 'Eagles', parentId: 'birds' },
  { id: 'parrots', label: 'Parrots', parentId: 'birds' },
  { id: 'reptiles', label: 'Reptiles', parentId: 'animals' },
];

export const Default: Story = {
  args: {
    nodes: fileSystemNodes,
    height: '500px',
    showZoomControls: true,
  },
};

export const DarkTheme: Story = {
  args: {
    nodes: fileSystemNodes,
    height: '500px',
    dark: true,
    showZoomControls: true,
  },
};

export const TaxonomyTree: Story = {
  args: {
    nodes: taxonomyNodes,
    height: '400px',
    showZoomControls: true,
  },
};

export const WithSelection: Story = {
  args: {
    nodes: fileSystemNodes,
    height: '500px',
    showZoomControls: true,
    config: {
      selection: 'single',
    },
    onNodeClick: (event) => console.log('Selected:', event.node),
  },
};

export const NoGrid: Story = {
  args: {
    nodes: fileSystemNodes,
    height: '500px',
    showGrid: false,
    showZoomControls: true,
  },
};

export const Accessibility: Story = {
  args: {
    nodes: fileSystemNodes.slice(0, 8),
    height: '400px',
    'aria-label': 'File system tree visualization',
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
    nodes: fileSystemNodes,
    width: '100%',
    height: '100vh',
    showZoomControls: true,
  },
};
