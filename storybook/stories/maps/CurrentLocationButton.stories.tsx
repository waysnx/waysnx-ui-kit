import type { Meta, StoryObj } from '@storybook/react';
import { CurrentLocationButton } from '@waysnx/ui-maps';
import { TestBadge } from '../TestBadge';

const meta = {
  title: 'Maps/CurrentLocationButton',
  component: CurrentLocationButton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: { loading: { control: 'boolean' } },
  decorators: [(Story) => (<div><TestBadge componentName="Maps" /><Story /></div>)],
} satisfies Meta<typeof CurrentLocationButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: {} };
export const Loading: Story = { args: { loading: true } };
