// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { fn } from '@storybook/test';
import { useState } from 'react';
import { LoginForm } from '@waysnx/ui-security';
import type { LoginFormData } from '@waysnx/ui-security';

const meta = {
  title: 'Security/Authentication/LoginForm',
  component: LoginForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onSubmit: {
      description: 'Callback when form is submitted',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    isLoading: {
      control: 'boolean',
      description: 'Loading state',
    },
    showRememberMe: {
      control: 'boolean',
      description: 'Show remember me checkbox',
    },
    showTrustedDevice: {
      control: 'boolean',
      description: 'Show trusted device checkbox',
    },
    submitLabel: {
      control: 'text',
      description: 'Submit button label',
    },
    emailPlaceholder: {
      control: 'text',
      description: 'Email input placeholder',
    },
    passwordPlaceholder: {
      control: 'text',
      description: 'Password input placeholder',
    },
    onForgotPassword: {
      description: 'Callback when forgot password is clicked',
    },
    initialEmail: {
      control: 'text',
      description: 'Initial email value',
    },
    autoFocus: {
      control: 'boolean',
      description: 'Auto-focus email field',
    },
    helpText: {
      control: 'text',
      description: 'Help text above form',
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
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic login form
 */
export const Basic: Story = {
  args: {
    onSubmit: fn(),
    showRememberMe: true,
    showTrustedDevice: false,
    submitLabel: 'Sign In',
    emailPlaceholder: 'Email address',
    passwordPlaceholder: 'Password',
  },
};

/**
 * With remember me option
 */
export const WithRememberMe: Story = {
  args: {
    onSubmit: fn(),
    showRememberMe: true,
    showTrustedDevice: false,
    submitLabel: 'Sign In',
  },
};

/**
 * With trusted device option
 */
export const WithTrustedDevice: Story = {
  args: {
    onSubmit: fn(),
    showRememberMe: false,
    showTrustedDevice: true,
    submitLabel: 'Sign In',
  },
};

/**
 * With both remember me and trusted device
 */
export const WithBothOptions: Story = {
  args: {
    onSubmit: fn(),
    showRememberMe: true,
    showTrustedDevice: true,
    submitLabel: 'Sign In',
  },
};

/**
 * With forgot password link
 */
export const WithForgotPassword: Story = {
  args: {
    onSubmit: fn(),
    showRememberMe: true,
    showTrustedDevice: false,
    submitLabel: 'Sign In',
    onForgotPassword: fn(),
  },
};

/**
 * With error message
 */
export const WithError: Story = {
  args: {
    onSubmit: fn(),
    error: 'Invalid email or password. Please try again.',
    showRememberMe: true,
    showTrustedDevice: false,
    submitLabel: 'Sign In',
  },
};

/**
 * Loading state
 */
export const Loading: Story = {
  args: {
    onSubmit: fn(),
    isLoading: true,
    showRememberMe: true,
    showTrustedDevice: false,
    submitLabel: 'Sign In',
  },
};

/**
 * With initial email value
 */
export const WithInitialEmail: Story = {
  args: {
    onSubmit: fn(),
    initialEmail: 'user@example.com',
    showRememberMe: true,
    showTrustedDevice: false,
    submitLabel: 'Sign In',
  },
};

/**
 * Custom submit label
 */
export const CustomSubmitLabel: Story = {
  args: {
    onSubmit: fn(),
    submitLabel: 'Log In',
    showRememberMe: true,
    showTrustedDevice: false,
  },
};

/**
 * With help text
 */
export const WithHelpText: Story = {
  args: {
    onSubmit: fn(),
    helpText: 'Use your company email address to sign in.',
    showRememberMe: true,
    showTrustedDevice: false,
    submitLabel: 'Sign In',
  },
};

/**
 * Minimal form (no options)
 */
export const Minimal: Story = {
  args: {
    onSubmit: fn(),
    showRememberMe: false,
    showTrustedDevice: false,
    submitLabel: 'Sign In',
  },
};

/**
 * With validation error on email
 */
export const ValidationError: Story = {
  render: (args) => {
    const [error, setError] = useState<string | undefined>();

    const handleSubmit = async (data: LoginFormData) => {
      // Simulate validation
      if (!data.email) {
        setError('Email is required');
      } else if (!data.password) {
        setError('Password is required');
      } else {
        setError(undefined);
        args.onSubmit(data);
      }
    };

    return (
      <LoginForm
        {...args}
        onSubmit={handleSubmit}
        showRememberMe={true}
        showTrustedDevice={false}
      />
    );
  },
};

/**
 * Interactive login form
 */
export const Interactive: Story = {
  render: (args) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [trustedDevice, setTrustedDevice] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (data: LoginFormData) => {
      setSubmitted(true);
      args.onSubmit(data);
      setTimeout(() => setSubmitted(false), 3000);
    };

    return (
      <div style={{ width: '450px' }}>
        <LoginForm
          {...args}
          onSubmit={handleSubmit}
          showRememberMe={true}
          showTrustedDevice={true}
        />
        {submitted && (
          <div style={{
            marginTop: '1rem',
            padding: '1rem',
            backgroundColor: '#f0fdf4',
            border: '1px solid #dcfce7',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
            color: '#065f46',
          }}>
            <p style={{ margin: 0, fontWeight: 'bold' }}>✓ Form submitted successfully!</p>
          </div>
        )}
      </div>
    );
  },
};

/**
 * With pre-filled email
 */
export const PreFilledEmail: Story = {
  args: {
    onSubmit: fn(),
    initialEmail: 'john.doe@company.com',
    showRememberMe: true,
    showTrustedDevice: false,
    submitLabel: 'Sign In',
  },
};

/**
 * Enterprise login form
 */
export const EnterpriseForm: Story = {
  args: {
    onSubmit: fn(),
    showRememberMe: false,
    showTrustedDevice: true,
    submitLabel: 'Enterprise Sign In',
    emailPlaceholder: 'Corporate email',
    helpText: 'Sign in with your corporate email for 2FA verification.',
    onForgotPassword: fn(),
  },
};

/**
 * Mobile responsive
 */
export const MobileResponsive: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'iphone12',
    },
  },
  args: {
    onSubmit: fn(),
    showRememberMe: true,
    showTrustedDevice: false,
    submitLabel: 'Sign In',
  },
};

