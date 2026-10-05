# Jesse Gawlik

Next.js App Router portfolio. Phase 1 provides a reversible public pre-launch gate; existing pages and data remain in place. Phase 2 adds a separate reviewer environment on `feature/portfolio-subdomain`, pending content approval before merge or deployment. Future ecosystem routes and cleanup remain deferred.

## Local gate

Use Node 22, matching CI (`nvm use`, or your Node version manager). Then:

```sh
npm ci
npm run gate:setup
npm run dev
```

`gate:setup` creates a cryptographically random 32-byte `PREVIEW_BYPASS_SECRET` in the ignored, owner-readable `.env.local`. It preserves a valid existing secret and existing flags, and prints no secret values. `.env.example` documents the variables. Restart the server after changing environment values.

- `PUBLIC_GATE=true` enables the gate. Missing or malformed values also enable it.
- `PUBLIC_GATE=false` restores the existing routes with no code removal. Do this only at an authorized launch.
- `PREVIEW_BYPASS_SECRET` is server-only: a random base64url value of 43–128 characters. An absent/invalid secret disables bypass access while leaving the gate active. Never prefix it with `NEXT_PUBLIC_`.

The policy is identical in development and production. `/`, `/resume`, `/design-system`, other paths, image paths, and API requests are intercepted without a valid owner cookie. Protected pages and APIs also check access on the server as a second boundary. The gate itself is server-rendered, readable without JavaScript, and uses CSS motion that stops for `prefers-reduced-motion`.

## Owner bypass cookie

Privately copy the local secret from `.env.local`. The Phase 1 Production release uses a separate key retained in ignored, owner-readable `.env.production.local` and saved as a sensitive Vercel Production variable. In the browser's developer tools, add a cookie for the exact site host:

| Field | Value |
| --- | --- |
| Name | `preview_key` |
| Value | Your `PREVIEW_BYPASS_SECRET` |
| Path | `/` |
| Domain | Exact current host; do not share across subdomains |
| HttpOnly | Enabled |
| Secure | Enabled on HTTPS; disabled only for local HTTP testing |
| SameSite | Strict |
| Expiration | Session, or a short owner-selected expiration |

Reload the original route. Production's canonical host is `www.jessegawlik.com`; set the cookie there after the apex redirect. Delete the cookie to return to the gate. Rotating the environment secret invalidates prior bypass cookies. Do not paste secrets into chat, URLs, screenshots, source files, or shell history. This is a private owner bypass, not reviewer authentication.

## Deployment and reversibility

In the existing Vercel project's Production environment, set `PUBLIC_GATE=true` and the server-only `PREVIEW_BYPASS_SECRET` using Vercel's sensitive environment-variable entry. Deploy the reviewed Phase 1 code, then verify the real domain without cookies and with the owner cookie. Environment changes need a new deployment. Preview and Development environments should receive their own secrets; do not reuse the owner Production key unnecessarily.

At launch, change `PUBLIC_GATE=false`, redeploy, and verify the intended replacement before restoring indexing. No original content is deleted. Leave `PORTFOLIO_MODE=false` on the public project; the reviewer environment described below belongs to a separate project.

## SEO and asset exception tradeoff

Gated page responses use HTTP 200 with HTML `noindex` and `X-Robots-Tag: noindex, nofollow, noarchive`, plus private/no-store cache headers. Non-GET API requests receive a generic HTTP 503 response. Metadata contains only the gate's copy while the gate is active. The retained site can be restored with the flag.

`robots.txt` deliberately allows crawling. A blanket `Disallow: /` would stop crawlers from observing `noindex` on previously indexed URLs; it is not an access-control mechanism. Search engines may take time to remove old listings and third-party caches. Gate off restores the former metadata; broader relaunch SEO belongs to the later phase.

The brief's `_next/*` exception is narrowed to the emitted gate/layout/runtime dependencies and fonts. Preserved client bundles contain old portfolio text, so allowing every Next asset would leak it. Middleware reads Next's build manifests; `next.config.ts` traces those files into the Node middleware function. Missing manifests deny script access. Original route chunks, source maps, image optimization and portrait assets require owner bypass. In dev, only the development hot-reload endpoint has an additional exception.

## Phase 1 review summary

- Exact gate copy, existing brand mark/fonts/palette, optional ambient decoration, no blocking loader.
- Environment flag and constant-time server cookie comparison; no secrets in committed code or client bundles.
- All routes covered, plus page/API checks and private-asset filtering.
- Robots allows crawlers to read `noindex`; explicit tradeoff above.
- `.nvmrc` and package engines pin Node 22, matching CI. The audit's inherited workstation `@types` issue is separate from the Node version; this phase does not repair that unrelated environment.
- Phase 1 was subsequently merged and pushed to `main`; GitHub protection requires the real `validate` CI check (token validation, lint, and build).

## Phase 1 local verification — 5 October 2026

Node 22.23.3 production build, ESLint, token validation, and TypeScript with repository-local type roots passed. Public requests to `/`, `/resume`, and `/design-system` return only the gate. Owner-cookie requests restore the retained pages, and an isolated `PUBLIC_GATE=false` production server restores the former site. RSC/prefetch and forged middleware headers remain gated; retained route bundles return 404 anonymously. The gate's emitted scripts contain neither the secret nor the original case-study copy.

