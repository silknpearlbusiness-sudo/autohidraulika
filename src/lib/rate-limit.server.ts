// Simple in-memory, per-key sliding-window rate limiter for serverless
// handlers. Bounded so it can't grow unbounded across the life of an instance.

const buckets = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(key: string, max: number, windowMs: number): boolean {
  if (buckets.size > 5000) buckets.clear();
  const now = Date.now();
  let rec = buckets.get(key);
  if (!rec || now > rec.resetAt) {
    rec = { count: 0, resetAt: now + windowMs };
    buckets.set(key, rec);
  }
  rec.count++;
  return rec.count <= max;
}
