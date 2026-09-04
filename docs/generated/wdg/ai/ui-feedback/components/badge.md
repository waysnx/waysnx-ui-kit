# Badge

Display a small numeric or dot indicator to convey status or count information.

## Purpose

Display a small numeric or dot indicator to convey status or count information

## Installation

```bash
npm install @waysnx/ui-feedback
```

## Import

```typescript
import { Badge } from '@waysnx/ui-feedback';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `count` | `number` | — | No |  |
| `maxCount` | `number` | — | No |  |
| `dot` | `boolean` | — | No |  |
| `color` | `"default" | "success" | "error" | "warning" | "info"` | — | No |  |
| `children` | `React.ReactNode` | — | No |  |
| `className` | `string` | — | No |  |
| `testId` | `string` | — | No |  |

## Design Tokens

### Colors

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-color-primary-contrast` | color | .wx-badge, .wx-badge-standalone | 2 |
| `--wx-color-text-light` | background | .wx-badge-default | 1 |
| `--wx-color-success` | background | .wx-badge-success | 1 |
| `--wx-color-error` | background | .wx-badge-error | 1 |
| `--wx-color-warning` | background | .wx-badge-warning | 1 |
| `--wx-color-info` | background | .wx-badge-info | 1 |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/components-badge)

## Used By

This component is used by:

- ActiveSessions
- ActivityFeed
- AuditHistoryTable
- AuditTimeline
- BackupCodesCard
- ConcurrentSessionDialog
- EncryptionBadge
- LoginHistory
- MFAStatus
- PasswordAgeIndicator
- RiskScoreBadge
- SecurityAlert
- SecurityEventLog
- SecurityStatusCard

## When to Use

Use this component when you need to:

- Use Badge for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use Badge for general-purpose components functionality

---

**Library:** `@waysnx/ui-feedback`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** components, badge

**Semantic Category:** display

This component is indexed for AI agents, RAG pipelines, and documentation search.
