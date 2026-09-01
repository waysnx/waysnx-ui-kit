// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { fn } from '@storybook/test';
import { useState } from 'react';
import { OTPResendButton } from '@waysnx/ui-security';

const meta = {
  title: 'Security/OTP/OTPResendButton',
  component: OTPResendButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    initialCountdown: {
      control: { type: 'range', min: 10, max: 120, step: 10 },
      description: 'Initial countdown in seconds',
    },
    onResend: {
      description: 'Callback when resend is clicked',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    countdownText: {
      control: 'text',
      description: 'Text during countdown (use {seconds})',
    },
    resendText: {
      control: 'text',
      description: 'Resend button text',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost'],
      description: 'Button variant',
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
} satisfies Meta<typeof OTPResendButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic resend button
 */
export const Basic: Story = {
  args: {
    initialCountdown: 60,
    onResend: fn(),
    loading: false,
    disabled: false,
  },
};

/**
 * With custom countdown text
 */
export const CustomCountdownText: Story = {
  args: {
    initialCountdown: 60,
    onResend: fn(),
    countdownText: 'Try again in {seconds}s',
    resendText: 'Resend Code',
    loading: false,
    disabled: false,
  },
};

/**
 * Short countdown (10 seconds)
 */
export const ShortCountdown: Story = {
  args: {
    initialCountdown: 10,
    onResend: fn(),
    loading: false,
    disabled: false,
  },
};

/**
 * Long countdown (120 seconds)
 */
export const LongCountdown: Story = {
  args: {
    initialCountdown: 120,
    onResend: fn(),
    loading: false,
    disabled: false,
  },
};

/**
 * Loading state
 */
export const Loading: Story = {
  args: {
    initialCountdown: 60,
    onResend: fn(),
    loading: true,
    disabled: false,
  },
};

/**
 * Disabled state
 */
export const Disabled: Story = {
  args: {
    initialCountdown: 60,
    onResend: fn(),
    loading: false,
    disabled: true,
  },
};

/**
 * Primary variant
 */
export const Primary: Story = {
  args: {
    initialCountdown: 60,
    onResend: fn(),
    loading: false,
    disabled: false,
    variant: 'primary',
  },
};

/**
 * Secondary variant
 */
export const Secondary: Story = {
  args: {
    initialCountdown: 60,
    onResend: fn(),
    loading: false,
    disabled: false,
    variant: 'secondary',
  },
};

/**
 * Outline variant
 */
export const Outline: Story = {
  args: {
    initialCountdown: 60,
    onResend: fn(),
    loading: false,
    disabled: false,
    variant: 'outline',
  },
};

/**
 * Ghost variant
 */
export const Ghost: Story = {
  args: {
    initialCountdown: 60,
    onResend: fn(),
    loading: false,
    disabled: false,
    variant: 'ghost',
  },
};

/**
 * Interactive countdown
 */
export const InteractiveCountdown: Story = {
  render: (args) => {
    const [countdown, setCountdown] = useState<number | null>(null);
    const [isActive, setIsActive] = useState(false);
    const [attempts, setAttempts] = useState(0);

    const handleResend = async () => {
      setAttempts(attempts + 1);
      args.onResend();
    };

    return (
      <div style={{ width: '400px', padding: '2rem', backgroundColor: '#f9fafb', borderRadius: '0.75rem' }}>
        <h3 style={{ marginTop: 0 }}>Resend OTP Code</h3>
        <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
          Click the button below to request a new verification code.
        </p>

        <OTPResendButton
          {...args}
          initialCountdown={60}
          onResend={handleResend}
        />

        <div style={{
          marginTop: '1rem',
          padding: '0.75rem',
          backgroundColor: '#f0f9ff',
          borderRadius: '0.375rem',
          fontSize: '0.875rem',
          color: '#0c4a6e',
        }}>
          <p style={{ margin: 0 }}>Resend attempts: {attempts}</p>
        </div>
      </div>
    );
  },
};

/**
 * All variants comparison
 */
export const VariantsComparison: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', width: '600px' }}>
      <div>
        <h4 style={{ marginTop: 0 }}>Primary</h4>
        <OTPResendButton
          initialCountdown={60}
          onResend={fn()}
          variant="primary"
        />
      </div>
      <div>
        <h4 style={{ marginTop: 0 }}>Secondary</h4>
        <OTPResendButton
          initialCountdown={60}
          onResend={fn()}
          variant="secondary"
        />
      </div>
      <div>
        <h4 style={{ marginTop: 0 }}>Outline</h4>
        <OTPResendButton
          initialCountdown={60}
          onResend={fn()}
          variant="outline"
        />
      </div>
      <div>
        <h4 style={{ marginTop: 0 }}>Ghost</h4>
        <OTPResendButton
          initialCountdown={60}
          onResend={fn()}
          variant="ghost"
        />
      </div>
    </div>
  ),
};

