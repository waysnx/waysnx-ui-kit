// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { fn } from '@storybook/test';
import { useState } from 'react';
import { LoginCard } from '@waysnx/ui-security';
import type { LoginFormData } from '@waysnx/ui-security';

// Simple logo component
const LogoComponent = () => (
  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#667eea' }}>
    LOGO
  </div>
);

const meta = {
  title: 'Security/Authentication/LoginCard',
  component: LoginCard,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'light' },
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
    logo: {
      description: 'Logo string URL or ReactNode',
    },
    logoAlt: {
      control: 'text',
      description: 'Logo alt text',
    },
    footerText: {
      control: 'text',
      description: 'Footer text',
    },
    footerLinkText: {
      control: 'text',
      description: 'Footer link text',
    },
    onFooterLinkClick: {
      description: 'Callback when footer link is clicked',
    },
    maxWidth: {
      control: { type: 'range', min: 300, max: 600, step: 50 },
      description: 'Max card width in pixels',
    },
    onSubmit: {
      description: 'Callback when form is submitted',
    },
    showRememberMe: {
      control: 'boolean',
      description: 'Show remember me checkbox',
    },
    showTrustedDevice: {
      control: 'boolean',
      description: 'Show trusted device checkbox',
    },
    onForgotPassword: {
      description: 'Callback when forgot password is clicked',
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
} satisfies Meta<typeof LoginCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic login card
 */
export const Basic: Story = {
  args: {
    title: 'Sign In',
    onSubmit: fn(),
    showRememberMe: true,
    showTrustedDevice: false,
  },
};

/**
 * With logo
 */
export const WithLogo: Story = {
  args: {
    title: 'Welcome Back',
    description: 'Sign in to your account',
    logo: <LogoComponent />,
    logoAlt: 'Company Logo',
    onSubmit: fn(),
    showRememberMe: true,
    showTrustedDevice: false,
  },
};

/**
 * With description
 */
export const WithDescription: Story = {
  args: {
    title: 'Sign In',
    description: 'Enter your credentials to access your account',
    onSubmit: fn(),
    showRememberMe: true,
    showTrustedDevice: false,
  },
};

/**
 * With footer text
 */
export const WithFooter: Story = {
  args: {
    title: 'Sign In',
    footerText: "Don't have an account?",
    footerLinkText: 'Create account',
    onFooterLinkClick: fn(),
    onSubmit: fn(),
    showRememberMe: true,
    showTrustedDevice: false,
  },
};

/**
 * Full featured
 */
export const FullFeatured: Story = {
  args: {
    title: 'Welcome Back',
    description: 'Sign in to access your account',
    logo: <LogoComponent />,
    logoAlt: 'Company Logo',
    footerText: "Don't have an account?",
    footerLinkText: 'Sign up',
    onFooterLinkClick: fn(),
    onSubmit: fn(),
    showRememberMe: true,
    showTrustedDevice: false,
    onForgotPassword: fn(),
  },
};

/**
 * Enterprise login card
 */
export const Enterprise: Story = {
  args: {
    title: 'Enterprise Portal',
    description: 'Secure access for authorized users',
    logo: <LogoComponent />,
    footerText: 'Need help?',
    footerLinkText: 'Contact support',
    onFooterLinkClick: fn(),
    onSubmit: fn(),
    showRememberMe: false,
    showTrustedDevice: true,
  },
};

/**
 * With custom max width
 */
export const CustomWidth: Story = {
  args: {
    title: 'Sign In',
    description: 'Enter your credentials',
    onSubmit: fn(),
    maxWidth: 350,
    showRememberMe: true,
    showTrustedDevice: false,
  },
};

/**
 * Narrow card
 */
export const NarrowCard: Story = {
  args: {
    title: 'Sign In',
    onSubmit: fn(),
    maxWidth: 300,
    showRememberMe: true,
    showTrustedDevice: false,
  },
};

/**
 * Wide card
 */
export const WideCard: Story = {
  args: {
    title: 'Sign In',
    description: 'Enter your credentials to access your account',
    onSubmit: fn(),
    maxWidth: 500,
    showRememberMe: true,
    showTrustedDevice: false,
  },
};

/**
 * Custom title only
 */
export const CustomTitle: Story = {
  args: {
    title: 'Admin Access',
    onSubmit: fn(),
    showRememberMe: true,
    showTrustedDevice: true,
  },
};

/**
 * Interactive with callbacks
 */
export const Interactive: Story = {
  render: (args) => {
    const [submitted, setSubmitted] = useState(false);
    const [signupClicked, setSignupClicked] = useState(false);

    const handleSubmit = async (data: LoginFormData) => {
      setSubmitted(true);
      args.onSubmit(data);
      setTimeout(() => setSubmitted(false), 3000);
    };

    const handleFooterClick = () => {
      setSignupClicked(true);
      args.onFooterLinkClick?.();
      setTimeout(() => setSignupClicked(false), 2000);
    };

    return (
      <div style={{ position: 'relative' }}>
        <LoginCard
          {...args}
          onSubmit={handleSubmit}
          onFooterLinkClick={handleFooterClick}
        />
        {submitted && (
          <div style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem',
            backgroundColor: '#f0fdf4',
            border: '1px solid #dcfce7',
            borderRadius: '0.375rem',
            color: '#065f46',
            fontSize: '0.875rem',
            fontWeight: 'bold',
          }}>
            ✓ Form submitted
          </div>
        )}
        {signupClicked && (
          <div style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            padding: '1rem',
            backgroundColor: '#dbeafe',
            border: '1px solid #bfdbfe',
            borderRadius: '0.375rem',
            color: '#0c4a6e',
            fontSize: '0.875rem',
            fontWeight: 'bold',
          }}>
            Sign up clicked
          </div>
        )}
      </div>
    );
  },
  args: {
    title: 'Welcome Back',
    description: 'Sign in to access your account',
    logo: <LogoComponent />,
    footerText: "Don't have an account?",
    footerLinkText: 'Sign up',
    onSubmit: fn(),
    showRememberMe: true,
    showTrustedDevice: false,
  },
};

