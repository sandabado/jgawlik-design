# Jesse Gawlik

Next.js App Router portfolio. Phase 1 adds a reversible public pre-launch gate; existing portfolio pages and data remain in place. The portfolio subdomain, content repairs, future ecosystem routes, and parking-lot work are deferred.

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

At launch, change `PUBLIC_GATE=false`, redeploy, and verify the intended replacement before restoring indexing. No original content is deleted by Phase 1. No new portfolio project or subdomain is created in this phase.

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
- Subsequent phases remain held for a separate user instruction after Phase 1 verification is reported.

## Phase 1 local verification — 5 October 2026

Node 22.23.3 production build, ESLint, token validation, and TypeScript with repository-local type roots passed. Public requests to `/`, `/resume`, and `/design-system` return only the gate. Owner-cookie requests restore the retained pages, and an isolated `PUBLIC_GATE=false` production server restores the former site. RSC/prefetch and forged middleware headers remain gated; retained route bundles return 404 anonymously. The gate's emitted scripts contain neither the secret nor the original case-study copy.

Browser checks passed at 1280 px and 390 px with no horizontal overflow or console errors. A temporary QA proxy blocked all page scripts using CSP and confirmed readable content. The same fixture activated the existing reduced-motion CSS branch and confirmed `animation-name: none`; native OS preference emulation was unavailable in the browser tooling. The QA proxy is outside the application and is not deployed.

Dependency audit remains pending user approval. Installation uses `--no-audit`; subsequent phases and audit repairs are deferred.

The released deployment and complete checklist are recorded in [Phase 1 verification](docs/phase-1-verification.md).
