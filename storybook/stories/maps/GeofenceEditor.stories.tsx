import type { Meta, StoryObj } from '@storybook/react';
import { GeofenceEditor } from '@waysnx/ui-maps';
import { TestBadge } from '../TestBadge';

const meta = {
  title: 'Maps/GeofenceEditor',
  component: GeofenceEditor,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: { height: { control: 'number' } },
  decorators: [(Story) => (<div><TestBadge componentName="Maps" /><Story /></div>)],
} satisfies Meta<typeof GeofenceEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { height: 350, center: { lat: 40.7128, lng: -74.006 } }, render: (args) => <div style={{ width: 600 }}><GeofenceEditor {...args} /></div> };
export const WithZones: Story = { args: { height: 350, center: { lat: 40.7128, lng: -74.006 }, zones: [{ id: '1', name: 'Office', center: { lat: 40.7128, lng: -74.006 }, radius: 500, color: '#3b82f6' }] }, render: (args) => <div style={{ width: 600 }}><GeofenceEditor {...args} /></div> };
