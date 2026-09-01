import type { Meta, StoryObj } from '@storybook/react';
import { DocumentPreview } from '@waysnx/ui-files';
import { TestBadge } from '../TestBadge';

const meta = {
  title: 'Files/DocumentPreview',
  component: DocumentPreview,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: { type: { control: 'select', options: ['pdf', 'image', 'video', 'audio', 'markdown', 'code'] } },
  decorators: [(Story) => (<div><TestBadge componentName="Files" /><Story /></div>)],
} satisfies Meta<typeof DocumentPreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { src: '/sample.pdf', filename: 'report.pdf' } };
export const ImagePreview: Story = { args: { src: 'https://picsum.photos/600/400', type: 'image', filename: 'photo.jpg' } };
