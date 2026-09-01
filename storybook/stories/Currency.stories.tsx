import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Currency } from '@waysnx/ui-core';
import { TestBadge } from './TestBadge';

const meta = {
  title: 'Components/Currency',
  component: Currency,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    currencySymbol: {
      control: 'text',
      description: 'Currency symbol',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the input',
    },
  },
  decorators: [
    (Story) => (
      <div>
        <TestBadge componentName="Currency" />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Currency>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter amount',
    currencySymbol: '$',
  },
};

export const WithValue: Story = {
  args: {
    placeholder: 'Enter amount',
    currencySymbol: '$',
    value: 1234.56,
  },
};

export const Euro: Story = {
  args: {
    placeholder: 'Enter amount',
    currencySymbol: '€',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Enter amount',
    currencySymbol: '$',
    disabled: true,
    value: 999.99,
  },
};

export const Interactive: Story = {
  render: () => {
    const [amount, setAmount] = useState<number | undefined>(undefined);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '300px' }}>
        <Currency
          placeholder="Enter amount"
          currencySymbol="$"
          value={amount}
          onChange={(val) => setAmount(val ?? undefined)}
        />
        {amount && (
          <p style={{ fontSize: '12px', color: '#666' }}>
            Amount: ${amount.toFixed(2)}
          </p>
        )}
      </div>
    );
  },
};
