import type { Meta, StoryObj } from '@storybook/react';
import { LocationPicker } from '@waysnx/ui-maps';
import { TestBadge } from '../TestBadge';

const meta = {
  title: 'Maps/LocationPicker',
  component: LocationPicker,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: { zoom: { control: 'number' } },
  decorators: [(Story) => (<div><TestBadge componentName="Maps" /><Story /></div>)],
} satisfies Meta<typeof LocationPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { zoom: 12, height: 300 }, render: (args) => <div style={{ width: 500 }}><LocationPicker {...args} /></div> };
export const CustomZoom: Story = { args: { zoom: 16, height: 400 }, render: (args) => <div style={{ width: 500 }}><LocationPicker {...args} /></div> };
