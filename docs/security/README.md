# WaysNX UI Kit Security

Security is a core engineering consideration of WaysNX UI Kit.

This document describes the repository-level security principles for the UI Kit, including secure component design, browser-side risks, sensitive data handling, authorization-related UI, file handling, dependency security, and security validation.

For reporting security vulnerabilities, see the repository [SECURITY.md](../../SECURITY.md).

Detailed implementation guidance is maintained in the [WaysNX UI Kit Developer Handbook](https://uikit.waysnx.tech).

---

## Security Principles

WaysNX UI Kit follows these principles:

1. **Client-side UI is not a security boundary.**
2. **Sensitive data should be minimized and handled deliberately.**
3. **Untrusted input must not be treated as trusted content.**
4. **Security-sensitive behavior should be explicit and reviewable.**
5. **Existing browser security mechanisms should be respected.**
6. **Dependencies and generated artifacts are part of the security surface.**
7. **Security should be considered during design, implementation, testing, and release.**
8. **Security fixes should address the underlying cause rather than masking symptoms.**

---

## Security Boundary

WaysNX UI Kit executes primarily in the client application.

Therefore, UI Kit components must not be treated as trusted enforcement mechanisms for:

* Authentication
* Authorization
* Data access
* Business rules
* API permissions
* Tenant isolation
* Financial or transactional controls

For example:

```tsx
<PermissionGate permission="users.delete">
  <DeleteButton />
</PermissionGate>
```

may control whether a user sees or interacts with a button, but the backend must independently verify whether the operation is authorized.

The server remains the authoritative security boundary.

---

## Security-Sensitive Library

Security-oriented UI functionality is primarily provided by:

`@waysnx/ui-security`

The library includes capabilities such as:

* Secure inputs
* Password interfaces
* OTP interfaces
* Secure upload interfaces
* Session timeout interfaces
* Permission gates
* Role gates
* Security status
* Device verification
* Trusted-device selection
* Security settings
* Verification-related UI

These components provide reusable UI and client-side behavior. They do not replace server-side security controls.

---

## Input Handling

User-controlled input must be treated as untrusted.

Components and utilities should avoid:

* Executing user input as code
* Unsafe HTML insertion
* Unsafe URL construction
* Trusting client-side validation
* Exposing sensitive values unnecessarily
* Logging sensitive input

Validation performed by UI components improves user experience but does not replace server-side validation.

---

## Cross-Site Scripting

WaysNX UI Kit should minimize opportunities for cross-site scripting (XSS).

Contributors should prefer:

* React's normal escaped rendering
* Safe text rendering
* Sanitized content when HTML is intentionally supported
* Explicitly documented unsafe-content boundaries

Avoid unnecessary use of:

* `dangerouslySetInnerHTML`
* Dynamic script creation
* Unsanitized HTML
* Unsanitized SVG or markup
* Arbitrary DOM insertion

If raw HTML is a required feature, its trust model and sanitization requirements must be explicitly documented.

---

## URLs and Navigation

User-controlled or externally supplied URLs require careful handling.

Security-sensitive URL behavior should consider:

* Allowed protocols
* External destinations
* `javascript:` URLs
* `data:` URLs
* Redirect behavior
* Link targets
* Download behavior

Applications should not assume that a URL is safe merely because it originated from a UI component.

Where a component accepts URLs, the public API should clearly document expected trust and validation requirements.

---

## HTML and Rich Content

Components that render rich content require additional security consideration.

Untrusted HTML should not be rendered directly.

If a component intentionally supports HTML content:

1. Define the trust boundary.
2. Sanitize untrusted content using an appropriate trusted mechanism.
3. Avoid allowing executable content.
4. Document the expected input contract.
5. Add security-focused tests.

The UI Kit should not silently assume that arbitrary HTML is safe.

---

## File Uploads

File-related UI requires both client-side and server-side security controls.

UI components may provide:

* File selection
* File validation
* File previews
* Upload progress
* Upload status

However, applications must independently validate:

* File type
* File size
* File content
* File name
* Storage destination
* Access permissions
* Malware/content scanning where required

Client-side file validation must never be considered sufficient security validation.

---

## Sensitive Data

Sensitive information should not be exposed unnecessarily through:

* DOM attributes
* URLs
* Browser storage
* Console logs
* Error messages
* Analytics events
* Generated documentation
* Screenshots or Storybook examples
* Test fixtures

Examples of sensitive information include:

* Passwords
* Authentication credentials
* Tokens
* One-time passwords
* Private keys
* Personal information
* Customer data
* Internal identifiers where sensitive

Tests and examples should use synthetic data.

---

## Passwords and Authentication Interfaces

Password-related components should minimize accidental exposure of sensitive values.

Contributors should consider:

* Input masking
* Browser autofill behavior
* Clipboard interactions
* Visibility toggling
* Logging
* Error messages
* DOM exposure
* Accessibility

The UI Kit does not implement authentication enforcement.

Authentication should be performed by the consuming application's trusted authentication system.

---

## OTP and Verification

OTP and verification components should treat codes as sensitive values.

Implementations should consider:

* Avoiding unnecessary persistence
* Clearing values when appropriate
* Preventing accidental logging
* Secure input behavior
* Accessibility
* Paste behavior
* Autofill behavior
* Expiration handling

Verification must ultimately be enforced by the application's trusted authentication service.

---

## Authorization UI

Components such as:

* `PermissionGate`
* `RoleGate`

may control presentation or interaction based on client-side application state.

They must not be treated as authorization enforcement.

A secure architecture is:

```text id="o1n8v2"
User
  │
  ▼
React Application
  │
  ├── UI permission state
  │       │
  │       ▼
  │   UI Kit Gate
  │
  ▼
Backend API
  │
  ▼
Server-side Authorization
  │
  ▼
Protected Resource
```

The backend must independently enforce authorization for every protected operation.

---

## Session Security

Session-related UI may provide:

* Session timeout warnings
* Re-authentication prompts
* Device verification
* Security status

These interfaces should reflect the application's authoritative session state.

UI timers or client-side state should not be treated as the authoritative source of session validity.

---

## Browser Security

Components should respect standard browser security mechanisms.

Security-sensitive implementations should consider:

* Same-origin policy
* Content Security Policy
* Secure transport
* Cookie security
* Browser storage risks
* Cross-origin behavior
* iframe restrictions
* Permissions APIs
* Browser privacy controls

The UI Kit should not require consumers to weaken browser security controls simply to use standard components.

---

## Dependencies

Third-party dependencies form part of the security surface.

Security review should consider:

* Direct dependencies
* Peer dependencies
* Transitive dependencies
* Build dependencies
* Development dependencies
* Runtime dependencies

Dependency updates should be evaluated for:

* Known vulnerabilities
* Compatibility
* Package provenance
* Bundle impact
* Runtime impact

A dependency vulnerability should be assessed based on whether the affected functionality is reachable and relevant to the package.

---

## Package Security

The public package ecosystem must be protected against accidental or malicious changes.

Changes affecting:

* Package names
* Package exports
* Dependencies
* Build scripts
* Publishing configuration
* Release automation
* Generated package contents

require additional review.

Published packages should contain only intended artifacts.

---

## Generated Documentation

WDG-generated documentation and metadata are part of the repository's supply chain and documentation surface.

Generated output must not expose:

* Secrets
* Credentials
* Private paths
* Sensitive source information
* Customer data
* Internal configuration
* Security-sensitive implementation details that are not intended for public release

WDG should derive metadata from public source evidence and documented configuration.

If generated output exposes unexpected information, fix the source or generator and regenerate the output.

Do not manually patch generated output as the primary solution.

---

## Storybook Security

Storybook examples are part of the public development and documentation surface.

Storybook stories should:

* Use synthetic data
* Avoid real credentials
* Avoid production endpoints
* Avoid customer information
* Avoid secrets
* Avoid unnecessary external integrations

Stories demonstrating authentication, authorization, uploads, or other security-sensitive functionality should use safe mock implementations.

---

## Test Data

Tests must use synthetic or intentionally non-sensitive data.

Do not commit:

* Production credentials
* API keys
* Access tokens
* Passwords
* Private certificates
* Customer information
* Real authentication data

Test fixtures should make it obvious that they are non-production data.

---

## Secrets

Secrets must not be committed to the repository.

Examples include:

* API keys
* Access tokens
* Passwords
* Private keys
* Cloud credentials
* Publishing credentials
* Database credentials

Use environment variables or approved secret-management mechanisms where credentials are required for local development or CI.

If a secret is accidentally committed, treat it as compromised and rotate it immediately.

Removing the secret from Git history alone does not make the credential safe.

---

## Security Testing

Security validation should occur at multiple levels.

### Static Review

Review source code for:

* Unsafe HTML
* Unsafe URL handling
* Sensitive data exposure
* Dangerous browser APIs
* Unexpected dependency usage

### Automated Testing

Security-sensitive behavior should have automated coverage where practical.

### Dependency Scanning

Dependencies should be checked for known vulnerabilities.

### Browser Testing

Security-sensitive interactions should be validated in supported browsers where appropriate.

### Package Validation

Published package contents should be checked to ensure unintended files or secrets are not included.

---

## Security Review Triggers

Additional security review should be considered for changes involving:

* Authentication
* Authorization
* Permissions
* Roles
* Passwords
* OTP
* Sensitive inputs
* File uploads
* Rich HTML
* URLs
* Browser storage
* Cookies
* External integrations
* Security providers
* Session behavior
* Device verification
* Dependency changes
* Publishing or release automation
* WDG-generated public output

---

## Security and Accessibility

Security controls must remain usable and accessible.

Security-related interfaces should consider:

* Keyboard access
* Focus management
* Accessible names
* Error communication
* Status announcements
* Screen-reader behavior
* Reduced motion
* Clear validation messages

Security should not be implemented in a way that unnecessarily prevents users from accessing essential functionality through assistive technologies.

See [`docs/accessibility/README.md`](../accessibility/README.md).

---

## Reporting Security Issues

Do not report vulnerabilities through public GitHub issues.

Follow the process defined in the repository [SECURITY.md](../../SECURITY.md).

---

## Developer Handbook

Detailed security implementation guidance is maintained at:

**https://uikit.waysnx.tech**

The Developer Handbook should remain the primary source for:

* Secure component patterns
* Security testing
* Input handling
* File security
* Authentication-related UI
* Authorization-related UI
* Browser security
* Dependency security
* Security review procedures
* Security-sensitive API design

This repository document establishes the technical security principles without duplicating the complete security handbook.
