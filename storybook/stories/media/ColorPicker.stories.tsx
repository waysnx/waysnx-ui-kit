import type { Meta, StoryObj } from '@storybook/react';
import { ColorPicker } from '@waysnx/ui-media';
import { TestBadge } from '../TestBadge';

const meta = {
  title: 'Media/ColorPicker',
  component: ColorPicker,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: { value: { control: 'color' }, showSwatches: { control: 'boolean' }, showAlpha: { control: 'boolean' } },
  decorators: [(Story) => (<div><TestBadge componentName="Media" /><Story /></div>)],
} satisfies Meta<typeof ColorPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { value: '#3b82f6', showSwatches: true } };
export const WithAlpha: Story = { args: { value: '#ef4444', showSwatches: true, showAlpha: true } };
export const CustomSwatches: Story = { args: { value: '#8b5cf6', showSwatches: true, swatches: ['#ef4444', '#f97316', '#22c55e', '#3b82f6', '#8b5cf6'] } };
export const NoSwatches: Story = { args: { value: '#22c55e', showSwatches: false } };
