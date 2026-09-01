import type { Meta, StoryObj } from '@storybook/react';
import { MessageBubble } from '@waysnx/ui-communication';
import type { CommunicationUser, Message } from '@waysnx/ui-communication';
import { TestBadge } from '../TestBadge';

const currentUser: CommunicationUser = { id: 'me', name: 'You', status: 'online' };

const meta = {
  title: 'Communication/MessageBubble',
  component: MessageBubble,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [(Story) => (<div><TestBadge componentName="Communication" /><Story /></div>)],
} satisfies Meta<typeof MessageBubble>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseMessage: Message = {
  id: '1', conversationId: 'c1', type: 'text',
  author: { id: 'u1', name: 'Sarah Johnson' },
  content: 'Hi team! Please review the new dashboard design.',
  status: 'read', createdAt: new Date(),
};

export const Incoming: Story = { args: { message: baseMessage, currentUser }, render: (args) => <div style={{ width: 400 }}><MessageBubble {...args} /></div> };
export const Outgoing: Story = { args: { message: { ...baseMessage, author: currentUser, content: 'Looks great! I have a few suggestions.', status: 'delivered' }, currentUser }, render: (args) => <div style={{ width: 400 }}><MessageBubble {...args} /></div> };
export const SystemMessage: Story = { args: { message: { ...baseMessage, type: 'system', author: { id: 'sys', name: 'System' }, content: 'John Doe joined the conversation' }, currentUser }, render: (args) => <div style={{ width: 400 }}><MessageBubble {...args} /></div> };
export const AIMessage: Story = { args: { message: { ...baseMessage, type: 'ai', author: { id: 'ai', name: 'AI Assistant' }, content: 'Here is the summary of the report...' }, currentUser }, render: (args) => <div style={{ width: 400 }}><MessageBubble {...args} /></div> };
export const WithReactions: Story = { args: { message: { ...baseMessage, reactions: [{ emoji: '👍', users: [{ id: 'u2', name: 'Mike' }], count: 1 }, { emoji: '❤️', users: [{ id: 'u3', name: 'Emily' }, { id: 'me', name: 'You' }], count: 2 }] }, currentUser }, render: (args) => <div style={{ width: 400 }}><MessageBubble {...args} /></div> };
export const WithThread: Story = { args: { message: { ...baseMessage, threadCount: 5 }, currentUser }, render: (args) => <div style={{ width: 400 }}><MessageBubble {...args} /></div> };
export const Deleted: Story = { args: { message: { ...baseMessage, deletedAt: new Date() }, currentUser }, render: (args) => <div style={{ width: 400 }}><MessageBubble {...args} /></div> };
