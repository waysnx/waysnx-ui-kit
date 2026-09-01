import type { Meta, StoryObj } from '@storybook/react';
import { NotificationList } from '@waysnx/ui-communication';
import type { CommunicationNotification } from '@waysnx/ui-communication';
import { TestBadge } from '../TestBadge';

const notifications: CommunicationNotification[] = [
  { id: '1', type: 'mention', title: 'Sarah mentioned you', body: 'in Design Team', sender: { id: 'u1', name: 'Sarah Johnson' }, read: false, createdAt: new Date(Date.now() - 120000) },
  { id: '2', type: 'reaction', title: 'Mike reacted to your message', body: 'in QA Project', sender: { id: 'u2', name: 'Mike Chen' }, read: false, createdAt: new Date(Date.now() - 3600000) },
  { id: '3', type: 'thread_reply', title: 'New reply in thread', body: 'Sprint Planning', sender: { id: 'u3', name: 'Emily Davis' }, read: true, createdAt: new Date(Date.now() - 7200000) },
  { id: '4', type: 'message', title: 'New message from John', body: 'Hey, are you free for a call?', sender: { id: 'u4', name: 'John Doe' }, read: true, createdAt: new Date(Date.now() - 86400000) },
];

const meta = {
  title: 'Communication/NotificationList',
  component: NotificationList,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [(Story) => (<div><TestBadge componentName="Communication" /><Story /></div>)],
} satisfies Meta<typeof NotificationList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { notifications, onRead: (id) => console.log('Read:', id), onReadAll: () => console.log('Read all'), onClick: (n) => console.log('Clicked:', n.title) }, render: (args) => <div style={{ width: 360 }}><NotificationList {...args} /></div> };
export const AllRead: Story = { args: { notifications: notifications.map((n) => ({ ...n, read: true })) }, render: (args) => <div style={{ width: 360 }}><NotificationList {...args} /></div> };
export const Empty: Story = { args: { notifications: [] }, render: (args) => <div style={{ width: 360 }}><NotificationList {...args} /></div> };
