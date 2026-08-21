# WaysNX UI Kit Architecture

This document provides the repository-level architecture overview for WaysNX UI Kit.

WaysNX UI Kit is a modular React UI ecosystem composed of focused libraries, shared design foundations, an aggregate package, generated documentation, validation tooling, and reference applications.

For detailed implementation guidance, see the [WaysNX UI Kit Developer Handbook](https://uikit.waysnx.tech).

---

## Architectural Goals

WaysNX UI Kit is designed to provide:

- Modular package boundaries
- Reusable UI capabilities
- Consistent public APIs
- Shared design foundations
- Accessibility-aware components
- Security-aware UI patterns
- Type-safe development
- Independent package consumption
- Predictable dependency relationships
- Testable components and workflows
- Generated and traceable documentation
- Compatibility with modern React applications

The UI Kit is a **UI library ecosystem**, not an application or backend framework.

---

## Package Architecture

The public UI Kit consists of:

- **17 focused libraries**
- **242 documented components**
- **1 aggregate package:** `@waysnx/ui-kit`

The aggregate package is a convenience package and is not counted as an additional focused library.

```text id="0t5t1k"
                    WaysNX UI Kit
                          │
             ┌────────────┴────────────┐
             │                         │
      Focused Libraries          Aggregate Package
             │                         │
             │                  @waysnx/ui-kit
             │                         │
             └────────────┬────────────┘
                          │
                   React Applications
```

Focused libraries can be installed and consumed independently.

---

## Library Boundaries

Each library has a defined functional responsibility.

Examples include:

| Responsibility | Package |
|---|---|
| Foundational UI | `@waysnx/ui-core` |
| Forms | `@waysnx/ui-forms` |
| Schema-driven forms | `@waysnx/ui-form-builder` |
| Layout | `@waysnx/ui-layout` |
| Feedback | `@waysnx/ui-feedback` |
| Navigation | `@waysnx/ui-navigation` |
| Accessibility | `@waysnx/ui-accessibility` |
| Security | `@waysnx/ui-security` |
| Communication | `@waysnx/ui-communication` |
| Visualization | `@waysnx/ui-visualization` |
| Dashboard | `@waysnx/ui-dashboard` |
| Grid/data listing | `@waysnx/ui-grid-builder` |
| Internationalization | `@waysnx/ui-i18n` |

The complete library inventory is maintained by WDG-generated metadata and documented at:

**https://uikit.waysnx.tech**

A library should not absorb unrelated functionality simply because it is convenient to implement it there.

---

## Dependency Direction

Dependencies should generally move from specialized functionality toward stable foundational functionality.

```text id="pg3n52"
Application
    │
    ▼
Focused Libraries
    │
    ▼
Foundational Libraries
    │
    ▼
Shared Tokens / Utilities
```

Foundational packages should not depend on higher-level application-specific packages.

This helps maintain:

- Lower coupling
- Smaller dependency surfaces
- Predictable builds
- Easier testing
- Independent package consumption
- Long-term maintainability

When functionality crosses library boundaries, prefer composition or a clearly defined shared abstraction.

---

## Core Foundation

`@waysnx/ui-core` provides foundational UI capabilities used throughout the ecosystem.

It contains common controls and shared UI behavior such as:

- Button
- Input
- Select
- Checkbox
- Radio
- Textarea
- DatePicker
- Switch

The core library should remain focused on broadly reusable primitives.

Specialized functionality should generally be implemented in the appropriate focused library rather than continuously expanding `ui-core`.

---

## Composition Over Duplication

WaysNX UI Kit favors composition over duplicate implementations.

When an existing library already provides a suitable capability, higher-level functionality should reuse it.

For example:

```text id="ymq8y6"
Application Feature
       │
       ├── Core Controls
       │      └── @waysnx/ui-core
       │
       ├── Layout
       │      └── @waysnx/ui-layout
       │
       ├── Feedback
       │      └── @waysnx/ui-feedback
       │
       └── Navigation
              └── @waysnx/ui-navigation
```

This allows applications and libraries to build richer experiences from stable building blocks.

---

## Functional Libraries

Not every package is expected to expose standalone visual components.

Some libraries provide functionality through:

- Providers
- Hooks
- Services
- Schemas
- Builders
- Configuration
- Adapters
- Utilities
- Runtime functionality

For example:

- `@waysnx/ui-form-builder`
- `@waysnx/ui-i18n`

may legitimately contain zero standalone components in generated metadata.

A zero-component library is therefore not considered empty or invalid.

WDG represents these packages as functional libraries rather than forcing every package into a component-only model.

---

## Aggregate Package

`@waysnx/ui-kit` provides a convenient entry point for applications that want the primary WaysNX UI Kit libraries together.

The aggregate package currently includes:

- `@waysnx/ui-core`
- `@waysnx/ui-form-builder`
- `@waysnx/ui-layout`
- `@waysnx/ui-feedback`
- `@waysnx/ui-grid-builder`

Applications that need a smaller dependency surface can install focused libraries independently.

The aggregate package does not replace or merge the individual package boundaries.

---

## Shared Design Foundations

WaysNX UI Kit uses shared design tokens and CSS variables to maintain visual consistency across libraries.

Shared foundations include areas such as:

- Color
- Typography
- Spacing
- Border
- Radius
- Shadow
- Interaction states
- Themes

Components should consume shared tokens where appropriate rather than introducing unrelated visual constants.

Detailed token and theme guidance is maintained in [`docs/theming/README.md`](../theming/README.md) and the [Developer Handbook](https://uikit.waysnx.tech).

---

## Accessibility

Accessibility is part of the architecture rather than a final-stage validation activity.

Components should consider:

- Semantic HTML
- Keyboard interaction
- Focus management
- ARIA semantics
- Screen-reader behavior
- Color contrast
- Reduced motion
- Responsive behavior
- RTL where applicable

Detailed accessibility requirements are maintained in [`docs/accessibility/README.md`](../accessibility/README.md).

---

## Security

Security-sensitive UI functionality is primarily organized in:

`@waysnx/ui-security`

Security-oriented capabilities include areas such as:

- Permission and role gates
- Secure inputs
- Verification interfaces
- Session-related UI
- Secure upload interfaces
- Security status
- Trusted-device interfaces

UI-level security controls do not replace server-side authentication or authorization.

Detailed security guidance is maintained in [`docs/security/README.md`](../security/README.md).

---

## Application Boundary

WaysNX UI Kit is not responsible for application-specific business logic or backend enforcement.

The consuming application remains responsible for:

- Routing
- Application state
- Backend communication
- Authentication enforcement
- Authorization enforcement
- Business rules
- Data persistence
- Domain models
- Application workflows

UI Kit provides reusable presentation, interaction, composition, and UI functionality.

Client-side UI behavior must not be treated as a trusted security boundary.

---

## Rendering and Runtime

WaysNX UI Kit targets modern React applications and should avoid unnecessary assumptions about the rendering environment.

Components that require browser APIs should isolate browser-specific behavior appropriately.

Where applicable, implementations should consider:

- Server-side rendering
- React hydration
- Browser-only APIs
- DOM availability
- Browser events
- Resize and viewport behavior

Components should avoid introducing hydration mismatches through browser-only state during initial rendering.

Detailed SSR and runtime requirements belong in the Developer Handbook.

---

## Documentation Architecture

WaysNX UI Kit uses the WaysNX Documentation Generator (WDG) to produce structured documentation and machine-readable metadata.

The documentation flow is:

```text id="s90hkl"
Source Code
    │
    ▼
WDG Extraction
    │
    ▼
Structured Metadata
    │
    ├── Library Metadata
    ├── Component Metadata
    ├── Relationships
    ├── Search Indexes
    └── Schemas
    │
    ▼
Generated Documentation
    │
    ▼
uikit.waysnx.tech
```

Generated documentation should be derived from source evidence.

Generated JSON and generated documentation should not be manually patched to conceal extraction problems. Problems should be corrected in the source or WDG implementation and regenerated.

See [`docs/generated/`](../generated/) for repository-generated documentation output.

---

## Testing Architecture

Validation is performed at multiple levels.

### Unit and Component Testing

Used for:

- Component behavior
- State transitions
- Events
- Hooks
- Utilities
- Edge cases

### Storybook

Used for:

- Component states
- Variants
- Interactive examples
- Theme behavior
- Accessibility inspection

### Playwright

Used for:

- Browser behavior
- Critical interaction flows
- Keyboard behavior
- Responsive behavior
- Cross-browser validation

### Build and Package Validation

Used for:

- Package builds
- Type declarations
- Public exports
- CSS output
- Package metadata
- Clean installation

These layers complement one another and should not be treated as interchangeable.

Detailed validation standards are maintained in [`docs/testing/README.md`](../testing/README.md).

---

## Reference Application

The repository includes:

```text
examples/
└── waysnx-admin-demo/
```

The reference application demonstrates how multiple UI Kit libraries can be composed into an enterprise-style application shell.

It is intended to:

- Demonstrate practical usage
- Validate library composition
- Provide reference screens
- Support development and validation

It is not itself a production application framework.

---

## Repository Architecture

The repository separates source packages, documentation, generated output, examples, and validation tooling.

```text
waysnx-ui-kit/
│
├── assets/
│   └── branding/
│
├── packages/
│   └── <focused libraries>
│
├── examples/
│   └── waysnx-admin-demo/
│
├── docs/
│   ├── accessibility/
│   ├── architecture/
│   ├── generated/
│   ├── governance/
│   ├── integrations/
│   ├── security/
│   ├── testing/
│   └── theming/
│
├── storybook/
├── playwright/
├── templates/
├── tests/
├── tools/
└── wdg/
```

Top-level repository areas should have a clear responsibility. New architectural areas should only be introduced when they represent a meaningful boundary.

---

## Architectural Principles

### 1. Single Responsibility

Each library should have a clear and understandable purpose.

### 2. Composition Over Duplication

Reuse existing UI Kit capabilities rather than recreating equivalent functionality.

### 3. Stable Foundations

Foundational libraries should remain stable and avoid unnecessary coupling to higher-level functionality.

### 4. Explicit Dependencies

Dependencies should be intentional, reviewable, and appropriate to the package responsibility.

### 5. Public API Discipline

Public exports, component contracts, and types should be treated as stable interfaces.

### 6. Accessibility by Design

Accessibility should be considered during implementation, not only during final validation.

### 7. Security by Design

Security-sensitive behavior should be identified and reviewed during implementation.

### 8. Documentation from Evidence

Generated documentation metadata should be derived from implementation evidence.

### 9. Framework Independence

Libraries should avoid unnecessary coupling to application-specific frameworks or infrastructure.

### 10. Incremental Evolution

Architectural changes should solve demonstrated problems and avoid unnecessary structural rewrites.

---

## Architectural Changes

Changes affecting package boundaries, dependency direction, public APIs, shared foundations, or WDG architecture require additional review.

Examples include:

- Creating or removing a library
- Moving components between libraries
- Changing public exports
- Introducing a new foundational dependency
- Changing the aggregate package
- Changing shared token architecture
- Changing WDG metadata architecture
- Introducing a new cross-library abstraction

An architectural change should explain:

1. The problem being solved.
2. Why the current architecture is insufficient.
3. The proposed change.
4. Impact on existing consumers.
5. Migration requirements.
6. Testing and documentation impact.

---

## Developer Handbook

The detailed implementation standards for this architecture are maintained in the WaysNX UI Kit Developer Handbook:

**https://uikit.waysnx.tech**

The handbook is the preferred source for detailed:

- Component architecture
- Design tokens
- Theming
- Accessibility implementation
- Security implementation
- Testing standards
- SSR requirements
- WDG implementation
- Packaging
- Publishing
- Release procedures

This document intentionally provides the repository-level architectural contract without duplicating the detailed Developer Handbook.