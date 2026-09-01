import type { Meta, StoryObj } from '@storybook/react';
import { EmojiPicker } from '@waysnx/ui-communication';
import { TestBadge } from '../TestBadge';

const meta = {
  title: 'Communication/EmojiPicker',
  component: EmojiPicker,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [(Story) => (<div><TestBadge componentName="Communication" /><Story /></div>)],
} satisfies Meta<typeof EmojiPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { onSelect: (emoji) => console.log('Selected:', emoji) } };
export const WithRecent: Story = { args: { onSelect: (emoji) => console.log('Selected:', emoji), recentEmojis: ['❤️', '👍', '🔥', '😂', '✨', '🎉', '🙏', '💯'] } };
