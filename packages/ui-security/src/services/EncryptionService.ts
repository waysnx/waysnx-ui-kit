/**
 * @file services/EncryptionService.ts
 * Encryption, decryption, and secure storage service
 * 
 * Provides Web Crypto API integration for encryption/decryption,
 * password hashing (PBKDF2), input sanitization, secure storage,
 * and sensitive data handling.
 * 
 * @example
 * ```tsx
 * const encryptionService = new EncryptionService();
 * 
 * // Hash password
 * const hash = await encryptionService.hashPassword('password123');
 * const verified = await encryptionService.verifyPassword('password123', hash);
 * 
 * // Encrypt data
 * const encrypted = await encryptionService.encrypt('sensitive data');
 * const decrypted = await encryptionService.decrypt(encrypted);
 * 
 * // Sanitize input
 * const safe = encryptionService.sanitizeInput(userInput);
 * ```
 */

import {
  EncryptionResult,
  DecryptionResult,
  PasswordHashResult,
  PasswordVerificationResult,
  SecureStorageItem,
  MaskedInputConfig,
  DataMaskingPattern,
} from '../types/encryption';
import { EncryptionError, ValidationError } from './errors/SecurityError';

/**
 * Encryption service configuration
 */
interface EncryptionServiceConfig {
  algorithm?: 'AES-GCM' | 'AES-CBC';
  hashAlgorithm?: 'PBKDF2' | 'SHA-256' | 'SHA-512';
  iterations?: number;
  keyLength?: number;
  saltLength?: number;
  tagLength?: number;
}

/**
 * Encryption service
 */
export class EncryptionService {
  private config: Required<EncryptionServiceConfig>;
  private encryptionKey: CryptoKey | null = null;
  private secureStorage = new Map<string, SecureStorageItem>();

  constructor(config?: EncryptionServiceConfig) {
    this.config = {
      algorithm: config?.algorithm || 'AES-GCM',
      hashAlgorithm: config?.hashAlgorithm || 'PBKDF2',
      iterations: config?.iterations ?? 600000,
      keyLength: config?.keyLength ?? 256,
      saltLength: config?.saltLength ?? 16,
      tagLength: config?.tagLength ?? 128,
    };
  }

