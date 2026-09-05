# WaysNX UI Kit CI Validation Pipeline

**Phase 1 Release-Security Setup**

This document explains the automated CI checks that validate every PR and push to `main` in the WaysNX UI Kit repository.

## Overview

The CI pipeline is designed to catch integration issues, regressions, and security concerns before code reaches production. It is structured as four independent validation jobs that run in parallel or in sequence as dependencies allow:

1. **Validate** — Workspace integrity and package metadata
2. **Build** — Type checking and production builds
3. **P0 Regression** — Release-critical end-to-end test suite
4. **Security** — Hardcoded credentials scanning and dependency audit

All jobs must pass for a PR to be mergeable (once branch protection is configured).

---

## Job Details

### 1. Validate: Workspace Integrity

**Triggers:** On every PR and push to `main`

**Checks:**
- Install dependencies with frozen lockfile (`pnpm install --frozen-lockfile`)
- Verify workspace resolution (`pnpm list --recursive --depth=0`)
- Validate package metadata (see below)

**Purpose:** Ensures the monorepo is well-formed and all dependencies are pinned.

**Package Metadata Validation includes:**
- Exactly 19 publishable packages exist and are discoverable
- All packages are version **1.0.0** (1.0 release gate requirement)
- No publishable package is marked `"private": true`
- Package names follow `@waysnx/*` convention
- `package.json` files are valid JSON
- No hardcoded npm auth tokens in package metadata
- Workspace dependencies (`workspace:*`) are resolvable to known packages
- Special case: `@waysnx/ui-kit` correctly maps to `packages/ui-kit-meta` directory

**Failure mode:** Blocks the build if any package metadata is incorrect or versions don't match the 1.0 release gate.

---

### 2. Build: Type Checking & Production Build

**Triggers:** After validate succeeds

