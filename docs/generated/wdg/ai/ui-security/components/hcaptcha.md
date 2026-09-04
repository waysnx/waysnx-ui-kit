# HCaptcha

HCaptcha - hCaptcha integration

## Purpose

HCaptcha - hCaptcha integration

## Installation

```bash
npm install @waysnx/ui-security
```

## Import

```typescript
import { HCaptcha } from '@waysnx/ui-security';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `siteKey` | `string` | — | No | Sitekey from hCaptcha |
| `onVerify` | `(token: string) => void` | — | No | Callback when verification succeeds |
| `theme` | `'light' | 'dark'` | — | No | Theme (light or dark) |
| `size` | `'normal' | 'compact'` | — | No | Size (normal or compact) |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/security-captcha-hcaptcha)

## Used By

This component is used by:

- CaptchaContainer

## When to Use

Use this component when you need to:

- Use HCaptcha for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use HCaptcha for general-purpose components functionality

---

**Library:** `@waysnx/ui-security`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** hcaptcha, components

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
