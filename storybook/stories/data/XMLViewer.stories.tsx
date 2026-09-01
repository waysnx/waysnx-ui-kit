import type { Meta, StoryObj } from '@storybook/react';
import { XMLViewer } from '@waysnx/ui-data';
import { TestBadge } from '../TestBadge';

const meta = {
  title: 'Data/XMLViewer',
  component: XMLViewer,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: { showLineNumbers: { control: 'boolean' } },
  decorators: [(Story) => (<div><TestBadge componentName="Data" /><Story /></div>)],
} satisfies Meta<typeof XMLViewer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { content: '<?xml version="1.0"?>\n<root>\n  <user id="1">\n    <name>John</name>\n  </user>\n</root>', showLineNumbers: true } };
export const NoLineNumbers: Story = { args: { content: '<?xml version="1.0"?>\n<root>\n  <user id="1">\n    <name>John</name>\n  </user>\n</root>', showLineNumbers: false } };
