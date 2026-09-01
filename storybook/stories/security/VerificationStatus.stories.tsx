// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { useState } from 'react';
import { VerificationStatus } from '@waysnx/ui-security';
import type { VerificationStepInfo } from '@waysnx/ui-security';

const allStepsVerified: VerificationStepInfo[] = [
  {
    id: 'email',
    label: 'Email Verification',
    status: 'verified',
    timestamp: new Date(Date.now() - 3600000),
    description: 'Email verified successfully',
  },
  {
    id: 'phone',
    label: 'Phone Verification',
    status: 'verified',
    timestamp: new Date(Date.now() - 1800000),
    description: 'SMS code verified',
  },
  {
    id: 'device',
    label: 'Device Verification',
    status: 'verified',
    timestamp: new Date(),
    description: 'Device trusted',
  },
  {
    id: 'mfa',
    label: 'MFA Setup',
    status: 'verified',
    timestamp: new Date(),
    description: 'Authenticator app configured',
  },
];

const partialVerification: VerificationStepInfo[] = [
  {
    id: 'email',
    label: 'Email Verification',
    status: 'verified',
    timestamp: new Date(Date.now() - 7200000),
  },
  {
    id: 'phone',
    label: 'Phone Verification',
    status: 'in-progress',
    description: 'Waiting for code...',
  },
  {
    id: 'device',
    label: 'Device Verification',
    status: 'pending',
  },
  {
    id: 'mfa',
    label: 'MFA Setup',
    status: 'pending',
  },
];

const withFailures: VerificationStepInfo[] = [
  {
    id: 'email',
    label: 'Email Verification',
    status: 'verified',
    timestamp: new Date(Date.now() - 3600000),
  },
  {
    id: 'phone',
    label: 'Phone Verification',
    status: 'failed',
    description: 'Code expired',
  },
  {
    id: 'device',
    label: 'Device Verification',
    status: 'pending',
  },
  {
    id: 'mfa',
    label: 'MFA Setup',
    status: 'pending',
  },
];

const meta = {
  title: 'Security/Verification/VerificationStatus',
  component: VerificationStatus,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    steps: {
      control: 'object',
      description: 'Verification steps',
    },
    overallStatus: {
      control: 'select',
      options: ['pending', 'verified', 'failed', 'in-progress'],
      description: 'Overall verification status',
    },
    showProgress: {
      control: 'boolean',
      description: 'Show progress bar',
    },
    timeline: {
      control: 'boolean',
      description: 'Use timeline view',
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
} satisfies Meta<typeof VerificationStatus>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * All steps verified - list view
 */
export const AllVerifiedList: Story = {
  args: {
    steps: allStepsVerified,
    overallStatus: 'verified',
    showProgress: true,
    timeline: false,
  },
};

/**
 * All steps verified - timeline view
 */
export const AllVerifiedTimeline: Story = {
  args: {
    steps: allStepsVerified,
    overallStatus: 'verified',
    showProgress: true,
    timeline: true,
  },
};

/**
 * Partial verification
 */
export const PartialVerification: Story = {
  args: {
    steps: partialVerification,
    overallStatus: 'in-progress',
    showProgress: true,
    timeline: false,
  },
};

/**
 * With failures
 */
export const WithFailures: Story = {
  args: {
    steps: withFailures,
    overallStatus: 'failed',
    showProgress: true,
    timeline: false,
  },
};

/**
 * Without progress bar
 */
export const WithoutProgress: Story = {
  args: {
    steps: partialVerification,
    overallStatus: 'in-progress',
    showProgress: false,
    timeline: false,
  },
};

/**
 * View comparison - list vs timeline
 */
export const ViewComparison: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', width: '900px' }}>
      <div>
        <h4 style={{ marginTop: 0 }}>List View</h4>
        <VerificationStatus
          steps={partialVerification}
          overallStatus="in-progress"
          showProgress={true}
          timeline={false}
        />
      </div>
      <div>
        <h4 style={{ marginTop: 0 }}>Timeline View</h4>
        <VerificationStatus
          steps={partialVerification}
          overallStatus="in-progress"
          showProgress={true}
          timeline={true}
        />
      </div>
    </div>
  ),
};

/**
 * Status progression - real-time updates
 */
