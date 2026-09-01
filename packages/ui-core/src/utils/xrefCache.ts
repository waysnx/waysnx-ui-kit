/**
 * In-memory cache for x-xref API responses.
 * Caches the Promise itself so simultaneous calls to the same URL share one request.
 */
const cache = new Map<string, Promise<any[]>>();

/**
 * Returns cached options or calls fetchFn and caches the result.
 */
export function getCachedOptions(
  url: string,
  fetchFn: (url: string) => Promise<any[]>,
): Promise<any[]> {
  const cached = cache.get(url);
  if (cached) return cached;

  const promise = fetchFn(url).catch((err) => {
    // Remove from cache on failure so it can be retried
    cache.delete(url);
    throw err;
  });

  cache.set(url, promise);
  return promise;
}

/**
 * Clear cached options. Pass a URL to clear one entry, or omit to clear all.
 */
export function clearXrefCache(url?: string): void {
  if (url) {
    cache.delete(url);
  } else {
    cache.clear();
  }
}
