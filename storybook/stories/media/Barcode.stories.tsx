import type { Meta, StoryObj } from '@storybook/react';
import { Barcode } from '@waysnx/ui-media';
import { TestBadge } from '../TestBadge';

const meta = {
  title: 'Media/Barcode',
  component: Barcode,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [(Story) => (<div><TestBadge componentName="Media" /><Story /></div>)],
} satisfies Meta<typeof Barcode>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { value: '1234567890128', format: 'CODE128', showDownload: true } };
export const NoLabel: Story = { args: { value: '9876543210', format: 'CODE128', displayValue: false } };
export const Wide: Story = { args: { value: '1234567890128', width: 360, height: 100, showDownload: true } };
