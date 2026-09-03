/**
 * RFC 6238 TOTP primitives (base32 decode, code generation, verification).
 *
 * Isolated from `mfa.ts` so it depends only on Web Crypto — no enums, no React,
 * no CSS — which keeps it independently testable (see
 * `scripts/totp.regression.mjs`) and keeps a single genuine implementation.
 */

/**
 * Validate OTP code format (standard OTP is 6 digits).
 */
export function isValidOTPFormat(code: string): boolean {
  return /^\d{6}$/.test(code);
}

/**
 * Decode an RFC 4648 base32 string (the format produced by `generateTOTPSecret`)
 * into raw bytes. Padding (`=`) and casing are tolerated; whitespace is ignored.
 *
 * @param input - Base32-encoded secret
 * @returns Decoded bytes
 * @throws If the input contains characters outside the base32 alphabet
 */
export function base32Decode(input: string): Uint8Array {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  const cleaned = input.replace(/=+$/g, '').replace(/\s+/g, '').toUpperCase();

  let bits = 0;
  let value = 0;
  const bytes: number[] = [];

  for (const char of cleaned) {
    const idx = alphabet.indexOf(char);
    if (idx === -1) {
      throw new Error('base32Decode: invalid base32 character');
    }
    value = (value << 5) | idx;
    bits += 5;
    if (bits >= 8) {
      bits -= 8;
      bytes.push((value >>> bits) & 0xff);
    }
  }

  // Back the array with a concrete ArrayBuffer so it satisfies Web Crypto's
  // BufferSource typing (Uint8Array<ArrayBufferLike> is otherwise rejected).
  const out = new Uint8Array(new ArrayBuffer(bytes.length));
  out.set(bytes);
  return out;
}

/**
 * Generate the RFC 6238 TOTP code for a base32 secret at a given time.
 *
 * Uses Web Crypto HMAC-SHA1 (hence async). Implements HOTP dynamic truncation
 * (RFC 4226 §5.3) over the time counter `floor(seconds / timeStep)`.
 *
 * @param secret - Base32-encoded TOTP secret
 * @param forTime - Time to generate the code for (default: now)
 * @param digits - Number of output digits (default: 6)
 * @param timeStep - Time step in seconds (default: 30)
 * @returns The zero-padded numeric TOTP code
 */
export async function generateTOTPCode(
  secret: string,
  forTime: Date = new Date(),
  digits: number = 6,
  timeStep: number = 30
): Promise<string> {
  const counter = Math.floor(Math.floor(forTime.getTime() / 1000) / timeStep);

  // 8-byte big-endian counter (backed by a concrete ArrayBuffer for Web Crypto).
  const counterBytes = new Uint8Array(new ArrayBuffer(8));
  let temp = counter;
  for (let i = 7; i >= 0; i--) {
    counterBytes[i] = temp & 0xff;
    temp = Math.floor(temp / 256);
  }

  const keyBytes = base32Decode(secret);
  // Pass the underlying ArrayBuffer (concrete, non-shared) to satisfy Web
  // Crypto's BufferSource typing across TS lib versions.
  const key = await crypto.subtle.importKey(
    'raw',
    keyBytes.buffer as ArrayBuffer,
    { name: 'HMAC', hash: 'SHA-1' },
    false,
    ['sign']
  );
  const hmac = new Uint8Array(
    await crypto.subtle.sign('HMAC', key, counterBytes.buffer as ArrayBuffer)
  );

  // Dynamic truncation (RFC 4226 §5.3).
  const offset = hmac[hmac.length - 1] & 0x0f;
  const binary =
    ((hmac[offset] & 0x7f) << 24) |
    ((hmac[offset + 1] & 0xff) << 16) |
    ((hmac[offset + 2] & 0xff) << 8) |
    (hmac[offset + 3] & 0xff);

  const otp = binary % 10 ** digits;
  return otp.toString().padStart(digits, '0');
}

/**
 * Constant-time string comparison to avoid leaking timing information about how
 * many leading characters matched.
 */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

/**
 * Verify a TOTP code against a base32 secret (genuine RFC 6238 verification).
 *
 * The code is checked against the current time step and `±window` adjacent
 * steps to tolerate clock drift (default window 1 → ±30s). Uses Web Crypto
 * HMAC-SHA1, so this function is asynchronous.
 *
 * NOTE: This is a real cryptographic verification. It replaced a previous
 * placeholder that accepted any well-formed 6-digit code. The signature is
 * intentionally `Promise<boolean>` because Web Crypto HMAC is async.
 *
 * @param secret - Base32-encoded TOTP secret
 * @param code - Code entered by the user
 * @param window - Number of adjacent time steps to allow on each side (default: 1)
 * @param forTime - Reference time (default: now); primarily for testing
 * @param timeStep - Time step in seconds (default: 30)
 * @returns Resolves true only if the code matches within the allowed window
 */
export async function verifyTOTPCode(
  secret: string,
  code: string,
  window: number = 1,
  forTime: Date = new Date(),
  timeStep: number = 30
): Promise<boolean> {
  if (!secret || !isValidOTPFormat(code)) {
    return false;
  }

  let valid = false;
  // Check every step in the window (do not early-return, to keep timing flat).
  for (let offset = -window; offset <= window; offset++) {
    const t = new Date(forTime.getTime() + offset * timeStep * 1000);
    // eslint-disable-next-line no-await-in-loop
    const expected = await generateTOTPCode(secret, t, code.length, timeStep);
    if (timingSafeEqual(expected, code)) {
      valid = true;
    }
  }

  return valid;
}
