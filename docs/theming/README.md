# WaysNX UI Kit Theming

This document describes the repository-level theming and design-token approach used by WaysNX UI Kit.

WaysNX UI Kit uses shared design tokens and CSS variables to provide consistent visual behavior across its libraries while allowing consuming applications to customize the appearance of their interfaces.

Detailed token references, component-specific theming guidance, and implementation examples are maintained in the [WaysNX UI Kit Developer Handbook](https://uikit.waysnx.tech).

---

## Theming Goals

The theming system is designed to provide:

* Consistent visual language across libraries
* Centralized design tokens
* Light and dark theme support
* Application-level customization
* Predictable component states
* Accessible visual defaults
* Reduced duplication of visual constants
* CSS-based runtime customization where appropriate
* Compatibility across independently installed libraries

The goal is to allow applications to customize the UI Kit without modifying individual component implementations.

---

## Design Tokens

Design tokens represent reusable visual decisions.

WaysNX UI Kit uses tokens for areas such as:

* Colors
* Typography
* Spacing
* Border widths
* Border radius
* Shadows
* Component states
* Focus indicators
* Surface and background colors
* Text colors
* Interaction states

Tokens should be preferred over hard-coded visual values when a corresponding shared token exists.

---

## CSS Variables

Public theme values are exposed through CSS variables where appropriate.

A simplified example:

```css
:root {
  --waysnx-color-primary: ...;
  --waysnx-color-background: ...;
  --waysnx-color-text: ...;
  --waysnx-spacing-md: ...;
  --waysnx-radius-md: ...;
}
```

The exact token names and values are maintained by the current UI Kit implementation and Developer Handbook.

Applications should use documented public tokens rather than depending on internal implementation variables.

---

## Theme Structure

Themes define the values consumed by UI Kit components.

Conceptually:

```text
Design Tokens
      │
      ▼
CSS Variables
      │
      ├── Light Theme
      │
      └── Dark Theme
      │
      ▼
UI Kit Components
      │
      ▼
Application UI
```

Components should consume theme values rather than embedding assumptions about a specific application color scheme.

---

## Light and Dark Themes

WaysNX UI Kit supports theme-aware component behavior.

A theme may change values such as:

* Background surfaces
* Text colors
* Borders
* Component states
* Interactive colors
* Elevation/shadows
* Feedback colors

Components should remain visually coherent when the active theme changes.

Theme-specific values should be defined centrally rather than implemented independently inside individual components.

---

## Theme Switching

Applications may implement theme switching according to their application architecture.

A typical approach is to apply a theme identifier to a root application element:

```html
<html data-theme="dark">
```

or:

```html
<div data-theme="dark">
```

The exact mechanism should follow the supported UI Kit theming APIs and application requirements.

Theme switching should avoid unnecessary component-level state duplication.

---

## Custom Themes

Applications may customize the UI Kit to match their own product or organization.

Customization should preferably be performed through supported design tokens and CSS variables.

For example:

```css
:root {
  --waysnx-color-primary: var(--app-color-primary);
}
```

Applications should avoid overriding internal component selectors when a supported token or public API provides the required customization.

---

## Component States

The theme system should provide consistent visual treatment for common interaction states.

Examples include:

* Default
* Hover
* Focus
* Active
* Disabled
* Selected
* Checked
* Invalid
* Error
* Warning
* Success
* Loading

State styling should remain consistent across libraries wherever the same interaction pattern is used.

---

## Accessibility and Theming

Theming must not compromise accessibility.

Custom themes should maintain appropriate:

* Color contrast
* Focus visibility
* Text readability
* Disabled-state clarity
* Error and validation visibility
* Keyboard interaction visibility

Changing theme colors does not remove the application's responsibility to maintain accessible contrast and interaction states.

Automated accessibility validation should be used where appropriate.

See [`docs/accessibility/README.md`](../accessibility/README.md).

---

## Typography

Typography should be controlled through shared tokens and documented typography rules where applicable.

A theme may define:

* Font family
* Font size
* Font weight
* Line height
* Letter spacing

Applications should avoid overriding individual component typography selectors unnecessarily.

---

## Spacing

Spacing tokens provide consistent relationships between UI elements.

Typical spacing use cases include:

* Component padding
* Form field spacing
* Layout gaps
* Section spacing
* Dialog spacing
* Dashboard spacing

Components should use shared spacing values rather than introducing arbitrary spacing constants.

---

## Borders and Radius

Borders and radius tokens provide consistent component geometry.

They may control:

* Border width
* Border color
* Corner radius
* Focus outlines
* Selected states

Components should use the established design system values wherever applicable.

---

## Shadows and Elevation

Shadow and elevation values should be centralized where possible.

Common use cases include:

* Cards
* Dropdowns
* Menus
* Dialogs
* Drawers
* Popovers

Theme-specific shadow values may vary between light and dark themes where necessary to maintain visual clarity.

---

## Feedback Colors

Feedback states should use consistent semantic meaning.

Typical semantic categories include:

* Success
* Information
* Warning
* Error

Applications should not redefine these meanings arbitrarily across individual components.

Semantic colors should remain understandable in both light and dark themes.

---

## Runtime Customization

CSS variables allow applications to customize supported visual values at runtime without rebuilding component implementations.

This can be useful for:

* Tenant branding
* Product branding
* User-selected themes
* White-label applications
* Accessibility preferences
* Application-specific visual configuration

Runtime customization should use documented public variables and APIs.

---

## Component Library Independence

A consuming application may install only selected WaysNX UI Kit libraries.

The theming system therefore needs to remain consistent across independently consumed packages.

Libraries should not require an unrelated package solely to obtain basic visual consistency unless that dependency is an intentional architectural requirement.

Shared theme foundations should remain stable and predictable.

---

## Token Naming

Public token names should follow a consistent naming convention.

Token names should communicate their semantic purpose rather than only their visual appearance.

Prefer concepts such as:

```text
--waysnx-color-primary
--waysnx-color-text
--waysnx-color-surface
```

over implementation-specific names such as:

```text
--waysnx-blue-500
--waysnx-dark-gray
```

Semantic naming allows theme values to change without requiring component implementations to change.

---

## Avoiding Hard-Coded Values

Contributors should avoid introducing hard-coded visual values when an appropriate shared token exists.

Avoid:

```css
color: #123456;
padding: 17px;
border-radius: 9px;
```

when the design system already provides a suitable token.

Hard-coded values may still be appropriate for:

* Technical layout constraints
* Component-specific geometry
* Browser workarounds
* Calculated values
* Cases where no shared token is semantically appropriate

Such values should have a clear implementation reason.

---

## Theme Provider and Context

Where the UI Kit exposes theme providers or theme-related context, applications should use the public API rather than accessing internal context structures.

Theme infrastructure should remain an implementation detail unless explicitly documented as public API.

---

## SSR and Hydration

Theme initialization should be considered when applications use server-side rendering.

Theme-dependent rendering should avoid creating server/client markup differences during hydration.

Applications using SSR should establish the initial theme consistently between server-rendered and client-rendered output.

Detailed SSR and hydration guidance is maintained in the Developer Handbook.

---

## RTL and Localization

Themes should remain compatible with RTL layouts where supported.

Visual properties that depend on direction should not assume left-to-right layout when the component is designed to support RTL.

See the UI Kit internationalization documentation for language and direction-specific behavior.

---

## Testing Themes

Theme changes should be validated through appropriate testing layers.

Depending on the change, validation may include:

* Unit tests
* Component tests
* Storybook
* Visual inspection
* Accessibility checks
* Playwright
* Cross-browser validation
* SSR/hydration validation

Both light and dark themes should be checked when a change affects shared visual foundations.

---

## Adding or Changing Tokens

New tokens should be introduced only when an existing token cannot appropriately represent the required design decision.

Before adding a token:

1. Search for an existing suitable token.
2. Confirm the semantic requirement.
3. Consider both light and dark themes.
4. Consider accessibility impact.
5. Consider use across multiple components or libraries.
6. Document the token when it becomes part of the public contract.
7. Validate affected components.

Avoid creating one-off tokens for isolated implementation details unless there is a clear architectural reason.

---

## Breaking Theme Changes

Changing or removing a public token can affect consuming applications.

Potentially breaking changes include:

* Removing a public token
* Renaming a public token
* Changing semantic meaning
* Changing required theme structure
* Removing a supported theme
* Changing component behavior based on a public theme value

Such changes should be reviewed as public API changes.

---

## Developer Handbook

Detailed theming documentation is maintained at:

**https://uikit.waysnx.tech**

The Developer Handbook should remain the primary source for:

* Complete token reference
* Token values
* Theme API
* Component-specific theming
* Theme providers
* Custom theme examples
* Advanced customization
* SSR theme initialization
* Accessibility considerations
* Migration guidance

This repository document defines the high-level theming contract without duplicating the complete design-system reference.
