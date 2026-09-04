# CaptchaContainer

CaptchaContainer - Container for switching CAPTCHA providers

## Purpose

CaptchaContainer - Container for switching CAPTCHA providers

## Installation

```bash
npm install @waysnx/ui-security
```

## Import

```typescript
import { CaptchaContainer } from '@waysnx/ui-security';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `provider` | `CaptchaProvider` | — | No | CAPTCHA provider to use |
| `siteKey` | `string` | — | No | Site key for the provider |
| `onVerify` | `(token: string) => void` | — | No | Callback on verification |
| `theme` | `'light' | 'dark'` | — | No | Theme |
| `size` | `'normal' | 'compact'` | — | No | Size |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/security-captcha-captchacontainer)

## Related Components

- **GoogleCaptcha** — CaptchaContainer depends on GoogleCaptcha
- **HCaptcha** — CaptchaContainer depends on HCaptcha
- **TurnstileCaptcha** — CaptchaContainer depends on TurnstileCaptcha

## When to Use

Use this component when you need to:

- Use CaptchaContainer for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use CaptchaContainer for general-purpose components functionality

---

**Library:** `@waysnx/ui-security`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** components, captchacontainer

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
