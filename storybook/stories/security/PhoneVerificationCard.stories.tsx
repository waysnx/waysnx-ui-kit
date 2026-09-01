// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { fn } from '@storybook/test';
import { useState } from 'react';
import { PhoneVerificationCard } from '@waysnx/ui-security';

const meta = {
  title: 'Security/Verification/PhoneVerificationCard',
  component: PhoneVerificationCard,
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
    step: {
      control: 'select',
      options: ['phone', 'otp'],
      description: 'Current step in flow',
    },
    onSubmitPhone: {
      description: 'Callback when phone is submitted',
    },
    onVerifyOTP: {
      description: 'Callback when OTP is verified',
    },
    onResendCode: {
      description: 'Callback when code is resent',
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
    phoneNumber: {
      control: 'text',
      description: 'Phone number for step 2',
    },
    otpLength: {
      control: { type: 'range', min: 4, max: 8, step: 1 },
      description: 'OTP length',
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
} satisfies Meta<typeof PhoneVerificationCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic phone verification - step 1
 */
export const BasicStep1: Story = {
  args: {
    title: 'Verify Phone Number',
    step: 'phone',
    onSubmitPhone: fn(),
    onVerifyOTP: fn(),
    onResendCode: fn(),
  },
};

/**
 * Phone verification - step 2 OTP
 */
export const Step2OTP: Story = {
  args: {
    title: 'Verify Phone Number',
    step: 'otp',
    phoneNumber: '1234567890',
    onSubmitPhone: fn(),
    onVerifyOTP: fn(),
    onResendCode: fn(),
  },
};

/**
 * With description
 */
export const WithDescription: Story = {
  args: {
    title: 'Verify Phone Number',
    description: 'Add your phone number for two-factor authentication and account recovery.',
    step: 'phone',
    onSubmitPhone: fn(),
    onVerifyOTP: fn(),
    onResendCode: fn(),
  },
};

/**
 * Interactive full flow
 */
export const InteractiveFlow: Story = {
  render: (args) => {
    const [step, setStep] = useState<'phone' | 'otp'>('phone');
    const [phone, setPhone] = useState('');
    const [phoneError, setPhoneError] = useState<string>();
    const [otpError, setOtpError] = useState<string>();
    const [attempts, setAttempts] = useState(0);

    return (
      <div style={{ width: '450px' }}>
        <div style={{
          marginBottom: '1rem',
          padding: '0.75rem',
          backgroundColor: '#f0f9ff',
          borderRadius: '0.375rem',
          fontSize: '0.875rem',
          color: '#0c4a6e',
        }}>
          <strong>Step {step === 'phone' ? '1' : '2'} of 2:</strong> {step === 'phone' ? 'Enter phone number' : 'Verify OTP'}
        </div>

        <PhoneVerificationCard
          {...args}
          step={step}
          phoneNumber={phone}
          onSubmitPhone={async (p) => {
            setPhone(p);
            setPhoneError(undefined);
            setStep('otp');
          }}
          onVerifyOTP={async (otp) => {
            setAttempts(attempts + 1);
            if (otp === '123456') {
              setOtpError(undefined);
            } else if (attempts < 1) {
              setOtpError('Invalid OTP. Try: 123456');
            } else {
              setOtpError('Too many attempts');
            }
          }}
          onResendCode={() => {
            setOtpError(undefined);
            setAttempts(0);
          }}
          error={phoneError || otpError}
        />
      </div>
    );
  },
};

/**
 * With error on step 1
 */
export const Step1WithError: Story = {
  args: {
    title: 'Verify Phone Number',
    step: 'phone',
    error: 'Phone number is invalid. Please check and try again.',
    onSubmitPhone: fn(),
    onVerifyOTP: fn(),
    onResendCode: fn(),
  },
};

/**
 * With error on step 2
 */
export const Step2WithError: Story = {
  args: {
    title: 'Verify Phone Number',
    step: 'otp',
    phoneNumber: '1234567890',
    error: 'Invalid verification code. Please try again.',
    onSubmitPhone: fn(),
    onVerifyOTP: fn(),
    onResendCode: fn(),
  },
};

/**
 * With success
 */
export const WithSuccess: Story = {
  args: {
    title: 'Verify Phone Number',
    step: 'otp',
    phoneNumber: '1234567890',
    success: 'Phone number verified successfully!',
    onSubmitPhone: fn(),
    onVerifyOTP: fn(),
    onResendCode: fn(),
  },
};

/**
 * Loading state
 */
export const Loading: Story = {
  args: {
    title: 'Verify Phone Number',
    step: 'phone',
    loading: true,
    onSubmitPhone: fn(),
    onVerifyOTP: fn(),
    onResendCode: fn(),
  },
};

/**
 * Different OTP lengths
 */
export const OTPLengths: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', width: '900px' }}>
      <div>
        <h4 style={{ marginTop: 0 }}>4-Digit PIN</h4>
        <PhoneVerificationCard
          title="Verify Phone"
          step="otp"
          phoneNumber="1234567890"
          otpLength={4}
          onSubmitPhone={fn()}
          onVerifyOTP={fn()}
          onResendCode={fn()}
        />
      </div>
      <div>
        <h4 style={{ marginTop: 0 }}>6-Digit Code</h4>
        <PhoneVerificationCard
          title="Verify Phone"
          step="otp"
          phoneNumber="1234567890"
          otpLength={6}
          onSubmitPhone={fn()}
          onVerifyOTP={fn()}
          onResendCode={fn()}
        />
      </div>
    </div>
  ),
};

