import type { Meta, StoryObj } from '@storybook/react';
import { CodeEditor } from '@waysnx/ui-data';
import { TestBadge } from '../TestBadge';

const meta = {
  title: 'Data/CodeEditor',
  component: CodeEditor,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: { language: { control: 'text' }, showLineNumbers: { control: 'boolean' }, readOnly: { control: 'boolean' } },
  decorators: [(Story) => (<div><TestBadge componentName="Data" /><Story /></div>)],
} satisfies Meta<typeof CodeEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { value: 'const x = 42;\nconsole.log(x);', language: 'typescript', showLineNumbers: true } };
export const ReadOnly: Story = { args: { value: 'const x = 42;\nconsole.log(x);', language: 'typescript', readOnly: true } };
export const Python: Story = { args: { language: 'python', value: 'def hello():\n    print("Hello")' } };
