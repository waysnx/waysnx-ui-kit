# LoginCard

LoginCard component

## Purpose

LoginCard component

## Installation

```bash
npm install @waysnx/ui-security
```

## Import

```typescript
import { LoginCard } from '@waysnx/ui-security';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `title` | `string` | — | No |  |
| `description` | `string` | — | No |  |
| `logo` | `string | React.ReactNode` | — | No |  |
| `logoAlt` | `string` | — | No |  |
| `footerText` | `string` | — | No |  |
| `footerLinkText` | `string` | — | No |  |
| `onFooterLinkClick` | `() => void` | — | No |  |
| `maxWidth` | `string | number` | — | No |  |
| `onSubmit` | `(data: LoginFormData) => Promise<void> | void` | — | Yes |  |
| `className` | `string` | — | No |  |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/security-authentication-logincard)

## When to Use

Use this component when you need to:

- Use LoginCard for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use LoginCard for general-purpose components functionality

---

**Library:** `@waysnx/ui-security`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** components, logincard

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
