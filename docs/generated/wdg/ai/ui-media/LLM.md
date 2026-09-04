# Ui Media - AI Agent Guide

## Overview

**Package:** `@waysnx/ui-media`
**Version:** `1.0.0`
**Description:** Media and visual components from WaysNX - QR/barcode, signatures, image/video/audio, OCR, and color picker

---

## Quick Reference

- **Total Components:** 12
- **Installation:** `npm install @waysnx/ui-media`
- **Latest Version:** `1.0.0`


## Installation & Setup

### NPM

```bash
npm install @waysnx/ui-media
```

### Yarn

```bash
yarn add @waysnx/ui-media
```


## Component Catalog

### Components

- **AudioPlayer** - Play audio content with playback controls and progress tracking
- **Barcode** - Generate and display barcodes for identification or tracking
- **BarcodeScanner** - Enable barcode scanning via device camera
- **ColorPicker** - Enable selection and input of colors
- **Cropper** - Cropper — interactive crop-selection UI
- **ImageViewer** - Display and allow interaction with images in fullscreen or modal
- **OCRScanner** - OCRScanner — SHELL / INTEGRATION component (no built-in OCR engine)
- **QRCode** - QRCode — renders a real, scannable QR code to a canvas using the `qrcode` library, with optional PNG
- **QRScanner** - Enable QR code scanning via device camera
- **SignaturePad** - Enable users to draw or write signatures
- **SignatureViewer** - Display captured signatures for verification or review
- **VideoPlayer** - Play video content with standard player controls


## Component Selection Guide

Choose components based on your needs:

### Display

- `ImageViewer` - Display and allow interaction with images in fullscreen or modal

### Utility

- `AudioPlayer` - Play audio content with playback controls and progress tracking
- `Barcode` - Generate and display barcodes for identification or tracking
- `BarcodeScanner` - Enable barcode scanning via device camera
- `ColorPicker` - Enable selection and input of colors
- `Cropper` - Cropper — interactive crop-selection UI
- `OCRScanner` - OCRScanner — SHELL / INTEGRATION component (no built-in OCR engine)
- `QRCode` - QRCode — renders a real, scannable QR code to a canvas using the `qrcode` librar
- `QRScanner` - Enable QR code scanning via device camera
- `SignaturePad` - Enable users to draw or write signatures
- `SignatureViewer` - Display captured signatures for verification or review
- `VideoPlayer` - Play video content with standard player controls


## Common Usage Patterns

### Basic Usage

```typescript
import { Component } from '@waysnx/{library}';

export function MyComponent() {
  return <Component />;
}
```

### Composition

Common component combinations:

- **AudioPlayer** is often used with other input components
- **Barcode** is often used with other input components
- **BarcodeScanner** is often used with other input components


## Common Mistakes & Anti-Patterns

Avoid these patterns when using components from this library:

- **Prop Drilling:** Use Context or composition instead of passing props deeply
- **Missing a11y:** Always include ARIA labels and semantic HTML
- **Hardcoded Values:** Use design tokens and theme values instead
- **Missing Error Handling:** Always handle loading and error states

See individual component documentation for specific anti-patterns.


## Package Dependencies

### Runtime Dependencies

- `@waysnx/ui-i18n` (`workspace:*`)
- `dompurify` (`^3.3.1`)
- `qrcode` (`^1.5.4`)

### Peer Dependencies

Your project must provide:

- `react` (`>=18`)
- `react-dom` (`>=18`)


## AI Guidance

This library is optimized for AI code generation and documentation search.

### Component Metadata

**AudioPlayer**
- Keywords: audioplayer, components

**Barcode**
- Keywords: barcode, components

**BarcodeScanner**
- Keywords: components, barcodescanner

### Searchable Metadata

Components are indexed with:

- **Keywords:** For semantic search
- **Aliases:** Alternative names AI agents might search for
- **Semantic Categories:** Classification for AI recommendations
- **Use Cases:** AI understands when to suggest each component
- **Anti-patterns:** AI avoids suggesting incorrect usage

### Querying Components

AI agents can answer:

- 'Which component should I use for X?'
- 'What are the props for Component Y?'
- 'What components work with X?'
- 'Show me examples of Z'
- 'What are the accessibility features?'


## References & Documentation

- [Component Documentation](./components/) - Detailed component docs
- [Design System](./library.json) - Library metadata
- [Component Relationships](./relationships.json) - Dependency graph
- [Search Index](./search-index.json) - Full-text search data

## Support

For issues or questions:

- Check component-specific documentation
- Review examples in Storybook
- File issues on GitHub

