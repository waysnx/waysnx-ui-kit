# KPICard

KPICard component

## Purpose

KPICard component

## Installation

```bash
npm install @waysnx/ui-dashboard
```

## Import

```typescript
import { StatCard } from '@waysnx/ui-dashboard';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `data` | `KPIData` | — | Yes | Card data |
| `className` | `string` | — | No | Additional CSS class |
| `style` | `CSSProperties` | — | No | Additional CSS styles |
| `onClick` | `() => void` | — | No | Click handler |

## Design Tokens

### Colors

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-color-surface` | background-color | .stat-card, .metric-card, .progress-card | 3 |
| `--wx-color-border` | border, border-left | .stat-card, .metric-card, .progress-card | 4 |
| `--wx-color-text-muted` | color | .stat-card-label, .metric-card-icon, .metric-unit, .metric-card-target, .metric-card-progress-text, .progress-card-label | 6 |
| `--wx-color-text` | color, fill | .stat-card-value, .metric-card-label, .metric-value, .progress-card-text, .progress-card-percentage | 5 |
| `--wx-color-text-light` | color | .stat-card-target | 1 |
| `--wx-color-surface-alt` | background-color | .stat-card.minimal | 1 |
| `--wx-color-surface-hover` | background-color | .metric-card-progress, .progress-card-bar | 2 |

### Typography

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-font-size-md` | font-size | .stat-card-icon | 1 |
| `--wx-font-size-sm` | font-size | .stat-card-label, .stat-card-trend-icon, .metric-card-label, .metric-unit, .metric-card-target, .progress-card-text, .progress-card-label, .progress-card-percentage | 8 |
| `--wx-accessibility-font-scale` | font-size | .stat-card-value, .stat-card-trend, .stat-card-change, .stat-card-target | 4 |
| `--wx-font-size-xl` | font-size | .metric-card-icon | 1 |
| `--wx-font-size-2xl` | font-size | .metric-value | 1 |
| `--wx-font-size-xs` | font-size | .metric-card-progress-text | 1 |

### Spacing

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-spacing-lg` | padding | .stat-card, .metric-card, .progress-card | 3 |
| `--wx-spacing-sm` | margin-bottom, gap, margin-top | .stat-card-value, .metric-card-header, .metric-card-values, .progress-card-label, .progress-card-header | 6 |
| `--wx-spacing-xl` | padding | .stat-card.detailed | 1 |

### Radius

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-radius-lg` | border-radius | .stat-card, .metric-card, .progress-card | 3 |
| `--wx-radius-md` | border-radius | .stat-card-icon | 1 |

### Shadows

| Token | CSS Properties | Selectors | Occurrences |
|-------|----------------|-----------|-------------|
| `--wx-shadow-sm` | box-shadow | .stat-card, .metric-card, .progress-card | 3 |
| `--wx-shadow-md` | box-shadow | .stat-card:hover, .metric-card:hover | 2 |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

View Interactive Storybook

## Related Components

- **KPIData** — KPICard is related to KPIData
- **MetricData** — KPICard is related to MetricData
- **StatusType** — KPICard is related to StatusType
- **TrendDirection** — KPICard is related to TrendDirection

## When to Use

Use this component when you need to:

- Use KPICard for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use KPICard for general-purpose components functionality

---

**Library:** `@waysnx/ui-dashboard`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** components, kpicard

**Semantic Category:** utility

This component is indexed for AI agents, RAG pipelines, and documentation search.
