import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Tree, type TreeNode } from '@waysnx/ui-core';
import { TestBadge } from './TestBadge';

const meta = {
  title: 'Components/Tree',
  component: Tree,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Tree label',
    },
  },
  decorators: [
    (Story) => (
      <div>
        <TestBadge componentName="Tree" />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tree>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleTreeData: TreeNode[] = [
  {
    value: '1',
    name: 'Root',
    options: [
      {
        value: '1-1',
        name: 'Child 1',
        options: [
          { value: '1-1-1', name: 'Grandchild 1' },
          { value: '1-1-2', name: 'Grandchild 2' },
        ],
      },
      {
        value: '1-2',
        name: 'Child 2',
        options: [
          { value: '1-2-1', name: 'Grandchild 3' },
        ],
      },
    ],
  },
];

const fileSystemData: TreeNode[] = [
  {
    value: 'root',
    name: 'Project',
    options: [
      {
        value: 'src',
        name: 'src',
        options: [
          { value: 'components', name: 'components' },
          { value: 'pages', name: 'pages' },
          { value: 'utils', name: 'utils' },
        ],
      },
      {
        value: 'public',
        name: 'public',
        options: [
          { value: 'images', name: 'images' },
          { value: 'fonts', name: 'fonts' },
        ],
      },
      { value: 'package.json', name: 'package.json' },
      { value: 'tsconfig.json', name: 'tsconfig.json' },
    ],
  },
];

export const Default: Story = {
  args: {
    data: sampleTreeData,
  },
};

export const FileSystem: Story = {
  args: {
    data: fileSystemData,
  },
};

export const WithLabel: Story = {
  args: {
    data: sampleTreeData,
    label: 'File Tree',
  },
};

export const Interactive: Story = {
  args: { data: sampleTreeData },
  render: () => {
    const [data, setData] = useState<TreeNode[]>(sampleTreeData);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '300px' }}>
        <Tree
          data={data}
          onChange={(updated) => setData(updated)}
        />
      </div>
    );
  },
};

export const LargeTree: Story = {
  args: { data: [] },
  render: () => {
    const largeData: TreeNode[] = [
      {
        value: 'root',
        name: 'Organization',
        options: [
          {
            value: 'dept1',
            name: 'Engineering',
            options: [
              {
                value: 'team1',
                name: 'Frontend',
                options: [
                  { value: 'member1', name: 'Alice' },
                  { value: 'member2', name: 'Bob' },
                ],
              },
              {
                value: 'team2',
                name: 'Backend',
                options: [
                  { value: 'member3', name: 'Charlie' },
                  { value: 'member4', name: 'Diana' },
                ],
              },
            ],
          },
          {
            value: 'dept2',
            name: 'Design',
            options: [
              { value: 'designer1', name: 'Eve' },
              { value: 'designer2', name: 'Frank' },
            ],
          },
        ],
      },
    ];
    return <Tree data={largeData} />;
  },
};
