import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal } from '@waysnx/ui-feedback';
import { TestBadge } from '../TestBadge';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div>
        <TestBadge componentName="Modal" />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <Modal open={open} onClose={() => setOpen(false)} title="Modal title">
        <p>Modal body</p>
      </Modal>
    );
  },
};
