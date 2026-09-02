/**
 * Device Management and Verification Utilities
 * 
 * Provides utilities for device identification, trust management,
 * and device-based security policies.
 */

import type { DeviceInfo } from '../types';
import { generateSecureId } from './crypto';

/**
 * Trusted device interface
 */
interface TrustedDevice {
  id: string;
  userId: string;
  deviceId?: string;
  name?: string;
  deviceInfo: DeviceInfo;
  fingerprint: string;
  trustLevel: 'low' | 'medium' | 'high';
  status?: 'unverified' | 'pending' | 'verified' | 'compromised' | 'revoked' | 'active' | 'inactive';
  isRevoked?: boolean;
  createdAt: Date;
  expiresAt: Date;
  verifiedAt?: Date;
  lastUsedAt?: Date;
  isTrusted: boolean;
}

/**
 * Device verification status
 */
export enum DeviceVerificationStatus {
  UNVERIFIED = 'unverified',
  PENDING = 'pending',
  VERIFIED = 'verified',
  COMPROMISED = 'compromised',
  REVOKED = 'revoked',
}

/**
 * Device operating system types
 */
export enum DeviceOS {
  WINDOWS = 'windows',
  MACOS = 'macos',
  LINUX = 'linux',
  IOS = 'ios',
  ANDROID = 'android',
  UNKNOWN = 'unknown',
}

/**
 * Device browser types
 */
export enum DeviceBrowser {
  CHROME = 'chrome',
  FIREFOX = 'firefox',
  SAFARI = 'safari',
  EDGE = 'edge',
  IE = 'ie',
  OPERA = 'opera',
  UNKNOWN = 'unknown',
}

/**
 * Detect device OS from user agent
 * 
 * @param userAgent - User agent string
 * @returns Detected OS
 */
export function detectDeviceOS(userAgent: string): DeviceOS {
  if (!userAgent) return DeviceOS.UNKNOWN;

  const ua = userAgent.toLowerCase();

  if (ua.includes('win')) return DeviceOS.WINDOWS;
  if (ua.includes('mac')) return DeviceOS.MACOS;
  if (ua.includes('linux')) return DeviceOS.LINUX;
  if (ua.includes('iphone') || ua.includes('ipad')) return DeviceOS.IOS;
  if (ua.includes('android')) return DeviceOS.ANDROID;

  return DeviceOS.UNKNOWN;
}

/**
 * Detect browser from user agent
 * 
 * @param userAgent - User agent string
 * @returns Detected browser
 */
export function detectBrowser(userAgent: string): DeviceBrowser {
  if (!userAgent) return DeviceBrowser.UNKNOWN;

  const ua = userAgent.toLowerCase();

  if (ua.includes('edg/')) return DeviceBrowser.EDGE;
  if (ua.includes('chrome') && !ua.includes('edge')) return DeviceBrowser.CHROME;
  if (ua.includes('safari') && !ua.includes('chrome')) return DeviceBrowser.SAFARI;
  if (ua.includes('firefox')) return DeviceBrowser.FIREFOX;
  if (ua.includes('opera') || ua.includes('opr/')) return DeviceBrowser.OPERA;
  if (ua.includes('trident') || ua.includes('msie')) return DeviceBrowser.IE;

  return DeviceBrowser.UNKNOWN;
}

/**
 * Detect if device is mobile
 * 
 * @param userAgent - User agent string
 * @returns true if device is mobile, false otherwise
 */
export function isMobileDevice(userAgent: string): boolean {
  if (!userAgent) return false;

  const ua = userAgent.toLowerCase();
  const mobileIndicators =
    /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile/i;

  return mobileIndicators.test(ua);
}

/**
 * Collect device information
 * 
 * @returns Device information object
 */
export function collectDeviceInfo(): DeviceInfo {
  const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : '';

  return {
    id: generateDeviceId(),
    os: detectDeviceOS(userAgent),
    browser: detectBrowser(userAgent),
    userAgent,
    isMobile: isMobileDevice(userAgent),
    screenResolution:
      typeof window !== 'undefined'
        ? `${window.screen.width}x${window.screen.height}`
        : 'unknown',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    language:
      typeof navigator !== 'undefined' ? navigator.language : 'unknown',
    touchSupport: typeof window !== 'undefined' ? 'ontouchstart' in window : false,
    webglSupport: supportsWebGL(),
    localStorageSupport: supportsLocalStorage(),
    sessionStorageSupport: supportsSessionStorage(),
    cookiesEnabled:
      typeof navigator !== 'undefined' ? navigator.cookieEnabled : false,
    doNotTrack:
      typeof navigator !== 'undefined'
        ? navigator.doNotTrack === '1'
        : false,
  };
}

