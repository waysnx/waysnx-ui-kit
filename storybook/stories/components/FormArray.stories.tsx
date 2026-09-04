import type { Meta, StoryObj } from '@storybook/react';
import { FormArray } from '@waysnx/ui-form-builder';
import { TestBadge } from '../TestBadge';

const meta = {
  title: 'Components/FormArray',
  component: FormArray,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div>
        <TestBadge componentName="FormArray" />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FormArray>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <FormArray
        label="Items"
        itemSchema={{
          type: 'object',
          properties: {
            item: { type: 'string', title: 'Item' },
          },
        }}
        value={[]}
        onChange={() => {}}
      />
    </div>
  ),
};
