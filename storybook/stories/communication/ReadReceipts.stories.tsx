import type { Meta, StoryObj } from '@storybook/react';
import { ReadReceipts } from '@waysnx/ui-communication';
import { TestBadge } from '../TestBadge';

const meta = {
  title: 'Communication/ReadReceipts',
  component: ReadReceipts,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: { status: { control: 'select', options: ['sending', 'sent', 'delivered', 'read'] } },
  decorators: [(Story) => (<div><TestBadge componentName="Communication" /><Story /></div>)],
} satisfies Meta<typeof ReadReceipts>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sending: Story = { args: { status: 'sending' } };
export const Sent: Story = { args: { status: 'sent' } };
export const Delivered: Story = { args: { status: 'delivered' } };
export const Read: Story = { args: { status: 'read', readBy: [{ id: '1', name: 'John' }] } };
export const ReadByMany: Story = { args: { status: 'read', readBy: [{ id: '1', name: 'John' }, { id: '2', name: 'Sarah' }, { id: '3', name: 'Mike' }, { id: '4', name: 'Emily' }, { id: '5', name: 'Mark' }] } };
export const AllStatuses: Story = { args: { status: 'sending' }, render: () => <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}><ReadReceipts status="sending" /><ReadReceipts status="sent" /><ReadReceipts status="delivered" /><ReadReceipts status="read" readBy={[{ id: '1', name: 'John' }]} /><ReadReceipts status="read" readBy={[{ id: '1', name: 'John' }, { id: '2', name: 'Sarah' }, { id: '3', name: 'Mike' }, { id: '4', name: 'Emily' }, { id: '5', name: 'Mark' }]} /></div> };
