import type { Meta, StoryObj } from '@storybook/react';
import { MarkdownRenderer } from '@waysnx/ui-docs';
import { TestBadge } from '../TestBadge';

const meta = {
  title: 'Docs/MarkdownRenderer',
  component: MarkdownRenderer,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div>
        <TestBadge componentName="Docs" />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MarkdownRenderer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: `# Hello World

This is a **bold** statement and *italic* emphasis.

## Code Example

\`\`\`tsx
import { Button } from '@waysnx/ui-core';

function App() {
  return <Button variant="primary">Click me</Button>;
}
\`\`\`

### Lists

- First item
- Second item
- Third item

> This is a blockquote with important information.

| Column A | Column B |
|----------|----------|
| Value 1  | Value 2  |
| Value 3  | Value 4  |
`,
  },
};

export const ShortContent: Story = {
  args: { content: 'Simple paragraph with `inline code` and a [link](https://waysnx.com).' },
};

export const CodeBlocks: Story = {
  args: {
    content: `## JavaScript

\`\`\`javascript
const x = 42;
console.log(x);
\`\`\`

## CSS

\`\`\`css
.button {
  background: var(--wx-color-primary);
  border-radius: var(--wx-radius-md);
}
\`\`\`
`,
  },
};

export const EmptyContent: Story = {
  args: { content: '' },
};
