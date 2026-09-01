import type { Meta, StoryObj } from '@storybook/react';
import { JSONEditor } from '@waysnx/ui-data';
import { TestBadge } from '../TestBadge';

const SAMPLE = { name: 'John Doe', role: 'Developer', skills: ['React', 'TypeScript'], active: true };

const meta = {
  title: 'Data/JSONEditor',
  component: JSONEditor,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: { readOnly: { control: 'boolean' } },
  decorators: [(Story) => (<div><TestBadge componentName="Data" /><Story /></div>)],
} satisfies Meta<typeof JSONEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { value: SAMPLE, height: 280 }, render: (args) => <div style={{ width: 480 }}><JSONEditor {...args} /></div> };
export const ReadOnly: Story = { args: { value: SAMPLE, readOnly: true, height: 220 }, render: (args) => <div style={{ width: 480 }}><JSONEditor {...args} /></div> };
export const StringInput: Story = { args: { value: '{\n  "key": "value",\n  "count": 42\n}', height: 200 }, render: (args) => <div style={{ width: 400 }}><JSONEditor {...args} /></div> };
