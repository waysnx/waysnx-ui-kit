import type { Meta, StoryObj } from '@storybook/react';
import { SignaturePad } from '@waysnx/ui-media';
import { TestBadge } from '../TestBadge';

const meta = {
  title: 'Media/SignaturePad',
  component: SignaturePad,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [(Story) => (<div><TestBadge componentName="Media" /><Story /></div>)],
} satisfies Meta<typeof SignaturePad>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { height: 200, onSave: (d) => console.log('Saved:', d.dataUrl.slice(0, 30)), onClear: () => console.log('Cleared') },
  render: (args) => <div style={{ width: 400 }}><SignaturePad {...args} /></div>,
};
export const BlueInk: Story = {
  args: { height: 180, penColor: '#1e40af', penWidth: 3, onSave: (d) => console.log(d) },
  render: (args) => <div style={{ width: 380 }}><SignaturePad {...args} /></div>,
};
