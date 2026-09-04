# Cropper

Cropper — interactive crop-selection UI. LIMITATION (1.0.0): This component provides a fully interactive crop overlay (move, resize, aspect-ratio locking) and reports the selected crop geometry (`x`, `y`, `width`, `height`) via `onCrop`. However, it does NOT yet produce cropped pixel output — `onCrop` returns the ORIGINAL image in `dataUrl`, not the cropped region. To obtain actual cropped image data, use the reported geometry to draw the selection onto a canvas in your application, or integrate a library such as `react-image-crop` or `cropperjs`.

## Purpose

Cropper — interactive crop-selection UI

## Installation

```bash
npm install @waysnx/ui-media
```

## Import

```typescript
import { Cropper } from '@waysnx/ui-media';
```

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/media-cropper)

## When to Use

Use this component when you need to:

- Use Cropper for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use Cropper for general-purpose components functionality

---

**Library:** `@waysnx/ui-media`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** components, cropper

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
