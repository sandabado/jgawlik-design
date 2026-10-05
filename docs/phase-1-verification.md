# Phase 1 release verification

Verified 5 October 2026, 11:25 PDT. Phase 2 and later phases remain held.

## Released state

- Public site: https://www.jessegawlik.com. Apex redirects to this canonical host.
- Vercel deployment: `dpl_Czo2vKithd3YuSfscJ7VXfb6KVgJ`, READY.
- Released source: `6001ee41ee118f3539b848a8e018d2b5228e2e12` on `codex/public-gate`.
- Vercel inspection of `www.jessegawlik.com` resolves to that deployment.
- Deployment metadata confirms Next.js, Node `22.x`, and `npm ci --no-audit --no-fund`.
- `PUBLIC_GATE=true` and a separate sensitive Production bypass secret are configured.
- Source is committed locally; no branch push or merge into `main` was performed. This report is a documentation-only commit after the release.

## Required checklist

| Requirement | Result | Evidence and scope |
| --- | --- | --- |
| Public `/`, `/resume`, `/design-system` serve only gate | PASS | Anonymous HTTPS requests returned 200, exact gate copy, no retained portfolio copy, `noindex` and `no-store`. |
| Owner cookie restores full site | PASS | Production cookie restored all three retained pages; responses remained uncached. No key was printed. |
| Environment flag reverses gate | PASS | Isolated Node 22 production server with `PUBLIC_GATE=false` restored original pages and API. Live gate was kept enabled. |
| Readable without page JavaScript | PASS | Server HTML includes all text. Browser rendered the gate with all page scripts blocked by a temporary CSP fixture. |
| Reduced motion | PASS with tooling scope | Source respects `prefers-reduced-motion`; the existing CSS reduction branch was activated in the QA fixture and computed field motion was `none`. Native OS preference emulation was unavailable. |
| README and environment documentation | PASS | Setup, owner cookie, secret rotation, deployment, launch reversal, SEO tradeoff, `.env.example`, and separate local/Production keys documented. |
| Local parity | PASS | Same middleware/server checks in dev and production. Canonical Node 22 dev server remains at http://localhost:3000. |

## Additional checks

- Node 22.23.3 local production build, ESLint, design-token validation, and TypeScript with repository-local type roots passed. Hosted build also passed compilation, lint and type checks.
- Desktop 1280 px and narrow 390 px browser renders had no horizontal overflow or console errors. Live production render also passed.
- RSC, router prefetch, segment prefetch, invalid cookie, forged middleware-subrequest and forwarded-host headers did not reveal retained content.
- Unknown paths, portrait URLs, and image-optimization requests showed the gate.
- Anonymous POSTs to both existing APIs returned a generic 503 before the retained handlers ran.
- All seven scripts/styles/font preloads emitted by the hosted gate loaded without owner keys or old case-study text.
- A retained homepage bundle loaded for the owner, then returned 404 anonymously and with forged subrequest headers. A subsequent anonymous root request still showed only the gate.
- Independently checked all 25 local production JS/CSS/media assets: nine permitted dependencies returned 200; sixteen excluded assets returned 404. Both manifest files are traced into the Node middleware function.
- Setup handles new, quoted, exported and duplicate dotenv secret assignments; generated secrets are owner-readable and setup prints no values.
- No secret files or key values are committed. No deferred portfolio scaffold is included in the release.

## SEO decision and release limits

`robots.txt` allows crawling so crawlers can observe `noindex` on old URLs. Blanket `Disallow: /` would prevent that observation; neither policy instantly removes search listings or third-party caches. The gate uses 200 with HTML/header noindex, while anonymous API writes use 503. This tradeoff is also recorded in the README review summary.

The release URL retained Vercel SSO protection. Automatic approval review rejected creating a temporary verification token; none was created. The authorized normal production promotion left SSO unchanged, and hosted checks then ran directly against the public custom domain without platform bypass.

Dependency audit remains pending user approval. Original content defects and all subsequent phases remain deferred. Gate removal requires `PUBLIC_GATE=false` and a new deployment; original content and routes remain in the repository.
