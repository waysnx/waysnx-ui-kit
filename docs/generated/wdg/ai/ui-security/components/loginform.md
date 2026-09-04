# LoginForm

LoginForm component

## Purpose

LoginForm component

## Installation

```bash
npm install @waysnx/ui-security
```

## Import

```typescript
import { LoginForm } from '@waysnx/ui-security';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `onSubmit` | `(data: LoginFormData) => Promise<void> | void` | — | Yes |  |
| `error` | `string` | — | No |  |
| `isLoading` | `boolean` | — | No |  |
| `showRememberMe` | `boolean` | — | No |  |
| `showTrustedDevice` | `boolean` | — | No |  |
| `submitLabel` | `string` | — | No |  |
| `emailPlaceholder` | `string` | — | No |  |
| `passwordPlaceholder` | `string` | — | No |  |
| `onForgotPassword` | `() => void` | — | No |  |
| `className` | `string` | — | No |  |
| `initialEmail` | `string` | — | No |  |
| `autoFocus` | `boolean` | — | No |  |
| `helpText` | `string` | — | No |  |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/security-authentication-loginform)

## Related Components

- **PasswordInput** — LoginForm depends on PasswordInput

## When to Use

Use this component when you need to:

- Use LoginForm for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use LoginForm for general-purpose components functionality

---

**Library:** `@waysnx/ui-security`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** loginform, components

**Semantic Category:** form

This component is indexed for AI agents, RAG pipelines, and documentation search.
