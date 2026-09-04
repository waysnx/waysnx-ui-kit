# Grid

Build and configure responsive data grids with columns and rows.

## Purpose

Build and configure responsive data grids with columns and rows

## Installation

```bash
npm install @waysnx/ui-grid-builder
```

## Import

```typescript
import { Grid } from '@waysnx/ui-grid-builder';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `columnId` | `string;
  filterState: FilterState;
  onFilterChange: (state: FilterState) => void;
  onClose: () => void;` | — | No |  |

## Design Tokens

### Colors

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-color-border` | border, border-bottom, background, border-top, border-color | .wx-grid-wrapper, .wx-grid-toolbar, .wx-grid-col-toggle-btn, .wx-grid-col-dropdown, .wx-grid-filter-row th, .wx-grid-filter-input, .wx-grid-tbody tr, .wx-grid-action-btn, .wx-grid-skeleton-cell, .}


.wx-grid-pagination, .wx-grid-page-btn, .wx-grid-page-size select, .wx-grid-filter-dropdown, .wx-grid-filter-operator, .wx-grid-global-search-input, .wx-grid-kebab-btn, .wx-grid-kebab-menu, .wx-grid-badge--default | 19 |
| `--wx-color-surface` | background | .wx-grid-wrapper, .wx-grid-col-toggle-btn, .wx-grid-col-dropdown, .wx-grid-filter-input, .wx-grid-action-btn, .}


.wx-grid-pagination, .wx-grid-page-btn, .wx-grid-page-size select, .wx-grid-filter-dropdown, .wx-grid-filter-operator, .wx-grid-filter-popup-input, .wx-grid-global-search-input, .wx-grid-kebab-menu | 13 |
| `--wx-color-text` | color | .wx-grid-title, .wx-grid-col-item, .wx-grid-filter-input, .wx-grid-td, .wx-grid-page-btn, .wx-grid-page-size select, .wx-grid-filter-operator, .wx-grid-filter-popup-input, .wx-grid-global-search-input, .wx-grid-kebab-item, .wx-grid-selection-clear:hover | 11 |
| `--wx-color-text-muted` | color | .wx-grid-count, .wx-grid-col-toggle-btn, .wx-grid-col-dropdown-title, .wx-grid-action-btn, .wx-grid-empty, .wx-grid-pagination-info, .wx-grid-page-size, .wx-grid-kebab-btn, .wx-grid-badge--default, .wx-grid-selection-clear | 10 |
| `--wx-color-primary` | border-color, color, accent-color, background, border, border-bottom | .wx-grid-col-toggle-btn:hover, .wx-grid-col-item input[type="checkbox"], .wx-grid-thead, .wx-grid-filter-input:focus, .wx-grid-cell-email a, .wx-grid-action-btn:hover, .wx-grid-action-btn--primary, .wx-grid-page-btn:hover:not(:disabled):not(.wx-grid-page-btn--active), .wx-grid-page-btn--active, .wx-grid-page-btn--active:hover, .wx-grid-page-size select:focus, .wx-grid-filter-operator:focus, .wx-grid-filter-popup-input, .wx-grid-filter-popup-input:focus, .wx-grid-filter-clear-btn, .wx-grid-filter-clear-btn:hover, .wx-grid-global-search-input:focus, .wx-grid-kebab-btn:hover, .wx-grid-row-checkbox, .wx-grid-selection-bar, .wx-grid-selection-count | 27 |
| `--wx-color-surface-hover` | background | .wx-grid-col-item:hover, .wx-grid-tbody tr:hover, .wx-grid-skeleton-cell, .wx-grid-kebab-item:hover, .wx-grid-badge--default, .wx-grid-selection-clear:hover | 6 |
| `--wx-color-primary-contrast` | color | .wx-grid-th, .wx-grid-action-btn--primary, .wx-grid-action-btn--primary:hover, .wx-grid-filter-clear-btn:hover | 4 |
| `--wx-color-surface-alt` | background | .wx-grid-filter-row th | 1 |
| `--wx-color-success-light` | background | .wx-grid-cell-boolean--true | 1 |
| `--wx-color-success` | color | .wx-grid-cell-boolean--true | 1 |
| `--wx-color-error-light` | background | .wx-grid-cell-boolean--false, .wx-grid-kebab-item--destructive:hover | 2 |
| `--wx-color-error` | color, border-color | .wx-grid-cell-boolean--false, .wx-grid-action-btn--destructive:hover, .wx-grid-global-search-clear:hover, .wx-grid-kebab-item--destructive | 5 |
| `--wx-color-primary-hover` | background, border-color | .wx-grid-action-btn--primary:hover | 2 |
| `--wx-color-text-light` | color | .wx-grid-global-search-input::placeholder, .wx-grid-global-search-clear | 2 |
| `--wx-color-primary-light` | background | .wx-grid-tbody tr.wx-grid-row-selected, .wx-grid-selection-bar | 2 |

### Typography

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-font-family` | font-family | .wx-grid-wrapper | 1 |
| `--wx-font-size-md` | font-size | .wx-grid-title | 1 |
| `--wx-font-size-sm` | font-size | .wx-grid-count, .wx-grid-col-toggle-btn, .wx-grid-col-item, .wx-grid-table, .wx-grid-th, .wx-grid-empty, .wx-grid-pagination-info, .wx-grid-page-btn, .wx-grid-page-size, .wx-grid-page-size select, .wx-grid-filter-operator, .wx-grid-filter-popup-input, .wx-grid-filter-clear-btn, .wx-grid-global-search-input, .wx-grid-kebab-item, .wx-grid-selection-count | 16 |
| `--wx-font-size-xs` | font-size | .wx-grid-col-dropdown-title, .wx-grid-sort-icon, .wx-grid-filter-input, .wx-grid-cell-boolean, .wx-grid-action-btn, .}


.wx-grid-filter-icon-btn, .wx-grid-global-search-clear, .wx-grid-badge, .wx-grid-selection-clear | 9 |

### Radius

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-radius-md` | border-radius | .wx-grid-wrapper, .wx-grid-col-toggle-btn, .wx-grid-col-dropdown, .wx-grid-filter-dropdown, .wx-grid-filter-operator, .wx-grid-filter-popup-input, .wx-grid-filter-clear-btn, .wx-grid-global-search-input, .wx-grid-kebab-menu | 9 |
| `--wx-radius-sm` | border-radius | .wx-grid-filter-input, .wx-grid-cell-image img, .wx-grid-action-btn, .wx-grid-skeleton-cell, .wx-grid-page-btn, .wx-grid-page-size select, .wx-grid-kebab-btn, .wx-grid-selection-clear | 8 |

### Shadows

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-shadow-lg` | box-shadow | .wx-grid-col-dropdown, .wx-grid-filter-dropdown, .wx-grid-kebab-menu | 3 |
| `--wx-shadow-focus` | box-shadow | .wx-grid-filter-popup-input:focus | 1 |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/components-grid)

## Related Components

- **GridActions** — Grid depends on GridActions
- **GridCell** — Grid depends on GridCell
- **GridPagination** — Grid depends on GridPagination
- **GridSelectionBar** — Grid depends on GridSelectionBar
- **GridToolbar** — Grid depends on GridToolbar

## When to Use

Use this component when you need to:

- Use Grid for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use Grid for general-purpose components functionality

---

**Library:** `@waysnx/ui-grid-builder`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** grid, components

**Semantic Category:** layout

This component is indexed for AI agents, RAG pipelines, and documentation search.
