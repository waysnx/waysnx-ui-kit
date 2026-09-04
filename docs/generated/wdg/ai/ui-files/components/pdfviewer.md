# PDFViewer

PDFViewer — SHELL / ADAPTER (not a functional PDF renderer in 1.0.0). This component provides the viewer chrome (toolbar layout, zoom controls, accessible region) but does NOT render PDF page content. To display real pages, integrate a rendering engine such as PDF.js and draw into the content area below. Because no document is parsed, page count and per-page navigation are intentionally not provided — the previous build reported a hard-coded placeholder page count, which has been removed to avoid implying real rendering. The `src` prop is surfaced in the UI so integrators can confirm the value is wired through, but it is not fetched or parsed by this shell.

## Purpose

PDFViewer — SHELL / ADAPTER (not a functional PDF renderer in 1

## Installation

```bash
npm install @waysnx/ui-files
```

## Import

```typescript
import { PDFViewer } from '@waysnx/ui-files';
```

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/files-pdfviewer)

## Used By

This component is used by:

- DocumentPreview

## When to Use

Use this component when you need to:

- Use PDFViewer for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use PDFViewer for general-purpose components functionality

---

**Library:** `@waysnx/ui-files`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** components, pdfviewer

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
