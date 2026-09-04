# @waysnx/ui-media

Media and visual components from WaysNX - QR/barcode, signatures, image/video/audio, OCR, and color picker

**Version:** `1.0.0`


## Installation

### NPM

```bash
npm install @waysnx/ui-media
```

### Yarn

```bash
yarn add @waysnx/ui-media
```

### PNPM

```bash
pnpm add @waysnx/ui-media
```


## Package Information

| Property | Value |
|----------|-------|
| **Package** | `@waysnx/ui-media` |
| **Version** | `1.0.0` |
| **License** | Apache-2.0 |
| **Author** | WaysNX Technologies |


## Dependencies

### Peer Dependencies (Required)

Your project must provide these packages:

- `react` - >=18
- `react-dom` - >=18

### Runtime Dependencies

Automatically installed:

- `@waysnx/ui-i18n` - workspace:*
- `dompurify` - ^3.3.1
- `qrcode` - ^1.5.4


## Components Overview

**Total Components:** 12

| Category | Count |
|----------|-------|
| components | 12 |


## Components

### components

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


## Quick Start

### Basic Usage

```typescript
import React from 'react';
import { Button } from '@waysnx/ui-media';

export function App() {
  return (
    <div>
      <Button onClick={() => console.log('Clicked')}>
        Click Me
      </Button>
    </div>
  );
}
```

### With Props

```typescript
import { Input, Select } from '@waysnx/{library_name}';

export function Form() {
  const [value, setValue] = React.useState('');

  return (
    <>
      <Input
        placeholder='Enter text'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Select>
        <option>Option 1</option>
        <option>Option 2</option>
      </Select>
    </>
  );
}
```


## Enterprise Context

This library is used in enterprise applications including:

- crm
- erp
- hrms


## Documentation

### Component Documentation

Each component includes:

- Full API documentation
- Props and TypeScript types
- Usage examples
- Accessibility features
- Design tokens applied

### Available Resources

- [Component Docs](./components/) - Individual component documentation
- [LLM Guide](./LLM.md) - AI agent guide for this library
- [Storybook](./storybook) - Interactive component explorer
- [Design System](./library.json) - Library metadata
- [Search Index](./search-index.json) - Full-text search
- [Relationships](./relationships.json) - Component dependency graph


## Support

### Getting Help

- Check component-specific documentation
- Review examples and demos
- Check for common issues

### Reporting Issues

If you encounter issues:

1. Check existing issues on GitHub
2. Provide reproduction steps
3. Include your environment details
4. Attach relevant code examples

### Contributing

Contributions are welcome! Please follow:

- Component design guidelines
- Accessibility standards (WCAG 2.1)
- TypeScript best practices
- Test coverage requirements

