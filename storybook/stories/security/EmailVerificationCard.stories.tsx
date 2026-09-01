// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { fn } from '@storybook/test';
import { useState } from 'react';
import { EmailVerificationCard } from '@waysnx/ui-security';

const meta = {
  title: 'Security/Verification/EmailVerificationCard',
  component: EmailVerificationCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    email: {
      control: 'text',
      description: 'Email address to verify',
    },
    title: {
      control: 'text',
      description: 'Card title',
    },
    description: {
      control: 'text',
      description: 'Card description',
    },
    onVerify: {
      description: 'Callback when code is verified',
    },
    onResend: {
      description: 'Callback when resend is clicked',
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
    resendCountdown: {
      control: { type: 'range', min: 10, max: 120, step: 10 },
      description: 'Resend countdown in seconds',
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
} satisfies Meta<typeof EmailVerificationCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic email verification
 */
export const Basic: Story = {
  args: {
    email: 'user@example.com',
    onVerify: fn(),
    onResend: fn(),
  },
};

/**
 * With description
 */
export const WithDescription: Story = {
  args: {
    email: 'user@example.com',
    title: 'Verify Email Address',
    description: 'We sent a verification code to your email. Enter it below to confirm your email address.',
    onVerify: fn(),
    onResend: fn(),
  },
};

/**
 * With error
 */
export const WithError: Story = {
  args: {
    email: 'user@example.com',
    error: 'Invalid verification code. Please try again.',
    onVerify: fn(),
    onResend: fn(),
  },
};

/**
 * With success
 */
export const WithSuccess: Story = {
  args: {
    email: 'user@example.com',
    success: 'Email verified successfully!',
    onVerify: fn(),
    onResend: fn(),
  },
};

/**
 * Loading state
 */
export const Loading: Story = {
  args: {
    email: 'user@example.com',
    loading: true,
    onVerify: fn(),
    onResend: fn(),
  },
};

/**
 * Interactive verification flow
 */
export const Interactive: Story = {
  render: (args) => {
    const [error, setError] = useState<string>();
    const [success, setSuccess] = useState<string>();
    const [attempts, setAttempts] = useState(0);

    return (
      <EmailVerificationCard
        {...args}
        email="user@example.com"
        onVerify={async (code) => {
          setAttempts(attempts + 1);
          if (code === '123456') {
            setSuccess('Email verified successfully!');
            setError(undefined);
          } else if (attempts < 2) {
            setError('Invalid code. Please try again.');
          } else {
            setError('Too many attempts. Request a new code.');
          }
        }}
        onResend={() => {
          setError(undefined);
          setAttempts(0);
        }}
        error={error}
        success={success}
      />
    );
  },
};

/**
 * Test hint: Use code 123456
 */
export const WithTestHint: Story = {
  render: (args) => (
    <div style={{ width: '450px' }}>
      <EmailVerificationCard
        {...args}
        email="user@example.com"
        onVerify={fn()}
        onResend={fn()}
      />
      <div style={{
        marginTop: '1rem',
        padding: '0.75rem',
        backgroundColor: '#f0f9ff',
        borderRadius: '0.375rem',
        fontSize: '0.875rem',
        color: '#0c4a6e',
      }}>
        <p style={{ margin: '0 0 0.25rem 0', fontWeight: 'bold' }}>💡 Test:</p>
        <p style={{ margin: 0 }}>Try entering: 123456</p>
      </div>
    </div>
  ),
};

/**
 * Different email formats
 */
export const EmailVariations: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', width: '900px' }}>
      <div>
        <h4 style={{ marginTop: 0 }}>Standard Email</h4>
        <EmailVerificationCard
          email="user@example.com"
          onVerify={fn()}
          onResend={fn()}
        />
      </div>
      <div>
        <h4 style={{ marginTop: 0 }}>Long Email</h4>
        <EmailVerificationCard
          email="verylongemailaddress.with.many.dots@verylongcompanydomain.com"
          onVerify={fn()}
          onResend={fn()}
        />
      </div>
      <div>
        <h4 style={{ marginTop: 0 }}>Short Email</h4>
        <EmailVerificationCard
          email="me@ab.co"
          onVerify={fn()}
          onResend={fn()}
        />
      </div>
      <div>
        <h4 style={{ marginTop: 0 }}>Business Email</h4>
        <EmailVerificationCard
          email="john.smith@company.co.uk"
          onVerify={fn()}
          onResend={fn()}
        />
      </div>
    </div>
  ),
};

