import type { DiagnosticRuntimeContext, DiagnosticRouteContext } from '../types';

/**
 * Lightweight runtime/context enrichment. All collection is best-effort and
 * must never throw. No PII is collected here.
 */

/** Derive minimal, non-identifying runtime context from the environment. */
export function collectRuntimeContext(): DiagnosticRuntimeContext | undefined {
  try {
    const nav =
      typeof navigator !== 'undefined'
        ? (navigator as Navigator & { userAgentData?: unknown })
        : undefined;
    if (!nav) return undefined;

    const ua = typeof nav.userAgent === 'string' ? nav.userAgent : '';
    const { browser, browserVersion } = parseBrowser(ua);
    const os = parseOs(ua, nav.platform);

    return {
      browser,
      browserVersion,
      os,
      platform: typeof nav.platform === 'string' ? nav.platform : undefined,
    };
  } catch {
    return undefined;
  }
}

/** Derive the current route/path from the browser location, when available. */
export function collectRouteContext(): DiagnosticRouteContext | undefined {
  try {
    if (typeof location === 'undefined') return undefined;
    // Only the path is collected by default; query/hash may contain PII.
    return { path: typeof location.pathname === 'string' ? location.pathname : undefined };
  } catch {
    return undefined;
  }
}

function parseBrowser(ua: string): { browser?: string; browserVersion?: string } {
  if (!ua) return {};
  const patterns: Array<[string, RegExp]> = [
    ['Edge', /Edg\/([\d.]+)/],
    ['Opera', /OPR\/([\d.]+)/],
    ['Chrome', /Chrome\/([\d.]+)/],
    ['Firefox', /Firefox\/([\d.]+)/],
    ['Safari', /Version\/([\d.]+).*Safari/],
  ];
  for (const [name, re] of patterns) {
    const match = ua.match(re);
    if (match) return { browser: name, browserVersion: match[1] };
  }
  return {};
}

function parseOs(ua: string, platform?: string): string | undefined {
  const haystack = `${ua} ${platform ?? ''}`;
  if (/Windows/i.test(haystack)) return 'Windows';
  if (/Mac OS X|Macintosh/i.test(haystack)) return 'macOS';
  if (/Android/i.test(haystack)) return 'Android';
  if (/iPhone|iPad|iOS/i.test(haystack)) return 'iOS';
  if (/Linux/i.test(haystack)) return 'Linux';
  return undefined;
}
