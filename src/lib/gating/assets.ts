import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const PUBLIC_APP_ENTRIES = ['/layout', '/coming-soon/page'] as const;
const FONT_PATH = /^\/_next\/static\/media\/[A-Za-z0-9_.-]+\.(?:woff2?|ttf|otf|eot)$/;
let productionAssets: ReadonlySet<string> | undefined;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((entry) => typeof entry === 'string');
}

function isSafeManifestAsset(asset: string): boolean {
  if (!/^static\/(?:chunks|css)\/[A-Za-z0-9_./-]+\.(?:js|css)$/.test(asset)) {
    return false;
  }

  if (asset.split('/').some((segment) => segment === '.' || segment === '..')) {
    return false;
  }

  if (asset.includes('hot-update')) return false;

  // Even a malformed dependency list cannot grant a preserved route's bundle.
  if (asset.startsWith('static/chunks/app/')) {
    return /^static\/chunks\/app\/(?:layout(?:-[A-Za-z0-9_-]+)?|coming-soon\/page(?:-[A-Za-z0-9_-]+)?)\.js$/.test(asset);
  }

  return true;
}

function readPublicAssets(): ReadonlySet<string> {
  try {
    const appManifest: unknown = JSON.parse(
      readFileSync(join(process.cwd(), '.next', 'app-build-manifest.json'), 'utf8'),
    );
    const buildManifest: unknown = JSON.parse(
      readFileSync(join(process.cwd(), '.next', 'build-manifest.json'), 'utf8'),
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

    for (const entry of PUBLIC_APP_ENTRIES) {
      const files = appManifest.pages[entry];
      if (!isStringArray(files)) return new Set();
      dependencies.push(...files);
    }

    return new Set(
      dependencies.filter(isSafeManifestAsset).map((asset) => `/_next/${asset}`),
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
    return readPublicAssets().has(pathname);
  }

  productionAssets ??= readPublicAssets();
  return productionAssets.has(pathname);
}
