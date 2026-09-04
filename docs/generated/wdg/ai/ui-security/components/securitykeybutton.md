# SecurityKeyButton

SecurityKeyButton - Authenticate using FIDO2/WebAuthn security key

## Purpose

SecurityKeyButton - Authenticate using FIDO2/WebAuthn security key

## Installation

```bash
npm install @waysnx/ui-security
```

## Import

```typescript
import { SecurityKeyButton } from '@waysnx/ui-security';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `label` | `string` | — | No | Button label |
| `variant` | `'primary' | 'secondary' | 'outline' | 'ghost'` | — | No | Button variant |
| `size` | `'sm' | 'md' | 'lg'` | — | No | Button size |
| `onAuthSuccess` | `(result: any) => void` | — | No | Callback when authentication succeeds |
| `onAuthError` | `(error: Error) => void` | — | No | Callback when authentication fails |
| `disabled` | `boolean` | — | No | Whether button is disabled |
| `loadingLabel` | `string` | — | No | Custom loading message |
| `challenge` | `string` | — | No | Challenge from server (required for WebAuthn) |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/security-social-login-securitykeybutton)

## Related Components

- **Button** — SecurityKeyButton depends on Button

## When to Use

Use this component when you need to:

- Use SecurityKeyButton for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use SecurityKeyButton for general-purpose components functionality

---

**Library:** `@waysnx/ui-security`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** label, components, securitykeybutton

**Synonyms:** action control, clickable element

**Semantic Category:** display

This component is indexed for AI agents, RAG pipelines, and documentation search.
