import type { Meta, StoryObj } from '@storybook/react';
import { ComponentHero } from '@waysnx/ui-docs';
import type { Component } from '@waysnx/ui-docs';
import { TestBadge } from '../TestBadge';

const sampleComponent: Component = {
  id: 'ui-core:button',
  name: 'Button',
  slug: 'button',
  description: 'A versatile button component with multiple variants and sizes.',
  category: 'Input',
  status: 'stable',
  tags: ['interactive', 'form', 'action'],
  accessibility: { wcagLevel: 'AA', ariaRoles: ['button'], screenReaderSupport: true },
  props: [],
};

const meta = {
  title: 'Docs/ComponentHero',
  component: ComponentHero,
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
} satisfies Meta<typeof ComponentHero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { component: sampleComponent },
};

export const Deprecated: Story = {
  args: { component: { ...sampleComponent, isDeprecated: true, deprecationMessage: 'Use NewButton instead.' } },
};

export const Beta: Story = {
  args: { component: { ...sampleComponent, status: 'beta', name: 'NewComponent' } },
};

export const WithManyTags: Story = {
  args: { component: { ...sampleComponent, tags: ['interactive', 'form', 'action', 'ui', 'enterprise', 'accessible'] } },
};
