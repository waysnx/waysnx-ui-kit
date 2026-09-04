# GitHubLoginButton

GitHubLoginButton Component GitHub OAuth login button.

## Purpose

GitHubLoginButton Component GitHub OAuth login button

## Installation

```bash
npm install @waysnx/ui-security
```

## Import

```typescript
import { GitHubLoginButton } from '@waysnx/ui-security';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `clientId` | `string` | — | No | GitHub OAuth Client ID |
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

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/security-social-login-githubloginbutton)

## Related Components

- **Button** — GitHubLoginButton depends on Button

## When to Use

Use this component when you need to:

- Use GitHubLoginButton for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use GitHubLoginButton for general-purpose components functionality

---

**Library:** `@waysnx/ui-security`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** githubloginbutton, components

**Synonyms:** action control, clickable element

**Semantic Category:** display

This component is indexed for AI agents, RAG pipelines, and documentation search.
