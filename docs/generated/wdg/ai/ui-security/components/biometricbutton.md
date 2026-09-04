# BiometricButton

BiometricButton Component Button to authenticate using biometric (fingerprint, face recognition).

## Purpose

BiometricButton Component Button to authenticate using biometric (fingerprint, face recognition)

## Installation

```bash
npm install @waysnx/ui-security
```

## Import

```typescript
import { BiometricButton } from '@waysnx/ui-security';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `biometricType` | `'fingerprint' | 'face' | 'auto'` | — | No | Biometric type |
| `label` | `string` | — | No | Button label |
| `variant` | `'primary' | 'secondary' | 'outline' | 'ghost'` | — | No | Button variant |
| `size` | `'sm' | 'md' | 'lg'` | — | No | Button size |
| `onAuthSuccess` | `(result: any) => void` | — | No | Callback when authentication succeeds |
| `onAuthError` | `(error: Error) => void` | — | No | Callback when authentication fails |
| `disabled` | `boolean` | — | No | Whether button is disabled |
| `loadingLabel` | `string` | — | No | Custom loading message |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/security-social-login-biometricbutton)

## Related Components

- **Button** — BiometricButton depends on Button

## When to Use

Use this component when you need to:

- Use BiometricButton for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use BiometricButton for general-purpose components functionality

---

**Library:** `@waysnx/ui-security`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** label, components, biometricbutton

**Synonyms:** action control, clickable element

**Semantic Category:** display

This component is indexed for AI agents, RAG pipelines, and documentation search.
