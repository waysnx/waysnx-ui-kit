import type { DiagnosticDedupeConfig, DiagnosticSamplingConfig } from '../types';

/**
 * Client-side sampling and deduplication. Both are configurable; no silent data
 * loss occurs unless explicitly enabled through configuration.
 */

const DEFAULT_DEDUPE_WINDOW_MS = 5000;
const MAX_TRACKED_FINGERPRINTS = 500;

export class Throttle {
  private readonly rate: number;
  private readonly windowMs: number;
  private readonly lastSeen = new Map<string, number>();

  constructor(
    sampling: DiagnosticSamplingConfig = {},
    dedupe: DiagnosticDedupeConfig = {},
  ) {
    const rate = typeof sampling.rate === 'number' ? sampling.rate : 1;
    this.rate = Math.min(1, Math.max(0, rate));
    this.windowMs =
      typeof dedupe.windowMs === 'number' ? dedupe.windowMs : DEFAULT_DEDUPE_WINDOW_MS;
  }

  /** Returns true if the event with this fingerprint should be reported. */
  shouldReport(fingerprint: string, now: number = Date.now()): boolean {
    if (!this.passesSampling()) return false;
    return !this.isDuplicate(fingerprint, now);
  }

  private passesSampling(): boolean {
    if (this.rate >= 1) return true;
    if (this.rate <= 0) return false;
    return Math.random() < this.rate;
  }

  private isDuplicate(fingerprint: string, now: number): boolean {
    if (this.windowMs <= 0) return false;

    const last = this.lastSeen.get(fingerprint);
    if (last !== undefined && now - last < this.windowMs) {
      return true;
    }

    this.lastSeen.set(fingerprint, now);
    this.pruneIfNeeded(now);
    return false;
  }

  /** Bound memory: drop stale/expired entries once the map grows too large. */
  private pruneIfNeeded(now: number): void {
    if (this.lastSeen.size <= MAX_TRACKED_FINGERPRINTS) return;
    for (const [key, ts] of this.lastSeen) {
      if (now - ts >= this.windowMs) {
        this.lastSeen.delete(key);
      }
    }
    // If still too large, drop oldest insertion-order entries.
    while (this.lastSeen.size > MAX_TRACKED_FINGERPRINTS) {
      const oldestKey = this.lastSeen.keys().next().value;
      if (oldestKey === undefined) break;
      this.lastSeen.delete(oldestKey);
    }
  }

  reset(): void {
    this.lastSeen.clear();
  }
}
