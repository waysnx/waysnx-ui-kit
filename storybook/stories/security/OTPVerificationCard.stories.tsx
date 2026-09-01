// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { fn } from '@storybook/test';
import { useState } from 'react';
import { OTPVerificationCard } from '@waysnx/ui-security';

const meta = {
  title: 'Security/OTP/OTPVerificationCard',
  component: OTPVerificationCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Card title',
    },
    description: {
      control: 'text',
      description: 'Card description',
    },
    otpLength: {
      control: { type: 'range', min: 4, max: 8, step: 1 },
      description: 'OTP length',
    },
    onVerify: {
      description: 'Callback when OTP is verified',
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
    maskedContact: {
      control: 'text',
      description: 'Masked email/phone',
    },
    placeholder: {
      control: 'text',
      description: 'OTP placeholder',
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
} satisfies Meta<typeof OTPVerificationCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic OTP verification card
 */
export const Basic: Story = {
  args: {
    title: 'Verify OTP',
    otpLength: 6,
    onVerify: fn(),
    onResend: fn(),
    loading: false,
  },
};

/**
 * With description
 */
export const WithDescription: Story = {
  args: {
    title: 'Verify OTP',
    description: 'Enter the 6-digit code we sent to your device',
    otpLength: 6,
    onVerify: fn(),
    onResend: fn(),
    loading: false,
  },
};

/**
 * With masked contact
 */
export const WithMaskedContact: Story = {
  args: {
    title: 'Verify Email',
    description: 'Enter the verification code',
    maskedContact: 'us****@example.com',
    otpLength: 6,
    onVerify: fn(),
    onResend: fn(),
    loading: false,
  },
};

/**
 * With error message
 */
export const WithError: Story = {
  args: {
    title: 'Verify OTP',
    description: 'Enter the 6-digit code',
    error: 'Invalid code. Please try again.',
    otpLength: 6,
    onVerify: fn(),
    onResend: fn(),
    loading: false,
  },
};

/**
 * With success message
 */
export const WithSuccess: Story = {
  args: {
    title: 'Verify OTP',
    description: 'Enter the 6-digit code',
    success: 'Verification successful! Redirecting...',
    otpLength: 6,
    onVerify: fn(),
    onResend: fn(),
    loading: false,
  },
};

/**
 * 4-digit PIN verification
 */
export const FourDigitPIN: Story = {
  args: {
    title: 'Enter PIN',
    description: 'Enter your 4-digit PIN',
    otpLength: 4,
    onVerify: fn(),
    onResend: fn(),
    loading: false,
  },
};

/**
 * Loading state
 */
export const Loading: Story = {
  args: {
    title: 'Verify OTP',
    description: 'Enter the code',
    otpLength: 6,
    onVerify: fn(),
    onResend: fn(),
    loading: true,
  },
};

/**
 * Email verification flow
 */
export const EmailVerification: Story = {
  args: {
    title: 'Verify Email Address',
    description: 'We sent a verification code to your email',
    maskedContact: 'john.doe@****.com',
    otpLength: 6,
    onVerify: fn(),
    onResend: fn(),
    resendCountdown: 60,
    loading: false,
  },
};

/**
 * Phone verification flow
 */
export const PhoneVerification: Story = {
  args: {
    title: 'Verify Phone Number',
    description: 'We sent a text message with a code',
    maskedContact: '+1 (***) ***-7890',
    otpLength: 6,
    onVerify: fn(),
    onResend: fn(),
    resendCountdown: 60,
    loading: false,
  },
};

/**
 * Interactive verification
 */
export const Interactive: Story = {
  render: (args) => {
    const [error, setError] = useState<string>();
    const [success, setSuccess] = useState<string>();
    const [attempts, setAttempts] = useState(0);

    const handleVerify = async (otp: string) => {
      setAttempts(attempts + 1);
      setError(undefined);
      setSuccess(undefined);

      if (otp === '123456') {
        setSuccess('Verification successful!');
      } else if (attempts < 2) {
        setError('Invalid code. Please try again.');
      } else {
        setError('Too many attempts. Please request a new code.');
      }
    };

    return (
      <OTPVerificationCard
        {...args}
        title="Verify Your Account"
        description="Enter the 6-digit code sent to your email"
        maskedContact="user@example.com"
        otpLength={6}
        onVerify={handleVerify}
        onResend={fn()}
        error={error}
        success={success}
      />
    );
  },
};

/**
 * Complete verification flow with states
 */
export const CompleteFlow: Story = {
  render: () => {
    const [step, setStep] = useState<'pending' | 'error' | 'success'>('pending');

    return (
      <OTPVerificationCard
        title="Complete Verification"
        description="Click verify to proceed through the flow"
        maskedContact="user@example.com"
        otpLength={6}
        onVerify={async () => {
          setStep('success');
        }}
        onResend={fn()}
        error={step === 'error' ? 'Invalid verification code' : undefined}
        success={step === 'success' ? 'Verification completed!' : undefined}
      />
    );
  },
};

/**
 * All lengths comparison
 */
export const LengthComparison: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', width: '900px' }}>
      <div>
        <h4 style={{ marginTop: 0 }}>4-Digit PIN</h4>
        <OTPVerificationCard
          title="Enter PIN"
          description="Enter your 4-digit PIN"
          otpLength={4}
          onVerify={fn()}
          onResend={fn()}
        />
      </div>
      <div>
        <h4 style={{ marginTop: 0 }}>6-Digit Code</h4>
        <OTPVerificationCard
          title="Verify Code"
          description="Enter the 6-digit code"
          otpLength={6}
          onVerify={fn()}
          onResend={fn()}
        />
      </div>
      <div>
        <h4 style={{ marginTop: 0 }}>8-Digit Code</h4>
        <OTPVerificationCard
          title="Security Code"
          description="Enter the 8-digit code"
          otpLength={8}
          onVerify={fn()}
          onResend={fn()}
        />
      </div>
    </div>
  ),
};

