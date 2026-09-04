# StepNavigation

Navigate between steps of a multi-step process or guide.

## Purpose

Navigate between steps of a multi-step process or guide

## Installation

```bash
npm install @waysnx/ui-navigation
```

## Import

```typescript
import { StepNavigation } from '@waysnx/ui-navigation';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `steps` | `StepItem[]` | — | Yes | Array of step definitions |
| `currentStep` | `number` | — | Yes | Current active step index |
| `onStepChange` | `(stepIndex: number) => void | Promise<void>` | — | No | Callback when step changes |
| `onValidateStep` | `(stepIndex: number) => boolean | Promise<boolean>` | — | No | Callback to validate if step can be changed |
| `allowBacktrack` | `boolean` | — | No | Allow going back to previous steps |
| `variant` | `'horizontal' | 'vertical' | 'dots'` | — | No | Display variant |
| `showDescriptions` | `boolean` | — | No | Show step descriptions |
| `showProgress` | `boolean` | — | No | Show progress percentage |
| `disableNextOnLastStep` | `boolean` | — | No | Disable next button on last step |
| `previousLabel` | `string` | — | No | Custom previous button label |
| `nextLabel` | `string` | — | No | Custom next button label |
| `finishLabel` | `string` | — | No | Custom finish button label |
| `onFinish` | `() => void | Promise<void>` | — | No | Callback when process is finished |
| `showFinishButton` | `boolean` | — | No | Show custom button labels at end of wizard |
| `className` | `string` | — | No | Additional CSS class |
| `style` | `React.CSSProperties` | — | No | Additional styles |
| `ariaLabel` | `string` | — | No | aria-label for accessibility |
| `testId` | `string` | — | No | Test ID |

## Accessibility

**WCAG:** 2.1 AA

**Keyboard:** Unknown

**RTL:** Unknown

**High Contrast:** Unknown

## Storybook

[View Interactive Storybook](https://uikit.waysnx.tech/?path=/docs/enterprise-stepnavigation)

## When to Use

Use this component when you need to:

- Use StepNavigation for general-purpose components functionality

## When NOT to Use

No specific anti-patterns documented.

## Best Practices

**✓ Good use cases:**
- Use StepNavigation for general-purpose components functionality

---

**Library:** `@waysnx/ui-navigation`
**Category:** `components`
**Version:** `1.0.0`

## AI & Integration Notes

**Keywords:** stepnavigation, components

**Semantic Category:** navigation

This component is indexed for AI agents, RAG pipelines, and documentation search.
