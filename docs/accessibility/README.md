# WaysNX UI Kit Accessibility

Accessibility is a core engineering requirement of WaysNX UI Kit.

The UI Kit is designed to help applications build interfaces that can be used by people with different abilities, input methods, devices, and assistive technologies.

This document defines the repository-level accessibility expectations. Detailed component-specific guidance, examples, testing procedures, and accessibility patterns are maintained in the [WaysNX UI Kit Developer Handbook](https://uikit.waysnx.tech).

---

## Accessibility Goals

WaysNX UI Kit aims to provide:

* Keyboard-accessible interfaces
* Meaningful semantic HTML
* Appropriate ARIA usage
* Predictable focus behavior
* Screen-reader compatible interactions
* Sufficient color contrast
* Visible interaction states
* Reduced-motion support where applicable
* Responsive and adaptable interfaces
* RTL-compatible behavior where supported
* Accessible form validation and feedback

Accessibility should be considered during component design and implementation rather than treated only as a final testing activity.

---

## Accessibility Standard

WaysNX UI Kit uses **WCAG 2.2 Level AA** as the primary accessibility target for public UI components where the requirement is applicable.

The exact accessibility behavior of an individual component depends on its interaction model and intended use.

Contributors should use the relevant WCAG success criteria and established WAI-ARIA patterns when implementing interactive components.

---

## Semantic HTML

Prefer native semantic HTML elements whenever they provide the required behavior.

Examples include:

```html id="d4g7n8"
<button>Save</button>
```

instead of creating a clickable generic element:

```html id="5v9w1b"
<div role="button">Save</div>
```

Native elements generally provide browser and assistive-technology behavior that should not be unnecessarily recreated.

ARIA should supplement semantic HTML where necessary rather than replacing appropriate native elements.

---

## Keyboard Accessibility

Interactive functionality must be usable without a mouse.

Depending on the component, contributors should consider:

* Tab navigation
* Shift+Tab navigation
* Enter
* Space
* Arrow keys
* Escape
* Home
* End
* Appropriate keyboard shortcuts

Keyboard interaction should follow established platform and WAI-ARIA patterns where applicable.

A component should not require pointer interaction when the same meaningful functionality is expected to be available through the keyboard.

---

## Focus Management

Focus behavior is an important part of accessible UI interaction.

Components should provide:

* A visible focus indicator
* Predictable focus movement
* Appropriate focus restoration
* Logical tab order
* Focus containment where required
* Focus handling for dialogs, drawers, menus, and popovers

For example, modal interfaces should generally:

1. Move focus into the active dialog.
2. Prevent inappropriate interaction with the underlying content.
3. Support keyboard dismissal where appropriate.
4. Restore focus to the appropriate element when closed.

Focus behavior should be validated across supported browsers.

---

## ARIA

ARIA should be used when semantic HTML alone does not provide the required accessibility semantics.

Contributors should:

* Use the correct role.
* Provide required accessible names.
* Provide required states and properties.
* Keep ARIA state synchronized with actual UI state.
* Avoid unnecessary ARIA attributes.
* Avoid creating custom widgets when native elements are sufficient.

Incorrect ARIA can make an interface less accessible than using native HTML alone.

---

## Accessible Names

Interactive controls should have meaningful accessible names.

Examples include:

* Buttons
* Inputs
* Select controls
* Checkboxes
* Radio buttons
* Dialogs
* Menus
* Navigation landmarks
* Icon-only controls

Icon-only controls should provide an accessible name through an appropriate public API or semantic mechanism.

Visible text and accessible names should remain consistent where possible.

---

## Forms

Forms require particular attention because they combine interaction, validation, status, and error communication.

Form components should consider:

* Associated labels
* Instructions
* Required state
* Invalid state
* Error messages
* Validation feedback
* Keyboard navigation
* Focus behavior
* Accessible descriptions
* Grouping of related fields

Validation errors should be understandable without relying solely on color.

---

## Error and Validation Messages

Errors should be communicated in a way that is understandable to users of assistive technologies.

A validation state should not rely exclusively on:

* Red color
* Icons without accessible text
* Visual positioning
* Placeholder text

Where appropriate, validation messages should be associated with the relevant form control and announced through an appropriate accessibility mechanism.

---

## Color and Contrast

Color must not be the only mechanism used to communicate important information.

For example:

```text id="d2l1x7"
Invalid
```

should not be communicated only by changing a border from gray to red.

The UI should provide additional semantic or textual information where necessary.

Themes and customizations should maintain sufficient contrast for:

* Text
* Interactive controls
* Focus indicators
* Important graphical information
* States that communicate meaning

See [`docs/theming/README.md`](../theming/README.md).

---

## Focus Indicators

Interactive elements must provide a visible indication of keyboard focus.

Focus indicators should:

* Be clearly visible
* Provide sufficient contrast
* Remain visible against the active theme
* Not depend exclusively on subtle color changes

Components should not remove browser focus indicators unless they provide an equivalent or better accessible replacement.

---

## Motion and Animation

Animations should not create accessibility barriers.

Where applicable, components should respect the user's reduced-motion preference.

For example:

```css id="gk8y1m"
@media (prefers-reduced-motion: reduce) {
  /* Reduce or remove non-essential animation */
}
```

Motion should not be required to understand or complete an interaction.

---

## Dialogs, Drawers, and Overlays

Components that temporarily move users away from the main page context require careful accessibility handling.

Examples include:

* Modal
* Dialog
* Drawer
* Popover
* Menu
* Command palette

These components should consider:

* Accessible naming
* Focus entry
* Focus containment where required
* Escape behavior
* Background interaction
* Focus restoration
* Screen-reader semantics

---

## Navigation

Navigation components should expose meaningful structure to assistive technologies.

Examples include:

* Navbar
* Sidebar
* Breadcrumb
* Menu
* Pagination
* Step navigation
* Tabs

Navigation should provide:

* Appropriate semantic landmarks
* Current/selected state
* Keyboard behavior
* Accessible names
* Logical ordering

---

## Tables and Grids

Data tables and interactive grids should communicate their structure and state appropriately.

Depending on the implementation, this may include:

* Column headers
* Row headers
* Selection state
* Sort state
* Pagination state
* Keyboard navigation
* Accessible names
* Loading state
* Empty state

Interactive grids should follow an appropriate accessibility pattern rather than simply applying ARIA roles to a visually formatted table.

---

## Loading and Asynchronous State

Loading behavior should be communicated appropriately.

Examples include:

* Loading indicators
* Progress
* Skeletons
* Async form submission
* Data fetching
* Background updates

Users should not be required to visually observe a spinner to understand that an operation is in progress.

Where appropriate, status information should be exposed through accessible mechanisms.

---

## Tooltips and Non-Essential Information

Tooltips should not be the only way to access essential information.

If information is necessary to complete an interaction, it should generally be available through a persistent or otherwise accessible mechanism.

Hover-only interactions should not be required for essential functionality.

---

## Responsive Accessibility

Accessibility includes usability across different viewport sizes and input methods.

Components should remain usable when:

* The viewport is narrow.
* Text is enlarged.
* Browser zoom is increased.
* Content wraps.
* Touch input is used.
* Keyboard input is used.

Responsive layouts should not hide essential information or make important controls inaccessible.

---

## RTL

Where RTL is supported, accessibility behavior should remain consistent.

Contributors should consider:

* Logical rather than physical layout assumptions
* Keyboard navigation
* Direction-sensitive icons
* Text alignment
* Navigation ordering
* Focus behavior

RTL support should not require duplicating component implementations.

---

## Screen Readers

Components should provide meaningful information to screen readers through:

* Semantic HTML
* Accessible names
* Roles
* States
* Descriptions
* Status announcements where necessary

Screen-reader behavior should be tested for complex interactive components.

Testing should consider supported browsers and commonly used assistive-technology combinations where practical.

---

## Accessibility Testing

Accessibility validation should use multiple layers.

### Automated Testing

Automated tools can identify issues such as:

* Missing accessible names
* Invalid ARIA
* Contrast problems
* Landmark issues
* Form labeling problems

Automated testing does not replace manual accessibility testing.

### Keyboard Testing

Interactive components should be tested without a mouse.

### Screen-Reader Testing

Complex interactive components should be tested with appropriate screen-reader combinations.

### Storybook

Storybook is used for component states, accessibility inspection, and interactive validation.

### Playwright

Playwright is used for browser-level accessibility and interaction validation where appropriate.

---

## Accessibility Checklist

Before merging a significant interactive component change, verify:

* [ ] Semantic HTML is used where appropriate.
* [ ] All interactive controls are keyboard accessible.
* [ ] Focus is visible.
* [ ] Focus order is logical.
* [ ] Focus is correctly managed for overlays and dialogs.
* [ ] Accessible names are provided.
* [ ] ARIA is used only when appropriate.
* [ ] Form controls have appropriate labels.
* [ ] Validation and errors are accessible.
* [ ] Important information is not conveyed by color alone.
* [ ] Reduced-motion behavior is considered.
* [ ] Responsive behavior is usable.
* [ ] RTL behavior is considered where supported.
* [ ] Relevant automated accessibility checks pass.
* [ ] Appropriate manual testing has been performed.

---

## Accessibility and Public APIs

Accessibility behavior is part of a component's public contract.

Changes to:

* Keyboard interaction
* Focus behavior
* Accessible names
* ARIA roles
* ARIA states
* Semantic structure
* Announced status
* Tab order

should be reviewed for compatibility impact.

An apparently small UI change can represent a significant accessibility regression.

---

## Accessibility and Custom Themes

Consumers can customize WaysNX UI Kit themes, but customization must not remove accessibility requirements.

A custom theme should preserve:

* Text contrast
* Focus visibility
* State clarity
* Error visibility
* Interactive control visibility

See [`docs/theming/README.md`](../theming/README.md).

---

## Accessibility Issues

Accessibility bugs should be reported through the normal contribution process unless they represent a security vulnerability.

Issue reports should include:

* Affected package
* Version
* Component
* Browser
* Reproduction steps
* Expected accessible behavior
* Actual behavior
* Assistive technology information where relevant

Security vulnerabilities must follow [SECURITY.md](../../SECURITY.md).

---

## Developer Handbook

Detailed accessibility documentation is maintained at:

**https://uikit.waysnx.tech**

The Developer Handbook should remain the primary source for:

* Component-specific accessibility requirements
* WAI-ARIA patterns
* Keyboard interaction specifications
* Screen-reader guidance
* Accessibility testing procedures
* WCAG mapping
* Accessibility examples
* Migration guidance

This repository document defines the accessibility contract for WaysNX UI Kit without duplicating the complete accessibility handbook.
