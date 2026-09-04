# VerificationStatus

VerificationStatus Component Display verification progress and status: - Multiple verification steps - Status indicators (pending, verified, failed) - Progress bar - Uses ui-layout Stack for layout

## Purpose

VerificationStatus Component Display verification progress and status: - Multiple verification steps - Status indicators (pending, verified, failed) - Progress bar - Uses ui-layout Stack for layout

## Installation

```bash
npm install @waysnx/ui-security
```

## Import

```typescript
import { VerificationStatus } from '@waysnx/ui-security';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `steps` | `VerificationStepInfo[]` | — | Yes | Verification steps and their status |
| `overallStatus` | `VerificationStepStatus` | — | No | Overall verification status |
| `showProgress` | `boolean` | — | No | Show progress bar |
| `timeline` | `boolean` | — | No | Show timeline view instead of list |
| `className` | `string` | — | No | Custom CSS class |
| `testId` | `string` | — | No | Test ID |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/security-verification-verificationstatus)

## When to Use

Use this component when you need to:

- Use VerificationStatus for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use VerificationStatus for general-purpose components functionality

---

**Library:** `@waysnx/ui-security`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** verificationstatus, components

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
