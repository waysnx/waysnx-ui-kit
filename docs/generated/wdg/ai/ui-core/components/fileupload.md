# FileUpload

Enable users to upload files with drag-and-drop support and validation.

## Purpose

Enable users to upload files with drag-and-drop support and validation

## Installation

```bash
npm install @waysnx/ui-core
```

## Import

```typescript
import { FileUpload } from '@waysnx/ui-core';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `label` | `string` | — | No |  |
| `accept` | `string` | — | No |  |
| `multiple` | `boolean` | — | No |  |
| `maxSize` | `number` | — | No |  |
| `onChange` | `(files: File[] | string[]) => void` | — | No |  |
| `onError` | `(error: string) => void` | — | No |  |
| `hint` | `string` | — | No |  |
| `error` | `string` | — | No |  |
| `disabled` | `boolean` | — | No |  |
| `id` | `string` | — | No |  |
| `className` | `string` | — | No |  |
| `format` | `'blob' | 'binary'` | — | No |  |
| `showPreview` | `boolean` | — | No |  |
| `autoUpload` | `boolean` | — | No |  |
| `browseButtonText` | `string` | — | No |  |
| `uploadedFiles` | `Array<{ name: string` | — | No |  |

## Design Tokens

### Colors

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-color-text` | color | .wx-fileupload-label, .wx-fileupload-text-primary, .wx-fileupload-item-name | 3 |
| `--wx-color-border` | border, border-color, background-color | .wx-fileupload-dropzone, .wx-fileupload-dropzone-disabled:hover, .wx-fileupload-item, .wx-fileupload-progress-bar | 4 |
| `--wx-color-surface-alt` | background-color | .wx-fileupload-dropzone, .wx-fileupload-item | 2 |
| `--wx-color-primary` | border-color, color, background-color | .wx-fileupload-dropzone:hover, .wx-fileupload-dropzone-dragging, .wx-fileupload-dropzone:hover .wx-fileupload-icon, .wx-fileupload-dropzone-dragging .wx-fileupload-icon, .wx-fileupload-upload-btn, .wx-fileupload-uploaded-link, .wx-fileupload-progress-fill | 7 |
| `--wx-color-primary-light` | background-color | .wx-fileupload-dropzone:hover, .wx-fileupload-dropzone-dragging | 2 |
| `--wx-color-error` | border-color, color | .wx-fileupload-dropzone-error, .wx-fileupload-item-remove:hover, .wx-fileupload-error-text, .wx-fileupload-item-status-error | 4 |
| `--wx-color-error-light` | background-color | .wx-fileupload-dropzone-error, .wx-fileupload-item-remove:hover | 2 |
| `--wx-color-surface-hover` | background-color | .wx-fileupload-dropzone-disabled, .wx-fileupload-dropzone-disabled:hover, .wx-fileupload-item:hover, .wx-fileupload-preview, .wx-fileupload-uploaded-preview | 5 |
| `--wx-color-text-light` | color | .wx-fileupload-icon, .wx-fileupload-item-date | 2 |
| `--wx-color-text-muted` | color | .wx-fileupload-text-secondary, .wx-fileupload-item-size, .wx-fileupload-item-remove, .wx-fileupload-hint, .wx-fileupload-item-status | 5 |
| `--wx-color-success` | color, border | .wx-fileupload-item-status-success, .wx-fileupload-uploaded-section, .wx-fileupload-uploaded-label | 3 |
| `--wx-color-primary-contrast` | color | .wx-fileupload-upload-btn | 1 |
| `--wx-color-primary-hover` | background-color | .wx-fileupload-upload-btn:hover | 1 |
| `--wx-color-success-light` | background-color | .wx-fileupload-uploaded-section | 1 |
| `--wx-color-surface` | background-color | .wx-fileupload-uploaded-item | 1 |
| `--wx-color-info` | color | .wx-fileupload-item-status-uploading | 1 |

### Typography

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-font-family` | font-family | .wx-fileupload-wrapper | 1 |
| `--wx-font-size-sm` | font-size | .wx-fileupload-label, .wx-fileupload-text-primary, .wx-fileupload-item-name, .wx-fileupload-upload-btn, .wx-fileupload-uploaded-link | 5 |
| `--wx-font-size-xs` | font-size | .wx-fileupload-text-secondary, .wx-fileupload-item-size, .wx-fileupload-hint, .wx-fileupload-error-text | 4 |

### Radius

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-radius-md` | border-radius | .wx-fileupload-dropzone, .wx-fileupload-item, .wx-fileupload-upload-btn, .wx-fileupload-uploaded-section | 4 |
| `--wx-radius-sm` | border-radius | .wx-fileupload-item-remove, .wx-fileupload-preview, .wx-fileupload-uploaded-item, .wx-fileupload-uploaded-preview | 4 |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/components-fileupload)

## When to Use

Use this component when you need to:

- Use FileUpload for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use FileUpload for general-purpose components functionality

---

**Library:** `@waysnx/ui-core`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** fileupload, label, components

**Semantic Category:** input

This component is indexed for AI agents, RAG pipelines, and documentation search.
