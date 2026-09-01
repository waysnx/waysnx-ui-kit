import type { Meta, StoryObj } from '@storybook/react';
import { ReactionBar } from '@waysnx/ui-communication';
import { TestBadge } from '../TestBadge';

const meta = {
  title: 'Communication/ReactionBar',
  component: ReactionBar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [(Story) => (<div><TestBadge componentName="Communication" /><Story /></div>)],
} satisfies Meta<typeof ReactionBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { reactions: [{ emoji: '👍', users: [{ id: '1', name: 'Sarah' }, { id: '2', name: 'Mike' }], count: 2 }, { emoji: '❤️', users: [{ id: '1', name: 'Sarah' }], count: 1 }, { emoji: '😂', users: [{ id: '3', name: 'Emily' }, { id: '4', name: 'John' }, { id: '5', name: 'Mark' }], count: 3 }], currentUserId: 'me', onReact: (emoji) => console.log('Reacted:', emoji) } };
export const WithActiveReaction: Story = { args: { reactions: [{ emoji: '🔥', users: [{ id: 'me', name: 'You' }, { id: '2', name: 'Mike' }], count: 2 }, { emoji: '👍', users: [{ id: '1', name: 'Sarah' }], count: 1 }, { emoji: '✨', users: [{ id: 'me', name: 'You' }], count: 1 }], currentUserId: 'me', onReact: (emoji) => console.log('Reacted:', emoji) } };
export const SingleReaction: Story = { args: { reactions: [{ emoji: '👍', users: [{ id: '1', name: 'Sarah' }], count: 1 }], currentUserId: 'me' } };
