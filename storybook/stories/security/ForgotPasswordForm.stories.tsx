// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { fn } from '@storybook/test';
import { useState } from 'react';
import { ForgotPasswordForm } from '@waysnx/ui-security';
import type { PasswordPolicy } from '@waysnx/ui-security';

const standardPolicy: PasswordPolicy = {
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

const meta = {
  title: 'Security/Authentication/ForgotPasswordForm',
  component: ForgotPasswordForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    policy: {
      control: 'object',
      description: 'Password policy',
    },
    onSubmitEmail: {
      description: 'Callback when email is submitted',
    },
    onSubmitReset: {
      description: 'Callback when password reset is submitted',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state',
    },
    error: {
      control: 'text',
      description: 'Error message',
    },
    success: {
      control: 'text',
      description: 'Success message',
    },
    onBackToLogin: {
      description: 'Callback to return to login',
    },
    showStrength: {
      control: 'boolean',
      description: 'Show password strength indicator',
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
} satisfies Meta<typeof ForgotPasswordForm>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic forgot password form
 */
export const Basic: Story = {
  args: {
    policy: standardPolicy,
    onSubmitEmail: fn(),
    onSubmitReset: fn(),
    loading: false,
    showStrength: true,
  },
};

/**
 * With back to login option
 */
export const WithBackToLogin: Story = {
  args: {
    policy: standardPolicy,
    onSubmitEmail: fn(),
    onSubmitReset: fn(),
    onBackToLogin: fn(),
    loading: false,
    showStrength: true,
  },
};

/**
 * With standard policy
 */
export const StandardPolicy: Story = {
  args: {
    policy: standardPolicy,
    onSubmitEmail: fn(),
    onSubmitReset: fn(),
    onBackToLogin: fn(),
    loading: false,
    showStrength: true,
  },
};

/**
 * With strict policy
 */
export const StrictPolicy: Story = {
  args: {
    policy: strictPolicy,
    onSubmitEmail: fn(),
    onSubmitReset: fn(),
    onBackToLogin: fn(),
    loading: false,
    showStrength: true,
  },
};

/**
 * Without strength indicator
 */
export const WithoutStrength: Story = {
  args: {
    policy: standardPolicy,
    onSubmitEmail: fn(),
    onSubmitReset: fn(),
    loading: false,
    showStrength: false,
  },
};

/**
 * With error message
 */
export const WithError: Story = {
  args: {
    policy: standardPolicy,
    onSubmitEmail: fn(),
    onSubmitReset: fn(),
    loading: false,
    error: 'Email not found in our system. Please check and try again.',
    showStrength: true,
  },
};

/**
 * With success message
 */
export const WithSuccess: Story = {
  args: {
    policy: standardPolicy,
    onSubmitEmail: fn(),
    onSubmitReset: fn(),
    loading: false,
    success: 'Password reset successfully! Redirecting to login...',
    showStrength: true,
  },
};

/**
 * Loading state
 */
export const Loading: Story = {
  args: {
    policy: standardPolicy,
    onSubmitEmail: fn(),
    onSubmitReset: fn(),
    loading: true,
    showStrength: true,
  },
};

/**
 * Interactive multi-step flow
 */
export const InteractiveFlow: Story = {
  render: (args) => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');

    return (
      <div style={{ width: '450px' }}>
        <div style={{
          marginBottom: '1rem',
          padding: '0.75rem',
          backgroundColor: '#f0f9ff',
          borderLeft: '4px solid #3b82f6',
          borderRadius: '0.25rem',
          fontSize: '0.875rem',
          color: '#0c4a6e',
        }}>
          <strong>Step {step} of 3:</strong> {step === 1 ? 'Enter email' : step === 2 ? 'Verify token' : 'Reset password'}
        </div>

        <ForgotPasswordForm
          {...args}
          onSubmitEmail={async (emailValue) => {
            setEmail(emailValue);
            setStep(2);
            args.onSubmitEmail?.(emailValue);
          }}
          onSubmitReset={async (data) => {
            setStep(3);
            args.onSubmitReset?.(data);
          }}
        />

        {email && <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>Email: {email}</p>}
      </div>
    );
  },
};

/**
 * Immediate error state
 */
export const ImmediateError: Story = {
  args: {
    policy: standardPolicy,
    onSubmitEmail: fn(),
    onSubmitReset: fn(),
    error: 'An unexpected error occurred. Please try again later.',
    loading: false,
    showStrength: true,
  },
};

/**
 * Minimal form
 */
export const Minimal: Story = {
  args: {
    policy: standardPolicy,
    onSubmitEmail: fn(),
    onSubmitReset: fn(),
    loading: false,
    showStrength: false,
  },
};

/**
 * Full featured
 */
export const FullFeatured: Story = {
  args: {
    policy: standardPolicy,
    onSubmitEmail: fn(),
    onSubmitReset: fn(),
    onBackToLogin: fn(),
    loading: false,
    showStrength: true,
  },
};

/**
 * Different scenarios
 */
export const Scenarios: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', width: '900px' }}>
      <div>
        <h4 style={{ marginTop: 0 }}>Success</h4>
        <ForgotPasswordForm
          policy={standardPolicy}
          onSubmitEmail={fn()}
          onSubmitReset={fn()}
          success="Password reset successfully!"
          showStrength={true}
        />
      </div>
      <div>
        <h4 style={{ marginTop: 0 }}>Error</h4>
        <ForgotPasswordForm
          policy={standardPolicy}
          onSubmitEmail={fn()}
          onSubmitReset={fn()}
          error="Invalid email address"
          showStrength={true}
        />
      </div>
      <div>
        <h4 style={{ marginTop: 0 }}>Loading</h4>
        <ForgotPasswordForm
          policy={standardPolicy}
          onSubmitEmail={fn()}
          onSubmitReset={fn()}
          loading={true}
          showStrength={true}
        />
      </div>
      <div>
        <h4 style={{ marginTop: 0 }}>Default</h4>
        <ForgotPasswordForm
          policy={standardPolicy}
          onSubmitEmail={fn()}
          onSubmitReset={fn()}
          showStrength={true}
        />
      </div>
    </div>
  ),
};

