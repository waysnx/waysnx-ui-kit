import type { Meta, StoryObj } from '@storybook/react';
import { UserPresenceList } from '@waysnx/ui-communication';
import { TestBadge } from '../TestBadge';

const meta = {
  title: 'Communication/UserPresenceList',
  component: UserPresenceList,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [(Story) => (<div><TestBadge componentName="Communication" /><Story /></div>)],
} satisfies Meta<typeof UserPresenceList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    users: [
      { id: '1', name: 'Sarah Johnson', status: 'online' },
      { id: '2', name: 'Mike Chen', status: 'online' },
      { id: '3', name: 'Emily Davis', status: 'away' },
      { id: '4', name: 'John Doe', status: 'busy' },
      { id: '5', name: 'Mark Wilson', status: 'offline' },
    ],
    onUserClick: (user) => console.log('Clicked:', user.name),
  },
  render: (args) => <div style={{ width: 260 }}><UserPresenceList {...args} /></div>,
};
