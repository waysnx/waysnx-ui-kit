import type { Meta, StoryObj } from '@storybook/react';
import { ImageViewer } from '@waysnx/ui-media';
import { TestBadge } from '../TestBadge';

const IMAGES = [
  { src: 'https://picsum.photos/seed/a1/600/400', alt: 'Mountain', thumbnail: 'https://picsum.photos/seed/a1/80/60' },
  { src: 'https://picsum.photos/seed/a2/600/400', alt: 'Ocean', thumbnail: 'https://picsum.photos/seed/a2/80/60' },
  { src: 'https://picsum.photos/seed/a3/600/400', alt: 'Forest', thumbnail: 'https://picsum.photos/seed/a3/80/60' },
];

const meta = {
  title: 'Media/ImageViewer',
  component: ImageViewer,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: { showThumbnails: { control: 'boolean' }, showNavigation: { control: 'boolean' } },
  decorators: [(Story) => (<div><TestBadge componentName="Media" /><Story /></div>)],
} satisfies Meta<typeof ImageViewer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { images: IMAGES, showThumbnails: true, showNavigation: true, height: 380 }, render: (args) => <div style={{ width: 560 }}><ImageViewer {...args} /></div> };
export const SingleImage: Story = { args: { images: [IMAGES[0]], showThumbnails: false, showNavigation: false, height: 300 }, render: (args) => <div style={{ width: 480 }}><ImageViewer {...args} /></div> };
export const NoThumbnails: Story = { args: { images: IMAGES, showThumbnails: false, showNavigation: true, height: 340 }, render: (args) => <div style={{ width: 520 }}><ImageViewer {...args} /></div> };
