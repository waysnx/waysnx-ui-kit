import type { Meta, StoryObj } from '@storybook/react';
import { ChatInput } from '@waysnx/ui-communication';
import { TestBadge } from '../TestBadge';

const meta = {
  title: 'Communication/ChatInput',
  component: ChatInput,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: { placeholder: { control: 'text' }, disabled: { control: 'boolean' }, showEmoji: { control: 'boolean' }, showAttachment: { control: 'boolean' }, showMention: { control: 'boolean' }, showVoice: { control: 'boolean' } },
  decorators: [(Story) => (<div><TestBadge componentName="Communication" /><Story /></div>)],
} satisfies Meta<typeof ChatInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { placeholder: 'Type a message...', showEmoji: true, showAttachment: true, showMention: true, showVoice: false }, render: (args) => <div style={{ width: 450 }}><ChatInput {...args} onSend={(msg) => console.log('Sent:', msg)} /></div> };
export const WithAllFeatures: Story = { args: { placeholder: 'Message Design Team...', showEmoji: true, showAttachment: true, showMention: true, showVoice: true }, render: (args) => <div style={{ width: 450 }}><ChatInput {...args} onSend={(msg) => console.log('Sent:', msg)} /></div> };
export const WithReply: Story = { args: { showEmoji: true, showAttachment: true, replyTo: { id: 'r1', conversationId: 'c1', type: 'text', author: { id: 'u1', name: 'Sarah Johnson' }, content: 'Hi team! Please review the new dashboard design.', status: 'read', createdAt: new Date() } }, render: (args) => <div style={{ width: 450 }}><ChatInput {...args} onSend={(msg) => console.log('Sent:', msg)} onCancelReply={() => console.log('Cancelled reply')} /></div> };
export const Disabled: Story = { args: { placeholder: 'You cannot send messages here', disabled: true }, render: (args) => <div style={{ width: 450 }}><ChatInput {...args} /></div> };
