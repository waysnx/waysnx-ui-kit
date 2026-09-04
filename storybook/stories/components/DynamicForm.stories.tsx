import type { Meta, StoryObj } from '@storybook/react';
import { DynamicForm } from '@waysnx/ui-form-builder';
import { TestBadge } from '../TestBadge';

const meta = {
  title: 'Components/DynamicForm',
  component: DynamicForm,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div>
        <TestBadge componentName="DynamicForm" />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DynamicForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <DynamicForm
        schema={{
          type: 'object',
          properties: {
            name: { type: 'string', title: 'Name' },
          },
        }}
      />
    </div>
  ),
};
