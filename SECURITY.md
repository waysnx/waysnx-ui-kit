# Security Policy

WaysNX Technologies takes the security of WaysNX UI Kit seriously.

WaysNX UI Kit is a public React UI library ecosystem. Security issues affecting the libraries, build process, generated documentation, dependencies, or published packages should be reported responsibly so they can be assessed and addressed before disclosure.

---

## Supported Versions

The initial public release of WaysNX UI Kit is planned for version `1.0.0`.

After the public release, security support will generally follow the actively maintained release line.

| Version | Security Support |
|---|---|
| `1.0.x` | Supported |
| Older versions | Best effort |

Security support for older versions may depend on the severity of the issue and whether the issue is present in a currently supported release.

---

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues, pull requests, discussions, or other public channels.**

Use GitHub's private vulnerability reporting mechanism for the repository when available.

If private vulnerability reporting is not available, contact the WaysNX maintainers through the security contact published in the repository or WaysNX's official channels and request a private security contact.

When reporting a vulnerability, provide enough information for the maintainers to reproduce and assess the issue.

Useful information includes:

- Affected package
- Affected version
- Vulnerability type
- Severity or potential impact
- Reproduction steps
- Minimal reproduction where possible
- Relevant configuration
- Browser and environment information where applicable
- Proof of concept, if available
- Suggested mitigation, if known

Please avoid including real credentials, personal information, production secrets, private customer data, or other sensitive information in the report.

---

## What to Expect

After receiving a security report, the maintainers will:

1. Acknowledge the report when practical.
2. Assess whether the issue affects WaysNX UI Kit.
3. Determine the affected packages and versions.
4. Assess severity and potential impact.
5. Investigate and reproduce the issue where possible.
6. Develop and validate a fix.
7. Release an appropriate update.
8. Coordinate public disclosure when appropriate.

Response and remediation time may vary depending on severity, reproducibility, complexity, and the number of affected packages.

---

## Security Severity

Security issues are evaluated according to their practical impact.

Particular attention is given to vulnerabilities involving:

- Cross-site scripting (XSS)
- Unsafe HTML rendering
- URL or navigation injection
- File upload handling
- Sensitive data exposure
- Authentication-related UI
- Authorization or permission boundaries
- Session-related behavior
- Insecure browser API usage
- Dependency vulnerabilities
- Supply-chain risks
- Build or package integrity
- Generated documentation or metadata that could introduce security-sensitive behavior

A security issue that affects multiple packages or the aggregate package may receive additional priority.

Severity is determined by the maintainers based on exploitability, impact, affected surface, required conditions, and available mitigations.

---

## Security-Sensitive Components

WaysNX UI Kit includes security-oriented functionality, particularly in:

`@waysnx/ui-security`

Examples include interfaces and utilities related to:

- Secure inputs
- Passwords and sensitive fields
- OTP and verification
- Secure uploads
- Session timeout
- Permission gates
- Role gates
- Device verification
- Trusted devices
- Security settings
- Security status

These components provide UI and application-layer capabilities. They **do not replace server-side authentication, authorization, encryption, validation, or other backend security controls**.

Applications remain responsible for enforcing security on trusted backend systems.

---

## Client-Side Security

WaysNX UI Kit components execute in the browser and should not be treated as a security boundary by themselves.

For example:

- UI permission checks must not replace server-side authorization.
- Hidden UI elements must not be treated as access control.
- Client-side validation must not replace server-side validation.
- Sensitive values should not be exposed unnecessarily in browser state, URLs, logs, or DOM attributes.
- Authentication tokens and credentials should be handled according to the application's security architecture.

WaysNX UI Kit aims to provide safer UI primitives, but application and backend security remain the responsibility of the consuming application.

---

## Dependency Security

WaysNX UI Kit depends on third-party packages as part of its development and runtime ecosystem.

Security maintenance includes consideration of:

- Direct dependencies
- Peer dependencies
- Development dependencies
- Transitive dependencies
- Build tooling
- Test tooling
- Publishing infrastructure

Dependency updates should be evaluated for compatibility and security impact.

Known vulnerabilities should be assessed based on whether the vulnerable functionality is actually reachable or relevant to the affected package.

---

## Package and Supply-Chain Security

The public release process includes validation of package integrity and publishing configuration.

Changes affecting:

- Package names
- Package exports
- Dependencies
- Build output
- Publishing configuration
- Release automation
- Generated package contents

require additional review.

Published packages should contain only the intended artifacts.

---

## Generated Documentation Security

WaysNX UI Kit uses the WaysNX Documentation Generator (WDG) to generate documentation and machine-readable metadata.

Generated output should not introduce:

- Executable untrusted content
- Unsafe HTML
- Unexpected external resource loading
- Credential or secret exposure
- Unsupported security claims

Generated documentation should be derived from source evidence.

Security-sensitive extraction or generation issues should be corrected in the source or WDG implementation rather than manually patching generated output.

---

## Responsible Disclosure

Please allow the maintainers reasonable time to investigate and address a reported vulnerability before publicly disclosing technical details.

We may coordinate disclosure timing with the reporter when the issue requires a coordinated release or affects multiple packages.

Once a vulnerability has been addressed, WaysNX may publish appropriate release notes or security information describing:

- Affected versions
- Fixed versions
- Impact
- Mitigation
- Credits, where the reporter wishes to be credited

We will avoid publishing sensitive exploit details that could unnecessarily increase risk to users.

---

## Security Updates

Security fixes may be released independently of normal feature releases when necessary.

Consumers should keep WaysNX UI Kit packages reasonably up to date and review release notes for security-related changes.

For applications using multiple WaysNX UI Kit packages, update compatible packages together when a security fix affects shared functionality or dependencies.

---

## Security Best Practices for Consumers

Applications using WaysNX UI Kit should:

- Keep packages updated.
- Use supported React and browser versions.
- Validate untrusted data on the server.
- Enforce authorization on trusted backend systems.
- Avoid placing secrets in client-side code.
- Avoid exposing sensitive information through URLs or DOM attributes.
- Use secure transport such as HTTPS.
- Review file upload and download behavior.
- Apply an appropriate Content Security Policy (CSP).
- Review third-party dependencies.
- Treat client-side UI controls as presentation and interaction mechanisms rather than security boundaries.

---

## Out of Scope

The following generally do not constitute security vulnerabilities in WaysNX UI Kit by themselves:

- Missing application-level authorization implemented by the consuming application
- Server-side configuration issues in a consuming application
- Incorrect use of a component contrary to its documented contract
- Vulnerabilities exclusively introduced by unrelated application code
- Cosmetic or usability issues without a security impact
- Dependency vulnerabilities that are demonstrably unreachable and do not affect the package's security posture

The maintainers may reclassify a report after investigation.

---

## Security Contact

For security reports, use the repository's private vulnerability reporting mechanism where available.

If private reporting is unavailable, contact the WaysNX maintainers through the official WaysNX channels and request a private security contact.

**Do not disclose vulnerability details through a public issue.**

---

## Policy Updates

This security policy may be updated as the WaysNX UI Kit project, release process, and security practices evolve.

The repository version of this document is the authoritative security policy for the project.