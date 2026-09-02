/**
 * @file types/encryption.ts
 * Encryption, secure storage, and data protection types
 */

/**
 * Encryption algorithm
 */
export type EncryptionAlgorithm = 'AES-256-GCM' | 'AES-256-CBC' | 'ChaCha20-Poly1305';

/**
 * Encryption key
 */
export interface EncryptionKey {
  id: string;
  algorithm: EncryptionAlgorithm;
  keySize: number;
  createdAt: Date;
  expiresAt?: Date;
  isActive: boolean;
  metadata?: Record<string, any>;
}

/**
 * Encrypted data
 */
export interface EncryptedData {
  encrypted: string;
  iv: string;
  algorithm: string;
  timestamp: Date;
}

/**
 * Encryption result
 */
export interface EncryptionResult {
  encrypted: string;
  iv: string;
  algorithm: string;
  timestamp: Date;
}

/**
 * Decryption result
 */
export interface DecryptionResult {
  decrypted: string;
  parsed: any;
  algorithm: string;
  timestamp: Date;
}

/**
 * Secure storage options
 */
export interface SecureStorageOptions {
  type: 'memory' | 'localStorage' | 'sessionStorage' | 'indexedDB';
  encrypted: boolean;
  ttl?: number; // Time to live in ms
  encryptionKey?: string;
}

/**
 * Secure storage item
 */
export interface SecureStorageItem {
  key: string;
  encryptedValue: string;
  iv: string;
  algorithm: string;
  timestamp: Date;
  expiresAt?: Date;
}

/**
 * Input sanitization options
 */
export interface SanitizationOptions {
  removeScripts: boolean;
  removeHtml: boolean;
  removeSpecialChars: boolean;
  maxLength?: number;
  allowedTags?: string[];
  allowedAttributes?: Record<string, string[]>;
}

/**
 * Sanitization result
 */
export interface SanitizationResult {
  original: string;
  sanitized: string;
  isClean: boolean;
  threats: SanitizationThreat[];
}

/**
 * Sanitization threat
 */
export interface SanitizationThreat {
  type: 'script' | 'html' | 'xss' | 'sql_injection' | 'special_chars';
  pattern: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description?: string;
}

/**
 * HTML sanitization options
 */
export interface HtmlSanitizationOptions {
  ALLOWED_TAGS?: string[];
  ALLOWED_ATTR?: string[];
  ALLOW_DATA_ATTR?: boolean;
  KEEP_CONTENT?: boolean;
}

/**
 * Password hashing options
 */
export interface PasswordHashingOptions {
  algorithm: 'bcrypt' | 'argon2' | 'pbkdf2' | 'scrypt';
  rounds?: number;
  saltLength?: number;
  iterations?: number;
  memory?: number;
  parallelism?: number;
}

/**
 * Password hash result
 */
export interface PasswordHashResult {
  hash: string;
  salt: string;
  algorithm: string;
  iterations: number;
  keyLength: number;
}

/**
 * Password verification result
 */
export interface PasswordVerificationResult {
  matches: boolean;
  algorithm: string;
  verificationTime: number;
}

/**
 * Secure clipboard configuration
 */
export interface SecureClipboardConfig {
  enableTimeout: boolean;
  timeoutMs: number;
  showNotification: boolean;
  notificationDuration: number;
  logCopyEvents: boolean;
  maxRetries: number;
}

/**
 * Masked input configuration
 */
export interface MaskedInputConfig {
  type: 'credit-card' | 'phone' | 'ssn' | 'date' | 'custom' | 'password';
  pattern?: string;
  maskCharacter?: string;
  showMaskToggle?: boolean;
  copyOnReveal?: boolean;
}

/**
 * Data masking pattern
 */
export type DataMaskingPattern = 'all' | 'email' | 'phone' | 'creditcard' | 'ssn';

/**
 * Encryption certificate
 */
export interface EncryptionCertificate {
  id: string;
  issuer: string;
  subject: string;
  algorithm: string;
  publicKey: string;
  privateKey?: string;
  fingerprint: string;
  notBefore: Date;
  notAfter: Date;
  isValid: boolean;
  isRevoked: boolean;
  metadata?: Record<string, any>;
}

/**
 * Secure file upload options
 */
export interface SecureFileUploadOptions {
  maxFileSize: number; // Bytes
  allowedMimeTypes: string[];
  scanForViruses: boolean;
  encryptAfterUpload: boolean;
  quarantineOnDetection: boolean;
  encryptionAlgorithm?: EncryptionAlgorithm;
  metadata?: Record<string, any>;
}

/**
 * Secure file download options
 */
export interface SecureFileDownloadOptions {
  decryptBeforeDownload: boolean;
  logDownload: boolean;
  rateLimit?: number; // Downloads per minute
  expireLink: boolean;
  expirationTime?: number; // ms
  requireAcknowledgement?: boolean;
}

/**
 * Encryption state
 */
export interface EncryptionState {
  isAvailable: boolean;
  isHardwareAccelerated: boolean;
  supportedAlgorithms: EncryptionAlgorithm[];
  activeKeyId?: string;
}

/**
 * Secure storage statistics
 */
export interface SecureStorageStats {
  totalItems: number;
  encryptedItems: number;
  expiredItems: number;
  totalSize: number;
  encryptedSize: number;
}
