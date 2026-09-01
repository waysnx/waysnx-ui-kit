import type { Meta, StoryObj } from '@storybook/react';
import { Select } from '@waysnx/ui-core';
import { TestBadge } from './TestBadge';

const meta = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Disable the select',
    },
    required: {
      control: 'boolean',
      description: 'Mark as required',
    },
    label: {
      control: 'text',
      description: 'Select label',
    },
  },
  decorators: [
    (Story) => (
      <div>
        <TestBadge componentName="Select" />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const countryOptions = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
];

export const Default: Story = {
  args: {
    label: 'Select Country',
    options: countryOptions,
  },
};

export const WithValue: Story = {
  args: {
    label: 'Select Country',
    options: countryOptions,
    value: 'us',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Country',
    options: countryOptions,
    disabled: true,
  },
};

export const Required: Story = {
  args: {
    label: 'Country',
    options: countryOptions,
    required: true,
  },
};

export const WithError: Story = {
  args: {
    label: 'Country',
    options: countryOptions,
    onError: () => {},
  },
};

export const LongList: Story = {
  args: {
    label: 'Select Country',
    options: [
      ...countryOptions,
      { value: 'jp', label: 'Japan' },
      { value: 'cn', label: 'China' },
      { value: 'in', label: 'India' },
      { value: 'br', label: 'Brazil' },
      { value: 'mx', label: 'Mexico' },
      { value: 'es', label: 'Spain' },
      { value: 'it', label: 'Italy' },
      { value: 'nl', label: 'Netherlands' },
      { value: 'se', label: 'Sweden' },
    ],
  },
};
