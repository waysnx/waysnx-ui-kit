// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { useState, useEffect } from 'react';
import { PasswordStrengthMeter } from '@waysnx/ui-security';

const meta = {
  title: 'Security/Password/PasswordStrengthMeter',
  component: PasswordStrengthMeter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    password: {
      control: 'text',
      description: 'Password to evaluate',
    },
    showLabel: {
      control: 'boolean',
      description: 'Show strength level label',
    },
    showPercentage: {
      control: 'boolean',
      description: 'Show percentage value',
    },
    barHeight: {
      control: { type: 'range', min: 4, max: 24, step: 2 },
      description: 'Bar height in pixels',
    },
    variant: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size variant',
    },
    animationDuration: {
      control: { type: 'range', min: 0, max: 1000, step: 100 },
      description: 'Animation duration in milliseconds',
    },
    label: {
      control: 'text',
      description: 'Custom label text',
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
} satisfies Meta<typeof PasswordStrengthMeter>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Empty password - no meter displayed
 */
export const Empty: Story = {
  args: {
    password: '',
    showLabel: true,
    showPercentage: false,
    variant: 'medium',
  },
};

/**
 * Very weak password strength
 */
export const VeryWeak: Story = {
  args: {
    password: 'a',
    showLabel: true,
    showPercentage: false,
    variant: 'medium',
  },
};

/**
 * Weak password strength
 */
export const Weak: Story = {
  args: {
    password: 'abc',
    showLabel: true,
    showPercentage: false,
    variant: 'medium',
  },
};

/**
 * Fair password strength
 */
export const Fair: Story = {
  args: {
    password: 'abcdef123',
    showLabel: true,
    showPercentage: false,
    variant: 'medium',
  },
};

/**
 * Good password strength
 */
export const Good: Story = {
  args: {
    password: 'Abcdef123!',
    showLabel: true,
    showPercentage: false,
    variant: 'medium',
  },
};

/**
 * Strong password strength
 */
export const Strong: Story = {
  args: {
    password: 'Abcdef123!@#',
    showLabel: true,
    showPercentage: false,
    variant: 'medium',
  },
};

/**
 * Very strong password strength
 */
export const VeryStrong: Story = {
  args: {
    password: 'MySecurePassword123!@#$%^&*()',
    showLabel: true,
    showPercentage: false,
    variant: 'medium',
  },
};

/**
 * Small variant
 */
export const SmallVariant: Story = {
  args: {
    password: 'SecurePass123!',
    showLabel: true,
    showPercentage: false,
    variant: 'small',
  },
};

/**
 * Large variant
 */
export const LargeVariant: Story = {
  args: {
    password: 'SecurePass123!',
    showLabel: true,
    showPercentage: false,
    variant: 'large',
  },
};

/**
 * Without label
 */
export const WithoutLabel: Story = {
  args: {
    password: 'SecurePass123!',
    showLabel: false,
    showPercentage: false,
    variant: 'medium',
  },
};

/**
 * With percentage
 */
export const WithPercentage: Story = {
  args: {
    password: 'SecurePass123!',
    showLabel: true,
    showPercentage: true,
    variant: 'medium',
  },
};

/**
 * With percentage and no label
 */
export const PercentageOnly: Story = {
  args: {
    password: 'SecurePass123!',
    showLabel: false,
    showPercentage: true,
    variant: 'medium',
  },
};

/**
 * Custom bar height
 */
export const CustomHeight: Story = {
  args: {
    password: 'SecurePass123!',
    showLabel: true,
    showPercentage: false,
    barHeight: 16,
    variant: 'medium',
  },
};

/**
 * Custom label text
 */
export const CustomLabel: Story = {
  args: {
    password: 'SecurePass123!',
    showLabel: true,
    showPercentage: false,
    label: 'Password Security',
    variant: 'medium',
  },
};

/**
 * No animation
 */
export const NoAnimation: Story = {
  args: {
    password: 'SecurePass123!',
    showLabel: true,
    showPercentage: false,
    animationDuration: 0,
    variant: 'medium',
  },
};

/**
 * Fast animation
 */
export const FastAnimation: Story = {
  args: {
    password: 'SecurePass123!',
    showLabel: true,
    showPercentage: false,
    animationDuration: 100,
    variant: 'medium',
  },
};

/**
 * Slow animation
 */
export const SlowAnimation: Story = {
  args: {
    password: 'SecurePass123!',
    showLabel: true,
    showPercentage: false,
    animationDuration: 1000,
    variant: 'medium',
  },
};

/**
 * All strength levels comparison
 */