**Checks:**
- Install dependencies with frozen lockfile
- Run `pnpm build` (TypeScript build for all @waysnx/* libraries)
- Build Storybook static site (`pnpm --filter storybook run build`)

**Purpose:** Verifies the entire workspace compiles without type errors and production artifacts build correctly.

**Failure mode:** Blocks if any package fails to build or has unresolved type errors.

---

### 3. P0 Regression: Release-Critical Tests

**Triggers:** After build succeeds

**Strategy:** Matrix of three browsers (Chromium, Firefox, WebKit) running in parallel

**Each browser runs:**
- The P0 regression test suite (`playwright/tests/p0-regression.spec.ts`)
- **11 release-critical tests** (exact test count per repository baseline) covering:
  - **Markdown sanitization** — XSS prevention (ui-data)
  - **HtmlContent security** — External link safety, malicious HTML sanitization (ui-core)
  - **IFrame sandboxing** — Secure-by-default iframe sandbox (ui-core)
  - **QR generation** — Real QR module matrix validation (ui-media)
  - **PDFViewer honesty** — No fabricated page counts (ui-files)
  - **OCRScanner reality** — No fabricated OCR results (ui-media)
  - **Cropper documentation** — Source image limitation messaging (ui-media)
  - **Maps adapter requirement** — Adapter-based architecture enforcement (ui-maps)

**Purpose:** Ensures the release contracts are met across all target browsers. These tests verify observable behavior—not implementation details—and validate security properties.

**Why P0 only, not full suite?**

The repository has a full Playwright test suite with ~1740 tests, of which ~36 are currently known to fail. These failures are pre-existing and not regressions. The P0 suite (11 tests) represents the *release-critical* baseline that must always pass before shipping. It focuses on:

- Security and XSS prevention
- Observable contracts (not mocked details)
- Multi-browser compatibility

Once these 36 historical failures are addressed in a separate remediation phase, the full suite can become a required gate. For now, the P0 suite is the authoritative release validation.

**Configuration:**
- Retries: 2 (in CI environment)
- Workers: 1 (sequential, for stability)
- Timeout: 120 seconds per Storybook startup

**Failure mode:** Any P0 test failure blocks the merge. The test reports are uploaded as artifacts for inspection.

---

### 4. Security: Credentials & Audit

**Triggers:** On every PR and push

**Checks:**

1. **Committed Credentials Scanning** (BLOCKING)
   - Scans tracked files for private credential files (`.env`, `.env.local`, `.env.*.local`, `.npmrc`)
   - Searches for hardcoded bearer tokens (with token-shaped values, not just variable names)
   - Detects hardcoded API keys and secret assignments (with actual values, not documentation)
   - Excludes: `node_modules`, `.git`, lock files, comments, documentation strings
   - Designed to detect credible credentials, not false positives from variable names in docs

2. **Dependency Audit** (NON-BLOCKING)
   - Runs `pnpm audit --no-exit-code` (advisory-only, does not fail the workflow)
   - Reports vulnerabilities but does not fail CI
   - Intended as an informational check; security-critical fixes are managed separately

**Purpose:** Prevents accidental commits of credentials while alerting to dependency vulnerabilities.

**Failure mode:** Credentials scanning is **blocking**. Audit is **non-blocking** (informational only).

---

## What's NOT in This CI (By Design)

### npm Publishing
npm publishing is intentionally **not** part of this CI workflow. Publishing will be a separate, explicit workflow that:
- Runs only on tagged releases (not on every main push)
- Requires manual approval
- Happens after repository protection and security reviews are complete

### Full Playwright Suite
The full ~1740-test Playwright suite is **not** a required gate because:
- 36 tests are known to fail (pre-existing issues, not regressions)
- These failures are tracked and will be addressed separately
- The P0 suite (11 tests) captures all release-critical validation
- Full suite can become a required gate once historical failures are fixed

### Third-Party Security Scanning
Advanced scanning (SAST, SCA with network requests) is not included because:
- The workflow runs on untrusted PR code (least-privilege security model)
- Advanced tools require secrets and elevated permissions
- Basic scanning (credentials, patterns) is sufficient for Phase 1

---

## Required Branch Protection Rules

Once this CI is stable, configure these branch protection rules on `main`:

```
Required status checks:
  ✓ Validate workspace & dependencies
  ✓ Build & type check
  ✓ P0 regression (chromium)
  ✓ P0 regression (firefox)
  ✓ P0 regression (webkit)
  ✓ Security & repository checks

Require branches to be up to date before merging: Yes
Require signed commits: No (optional, for Phase 2)
Allow force pushes: No
Allow deletions: No
```

---

## Running CI Locally

To simulate the CI environment and validate changes before pushing:

```bash
# 1. Install dependencies (frozen lockfile)
pnpm install --frozen-lockfile

# 2. Run package metadata validation
node scripts/ci-validate-packages.js

# 3. Build workspace and Storybook
pnpm build
pnpm --filter storybook run build

# 4. Run P0 regression suite (all browsers)
pnpm --filter playwright run test:chromium -- playwright/tests/p0-regression.spec.ts
pnpm --filter playwright run test:firefox -- playwright/tests/p0-regression.spec.ts
pnpm --filter playwright run test:webkit -- playwright/tests/p0-regression.spec.ts

# 5. Run security checks (bash on Linux/macOS; adapt for Windows)
bash scripts/ci-security-check.sh
```

---

## CI Permissions & Security

The workflow uses minimal, read-only permissions:

```yaml
permissions:
  contents: read
```

This prevents:
- Writing to the repository
- Accessing secrets
- Publishing packages
- Modifying pull requests
- Creating releases

All write operations (merges, deployments, publishing) require explicit user actions or separate, protected workflows.

---

## Monitoring & Diagnostics

### GitHub Actions UI
- Navigate to **Actions** → **CI** to see all workflow runs
- Click a run to view detailed logs per job
- Artifacts (Playwright reports, test results) are available for 7 days

### Local Debugging
- For build failures: `pnpm build` with local Node 24 and pnpm 10.11.0
- For P0 failures: `pnpm --filter playwright run test:ui` to debug interactively
- For security: `bash scripts/ci-security-check.sh` and inspect git history

### Common Issues

| Issue | Resolution |
|-------|-----------|
| `pnpm install --frozen-lockfile` fails | Check `pnpm-lock.yaml` is up-to-date with all `package.json` changes |
| Build fails with type errors | Ensure TypeScript is happy: `pnpm build` locally first |
| P0 test fails in one browser | Check browser-specific Storybook rendering; use `test:ui` to debug |
| Secrets scan false positive | Review the pattern in `scripts/ci-security-check.sh`; adjust if needed |

---

## Next Steps (Phase 2+)

- **Phase 2:** Add full Playwright suite as required regression gate (after 36 known failures addressed)
- **Phase 3:** npm publishing workflow (tagged releases only, with approval)
- **Phase 4:** Advanced SAST/SCA integration (if security review requires it)
- **Future:** Branch protection enforcement once CI is stable
- **Future:** TOTP tests as required gate

---

## Questions?

Refer to:
- GitHub Actions docs: https://docs.github.com/en/actions
- Playwright docs: https://playwright.dev/
- WaysNX UI Kit architecture: `docs/architecture/README.md`
