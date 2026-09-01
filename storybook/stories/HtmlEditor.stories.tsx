import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { HtmlEditor } from '@waysnx/ui-core';
import { TestBadge } from './TestBadge';

const meta = {
  title: 'Components/HtmlEditor',
  component: HtmlEditor,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the editor',
    },
  },
  decorators: [
    (Story) => (
      <div>
        <TestBadge componentName="HtmlEditor" />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HtmlEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter HTML content...',
  },
};

export const WithValue: Story = {
  args: {
    placeholder: 'Enter HTML content...',
    value: '<p>Hello <strong>World</strong>!</p>',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Enter HTML content...',
    disabled: true,
    value: '<p>This editor is disabled</p>',
  },
};

export const Interactive: Story = {
  render: () => {
    const [html, setHtml] = useState('<p>Start typing...</p>');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '400px' }}>
        <HtmlEditor
          placeholder="Enter HTML content..."
          value={html}
          onChange={(val) => setHtml(val)}
        />
        <div style={{ fontSize: '12px', color: '#666', padding: '8px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
          <strong>Preview:</strong>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    );
  },
};