  /**
   * Hash password using PBKDF2
   */
  async hashPassword(
    password: string,
    salt?: Uint8Array
  ): Promise<PasswordHashResult> {
    try {
      if (!password || typeof password !== 'string') {
        throw new ValidationError(['Password must be a non-empty string']);
      }

      // Generate salt if not provided
      const hashSalt = salt || crypto.getRandomValues(new Uint8Array(this.config.saltLength!));

      // Import password as key
      const passwordKey = await crypto.subtle.importKey(
        'raw',
        new TextEncoder().encode(password),
        'PBKDF2',
        false,
        ['deriveBits']
      );

      // Derive key
      const derivedBits = await crypto.subtle.deriveBits(
        {
          name: 'PBKDF2',
          salt: hashSalt as any,
          iterations: this.config.iterations!,
          hash: 'SHA-256',
        },
        passwordKey,
        this.config.keyLength!
      );

      // Convert to hex string
      const hashArray = new Uint8Array(derivedBits);
      const hashHex = Array.from(hashArray).map(b => b.toString(16).padStart(2, '0')).join('');
      const saltHex = Array.from(hashSalt).map(b => b.toString(16).padStart(2, '0')).join('');

      return {
        hash: hashHex,
        salt: saltHex,
        algorithm: 'PBKDF2',
        iterations: this.config.iterations!,
        keyLength: this.config.keyLength!,
      };
    } catch (error) {
      throw new EncryptionError('Failed to hash password', {
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Verify password against hash
   */
  async verifyPassword(
    password: string,
    hash: string,
    salt?: string
  ): Promise<PasswordVerificationResult> {
    try {
      if (!password || !hash) {
        return {
          matches: false,
          algorithm: 'PBKDF2',
          verificationTime: Date.now(),
        };
      }

      // If salt is provided as hex string, convert it
      let saltBytes: Uint8Array;
      if (salt) {
        saltBytes = new Uint8Array(salt.match(/.{1,2}/g)!.map((byte: string) => parseInt(byte, 16)));
      } else {
        // Use default salt length
        saltBytes = new Uint8Array(this.config.saltLength!);
      }

      // Hash provided password
      const result = await this.hashPassword(password, saltBytes);

      // Compare hashes in constant time
      const matches = this.constantTimeCompare(result.hash, hash);

      return {
        matches,
        algorithm: 'PBKDF2',
        verificationTime: Date.now(),
      };
    } catch (error) {
      throw new EncryptionError('Failed to verify password', {
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Encrypt data
   */
  async encrypt(data: string | object): Promise<EncryptionResult> {
    try {
      // Generate or use existing encryption key
      if (!this.encryptionKey) {
        this.encryptionKey = await this.generateEncryptionKey();
      }

      const plaintext = typeof data === 'string' ? data : JSON.stringify(data);
      const iv = crypto.getRandomValues(new Uint8Array(12)); // 96-bit IV for GCM

      const encrypted = await crypto.subtle.encrypt(
        {
          name: this.config.algorithm,
          iv,
          tagLength: this.config.tagLength!,
        },
        this.encryptionKey,
        new TextEncoder().encode(plaintext)
      );

      const encryptedArray = new Uint8Array(encrypted);
      const ivHex = Array.from(iv).map(b => b.toString(16).padStart(2, '0')).join('');
      const dataHex = Array.from(encryptedArray).map(b => b.toString(16).padStart(2, '0')).join('');

      return {
        encrypted: dataHex,
        iv: ivHex,
        algorithm: this.config.algorithm!,
        timestamp: new Date(),
      };
    } catch (error) {
      throw new EncryptionError('Failed to encrypt data', {
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Decrypt data
   */
  async decrypt(encryptedData: EncryptionResult | string): Promise<DecryptionResult> {
    try {
      if (!this.encryptionKey) {
        this.encryptionKey = await this.generateEncryptionKey();
      }

      let data: EncryptionResult;
      if (typeof encryptedData === 'string') {
        // Parse if string
        try {
          data = JSON.parse(encryptedData);
        } catch {
          throw new EncryptionError('Invalid encrypted data format');
        }
      } else {
        data = encryptedData;
      }

      // Convert hex strings back to Uint8Array
      const encryptedArray = new Uint8Array(
        (data.encrypted!).match(/.{1,2}/g)!.map((byte: string) => parseInt(byte, 16))
      );
      const iv = new Uint8Array(
        (data.iv!).match(/.{1,2}/g)!.map((byte: string) => parseInt(byte, 16))
      );

      const decrypted = await crypto.subtle.decrypt(
        {
          name: data.algorithm || this.config.algorithm,
          iv,
          tagLength: this.config.tagLength!,
        },
        this.encryptionKey,
        encryptedArray
      );

      const plaintext = new TextDecoder().decode(decrypted);

      // Try to parse as JSON, otherwise return as string
      let parsedData: any = plaintext;
      try {
        parsedData = JSON.parse(plaintext);
      } catch {
        // Not JSON, keep as string
      }

      return {
        decrypted: plaintext,
        parsed: parsedData,
        algorithm: (data.algorithm as string) || this.config.algorithm!,
        timestamp: new Date(),
      };
    } catch (error) {
      throw new EncryptionError('Failed to decrypt data', {
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Sanitize user input to prevent XSS
   */
  sanitizeInput(input: string): string {
    if (!input || typeof input !== 'string') {
      return '';
    }

    // Create a temporary element to use browser's HTML parser
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
  }

  /**
   * Sanitize HTML content
   */
  sanitizeHtml(html: string, allowedTags?: string[]): string {
    if (!html || typeof html !== 'string') {
      return '';
    }

    const defaultAllowed = ['p', 'br', 'strong', 'em', 'u', 'a', 'ul', 'ol', 'li', 'b', 'i'];
    const allowed = allowedTags || defaultAllowed;

    const div = document.createElement('div');
    div.innerHTML = html;

    // Remove script tags
    const scripts = div.querySelectorAll('script, style, iframe');
    scripts.forEach(script => script.remove());

    // Remove disallowed tags but keep content
    const allTags = div.querySelectorAll('*');
    allTags.forEach(tag => {
      if (!allowed.includes(tag.tagName.toLowerCase())) {
        const parent = tag.parentNode;
        if (parent) {
          while (tag.firstChild) {
            parent.insertBefore(tag.firstChild, tag);
          }
          parent.removeChild(tag);
        }
      }

      // Remove event handlers
      Array.from(tag.attributes).forEach(attr => {
        if (attr.name.startsWith('on')) {
          tag.removeAttribute(attr.name);
        }
      });
    });

    return div.innerHTML;
  }

  /**
   * Mask sensitive data
   */
  maskData(data: string, pattern: DataMaskingPattern = 'all'): string {
    if (!data) {
      return '';
    }

    switch (pattern) {
      case 'email':
        // Show first 2 chars and last 2 chars of local part
        const [local, domain] = data.split('@');
        if (local && domain) {
          const masked = local.length > 4
            ? local[0] + '*'.repeat(local.length - 2) + local[local.length - 1]
            : '*'.repeat(local.length);
          return `${masked}@${domain}`;
        }
        return data;

      case 'phone':
        // Show last 4 digits
        return '*'.repeat(Math.max(0, data.length - 4)) + data.slice(-4);

      case 'creditcard':
        // Show last 4 digits
        return '*'.repeat(Math.max(0, data.length - 4)) + data.slice(-4);

      case 'ssn':
        // Show last 4 digits
        return '***-**-' + data.slice(-4);

      case 'all':
      default:
        return '*'.repeat(data.length);
    }
  }

  /**
   * Create masked input config
   */
  createMaskedInputConfig(pattern: DataMaskingPattern): MaskedInputConfig {
    return {
      type: 'password',
      pattern,
      showMaskToggle: true,
      maskCharacter: '•',
      copyOnReveal: false,
    };
  }

  /**
   * Store data in secure storage
   */
  async storeSecure(key: string, value: string | object): Promise<void> {
    try {
      const encryptionResult = await this.encrypt(value);
      const item: SecureStorageItem = {
        key,
        encryptedValue: encryptionResult.encrypted,
        iv: encryptionResult.iv,
        algorithm: encryptionResult.algorithm,
        timestamp: encryptionResult.timestamp,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      };

      this.secureStorage.set(key, item);
    } catch (error) {
      throw new EncryptionError('Failed to store secure data', {
        key,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Retrieve data from secure storage
   */
  async retrieveSecure(key: string): Promise<any> {
    try {
      const item = this.secureStorage.get(key);
      if (!item) {
        throw new EncryptionError('Secure storage item not found', { key });
      }

      // Check expiration
      if (item.expiresAt && new Date() > item.expiresAt) {
        this.secureStorage.delete(key);
        throw new EncryptionError('Secure storage item has expired', { key });
      }

      const result = await this.decrypt({
        encrypted: item.encryptedValue,
        iv: item.iv,
        algorithm: item.algorithm,
        timestamp: item.timestamp,
      });

      return result.parsed ?? result.decrypted;
    } catch (error) {
      throw new EncryptionError('Failed to retrieve secure data', {
        key,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Remove item from secure storage
   */
  removeSecure(key: string): boolean {
    return this.secureStorage.delete(key);
  }

  /**
   * Clear all secure storage
   */
  clearSecureStorage(): void {
    this.secureStorage.clear();
  }

  /**
   * Get secure storage stats
   */
  getSecureStorageStats() {
    return {
      itemCount: this.secureStorage.size,
      items: Array.from(this.secureStorage.entries()).map(([key, item]) => ({
        key,
        algorithm: item.algorithm,
        timestamp: item.timestamp,
        expiresAt: item.expiresAt,
      })),
    };
  }

  // Private helper methods

  /**
   * Generate encryption key
   */
  private async generateEncryptionKey(): Promise<CryptoKey> {
    return await crypto.subtle.generateKey(
      {
        name: this.config.algorithm,
        length: this.config.keyLength!,
      },
      true, // extractable
      ['encrypt', 'decrypt']
    );
  }

  /**
   * Constant-time string comparison to prevent timing attacks
   */
  private constantTimeCompare(a: string, b: string): boolean {
    if (a.length !== b.length) {
      return false;
    }

    let result = 0;
    for (let i = 0; i < a.length; i++) {
      result |= a.charCodeAt(i) ^ b.charCodeAt(i);
    }

    return result === 0;
  }
}

export default EncryptionService;
