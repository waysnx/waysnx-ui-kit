import type { Meta, StoryObj } from '@storybook/react';
import { Cropper } from '@waysnx/ui-media';
import { TestBadge } from '../TestBadge';

const meta = {
  title: 'Media/Cropper',
  component: Cropper,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: { aspectRatio: { control: 'number' } },
  decorators: [(Story) => (<div><TestBadge componentName="Media" /><Story /></div>)],
} satisfies Meta<typeof Cropper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { src: 'https://picsum.photos/seed/crop/600/400', onCrop: console.log } };
export const SquareCrop: Story = { args: { src: 'https://picsum.photos/seed/crop/600/400', aspectRatio: 1, onCrop: console.log } };
export const WideCrop: Story = { args: { src: 'https://picsum.photos/seed/crop/600/400', aspectRatio: 16 / 9, onCrop: console.log } };
