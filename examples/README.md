# WaysNX UI Kit Examples

This directory contains reference applications and examples demonstrating how WaysNX UI Kit libraries can be composed in real React applications.

The examples are intended to demonstrate practical usage of the UI Kit rather than serve as production applications.

---

## Available Examples

### WaysNX Admin Demo

[`waysnx-admin-demo/`](waysnx-admin-demo/)

A reference admin-style application demonstrating the composition of multiple WaysNX UI Kit libraries into a consistent application interface.

The demo includes:

- Dashboard
- Employee Listing
- Employee Onboarding
- Shared application header
- Sidebar navigation
- Language selection
- Theme switching
- Accessibility controls
- Notifications and feedback

See [`waysnx-admin-demo/README.md`](waysnx-admin-demo/README.md) for details.

---

## Purpose

The examples are used to:

- Demonstrate recommended UI Kit usage
- Show how individual libraries work together
- Validate cross-library composition
- Provide realistic usage patterns
- Support development and visual validation
- Provide reference implementations for consumers

The examples are not intended to define application-specific business architecture.

---

## Relationship to UI Kit Libraries

Examples consume the published or workspace versions of WaysNX UI Kit packages.

They should use public APIs in the same way that an external application would.

Examples should not depend on private implementation details of individual packages.

This helps ensure that the examples remain useful as reference implementations for UI Kit consumers.

---

## Development

Install repository dependencies from the repository root:

```bash
pnpm install
```

Build all workspace packages before running examples (examples depend on compiled library output):

```bash
pnpm build
```

### Run the WaysNX Admin Demo

From the repository root:

```bash
pnpm demo
```

Or using the filter directly:

```bash
pnpm --filter waysnx-admin-demo run dev
```

Or from the demo directory itself:

```bash
cd examples/waysnx-admin-demo
pnpm dev
```

The demo runs at `http://localhost:5173` by default.

See [`waysnx-admin-demo/README.md`](waysnx-admin-demo/README.md) for more details on what the demo demonstrates.
