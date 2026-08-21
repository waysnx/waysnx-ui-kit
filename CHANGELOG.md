# Changelog

All notable changes to WaysNX UI Kit are documented in this file.

The project follows [Semantic Versioning](https://semver.org/).

For the initial public release, the WaysNX UI Kit packages are being released as version `1.0.0`.

---

## [1.0.0] — 2026-09-01

### Initial Public Release

WaysNX UI Kit is publicly released as a modular React UI ecosystem.

This release includes:

- **17 focused UI libraries**
- **242 documented components**
- **1 aggregate package:** `@waysnx/ui-kit`
- React 19 and TypeScript support
- Shared design tokens and CSS variables
- Theme support
- Accessibility-focused components and validation
- Security-oriented UI capabilities
- Form and schema-driven UI capabilities
- Grid and data-oriented UI capabilities
- Navigation and application-shell components
- Communication and collaboration UI
- Dashboard and visualization capabilities
- Maps, media, files, and documentation-oriented UI
- Internationalization and RTL-related functionality
- Storybook component documentation and validation
- Playwright browser-level validation
- WDG-generated documentation and machine-readable metadata
- Reference application through `waysnx-admin-demo`

### Packages

The public release includes the following focused packages:

- `@waysnx/ui-accessibility`
- `@waysnx/ui-communication`
- `@waysnx/ui-core`
- `@waysnx/ui-dashboard`
- `@waysnx/ui-data`
- `@waysnx/ui-docs`
- `@waysnx/ui-feedback`
- `@waysnx/ui-files`
- `@waysnx/ui-form-builder`
- `@waysnx/ui-grid-builder`
- `@waysnx/ui-i18n`
- `@waysnx/ui-layout`
- `@waysnx/ui-maps`
- `@waysnx/ui-media`
- `@waysnx/ui-navigation`
- `@waysnx/ui-security`
- `@waysnx/ui-visualization`

The aggregate package is:

- `@waysnx/ui-kit`

The aggregate package is not counted as an additional focused library.

### Functional Libraries

The initial release includes functional libraries that do not represent their functionality as standalone component catalogs:

- `@waysnx/ui-form-builder`
- `@waysnx/ui-i18n`

These libraries may contain zero standalone components in generated WDG metadata while providing substantial application functionality.

### Documentation

The release includes generated documentation through the WaysNX Documentation Generator (WDG).

Documentation is available at:

**https://uikit.waysnx.tech**

### Validation

The public release has been prepared with validation covering:

- Package builds
- Type declarations
- Public exports
- CSS output
- Package metadata
- Documentation metadata
- Storybook
- Playwright
- Chromium
- Firefox
- WebKit
- Accessibility
- Security
- SSR/hydration behavior
- Clean package installation

### Release Scope

The `1.0.0` release represents the stabilized public baseline of WaysNX UI Kit.

Post-release feature development, improvements, and additional capabilities will be documented in subsequent releases rather than being retroactively added to this entry.

---

## Unreleased

Changes intended for the next release may be documented here before publication.

When the next version is released, move the relevant entries into a versioned section.

Suggested categories:

- Added
- Changed
- Deprecated
- Removed
- Fixed
- Security

---

## Versioning

WaysNX UI Kit follows Semantic Versioning:

- **MAJOR** — incompatible public API changes
- **MINOR** — backward-compatible functionality
- **PATCH** — backward-compatible fixes

Package versions should be updated through the project's release process.

Individual package changes should follow the compatibility requirements of the affected public API.

---

## Release Documentation

Detailed release procedures, package publishing, validation gates, and release workflows are maintained in the WaysNX UI Kit Developer Handbook:

**https://uikit.waysnx.tech**

---

[1.0.0]: https://github.com/waysnx/waysnx-ui-kit/releases/tag/v1.0.0