import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Hidden } from '@waysnx/ui-core';
import { TestBadge } from './TestBadge';

const meta = {
  title: 'Components/Hidden',
  component: Hidden,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'Field name',
    },
    value: {
      control: 'text',
      description: 'Hidden value',
    },
  },
  decorators: [
    (Story) => (
      <div>
        <TestBadge componentName="Hidden" />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Hidden>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'hidden_field',
    value: 'hidden-value',
  },
};

export const HiddenInput: Story = {
  args: { name: 'hidden_field' },
  render: () => (
    <form style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <input type="text" placeholder="Visible input" />
      <Hidden name="hidden_field" value="hidden-value" />
      <button type="submit">Submit</button>
    </form>
  ),
};

export const HiddenMetadata: Story = {
  args: { name: 'user_id' },
  render: () => (
    <div>
      <h3>User Profile</h3>
      <p>Name: [name]</p>
      <p>Email: [email]</p>
      <Hidden name="user_id" value="12345" />
      <p>This form contains hidden metadata</p>
    </div>
  ),
};

export const MultipleHidden: Story = {
  args: { name: 'field_1' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <p>Visible content 1</p>
      <Hidden name="field_1" value="value-1" />
      <p>Visible content 2</p>
      <Hidden name="field_2" value="value-2" />
      <p>Visible content 3</p>
      <Hidden name="field_3" value="value-3" />
    </div>
  ),
};

export const HiddenWithForm: Story = {
  args: { name: 'form_id' },
  render: () => {
    const [submitted, setSubmitted] = useState(false);
    return (
      <form
        style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '300px' }}
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
      >
        <label>
          Name:
          <input type="text" placeholder="Enter your name" />
        </label>
        <Hidden name="form_id" value="contact-form-1" />
        <button type="submit">Submit</button>
        {submitted && (
          <p style={{ fontSize: '12px', color: '#666' }}>
            ✓ Form submitted with hidden metadata
          </p>
        )}
      </form>
    );
  },
};