/**
 * With loading and error
 */
export const LoadingWithError: Story = {
  args: {
    onSubmit: fn(),
    isLoading: true,
    error: 'An error occurred. Please try again.',
    showRememberMe: true,
    showTrustedDevice: false,
    submitLabel: 'Sign In',
  },
};

/**
 * Comparison view
 */
export const ComparisonView: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', width: '900px' }}>
      <div>
        <h4 style={{ marginTop: 0 }}>Standard Login</h4>
        <LoginForm
          onSubmit={fn()}
          showRememberMe={true}
          showTrustedDevice={false}
          submitLabel="Sign In"
        />
      </div>
      <div>
        <h4 style={{ marginTop: 0 }}>Enterprise Login</h4>
        <LoginForm
          onSubmit={fn()}
          showRememberMe={false}
          showTrustedDevice={true}
          submitLabel="Enterprise Sign In"
          helpText="Your account requires device trust"
        />
      </div>
    </div>
  ),
};

/**
 * Form with custom styling
 */
export const CustomClass: Story = {
  args: {
    onSubmit: fn(),
    className: 'custom-login-form',
    showRememberMe: true,
    showTrustedDevice: false,
    submitLabel: 'Sign In',
  },
  render: (args) => (
    <div>
      <LoginForm {...args} />
      <style>{`
        .custom-login-form {
          padding: 2rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 1rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  ),
};

/**
 * Different submit labels
 */
export const DifferentLabels: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '400px' }}>
      <div>
        <h4 style={{ marginTop: 0 }}>Sign In</h4>
        <LoginForm
          onSubmit={fn()}
          submitLabel="Sign In"
          showRememberMe={true}
        />
      </div>
      <div>
        <h4 style={{ marginTop: 0 }}>Log In</h4>
        <LoginForm
          onSubmit={fn()}
          submitLabel="Log In"
          showRememberMe={true}
        />
      </div>
      <div>
        <h4 style={{ marginTop: 0 }}>Continue</h4>
        <LoginForm
          onSubmit={fn()}
          submitLabel="Continue"
          showRememberMe={false}
        />
      </div>
    </div>
  ),
};

/**
 * Dark mode support
 */
export const DarkMode: Story = {
  args: {
    onSubmit: fn(),
    showRememberMe: true,
    showTrustedDevice: false,
    submitLabel: 'Sign In',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

/**
 * Accessibility focused
 */
export const AccessibilityFocused: Story = {
  args: {
    onSubmit: fn(),
    showRememberMe: true,
    showTrustedDevice: true,
    submitLabel: 'Sign In',
    onForgotPassword: fn(),
    helpText: 'Enter your email and password to access your account.',
    autoFocus: true,
  },
};
