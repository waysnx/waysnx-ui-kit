import type { Meta, StoryObj } from '@storybook/react';
import { Link } from '@waysnx/ui-core';
import { TestBadge } from './TestBadge';

const meta = {
  title: 'Components/Link',
  component: Link,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    href: {
      control: 'text',
      description: 'Link URL',
    },
    target: {
      control: 'select',
      options: ['_self', '_blank', '_parent', '_top'],
      description: 'Link target',
    },
    label: {
      control: 'text',
      description: 'Link text',
    },
  },
  decorators: [
    (Story) => (
      <div>
        <TestBadge componentName="Link" />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: '#',
    label: 'Click here',
  },
};

export const External: Story = {
  args: {
    href: 'https://example.com',
    target: '_blank',
    label: 'External Link',
  },
};

export const Disabled: Story = {
  args: {
    href: '#',
    label: 'Disabled Link',
    disabled: true,
  },
};

export const WithPrependText: Story = {
  args: {
    href: '#',
    label: 'Documentation',
    prependText: '📖',
  },
};

export const Multiple: Story = {
  args: { label: 'Link' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Link href="#about" label="About" />
      <Link href="#services" label="Services" />
      <Link href="#contact" label="Contact" />
    </div>
  ),
};
