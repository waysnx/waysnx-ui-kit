import type { Meta, StoryObj } from '@storybook/react';
import { IFrame } from '@waysnx/ui-core';
import { TestBadge } from './TestBadge';

const meta = {
  title: 'Components/IFrame',
  component: IFrame,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    src: { control: 'text' },
    title: { control: 'text' },
    sandbox: { control: 'text' },
  },
  decorators: [
    (Story) => (
      <div>
        <TestBadge componentName="IFrame" />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof IFrame>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default: secure-by-default sandbox should be applied (Batch 3 contract).
export const Default: Story = {
  args: {
    src: 'https://example.com',
    title: 'Example embed',
    width: 480,
    height: 300,
  },
};

// Explicit override retains caller-provided sandbox tokens.
export const CustomSandbox: Story = {
  args: {
    src: 'https://example.com',
    title: 'Example embed (custom sandbox)',
    sandbox: 'allow-scripts',
    width: 480,
    height: 300,
  },
};
