// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { fn } from '@storybook/test';
import { useState } from 'react';
import { OTPInput } from '@waysnx/ui-security';

const meta = {
  title: 'Security/OTP/OTPInput',
  component: OTPInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    length: {
      control: { type: 'range', min: 4, max: 8, step: 1 },
      description: 'Number of OTP digits',
    },
    onComplete: {
      description: 'Callback when OTP is complete',
    },
    onChange: {
      description: 'Callback when value changes',
    },
    value: {
      control: 'text',
      description: 'Current OTP value',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable input',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder character',
    },
    label: {
      control: 'text',
      description: 'Input label',
    },
    error: {
      control: 'text',
      description: 'Error message',
    },
    helperText: {
      control: 'text',
      description: 'Helper text',
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
} satisfies Meta<typeof OTPInput>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic OTP input (6 digits)
 */
export const Basic: Story = {
  args: {
    length: 6,
    onComplete: fn(),
    onChange: fn(),
    placeholder: '•',
  },
};

/**
 * With label
 */
export const WithLabel: Story = {
  args: {
    length: 6,
    label: 'Enter Verification Code',
    onComplete: fn(),
    onChange: fn(),
    placeholder: '•',
  },
};

/**
 * With helper text
 */
export const WithHelperText: Story = {
  args: {
    length: 6,
    label: 'Enter Verification Code',
    helperText: 'Check your email for the 6-digit code',
    onComplete: fn(),
    onChange: fn(),
    placeholder: '•',
  },
};

/**
 * With error message
 */
export const WithError: Story = {
  args: {
    length: 6,
    label: 'Enter Verification Code',
    error: 'Invalid code. Please try again.',
    onComplete: fn(),
    onChange: fn(),
    placeholder: '•',
  },
};

/**
 * 4-digit OTP
 */
export const FourDigits: Story = {
  args: {
    length: 4,
    label: 'Enter PIN',
    onComplete: fn(),
    onChange: fn(),
    placeholder: '•',
  },
};

/**
 * 8-digit OTP
 */
export const EightDigits: Story = {
  args: {
    length: 8,
    label: 'Enter Security Code',
    onComplete: fn(),
    onChange: fn(),
    placeholder: '•',
  },
};

/**
 * Custom placeholder
 */
export const CustomPlaceholder: Story = {
  args: {
    length: 6,
    label: 'Enter Code',
    placeholder: '-',
    onComplete: fn(),
    onChange: fn(),
  },
};

/**
 * Disabled state
 */
export const Disabled: Story = {
  args: {
    length: 6,
    label: 'Enter Code',
    disabled: true,
    placeholder: '•',
    onComplete: fn(),
    onChange: fn(),
  },
};

/**
 * With pre-filled value
 */
export const PreFilled: Story = {
  args: {
    length: 6,
    label: 'Enter Code',
    value: '123456',
    placeholder: '•',
    onComplete: fn(),
    onChange: fn(),
  },
};

/**
 * Interactive OTP input
 */
export const Interactive: Story = {
  render: (args) => {
    const [otp, setOtp] = useState('');
    const [completed, setCompleted] = useState(false);

    return (
      <div style={{ width: '450px' }}>
        <OTPInput
          {...args}
          length={6}
          value={otp}
          onChange={(val) => {
            setOtp(val);
            args.onChange(val);
          }}
          onComplete={(val) => {
            setCompleted(true);
            args.onComplete(val);
            setTimeout(() => setCompleted(false), 3000);
          }}
          label="Enter Verification Code"
          placeholder="•"
        />
        <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '0.375rem' }}>
          <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 'bold' }}>
            Current Value: <code>{otp || '(empty)'}</code>
          </p>
          {completed && (
            <p style={{ margin: 0, color: '#22c55e', fontWeight: 'bold', fontSize: '0.875rem' }}>
              ✓ OTP Complete!
            </p>
          )}
        </div>
      </div>
    );
  },
};

/**
 * Paste support demonstration
 */
export const PasteSupport: Story = {
  render: (args) => (
    <div style={{ width: '450px' }}>
      <OTPInput
        {...args}
        length={6}
        label="Enter Code (Supports Paste)"
        placeholder="•"
      />
      <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#dbeafe', borderRadius: '0.375rem', fontSize: '0.875rem', color: '#0c4a6e' }}>
        <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>💡 Tip: Try pasting a 6-digit code!</p>
        <p style={{ margin: '0 0 0.5rem 0' }}>Example codes to paste: 123456, 789012, 345678</p>
      </div>
    </div>
  ),
  args: {
    onComplete: fn(),
    onChange: fn(),
  },
};

/**
 * Error state recovery
 */
export const ErrorRecovery: Story = {
  render: (args) => {
    const [error, setError] = useState<string>();
    const [attempts, setAttempts] = useState(0);

    return (
      <div style={{ width: '450px' }}>
        <OTPInput
          {...args}
          length={6}
          label="Enter Code"
          error={error}
          onComplete={(otp) => {
            setAttempts(attempts + 1);
            if (attempts === 0) {
              setError('Invalid code. Please try again.');
            } else {
              setError(undefined);
            }
            args.onComplete(otp);
          }}
        />
        {attempts > 1 && (
          <div style={{
            marginTop: '1rem',
            padding: '1rem',
            backgroundColor: '#f0fdf4',
            border: '1px solid #dcfce7',
            borderRadius: '0.375rem',
            color: '#065f46',
            fontSize: '0.875rem',
          }}>
            ✓ Code verified successfully!
          </div>
        )}
      </div>
    );
  },
};

