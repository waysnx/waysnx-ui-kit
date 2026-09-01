// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { fn } from '@storybook/test';
import { useState } from 'react';
import { ChangePasswordForm } from '@waysnx/ui-security';
import type { ChangePassword } from '@waysnx/ui-security';
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
  title: 'Security/Authentication/ChangePasswordForm',
  component: ChangePasswordForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    policy: {
      control: 'object',
      description: 'Password policy',
    },
    onSubmit: {
      description: 'Callback when form is submitted',
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
} satisfies Meta<typeof ChangePasswordForm>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic change password form
 */
export const Basic: Story = {
  args: {
    policy: standardPolicy,
    onSubmit: fn(),
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
    onSubmit: fn(),
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
    onSubmit: fn(),
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
    onSubmit: fn(),
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
    onSubmit: fn(),
    loading: false,
    error: 'Current password is incorrect. Please try again.',
    showStrength: true,
  },
};

/**
 * With success message
 */
export const WithSuccess: Story = {
  args: {
    policy: standardPolicy,
    onSubmit: fn(),
    loading: false,
    success: 'Password changed successfully!',
    showStrength: true,
  },
};

/**
 * Loading state
 */
export const Loading: Story = {
  args: {
    policy: standardPolicy,
    onSubmit: fn(),
    loading: true,
    showStrength: true,
  },
};

/**
 * Interactive form
 */
export const Interactive: Story = {
  render: (args) => {
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string>();

    const handleSubmit = async (data: ChangePassword) => {
      // Simulate validation
      if (data.currentPassword === data.newPassword) {
        setError('New password must be different from current password');
      } else {
        setError(undefined);
        setSubmitted(true);
        args.onSubmit(data);
        setTimeout(() => setSubmitted(false), 3000);
      }
    };

    return (
      <div style={{ width: '450px' }}>
        <ChangePasswordForm
          {...args}
          onSubmit={handleSubmit}
          error={error}
          success={submitted ? 'Password changed successfully!' : undefined}
        />
      </div>
    );
  },
};

/**
 * Form with both error and success (sequential states)
 */
export const ErrorThenSuccess: Story = {
  render: () => {
    const [step, setStep] = useState<'error' | 'success'>('error');

    return (
      <div style={{ width: '450px' }}>
        <ChangePasswordForm
          policy={standardPolicy}
          onSubmit={async () => {
            // Simulate retry
            setTimeout(() => setStep('success'), 1000);
          }}
          error={step === 'error' ? 'An error occurred while changing your password' : undefined}
          success={step === 'success' ? 'Password changed successfully!' : undefined}
          showStrength={true}
        />
        {step === 'error' && (
          <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#6b7280', textAlign: 'center' }}>
            Try submitting again to see success state...
          </p>
        )}
      </div>
    );
  },
};

/**
 * Minimal form
 */
export const Minimal: Story = {
  args: {
    policy: standardPolicy,
    onSubmit: fn(),
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
    onSubmit: fn(),
    loading: false,
    error: undefined,
    success: undefined,
    showStrength: true,
  },
};

/**
 * With loading and error
 */
export const LoadingWithError: Story = {
  args: {
    policy: standardPolicy,
    onSubmit: fn(),
    loading: true,
    error: 'Network error. Please try again.',
    showStrength: true,
  },
};

/**
 * Complex validation scenario
 */