/**
 * Different countdown timers
 */
export const CountdownTimers: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', width: '900px' }}>
      <div>
        <h4 style={{ marginTop: 0 }}>30s Countdown</h4>
        <OTPVerificationCard
          title="Quick Verify"
          maskedContact="user@example.com"
          otpLength={6}
          onVerify={fn()}
          onResend={fn()}
          resendCountdown={30}
        />
      </div>
      <div>
        <h4 style={{ marginTop: 0 }}>60s Countdown</h4>
        <OTPVerificationCard
          title="Standard Verify"
          maskedContact="user@example.com"
          otpLength={6}
          onVerify={fn()}
          onResend={fn()}
          resendCountdown={60}
        />
      </div>
      <div>
        <h4 style={{ marginTop: 0 }}>90s Countdown</h4>
        <OTPVerificationCard
          title="Extended Verify"
          maskedContact="user@example.com"
          otpLength={6}
          onVerify={fn()}
          onResend={fn()}
          resendCountdown={90}
        />
      </div>
      <div>
        <h4 style={{ marginTop: 0 }}>120s Countdown</h4>
        <OTPVerificationCard
          title="Long Verify"
          maskedContact="user@example.com"
          otpLength={6}
          onVerify={fn()}
          onResend={fn()}
          resendCountdown={120}
        />
      </div>
    </div>
  ),
};

/**
 * Error recovery scenarios
 */
export const ErrorRecovery: Story = {
  render: () => {
    const [error, setError] = useState<string>();
    const [attempts, setAttempts] = useState(0);

    return (
      <div style={{ width: '450px' }}>
        <OTPVerificationCard
          title="Verify OTP"
          maskedContact="user@example.com"
          otpLength={6}
          onVerify={async (otp) => {
            setAttempts(attempts + 1);
            if (otp === '123456') {
              setError(undefined);
            } else if (attempts < 2) {
              setError('Incorrect code. Please try again.');
            } else {
              setError('Too many failed attempts. Request a new code.');
            }
          }}
          onResend={() => {
            setError(undefined);
            setAttempts(0);
          }}
          error={error}
        />
        <div style={{
          marginTop: '1rem',
          padding: '0.75rem',
          backgroundColor: '#f0f9ff',
          borderRadius: '0.375rem',
          fontSize: '0.875rem',
          color: '#0c4a6e',
        }}>
          <p style={{ margin: '0 0 0.25rem 0', fontWeight: 'bold' }}>Test Hint:</p>
          <p style={{ margin: 0 }}>Enter code: 123456 for success</p>
        </div>
      </div>
    );
  },
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
        <OTPVerificationCard
          title="Verify Email"
          description="We sent a verification code to your email address"
          maskedContact="newuser@example.com"
          otpLength={6}
          onVerify={fn()}
          onResend={fn()}
          resendCountdown={60}
        />
      </div>
    </div>
  ),
};