/**
 * All lengths comparison
 */
export const LengthComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '600px' }}>
      <div>
        <h4 style={{ marginTop: 0 }}>4 Digits (PIN)</h4>
        <OTPInput length={4} label="PIN" onComplete={fn()} onChange={fn()} />
      </div>
      <div>
        <h4 style={{ marginTop: 0 }}>6 Digits (Standard)</h4>
        <OTPInput length={6} label="Code" onComplete={fn()} onChange={fn()} />
      </div>
      <div>
        <h4 style={{ marginTop: 0 }}>8 Digits (Security)</h4>
        <OTPInput length={8} label="Security Code" onComplete={fn()} onChange={fn()} />
      </div>
    </div>
  ),
};

/**
 * SMS verification context
 */
export const SMSVerification: Story = {
  render: () => (
    <div style={{ width: '450px', padding: '2rem', backgroundColor: '#f9fafb', borderRadius: '0.75rem' }}>
      <h2 style={{ marginTop: 0 }}>Verify Your Phone</h2>
      <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
        We sent a 6-digit code to your phone. Enter it below to verify your account.
      </p>
      <OTPInput
        length={6}
        label="Enter Verification Code"
        helperText="Didn't receive the code? Check your spam folder."
        onComplete={fn()}
        onChange={fn()}
      />
      <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#6b7280', textAlign: 'center' }}>
        or <button style={{ background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer', fontWeight: 'bold', padding: 0 }}>use a different method</button>
      </p>
    </div>
  ),
};

/**
 * Email verification context
 */
export const EmailVerification: Story = {
  render: () => (
    <div style={{ width: '450px', padding: '2rem', backgroundColor: '#f9fafb', borderRadius: '0.75rem' }}>
      <h2 style={{ marginTop: 0 }}>Verify Your Email</h2>
      <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
        We sent a verification code to <strong>user@example.com</strong>
      </p>
      <OTPInput
        length={6}
        label="Enter Code"
        helperText="The code will expire in 10 minutes"
        onComplete={fn()}
        onChange={fn()}
      />
    </div>
  ),
};

/**
 * Mobile responsive
 */
export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'iphone12',
    },
  },
  args: {
    length: 6,
    label: 'Enter Code',
    helperText: 'Check your email for the code',
    onComplete: fn(),
    onChange: fn(),
  },
};

/**
 * Accessible OTP input
 */
export const Accessible: Story = {
  args: {
    length: 6,
    label: 'One-Time Password',
    helperText: 'Enter the 6-digit code from your authenticator app or SMS',
    onComplete: fn(),
    onChange: fn(),
  },
};

/**
 * Minimal styling
 */
export const Minimal: Story = {
  args: {
    length: 6,
    onComplete: fn(),
    onChange: fn(),
    placeholder: '•',
  },
};

/**
 * With all features
 */
export const FullFeatured: Story = {
  args: {
    length: 6,
    label: 'Verification Code',
    helperText: 'Enter the 6-digit code sent to your device',
    placeholder: '•',
    onComplete: fn(),
    onChange: fn(),
  },
};

/**
 * Numeric input demo
 */
export const NumericOnly: Story = {
  render: () => {
    const [input, setInput] = useState('');
    const [info, setInfo] = useState('');

    return (
      <div style={{ width: '450px' }}>
        <OTPInput
          length={6}
          label="Numeric Input Test"
          helperText="Only numeric characters are accepted"
          value={input}
          onChange={(val) => {
            setInput(val);
            setInfo(`Entered: ${val} (${val.length}/6)`);
          }}
          onComplete={(val) => {
            setInfo(`Complete: ${val} ✓`);
          }}
        />
        {info && (
          <div style={{
            marginTop: '1rem',
            padding: '0.75rem',
            backgroundColor: '#f0f9ff',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
            color: '#0c4a6e',
          }}>
            {info}
          </div>
        )}
      </div>
    );
  },
};

/**
 * Keyboard navigation demo
 */
export const KeyboardNavigation: Story = {
  render: () => (
    <div style={{ width: '450px' }}>
      <OTPInput
        length={6}
        label="Keyboard Navigation"
        helperText="Use arrow keys to navigate between fields, backspace to delete"
        onComplete={fn()}
        onChange={fn()}
      />
      <div style={{
        marginTop: '1.5rem',
        padding: '1rem',
        backgroundColor: '#f0f9ff',
        borderRadius: '0.375rem',
        fontSize: '0.875rem',
        color: '#0c4a6e',
      }}>
        <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>⌨️ Keyboard Shortcuts:</p>
        <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
          <li>Arrow Left/Right: Navigate between fields</li>
          <li>Backspace: Delete current or move to previous field</li>
          <li>Ctrl/Cmd + V: Paste to auto-distribute digits</li>
        </ul>
      </div>
    </div>
  ),
};
