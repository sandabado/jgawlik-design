# Jesse Gawlik

Next.js App Router portfolio. Phase 1 provides a reversible public pre-launch gate; existing pages and data remain in place. Phase 2 adds a separate reviewer environment on `feature/portfolio-subdomain`, pending content approval before merge or deployment. Future ecosystem routes and cleanup remain deferred.

## Three local development experiences

Use Node 22 in each terminal, matching CI (`nvm use`, or your Node version manager). Run setup once from the repository:

```sh
cd /Users/cougarceleste/Websites/jgawlik-design/jgawlik-design
npm ci
npm run gate:setup
npm run portfolio:setup
```

`gate:setup` creates a cryptographically random 32-byte `PREVIEW_BYPASS_SECRET` in the ignored, owner-readable `.env.local`. It preserves a valid existing secret and existing flags, and prints no secret values. `.env.example` documents the variables. Restart the server after changing environment values.

`portfolio:setup` privately prompts for a reviewer password and confirmation, then saves its hash and a signing key in ignored `.env.portfolio.local`. The password is not printed or stored as plaintext. Setup can be rerun to rotate credentials; it is not required every time you start development.

Start these commands in three separate terminals. Activate Node 22 in each terminal first.

Terminal 1 — public gate:

```sh
cd /Users/cougarceleste/Websites/jgawlik-design/jgawlik-design
npm run dev
```

Terminal 2 — original full site:

```sh
cd /Users/cougarceleste/Websites/jgawlik-design/jgawlik-design
npm run dev:site
```

Terminal 3 — password-protected reviewer portfolio:

```sh
cd /Users/cougarceleste/Websites/jgawlik-design/jgawlik-design
npm run dev:portfolio
```

| Experience | Local URL | Enforced mode |
| --- | --- | --- |
| Public gate | `http://localhost:3000` | `PUBLIC_GATE=true`, `PORTFOLIO_MODE=false` |
| Original full site | `http://localhost:3001` | `PUBLIC_GATE=false`, `PORTFOLIO_MODE=false` |
| Reviewer portfolio | `http://localhost:3002` | `PUBLIC_GATE=true`, `PORTFOLIO_MODE=true` |

The launchers enforce their mode after loading environment values; `dev:portfolio` also loads `.env.portfolio.local`. Ports and hostnames are fixed, and all three servers bind only to loopback. The ungated site on port 3001 is for local review. These commands do not change deployed environments.

Each launcher uses an ignored project wrapper at `.dev/gate`, `.dev/site`, or `.dev/portfolio`. Edit only the repository's normal `src/` and `public/` files. The launcher synchronizes these into disposable generated views so Next's route watcher sees changes and hot-reloads; changes made inside `.dev/` are overwritten. Each wrapper owns its Next build cache, generated TypeScript configuration, and `next-env.d.ts`, preventing simultaneous servers from overwriting each other's generated files. Environment and build-configuration changes require a restart. Production builds still run from the repository root with their existing `.next` or `.next-portfolio` output.

Cookies are scoped to hosts, not ports: `localhost` cookies are shared across these three URLs. The public owner bypass uses `preview_key`; reviewer authentication uses `portfolio_session`. Signing into the portfolio never bypasses the public gate. A valid owner `preview_key` can still bypass the gate on port 3000; remove it or use a clean browser context when verifying the anonymous gate. Use `localhost` consistently rather than switching between it and `127.0.0.1`, which has a separate cookie scope.

- `PUBLIC_GATE=true` enables the deployed gate. Missing or malformed values also enable it.
- `PUBLIC_GATE=false` restores deployed routes with no code removal; use it for an authorized launch. The `dev:site` launcher selects this setting for local review.
- `PREVIEW_BYPASS_SECRET` is server-only: a random base64url value of 43–128 characters. An absent/invalid secret disables bypass access while leaving the gate active. Never prefix it with `NEXT_PUBLIC_`.

The gate launcher uses the same access policy as the deployed public gate. `/`, `/resume`, `/design-system`, other paths, image paths, and API requests are intercepted without a valid owner cookie. Protected pages and APIs also check access on the server as a second boundary. The gate itself is server-rendered, readable without JavaScript, and uses CSS motion that stops for `prefers-reduced-motion`.

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

The three-terminal workflow above runs the reviewer portfolio at `http://localhost:3002`. After initial setup, start it with Node 22:

```sh
cd /Users/cougarceleste/Websites/jgawlik-design/jgawlik-design
npm run dev:portfolio
```

The setup command privately prompts for a 16–256 character password and confirmation. It saves only a salted scrypt hash and a random signing key in ignored, owner-readable `.env.portfolio.local` (mode `0600`), and prints neither. It preserves unrelated settings. Run it again to change the password, then restart the server; changing the hash or signing key invalidates existing sessions. Choose your own password before sharing access; local QA credentials are temporary.

The launcher loads `.env.portfolio.local` and then enforces portfolio mode on port 3002. `npm run dev` enforces the public gate on port 3000; `npm run dev:site` exposes the original full site locally on port 3001. Mode selection never trusts a client-supplied host or forwarding header.

Anonymous visitors see `/portfolio-access`. Successful server-side password verification issues a host-only, HttpOnly, SameSite=Strict cookie valid for eight hours; it is Secure in production and on Vercel, with HTTP permitted only for local development. The owner `preview_key` cannot authenticate reviewers. Login and logout require same-origin POST requests. Failed authentication uses generic copy; oversized bodies, forged/expired sessions, and unavailable configuration are rejected. Every private response uses noindex and private/no-store headers.

After sign-in, `/` serves the portfolio home. Available routes:

- `/portfolio` and `/portfolio/about`
- `/portfolio/case-studies/american-express`
- `/portfolio/case-studies/thermo-fisher`
- `/portfolio/case-studies/tetra`
- `/resume`, including its print stylesheet

Case studies remain in preparation. Their outcome copy uses the owner's approved qualitative observations; no metric placeholders or unverified numeric results are shown. Legacy pages/APIs are excluded from the reviewer environment. `NavigationShell` accepts linear/radial navigation and professional/ethereal appearance props; the future six-pillar ecosystem remains a later phase.

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