export const ValidationScenario: Story = {
  render: () => {
    const [error, setError] = useState<string>();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleSubmit = async (data: ChangePassword) => {
      const errors: string[] = [];

      if (!data.currentPassword) {
        errors.push('Current password is required');
      }

      if (!data.newPassword) {
        errors.push('New password is required');
      } else if (data.newPassword.length < 8) {
        errors.push('New password must be at least 8 characters');
      } else if (!/[A-Z]/.test(data.newPassword)) {
        errors.push('New password must contain uppercase letters');
      } else if (!/[0-9]/.test(data.newPassword)) {
        errors.push('New password must contain numbers');
      } else if (!/[!@#$%^&*]/.test(data.newPassword)) {
        errors.push('New password must contain special characters');
      }

      if (data.newPassword !== data.confirmPassword) {
        errors.push('Passwords do not match');
      }

      if (data.currentPassword === data.newPassword) {
        errors.push('New password must be different from current password');
      }

      if (errors.length > 0) {
        setError(errors[0]);
      } else {
        setError(undefined);
      }
    };

    return (
      <div style={{ width: '450px' }}>
        <ChangePasswordForm
          policy={standardPolicy}
          onSubmit={handleSubmit}
          error={error}
          showStrength={true}
        />
      </div>
    );
  },
};

/**
 * Multiple scenarios side-by-side
 */
export const ScenarioComparison: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', width: '900px' }}>
      <div>
        <h4 style={{ marginTop: 0 }}>Success State</h4>
        <ChangePasswordForm
          policy={standardPolicy}
          onSubmit={fn()}
          success="Password changed successfully!"
          showStrength={true}
        />
      </div>
      <div>
        <h4 style={{ marginTop: 0 }}>Error State</h4>
        <ChangePasswordForm
          policy={standardPolicy}
          onSubmit={fn()}
          error="Current password is incorrect"
          showStrength={true}
        />
      </div>
      <div>
        <h4 style={{ marginTop: 0 }}>Loading State</h4>
        <ChangePasswordForm
          policy={standardPolicy}
          onSubmit={fn()}
          loading={true}
          showStrength={true}
        />
      </div>
      <div>
        <h4 style={{ marginTop: 0 }}>Default State</h4>
        <ChangePasswordForm
          policy={standardPolicy}
          onSubmit={fn()}
          showStrength={true}
        />
      </div>
    </div>
  ),
};

/**
 * Settings page context
 */
export const SettingsPageContext: Story = {
  render: () => (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ marginTop: 0 }}>Account Settings</h1>
      <div style={{ marginBottom: '3rem', paddingBottom: '2rem', borderBottom: '1px solid #e5e7eb' }}>
        <h2 style={{ marginTop: 0, fontSize: '1.125rem' }}>Security</h2>
        <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
          Change your password regularly to keep your account secure.
        </p>
        <ChangePasswordForm
          policy={standardPolicy}
          onSubmit={async () => {
            // Handle password change
          }}
          showStrength={true}
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
    policy: standardPolicy,
    onSubmit: fn(),
    loading: false,
    showStrength: true,
  },
};

/**
 * Custom styling
 */
export const CustomClass: Story = {
  args: {
    policy: standardPolicy,
    onSubmit: fn(),
    className: 'custom-change-password-form',
    loading: false,
    showStrength: true,
  },
  render: (args) => (
    <div style={{ width: '450px' }}>
      <ChangePasswordForm {...args} />
      <style>{`
        .custom-change-password-form {
          padding: 1.5rem;
          background: linear-gradient(135deg, #f0f9ff 0%, #f0fdf4 100%);
          border-radius: 0.75rem;
          border: 1px solid #bfdbfe;
        }
      `}</style>
    </div>
  ),
};

/**
 * Policies comparison
 */
export const PoliciesComparison: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', width: '900px' }}>
      <div>
        <h4 style={{ marginTop: 0 }}>Standard Policy (8+ chars)</h4>
        <ChangePasswordForm
          policy={standardPolicy}
          onSubmit={fn()}
          showStrength={true}
        />
      </div>
      <div>
        <h4 style={{ marginTop: 0 }}>Strict Policy (12+ chars)</h4>
        <ChangePasswordForm
          policy={strictPolicy}
          onSubmit={fn()}
          showStrength={true}
        />
      </div>
    </div>
  ),
};

/**
 * Password strength progression
 */
export const StrengthProgression: Story = {
  render: () => {
    const [newPassword, setNewPassword] = useState('');

    return (
      <div style={{ width: '450px' }}>
        <ChangePasswordForm
          policy={standardPolicy}
          onSubmit={fn()}
          showStrength={true}
        />
        <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '0.375rem' }}>
          <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 'bold' }}>
            Tips for a strong password:
          </p>
          <ul style={{ margin: 0, paddingLeft: '1.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
            <li>Use at least 8 characters</li>
            <li>Include uppercase letters (A-Z)</li>
            <li>Include lowercase letters (a-z)</li>
            <li>Include numbers (0-9)</li>
            <li>Include special characters (!@#$%)</li>
          </ul>
        </div>
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
    onSubmit: fn(),
    loading: false,
    showStrength: true,
  },
  render: (args) => (
    <div style={{ width: '450px' }}>
      <h1>Change Password</h1>
      <p>Update your account password. Your new password must meet the security requirements shown below.</p>
      <ChangePasswordForm {...args} />
    </div>
  ),
};
