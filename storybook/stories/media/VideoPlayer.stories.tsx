import type { Meta, StoryObj } from '@storybook/react';
import { VideoPlayer } from '@waysnx/ui-media';
import { TestBadge } from '../TestBadge';

const meta = {
  title: 'Media/VideoPlayer',
  component: VideoPlayer,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: { showControls: { control: 'boolean' }, muted: { control: 'boolean' } },
  decorators: [(Story) => (<div><TestBadge componentName="Media" /><Story /></div>)],
} satisfies Meta<typeof VideoPlayer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { src: '', title: 'Product Demo.mp4', showControls: true, height: 280 }, render: (args) => <div style={{ width: 500 }}><VideoPlayer {...args} /></div> };
export const NoTitle: Story = { args: { src: '', showControls: true, height: 240 }, render: (args) => <div style={{ width: 480 }}><VideoPlayer {...args} /></div> };