/**
 * With loading state
 */
export const WithLoading: Story = {
  render: () => {
    const [isLoading, setIsLoading] = useState(false);

    return (
      <LoginCard
        title="Sign In"
        description="Enter your credentials"
        onSubmit={async () => {
          setIsLoading(true);
          await new Promise(resolve => setTimeout(resolve, 2000));
          setIsLoading(false);
        }}
        isLoading={isLoading}
        showRememberMe={true}
        showTrustedDevice={false}
      />
    );
  },
};

/**
 * With error state
 */
export const WithError: Story = {
  render: () => {
    const [error, setError] = useState('Invalid email or password');

    return (
      <LoginCard
        title="Sign In"
        description="Enter your credentials"
        onSubmit={async () => {
          // Keep error displayed
        }}
        error={error}
        showRememberMe={true}
        showTrustedDevice={false}
      />
    );
  },
};

/**
 * Mobile responsive view
 */
export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'iphone12',
    },
  },
  args: {
    title: 'Sign In',
    description: 'Enter your credentials',
    logo: <LogoComponent />,
    footerText: "Don't have an account?",
    footerLinkText: 'Sign up',
    onFooterLinkClick: fn(),
    onSubmit: fn(),
    showRememberMe: true,
    showTrustedDevice: false,
  },
};

/**
 * Tablet responsive view
 */
export const TabletView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'ipad',
    },
  },
  args: {
    title: 'Sign In',
    description: 'Enter your credentials',
    logo: <LogoComponent />,
    footerText: "Don't have an account?",
    footerLinkText: 'Sign up',
    onFooterLinkClick: fn(),
    onSubmit: fn(),
    showRememberMe: true,
    showTrustedDevice: false,
  },
};

/**
 * With all form options
 */
export const AllFormOptions: Story = {
  args: {
    title: 'Secure Access',
    description: 'Sign in with your company credentials',
    logo: <LogoComponent />,
    logoAlt: 'Company Logo',
    footerText: 'New to our platform?',
    footerLinkText: 'Create an account',
    onFooterLinkClick: fn(),
    onSubmit: fn(),
    showRememberMe: true,
    showTrustedDevice: true,
    onForgotPassword: fn(),
  },
};

/**
 * Minimal variant
 */
export const Minimal: Story = {
  args: {
    title: 'Sign In',
    onSubmit: fn(),
    showRememberMe: false,
    showTrustedDevice: false,
  },
};

/**
 * With long title and description
 */
export const LongText: Story = {
  args: {
    title: 'Access Your Secure Account Portal',
    description: 'This is a highly secure portal. Please use your registered credentials to sign in. If you forgot your password, click the forgot password link below.',
    onSubmit: fn(),
    showRememberMe: true,
    showTrustedDevice: false,
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
    title: 'Sign In',
    description: 'Enter your credentials',
    logo: <LogoComponent />,
    onSubmit: fn(),
    showRememberMe: true,
    showTrustedDevice: false,
  },
  render: (args) => (
    <div style={{ background: '#1f2937', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <LoginCard {...args} />
    </div>
  ),
};

/**
 * Comparison: Simple vs Full Featured
 */
export const Comparison: Story = {
  render: () => (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '2rem',
      padding: '2rem',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      minHeight: '100vh',
    }}>
      <div>
        <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>Simple</h3>
        <LoginCard
          title="Sign In"
          onSubmit={fn()}
          showRememberMe={true}
          showTrustedDevice={false}
          maxWidth={400}
        />
      </div>
      <div>
        <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>Full Featured</h3>
        <LoginCard
          title="Welcome Back"
          description="Sign in to access your account"
          logo={<LogoComponent />}
          footerText="Don't have an account?"
          footerLinkText="Sign up"
          onFooterLinkClick={fn()}
          onSubmit={fn()}
          showRememberMe={true}
          showTrustedDevice={true}
          onForgotPassword={fn()}
          maxWidth={400}
        />
      </div>
    </div>
  ),
};

/**
 * Custom class styling
 */
export const CustomClass: Story = {
  args: {
    title: 'Sign In',
    onSubmit: fn(),
    className: 'custom-login-card',
    showRememberMe: true,
    showTrustedDevice: false,
  },
  render: (args) => (
    <div style={{ background: '#f5f7fa', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <LoginCard {...args} />
      <style>{`
        .custom-login-card {
          border: 2px solid #667eea !important;
          box-shadow: 0 20px 60px rgba(102, 126, 234, 0.3) !important;
        }
      `}</style>
    </div>
  ),
};
