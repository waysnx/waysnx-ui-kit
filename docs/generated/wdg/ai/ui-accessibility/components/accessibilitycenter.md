# AccessibilityCenter

AccessibilityCenter Component The main UI for accessibility settings

## Purpose

AccessibilityCenter Component The main UI for accessibility settings

## Installation

```bash
npm install @waysnx/ui-accessibility
```

## Import

```typescript
import { AccessibilityCenter } from '@waysnx/ui-accessibility';
```

## Design Tokens

### Colors

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-color-surface` | background-color | .wx-accessibility-panel, .wx-quick-action-btn, .wx-select, .wx-accessibility-drawer, .wx-accessibility-modal, .wx-accessibility-modal-header | 6 |
| `--wx-color-border` | border, border-bottom | .wx-accessibility-panel, .wx-a11y-tabs, .wx-profile-display, .wx-quick-action-btn, .wx-select, .wx-accessibility-modal-header | 7 |
| `--wx-color-text-muted` | color | .wx-a11y-tab, .wx-a11y-section-subtitle, .wx-score p, .wx-accessibility-modal-close | 4 |
| `--wx-color-text` | color, border | .wx-a11y-tab:hover, .wx-a11y-section-title, .wx-profile-name, .wx-quick-action-btn, .wx-setting label, .wx-setting-checkbox, .wx-select, .}


@media (prefers-contrast: more), .wx-accessibility-modal-header h2 | 9 |
| `--wx-color-primary` | outline, color, border-bottom-color, border-color, accent-color, background | .wx-a11y-tab:focus-visible, .wx-a11y-tab-active, .wx-quick-action-btn:hover, .wx-quick-action-btn:focus-visible, .wx-quick-action-btn.wx-active, .wx-select:hover, .wx-select:focus-visible, .wx-setting input[type='checkbox'], .wx-score-circle, .wx-accessibility-modal-close:focus-visible | 13 |
| `--wx-color-surface-alt` | background-color | .wx-profile-display, .wx-score | 2 |
| `--wx-color-surface-hover` | background-color | .wx-quick-action-btn:hover, .wx-accessibility-modal-close:hover | 2 |
| `--wx-color-primary-light` | background-color | .wx-quick-action-btn.wx-active | 1 |
| `--wx-color-primary-hover` | — | .wx-score-circle | 1 |
| `--wx-color-primary-contrast` | color | .wx-score-circle | 1 |

### Typography

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-font-family` | font-family | .wx-accessibility-center | 1 |
| `--wx-font-size-sm` | font-size | .wx-a11y-tab, .wx-a11y-section-subtitle, .wx-profile-name, .wx-setting label, .wx-setting-checkbox, .wx-select, .wx-score p | 7 |
| `--wx-font-size-md` | font-size | .wx-a11y-section-title | 1 |
| `--wx-font-size-xs` | font-size | .wx-quick-action-btn | 1 |
| `--wx-font-size-lg` | font-size | .wx-accessibility-modal-header h2 | 1 |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/accessibility-accessibilitycenter)

## Related Components

- **AccessibilityCenterProps** — AccessibilityCenter is related to AccessibilityCenterProps
- **FloatingButton** — AccessibilityCenter depends on FloatingButton

## When to Use

Use this component when you need to:

- Use AccessibilityCenter for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use AccessibilityCenter for general-purpose components functionality

---

**Library:** `@waysnx/ui-accessibility`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** accessibilitycenter, components

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
