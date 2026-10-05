import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const PUBLIC_APP_ENTRIES = ['/layout', '/coming-soon/page'] as const;
const PORTFOLIO_ACCESS_ENTRIES = ['/layout', '/portfolio-access/page'] as const;
const FONT_PATH = /^\/_next\/static\/media\/[A-Za-z0-9_.-]+\.(?:woff2?|ttf|otf|eot)$/;
const DEV_FRAMEWORK_ASSET = '/_next/static/chunks/app-pages-internals.js';
let productionAssets: ReadonlySet<string> | undefined;
let productionAccessAssets: ReadonlySet<string> | undefined;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((entry) => typeof entry === 'string');
}

function isSafeManifestAsset(asset: string, entries: readonly string[]): boolean {
  if (!/^static\/(?:chunks|css)\/[A-Za-z0-9_./-]+\.(?:js|css)$/.test(asset)) {
    return false;
  }

  if (asset.split('/').some((segment) => segment === '.' || segment === '..')) {
    return false;
  }

  if (asset.includes('hot-update')) return false;

  // Even a malformed dependency list cannot grant a preserved route's bundle.
  if (asset.startsWith('static/chunks/app/')) {
    return entries.some((entry) => {
      const route = entry.slice(1).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return new RegExp(`^static/chunks/app/${route}(?:-[A-Za-z0-9_-]+)?\\.js$`).test(asset);
    });
  }

  return true;
}

function readPublicAssets(entries: readonly string[]): ReadonlySet<string> {
  try {
    const distDirectory = process.env.PORTFOLIO_MODE === 'true' ? '.next-portfolio' : '.next';
    const appManifest: unknown = JSON.parse(
      readFileSync(join(process.cwd(), distDirectory, 'app-build-manifest.json'), 'utf8'),
    );
    const buildManifest: unknown = JSON.parse(
      readFileSync(join(process.cwd(), distDirectory, 'build-manifest.json'), 'utf8'),
    );

    if (
      !isRecord(appManifest) ||
      !isRecord(appManifest.pages) ||
      !isRecord(buildManifest) ||
      !isStringArray(buildManifest.rootMainFiles) ||
      !isStringArray(buildManifest.polyfillFiles)
    ) {
      return new Set();
    }

    const dependencies = [...buildManifest.rootMainFiles, ...buildManifest.polyfillFiles];

    for (const entry of entries) {
      const files = appManifest.pages[entry];
      if (!isStringArray(files)) return new Set();
      dependencies.push(...files);
    }

    return new Set(
      dependencies.filter((asset) => isSafeManifestAsset(asset, entries)).map((asset) => `/_next/${asset}`),
    );
  } catch {
    // A missing, incomplete, or unreadable manifest grants no script access.
    return new Set();
  }
}

/** Permit only the public gate's emitted dependencies, never every Next bundle. */
export function isPublicGateAsset(pathname: string): boolean {
  // Only font formats are public here; this prefix also contains private images.
  if (FONT_PATH.test(pathname)) return true;

  // Development compiles routes lazily and rewrites its manifests on demand.
  if (process.env.NODE_ENV === 'development') {
    // Next's development HTML emits this framework-only chunk outside manifests.
    if (pathname === DEV_FRAMEWORK_ASSET) return true;
    return readPublicAssets(PUBLIC_APP_ENTRIES).has(pathname);
  }

  productionAssets ??= readPublicAssets(PUBLIC_APP_ENTRIES);
  return productionAssets.has(pathname);
}

/** The password form has its own allowlist; preserved portfolio chunks stay private. */
export function isPortfolioAccessAsset(pathname: string): boolean {
  if (FONT_PATH.test(pathname)) return true;
  if (process.env.NODE_ENV === 'development') {
    if (pathname === DEV_FRAMEWORK_ASSET) return true;
    return readPublicAssets(PORTFOLIO_ACCESS_ENTRIES).has(pathname);
  }
  productionAccessAssets ??= readPublicAssets(PORTFOLIO_ACCESS_ENTRIES);
  return productionAccessAssets.has(pathname);
}
