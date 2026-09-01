import type { Meta, StoryObj } from '@storybook/react';
import { CodeViewer } from '@waysnx/ui-data';
import { TestBadge } from '../TestBadge';

const SAMPLE_CODE = `interface User {\n  id: number;\n  name: string;\n  email: string;\n  active: boolean;\n}\n\nconst user: User = {\n  id: 1,\n  name: 'John Doe',\n  email: 'john@example.com',\n  active: true,\n};`;

const meta = {
  title: 'Data/CodeViewer',
  component: CodeViewer,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: { showLineNumbers: { control: 'boolean' }, language: { control: 'text' } },
  decorators: [(Story) => (<div><TestBadge componentName="Data" /><Story /></div>)],
} satisfies Meta<typeof CodeViewer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TypeScript: Story = { args: { code: SAMPLE_CODE, language: 'typescript', showLineNumbers: true }, render: (args) => <div style={{ width: 500 }}><CodeViewer {...args} /></div> };
export const NoLineNumbers: Story = { args: { code: SAMPLE_CODE, language: 'typescript', showLineNumbers: false }, render: (args) => <div style={{ width: 500 }}><CodeViewer {...args} /></div> };
export const WithHighlight: Story = { args: { code: SAMPLE_CODE, language: 'typescript', showLineNumbers: true, highlightLines: [1, 2, 3, 4, 5, 6] }, render: (args) => <div style={{ width: 500 }}><CodeViewer {...args} /></div> };
