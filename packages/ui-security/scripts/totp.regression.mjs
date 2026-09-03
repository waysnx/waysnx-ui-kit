/**
 * TOTP regression harness (no test framework — plain Node + assertions).
 *
 * Verifies the genuine RFC 6238 TOTP implementation in @waysnx/ui-security:
 *  - a published RFC 6238 test vector (deterministic, known-answer),
 *  - round-trip generate→verify,
 *  - rejection of wrong codes,
 *  - rejection of malformed input,
 *  - clock-drift window behaviour.
 *
 * Run:  node scripts/totp.regression.mjs   (after `pnpm build`)
 * Exits non-zero on any failure so it can gate release validation.
 */

import assert from 'node:assert/strict';
// Import the TOTP functions directly from source (mfa.ts only depends on
// crypto.ts — both pure TS, no React/CSS), run via Node's type-stripping so no
// test framework or bundler is required.
import { generateTOTPCode, verifyTOTPCode, base32Decode } from '../src/utils/totp.ts';

let passed = 0;
async function check(name, fn) {
  await fn();
  passed++;
  console.log(`  ok  ${name}`);
}

// RFC 6238 Appendix B seed "12345678901234567890" (ASCII) in base32.
const RFC_SECRET = 'GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ';

async function main() {
  // 1) Known-answer vector: at Unix time 59s, RFC 6238 SHA-1 TOTP = 94287082;
  //    the 6-digit truncation is 287082.
  await check('RFC 6238 known vector (T=59s) → 287082', async () => {
    const code = await generateTOTPCode(RFC_SECRET, new Date(59 * 1000), 6, 30);
    assert.equal(code, '287082');
  });

  // 2) base32Decode of the RFC seed yields the original ASCII bytes.
  await check('base32Decode round-trips the RFC ASCII seed', async () => {
    const bytes = base32Decode(RFC_SECRET);
    assert.equal(new TextDecoder().decode(bytes), '12345678901234567890');
  });

  // 3) Round-trip: a freshly generated code verifies at the same time.
  await check('generate→verify round-trip succeeds', async () => {
    const now = new Date();
    const code = await generateTOTPCode(RFC_SECRET, now);
    assert.equal(await verifyTOTPCode(RFC_SECRET, code, 1, now), true);
  });

  // 4) A wrong (but well-formed) code is rejected — the core security fix.
  await check('wrong 6-digit code is REJECTED (regression for placeholder)', async () => {
    const now = new Date();
    const real = await generateTOTPCode(RFC_SECRET, now);
    const wrong = real === '000000' ? '111111' : '000000';
    assert.equal(await verifyTOTPCode(RFC_SECRET, wrong, 1, now), false);
  });

  // 5) Malformed inputs are rejected.
  await check('malformed codes are rejected', async () => {
    const now = new Date();
    for (const bad of ['', '12345', '1234567', 'abcdef', '12 34 56']) {
      assert.equal(await verifyTOTPCode(RFC_SECRET, bad, 1, now), false);
    }
  });

  // 6) Window: a code from the previous step verifies with window=1 but not window=0.
  await check('clock-drift window is honoured', async () => {
    const now = new Date();
    const prevStep = new Date(now.getTime() - 30 * 1000);
    const prevCode = await generateTOTPCode(RFC_SECRET, prevStep);
    assert.equal(await verifyTOTPCode(RFC_SECRET, prevCode, 1, now), true);
    assert.equal(await verifyTOTPCode(RFC_SECRET, prevCode, 0, now), false);
  });

  console.log(`\nTOTP regression: ${passed} checks passed.`);
}

main().catch((err) => {
  console.error('\nTOTP regression FAILED:', err.message);
  process.exit(1);
});
