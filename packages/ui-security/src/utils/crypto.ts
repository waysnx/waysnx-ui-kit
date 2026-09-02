/**
 * @file utils/crypto.ts
 * Cryptographic utilities using Web Crypto API
 */

/**
 * Encrypt data using AES-GCM
 */
export async function encrypt(
  data: string,
  password: string
): Promise<{ ciphertext: string; iv: string; salt: string }> {
  try {
    // Generate salt and IV
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));

    // Derive key from password
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(password),
      'PBKDF2',
      false,
      ['deriveBits']
    );

    const derivedKey = await crypto.subtle.deriveBits(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: 100000,
        hash: 'SHA-256',
      },
      keyMaterial,
      256
    );

    const key = await crypto.subtle.importKey('raw', derivedKey, 'AES-GCM', false, [
      'encrypt',
    ]);

    // Encrypt data
    const encrypted = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv: iv },
      key,
      new TextEncoder().encode(data)
    );

    return {
      ciphertext: btoa(String.fromCharCode(...new Uint8Array(encrypted))),
      iv: btoa(String.fromCharCode(...iv)),
      salt: btoa(String.fromCharCode(...salt)),
    };
  } catch (error) {
    throw new Error(`Encryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Decrypt data using AES-GCM
 */
export async function decrypt(
  ciphertext: string,
  password: string,
  iv: string,
  salt: string
): Promise<string> {
  try {
    // Decode from base64
    const decodedCiphertext = Uint8Array.from(atob(ciphertext), (c) => c.charCodeAt(0));
    const decodedIv = Uint8Array.from(atob(iv), (c) => c.charCodeAt(0));
    const decodedSalt = Uint8Array.from(atob(salt), (c) => c.charCodeAt(0));

    // Derive key from password
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(password),
      'PBKDF2',
      false,
      ['deriveBits']
    );

    const derivedKey = await crypto.subtle.deriveBits(
      {
        name: 'PBKDF2',
        salt: decodedSalt,
        iterations: 100000,
        hash: 'SHA-256',
      },
      keyMaterial,
      256
    );

    const key = await crypto.subtle.importKey('raw', derivedKey, 'AES-GCM', false, [
      'decrypt',
    ]);

    // Decrypt data
    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: decodedIv },
      key,
      decodedCiphertext
    );

    return new TextDecoder().decode(decrypted);
  } catch (error) {
    throw new Error(`Decryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Generate hash using SHA-256
 */
export async function hash(data: string): Promise<string> {
  try {
    const buffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(data));
    return btoa(String.fromCharCode(...new Uint8Array(buffer)));
  } catch (error) {
    throw new Error(`Hashing failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Verify hash using SHA-256
 */
export async function verifyHash(data: string, hash: string): Promise<boolean> {
  try {
    const computed = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(data));
    const computedHash = btoa(String.fromCharCode(...new Uint8Array(computed)));
    return computedHash === hash;
  } catch (error) {
    throw new Error(`Hash verification failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Generate random bytes
 */
export function generateRandomBytes(length: number): Uint8Array {
  return crypto.getRandomValues(new Uint8Array(length));
}

/**
 * Generate random string
 */
export function generateRandomString(length: number): string {
  const array = generateRandomBytes(length);
  return btoa(String.fromCharCode(...array)).replace(/[^a-z0-9]/gi, '').substring(0, length);
}

/**
 * Generate an unbiased cryptographically-secure random integer in [0, max).
 *
 * Uses rejection sampling over `crypto.getRandomValues` so that every value in
 * the range is equally likely (avoids the modulo bias that `x % max` introduces
 * and the non-cryptographic weakness of `Math.random()`).
 *
 * @param max - Exclusive upper bound (must be a positive integer)
 * @returns A secure random integer 0 <= n < max
 */
export function secureRandomInt(max: number): number {
  if (!Number.isInteger(max) || max <= 0) {
    throw new Error('secureRandomInt: max must be a positive integer');
  }
  if (max === 1) return 0;

  // Largest multiple of `max` that fits in a Uint32, used to reject the biased tail.
  const range = 0xffffffff + 1; // 2^32
  const limit = range - (range % max);

  const buffer = new Uint32Array(1);
  let value: number;
  do {
    crypto.getRandomValues(buffer);
    value = buffer[0];
  } while (value >= limit);

  return value % max;
}

/**
 * Generate a cryptographically-secure random string from a given alphabet.
 *
 * Each character is chosen with `secureRandomInt`, guaranteeing uniform,
 * unbiased selection and a fixed output length (unlike `generateRandomString`,
 * which drops non-alphanumeric base64 characters).
 *
 * @param length - Number of characters to produce
 * @param alphabet - Character set to draw from
 * @returns Secure random string of exactly `length` characters
 */
export function secureRandomString(
  length: number,
  alphabet: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
): string {
  if (!Number.isInteger(length) || length < 0) {
    throw new Error('secureRandomString: length must be a non-negative integer');
  }
  if (alphabet.length === 0) {
    throw new Error('secureRandomString: alphabet must not be empty');
  }

  let result = '';
  for (let i = 0; i < length; i++) {
    result += alphabet[secureRandomInt(alphabet.length)];
  }
  return result;
}

/**
 * Return a new array shuffled with a cryptographically-secure, unbiased
 * Fisher-Yates algorithm.
 *
 * This replaces the biased `array.sort(() => Math.random() - 0.5)` idiom, which
 * is both non-uniform and non-cryptographic.
 *
 * @param input - Array to shuffle (not mutated)
 * @returns A new, securely shuffled array
 */
export function secureShuffle<T>(input: readonly T[]): T[] {
  const result = [...input];
  for (let i = result.length - 1; i > 0; i--) {
    const j = secureRandomInt(i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Generate a collision-resistant identifier with a cryptographically-secure
 * random component.
 *
 * Format: `${prefix}_${timestamp}_${random}`. The timestamp keeps identifiers
 * roughly ordered/readable for logs, while the random suffix is generated with
 * `secureRandomString` so the identifier is not predictable. Use this for
 * security-relevant identifiers (sessions, devices, audit events) instead of
 * `Math.random().toString(36)`.
 *
 * @param prefix - Short semantic prefix (e.g. "sess", "dev", "evt")
 * @param randomLength - Length of the random suffix (default: 16)
 * @returns Secure identifier string
 */
export function generateSecureId(prefix: string, randomLength: number = 16): string {
  const random = secureRandomString(randomLength);
  return `${prefix}_${Date.now()}_${random}`;
}
