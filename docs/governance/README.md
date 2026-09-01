# WaysNX UI Kit Governance

This document describes the governance model for WaysNX UI Kit.

WaysNX UI Kit is an open-source project maintained by **WaysNX Technologies Private Limited**. The project welcomes community contributions while maintaining clear ownership of the public API, release process, security, and architectural direction.

Detailed contribution procedures are defined in [`CONTRIBUTING.md`](../../CONTRIBUTING.md).

---

## Project Ownership

WaysNX UI Kit is maintained and released by:

**WaysNX Technologies Private Limited**

WaysNX is responsible for:

* Project direction
* Repository administration
* Package publishing
* Release management
* Public API stability
* Security response
* Architectural decisions
* Documentation standards
* CI/CD and release infrastructure
* npm package ownership

---

## Governance Principles

Project governance follows these principles:

1. **Open contribution** — community contributions are welcome.
2. **Clear ownership** — WaysNX maintains responsibility for the project and public releases.
3. **Technical merit** — decisions should be based on correctness, maintainability, usability, security, and long-term value.
4. **API stability** — public APIs should not change without appropriate consideration.
5. **Transparency** — significant project decisions should be documented where practical.
6. **Focused evolution** — changes should solve demonstrated problems rather than add unnecessary complexity.
7. **Quality before release** — releases must satisfy the project's validation requirements.
8. **Security first** — security issues receive appropriate priority regardless of feature schedules.

---

## Maintainers

Maintainers are responsible for the day-to-day technical health of the project.

Maintainer responsibilities may include:

* Reviewing pull requests
* Reviewing architectural changes
* Managing issues
* Reviewing security-sensitive changes
* Maintaining CI and tooling
* Approving releases
* Managing npm publication
* Maintaining project documentation
* Coordinating significant changes

Maintainers may be WaysNX employees or other contributors explicitly granted maintainer responsibility by WaysNX.

Maintainer status is granted by the project owner.

---

## Decision Making

Most routine changes can be handled through the normal pull request process.

For significant decisions, maintainers should consider:

* Technical correctness
* Existing architecture
* Public API impact
* Backward compatibility
* Accessibility
* Security
* Performance
* Testing requirements
* Documentation impact
* Maintenance cost
* Impact on existing consumers

When there is disagreement, maintainers may request additional technical evidence, prototypes, tests, or documentation before making a decision.

WaysNX retains final authority over project direction and releases.

---

## Types of Decisions

### Routine Changes

Examples:

* Bug fixes
* Documentation corrections
* Test improvements
* Internal refactoring
* Minor implementation improvements

These normally follow the standard pull request process.

### Public API Changes

Examples:

* New components
* New props
* Changed component behavior
* Changed public exports
* Deprecated APIs
* Removed APIs
* Changed types

These require additional review for compatibility and documentation impact.

### Architectural Changes

Examples:

* Creating or removing libraries
* Moving components between libraries
* Changing package dependency direction
* Changing shared token architecture
* Changing aggregate package composition
* Introducing major cross-library abstractions
* Changing WDG architecture

These should be discussed with maintainers before implementation.

### Security Changes

Changes involving:

* Authentication
* Authorization
* Sensitive data
* File uploads
* HTML rendering
* URLs
* Browser storage
* Session behavior
* Security providers
* Publishing infrastructure

may require additional security review.

---

## Public API Ownership

WaysNX UI Kit treats public APIs as long-term contracts.

Public APIs include:

* Package exports
* Component names
* Component props
* Events
* Types
* Hooks
* Providers
* Public utilities
* CSS/design-token contracts where documented

Before changing a public API, contributors should consider:

* Existing consumer usage
* Backward compatibility
* Migration requirements
* Documentation
* Testing
* Versioning impact

Breaking changes should not be introduced solely for internal code-style preferences.

---

## Library Ownership

Each UI Kit library has a defined functional boundary.

Maintainers are responsible for ensuring that:

* Libraries retain their intended scope.
* Dependencies remain appropriate.
* Public APIs remain coherent.
* Duplicate functionality is avoided.
* Cross-library dependencies remain understandable.

A new library should only be introduced when there is a clear architectural and functional justification.

The current public structure consists of:

* **18 focused libraries**
* **1 aggregate package**

The aggregate package does not represent an additional focused library.

---

## Aggregate Package

`@waysnx/ui-kit` is maintained as a convenience aggregate package.

Its composition is controlled as part of the release process.

Currently it aggregates:

* `@waysnx/ui-core`
* `@waysnx/ui-form-builder`
* `@waysnx/ui-layout`
* `@waysnx/ui-feedback`
* `@waysnx/ui-grid-builder`

Changes to aggregate-package composition require review because they may affect installation size, dependency relationships, and consumer expectations.

---

## Versioning

WaysNX UI Kit follows Semantic Versioning.

The initial public release is:

**`1.0.0`**

The versioning model is:

* **MAJOR** — breaking public API changes
* **MINOR** — backward-compatible functionality
* **PATCH** — backward-compatible fixes

