import type { Meta, StoryObj } from '@storybook/react';
import { RoutePlanner } from '@waysnx/ui-maps';
import { TestBadge } from '../TestBadge';

const meta = {
  title: 'Maps/RoutePlanner',
  component: RoutePlanner,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: { showGetDirections: { control: 'boolean' } },
  decorators: [(Story) => (<div><TestBadge componentName="Maps" /><Story /></div>)],
} satisfies Meta<typeof RoutePlanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { onCalculate: console.log }, render: (args) => <div style={{ width: 400 }}><RoutePlanner {...args} /></div> };
export const WithDirections: Story = { args: { showGetDirections: true }, render: (args) => <div style={{ width: 400 }}><RoutePlanner {...args} /></div> };
