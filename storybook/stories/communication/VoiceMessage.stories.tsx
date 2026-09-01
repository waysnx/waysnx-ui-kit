import type { Meta, StoryObj } from '@storybook/react';
import { VoiceMessage } from '@waysnx/ui-communication';
import { TestBadge } from '../TestBadge';

const meta = {
  title: 'Communication/VoiceMessage',
  component: VoiceMessage,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [(Story) => (<div><TestBadge componentName="Communication" /><Story /></div>)],
} satisfies Meta<typeof VoiceMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { src: '', duration: 28, sender: { id: '1', name: 'Sarah Johnson' } }, render: (args) => <div style={{ width: 300, background: '#f3f4f6', borderRadius: 12 }}><VoiceMessage {...args} /></div> };
export const Short: Story = { args: { src: '', duration: 5 }, render: (args) => <div style={{ width: 250, background: '#f3f4f6', borderRadius: 12 }}><VoiceMessage {...args} /></div> };
export const Long: Story = { args: { src: '', duration: 185 }, render: (args) => <div style={{ width: 350, background: '#f3f4f6', borderRadius: 12 }}><VoiceMessage {...args} /></div> };
