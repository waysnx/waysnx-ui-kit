# SecureDownloadButton

SecureDownloadButton - Download files securely with cleanup Features: - Automatic blob URL cleanup - Optional validation callback - Error handling - Memory-safe file handling

## Purpose

SecureDownloadButton - Download files securely with cleanup Features: - Automatic blob URL cleanup - Optional validation callback - Error handling - Memory-safe file handling

## Installation

```bash
npm install @waysnx/ui-security
```

## Import

```typescript
import { SecureDownloadButton } from '@waysnx/ui-security';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `fileUrl` | `string | Blob` | — | No | File URL or blob to download |
| `fileName` | `string` | — | Yes | File name for download |
| `label` | `string` | — | No | Button label |
| `variant` | `'primary' | 'secondary' | 'outline' | 'ghost'` | — | No | Button variant |
| `size` | `'sm' | 'md' | 'lg'` | — | No | Button size |
| `onBeforeDownload` | `() => Promise<Blob | string>` | — | No | Callback before download starts |
| `onDownloadComplete` | `() => void` | — | No | Callback after download completes |
| `onError` | `(error: Error) => void` | — | No | Callback for errors |
| `disabled` | `boolean` | — | No | Whether button is disabled |
| `loadingLabel` | `string` | — | No | Custom loading message |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/security-secure-inputs-securedownloadbutton)

## Related Components

- **Button** — SecureDownloadButton depends on Button

## When to Use

Use this component when you need to:

- Use SecureDownloadButton for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use SecureDownloadButton for general-purpose components functionality

---

**Library:** `@waysnx/ui-security`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** label, securedownloadbutton, components

**Synonyms:** action control, clickable element

**Semantic Category:** display

This component is indexed for AI agents, RAG pipelines, and documentation search.
