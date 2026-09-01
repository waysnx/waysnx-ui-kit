import type { Meta, StoryObj } from '@storybook/react';
import { AddressSelector } from '@waysnx/ui-maps';
import { TestBadge } from '../TestBadge';

const SUGGESTIONS = [
  { id: '1', description: '742 Evergreen Terrace, Springfield, IL 62704, USA', mainText: '742 Evergreen Terrace', secondaryText: 'Springfield, IL 62704, USA' },
  { id: '2', description: '1600 Amphitheatre Pkwy, Mountain View, CA, USA', mainText: '1600 Amphitheatre Pkwy', secondaryText: 'Mountain View, CA, USA' },
  { id: '3', description: '1 Infinite Loop, Cupertino, CA 95014, USA', mainText: '1 Infinite Loop', secondaryText: 'Cupertino, CA 95014, USA' },
];

const meta = {
  title: 'Maps/AddressSelector',
  component: AddressSelector,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: { showCurrentLocation: { control: 'boolean' }, loading: { control: 'boolean' } },
  decorators: [(Story) => (<div><TestBadge componentName="Maps" /><Story /></div>)],
} satisfies Meta<typeof AddressSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { showCurrentLocation: true, onSearch: () => {} }, render: (args) => <div style={{ width: 360 }}><AddressSelector {...args} /></div> };
export const WithSuggestions: Story = { args: { suggestions: SUGGESTIONS, showCurrentLocation: true, onSearch: () => {} }, render: (args) => <div style={{ width: 360 }}><AddressSelector {...args} /></div> };
export const WithSelected: Story = { args: { value: { formatted: '742 Evergreen Terrace', city: 'Springfield', state: 'IL', postalCode: '62704' }, showCurrentLocation: true, onSearch: () => {} }, render: (args) => <div style={{ width: 360 }}><AddressSelector {...args} /></div> };
