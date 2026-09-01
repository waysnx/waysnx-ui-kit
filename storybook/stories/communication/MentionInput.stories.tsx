import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { MentionInput } from '@waysnx/ui-communication';
import type { CommunicationUser } from '@waysnx/ui-communication';
import { TestBadge } from '../TestBadge';

const allUsers: CommunicationUser[] = [
  { id: '1', name: 'Sarah Johnson' },
  { id: '2', name: 'Mike Chen' },
  { id: '3', name: 'Emily Davis' },
  { id: '4', name: 'John Doe' },
  { id: '5', name: 'Mark Wilson' },
];

const meta = {
  title: 'Communication/MentionInput',
  component: MentionInput,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [(Story) => (<div><TestBadge componentName="Communication" /><Story /></div>)],
} satisfies Meta<typeof MentionInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { value: '', suggestions: allUsers.slice(0, 3), placeholder: 'Type @ to mention...' },
  render: (args) => {
    const [value, setValue] = useState('Hey @');
    const [suggestions, setSuggestions] = useState(allUsers.slice(0, 3));
    return (
      <div style={{ width: 300 }}>
        <MentionInput {...args} value={value} onChange={setValue} suggestions={suggestions} onSearch={(q) => setSuggestions(allUsers.filter(u => u.name.toLowerCase().includes(q.toLowerCase())))} onSelect={(u) => console.log('Mentioned:', u.name)} />
      </div>
    );
  },
};
