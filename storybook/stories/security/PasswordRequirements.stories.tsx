// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { useState } from 'react';
import { PasswordRequirements } from '@waysnx/ui-security';
import type { PasswordPolicy } from '@waysnx/ui-security';

const basicPolicy: PasswordPolicy = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: false,
};

const strictPolicy: PasswordPolicy = {
  minLength: 12,
  maxLength: 128,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
};

const lenientPolicy: PasswordPolicy = {
  minLength: 6,
  requireUppercase: false,
  requireLowercase: true,
  requireNumbers: false,
  requireSpecialChars: false,
};

const customPolicy: PasswordPolicy = {
  minLength: 10,
  maxLength: 64,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
};

const meta = {
  title: 'Security/Password/PasswordRequirements',
  component: PasswordRequirements,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    password: {
      control: 'text',
      description: 'Password to validate',
    },
    policy: {
      control: 'object',
      description: 'Password policy',
    },
    showTitle: {
      control: 'boolean',
      description: 'Show title',
    },
    title: {
      control: 'text',
      description: 'Title text',
    },
    compact: {
      control: 'boolean',
      description: 'Compact mode',
    },
    showMet: {
      control: 'boolean',
      description: 'Show met requirements',
    },
    animated: {
      control: 'boolean',
      description: 'Animated transitions',
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
} satisfies Meta<typeof PasswordRequirements>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Empty password - no requirements met
 */
export const Empty: Story = {
  args: {
    password: '',
    policy: basicPolicy,
    showTitle: true,
    showMet: true,
    compact: false,
    animated: true,
  },
};

/**
 * Partial match - some requirements met
 */
export const PartialMatch: Story = {
  args: {
    password: 'Password',
    policy: basicPolicy,
    showTitle: true,
    showMet: true,
    compact: false,
    animated: true,
  },
};

/**
 * Complete match - all requirements met
 */
export const CompleteMatch: Story = {
  args: {
    password: 'Password123',
    policy: basicPolicy,
    showTitle: true,
    showMet: true,
    compact: false,
    animated: true,
  },
};

/**
 * Strict policy
 */
export const StrictPolicy: Story = {
  args: {
    password: 'Password123!@',
    policy: strictPolicy,
    showTitle: true,
    showMet: true,
    compact: false,
    animated: true,
  },
};

/**
 * Lenient policy
 */
export const LenientPolicy: Story = {
  args: {
    password: 'password123',
    policy: lenientPolicy,
    showTitle: true,
    showMet: true,
    compact: false,
    animated: true,
  },
};

/**
 * Without title
 */
export const WithoutTitle: Story = {
  args: {
    password: 'Password123',
    policy: basicPolicy,
    showTitle: false,
    showMet: true,
    compact: false,
    animated: true,
  },
};

/**
 * Custom title
 */
export const CustomTitle: Story = {
  args: {
    password: 'Password123',
    policy: basicPolicy,
    showTitle: true,
    title: 'Security Requirements',
    showMet: true,
    compact: false,
    animated: true,
  },
};

/**
 * Compact mode
 */
export const CompactMode: Story = {
  args: {
    password: 'Password',
    policy: basicPolicy,
    showTitle: true,
    showMet: true,
    compact: true,
    animated: true,
  },
};

/**
 * Without met requirements
 */
export const WithoutMet: Story = {
  args: {
    password: 'Password',
    policy: basicPolicy,
    showTitle: true,
    showMet: false,
    compact: false,
    animated: true,
  },
};

/**
 * Without animations
 */
export const NoAnimation: Story = {
  args: {
    password: 'Password123',
    policy: basicPolicy,
    showTitle: true,
    showMet: true,
    compact: false,
    animated: false,
  },
};

/**
 * Policy with max length
 */
export const WithMaxLength: Story = {
  args: {
    password: 'MyPassword123',
    policy: strictPolicy,
    showTitle: true,
    showMet: true,
    compact: false,
    animated: true,
  },
};

/**
 * Exceeding max length
 */
export const ExceedMaxLength: Story = {
  args: {
    password: 'ThisPasswordIsWayTooLongAndExceedsTheMaximumLengthAllowedByThePolicy',
    policy: strictPolicy,
    showTitle: true,
    showMet: true,
    compact: false,
    animated: true,
  },
};

/**
 * Nearly valid password
 */
export const NearlyValid: Story = {
  args: {
    password: 'Password12',
    policy: basicPolicy,
    showTitle: true,
    showMet: true,
    compact: false,
    animated: true,
  },
};

/**
 * Complex password with special chars
 */
export const ComplexPassword: Story = {
  args: {
    password: 'SecureP@ss123!',
    policy: strictPolicy,
    showTitle: true,
    showMet: true,
    compact: false,
    animated: true,
  },
};

/**
 * All requirements comparison
 */
export const AllPolicies: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '400px' }}>
      <div>
        <h3 style={{ marginTop: 0 }}>Basic Requirements</h3>
        <PasswordRequirements password="Password123" policy={basicPolicy} />
      </div>
      <div>
        <h3 style={{ marginTop: 0 }}>Strict Requirements</h3>
        <PasswordRequirements password="SecureP@ss123!" policy={strictPolicy} />
      </div>
      <div>
        <h3 style={{ marginTop: 0 }}>Lenient Requirements</h3>
        <PasswordRequirements password="password123" policy={lenientPolicy} />
      </div>
    </div>
  ),
};