export const AllLevels: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '400px' }}>
      <div>
        <h4 style={{ marginTop: 0, marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 'bold' }}>
          Very Weak
        </h4>
        <PasswordStrengthMeter password="a" showLabel={true} variant="medium" />
      </div>
      <div>
        <h4 style={{ marginTop: 0, marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 'bold' }}>
          Weak
        </h4>
        <PasswordStrengthMeter password="abc" showLabel={true} variant="medium" />
      </div>
      <div>
        <h4 style={{ marginTop: 0, marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 'bold' }}>
          Fair
        </h4>
        <PasswordStrengthMeter password="abcdef123" showLabel={true} variant="medium" />
      </div>
      <div>
        <h4 style={{ marginTop: 0, marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 'bold' }}>
          Good
        </h4>
        <PasswordStrengthMeter password="Abcdef123!" showLabel={true} variant="medium" />
      </div>
      <div>
        <h4 style={{ marginTop: 0, marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 'bold' }}>
          Strong
        </h4>
        <PasswordStrengthMeter password="Abcdef123!@#" showLabel={true} variant="medium" />
      </div>
      <div>
        <h4 style={{ marginTop: 0, marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 'bold' }}>
          Very Strong
        </h4>
        <PasswordStrengthMeter password="MySecurePassword123!@#$%^&*()" showLabel={true} variant="medium" />
      </div>
    </div>
  ),
};

/**
 * All variants comparison
 */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '400px' }}>
      <div>
        <h4 style={{ marginTop: 0, marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 'bold' }}>
          Small
        </h4>
        <PasswordStrengthMeter password="SecurePass123!" showLabel={true} variant="small" />
      </div>
      <div>
        <h4 style={{ marginTop: 0, marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 'bold' }}>
          Medium
        </h4>
        <PasswordStrengthMeter password="SecurePass123!" showLabel={true} variant="medium" />
      </div>
      <div>
        <h4 style={{ marginTop: 0, marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 'bold' }}>
          Large
        </h4>
        <PasswordStrengthMeter password="SecurePass123!" showLabel={true} variant="large" />
      </div>
    </div>
  ),
};

/**
 * Real-time strength update
 */
export const RealTimeUpdate: Story = {
  render: () => {
    const [password, setPassword] = useState('');

    return (
      <div style={{ width: '400px' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 'bold' }}>
            Type a password to see real-time strength updates:
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
        <PasswordStrengthMeter
          password={password}
          showLabel={true}
          showPercentage={true}
          variant="medium"
        />
        {password && (
          <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '0.375rem', fontSize: '0.875rem' }}>
            <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>Current Password: <code>{password}</code></p>
            <p style={{ margin: 0 }}>Try different character combinations to see how strength changes!</p>
          </div>
        )}
      </div>
    );
  },
};

/**
 * Animated strength transition
 */
export const AnimatedTransition: Story = {
  render: () => {
    const [password, setPassword] = useState('');
    const [animatingPassword, setAnimatingPassword] = useState('');

    const passwords = [
      'a',
      'ab',
      'abc',
      'abcD',
      'abcD1',
      'abcD1!',
      'abcD1!@',
      'MySecurePassword123!@#',
    ];

    useEffect(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index < passwords.length) {
          setAnimatingPassword(passwords[index]);
          index++;
        } else {
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }, []);

    return (
      <div style={{ width: '400px' }}>
        <p style={{ marginTop: 0, marginBottom: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
          Watch as password strength updates automatically:
        </p>
        <PasswordStrengthMeter
          password={animatingPassword}
          showLabel={true}
          showPercentage={true}
          variant="medium"
          animationDuration={300}
        />
        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '0.375rem', fontSize: '0.875rem' }}>
          <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>Current: <code>{animatingPassword || '(empty)'}</code></p>
        </div>
      </div>
    );
  },
};

/**
 * Minimal display
 */
export const Minimal: Story = {
  args: {
    password: 'SecurePass123!',
    showLabel: false,
    showPercentage: false,
    variant: 'small',
    barHeight: 4,
  },
};

/**
 * Maximum detail
 */
export const MaximumDetail: Story = {
  args: {
    password: 'SecurePass123!',
    showLabel: true,
    showPercentage: true,
    variant: 'large',
    barHeight: 16,
    label: 'Detailed Password Strength',
  },
};

/**
 * Custom class styling
 */
export const CustomClass: Story = {
  args: {
    password: 'SecurePass123!',
    showLabel: true,
    showPercentage: false,
    className: 'custom-strength-meter',
  },
  render: (args) => (
    <div>
      <PasswordStrengthMeter {...args} />
      <style>{`
        .custom-strength-meter {
          padding: 1rem;
          background-color: #f0f9ff;
          border-radius: 0.5rem;
          border-left: 4px solid #3b82f6;
        }
      `}</style>
    </div>
  ),
};

/**
 * Inline display with other content
 */
export const InlineDisplay: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '500px' }}>
      <div style={{ flex: 1 }}>
        <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 'bold' }}>
          Your Password Strength:
        </p>
        <PasswordStrengthMeter
          password="SecurePass123!"
          showLabel={true}
          showPercentage={true}
          variant="medium"
        />
      </div>
      <div style={{ padding: '1rem', backgroundColor: '#ecfdf5', borderRadius: '0.375rem', fontSize: '0.875rem' }}>
        <p style={{ margin: 0, fontWeight: 'bold', color: '#065f46' }}>✓ Strong</p>
        <p style={{ margin: '0.25rem 0 0 0', color: '#047857', fontSize: '0.75rem' }}>Ready to use</p>
      </div>
    </div>
  ),
};
