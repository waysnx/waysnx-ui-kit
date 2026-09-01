import type { Meta, StoryObj } from '@storybook/react';
import { QRScanner } from '@waysnx/ui-media';
import { TestBadge } from '../TestBadge';

const meta = {
  title: 'Media/QRScanner',
  component: QRScanner,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: { active: { control: 'boolean' } },
  decorators: [(Story) => (<div><TestBadge componentName="Media" /><Story /></div>)],
} satisfies Meta<typeof QRScanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { onScan: (r) => console.log(r.value), active: true }, render: (args) => <div style={{ width: 280 }}><QRScanner {...args} /></div> };
export const Inactive: Story = { args: { active: false }, render: (args) => <div style={{ width: 280 }}><QRScanner {...args} /></div> };
