import type { Meta, StoryObj } from '@storybook/react';
import { DistanceCalculator } from '@waysnx/ui-maps';
import { TestBadge } from '../TestBadge';

const meta = {
  title: 'Maps/DistanceCalculator',
  component: DistanceCalculator,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: { mode: { control: 'select', options: ['driving', 'walking', 'cycling', 'transit'] } },
  decorators: [(Story) => (<div><TestBadge componentName="Maps" /><Story /></div>)],
} satisfies Meta<typeof DistanceCalculator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { onCalculate: console.log } };
export const WalkingMode: Story = { args: { mode: 'walking' } };
