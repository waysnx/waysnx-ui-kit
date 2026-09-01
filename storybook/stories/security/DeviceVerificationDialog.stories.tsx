// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { TestBadge } from '../TestBadge';
import { fn } from '@storybook/test';
import { useState } from 'react';
import { DeviceVerificationDialog } from '@waysnx/ui-security';
import type { DeviceInfo } from '@waysnx/ui-security';

const mockDevice: DeviceInfo = {
  id: 'device-123',
  os: 'Windows 10',
  browser: 'Chrome 121.0',
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  isMobile: false,
  screenResolution: '1920x1080',
  timezone: 'America/New_York',
  language: 'en-US',
  touchSupport: false,
  webglSupport: true,
  localStorageSupport: true,
  sessionStorageSupport: true,
  cookiesEnabled: true,
  doNotTrack: false,
};

const mobileDevice: DeviceInfo = {
  id: 'device-456',
  os: 'iOS 17.2',
  browser: 'Safari',
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_2_1 like Mac OS X)',
  isMobile: true,
  screenResolution: '390x844',
  timezone: 'America/Los_Angeles',
  language: 'en-US',
  touchSupport: true,
  webglSupport: true,
  localStorageSupport: true,
  sessionStorageSupport: true,
  cookiesEnabled: true,
  doNotTrack: false,
};

const meta = {
  title: 'Security/Verification/DeviceVerificationDialog',
  component: DeviceVerificationDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Whether dialog is open',
    },
    device: {
      control: 'object',
      description: 'Device information',
    },
    onApprove: {
      description: 'Callback when approved',
    },
    onReject: {
      description: 'Callback when rejected',
    },
    onClose: {
      description: 'Callback to close dialog',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state',
    },
    error: {
      control: 'text',
      description: 'Error message',
    },
    title: {
      control: 'text',
      description: 'Dialog title',
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
} satisfies Meta<typeof DeviceVerificationDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic device verification - desktop
 */
export const BasicDesktop: Story = {
  args: {
    open: true,
    device: mockDevice,
    onApprove: fn(),
    onReject: fn(),
    onClose: fn(),
  },
};

/**
 * Mobile device verification
 */
export const MobileDevice: Story = {
  args: {
    open: true,
    device: mobileDevice,
    onApprove: fn(),
    onReject: fn(),
    onClose: fn(),
  },
};

/**
 * With custom title and description
 */
export const CustomMessage: Story = {
  args: {
    open: true,
    device: mockDevice,
    title: 'New Device Sign-In',
    description: 'You are signing in from a new device. Please verify to continue.',
    onApprove: fn(),
    onReject: fn(),
    onClose: fn(),
  },
};

/**
 * With error message
 */
export const WithError: Story = {
  args: {
    open: true,
    device: mockDevice,
    error: 'Verification failed. Please try again.',
    onApprove: fn(),
    onReject: fn(),
    onClose: fn(),
  },
};

/**
 * Loading state
 */
export const Loading: Story = {
  args: {
    open: true,
    device: mockDevice,
    loading: true,
    onApprove: fn(),
    onReject: fn(),
    onClose: fn(),
  },
};

/**
 * Interactive approval flow
 */
export const InteractiveApproval: Story = {
  render: (args) => {
    const [open, setOpen] = useState(true);
    const [approved, setApproved] = useState(false);

    return (
      <div>
        {!open && !approved && (
          <button
            onClick={() => setOpen(true)}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Open Device Dialog
          </button>
        )}

        {approved && (
          <div style={{
            padding: '1rem',
            backgroundColor: '#f0fdf4',
            border: '1px solid #dcfce7',
            borderRadius: '0.375rem',
            color: '#065f46',
          }}>
            ✓ Device approved and trusted!
          </div>
        )}

        <DeviceVerificationDialog
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          onApprove={() => setApproved(true)}
        />
      </div>
    );
  },
};

/**
 * Interactive rejection flow
 */
export const InteractiveRejection: Story = {
  render: (args) => {
    const [open, setOpen] = useState(true);
    const [rejected, setRejected] = useState(false);

    return (
      <div>
        {!open && !rejected && (
          <button
            onClick={() => setOpen(true)}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Open Device Dialog
          </button>
        )}

        {rejected && (
          <div style={{
            padding: '1rem',
            backgroundColor: '#fee2e2',
            border: '1px solid #fecaca',
            borderRadius: '0.375rem',
            color: '#991b1b',
          }}>
            Device rejected. Your session has been ended for security.
          </div>
        )}

        <DeviceVerificationDialog
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          onReject={() => setRejected(true)}
        />
      </div>
    );
  },
};

