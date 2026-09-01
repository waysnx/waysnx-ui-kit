import type { Meta, StoryObj } from '@storybook/react';
import { QRCode } from '@waysnx/ui-media';
import { TestBadge } from '../TestBadge';

const meta = {
  title: 'Media/QRCode',
  component: QRCode,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: { value: { control: 'text' }, size: { control: 'number' }, showDownload: { control: 'boolean' } },
  decorators: [(Story) => (<div><TestBadge componentName="Media" /><Story /></div>)],
} satisfies Meta<typeof QRCode>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { value: 'https://waysnx.com', size: 200, showDownload: true } };
export const Small: Story = { args: { value: 'Hello World', size: 120, showDownload: false } };
export const CustomColors: Story = { args: { value: 'WaysNX UI Kit', size: 200, fgColor: '#1e40af', bgColor: '#eff6ff', showDownload: true } };
export const NoDownload: Story = { args: { value: 'https://example.com', size: 160, showDownload: false } };