/**
 * Real-time validation feedback
 */
export const RealTimeValidation: Story = {
  render: () => {
    const [password, setPassword] = useState('');

    return (
      <div style={{ width: '450px' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 'bold' }}>
            Create a password (type to see real-time validation):
          </label>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Start typing..."
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              fontSize: '1rem',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <PasswordRequirements
          password={password}
          policy={basicPolicy}
          showTitle={true}
          showMet={true}
          animated={true}
        />

        {password && (
          <div style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: '#f0f9ff', borderRadius: '0.375rem', fontSize: '0.875rem' }}>
            <p style={{ margin: 0 }}>Try: <strong>Password123</strong> for a complete match</p>
          </div>
        )}
      </div>
    );
  },
};

/**
 * Progressive password strength
 */
export const ProgressiveStrength: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '450px' }}>
      <div style={{ padding: '1rem', backgroundColor: '#fef2f2', borderRadius: '0.375rem' }}>
        <h4 style={{ marginTop: 0, marginBottom: '0.5rem' }}>Too Weak</h4>
        <PasswordRequirements password="Pass" policy={basicPolicy} showTitle={false} />
      </div>
      <div style={{ padding: '1rem', backgroundColor: '#fffbeb', borderRadius: '0.375rem' }}>
        <h4 style={{ marginTop: 0, marginBottom: '0.5rem' }}>Weak</h4>
        <PasswordRequirements password="Password" policy={basicPolicy} showTitle={false} />
      </div>
      <div style={{ padding: '1rem', backgroundColor: '#f0fdf4', borderRadius: '0.375rem' }}>
        <h4 style={{ marginTop: 0, marginBottom: '0.5rem' }}>Strong</h4>
        <PasswordRequirements password="Password123" policy={basicPolicy} showTitle={false} />
      </div>
    </div>
  ),
};

/**
 * Compact form layout
 */
export const CompactForm: Story = {
  render: () => {
    const [password, setPassword] = useState('');

    return (
      <div style={{ width: '350px', padding: '1.5rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}>
        <h3 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '1.125rem' }}>Create Account</h3>
        
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 'bold' }}>
            Password
          </label>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div style={{ marginBottom: '1rem', padding: '0.75rem', backgroundColor: '#f9fafb', borderRadius: '0.375rem' }}>
          <PasswordRequirements
            password={password}
            policy={basicPolicy}
            showTitle={true}
            compact={true}
            showMet={true}
          />
        </div>

        <button
          style={{
            width: '100%',
            padding: '0.5rem',
            backgroundColor: password && password.length >= 8 ? '#3b82f6' : '#d1d5db',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
            fontWeight: 'bold',
            cursor: password && password.length >= 8 ? 'pointer' : 'not-allowed',
          }}
          disabled={!password || password.length < 8}
        >
          Create Account
        </button>
      </div>
    );
  },
};

