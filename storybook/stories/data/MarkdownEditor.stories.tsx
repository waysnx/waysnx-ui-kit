import type { Meta, StoryObj } from '@storybook/react';
import { MarkdownEditor } from '@waysnx/ui-data';
import { TestBadge } from '../TestBadge';

const SAMPLE = `# Project Overview\n\nThis is a **markdown editor** with *live preview*.\n\n## Features\n- Easy to use\n- Real-time preview\n- Export to HTML`;

const meta = {
  title: 'Data/MarkdownEditor',
  component: MarkdownEditor,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  argTypes: { showPreview: { control: 'boolean' }, showToolbar: { control: 'boolean' } },
  decorators: [(Story) => (<div><TestBadge componentName="Data" /><Story /></div>)],
} satisfies Meta<typeof MarkdownEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { value: SAMPLE, showPreview: true, showToolbar: true, minHeight: 250 } };
export const EditorOnly: Story = { args: { value: SAMPLE, showPreview: false, showToolbar: true, minHeight: 300 } };
export const NoToolbar: Story = { args: { value: SAMPLE, showPreview: true, showToolbar: false, minHeight: 250 } };
