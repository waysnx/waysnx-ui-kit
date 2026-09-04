# Ui Security - AI Agent Guide

## Overview

**Package:** `@waysnx/ui-security`
**Version:** `1.0.0`
**Description:** Enterprise-grade security components from WaysNX - authentication, authorization, MFA, secure inputs, and session management

---

## Quick Reference

- **Total Components:** 74
- **Installation:** `npm install @waysnx/ui-security`
- **Latest Version:** `1.0.0`


## Installation & Setup

### NPM

```bash
npm install @waysnx/ui-security
```

### Yarn

```bash
yarn add @waysnx/ui-security
```


## Component Catalog

### Components

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


## Component Selection Guide

Choose components based on your needs:

### Display

- `Auth0LoginButton` - Auth0LoginButton Component Auth0 SSO login button
- `BiometricButton` - BiometricButton Component Button to authenticate using biometric (fingerprint, f
- `EncryptionBadge` - EncryptionBadge Component Badge showing encryption status
- `GitHubLoginButton` - GitHubLoginButton Component GitHub OAuth login button
- `GoogleLoginButton` - GoogleLoginButton Component Google OAuth login button
- `KeepAliveButton` - KeepAliveButton - Manually extend user session
- `MicrosoftLoginButton` - MicrosoftLoginButton Component Microsoft/Azure AD OAuth login button
- `OTPResendButton` - Callback when button is clicked to resend OTP
- `OktaLoginButton` - OktaLoginButton Component Okta SSO login button
- `RiskScoreBadge` - RiskScoreBadge Component Display account risk score with visual indicator
- `SecureClipboardButton` - SecureClipboardButton - Copy sensitive content to clipboard securely Features: -
- `SecureDownloadButton` - SecureDownloadButton - Download files securely with cleanup Features: - Automati
- `SecurityKeyButton` - SecurityKeyButton - Authenticate using FIDO2/WebAuthn security key

### Feedback

- `SecurityAlert` - SecurityAlert Component Card displaying individual security alert with actions
- `SecurityAlertsPanel` - SecurityAlertsPanel component

### Form

- `ChangePasswordForm` - Password policy for validation
- `ForgotPasswordForm` - Password policy for validation
- `LoginForm` - LoginForm component

### Input

- `AuditTimeline` - Audit events to display
- `MaskedInput` - MaskedInput - Text input with pattern masking
- `OTPInput` - OTPInput Component One-Time Password input with: - Multiple digit fields (config
- `PINInput` - PINInput - Numeric code input with auto-advancing Features: - Auto-focus to next
- `PasswordInput` - PasswordInput Component A secure password input component with: - Visibility tog
- `SecureInput` - SecureInput - Text input with enhanced security features Features: - Autocomplet
- `SecureTextarea` - SecureTextarea - Textarea input with enhanced security features
- `SensitiveText` - SensitiveText - Display and reveal sensitive information Features: - Manual reve
- `SessionTimeoutDialog` - SessionTimeoutDialog - Warning dialog for session timeout
- `TrustedDeviceSelector` - TrustedDeviceSelector - Mark device as trusted

### Overlay

- `ConcurrentSessionDialog` - ConcurrentSessionDialog - Alert user about new concurrent session login
- `DeviceVerificationDialog` - Callback to close dialog
- `MFAVerificationDialog` - MFAVerificationDialog - Enter MFA verification code

### Table

- `AuditHistoryTable` - Audit events to display

### Utility

- `AccessDenied` - AccessDenied - Screen for access denied errors
- `ActiveSessions` - ActiveSessions Component Displays list of active sessions with device info and a
- `ActivityFeed` - Timestamp
- `AuthenticatorQRCode` - AuthenticatorQRCode Component Displays a real, scannable QR code for TOTP authen
- `BackupCodesCard` - BackupCodesCard - Display backup codes for account recovery
- `CaptchaContainer` - CaptchaContainer - Container for switching CAPTCHA providers
- `EmailVerificationCard` - Callback to resend verification email
- `FeatureGate` - Content to render if feature is enabled
- `GoogleCaptcha` - GoogleCaptcha - Google reCAPTCHA v3 integration
- `HCaptcha` - HCaptcha - hCaptcha integration
- `IdleMonitor` - IdleMonitor - Invisible component that tracks user activity and inactivity Detec
- `LoginCard` - LoginCard component
- `LoginHistory` - Login timestamp
- `MFASettingsPanel` - MFASettingsPanel component
- `MFASetupWizard` - MFASetupWizard - Multi-step wizard for MFA setup
- `MFAStatus` - MFAStatus - Display MFA configuration status
- `OTPVerificationCard` - OTPVerificationCard Component Complete OTP verification flow container: - OTPInp
- `PasswordAgeIndicator` - PasswordAgeIndicator Component Display password age and recommend change
- `PasswordGenerator` - PasswordGenerator Component
- `PasswordPolicyPanel` - PasswordPolicyPanel component
- `PasswordRequirements` - Password policy
- `PasswordStrengthMeter` - PasswordStrengthMeter Component
- `PermissionGate` - Content to render if permission is granted
- `PhoneVerificationCard` - Callback to resend verification code
- `PolicyGate` - Content to render if policy is met
- `PrivacySettingsPanel` - PrivacySettingsPanel component
- `RoleGate` - Content to render if role matches
- `ScopeGate` - Content to render if scope is granted
- `SecureUploader` - SecureUploader - File upload with security validation
- `SecurityBanner` - SecurityBanner Component Prominent banner to display security alerts and status 
- `SecurityEventLog` - Security events to display
- `SecurityHealthIndicator` - SecurityHealthIndicator - Visual security health indicator
- `SecurityLogsPanel` - SecurityLogsPanel component
- `SecurityScore` - SecurityScore - Display security score and breakdown
- `SecuritySettingsPanel` - SecuritySettingsPanel - Main security settings dashboard
- `SecurityStatusCard` - SecurityStatusCard - Individual security status card
- `SessionCountdown` - SessionCountdown - Session time countdown display
- `SessionPolicyPanel` - SessionPolicyPanel component
- `TrustedDevicesPanel` - TrustedDevicesPanel component
- `TurnstileCaptcha` - TurnstileCaptcha - Cloudflare Turnstile integration
- `UnauthorizedPage` - UnauthorizedPage - Full page unauthorized error screen
- `VerificationStatus` - VerificationStatus Component Display verification progress and status: - Multipl


## Common Usage Patterns

### Basic Usage

```typescript
import { Component } from '@waysnx/{library}';

export function MyComponent() {
  return <Component />;
}
```

### Composition

Common component combinations:

- **AccessDenied** is often used with other input components
- **ActiveSessions** is often used with other input components
- **ActivityFeed** is often used with other input components


## Common Mistakes & Anti-Patterns

Avoid these patterns when using components from this library:

- **Prop Drilling:** Use Context or composition instead of passing props deeply
- **Missing a11y:** Always include ARIA labels and semantic HTML
- **Hardcoded Values:** Use design tokens and theme values instead
- **Missing Error Handling:** Always handle loading and error states

See individual component documentation for specific anti-patterns.


## Package Dependencies

### Runtime Dependencies

- `@waysnx/ui-core` (`workspace:*`)
- `@waysnx/ui-feedback` (`workspace:*`)
- `@waysnx/ui-i18n` (`workspace:*`)
- `@waysnx/ui-layout` (`workspace:*`)
- `@waysnx/ui-media` (`workspace:*`)
- `dompurify` (`^3.3.1`)

### Peer Dependencies

Your project must provide:

- `react` (`>=18`)
- `react-dom` (`>=18`)


## AI Guidance

This library is optimized for AI code generation and documentation search.

### Component Metadata

**AccessDenied**
- Keywords: components, accessdenied

**ActiveSessions**
- Keywords: components, activesessions

**ActivityFeed**
- Keywords: components, activityfeed

### Searchable Metadata

Components are indexed with:

- **Keywords:** For semantic search
- **Aliases:** Alternative names AI agents might search for
- **Semantic Categories:** Classification for AI recommendations
- **Use Cases:** AI understands when to suggest each component
- **Anti-patterns:** AI avoids suggesting incorrect usage

### Querying Components

AI agents can answer:

- 'Which component should I use for X?'
- 'What are the props for Component Y?'
- 'What components work with X?'
- 'Show me examples of Z'
- 'What are the accessibility features?'


## References & Documentation

- [Component Documentation](./components/) - Detailed component docs
- [Design System](./library.json) - Library metadata
- [Component Relationships](./relationships.json) - Dependency graph
- [Search Index](./search-index.json) - Full-text search data

## Support

For issues or questions:

- Check component-specific documentation
- Review examples in Storybook
- File issues on GitHub