/**
 * Generate unique device ID
 * 
 * @returns Device ID
 */
export function generateDeviceId(): string {
  // Device identifiers feed trust decisions, so they use a cryptographically-
  // secure random suffix rather than Math.random().
  return generateSecureId('dev');
}

/**
 * Create a fingerprint hash from device information
 * 
 * @param deviceInfo - Device information
 * @returns Device fingerprint hash
 */
export async function createDeviceFingerprint(
  deviceInfo: DeviceInfo
): Promise<string> {
  const fingerprintData = `${deviceInfo.os}|${deviceInfo.browser}|${deviceInfo.userAgent}|${deviceInfo.screenResolution}`;

  const encoder = new TextEncoder();
  const data = encoder.encode(fingerprintData);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Verify device fingerprint
 * 
 * @param deviceInfo - Current device information
 * @param fingerprint - Previously stored fingerprint
 * @returns true if fingerprints match, false otherwise
 */
export async function verifyDeviceFingerprint(
  deviceInfo: DeviceInfo,
  fingerprint: string
): Promise<boolean> {
  const currentFingerprint = await createDeviceFingerprint(deviceInfo);
  return currentFingerprint === fingerprint;
}

/**
 * Create a trusted device record
 * 
 * @param userId - User ID
 * @param deviceInfo - Device information
 * @param name - Device display name (e.g., "Work Laptop")
 * @param expirationDays - Days until device trust expires (default: 90)
 * @returns Trusted device record
 */
export async function createTrustedDevice(
  userId: string,
  deviceInfo: DeviceInfo,
  name: string = `${deviceInfo.browser} on ${deviceInfo.os}`,
  expirationDays: number = 90
): Promise<TrustedDevice> {
  const now = new Date();
  const expiresAt = new Date(now.getTime() + expirationDays * 24 * 60 * 60 * 1000);
  const fingerprint = await createDeviceFingerprint(deviceInfo);

  return {
    id: generateTrustedDeviceId(),
    userId,
    deviceId: deviceInfo.id,
    name,
    fingerprint,
    deviceInfo,
    status: DeviceVerificationStatus.UNVERIFIED,
    trustLevel: 'low' as const,
    isTrusted: false,
    createdAt: now,
    verifiedAt: undefined,
    lastUsedAt: undefined,
    expiresAt,
    isRevoked: false,
  };
}

/**
 * Generate trusted device ID
 */
function generateTrustedDeviceId(): string {
  return generateSecureId('td');
}

/**
 * Verify trusted device
 * 
 * @param trustedDevice - Trusted device record
 * @returns Updated trusted device
 */
export function verifyTrustedDevice(trustedDevice: TrustedDevice): TrustedDevice {
  return {
    ...trustedDevice,
    status: DeviceVerificationStatus.VERIFIED,
    verifiedAt: new Date(),
  };
}

/**
 * Mark device as used
 * 
 * @param trustedDevice - Trusted device record
 * @returns Updated trusted device
 */
export function updateTrustedDeviceLastUsed(
  trustedDevice: TrustedDevice
): TrustedDevice {
  return {
    ...trustedDevice,
    lastUsedAt: new Date(),
  };
}

/**
 * Revoke trusted device
 * 
 * @param trustedDevice - Trusted device record
 * @returns Updated trusted device
 */
export function revokeTrustedDevice(trustedDevice: TrustedDevice): TrustedDevice {
  return {
    ...trustedDevice,
    status: DeviceVerificationStatus.REVOKED,
    isRevoked: true,
  };
}

/**
 * Check if device is trusted
 * 
 * @param trustedDevice - Trusted device record
 * @returns true if device is trusted and valid, false otherwise
 */
export function isTrustedDevice(trustedDevice: TrustedDevice): boolean {
  if (trustedDevice.isRevoked) {
    return false;
  }

  if (trustedDevice.status !== DeviceVerificationStatus.VERIFIED) {
    return false;
  }

  if (new Date() > trustedDevice.expiresAt) {
    return false;
  }

  return true;
}

/**
 * Check if device is expired
 * 
 * @param trustedDevice - Trusted device record
 * @returns true if device trust has expired, false otherwise
 */
export function isTrustedDeviceExpired(trustedDevice: TrustedDevice): boolean {
  return new Date() > trustedDevice.expiresAt;
}

/**
 * Get days until device trust expires
 * 
 * @param trustedDevice - Trusted device record
 * @returns Days until expiration (negative if already expired)
 */
export function getDaysUntilDeviceExpiration(
  trustedDevice: TrustedDevice
): number {
  const now = new Date();
  const timeDiff = trustedDevice.expiresAt.getTime() - now.getTime();
  return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
}

/**
 * Should show device trust warning
 * 
 * @param trustedDevice - Trusted device record
 * @param warningDays - Days before expiration to warn (default: 14)
 * @returns true if warning should be shown, false otherwise
 */
export function shouldShowDeviceTrustWarning(
  trustedDevice: TrustedDevice,
  warningDays: number = 14
): boolean {
  const daysUntilExpiration = getDaysUntilDeviceExpiration(trustedDevice);
  return daysUntilExpiration >= 0 && daysUntilExpiration <= warningDays;
}

/**
 * Extend device trust period
 * 
 * @param trustedDevice - Trusted device record
 * @param extensionDays - Days to extend (default: 90)
 * @returns Updated trusted device
 */
export function extendTrustedDeviceTrust(
  trustedDevice: TrustedDevice,
  extensionDays: number = 90
): TrustedDevice {
  const newExpiresAt = new Date(
    trustedDevice.expiresAt.getTime() + extensionDays * 24 * 60 * 60 * 1000
  );

  return {
    ...trustedDevice,
    expiresAt: newExpiresAt,
  };
}

/**
 * Detect suspicious device activity
 * 
 * @param trustedDevice - Trusted device record
 * @param currentDeviceInfo - Current device information
 * @returns Array of detected issues
 */
export async function detectSuspiciousActivity(
  trustedDevice: TrustedDevice,
  currentDeviceInfo: DeviceInfo
): Promise<string[]> {
  const issues: string[] = [];

  // Check fingerprint
  const currentFingerprint = await createDeviceFingerprint(currentDeviceInfo);
  if (currentFingerprint !== trustedDevice.fingerprint) {
    issues.push('Device fingerprint has changed');
  }

  // Check OS
  if (currentDeviceInfo.os !== trustedDevice.deviceInfo.os) {
    issues.push('Operating system has changed');
  }

  // Check browser
  if (currentDeviceInfo.browser !== trustedDevice.deviceInfo.browser) {
    issues.push('Browser has changed');
  }

  // Check screen resolution (only warn if significantly different)
  if (
    currentDeviceInfo.screenResolution !==
    trustedDevice.deviceInfo.screenResolution
  ) {
    issues.push('Screen resolution has changed');
  }

  return issues;
}

/**
 * Check if device requires re-verification
 * 
 * @param trustedDevice - Trusted device record
 * @param currentDeviceInfo - Current device information
 * @returns true if re-verification is needed, false otherwise
 */
export async function requiresDeviceReVerification(
  trustedDevice: TrustedDevice,
  currentDeviceInfo: DeviceInfo
): Promise<boolean> {
  const issues = await detectSuspiciousActivity(trustedDevice, currentDeviceInfo);

  // Require re-verification if critical changes detected
  const criticalChanges = issues.filter(
    (issue) =>
      issue.includes('fingerprint') ||
      issue.includes('Operating system') ||
      issue.includes('Browser')
  );

  return criticalChanges.length > 0;
}

/**
 * Get device info summary
 * 
 * @param deviceInfo - Device information
 * @returns Human-readable device summary
 */
export function getDeviceSummary(deviceInfo: DeviceInfo): string {
  return `${deviceInfo.browser} on ${deviceInfo.os}${
    deviceInfo.isMobile ? ' (Mobile)' : ''
  }`;
}

/**
 * Check WebGL support
 */
function supportsWebGL(): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

/**
 * Check local storage support
 */
function supportsLocalStorage(): boolean {
  try {
    if (typeof localStorage === 'undefined') return false;
    localStorage.setItem('__storage_test__', 'test');
    localStorage.removeItem('__storage_test__');
    return true;
  } catch {
    return false;
  }
}

/**
 * Check session storage support
 */
function supportsSessionStorage(): boolean {
  try {
    if (typeof sessionStorage === 'undefined') return false;
    sessionStorage.setItem('__storage_test__', 'test');
    sessionStorage.removeItem('__storage_test__');
    return true;
  } catch {
    return false;
  }
}

/**
 * Filter devices by status
 * 
 * @param devices - Array of trusted devices
 * @param status - Status to filter by
 * @returns Filtered devices
 */
export function filterDevicesByStatus(
  devices: TrustedDevice[],
  status: DeviceVerificationStatus
): TrustedDevice[] {
  return devices.filter((device) => device.status === status);
}

/**
 * Sort devices by last used
 * 
 * @param devices - Array of trusted devices
 * @returns Sorted devices (most recently used first)
 */
export function sortDevicesByLastUsed(devices: TrustedDevice[]): TrustedDevice[] {
  return [...devices].sort((a, b) => {
    const aTime = a.lastUsedAt?.getTime() ?? 0;
    const bTime = b.lastUsedAt?.getTime() ?? 0;
    return bTime - aTime;
  });
}
