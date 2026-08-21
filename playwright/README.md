# WaysNX UI Kit Playwright

This directory contains the Playwright configuration and browser-level tests used to validate WaysNX UI Kit.

Playwright is used to validate user-visible behavior in real browsers, including interaction, keyboard navigation, responsive behavior, accessibility-sensitive flows, and cross-browser compatibility.

---

## Purpose

Playwright is used for:

- Browser-level interaction testing
- Critical user workflows
- Keyboard navigation
- Focus management
- Responsive behavior
- Theme switching
- Cross-browser validation
- Application-level composition
- Accessibility-sensitive interactions
- Regression testing

Playwright complements unit/component tests and Storybook rather than replacing them.

---

## Testing Model

WaysNX UI Kit uses multiple validation layers:

```text
Unit / Component Tests
        │
        ▼
    Storybook
        │
        ▼
    Playwright
        │
        ▼
Build / Package Validation
        │
        ▼
Release Validation