/**
 * Device comparison
 */
export const DeviceComparison: Story = {
  render: () => {
    const [desktopOpen, setDesktopOpen] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', width: '900px' }}>
        <div>
          <h4 style={{ marginTop: 0 }}>Desktop Device</h4>
          <button
            onClick={() => setDesktopOpen(!desktopOpen)}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              marginBottom: '1rem',
            }}
          >
            {desktopOpen ? 'Close' : 'Open'} Dialog
          </button>
          <DeviceVerificationDialog
            open={desktopOpen}
            device={mockDevice}
            onApprove={fn()}
            onReject={fn()}
            onClose={() => setDesktopOpen(false)}
          />
        </div>
        <div>
          <h4 style={{ marginTop: 0 }}>Mobile Device</h4>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              marginBottom: '1rem',
            }}
          >
            {mobileOpen ? 'Close' : 'Open'} Dialog
          </button>
          <DeviceVerificationDialog
            open={mobileOpen}
            device={mobileDevice}
            onApprove={fn()}
            onReject={fn()}
            onClose={() => setMobileOpen(false)}
          />
        </div>
      </div>
    );
  },
};

/**
 * Suspicious activity scenario
 */
export const SuspiciousActivity: Story = {
  render: () => {
    const [open, setOpen] = useState(true);

    return (
      <DeviceVerificationDialog
        open={open}
        device={mockDevice}
        title="Suspicious Sign-In Detected"
        description="We detected a sign-in attempt from an unrecognized device in a new location. Please verify that this was you."
        onApprove={() => setOpen(false)}
        onReject={() => setOpen(false)}
        onClose={() => setOpen(false)}
      />
    );
  },
};

/**
 * New device scenario
 */
export const NewDevice: Story = {
  render: () => {
    const [open, setOpen] = useState(true);

    return (
      <DeviceVerificationDialog
        open={open}
        device={mockDevice}
        title="New Device"
        description="This is the first time you're signing in from this device. Would you like to trust it for future sign-ins?"
        onApprove={() => setOpen(false)}
        onReject={() => setOpen(false)}
        onClose={() => setOpen(false)}
      />
    );
  },
};

/**
 * Location mismatch
 */
export const LocationMismatch: Story = {
  render: () => {
    const [open, setOpen] = useState(true);

    return (
      <DeviceVerificationDialog
        open={open}
        device={mockDevice}
        title="Unusual Location Detected"
        description="You are trying to sign in from an unusual location. Please verify this is you."
        onApprove={() => setOpen(false)}
        onReject={() => setOpen(false)}
        onClose={() => setOpen(false)}
      />
    );
  },
};

/**
 * Multiple devices
 */
export const MultipleDevices: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', width: '1200px' }}>
      <div>
        <h5 style={{ marginTop: 0 }}>Windows Desktop</h5>
        <DeviceVerificationDialog
          open={true}
          device={mockDevice}
          onApprove={fn()}
          onReject={fn()}
          onClose={fn()}
        />
      </div>
      <div>
        <h5 style={{ marginTop: 0 }}>iPhone</h5>
        <DeviceVerificationDialog
          open={true}
          device={mobileDevice}
          onApprove={fn()}
          onReject={fn()}
          onClose={fn()}
        />
      </div>
      <div>
        <h5 style={{ marginTop: 0 }}>Mac</h5>
        <DeviceVerificationDialog
          open={true}
          device={{
            ...mockDevice,
            id: 'device-789',
            os: 'macOS 14.1',
            browser: 'Safari 17.2',
            screenResolution: '1680x1050',
          }}
          onApprove={fn()}
          onReject={fn()}
          onClose={fn()}
        />
      </div>
    </div>
  ),
};

/**
 * Minimal version (no device info)
 */
export const Minimal: Story = {
  args: {
    open: true,
    onApprove: fn(),
    onReject: fn(),
    onClose: fn(),
  },
};

/**
 * Full featured with all options
 */
export const FullFeatured: Story = {
  args: {
    open: true,
    device: mockDevice,
    title: 'Verify Device',
    description: 'We detected a new device sign-in. Please verify you recognize this device.',
    onApprove: fn(),
    onReject: fn(),
    onClose: fn(),
  },
};

/**
 * Accessibility focused
 */
export const Accessible: Story = {
  args: {
    open: true,
    device: mockDevice,
    title: 'Device Verification Required',
    description: 'A new device has attempted to sign into your account. Please review the device information below and approve or reject this sign-in attempt.',
    onApprove: fn(),
    onReject: fn(),
    onClose: fn(),
  },
};
