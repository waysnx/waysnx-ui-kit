import type { Meta, StoryObj } from '@storybook/react';
import { AudioPlayer } from '@waysnx/ui-media';
import { TestBadge } from '../TestBadge';

const meta = {
  title: 'Media/AudioPlayer',
  component: AudioPlayer,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [(Story) => (<div><TestBadge componentName="Media" /><Story /></div>)],
} satisfies Meta<typeof AudioPlayer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { src: '', title: 'Audio Track', artist: 'Sarah Johnson' }, render: (args) => <div style={{ width: 420 }}><AudioPlayer {...args} /></div> };
export const WithCover: Story = { args: { src: '', title: 'Morning Meeting', artist: 'Team Recording', cover: 'https://picsum.photos/seed/audio/100/100' }, render: (args) => <div style={{ width: 420 }}><AudioPlayer {...args} /></div> };
export const TitleOnly: Story = { args: { src: '', title: 'Voice Message' }, render: (args) => <div style={{ width: 380 }}><AudioPlayer {...args} /></div> };
