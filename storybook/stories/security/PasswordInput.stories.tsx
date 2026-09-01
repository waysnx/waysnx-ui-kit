// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { fn } from '@storybook/test';
import { useState } from 'react';
import { PasswordInput } from '@waysnx/ui-security';
import type { PasswordPolicy } from '@waysnx/ui-security';

const defaultPolicy: PasswordPolicy = {
  minLength: 8,
  maxLength: 32,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
  minStrengthScore: 60,
};

const strictPolicy: PasswordPolicy = {
  minLength: 12,
  maxLength: 128,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
  minStrengthScore: 80,
};

const lenientPolicy: PasswordPolicy = {
  minLength: 6,
  requireUppercase: false,
  requireLowercase: true,
  requireNumbers: false,
  requireSpecialChars: false,
};

const meta = {
  title: 'Security/Password/PasswordInput',
  component: PasswordInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Current password value',
    },
    onChange: {
      description: 'Callback when password changes',
    },
    policy: {
      control: 'object',
      description: 'Password policy for validation',
    },
    showStrength: {
      control: 'boolean',
      description: 'Show strength indicator',
    },
    showFeedback: {
      control: 'boolean',
      description: 'Show validation feedback',
    },
    label: {
      control: 'text',
      description: 'Input label text',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    helperText: {
      control: 'text',
      description: 'Helper text below input',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the input',
    },
    required: {
      control: 'boolean',
      description: 'Mark as required field',
    },
    autoFocus: {
      control: 'boolean',
      description: 'Auto-focus on mount',
    },
  },
  decorators: [
    (Story) => (
      <div>
        <TestBadge componentName="Security" />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PasswordInput>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic PasswordInput with default settings
 */
export const Basic: Story = {
  args: {
    value: '',
    onChange: fn(),
    label: 'Password',
    placeholder: 'Enter your password',
    showStrength: true,
    showFeedback: true,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <PasswordInput
        {...args}
        value={value}
        onChange={(val) => {
          setValue(val);
          args.onChange(val);
        }}
      />
    );
  },
};

/**
 * PasswordInput with validation policy
 */
export const WithPolicy: Story = {
  args: {
    value: '',
    onChange: fn(),
    label: 'Secure Password',
    placeholder: 'Create a strong password',
    policy: defaultPolicy,
    showStrength: true,
    showFeedback: true,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <PasswordInput
        {...args}
        value={value}
        onChange={(val) => {
          setValue(val);
          args.onChange(val);
        }}
      />
    );
  },
};

/**
 * PasswordInput with strict policy
 */
export const StrictPolicy: Story = {
  args: {
    value: '',
    onChange: fn(),
    label: 'Enterprise Password',
    placeholder: 'Must be 12+ characters with high complexity',
    policy: strictPolicy,
    showStrength: true,
    showFeedback: true,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <PasswordInput
        {...args}
        value={value}
        onChange={(val) => {
          setValue(val);
          args.onChange(val);
        }}
      />
    );
  },
};

/**
 * PasswordInput with lenient policy
 */
export const LenientPolicy: Story = {
  args: {
    value: '',
    onChange: fn(),
    label: 'Simple Password',
    placeholder: 'Minimum 6 characters, lowercase required',
    policy: lenientPolicy,
    showStrength: true,
    showFeedback: true,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <PasswordInput
        {...args}
        value={value}
        onChange={(val) => {
          setValue(val);
          args.onChange(val);
        }}
      />
    );
  },
};

/**
 * PasswordInput without strength meter
 */
export const WithoutStrength: Story = {
  args: {
    value: '',
    onChange: fn(),
    label: 'Password',
    placeholder: 'Enter your password',
    policy: defaultPolicy,
    showStrength: false,
    showFeedback: true,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <PasswordInput
        {...args}
        value={value}
        onChange={(val) => {
          setValue(val);
          args.onChange(val);
        }}
      />
    );
  },
};

/**
 * PasswordInput without feedback
 */
export const WithoutFeedback: Story = {
  args: {
    value: '',
    onChange: fn(),
    label: 'Password',
    placeholder: 'Enter your password',
    policy: defaultPolicy,
    showStrength: true,
    showFeedback: false,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <PasswordInput
        {...args}
        value={value}
        onChange={(val) => {
          setValue(val);
          args.onChange(val);
        }}
      />
    );
  },
};

/**
 * PasswordInput with error state
 */
export const WithError: Story = {
  args: {
    value: 'weakpass',
    onChange: fn(),
    label: 'Password',
    placeholder: 'Enter your password',
    policy: defaultPolicy,
    showStrength: true,
    showFeedback: true,
    error: 'Password does not meet requirements',
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <PasswordInput
        {...args}
        value={value}
        onChange={(val) => {
          setValue(val);
          args.onChange(val);
        }}
      />
    );
  },
};

/**
 * PasswordInput with helper text
 */
