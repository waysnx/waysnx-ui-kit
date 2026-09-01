import type { Meta, StoryObj } from '@storybook/react';
import { TypingIndicator } from '@waysnx/ui-communication';
import { TestBadge } from '../TestBadge';

const meta = {
  title: 'Communication/TypingIndicator',
  component: TypingIndicator,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: { maxDisplay: { control: 'number' } },
  decorators: [(Story) => (<div><TestBadge componentName="Communication" /><Story /></div>)],
} satisfies Meta<typeof TypingIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleUser: Story = { args: { users: [{ id: '1', name: 'Sarah' }] } };
export const TwoUsers: Story = { args: { users: [{ id: '1', name: 'John' }, { id: '2', name: 'Mike' }] } };
export const ManyUsers: Story = { args: { users: [{ id: '1', name: 'QA Team' }, { id: '2', name: 'Dev' }, { id: '3', name: 'PM' }, { id: '4', name: 'Design' }], maxDisplay: 2 } };
