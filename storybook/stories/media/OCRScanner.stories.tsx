import type { Meta, StoryObj } from '@storybook/react';
import { OCRScanner } from '@waysnx/ui-media';
import { TestBadge } from '../TestBadge';

const meta = {
  title: 'Media/OCRScanner',
  component: OCRScanner,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: { accept: { control: 'text' } },
  decorators: [(Story) => (<div><TestBadge componentName="Media" /><Story /></div>)],
} satisfies Meta<typeof OCRScanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { onResult: console.log } };
export const ImagesOnly: Story = { args: { accept: 'image/*', onResult: console.log } };
