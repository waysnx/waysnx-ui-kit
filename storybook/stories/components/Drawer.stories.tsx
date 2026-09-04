import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Drawer } from '@waysnx/ui-feedback';
import { TestBadge } from '../TestBadge';

const meta = {
  title: 'Components/Drawer',
  component: Drawer,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div>
        <TestBadge componentName="Drawer" />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <Drawer open={open} onClose={() => setOpen(false)} title="Drawer">
        <p>Drawer body</p>
      </Drawer>
    );
  },
};