Browser checks passed at 1280 px and 390 px with no horizontal overflow or console errors. A temporary QA proxy blocked all page scripts using CSP and confirmed readable content. The same fixture activated the existing reduced-motion CSS branch and confirmed `animation-name: none`; native OS preference emulation was unavailable in the browser tooling. The QA proxy is outside the application and is not deployed.

This section records Phase 1 acceptance. The subsequently authorized Phase 2 dependency audit and repairs are described below.

The released deployment and complete checklist are recorded in [Phase 1 verification](docs/phase-1-verification.md).

## Reviewer portfolio — Phase 2

Use the same codebase in a separate Vercel project. This reuses the fonts, design tokens, and resume without introducing a second app or changing the public project's access policy. It also means both deployments contain the retained source; middleware, server guards, and private asset filtering enforce which surfaces can be served. Keep environment variables and domains separate.

For local development with Node 22:

```sh
npm run portfolio:setup
npm run dev:portfolio
```

The setup command privately prompts for a 16–256 character password and confirmation. It saves only a salted scrypt hash and a random signing key in ignored, owner-readable `.env.portfolio.local` (mode `0600`), and prints neither. It preserves unrelated settings. Run it again to change the password, then restart the server; changing the hash or signing key invalidates existing sessions. Choose your own password before sharing access; local QA credentials are temporary.

The portfolio runs at `http://localhost:3001`; `npm run dev` continues to run the public gate at `http://localhost:3000`. The two modes use separate build directories so they can run together. You can also load `.env.portfolio.local` into your process environment and use the ordinary `npm run dev` command on a chosen port. The mode is selected by environment configuration, never by a client-supplied host/header.

Anonymous visitors see `/portfolio-access`. Successful server-side password verification issues a host-only, HttpOnly, SameSite=Strict cookie valid for eight hours; it is Secure in production and on Vercel, with HTTP permitted only for local development. The owner `preview_key` cannot authenticate reviewers. Login and logout require same-origin POST requests. Failed authentication uses generic copy; oversized bodies, forged/expired sessions, and unavailable configuration are rejected. Every private response uses noindex and private/no-store headers.

After sign-in, `/` serves the portfolio home. Available routes:

- `/portfolio` and `/portfolio/about`
- `/portfolio/case-studies/american-express`
- `/portfolio/case-studies/thermo-fisher`
- `/portfolio/case-studies/tetra`
- `/resume`, including its print stylesheet

Case studies contain explicit preparation placeholders and `[METRIC — PENDING]` markers. Legacy pages/APIs are excluded from the reviewer environment. `NavigationShell` accepts linear/radial navigation and professional/ethereal appearance props; the future six-pillar ecosystem remains a later phase.

### Hosted portfolio configuration

After content approval, create the separate Vercel project from the approved branch/commit and configure its build and runtime environments:

| Variable | Value / purpose |
| --- | --- |
| `PORTFOLIO_MODE` | `true` in the reviewer project only |
| `PUBLIC_GATE` | `true`; turning it off does not bypass reviewer authentication |
| `PORTFOLIO_ACCESS_HASH` | Hash generated by `portfolio:setup`; copy privately into a sensitive environment variable |
| `PORTFOLIO_SESSION_SECRET` | Independent random signing key generated by setup; sensitive environment variable |
| `UPSTASH_REDIS_REST_URL` | HTTPS REST endpoint for a shared Redis store |
| `UPSTASH_REDIS_REST_TOKEN` | Sensitive Redis access token |

No `PREVIEW_BYPASS_SECRET` is needed in the reviewer project. Do not reuse the public owner key. Environment changes require a new deployment. Attach `portfolio.jessegawlik.com` to this separate project in the Vercel dashboard; this is the owner-managed domain step. Neither the project nor its Redis store/domain has been provisioned by Phase 2 local implementation.

Rate limits allow five sign-in attempts per IP and sixty overall per fifteen minutes, including successful attempts. Hosted counters use an atomic Redis operation and survive instance changes. Missing or unavailable Redis denies sign-in with a generic 503; there is no in-memory production fallback. Local dev uses an atomically locked, persisted `0600` file with one shared local bucket, so spoofed forwarding headers cannot reset attempts. `PORTFOLIO_RATE_LIMIT_FILE` optionally selects an absolute local path. Supplying the same Redis variables locally exercises the hosted adapter.

The public launch switch remains `PUBLIC_GATE=false` on the public project. Keep `PORTFOLIO_MODE=true` on the reviewer project for as long as reviewer authentication is required.

### Phase 2 verification and dependency audit — 5 October 2026

Both public and portfolio production builds passed under Node 22.23.3. Backend/security checks, 49 isolated production HTTP checks, and desktop/390 px browser checks passed. The resume was rendered from authenticated application HTML and print CSS into a three-page Letter PDF; all pages were visually reviewed. Native browser print-dialog export remains unverified. See [Phase 2 verification](docs/phase-2-verification.md) for boundaries and evidence.

The initial npm audit found one critical and ten high advisories. Compatible updates and a PostCSS `8.5.29` override removed all runtime advisories: `npm audit --omit=dev` reports zero. Full `npm audit` still reports five high entries from one unpatched lint dependency chain (`eslint-config-next` → Next ESLint plugin → fast-glob → micromatch → braces). The [braces advisory](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) lists no patched version. No audit suppression was added; npm's proposed forced Next ESLint downgrade was rejected because it would mismatch the framework. These dependency fixes are on the Phase 2 branch, and have not yet reached `main` or Production.
