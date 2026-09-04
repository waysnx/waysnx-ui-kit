# SecureUploader

SecureUploader - File upload with security validation

## Purpose

SecureUploader - File upload with security validation

## Installation

```bash
npm install @waysnx/ui-security
```

## Import

```typescript
import { SecureUploader } from '@waysnx/ui-security';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `allowedTypes` | `string[]` | — | No | Allowed file types (MIME types) |
| `maxSize` | `number` | — | No | Maximum file size in bytes |
| `multiple` | `boolean` | — | No | Whether to allow multiple files |
| `label` | `string` | — | No | Label text |
| `onFilesSelected` | `(files: File[]) => Promise<void>` | — | No | Callback when files are selected |
| `onError` | `(error: string) => void` | — | No | Callback for upload errors |
| `isLoading` | `boolean` | — | No | Whether upload is in progress |
| `height` | `string` | — | No | Drag and drop area height |
| `helperText` | `string` | — | No | Custom help text |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/security-secure-inputs-secureuploader)

## Related Components

- **Button** — SecureUploader depends on Button
- **Stack** — SecureUploader depends on Stack

## When to Use

Use this component when you need to:

- Use SecureUploader for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use SecureUploader for general-purpose components functionality

---

**Library:** `@waysnx/ui-security`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** label, secureuploader, components

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
