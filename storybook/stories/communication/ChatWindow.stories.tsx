import type { Meta, StoryObj } from '@storybook/react';
import { ChatWindow } from '@waysnx/ui-communication';
import type { Conversation, Message, CommunicationUser } from '@waysnx/ui-communication';
import { TestBadge } from '../TestBadge';

const currentUser: CommunicationUser = { id: 'me', name: 'You', status: 'online' };
const conversation: Conversation = { id: 'c1', type: 'group', title: 'Design Team', participants: [{ id: 'me', name: 'You', status: 'online' }, { id: 'u1', name: 'Sarah Johnson', status: 'online' }, { id: 'u2', name: 'Mike Chen', status: 'away' }, { id: 'u3', name: 'Emily Davis', status: 'offline' }], createdAt: new Date() };
const messages: Message[] = [
  { id: '1', conversationId: 'c1', type: 'text', author: { id: 'u1', name: 'Sarah Johnson' }, content: 'Hi team! 👋 Please review the new dashboard design.', status: 'read', createdAt: new Date(Date.now() - 300000), reactions: [{ emoji: '👍', users: [{ id: 'u2', name: 'Mike' }], count: 1 }], threadCount: 3 },
  { id: '2', conversationId: 'c1', type: 'text', author: currentUser, content: 'Looks great! I have a few suggestions on the charts.', status: 'read', createdAt: new Date(Date.now() - 240000) },
  { id: '3', conversationId: 'c1', type: 'text', author: { id: 'u2', name: 'Mike Chen' }, content: "I'll check the mobile responsiveness.", status: 'delivered', createdAt: new Date(Date.now() - 180000) },
  { id: '4', conversationId: 'c1', type: 'system', author: { id: 'sys', name: 'System' }, content: 'Emily Davis joined the conversation', status: 'sent', createdAt: new Date(Date.now() - 120000) },
  { id: '5', conversationId: 'c1', type: 'text', author: { id: 'u3', name: 'Emily Davis' }, content: 'What about the color contrast?', status: 'sent', createdAt: new Date(Date.now() - 60000) },
];

const meta = {
  title: 'Communication/ChatWindow',
  component: ChatWindow,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  decorators: [(Story) => (<div><TestBadge componentName="Communication" /><Story /></div>)],
} satisfies Meta<typeof ChatWindow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { conversation, messages, currentUser, typingUsers: [{ id: 'u1', name: 'Sarah' }] }, render: (args) => <div style={{ height: 550 }}><ChatWindow {...args} onSendMessage={(msg) => console.log('Send:', msg)} /></div> };
export const EmptyChat: Story = { args: { conversation, messages: [], currentUser }, render: (args) => <div style={{ height: 400 }}><ChatWindow {...args} /></div> };
export const Loading: Story = { args: { conversation, messages: messages.slice(0, 2), currentUser, loading: true, hasMore: true }, render: (args) => <div style={{ height: 400 }}><ChatWindow {...args} /></div> };
