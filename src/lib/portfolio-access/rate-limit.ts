import 'server-only';
import { createHash, createHmac, randomUUID } from 'node:crypto';
import { mkdir, open, readFile, rename, stat, unlink } from 'node:fs/promises';
import { isIP } from 'node:net';
import { tmpdir } from 'node:os';
import { dirname, isAbsolute, join } from 'node:path';
import { portfolioAccessConfiguration } from './session';

const WINDOW_MS = 15 * 60 * 1000;
const IP_LIMIT = 5;
const GLOBAL_LIMIT = 60;
type LimitResult = { allowed: boolean; retryAfter: number };
type Entry = { count: number; resetAt: number };
type LocalState = { version: 1; entries: Record<string, Entry> };

const SCRIPT = `
local ip = tonumber(redis.call('GET', KEYS[1]) or '0')
local total = tonumber(redis.call('GET', KEYS[2]) or '0')
if ip >= tonumber(ARGV[2]) or total >= tonumber(ARGV[3]) then
  local wait = 0
  if ip >= tonumber(ARGV[2]) then wait = math.max(wait, redis.call('PTTL', KEYS[1])) end
  if total >= tonumber(ARGV[3]) then wait = math.max(wait, redis.call('PTTL', KEYS[2])) end
  return {0, math.max(wait, 1)}
end
if redis.call('INCR', KEYS[1]) == 1 then redis.call('PEXPIRE', KEYS[1], ARGV[1]) end
if redis.call('INCR', KEYS[2]) == 1 then redis.call('PEXPIRE', KEYS[2], ARGV[1]) end
return {1, 0}
`;

function unavailable(): Error { return new Error('Portfolio access is unavailable.'); }

function keys(request: Request): [string, string] {
  const configuration = portfolioAccessConfiguration();
  if (!configuration) throw unavailable();
  // Trust provider headers only inside Vercel. Local clients cannot choose buckets.
  const header = process.env.VERCEL === '1' ? request.headers.get('x-vercel-forwarded-for')?.trim() : undefined;
  const identity = header && isIP(header) ? header : 'shared-local-or-unknown';
  const scope = createHash('sha256').update(configuration.hash).digest('hex').slice(0, 16);
  const digest = createHmac('sha256', configuration.secret).update(`portfolio-rate-limit:v1\0${identity}`).digest('hex');
  return [`portfolio-access:${scope}:ip:${digest}`, `portfolio-access:${scope}:global`];
}

async function sharedLimit(endpoint: string, token: string, bucketKeys: [string, string]): Promise<LimitResult> {
  const url = new URL(endpoint);
  const localHttp = process.env.NODE_ENV === 'development' && process.env.VERCEL !== '1' && url.protocol === 'http:' && (url.hostname === 'localhost' || url.hostname === '127.0.0.1' || url.hostname === '[::1]');
  if ((!localHttp && url.protocol !== 'https:') || url.username || url.password || url.search || url.hash || (url.pathname !== '/' && url.pathname !== '')) throw unavailable();
  const response = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(['EVAL', SCRIPT, '2', ...bucketKeys, String(WINDOW_MS), String(IP_LIMIT), String(GLOBAL_LIMIT)]),
    cache: 'no-store',
    signal: AbortSignal.timeout(3000),
  });
  if (!response.ok) throw unavailable();
  const data: unknown = await response.json();
  if (typeof data !== 'object' || data === null || !('result' in data) || !Array.isArray(data.result) || data.result.length !== 2) throw unavailable();
  const [allowed, milliseconds] = data.result;
  if ((allowed !== 0 && allowed !== 1) || !Number.isSafeInteger(milliseconds) || milliseconds < 0 || milliseconds > WINDOW_MS) throw unavailable();
  return { allowed: allowed === 1, retryAfter: Math.max(1, Math.ceil(milliseconds / 1000)) };
}

function parseState(text: string): LocalState {
  const data: unknown = JSON.parse(text);
  if (typeof data !== 'object' || data === null || !('version' in data) || data.version !== 1 || !('entries' in data) || typeof data.entries !== 'object' || data.entries === null || Array.isArray(data.entries)) throw unavailable();
  const entries: Record<string, Entry> = Object.create(null);
  const candidates = Object.entries(data.entries);
  if (candidates.length > 2000) throw unavailable();
  for (const [key, value] of candidates) {
    if (!key.startsWith('portfolio-access:') || typeof value !== 'object' || value === null || !('count' in value) || !('resetAt' in value) || typeof value.count !== 'number' || typeof value.resetAt !== 'number' || !Number.isSafeInteger(value.count) || value.count < 0 || !Number.isSafeInteger(value.resetAt)) throw unavailable();
    entries[key] = { count: value.count, resetAt: value.resetAt };
  }
  return { version: 1, entries };
}

async function localLimit(bucketKeys: [string, string]): Promise<LimitResult> {
  const override = process.env.PORTFOLIO_RATE_LIMIT_FILE;
  if (override && !isAbsolute(override)) throw unavailable();
  const identifier = createHash('sha256').update(process.cwd()).digest('hex').slice(0, 16);
  const file = override || join(tmpdir(), 'jgawlik-portfolio-rate-limit', `${identifier}.json`);
  await mkdir(dirname(file), { recursive: true, mode: 0o700 });
  const lockPath = `${file}.lock`;
  const deadline = Date.now() + 3000;
  let lock;
  while (!lock) {
    try { lock = await open(lockPath, 'wx', 0o600); }
    catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'EEXIST' || Date.now() >= deadline) throw unavailable();
      try {
        if (Date.now() - (await stat(lockPath)).mtimeMs > 30000) await unlink(lockPath);
      } catch (failure) { if ((failure as NodeJS.ErrnoException).code !== 'ENOENT') throw unavailable(); }
      await new Promise((resolve) => setTimeout(resolve, 15));
    }
  }
  let temporary: string | undefined;
  try {
    let state: LocalState;
    try { state = parseState(await readFile(file, 'utf8')); }
    catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw unavailable();
      state = { version: 1, entries: Object.create(null) };
    }
    const now = Date.now();
    for (const [key, entry] of Object.entries(state.entries)) if (entry.resetAt <= now) delete state.entries[key];
    const limits = [IP_LIMIT, GLOBAL_LIMIT];
    let wait = 0;
    bucketKeys.forEach((key, index) => {
      const entry = state.entries[key];
      if (entry && entry.count >= limits[index]) wait = Math.max(wait, entry.resetAt - now);
    });
    if (wait > 0) return { allowed: false, retryAfter: Math.max(1, Math.ceil(wait / 1000)) };
    for (const key of bucketKeys) {
      const entry = state.entries[key] ?? { count: 0, resetAt: now + WINDOW_MS };
      state.entries[key] = { ...entry, count: entry.count + 1 };
    }
    temporary = `${file}.${randomUUID()}.tmp`;
    const writer = await open(temporary, 'wx', 0o600);
    try { await writer.writeFile(JSON.stringify(state)); }
    finally { await writer.close(); }
    await rename(temporary, file);
    temporary = undefined;
    return { allowed: true, retryAfter: 1 };
  } finally {
    if (temporary) await unlink(temporary).catch(() => undefined);
    await lock.close();
    await unlink(lockPath).catch(() => undefined);
  }
}

export async function consumePortfolioAttempt(request: Request): Promise<LimitResult> {
  const bucketKeys = keys(request);
  const endpoint = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (endpoint && token) return sharedLimit(endpoint, token, bucketKeys);
  if (endpoint || token || process.env.VERCEL === '1' || process.env.NODE_ENV !== 'development') throw unavailable();
  return localLimit(bucketKeys);
}
