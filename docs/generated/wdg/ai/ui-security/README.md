# @waysnx/ui-security

Enterprise-grade security components from WaysNX - authentication, authorization, MFA, secure inputs, and session management

**Version:** `1.0.0`


## Installation

### NPM

```bash
npm install @waysnx/ui-security
```

### Yarn

```bash
yarn add @waysnx/ui-security
```

### PNPM

```bash
pnpm add @waysnx/ui-security
```


## Package Information

| Property | Value |
|----------|-------|
| **Package** | `@waysnx/ui-security` |
| **Version** | `1.0.0` |
| **License** | Apache-2.0 |
| **Author** | WaysNX Technologies |


## Dependencies

### Peer Dependencies (Required)

Your project must provide these packages:

- `react` - >=18
- `react-dom` - >=18

### Runtime Dependencies

Automatically installed:

- `@waysnx/ui-core` - workspace:*
- `@waysnx/ui-feedback` - workspace:*
- `@waysnx/ui-i18n` - workspace:*
- `@waysnx/ui-layout` - workspace:*
- `@waysnx/ui-media` - workspace:*
- `dompurify` - ^3.3.1


## Components Overview

**Total Components:** 74

| Category | Count |
|----------|-------|
| components | 74 |


## Components

### components

- **AccessDenied** - AccessDenied - Screen for access denied errors
- **ActiveSessions** - ActiveSessions Component Displays list of active sessions with device info and actions to revoke the
- **ActivityFeed** - Timestamp
- **AuditHistoryTable** - Audit events to display
- **AuditTimeline** - Audit events to display
- **Auth0LoginButton** - Auth0LoginButton Component Auth0 SSO login button
- **AuthenticatorQRCode** - AuthenticatorQRCode Component Displays a real, scannable QR code for TOTP authenticator app setup
- **BackupCodesCard** - BackupCodesCard - Display backup codes for account recovery
- **BiometricButton** - BiometricButton Component Button to authenticate using biometric (fingerprint, face recognition)
- **CaptchaContainer** - CaptchaContainer - Container for switching CAPTCHA providers
- **ChangePasswordForm** - Password policy for validation
- **ConcurrentSessionDialog** - ConcurrentSessionDialog - Alert user about new concurrent session login
- **DeviceVerificationDialog** - Callback to close dialog
- **EmailVerificationCard** - Callback to resend verification email
- **EncryptionBadge** - EncryptionBadge Component Badge showing encryption status
- **FeatureGate** - Content to render if feature is enabled
- **ForgotPasswordForm** - Password policy for validation
- **GitHubLoginButton** - GitHubLoginButton Component GitHub OAuth login button
- **GoogleCaptcha** - GoogleCaptcha - Google reCAPTCHA v3 integration
- **GoogleLoginButton** - GoogleLoginButton Component Google OAuth login button
- **HCaptcha** - HCaptcha - hCaptcha integration
- **IdleMonitor** - IdleMonitor - Invisible component that tracks user activity and inactivity Detects idle state using:
- **KeepAliveButton** - KeepAliveButton - Manually extend user session
- **LoginCard** - LoginCard component
- **LoginForm** - LoginForm component
- **LoginHistory** - Login timestamp
- **MFASettingsPanel** - MFASettingsPanel component
- **MFASetupWizard** - MFASetupWizard - Multi-step wizard for MFA setup
- **MFAStatus** - MFAStatus - Display MFA configuration status
- **MFAVerificationDialog** - MFAVerificationDialog - Enter MFA verification code
- **MaskedInput** - MaskedInput - Text input with pattern masking
- **MicrosoftLoginButton** - MicrosoftLoginButton Component Microsoft/Azure AD OAuth login button
- **OTPInput** - OTPInput Component One-Time Password input with: - Multiple digit fields (configurable, typically 6)
- **OTPResendButton** - Callback when button is clicked to resend OTP
- **OTPVerificationCard** - OTPVerificationCard Component Complete OTP verification flow container: - OTPInput for entering digi
- **OktaLoginButton** - OktaLoginButton Component Okta SSO login button
- **PINInput** - PINInput - Numeric code input with auto-advancing Features: - Auto-focus to next field - Masked digi
- **PasswordAgeIndicator** - PasswordAgeIndicator Component Display password age and recommend change
- **PasswordGenerator** - PasswordGenerator Component
- **PasswordInput** - PasswordInput Component A secure password input component with: - Visibility toggle for showing/hidi
- **PasswordPolicyPanel** - PasswordPolicyPanel component
- **PasswordRequirements** - Password policy
- **PasswordStrengthMeter** - PasswordStrengthMeter Component
- **PermissionGate** - Content to render if permission is granted
- **PhoneVerificationCard** - Callback to resend verification code
- **PolicyGate** - Content to render if policy is met
- **PrivacySettingsPanel** - PrivacySettingsPanel component
- **RiskScoreBadge** - RiskScoreBadge Component Display account risk score with visual indicator
- **RoleGate** - Content to render if role matches
- **ScopeGate** - Content to render if scope is granted
- **SecureClipboardButton** - SecureClipboardButton - Copy sensitive content to clipboard securely Features: - Uses Clipboard API 
- **SecureDownloadButton** - SecureDownloadButton - Download files securely with cleanup Features: - Automatic blob URL cleanup -
- **SecureInput** - SecureInput - Text input with enhanced security features Features: - Autocomplete disabled for sensi
- **SecureTextarea** - SecureTextarea - Textarea input with enhanced security features
- **SecureUploader** - SecureUploader - File upload with security validation
- **SecurityAlert** - SecurityAlert Component Card displaying individual security alert with actions
- **SecurityAlertsPanel** - SecurityAlertsPanel component
- **SecurityBanner** - SecurityBanner Component Prominent banner to display security alerts and status messages
- **SecurityEventLog** - Security events to display
- **SecurityHealthIndicator** - SecurityHealthIndicator - Visual security health indicator
- **SecurityKeyButton** - SecurityKeyButton - Authenticate using FIDO2/WebAuthn security key
- **SecurityLogsPanel** - SecurityLogsPanel component
- **SecurityScore** - SecurityScore - Display security score and breakdown
- **SecuritySettingsPanel** - SecuritySettingsPanel - Main security settings dashboard
- **SecurityStatusCard** - SecurityStatusCard - Individual security status card
- **SensitiveText** - SensitiveText - Display and reveal sensitive information Features: - Manual reveal/hide toggle - Aut
- **SessionCountdown** - SessionCountdown - Session time countdown display
- **SessionPolicyPanel** - SessionPolicyPanel component
- **SessionTimeoutDialog** - SessionTimeoutDialog - Warning dialog for session timeout
- **TrustedDeviceSelector** - TrustedDeviceSelector - Mark device as trusted
- **TrustedDevicesPanel** - TrustedDevicesPanel component
- **TurnstileCaptcha** - TurnstileCaptcha - Cloudflare Turnstile integration
- **UnauthorizedPage** - UnauthorizedPage - Full page unauthorized error screen
- **VerificationStatus** - VerificationStatus Component Display verification progress and status: - Multiple verification steps