/**
 * Simulated complete flow
 */
export const CompleteFlow: Story = {
  render: () => {
    const [step, setStep] = useState<'email' | 'token' | 'password'>('email');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    return (
      <div style={{ width: '450px' }}>
        <div style={{
          marginBottom: '1.5rem',
          padding: '1rem',
          backgroundColor: '#f9fafb',
          borderRadius: '0.375rem',
        }}>
          <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 'bold', color: '#1f2937' }}>
            Password Reset Flow
          </p>
          <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.75rem', color: '#6b7280' }}>
            Current Step: <span style={{ fontWeight: 'bold' }}>{step === 'email' ? '1. Email Verification' : step === 'token' ? '2. Token Verification' : '3. New Password'}</span>
          </p>
        </div>

        <ForgotPasswordForm
          policy={standardPolicy}
          onSubmitEmail={async (emailValue) => {
            setEmail(emailValue);
            setMessage(`Reset link sent to ${emailValue}`);
          }}
          onSubmitReset={async () => {
            setMessage('Password reset successfully!');
          }}
          onBackToLogin={() => {
            setMessage('Returning to login...');
          }}
          showStrength={true}
        />

        {message && (
          <div style={{
            marginTop: '1rem',
            padding: '0.75rem',
            backgroundColor: '#f0fdf4',
            border: '1px solid #dcfce7',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
            color: '#065f46',
          }}>
            {message}
          </div>
        )}
      </div>
    );
  },
};

/**
 * Inline help and guidance
 */
export const WithGuidance: Story = {
  render: () => (
    <div style={{ width: '450px' }}>
      <div style={{
        marginBottom: '1.5rem',
        padding: '1rem',
        backgroundColor: '#dbeafe',
        border: '1px solid #bfdbfe',
        borderRadius: '0.375rem',
        fontSize: '0.875rem',
        color: '#0c4a6e',
      }}>
        <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>Password Reset Process:</p>
        <ol style={{ margin: 0, paddingLeft: '1.25rem' }}>
          <li>Enter your email address</li>
          <li>Check your email for the reset token</li>
          <li>Enter the token and create a new password</li>
          <li>Sign in with your new password</li>
        </ol>
      </div>

      <ForgotPasswordForm
        policy={standardPolicy}
        onSubmitEmail={fn()}
        onSubmitReset={fn()}
        onBackToLogin={fn()}
        showStrength={true}
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
    policy: standardPolicy,
    onSubmitEmail: fn(),
    onSubmitReset: fn(),
    onBackToLogin: fn(),
    loading: false,
    showStrength: true,
  },
};