/**
 * Multi-step form with requirements
 */
export const MultiStepForm: Story = {
  render: () => {
    const [step, setStep] = useState(1);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const meetsRequirements = password && password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password);
    const passwordsMatch = password === confirmPassword && password !== '';

    return (
      <div style={{ width: '450px', padding: '1.5rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}>
        <h3 style={{ marginTop: 0, marginBottom: '1.5rem' }}>Password Reset</h3>

        {step === 1 && (
          <div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 'bold' }}>
                New Password
              </label>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  fontSize: '1rem',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <PasswordRequirements
              password={password}
              policy={basicPolicy}
              showTitle={true}
              showMet={true}
              animated={true}
            />

            <button
              onClick={() => setStep(2)}
              disabled={!meetsRequirements}
              style={{
                marginTop: '1rem',
                width: '100%',
                padding: '0.5rem',
                backgroundColor: meetsRequirements ? '#3b82f6' : '#d1d5db',
                color: 'white',
                border: 'none',
                borderRadius: '0.375rem',
                fontWeight: 'bold',
                cursor: meetsRequirements ? 'pointer' : 'not-allowed',
              }}
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 'bold' }}>
                Confirm Password
              </label>
              <input
                type="text"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  fontSize: '1rem',
                  boxSizing: 'border-box',
                  borderColor: confirmPassword && !passwordsMatch ? '#ef4444' : '#d1d5db',
                }}
              />
              {confirmPassword && !passwordsMatch && (
                <p style={{ marginTop: '0.5rem', color: '#ef4444', fontSize: '0.875rem' }}>
                  Passwords do not match
                </p>
              )}
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => { setStep(1); setConfirmPassword(''); }}
                style={{
                  flex: 1,
                  padding: '0.5rem',
                  backgroundColor: '#e5e7eb',
                  color: '#1f2937',
                  border: 'none',
                  borderRadius: '0.375rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                Back
              </button>
              <button
                disabled={!passwordsMatch}
                style={{
                  flex: 1,
                  padding: '0.5rem',
                  backgroundColor: passwordsMatch ? '#22c55e' : '#d1d5db',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.375rem',
                  fontWeight: 'bold',
                  cursor: passwordsMatch ? 'pointer' : 'not-allowed',
                }}
              >
                Reset Password
              </button>
            </div>
          </div>
        )}
      </div>
    );
  },
};

/**
 * Inline requirements display
 */
export const InlineDisplay: Story = {
  args: {
    password: 'Password123',
    policy: basicPolicy,
    showTitle: false,
    showMet: true,
    compact: true,
    animated: true,
  },
};

/**
 * Custom class styling
 */
export const CustomClass: Story = {
  args: {
    password: 'Password123',
    policy: basicPolicy,
    showTitle: true,
    showMet: true,
    compact: false,
    animated: true,
    className: 'custom-requirements',
  },
  render: (args) => (
    <div style={{ width: '400px' }}>
      <PasswordRequirements {...args} />
      <style>{`
        .custom-requirements {
          padding: 1rem;
          background: linear-gradient(135deg, #f0f9ff 0%, #f0fdf4 100%);
          border-radius: 0.5rem;
          border: 1px solid #e0f2fe;
        }
      `}</style>
    </div>
  ),
};

/**
 * Side by side comparison
 */
export const Comparison: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', width: '800px' }}>
      <div>
        <h3 style={{ marginTop: 0 }}>Current (Weak)</h3>
        <PasswordRequirements password="weak" policy={basicPolicy} />
      </div>
      <div>
        <h3 style={{ marginTop: 0 }}>Desired (Strong)</h3>
        <PasswordRequirements password="Password123" policy={basicPolicy} />
      </div>
    </div>
  ),
};
