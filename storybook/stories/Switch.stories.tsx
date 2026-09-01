import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Switch } from '@waysnx/ui-core';
import { TestBadge } from './TestBadge';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Disable the switch',
    },
    label: {
      control: 'text',
      description: 'Switch label',
    },
  },
  decorators: [
    (Story) => (
      <div>
        <TestBadge componentName="Switch" />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Enable notifications',
  },
};

export const Checked: Story = {
  args: {
    label: 'Enable notifications',
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Enable notifications',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Enable notifications',
    disabled: true,
    defaultChecked: true,
  },
};

export const Interactive: Story = {
  render: () => {
    const [enabled, setEnabled] = useState(false);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Switch
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
          />
          <span>Dark Mode</span>
        </label>
        <p style={{ fontSize: '12px', color: '#666' }}>
          Status: {enabled ? 'Enabled' : 'Disabled'}
        </p>
      </div>
    );
  },
};
