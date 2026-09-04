# PasswordGenerator

PasswordGenerator Component

## Purpose

PasswordGenerator Component

## Installation

```bash
npm install @waysnx/ui-security
```

## Import

```typescript
import { PasswordGenerator } from '@waysnx/ui-security';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `defaultLength` | `number` | — | No | Default password length |
| `minLength` | `number` | — | No | Min password length |
| `maxLength` | `number` | — | No | Max password length |
| `includeUppercase` | `boolean` | — | No | Include uppercase letters |
| `includeLowercase` | `boolean` | — | No | Include lowercase letters |
| `includeNumbers` | `boolean` | — | No | Include numbers |
| `includeSpecialChars` | `boolean` | — | No | Include special characters |
| `onGenerate` | `(password: string) => void` | — | No | On password generated callback |
| `onCopy` | `(password: string) => void` | — | No | On copy callback |
| `className` | `string` | — | No | Custom CSS class |
| `showStrength` | `boolean` | — | No | Show strength meter |
| `showOptions` | `boolean` | — | No | Show options |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/security-password-passwordgenerator)

## Related Components

- **PasswordStrengthMeter** — PasswordGenerator depends on PasswordStrengthMeter

## When to Use

Use this component when you need to:

- Use PasswordGenerator for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use PasswordGenerator for general-purpose components functionality

---

**Library:** `@waysnx/ui-security`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** passwordgenerator, components

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
