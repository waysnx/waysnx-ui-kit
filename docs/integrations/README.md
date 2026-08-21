# WaysNX UI Kit Integrations

WaysNX UI Kit is designed to integrate with modern React applications without requiring a specific backend, application framework, or infrastructure provider.

This document describes the repository-level integration principles for consuming UI Kit libraries and connecting UI capabilities to application services.

Detailed integration examples and provider-specific implementation guidance are maintained in the [WaysNX UI Kit Developer Handbook](https://uikit.waysnx.tech).

---

## Integration Goals

WaysNX UI Kit integrations should provide:

* Clear separation between UI and application services
* Minimal coupling to backend technologies
* Explicit integration boundaries
* Reusable provider and adapter patterns
* Support for application-owned data and state
* Optional external services where appropriate
* Predictable configuration
* Testable integrations
* Secure handling of external data

The UI Kit should provide reusable UI capabilities without requiring applications to adopt a particular backend architecture.

---

## Application Integration Boundary

The consuming application owns the connection between UI components and application services.

A typical architecture is:

```text id="w4n2dr"
WaysNX UI Kit
      │
      ▼
React Application
      │
      ├── Application State
      │
      ├── API / Service Layer
      │
      ├── Authentication
      │
      ├── Authorization
      │
      └── External Services
```

The UI Kit should generally not directly own:

* Business logic
* Database access
* Authentication enforcement
* Authorization enforcement
* Application state
* Tenant isolation
* Domain-specific workflows

---

## Controlled Data Flow

Components should preferably receive application data through explicit APIs.

For example:

```tsx id="2s8m1n"
<Form
  value={formData}
  onChange={setFormData}
/>
```

rather than requiring the component to know how the application stores or retrieves that data.

This makes components easier to:

* Test
* Reuse
* Integrate
* Replace
* Compose

---

## API Integration

WaysNX UI Kit can be used with applications consuming:

* REST APIs
* GraphQL APIs
* RPC services
* Local state
* Server actions
* Custom service layers

The UI Kit should generally remain unaware of the backend protocol unless a particular library intentionally provides an integration abstraction.

Applications should transform backend data into the data contracts expected by UI components.

---

## Backend Independence

WaysNX UI Kit should not require:

* Laravel
* Node.js
* Java
* Spring
* PHP
* A particular database
* A particular API gateway
* A particular authentication provider

The UI layer should remain usable across different application architectures.

---

## Provider Pattern

When a component requires an external service or application-specific capability, a provider pattern may be appropriate.

Conceptually:

```text id="8q2w1s"
Component
    │
    ▼
Provider / Context
    │
    ▼
Application Adapter
    │
    ▼
External Service
```

This allows the UI component to depend on an interface rather than a specific service implementation.

---

## Adapter Pattern

Adapters may be used when external services expose incompatible APIs.

For example:

```text id="y9b6x3"
UI Kit Component
       │
       ▼
Application Adapter
       │
   ┌───┴──────────┐
   │              │
Provider A    Provider B
```

The UI component should depend on the adapter contract rather than containing provider-specific logic whenever practical.

---

## External Services

Some UI Kit capabilities may integrate with external services.

Examples may include:

* Maps
* Geolocation
* Media
* File storage
* Authentication providers
* Localization services
* Browser APIs

External services should be introduced through clear integration boundaries.

A service should not become a mandatory dependency for unrelated UI functionality.

---

## Maps and Geolocation

Map-related functionality may require external mapping or geolocation providers.

Applications should generally provide:

* Provider configuration
* API credentials
* Map configuration
* Location data
* Error handling

Provider credentials must not be embedded directly in reusable UI component source code.

Where a map provider is optional, the UI Kit should avoid forcing all applications to install or configure that provider.

---

## Browser APIs

UI Kit components may use browser APIs when required for their functionality.

Examples include:

* ResizeObserver
* IntersectionObserver
* Clipboard API
* File API
* Media APIs
* Geolocation
* Web Storage
* Notifications
* Permissions API

Browser API usage should:

* Be isolated where practical
* Handle unsupported environments
* Avoid assuming browser availability during SSR
* Provide predictable fallback behavior where appropriate

---

## Server-Side Rendering

Integrations that depend on browser APIs must be compatible with applications that use SSR.

Avoid accessing browser-only globals during module initialization or server rendering.

Examples include:

```text id="mb1p4k"
window
document
navigator
localStorage
sessionStorage
```

Browser-specific access should occur only when the appropriate runtime environment is available.

---

## Authentication Integration

WaysNX UI Kit may provide authentication-related UI, but authentication itself belongs to the consuming application.

The application is responsible for:

* Authentication flow
* Token/session management
* Credential handling
* Refresh behavior
* Logout
* Server-side validation

UI Kit components may provide:

* Login form UI
* Password fields
* OTP UI
* Session timeout UI
* Verification UI

These components should communicate with application-owned authentication services through explicit APIs.

---

## Authorization Integration

Authorization is enforced by the application and backend.

UI Kit may provide presentation-level controls such as:

* Permission gates
* Role gates
* Conditional actions

The integration pattern should be:

```text id="4v7h9s"
Application Authorization State
             │
             ▼
        UI Kit Gate
             │
             ▼
      Visible Interface
             │
             ▼
        Backend API
             │
             ▼
 Server-side Authorization
```

The UI gate improves user experience but does not provide authoritative access control.

---

## File Integration

File components may integrate with application-owned upload and storage services.

The UI Kit can provide:

* File selection
* Drag and drop
* Validation feedback
* Preview
* Upload progress
* Upload state
* Error state

The application owns:

* Upload endpoints
* Authentication
* Authorization
* Storage
* Virus/malware scanning where required
* File persistence
* Download permissions

Client-side file validation should not replace server-side validation.

---

## Media Integration

Media components may integrate with:

* Local media
* Application APIs
* Streaming services
* Browser media APIs
* External media providers

Applications should control:

* Media source
* Authorization
* Access tokens
* Streaming configuration
* Content availability

Sensitive media URLs or credentials should not be hard-coded into reusable components.

---

## Internationalization Integration

`@waysnx/ui-i18n` provides internationalization-related functionality.

Applications remain responsible for:

* Supported languages
* Translation resources
* Locale selection
* Persistence of language preference
* Backend locale integration
* Formatting requirements specific to the application

The UI Kit should provide reusable internationalization capabilities without assuming a single application's translation infrastructure.

---

## Theme Integration

Applications can integrate UI Kit themes with their own application theme system.

The integration should preferably use:

* Public theme APIs
* CSS variables
* Design tokens
* Theme providers where provided

Applications should avoid directly depending on private component implementation details.

See [`docs/theming/README.md`](../theming/README.md).

---

## State Management

WaysNX UI Kit components should not require a specific global state-management library unless a particular package intentionally defines such a dependency.

Applications may integrate UI Kit components with:

* React state
* Context
* Redux
* Zustand
* Signals
* Server state libraries
* Application-specific state systems

Components should expose predictable controlled and uncontrolled APIs where appropriate.

---

## Forms Integration

UI Kit form components can integrate with application-owned form state and validation systems.

Applications may connect UI Kit controls to:

* React state
* Form libraries
* Schema validation
* Server-side validation
* Application-specific form builders

The UI component should communicate through its documented value, event, and validation contracts.

---

## Grid and Data Integration

Grid and data-oriented components may consume application-provided data.

Applications remain responsible for:

* Data retrieval
* Pagination APIs
* Filtering services
* Sorting services
* Authorization
* Data transformation

The UI Kit should not assume a particular API format unless a package explicitly defines an integration contract.

---

## Error Handling

Integrations should expose meaningful errors without leaking sensitive information.

Applications should distinguish between:

* Validation errors
* Network errors
* Authorization errors
* Authentication errors
* Not-found errors
* Server errors
* Configuration errors

UI components should present errors through appropriate UI states while leaving application-level error handling under application control.

---

## Configuration

Integration configuration should be explicit.

Avoid hidden global configuration where practical.

Configuration should clearly define:

* Required values
* Optional values
* Defaults
* Runtime behavior
* Environment requirements
* Security considerations

Secrets and private credentials should never be committed to source code.

---

## Dependency Management

Optional integrations should remain optional whenever practical.

A package should not introduce a large dependency solely to support a feature that only a subset of applications use.

Where an integration requires a third-party package, document:

* Why it is required
* Whether it is a runtime or development dependency
* Whether it is optional
* Peer dependency requirements
* Supported versions

---

## Integration Testing

Integration behavior should be tested at the appropriate layer.

Testing may include:

* Unit tests with mocked services
* Component tests
* Storybook stories
* Playwright browser tests
* Reference application tests
* Provider-specific integration tests

External services should generally be mocked during deterministic automated tests.

Live external-service tests should be isolated and controlled.

---

## Security Considerations

External integrations increase the application's security surface.

Review integrations for:

* Credential exposure
* Unsafe URLs
* Cross-origin behavior
* Sensitive data transfer
* Third-party scripts
* External content
* File handling
* Authentication
* Authorization
* Dependency security

See [`docs/security/README.md`](../security/README.md).

---

## Integration Guidelines

When adding an integration:

1. Define the integration boundary.
2. Determine whether the dependency should be optional.
3. Prefer an adapter or provider when appropriate.
4. Keep credentials outside the component implementation.
5. Consider SSR.
6. Consider accessibility.
7. Consider error and loading states.
8. Add automated tests.
9. Document the public integration API.
10. Validate package and dependency impact.

---

## Adding a New External Provider

Before introducing a provider-specific integration, consider:

* Is the capability already supported?
* Can an existing abstraction support the provider?
* Is the provider dependency appropriate for the library?
* Does the integration create unnecessary vendor lock-in?
* Can applications provide their own adapter?
* Does the integration increase bundle size significantly?
* Does it introduce security or privacy concerns?
* Is it maintainable as part of the public UI Kit?

Provider-specific functionality should have a clear and sustainable use case.

---

## Developer Handbook

Detailed integration documentation is maintained at:

**https://uikit.waysnx.tech**

The Developer Handbook should remain the primary source for:

* Provider APIs
* Adapter patterns
* Maps integration
* Browser API integration
* Authentication UI integration
* File integration
* Media integration
* Internationalization
* Theme integration
* SSR integration
* External service examples
* Troubleshooting

This repository document defines the integration architecture without duplicating provider-specific implementation documentation.