## Quick Start

### Basic Usage

```typescript
import React from 'react';
import { Button } from '@waysnx/ui-security';

export function App() {
  return (
    <div>
      <Button onClick={() => console.log('Clicked')}>
        Click Me
      </Button>
    </div>
  );
}
```

### With Props

```typescript
import { Input, Select } from '@waysnx/{library_name}';

export function Form() {
  const [value, setValue] = React.useState('');

  return (
    <>
      <Input
        placeholder='Enter text'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Select>
        <option>Option 1</option>
        <option>Option 2</option>
      </Select>
    </>
  );
}
```


## Enterprise Context

This library is used in enterprise applications including:

- crm
- erp
- hrms


## Documentation

### Component Documentation

Each component includes:

- Full API documentation
- Props and TypeScript types
- Usage examples
- Accessibility features
- Design tokens applied

### Available Resources

- [Component Docs](./components/) - Individual component documentation
- [LLM Guide](./LLM.md) - AI agent guide for this library
- [Storybook](./storybook) - Interactive component explorer
- [Design System](./library.json) - Library metadata
- [Search Index](./search-index.json) - Full-text search
- [Relationships](./relationships.json) - Component dependency graph


## Support

### Getting Help

- Check component-specific documentation
- Review examples and demos
- Check for common issues

### Reporting Issues

If you encounter issues:

1. Check existing issues on GitHub
2. Provide reproduction steps
3. Include your environment details
4. Attach relevant code examples

### Contributing

Contributions are welcome! Please follow:

- Component design guidelines
- Accessibility standards (WCAG 2.1)
- TypeScript best practices
- Test coverage requirements

