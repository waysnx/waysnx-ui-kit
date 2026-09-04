# Auth0LoginButton

Auth0LoginButton Component Auth0 SSO login button.

## Purpose

Auth0LoginButton Component Auth0 SSO login button

## Installation

```bash
npm install @waysnx/ui-security
```

## Import

```typescript
import { Auth0LoginButton } from '@waysnx/ui-security';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `clientId` | `string` | — | No | Auth0 Client ID |
| `domain` | `string` | — | No | Auth0 domain |
| `onSuccess` | `(response: any) => void` | — | No | Callback on successful login |
| `onError` | `(error: Error) => void` | — | No | Callback on login error |
| `variant` | `'primary' | 'outline' | 'ghost'` | — | No | Button variant |
| `isLoading` | `boolean` | — | No | Show loading state |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/security-social-login-auth0loginbutton)

## Related Components

- **Button** — Auth0LoginButton depends on Button

## When to Use

Use this component when you need to:

- Use Auth0LoginButton for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use Auth0LoginButton for general-purpose components functionality

---

**Library:** `@waysnx/ui-security`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** auth0loginbutton, components

**Synonyms:** action control, clickable element

**Semantic Category:** display

This component is indexed for AI agents, RAG pipelines, and documentation search.
