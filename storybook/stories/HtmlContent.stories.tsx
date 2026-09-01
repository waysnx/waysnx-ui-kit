import type { Meta, StoryObj } from '@storybook/react';
import { HtmlContent } from '@waysnx/ui-core';
import { TestBadge } from './TestBadge';

const meta = {
  title: 'Components/HtmlContent',
  component: HtmlContent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: 'text',
      description: 'HTML content to render',
    },
  },
  decorators: [
    (Story) => (
      <div>
        <TestBadge componentName="HtmlContent" />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HtmlContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: '<p>Hello <strong>World</strong>!</p>',
  },
};

export const WithFormatting: Story = {
  args: {
    content: '<h3>Title</h3><p>This is a <em>formatted</em> paragraph with <strong>bold</strong> text.</p>',
  },
};

export const WithList: Story = {
  args: {
    content: '<h3>Features</h3><ul><li>Feature 1</li><li>Feature 2</li><li>Feature 3</li></ul>',
  },
};

export const WithLink: Story = {
  args: {
    content: '<p>Visit <a href="https://example.com" target="_blank">our website</a> for more information.</p>',
  },
};

export const Complex: Story = {
  args: {
    content: `
      <div>
        <h2>Welcome</h2>
        <p>This is a <strong>complex</strong> HTML content example.</p>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
        <p>Learn more at <a href="#">our documentation</a>.</p>
      </div>
    `,
  },
};
