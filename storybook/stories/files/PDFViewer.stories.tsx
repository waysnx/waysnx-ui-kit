import type { Meta, StoryObj } from '@storybook/react';
import { PDFViewer } from '@waysnx/ui-files';
import { TestBadge } from '../TestBadge';

const meta = {
  title: 'Files/PDFViewer',
  component: PDFViewer,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: { showToolbar: { control: 'boolean' }, showThumbnails: { control: 'boolean' } },
  decorators: [(Story) => (<div><TestBadge componentName="Files" /><Story /></div>)],
} satisfies Meta<typeof PDFViewer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { src: '/sample.pdf', showToolbar: true, height: 420 }, render: (args) => <div style={{ width: 560 }}><PDFViewer {...args} /></div> };
export const NoToolbar: Story = { args: { src: '/sample.pdf', showToolbar: false, height: 380 }, render: (args) => <div style={{ width: 560 }}><PDFViewer {...args} /></div> };
