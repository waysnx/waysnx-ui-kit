# Repository Structure

The repository follows WaysNX organizational conventions with clear separation of packages, examples, documentation, specifications, schemas, testing, decisions and automation.

- `packages/` — 18 UI libraries
- `examples/waysnx-admin-demo/` — realistic enterprise reference application
- `storybook/` — isolated component development/documentation
- `playwright/` — real-browser and end-to-end validation
- `docs/generated/` — WDG-generated versioned metadata
- `docs/` — human-readable documentation
- `schemas/` — machine-readable contracts
- `specification/` — stable specifications
- `decisions/` — Architecture Decision Records
- `.github/` — CI and contribution configuration

WDG remains a separate tool/project. Its generated, versioned outputs are stored in this repository.
