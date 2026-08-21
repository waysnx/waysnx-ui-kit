# WaysNX UI Kit Documentation

This directory contains the repository-level documentation for WaysNX UI Kit.

The documentation is organized by engineering and project domain. Detailed implementation guidance, API references, component documentation, examples, and developer workflows are maintained in the [WaysNX UI Kit Developer Handbook](https://uikit.waysnx.tech).

---

## Documentation Structure

| Area                               | Purpose                                                                      |
| ---------------------------------- | ---------------------------------------------------------------------------- |
| [`accessibility/`](accessibility/) | Accessibility requirements, standards, and validation principles             |
| [`architecture/`](architecture/)   | Package architecture, boundaries, dependencies, and architectural principles |
| [`generated/`](generated/)         | WDG-generated documentation and machine-readable output                      |
| [`governance/`](governance/)       | Project ownership, maintainership, decision-making, and release governance   |
| [`integrations/`](integrations/)   | Application, browser API, provider, and external-service integration         |
| [`security/`](security/)           | Technical security principles and secure implementation practices            |
| [`testing/`](testing/)             | Testing strategy, validation layers, browser testing, and release validation |
| [`theming/`](theming/)             | Design tokens, themes, CSS variables, and customization                      |

---

## Developer Handbook

The detailed WaysNX UI Kit Developer Handbook is maintained at:

**https://uikit.waysnx.tech**

The Developer Handbook is the primary source for detailed technical guidance, including:

* Component development
* Library APIs
* Design tokens
* Theming
* Accessibility implementation
* Security implementation
* Testing procedures
* Storybook
* Playwright
* SSR and hydration
* WDG
* Packaging
* Publishing
* Release procedures
* Integration examples
* Troubleshooting

The repository documentation intentionally avoids duplicating the complete Developer Handbook.

---

## Documentation Principles

Repository documentation follows these principles:

### Single Source of Truth

Each subject should have one primary location.

Detailed implementation guidance belongs in the Developer Handbook rather than being duplicated across multiple Markdown files.

### Repository Documentation vs. Handbook

Repository documentation defines:

* Project-level contracts
* Architectural principles
* Contribution expectations
* Security policies
* Governance
* High-level engineering standards

The Developer Handbook provides:

* Detailed procedures
* API references
* Implementation examples
* Configuration
* Troubleshooting
* Component-specific guidance

### Generated Documentation

WDG-generated documentation is maintained separately under [`generated/`](generated/).

Generated files should be regenerated from their source rather than manually maintained as independent documentation.

---

## Public Repository Documentation

The following documents are maintained at the repository root:

* [`README.md`](../README.md) — Project overview and quick start
* [`CONTRIBUTING.md`](../CONTRIBUTING.md) — Contribution process
* [`CODE_OF_CONDUCT.md`](../CODE_OF_CONDUCT.md) — Community standards
* [`SECURITY.md`](../SECURITY.md) — Security vulnerability reporting
* [`CHANGELOG.md`](../CHANGELOG.md) — Release history
* [`LICENSE`](../LICENSE) — Project license

---

## Documentation Workflow

Documentation changes should follow the same quality standards as code changes.

When changing a public API, component behavior, architecture, or workflow:

1. Identify the appropriate documentation location.
2. Update the relevant documentation.
3. Regenerate WDG output when applicable.
4. Validate generated documentation.
5. Review links and examples.
6. Include documentation changes with the corresponding pull request.

---

## Documentation and Releases

Documentation is part of the release process.

Before a public release, verify:

* Repository documentation is current.
* Public APIs are documented.
* Generated WDG output is current.
* Links are valid.
* Installation instructions are accurate.
* Package names and versions are correct.
* Examples reflect the supported release.
* The Developer Handbook reflects significant changes.

---

## Documentation Ownership

Repository documentation is maintained alongside the WaysNX UI Kit source.

Generated documentation is maintained through WDG.

The Developer Handbook is maintained as the detailed developer-facing documentation experience for the UI Kit.

All three should remain consistent without unnecessarily duplicating content.

---

## Developer Handbook

**https://uikit.waysnx.tech**

Use the Developer Handbook when you need detailed implementation or API guidance beyond the repository-level documentation provided here.
