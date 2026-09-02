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

// Batch 9 regression: malicious markdown must be sanitized before render.
// The payload includes a <script> tag and an <img onerror=...> handler plus a
// data-testid marker so the test can assert the surrounding content survives
// while the scriptable vectors are stripped.
export const MaliciousHtml: Story = {
  args: {
    content:
      '# Safe Heading\n\n' +
      '<script>window.__xss_markdown_viewer = true;</script>\n\n' +
      '<img src="x" onerror="window.__xss_markdown_viewer = true" data-testid="mv-xss-img" />\n\n' +
      'Trailing **safe** text.',
  },
};