/**
 * Login/MFA context
 */
export const MFAContext: Story = {
  render: () => (
    <div style={{
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '450px',
        backgroundColor: '#ffffff',
        borderRadius: '0.75rem',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
        padding: '2rem',
      }}>
        <OTPVerificationCard
          title="Two-Factor Authentication"
          description="Enter the code from your authenticator app"
          maskedContact="+1 (***) ***-7890"
          otpLength={6}
          onVerify={fn()}
          onResend={fn()}
          resendCountdown={60}
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
    title: 'Verify Code',
    description: 'Enter the code sent to your device',
    maskedContact: 'user@example.com',
    otpLength: 6,
    onVerify: fn(),
    onResend: fn(),
    resendCountdown: 60,
  },
};

/**
 * Custom placeholder
 */
export const CustomPlaceholder: Story = {
  args: {
    title: 'Verify OTP',
    description: 'Enter the code',
    otpLength: 6,
    placeholder: '-',
    onVerify: fn(),
    onResend: fn(),
    loading: false,
  },
};

/**
 * Minimal display
 */
export const Minimal: Story = {
  args: {
    title: 'Verify',
    otpLength: 6,
    onVerify: fn(),
    onResend: fn(),
    loading: false,
  },
};

/**
 * Full featured with all options
 */
export const FullFeatured: Story = {
  args: {
    title: 'Verify Your Identity',
    description: 'We sent a verification code to your registered email and phone',
    maskedContact: 'user@example.com',
    otpLength: 6,
    onVerify: fn(),
    onResend: fn(),
    loading: false,
    resendCountdown: 60,
    placeholder: '•',
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
    title: 'Verify Code',
    description: 'Enter the verification code',
    maskedContact: 'user@example.com',
    otpLength: 6,
    onVerify: fn(),
    onResend: fn(),
  },
  render: (args) => (
    <div style={{ background: '#1f2937', padding: '2rem', borderRadius: '0.5rem', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <OTPVerificationCard {...args} />
    </div>
  ),
};

/**
 * Comparison: Different contact types
 */
export const ContactTypeComparison: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', width: '900px' }}>
      <div>
        <h4 style={{ marginTop: 0 }}>Email</h4>
        <OTPVerificationCard
          title="Verify Email"
          maskedContact="user@ex***.com"
          otpLength={6}
          onVerify={fn()}
          onResend={fn()}
        />
      </div>
      <div>
        <h4 style={{ marginTop: 0 }}>Phone (SMS)</h4>
        <OTPVerificationCard
          title="Verify Phone"
          maskedContact="+1 (***) ***-7890"
          otpLength={6}
          onVerify={fn()}
          onResend={fn()}
        />
      </div>
      <div>
        <h4 style={{ marginTop: 0 }}>Authenticator App</h4>
        <OTPVerificationCard
          title="Authenticator Code"
          description="Enter the 6-digit code from your app"
          otpLength={6}
          onVerify={fn()}
          onResend={fn()}
        />
      </div>
      <div>
        <h4 style={{ marginTop: 0 }}>Backup Code</h4>
        <OTPVerificationCard
          title="Enter Backup Code"
          description="Enter one of your backup codes"
          otpLength={8}
          onVerify={fn()}
          onResend={fn()}
        />
      </div>
    </div>
  ),
};

/**
 * Accessibility focused
 */
export const Accessible: Story = {
  args: {
    title: 'One-Time Password Verification',
    description: 'Enter the 6-digit code we sent to your email. If you did not receive it, you can request a new code.',
    maskedContact: 'user@example.com',
    otpLength: 6,
    onVerify: fn(),
    onResend: fn(),
    resendCountdown: 60,
  },
};
