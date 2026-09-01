import type { Meta, StoryObj } from '@storybook/react';
import { PropsTable } from '@waysnx/ui-docs';
import type { ComponentProp } from '@waysnx/ui-docs';
import { TestBadge } from '../TestBadge';

const sampleProps: ComponentProp[] = [
  { name: 'children', type: 'ReactNode', description: 'Button content', required: true },
  { name: 'variant', type: "'primary' | 'secondary' | 'destructive'", description: 'Visual variant', defaultValue: 'primary' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", description: 'Button size', defaultValue: 'md' },
  { name: 'disabled', type: 'boolean', description: 'Disable interaction', defaultValue: false },
  { name: 'onClick', type: '() => void', description: 'Click handler' },
  { name: 'type', type: "'button' | 'submit' | 'reset'", description: 'HTML type', defaultValue: 'button' },
  { name: 'oldProp', type: 'string', description: 'Legacy prop', deprecated: true },
];

const meta = {
  title: 'Docs/PropsTable',
  component: PropsTable,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div>
        <TestBadge componentName="Docs" />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PropsTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { props: sampleProps, title: 'Button Props' },
};

export const NoProps: Story = {
  args: { props: [], title: 'Empty' },
};

export const ShowDeprecated: Story = {
  args: { props: sampleProps, title: 'With Deprecated', showDeprecated: true },
};

export const CustomTitle: Story = {
  args: { props: sampleProps.slice(0, 3), title: 'Custom Title' },
};

export const Accessibility: Story = {
  args: { props: sampleProps, title: 'Accessible Table' },
  parameters: { a11y: { config: { rules: [{ id: 'table', enabled: true }] } } },
};