/**
 * Login context
 */
export const LoginPageContext: Story = {
  render: () => (
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        backgroundColor: '#ffffff',
        borderRadius: '0.75rem',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '1.5rem' }}>Reset Password</h1>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>
            Forgot your password? We'll help you reset it.
          </p>
        </div>

        <ForgotPasswordForm
          policy={standardPolicy}
          onSubmitEmail={fn()}
          onSubmitReset={fn()}
          onBackToLogin={fn()}
          showStrength={true}
        />
      </div>
    </div>
  ),
};

/**
 * Custom styling
 */
export const CustomClass: Story = {
  args: {
    policy: standardPolicy,
    onSubmitEmail: fn(),
    onSubmitReset: fn(),
    className: 'custom-forgot-password-form',
    showStrength: true,
  },
  render: (args) => (
    <div style={{ width: '450px' }}>
      <ForgotPasswordForm {...args} />
      <style>{`
        .custom-forgot-password-form {
          padding: 1.5rem;
          background: linear-gradient(135deg, #f0f9ff 0%, #f0fdf4 100%);
          border-radius: 0.75rem;
          border: 2px solid #3b82f6;
        }
      `}</style>
    </div>
  ),
};

/**
 * Policy comparison
 */
export const PolicyComparison: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', width: '900px' }}>
      <div>
        <h4 style={{ marginTop: 0 }}>Standard Policy</h4>
        <ForgotPasswordForm
          policy={standardPolicy}
          onSubmitEmail={fn()}
          onSubmitReset={fn()}
          onBackToLogin={fn()}
          showStrength={true}
        />
      </div>
      <div>
        <h4 style={{ marginTop: 0 }}>Strict Policy</h4>
        <ForgotPasswordForm
          policy={strictPolicy}
          onSubmitEmail={fn()}
          onSubmitReset={fn()}
          onBackToLogin={fn()}
          showStrength={true}
        />
      </div>
    </div>
  ),
};

/**
 * Error recovery flow
 */
export const ErrorRecovery: Story = {
  render: () => {
    const [error, setError] = useState<string>();
    const [attempts, setAttempts] = useState(0);

    const handleSubmit = async () => {
      setAttempts(attempts + 1);
      if (attempts === 0) {
        setError('Invalid token. Please try again.');
      } else if (attempts === 1) {
        setError(undefined);
      }
    };

    return (
      <div style={{ width: '450px' }}>
        {attempts > 1 && (
          <div style={{
            marginBottom: '1rem',
            padding: '1rem',
            backgroundColor: '#f0fdf4',
            border: '1px solid #dcfce7',
            borderRadius: '0.375rem',
            color: '#065f46',
            fontSize: '0.875rem',
          }}>
            ✓ Recovery successful! Redirecting to login...
          </div>
        )}

        <ForgotPasswordForm
          policy={standardPolicy}
          onSubmitEmail={handleSubmit}
          onSubmitReset={handleSubmit}
          error={error}
          showStrength={true}
        />

        {error && attempts < 2 && (
          <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#6b7280', textAlign: 'center' }}>
            Try submitting again to recover...
          </p>
        )}
      </div>
    );
  },
};

/**
 * Accessibility focused
 */
export const AccessibilityFocused: Story = {
  args: {
    policy: standardPolicy,
    onSubmitEmail: fn(),
    onSubmitReset: fn(),
    onBackToLogin: fn(),
    showStrength: true,
  },
  render: (args) => (
    <div style={{ width: '450px' }}>
      <h1>Forgot Your Password?</h1>
      <p>
        We'll help you reset your password. Follow the steps below to create a new password for your account.
      </p>
      <ForgotPasswordForm {...args} />
    </div>
  ),
};
