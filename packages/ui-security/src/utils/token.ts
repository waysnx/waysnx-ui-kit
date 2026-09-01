/**
 * @file utils/token.ts
 * JWT and token utilities
 */

/**
 * JWT payload interface
 */
export interface JWTPayload {
  sub?: string;
  iat?: number;
  exp?: number;
  aud?: string;
  iss?: string;
  [key: string]: any;
}

/**
 * Decode JWT token (without verification)
 */
export function decodeJWT(token: string): JWTPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }

    const payload = parts[1];
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decoded);
  } catch (error) {
    console.error('Failed to decode JWT:', error);
    return null;
  }
}

/**
 * Check if JWT token is expired
 */
export function isTokenExpired(token: string, bufferSeconds: number = 0): boolean {
  const payload = decodeJWT(token);
  if (!payload || !payload.exp) {
    return true;
  }

  const expirationTime = payload.exp * 1000;
  const currentTime = Date.now();
  const buffer = bufferSeconds * 1000;

  return currentTime > expirationTime - buffer;
}

/**
 * Get time until token expiration in seconds
 */
export function getTokenExpirationTime(token: string): number | null {
  const payload = decodeJWT(token);
  if (!payload || !payload.exp) {
    return null;
  }

  const expirationTime = payload.exp * 1000;
  const currentTime = Date.now();
  const secondsRemaining = Math.floor((expirationTime - currentTime) / 1000);

  return Math.max(0, secondsRemaining);
}

/**
 * Extract JWT claims
 */
export function getJWTClaims(token: string): JWTPayload | null {
  return decodeJWT(token);
}

/**
 * Get user ID from JWT token
 */
export function getUserIdFromToken(token: string): string | null {
  const payload = decodeJWT(token);
  return payload?.sub || payload?.user_id || payload?.userId || null;
}

/**
 * Check if token is about to expire (within threshold)
 */
export function shouldRefreshToken(token: string, thresholdSeconds: number = 300): boolean {
  const expirationTime = getTokenExpirationTime(token);
  if (expirationTime === null) {
    return true;
  }

  return expirationTime < thresholdSeconds;
}

/**
 * Format token for display (masked)
 */
export function formatTokenForDisplay(token: string, visibleChars: number = 10): string {
  if (token.length <= visibleChars) {
    return token;
  }

  const start = token.substring(0, visibleChars / 2);
  const end = token.substring(token.length - visibleChars / 2);
  const masked = '*'.repeat(token.length - visibleChars);

  return `${start}${masked}${end}`;
}
