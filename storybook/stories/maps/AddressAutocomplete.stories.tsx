import type { Meta, StoryObj } from '@storybook/react';
import { AddressAutocomplete } from '@waysnx/ui-maps';
import { TestBadge } from '../TestBadge';

const meta = {
  title: 'Maps/AddressAutocomplete',
  component: AddressAutocomplete,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: { placeholder: { control: 'text' }, loading: { control: 'boolean' } },
  decorators: [(Story) => (<div><TestBadge componentName="Maps" /><Story /></div>)],
} satisfies Meta<typeof AddressAutocomplete>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { placeholder: 'Search address...' } };
export const WithValue: Story = { args: { value: '742 Evergreen Terrace' } };
