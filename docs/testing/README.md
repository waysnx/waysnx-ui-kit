# WaysNX UI Kit Testing

Testing is a core part of the WaysNX UI Kit development and release process.

The UI Kit uses multiple validation layers because no single testing approach can adequately validate reusable UI libraries. Unit tests, component tests, Storybook, Playwright, build validation, accessibility checks, and runtime validation each cover different classes of risk.

This document defines the repository-level testing strategy. Detailed test patterns, commands, coverage requirements, and component-specific guidance are maintained in the [WaysNX UI Kit Developer Handbook](https://uikit.waysnx.tech).

---

## Testing Goals

The testing strategy aims to provide confidence in:

* Component behavior
* Public APIs
* Type safety
* State transitions
* Accessibility
* Keyboard interaction
* Browser behavior
* Responsive behavior
* SSR and hydration
* Package builds
* Public exports
* Generated documentation
* Cross-library integration
* Release packages

Testing should identify regressions before they reach consumers.

---

## Testing Layers

WaysNX UI Kit uses multiple testing layers:

```text
                    WaysNX UI Kit Testing
                            │
          ┌─────────────────┼─────────────────┐
          │                 │                 │
      Unit/Component     Storybook        Playwright
          │                 │                 │
          └─────────────────┼─────────────────┘
                            │
                  Build / Package Validation
                            │
             ┌──────────────┼──────────────┐
             │              │              │
           A11y        SSR/Hydration    Cross-browser
                            │
                            ▼
                     Release Validation
```

Each layer has a specific purpose.

---

## Unit and Component Testing

Unit and component tests validate isolated behavior.

They should be used for:

* Component rendering
* Props
* Events
* State transitions
* Controlled and uncontrolled behavior
* Hooks
* Utilities
* Validation
* Edge cases
* Error handling
* Conditional behavior

Tests should focus on observable behavior rather than implementation details.

Avoid tests that are tightly coupled to internal implementation unless the internal behavior itself is part of a required contract.

---

## Testing Public APIs

Public component APIs should be tested through the behavior exposed to consumers.

Where applicable, tests should cover:

* Public props
* Public events
* Public types
* Public exports
* Default behavior
* Controlled behavior
* Disabled behavior
* Loading behavior
* Error behavior
* Accessibility behavior

Changes to public APIs should receive additional compatibility review.

---

## Component State Coverage

Interactive components should be tested across meaningful states.

Depending on the component, this may include:

* Default
* Hover
* Focus
* Active
* Disabled
* Selected
* Checked
* Invalid
* Error
* Loading
* Empty
* Success
* Warning

Not every component requires every state.

Testing should reflect the actual public behavior of the component.

---

## Storybook

Storybook provides an interactive environment for component development, inspection, and documentation.

Storybook is used for:

* Component examples
* Variants
* States
* Interactive controls
* Theme validation
* Accessibility inspection
* Visual inspection
* Responsive behavior
* Documentation

Storybook should demonstrate meaningful public component behavior rather than implementation-only states.

---

## Storybook Build

The Storybook production build should be validated before release.

This helps identify:

* Broken stories
* Missing exports
* Build configuration problems
* Documentation errors
* Missing dependencies
* Incorrect asset handling

A component change that affects Storybook behavior should include appropriate Storybook validation.

---

## Playwright

Playwright provides browser-level validation.

WaysNX UI Kit uses Playwright for critical interaction and integration scenarios that cannot be adequately validated through isolated component tests.

Examples include:

* Forms
* Navigation
* Dialogs
* Drawers
* Menus
* Keyboard interaction
* Responsive behavior
* Theme switching
* Application-shell behavior
* Cross-component interaction

---

## Browser Coverage

The release validation target includes:

* Chromium
* Firefox
* WebKit

Browser-specific behavior should be tested when a component depends on:

* Browser APIs
* Focus behavior
* Pointer behavior
* Layout calculations
* Resize observers
* Keyboard events
* Selection behavior
* Media behavior
* File APIs

A component that works in one browser is not automatically considered cross-browser compatible.

---

## Keyboard Testing

Keyboard behavior should be explicitly validated for interactive components.

Where applicable, tests should cover:

* Tab
* Shift+Tab
* Enter
* Space
* Escape
* Arrow keys
* Home
* End

Complex widgets should follow their intended keyboard interaction model.

Keyboard tests should verify both:

* What the user can do
* Where focus moves

---

## Accessibility Testing

Accessibility testing is integrated into the normal testing process.

It may include:

* Automated accessibility checks
* Keyboard testing
* Focus validation
* Accessible name validation
* ARIA validation
* Screen-reader testing
* Contrast validation
* Responsive accessibility testing

Automated accessibility checks are useful but do not replace manual accessibility testing.

See [`docs/accessibility/README.md`](../accessibility/README.md).

---

## SSR and Hydration Testing

Components intended to work in SSR environments should be tested for server/client consistency.

Validation should consider:

* Server rendering
* Client hydration
* Browser-only APIs
* Initial theme state
* DOM-dependent behavior
* Random values
* Time-dependent values
* Layout-dependent values

Components should not introduce hydration mismatches through client-only behavior during initial rendering.

Components that intentionally require a browser environment should isolate that behavior clearly.

---

## Responsive Testing

Responsive behavior should be tested at representative viewport sizes.

Validation may include:

* Desktop
* Tablet
* Mobile
* Narrow layouts
* Content wrapping
* Increased text size
* Long labels
* Large datasets

Components should remain usable when content changes rather than only when tested with ideal sample content.

---

## Theme Testing

Changes to shared visual foundations should be validated in supported themes.

At minimum, affected components should be checked for:

* Light theme
* Dark theme
* Focus visibility
* Contrast
* State visibility
* Disabled state
* Error state
* Selected state

See [`docs/theming/README.md`](../theming/README.md).

---

## Integration Testing

Integration tests validate how multiple UI Kit capabilities work together.

Examples include:

* Form + validation + feedback
* Grid + pagination + selection
* Navigation + layout
* Dialog + focus management
* Theme + components
* Accessibility + interactive controls
* Security gates + application actions

Integration testing should be used where individual component tests cannot provide sufficient confidence.

---

## Reference Application Testing

The `waysnx-admin-demo` application provides a practical environment for validating UI Kit composition.

Important flows may include:

* Dashboard navigation
* Complete form interaction
* Validation
* Grid listing
* Sidebar behavior
* User menu
* Theme switching
* Language switching
* Accessibility controls
* Notifications

The reference application should not become a replacement for package-level tests.

Its role is to validate realistic composition and integration.

---

## Package and Build Validation

Every public package must be validated for successful packaging.

Validation should include:

* Package build
* Type declarations
* Public exports
* CSS output
* Package metadata
* Dependency declarations
* Peer dependencies
* Generated files
* Clean installation

The published package should contain only intended artifacts.

---

## Clean Installation

A package should be validated from a clean environment before public release.

This helps detect:

* Missing dependencies
* Incorrect peer dependency declarations
* Missing build output
* Incorrect package exports
* Local-workspace dependencies
* Development-only assumptions

A package that works only inside the repository workspace is not considered release-ready.

---

## Generated Documentation Testing

WDG-generated output is part of the release validation process.

Validation should include:

* JSON schema validity
* Required metadata
* Library coverage
* Component coverage
* Source-to-output verification
* Search index validity
* Relationship validity
* Generated documentation consistency

Generated output should be regenerated from source rather than manually patched.

See [`docs/generated/`](../generated/).

---

## Test Data

Tests and examples must use synthetic data.

Do not use:

* Production credentials
* Real passwords
* Authentication tokens
* Customer data
* Personal information
* Production API keys
* Private infrastructure details

Test data should be deterministic where practical.

---

## Mocking and External Services

External services should generally be mocked or isolated during automated tests.

Examples include:

* Maps
* Geolocation
* Authentication services
* File storage
* Network APIs
* Browser permissions
* Third-party integrations

Tests should not depend on uncontrolled external services unless the test specifically validates an integration boundary.

External integration tests should be isolated from normal deterministic test suites.

---

## Flaky Tests

Flaky tests should not be ignored.

When a test fails intermittently:

1. Reproduce the failure.
2. Identify the underlying cause.
3. Fix synchronization, timing, state, or environment issues.
4. Re-run the affected test repeatedly.
5. Verify that the fix does not hide a genuine product defect.

Do not permanently disable a test simply because it is inconvenient.

---

## Test Naming

Test names should describe observable behavior.

Prefer:

```text id="t6v2fj"
opens the dialog when the action button is clicked
```

over:

```text id="p7q1hd"
calls setOpen with true
```

The first describes the public behavior; the second describes an implementation detail.

---

## Test Organization

Tests should remain close to the functionality they validate where the repository architecture supports colocated tests.

Repository-level integration and end-to-end tests should remain in the appropriate centralized test areas.

The repository should avoid duplicating the same test responsibility across multiple locations without a clear reason.

---

## Test Execution

The repository's current package scripts are the authoritative commands.

Common commands include:

```bash
pnpm test
```

```bash
pnpm test:e2e
```

```bash
pnpm build
```

```bash
pnpm storybook
```

Developers should use the narrowest appropriate validation during development and the complete release validation suite before a public release.

---

## Release Validation

Before the public release, validation should cover:

### Build

* All focused libraries build successfully.
* Type declarations are generated correctly.
* CSS output is present where required.
* Public exports resolve correctly.

### Runtime

* Components render correctly.
* Critical interactions work.
* SSR/hydration smoke tests pass where applicable.

### Accessibility

* Critical accessibility issues are resolved.
* Keyboard interaction works.
* Focus behavior is correct.
* Accessible names and states are present.

### Browser

* Chromium
* Firefox
* WebKit

### Documentation

* WDG output is schema-valid.
* Representative metadata matches source.
* Generated documentation is consistent.

### Packaging

* Clean installation succeeds.
* Package contents are correct.
* No unintended development artifacts are published.

---

## Release Gates

The public release should not proceed while unresolved P0 issues remain in areas such as:

* Build failures
* Broken public exports
* Critical runtime failures
* Security vulnerabilities
* Critical accessibility regressions
* Invalid generated metadata
* Broken package installation
* Serious SSR/hydration failures

Lower-priority issues may be moved to the post-release backlog when they do not compromise the stability or safety of the public release.

---

## Testing Philosophy

WaysNX UI Kit follows these principles:

### Test Behavior

Validate what consumers and users can observe.

### Test the Right Layer

Use unit tests for isolated behavior, Storybook for component states, Playwright for browser behavior, and integration tests for composition.

### Prefer Deterministic Tests

Tests should not depend unnecessarily on network services, timing, or uncontrolled environments.

### Treat Accessibility as Testing

Accessibility is part of normal validation, not a separate final activity.

### Validate the Published Artifact

A successful workspace build does not guarantee a correct published package.

### Fix Flaky Tests

Do not normalize intermittent failures.

### Keep Tests Maintainable

Tests should remain understandable and focused on meaningful behavior.

---

## Developer Handbook

Detailed testing guidance is maintained at:

**https://uikit.waysnx.tech**

The Developer Handbook should remain the primary source for:

* Test setup
* Test utilities
* Component test patterns
* Storybook standards
* Playwright configuration
* Browser matrix
* Accessibility testing
* SSR testing
* Coverage requirements
* CI validation
* Release validation procedures
* Troubleshooting

This repository document defines the testing strategy without duplicating the complete testing handbook.