/**
 * Account recovery context
 */
export const AccountRecovery: Story = {
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
        <PhoneVerificationCard
          title="Verify Your Phone"
          description="Verify your phone number to recover your account."
          step="phone"
          onSubmitPhone={fn()}
          onVerifyOTP={fn()}
          onResendCode={fn()}
        />
      </div>
    </div>
  ),
};

/**
 * 2FA setup context
 */
export const TwoFactorSetup: Story = {
  render: () => (
    <div style={{
      background: '#f9fafb',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '450px',
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Set Up Two-Factor Authentication</h1>
        <PhoneVerificationCard
          title="Add Your Phone Number"
          description="We'll send SMS codes to verify your identity for additional security."
          step="phone"
          onSubmitPhone={fn()}
          onVerifyOTP={fn()}
          onResendCode={fn()}
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
    title: 'Verify Phone',
    step: 'phone',
    onSubmitPhone: fn(),
    onVerifyOTP: fn(),
    onResendCode: fn(),
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
    title: 'Verify Phone',
    step: 'phone',
    onSubmitPhone: fn(),
    onVerifyOTP: fn(),
    onResendCode: fn(),
  },
  render: (args) => (
    <div style={{ background: '#1f2937', padding: '2rem', borderRadius: '0.5rem', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <PhoneVerificationCard {...args} />
    </div>
  ),
};

/**
 * Step comparison
 */
export const StepComparison: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', width: '900px' }}>
      <div>
        <h4 style={{ marginTop: 0 }}>Step 1: Phone Input</h4>
        <PhoneVerificationCard
          title="Verify Phone Number"
          step="phone"
          onSubmitPhone={fn()}
          onVerifyOTP={fn()}
          onResendCode={fn()}
        />
      </div>
      <div>
        <h4 style={{ marginTop: 0 }}>Step 2: OTP Verification</h4>
        <PhoneVerificationCard
          title="Verify Phone Number"
          step="otp"
          phoneNumber="1234567890"
          onSubmitPhone={fn()}
          onVerifyOTP={fn()}
          onResendCode={fn()}
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
    const [step, setStep] = useState<'error' | 'success'>('error');

    return (
      <div style={{ width: '450px' }}>
        <PhoneVerificationCard
          title="Verify Phone"
          step="otp"
          phoneNumber="1234567890"
          onSubmitPhone={fn()}
          onVerifyOTP={async () => {
            setStep('success');
            setError(undefined);
          }}
          onResendCode={() => {
            setError(undefined);
          }}
          error={step === 'error' ? 'Code expired. Please request a new one.' : undefined}
          success={step === 'success' ? 'Phone verified!' : undefined}
        />
      </div>
    );
  },
};

/**
 * Minimal version
 */
export const Minimal: Story = {
  args: {
    step: 'phone',
    onSubmitPhone: fn(),
    onVerifyOTP: fn(),
    onResendCode: fn(),
  },
};

/**
 * Full featured
 */
export const FullFeatured: Story = {
  args: {
    title: 'Add Your Phone Number',
    description: 'We will send you a verification code via SMS to confirm your phone number.',
    step: 'phone',
    otpLength: 6,
    resendCountdown: 60,
    onSubmitPhone: fn(),
    onVerifyOTP: fn(),
    onResendCode: fn(),
  },
};

/**
 * Accessibility focused
 */
export const Accessible: Story = {
  args: {
    title: 'Verify Your Phone Number',
    description: 'Enter your phone number and we will send you a verification code via SMS. You can use this number for account recovery and two-factor authentication.',
    step: 'phone',
    onSubmitPhone: fn(),
    onVerifyOTP: fn(),
    onResendCode: fn(),
  },
};
