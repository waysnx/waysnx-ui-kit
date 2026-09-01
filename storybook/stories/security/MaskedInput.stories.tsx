// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { MaskedInput } from '@waysnx/ui-security';

const meta = {
  title: 'Security/Secure Inputs/MaskedInput',
  component: MaskedInput,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div>
        <TestBadge componentName="Security" />
        <Story />
      </div>
    ),
  ],
  argTypes: {
    label: { control: 'text', description: 'Input label' },
    mask: { control: 'text', description: 'Mask pattern' },
    value: { control: 'text', description: 'Input value' },
  },
  args: {
    label: 'SSN',
    mask: '###-##-####',
    value: '123-45-6789',
  },
} satisfies Meta<typeof MaskedInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SSN: Story = {};

export const Phone: Story = {
  args: { label: 'Phone', mask: '(###) ###-####', value: '(555) 123-4567' },
};

export const CreditCard: Story = {
  args: { label: 'Card Number', mask: '#### #### #### ####', value: '4111 1111 1111 1111' },
};