export const ProgressionFlow: Story = {
  render: () => {
    const [phase, setPhase] = useState(0);

    const phases = [
      {
        steps: [
          { id: 'email' as const, label: 'Email', status: 'in-progress' as const },
          { id: 'phone' as const, label: 'Phone', status: 'pending' as const },
          { id: 'device' as const, label: 'Device', status: 'pending' as const },
          { id: 'mfa' as const, label: 'MFA', status: 'pending' as const },
        ],
        overall: 'in-progress' as const,
      },
      {
        steps: [
          { id: 'email' as const, label: 'Email', status: 'verified' as const, timestamp: new Date() },
          { id: 'phone' as const, label: 'Phone', status: 'in-progress' as const },
          { id: 'device' as const, label: 'Device', status: 'pending' as const },
          { id: 'mfa' as const, label: 'MFA', status: 'pending' as const },
        ],
        overall: 'in-progress' as const,
      },
      {
        steps: [
          { id: 'email' as const, label: 'Email', status: 'verified' as const, timestamp: new Date() },
          { id: 'phone' as const, label: 'Phone', status: 'verified' as const, timestamp: new Date() },
          { id: 'device' as const, label: 'Device', status: 'in-progress' as const },
          { id: 'mfa' as const, label: 'MFA', status: 'pending' as const },
        ],
        overall: 'in-progress' as const,
      },
      {
        steps: [
          { id: 'email' as const, label: 'Email', status: 'verified' as const, timestamp: new Date() },
          { id: 'phone' as const, label: 'Phone', status: 'verified' as const, timestamp: new Date() },
          { id: 'device' as const, label: 'Device', status: 'verified' as const, timestamp: new Date() },
          { id: 'mfa' as const, label: 'MFA', status: 'verified' as const, timestamp: new Date() },
        ],
        overall: 'verified' as const,
      },
    ];

    return (
      <div style={{ width: '500px' }}>
        <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
          {phases.map((_, i) => (
            <button
              key={i}
              onClick={() => setPhase(i)}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: phase === i ? '#3b82f6' : '#e5e7eb',
                color: phase === i ? 'white' : '#1f2937',
                border: 'none',
                borderRadius: '0.375rem',
                cursor: 'pointer',
                fontWeight: phase === i ? 'bold' : 'normal',
              }}
            >
              Phase {i + 1}
            </button>
          ))}
        </div>
        <VerificationStatus
          steps={phases[phase].steps}
          overallStatus={phases[phase].overall}
          showProgress={true}
          timeline={false}
        />
      </div>
    );
  },
};

/**
 * All statuses
 */
export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', width: '900px' }}>
      <div>
        <h4 style={{ marginTop: 0 }}>Verified</h4>
        <VerificationStatus
          steps={[
            { id: 'email', label: 'Email', status: 'verified', timestamp: new Date() },
            { id: 'phone', label: 'Phone', status: 'verified', timestamp: new Date() },
          ]}
          overallStatus="verified"
        />
      </div>
      <div>
        <h4 style={{ marginTop: 0 }}>Failed</h4>
        <VerificationStatus
          steps={[
            { id: 'email', label: 'Email', status: 'verified', timestamp: new Date() },
            { id: 'phone', label: 'Phone', status: 'failed', description: 'Code invalid' },
          ]}
          overallStatus="failed"
        />
      </div>
      <div>
        <h4 style={{ marginTop: 0 }}>In Progress</h4>
        <VerificationStatus
          steps={[
            { id: 'email', label: 'Email', status: 'verified', timestamp: new Date() },
            { id: 'phone', label: 'Phone', status: 'in-progress' },
          ]}
          overallStatus="in-progress"
        />
      </div>
      <div>
        <h4 style={{ marginTop: 0 }}>Pending</h4>
        <VerificationStatus
          steps={[
            { id: 'email', label: 'Email', status: 'pending' },
            { id: 'phone', label: 'Phone', status: 'pending' },
          ]}
          overallStatus="pending"
        />
      </div>
    </div>
  ),
};

/**
 * Onboarding flow
 */
export const OnboardingFlow: Story = {
  render: () => (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>Account Setup</h1>
      <VerificationStatus
        steps={partialVerification}
        overallStatus="in-progress"
        showProgress={true}
        timeline={true}
      />
    </div>
  ),
};

/**
 * Dashboard summary
 */
export const DashboardSummary: Story = {
  render: () => (
    <div style={{
      background: '#f9fafb',
      padding: '2rem',
      borderRadius: '0.75rem',
      maxWidth: '500px',
    }}>
      <h2 style={{ marginTop: 0 }}>Verification Status</h2>
      <VerificationStatus
        steps={allStepsVerified}
        overallStatus="verified"
        showProgress={true}
        timeline={false}
      />
    </div>
  ),
};

/**
 * Mobile responsive - timeline
 */
export const MobileTimeline: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'iphone12',
    },
  },
  args: {
    steps: partialVerification,
    overallStatus: 'in-progress',
    showProgress: true,
    timeline: true,
  },
};

/**
 * Mobile responsive - list
 */
export const MobileList: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'iphone12',
    },
  },
  args: {
    steps: partialVerification,
    overallStatus: 'in-progress',
    showProgress: true,
    timeline: false,
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
    steps: partialVerification,
    overallStatus: 'in-progress',
    showProgress: true,
    timeline: false,
  },
  render: (args) => (
    <div style={{ background: '#1f2937', padding: '2rem', borderRadius: '0.5rem' }}>
      <VerificationStatus {...args} />
    </div>
  ),
};

/**
 * Minimal - progress only
 */
export const MinimalProgress: Story = {
  args: {
    steps: partialVerification,
    showProgress: true,
    timeline: false,
  },
};

/**
 * Full featured
 */
export const FullFeatured: Story = {
  args: {
    steps: allStepsVerified,
    overallStatus: 'verified',
    showProgress: true,
    timeline: true,
  },
};

/**
 * Accessibility focused
 */
export const Accessible: Story = {
  args: {
    steps: allStepsVerified,
    overallStatus: 'verified',
    showProgress: true,
    timeline: true,
  },
  render: (args) => (
    <div style={{ width: '600px' }}>
      <h1>Account Verification Complete</h1>
      <p>All verification steps have been successfully completed. Your account is now fully secured.</p>
      <VerificationStatus {...args} />
    </div>
  ),
};