Package versions are controlled through the project release process.

Contributors should not independently publish or change release versions unless explicitly authorized as part of release preparation.

---

## Release Authority

Public npm releases are controlled by WaysNX maintainers.

Before a release, maintainers verify the appropriate release gates, including:

* Package builds
* Public exports
* Type declarations
* CSS output
* Tests
* Storybook
* Playwright
* Accessibility
* Security
* Documentation
* WDG-generated output
* Package contents
* Clean installation

A release should not proceed while unresolved release-blocking issues remain.

Detailed release procedures are maintained in the Developer Handbook.

---

## Documentation Governance

WaysNX UI Kit has two complementary documentation surfaces.

### GitHub Repository

Repository documentation provides:

* Project overview
* Contribution rules
* Security policy
* Governance
* High-level architecture
* Testing and integration contracts

### Developer Handbook

**https://uikit.waysnx.tech**

The Developer Handbook provides detailed technical documentation.

It is the preferred location for:

* Component implementation guidance
* API details
* Design tokens
* Theming
* Accessibility implementation
* Security implementation
* Testing procedures
* WDG documentation
* Packaging
* Publishing
* Release procedures

Documentation should not unnecessarily duplicate the same technical information in multiple locations.

---

## Generated Documentation Governance

WDG-generated files are treated differently from manually maintained documentation.

Generated output should:

* Be reproducible
* Be derived from source evidence
* Follow the defined schema
* Be validated before release
* Be regenerated when source or generator behavior changes

Contributors should not manually modify generated metadata to conceal source or extraction problems.

Changes to WDG itself may require corresponding regeneration and validation of affected documentation.

---

## Contribution Review

Pull requests are reviewed according to their impact.

Review may consider:

* Correctness
* API consistency
* Architecture
* Accessibility
* Security
* Performance
* Testing
* Documentation
* Compatibility
* Package impact

The number of reviewers required may vary depending on the risk and scope of the change.

Maintainers may request additional review for high-impact changes.

---

## Community Contributions

Community contributors are encouraged to:

* Report bugs
* Improve documentation
* Improve tests
* Submit accessibility fixes
* Submit performance improvements
* Propose new capabilities
* Improve developer tooling

Contributions should follow [`CONTRIBUTING.md`](../../CONTRIBUTING.md).

A contribution may be declined when it:

* Duplicates existing functionality
* Introduces unnecessary complexity
* Breaks established architecture
* Creates excessive maintenance cost
* Introduces unacceptable security or accessibility risks
* Does not align with the project's direction

A declined contribution does not necessarily mean the underlying problem is unimportant.

---

## Feature Proposals

Significant features should be discussed before implementation.

A proposal should explain:

1. The problem.
2. The intended users.
3. Existing alternatives.
4. Why the current UI Kit capabilities are insufficient.
5. Proposed API.
6. Appropriate library.
7. Accessibility impact.
8. Security impact.
9. Testing requirements.
10. Documentation impact.
11. Long-term maintenance considerations.

This helps avoid implementing functionality that later requires architectural restructuring.

---

## Deprecation

Public APIs may be deprecated when they are:

* Superseded by a better API
* No longer appropriate
* Difficult to maintain
* Inconsistent with the architecture
* Creating unnecessary compatibility constraints

Deprecation should generally include:

* Documentation
* Migration guidance
* Appropriate warnings where practical
* A defined removal strategy
* Versioning consideration

Immediate removal should be reserved for cases where maintaining the API is impractical or introduces unacceptable risk.

---

## Security Governance

Security vulnerabilities are handled according to the repository [SECURITY.md](../../SECURITY.md).

Security-related decisions may be handled privately to reduce risk before a fix is available.

WaysNX may prioritize security work above planned feature development when necessary.

---

## Code of Conduct

All participants are expected to follow the repository [Code of Conduct](../../CODE_OF_CONDUCT.md).

Maintainers may restrict participation when behavior violates the Code of Conduct or materially disrupts the project.

---

## Changes to Governance

This governance document may evolve as the project grows.

Changes affecting:

* Project ownership
* Maintainer responsibilities
* Release authority
* Contribution rights
* Security handling
* Public API governance

should be reviewed by WaysNX maintainers before being adopted.

---

## Governance Summary

The governance model can be summarized as:

```text
Community
    │
    │ Contributions / Issues / Proposals
    ▼
Maintainers
    │
    ├── Technical Review
    ├── Architecture Review
    ├── Security Review
    ├── API Review
    └── Release Validation
    │
    ▼
WaysNX Technologies
    │
    ├── Project Direction
    ├── Repository Ownership
    ├── npm Publishing
    └── Release Authority
```

The project remains open to community participation while maintaining clear ownership and accountability for the public software ecosystem.

---

## Developer Handbook

Detailed technical governance and project workflows are maintained at:

**https://uikit.waysnx.tech**

This document defines the repository-level governance model without duplicating the detailed engineering handbook.