export const WithHelperText: Story = {
  args: {
    value: '',
    onChange: fn(),
    label: 'Password',
    placeholder: 'Enter your password',
    policy: defaultPolicy,
    showStrength: true,
    showFeedback: true,
    helperText: 'Your password will expire in 30 days. Use a combination of uppercase, lowercase, numbers, and special characters.',
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <PasswordInput
        {...args}
        value={value}
        onChange={(val) => {
          setValue(val);
          args.onChange(val);
        }}
      />
    );
  },
};

/**
 * PasswordInput disabled state
 */
export const Disabled: Story = {
  args: {
    value: 'Password123!',
    onChange: fn(),
    label: 'Password',
    placeholder: 'Enter your password',
    policy: defaultPolicy,
    showStrength: true,
    showFeedback: true,
    disabled: true,
  },
};

/**
 * PasswordInput as required field
 */
export const Required: Story = {
  args: {
    value: '',
    onChange: fn(),
    label: 'Password',
    placeholder: 'Enter your password',
    policy: defaultPolicy,
    showStrength: true,
    showFeedback: true,
    required: true,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <PasswordInput
        {...args}
        value={value}
        onChange={(val) => {
          setValue(val);
          args.onChange(val);
        }}
      />
    );
  },
};

/**
 * PasswordInput with strong password
 */
export const StrongPassword: Story = {
  args: {
    value: 'SecurePass123!@#',
    onChange: fn(),
    label: 'Password',
    placeholder: 'Enter your password',
    policy: defaultPolicy,
    showStrength: true,
    showFeedback: true,
  },
};

/**
 * PasswordInput with weak password
 */
export const WeakPassword: Story = {
  args: {
    value: 'weak',
    onChange: fn(),
    label: 'Password',
    placeholder: 'Enter your password',
    policy: defaultPolicy,
    showStrength: true,
    showFeedback: true,
  },
};

/**
 * PasswordInput interactive demo
 */
export const Interactive: Story = {
  args: {
    value: '',
    onChange: fn(),
    label: 'Create Password',
    placeholder: 'Try typing a password...',
    policy: defaultPolicy,
    showStrength: true,
    showFeedback: true,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <div style={{ width: '400px' }}>
        <PasswordInput
          {...args}
          value={value}
          onChange={(val) => {
            setValue(val);
            args.onChange(val);
          }}
        />
        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '0.375rem' }}>
          <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 'bold' }}>Current Value:</p>
          <code style={{ wordBreak: 'break-all' }}>{value || '(empty)'}</code>
        </div>
      </div>
    );
  },
};

/**
 * PasswordInput with custom placeholder
 */
export const CustomPlaceholder: Story = {
  args: {
    value: '',
    onChange: fn(),
    label: 'Master Password',
    placeholder: '••••••••••••••••',
    policy: defaultPolicy,
    showStrength: true,
    showFeedback: true,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <PasswordInput
        {...args}
        value={value}
        onChange={(val) => {
          setValue(val);
          args.onChange(val);
        }}
      />
    );
  },
};

/**
 * PasswordInput with no policy (no validation)
 */
export const NoPolicy: Story = {
  args: {
    value: '',
    onChange: fn(),
    label: 'Password',
    placeholder: 'Enter your password (no validation)',
    showStrength: true,
    showFeedback: true,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <PasswordInput
        {...args}
        value={value}
        onChange={(val) => {
          setValue(val);
          args.onChange(val);
        }}
      />
    );
  },
};

/**
 * Multiple PasswordInputs comparison
 */
export const ComparisonView: Story = {
  render: () => {
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [password3, setPassword3] = useState('');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '400px' }}>
        <div>
          <h3 style={{ marginTop: 0 }}>Standard Requirements</h3>
          <PasswordInput
            value={password1}
            onChange={setPassword1}
            label="Password"
            policy={defaultPolicy}
            showStrength={true}
            showFeedback={true}
          />
        </div>
        <div>
          <h3 style={{ marginTop: 0 }}>Strict Requirements</h3>
          <PasswordInput
            value={password2}
            onChange={setPassword2}
            label="Password"
            policy={strictPolicy}
            showStrength={true}
            showFeedback={true}
          />
        </div>
        <div>
          <h3 style={{ marginTop: 0 }}>Lenient Requirements</h3>
          <PasswordInput
            value={password3}
            onChange={setPassword3}
            label="Password"
            policy={lenientPolicy}
            showStrength={true}
            showFeedback={true}
          />
        </div>
      </div>
    );
  },
};

/**
 * PasswordInput with custom class
 */
export const CustomClass: Story = {
  args: {
    value: '',
    onChange: fn(),
    label: 'Password',
    placeholder: 'Enter your password',
    policy: defaultPolicy,
    showStrength: true,
    showFeedback: true,
    className: 'custom-password-input',
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <div>
        <PasswordInput
          {...args}
          value={value}
          onChange={(val) => {
            setValue(val);
            args.onChange(val);
          }}
        />
        <style>{`
          .custom-password-input {
            border: 2px dashed #3b82f6;
            border-radius: 0.75rem;
          }
        `}</style>
      </div>
    );
  },
};
