# Button

Enable users to trigger actions by pressing a clickable element.

## Purpose

Enable users to trigger actions by pressing a clickable element

## Installation

```bash
npm install @waysnx/ui-core
```

## Import

```typescript
import { Button } from '@waysnx/ui-core';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `children` | `ReactNode` | — | Yes |  |
| `variant` | `'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost'` | — | No |  |
| `ariaLabel` | `string` | — | No |  |
| `ariaPressed` | `boolean` | — | No |  |
| `testId` | `string` | — | No |  |

## Design Tokens

### Colors

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-color-primary` | background, color, border | .wx-button--primary, .wx-button--secondary, .wx-button--secondary:hover | 4 |
| `--wx-color-primary-contrast` | color | .wx-button--primary, .wx-button--secondary:hover, .wx-button--destructive | 3 |
| `--wx-color-primary-hover` | background | .wx-button--primary:hover | 1 |
| `--wx-color-error` | background | .wx-button--destructive | 1 |
| `--wx-color-error-hover` | background | .wx-button--destructive:hover | 1 |
| `--wx-color-text` | color | .wx-button--outline, .wx-button--ghost | 2 |
| `--wx-color-border` | border | .wx-button--outline | 1 |
| `--wx-color-surface-hover` | background | .wx-button--outline:hover, .wx-button--ghost:hover | 2 |

### Typography

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-font-family` | font-family | .wx-button | 1 |
| `--wx-font-size-md` | font-size | .wx-button | 1 |

### Radius

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-radius-md` | border-radius | .wx-button | 1 |

### Shadows

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-shadow-sm` | box-shadow | .wx-button | 1 |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/example-button)

## Related Components

- **Modal** — Button is commonly used within Modal
- **Spinner** — Button works well with Spinner
- **Tooltip** — Button works well with Tooltip

## Parent Components

This component is typically used within:

- Modal

## Used By

This component is used by:

- AccessDenied
- ActiveSessions
- ActivityFeed
- AuditHistoryTable
- Auth0LoginButton
- AuthenticatorQRCode
- BackupCodesCard
- BiometricButton
- ChangePasswordForm
- ConcurrentSessionDialog
- DeviceVerificationDialog
- EmailVerificationCard
- ForgotPasswordForm
- GitHubLoginButton
- GoogleLoginButton
- KeepAliveButton
- MFASettingsPanel
- MFASetupWizard
- MFAStatus
- MFAVerificationDialog
- MicrosoftLoginButton
- OTPResendButton
- OktaLoginButton
- PasswordAgeIndicator
- PasswordPolicyPanel
- PhoneVerificationCard
- PrivacySettingsPanel
- SecureClipboardButton
- SecureDownloadButton
- SecureUploader
- SecurityAlert
- SecurityAlertsPanel
- SecurityBanner
- SecurityEventLog
- SecurityKeyButton
- SecurityLogsPanel
- SecuritySettingsPanel
- SecurityStatusCard
- SensitiveText
- SessionPolicyPanel
- SessionTimeoutDialog
- TrustedDevicesPanel
- UnauthorizedPage

## When to Use

Use this component when you need to:

- Submit forms in HR, CRM, or inventory systems
- Approve leave, confirm deletion, or trigger workflows
- Navigate between screens in applications

## When NOT to Use

Avoid using this component when:

- Button disabled when user hasn't filled form
- Button with vague label like 'OK' or 'Submit'

## Best Practices

**✓ Good use cases:**
- Submit forms in HR, CRM, or inventory systems
- Approve leave, confirm deletion, or trigger workflows
- Navigate between screens in applications

**✗ Avoid:**
- Button disabled when user hasn't filled form
- Button with vague label like 'OK' or 'Submit'

---

**Library:** `@waysnx/ui-core`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** action, button, cta, click, components

**Synonyms:** action button, submit button, call-to-action

**Semantic Category:** display

This component is indexed for AI agents, RAG pipelines, and documentation search.
