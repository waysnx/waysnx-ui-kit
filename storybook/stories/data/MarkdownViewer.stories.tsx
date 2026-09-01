import type { Meta, StoryObj } from '@storybook/react';
import { MarkdownViewer } from '@waysnx/ui-data';
import { TestBadge } from '../TestBadge';

const meta = {
  title: 'Data/MarkdownViewer',
  component: MarkdownViewer,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {},
  decorators: [(Story) => (<div><TestBadge componentName="Data" /><Story /></div>)],
} satisfies Meta<typeof MarkdownViewer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { content: '# Hello World\n\nThis is **bold** and *italic*.\n\n- Item 1\n- Item 2' } };
export const RichContent: Story = { args: { content: '# Documentation\n\n## Getting Started\n\n```js\nconst app = createApp();\napp.listen(3000);\n```\n\n- First step\n- Second step\n\n[Learn more](https://example.com)' } };
