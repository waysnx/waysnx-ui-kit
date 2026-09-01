import type { Meta, StoryObj } from '@storybook/react';
import { MapView } from '@waysnx/ui-maps';
import { TestBadge } from '../TestBadge';

const meta = {
  title: 'Maps/MapView',
  component: MapView,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: { showControls: { control: 'boolean' }, height: { control: 'number' } },
  decorators: [(Story) => (<div><TestBadge componentName="Maps" /><Story /></div>)],
} satisfies Meta<typeof MapView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { height: 300, showControls: true, markers: [{ id: '1', position: { lat: 40.7128, lng: -74.006 }, title: 'NYC' }] }, render: (args) => <div style={{ width: 600 }}><MapView {...args} /></div> };
export const MultipleMarkers: Story = { args: { height: 300, showControls: true, markers: [{ id: '1', position: { lat: 40.7128, lng: -74.006 }, title: 'NYC' }, { id: '2', position: { lat: 34.0522, lng: -118.2437 }, title: 'LA' }, { id: '3', position: { lat: 41.8781, lng: -87.6298 }, title: 'Chicago' }] }, render: (args) => <div style={{ width: 600 }}><MapView {...args} /></div> };
export const NoControls: Story = { args: { height: 300, showControls: false, markers: [{ id: '1', position: { lat: 40.7128, lng: -74.006 }, title: 'NYC' }] }, render: (args) => <div style={{ width: 600 }}><MapView {...args} /></div> };
