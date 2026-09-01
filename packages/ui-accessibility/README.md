# @waysnx/ui-accessibility

Enterprise-grade accessibility control center for WaysNX UI Kit — centralized settings with real-time application across components.

## Installation

```bash
npm install @waysnx/ui-accessibility
```

Requires `react` and `react-dom` (>=18) as peer dependencies.

If your bundler does not import package CSS automatically, include the stylesheet:

```ts
import "@waysnx/ui-accessibility/dist/index.css";
```

## Overview

`@waysnx/ui-accessibility` provides an accessibility control center that manages user accessibility settings and applies them across an application in real time. An `AccessibilityProvider` supplies context, and a set of components and hooks expose controls and settings.

## Representative exports

- Provider & context: `AccessibilityProvider`, `AccessibilityContext`
- Components: `AccessibilityCenter`, `FloatingButton`, `ReadingGuide`, `Magnifier`, `SkipLinks`
- Hooks: `useAccessibility`, `useContrast`, `useFontScale`, `useFocus`, `useMotion`, `useSpeech`, `useAccessibilityProfile`, `useAccessibilityAnalytics`

See the documentation site for the complete, authoritative export and prop reference.

## Usage

```tsx
import { AccessibilityProvider, AccessibilityCenter } from "@waysnx/ui-accessibility";

export function App() {
  return (
    <AccessibilityProvider>
      <AccessibilityCenter />
    </AccessibilityProvider>
  );
}
```

## Documentation

Full component and API reference: https://uikit.waysnx.tech
