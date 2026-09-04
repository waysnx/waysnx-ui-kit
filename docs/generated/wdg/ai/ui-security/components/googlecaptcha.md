# GoogleCaptcha

GoogleCaptcha - Google reCAPTCHA v3 integration

## Purpose

GoogleCaptcha - Google reCAPTCHA v3 integration

## Installation

```bash
npm install @waysnx/ui-security
```

## Import

```typescript
import { GoogleCaptcha } from '@waysnx/ui-security';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `siteKey` | `string` | — | No | Sitekey from Google reCAPTCHA |
| `onVerify` | `(token: string) => void` | — | No | Callback when verification succeeds |
| `onError` | `(error: Error) => void` | — | No | Callback on verification failure |
| `theme` | `'light' | 'dark'` | — | No | Theme (light or dark) |
| `size` | `'normal' | 'compact' | 'invisible'` | — | No | Size (normal, compact, invisible) |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/security-captcha-googlecaptcha)

## Used By

This component is used by:

- CaptchaContainer

## When to Use

Use this component when you need to:

- Use GoogleCaptcha for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use GoogleCaptcha for general-purpose components functionality

---

**Library:** `@waysnx/ui-security`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** googlecaptcha, components

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