/**
 * Different countdown durations
 */
export const CountdownDurations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '400px' }}>
      <div>
        <h4 style={{ marginTop: 0 }}>10 Seconds</h4>
        <OTPResendButton
          initialCountdown={10}
          onResend={fn()}
        />
      </div>
      <div>
        <h4 style={{ marginTop: 0 }}>30 Seconds</h4>
        <OTPResendButton
          initialCountdown={30}
          onResend={fn()}
        />
      </div>
      <div>
        <h4 style={{ marginTop: 0 }}>60 Seconds</h4>
        <OTPResendButton
          initialCountdown={60}
          onResend={fn()}
        />
      </div>
      <div>
        <h4 style={{ marginTop: 0 }}>120 Seconds</h4>
        <OTPResendButton
          initialCountdown={120}
          onResend={fn()}
        />
      </div>
    </div>
  ),
};

/**
 * With completion callback
 */
export const WithCompletionCallback: Story = {
  render: (args) => {
    const [completed, setCompleted] = useState(false);

    return (
      <div style={{ width: '400px' }}>
        <OTPResendButton
          {...args}
          initialCountdown={20}
          onResend={fn()}
          onCountdownComplete={() => {
            setCompleted(true);
            args.onCountdownComplete?.();
          }}
        />

        {completed && (
          <div style={{
            marginTop: '1rem',
            padding: '0.75rem',
            backgroundColor: '#f0fdf4',
            border: '1px solid #dcfce7',
            borderRadius: '0.375rem',
            color: '#065f46',
            fontSize: '0.875rem',
            fontWeight: 'bold',
          }}>
            ✓ Countdown complete! You can resend again.
          </div>
        )}
      </div>
    );
  },
};

/**
 * Multiple resend cycles
 */
