import type { Meta, StoryObj } from '@storybook/react';
import { MapMarker } from '@waysnx/ui-maps';
import { TestBadge } from '../TestBadge';

const meta = {
  title: 'Maps/MapMarker',
  component: MapMarker,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {},
  decorators: [(Story) => (<div><TestBadge componentName="Maps" /><Story /></div>)],
} satisfies Meta<typeof MapMarker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { marker: { id: '1', position: { lat: 40.7128, lng: -74.006 }, title: 'New York' } } };
export const Colored: Story = { args: { marker: { id: '2', position: { lat: 40.7128, lng: -74.006 }, color: '#ef4444', title: 'Alert' } } };