/**
 * Signup flow context
 */
export const SignupContext: Story = {
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
      }}>
        <EmailVerificationCard
          email="newuser@example.com"
          title="Verify Your Email"
          description="We sent a verification link to your email. Enter the code below."
          onVerify={fn()}
          onResend={fn()}
          resendCountdown={60}
        />
      </div>
    </div>
  ),
};

/**
 * Error recovery
 */
export const ErrorRecovery: Story = {
  render: () => {
    const [error, setError] = useState<string>();
    const [step, setStep] = useState<'error' | 'success'>('error');

    return (
      <div style={{ width: '450px' }}>
        <EmailVerificationCard
          email="user@example.com"
          onVerify={async () => {
            setStep('success');
            setError(undefined);
          }}
          onResend={() => {
            setError(undefined);
          }}
          error={step === 'error' ? 'Verification code expired. Please request a new one.' : undefined}
          success={step === 'success' ? 'Email verified!' : undefined}
        />
      </div>
    );
  },
};

/**
 * Different countdown times
 */
export const CountdownVariations: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', width: '900px' }}>
      <div>
        <h4 style={{ marginTop: 0 }}>30s Countdown</h4>
        <EmailVerificationCard
          email="user@example.com"
          resendCountdown={30}
          onVerify={fn()}
          onResend={fn()}
        />
      </div>
      <div>
        <h4 style={{ marginTop: 0 }}>60s Countdown</h4>
        <EmailVerificationCard
          email="user@example.com"
          resendCountdown={60}
          onVerify={fn()}
          onResend={fn()}
        />
      </div>
      <div>
        <h4 style={{ marginTop: 0 }}>90s Countdown</h4>
        <EmailVerificationCard
          email="user@example.com"
          resendCountdown={90}
          onVerify={fn()}
          onResend={fn()}
        />
      </div>
      <div>
        <h4 style={{ marginTop: 0 }}>120s Countdown</h4>
        <EmailVerificationCard
          email="user@example.com"
          resendCountdown={120}
          onVerify={fn()}
          onResend={fn()}
        />
      </div>
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
    email: 'user@example.com',
    title: 'Verify Email',
    onVerify: fn(),
    onResend: fn(),
  },
};

/**
 * Dark mode
 */
export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  args: {
    email: 'user@example.com',
    title: 'Verify Email',
    onVerify: fn(),
    onResend: fn(),
  },
  render: (args) => (
    <div style={{ background: '#1f2937', padding: '2rem', borderRadius: '0.5rem', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <EmailVerificationCard {...args} />
    </div>
  ),
};

/**
 * Minimal version
 */
export const Minimal: Story = {
  args: {
    email: 'user@example.com',
    onVerify: fn(),
    onResend: fn(),
  },
};

/**
 * Full featured
 */
export const FullFeatured: Story = {
  args: {
    email: 'user@example.com',
    title: 'Verify Email Address',
    description: 'We sent a verification code to your email address. Enter it below to complete verification.',
    onVerify: fn(),
    onResend: fn(),
    resendCountdown: 60,
  },
};

/**
 * Accessibility focused
 */
export const Accessible: Story = {
  args: {
    email: 'user@example.com',
    title: 'Verify Your Email Address',
    description: 'We sent a verification code to your email. Check your inbox and enter the code below. If you do not see the email, check your spam folder.',
    onVerify: fn(),
    onResend: fn(),
  },
};
