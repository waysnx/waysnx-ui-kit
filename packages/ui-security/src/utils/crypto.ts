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