export const MultipleResendCycles: Story = {
  render: () => {
    const [resendCount, setResendCount] = useState(0);

    return (
      <div style={{ width: '400px', padding: '2rem', backgroundColor: '#f9fafb', borderRadius: '0.75rem' }}>
        <h3 style={{ marginTop: 0 }}>OTP Resend Counter</h3>
        <p style={{ color: '#6b7280', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
          Try clicking resend multiple times to see how it cycles through countdowns.
        </p>

        <OTPResendButton
          initialCountdown={15}
          onResend={() => setResendCount(resendCount + 1)}
        />

        <div style={{
          marginTop: '1rem',
          padding: '0.75rem',
          backgroundColor: '#dbeafe',
          borderRadius: '0.375rem',
          fontSize: '0.875rem',
          color: '#0c4a6e',
        }}>
          <p style={{ margin: 0, fontWeight: 'bold' }}>Resend Count: {resendCount}</p>
        </div>
      </div>
    );
  },
};

/**
 * OTP verification flow context
 */
export const VerificationFlowContext: Story = {
  render: () => (
    <div style={{ width: '450px', padding: '2rem', backgroundColor: '#f9fafb', borderRadius: '0.75rem' }}>
      <h2 style={{ marginTop: 0 }}>Verify Your Email</h2>
      <p style={{ color: '#6b7280', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
        We've sent a verification code to <strong>user@example.com</strong>. Enter the code below and click verify.
      </p>

      <div style={{
        padding: '1rem',
        backgroundColor: '#ffffff',
        borderRadius: '0.375rem',
        marginBottom: '1.5rem',
        border: '1px solid #e5e7eb',
      }}>
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          justifyContent: 'center',
          marginBottom: '1rem',
        }}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <input
              key={i}
              type="text"
              maxLength={1}
              style={{
                width: '2.5rem',
                height: '2.5rem',
                textAlign: 'center',
                fontSize: '1.25rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
              }}
              placeholder="•"
            />
          ))}
        </div>
        <button
          style={{
            width: '100%',
            padding: '0.5rem',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          Verify Code
        </button>
      </div>

      <div style={{ textAlign: 'center' }}>
        <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', color: '#6b7280' }}>
          Didn't receive the code?
        </p>
        <OTPResendButton
          initialCountdown={60}
          onResend={fn()}
          variant="secondary"
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
    initialCountdown: 60,
    onResend: fn(),
    loading: false,
    disabled: false,
  },
};

/**
 * Custom text examples
 */
export const CustomTextExamples: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '400px' }}>
      <div>
        <h4 style={{ marginTop: 0 }}>Default Text</h4>
        <OTPResendButton initialCountdown={20} onResend={fn()} />
      </div>
      <div>
        <h4 style={{ marginTop: 0 }}>Custom Countdown</h4>
        <OTPResendButton
          initialCountdown={20}
          onResend={fn()}
          countdownText="Wait {seconds}s before resending"
        />
      </div>
      <div>
        <h4 style={{ marginTop: 0 }}>Custom Label</h4>
        <OTPResendButton
          initialCountdown={20}
          onResend={fn()}
          resendText="Send Code Again"
        />
      </div>
      <div>
        <h4 style={{ marginTop: 0 }}>Both Custom</h4>
        <OTPResendButton
          initialCountdown={20}
          onResend={fn()}
          countdownText="Try again in {seconds}s"
          resendText="Request New Code"
        />
      </div>
    </div>
  ),
};

/**
 * Loading with countdown
 */
export const LoadingState: Story = {
  render: () => {
    const [isLoading, setIsLoading] = useState(false);

    return (
      <div style={{ width: '400px' }}>
        <OTPResendButton
          initialCountdown={60}
          loading={isLoading}
          onResend={async () => {
            setIsLoading(true);
            await new Promise(resolve => setTimeout(resolve, 2000));
            setIsLoading(false);
          }}
        />
        {isLoading && (
          <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#6b7280', textAlign: 'center' }}>
            Sending code...
          </p>
        )}
      </div>
    );
  },
};

/**
 * Accessibility focused
 */
export const Accessible: Story = {
  args: {
    initialCountdown: 60,
    onResend: fn(),
    resendText: 'Send Verification Code Again',
    countdownText: 'Send new code in {seconds} seconds',
    loading: false,
    disabled: false,
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
    initialCountdown: 60,
    onResend: fn(),
    loading: false,
    disabled: false,
    variant: 'primary',
  },
  render: (args) => (
    <div style={{ background: '#1f2937', padding: '2rem', borderRadius: '0.5rem', width: '400px' }}>
      <OTPResendButton {...args} />
    </div>
  ),
};

/**
 * Minimal styling
 */
export const Minimal: Story = {
  args: {
    initialCountdown: 60,
    onResend: fn(),
    variant: 'ghost',
  },
};

/**
 * Full featured
 */
export const FullFeatured: Story = {
  args: {
    initialCountdown: 60,
    onResend: fn(),
    countdownText: 'Resend code in {seconds}s',
    resendText: 'Resend Verification Code',
    variant: 'primary',
    onCountdownComplete: fn(),
  },
};
