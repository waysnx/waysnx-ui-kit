# OCRScanner

OCRScanner — SHELL / INTEGRATION component (no built-in OCR engine). Provides the upload/drag-and-drop UI for OCR workflows but does NOT extract text on its own. To obtain real results, integrate an OCR engine (e.g. Tesseract.js) or a cloud OCR API in your application and feed the recognized text back to your own state. Importantly, this shell does NOT fabricate OCR `onResult` callback is only invoked with genuine text, so it will not fire until a real OCR integration is wired up. This avoids presenting placeholder text as if it were extracted content.

## Purpose

OCRScanner — SHELL / INTEGRATION component (no built-in OCR engine)

## Installation

```bash
npm install @waysnx/ui-media
```

## Import

```typescript
import { OCRScanner } from '@waysnx/ui-media';
```

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/media-ocrscanner)

## When to Use

Use this component when you need to:

- Use OCRScanner for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use OCRScanner for general-purpose components functionality

---

**Library:** `@waysnx/ui-media`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** ocrscanner, components

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
