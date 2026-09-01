import type { Meta, StoryObj } from '@storybook/react';
import { ConversationList } from '@waysnx/ui-communication';
import type { Conversation } from '@waysnx/ui-communication';
import { TestBadge } from '../TestBadge';

const meta = {
  title: 'Communication/ConversationList',
  component: ConversationList,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    showSearch: { control: 'boolean', description: 'Show search input' },
    showFilters: { control: 'boolean', description: 'Show filter tabs' },
    loading: { control: 'boolean', description: 'Show loading state' },
  },
  decorators: [
    (Story) => (
      <div>
        <TestBadge componentName="Communication" />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ConversationList>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleConversations: Conversation[] = [
  { id: '1', type: 'group', title: 'Design Team', participants: [{ id: 'u1', name: 'Sarah Johnson', status: 'online' }], unreadCount: 3, pinned: true, lastMessage: { id: 'm1', conversationId: '1', type: 'text', author: { id: 'u1', name: 'Sarah' }, content: 'Please review the new Figma...', status: 'sent', createdAt: new Date(Date.now() - 60000) }, createdAt: new Date(Date.now() - 86400000), updatedAt: new Date(Date.now() - 60000) },
  { id: '2', type: 'group', title: 'QA Project', participants: [{ id: 'u2', name: 'Mike Chen', status: 'online' }], unreadCount: 2, lastMessage: { id: 'm2', conversationId: '2', type: 'text', author: { id: 'u2', name: 'Alice' }, content: 'Test cases are ready', status: 'sent', createdAt: new Date(Date.now() - 7200000) }, createdAt: new Date(Date.now() - 172800000), updatedAt: new Date(Date.now() - 7200000) },
  { id: '3', type: 'channel', title: 'HR Announcements', participants: [], unreadCount: 0, lastMessage: { id: 'm3', conversationId: '3', type: 'text', author: { id: 'u3', name: 'HR' }, content: 'Holiday on Dec 25th', status: 'sent', createdAt: new Date(Date.now() - 86400000) }, createdAt: new Date(Date.now() - 604800000), updatedAt: new Date(Date.now() - 86400000) },
  { id: '4', type: 'direct', title: 'John Doe', participants: [{ id: 'u4', name: 'John Doe', status: 'busy' }], unreadCount: 0, lastMessage: { id: 'm4', conversationId: '4', type: 'text', author: { id: 'u4', name: 'John Doe' }, content: 'Sounds good 👍', status: 'read', createdAt: new Date(Date.now() - 172800000) }, createdAt: new Date(Date.now() - 604800000), updatedAt: new Date(Date.now() - 172800000) },
];

export const Default: Story = {
  args: { conversations: sampleConversations, showSearch: true, showFilters: true },
  render: (args) => <div style={{ width: 340, height: 500, border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden' }}><ConversationList {...args} onSelect={(c) => console.log('Selected:', c.title)} /></div>,
};

export const WithActiveItem: Story = {
  args: { conversations: sampleConversations, activeId: '1' },
  render: (args) => <div style={{ width: 340, height: 500, border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden' }}><ConversationList {...args} /></div>,
};

export const Loading: Story = {
  args: { conversations: [], loading: true },
  render: (args) => <div style={{ width: 340, height: 300, border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden' }}><ConversationList {...args} /></div>,
};

export const Empty: Story = {
  args: { conversations: [], emptyMessage: 'No conversations yet. Start a new one!' },
  render: (args) => <div style={{ width: 340, height: 300, border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden' }}><ConversationList {...args} /></div>,
};
