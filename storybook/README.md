# WaysNX UI Kit Storybook

This directory contains the Storybook configuration and stories used to develop, demonstrate, and validate WaysNX UI Kit components.

Storybook provides an isolated environment for inspecting component behavior and visual states before those components are consumed by applications.

---

## Purpose

Storybook is used to:

- Develop components in isolation
- Demonstrate public component APIs
- Show component variants and states
- Validate themes
- Inspect responsive behavior
- Support accessibility review
- Provide interactive examples
- Identify visual and interaction regressions

Storybook complements, but does not replace, automated unit tests or Playwright browser tests.

---

## Story Coverage

Stories should represent meaningful public behavior.

Depending on the component, stories may cover:

- Default state
- Variants
- Sizes
- Disabled state
- Loading state
- Selected state
- Error state
- Validation state
- Empty state
- Dark theme
- Responsive behavior
- Keyboard interaction
- Accessibility-related states

Not every component requires every state.

Stories should focus on behavior that is meaningful to consumers.

---

## Public API

Stories should use the same public APIs available to consuming applications.

Avoid using:

- Private component internals
- Undocumented implementation APIs
- Test-only APIs
- Internal package paths

This helps ensure that Storybook remains a reliable reference for public package usage.

---

## Component Documentation

Storybook may provide interactive documentation for components.

Detailed API documentation is also generated through the WaysNX Documentation Generator (WDG) and published through:

**https://uikit.waysnx.tech**

Storybook and the Developer Handbook serve different purposes:

```text
Storybook
    │
    ├── Interactive examples
    ├── Component states
    ├── Controls
    └── Visual inspection
            │
            ▼
Developer Handbook
    │
    ├── API reference
    ├── Usage guidance
    ├── Architecture
    ├── Accessibility
    └── Detailed implementation guidance