import type { Meta, StoryObj } from '@storybook/react';
import { Legend } from '@waysnx/ui-visualization';
import type { LegendItem } from '@waysnx/ui-visualization';
import '@waysnx/ui-visualization/dist/index.css';
import { TestBadge } from '../TestBadge';

const meta = {
  title: 'Visualization/Legend',
  component: Legend,
  parameters: {
    layout: 'centered',
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
} satisfies Meta<typeof Legend>;

export default meta;
type Story = StoryObj<typeof meta>;

const statusItems: LegendItem[] = [
  { id: 'online', label: 'Online', color: '#22c55e', shape: 'circle' },
  { id: 'away', label: 'Away', color: '#f59e0b', shape: 'circle' },
  { id: 'busy', label: 'Busy', color: '#ef4444', shape: 'circle' },
  { id: 'offline', label: 'Offline', color: '#94a3b8', shape: 'circle' },
];

const priorityItems: LegendItem[] = [
  { id: 'critical', label: 'Critical', color: '#dc2626', shape: 'square' },
  { id: 'high', label: 'High', color: '#f59e0b', shape: 'square' },
  { id: 'medium', label: 'Medium', color: '#3b82f6', shape: 'square' },
  { id: 'low', label: 'Low', color: '#10b981', shape: 'square' },
];

const categoryItems: LegendItem[] = [
  { id: 'eng', label: 'Engineering', color: '#6366f1', shape: 'circle' },
  { id: 'prod', label: 'Product', color: '#ec4899', shape: 'circle' },
  { id: 'ops', label: 'Operations', color: '#8b5cf6', shape: 'circle' },
  { id: 'fin', label: 'Finance', color: '#14b8a6', shape: 'circle' },
  { id: 'hr', label: 'Human Resources', color: '#f97316', shape: 'circle' },
];

export const Default: Story = {
  args: {
    items: statusItems,
    title: 'Status',
  },
};

export const Priority: Story = {
  args: {
    items: priorityItems,
    title: 'Priority Levels',
  },
};

export const Categories: Story = {
  args: {
    items: categoryItems,
    title: 'Departments',
  },
};

export const SquareShapes: Story = {
  args: {
    items: statusItems.map((item) => ({ ...item, shape: 'square' as const })),
    title: 'Status (Squares)',
  },
};

export const NoTitle: Story = {
  args: {
    items: statusItems,
    title: '',
  },
};

export const CustomTitle: Story = {
  args: {
    items: statusItems,
    title: 'Employee Availability',
  },
};
