# Phase 2 verification — 5 October 2026

Phase 1 is pushed and merged on `main` at `af13bd06e8ee8be814f0e866f7e4d6c41783bde4`. The remote `codex/public-gate` branch is retained. GitHub's actual `validate` check passed on this merge; that job runs Node 22 installation, token validation, lint and build. Main protection requires `validate`, with strict/up-to-date checking and administrator enforcement disabled. [Verified CI run](https://github.com/sandabado/jgawlik-design/actions/runs/37358716649/job/111927614904).

Phase 2 remains on `feature/portfolio-subdomain`, **unmerged and undeployed**. The dependency fixes below are therefore not yet in `main` or Production. No portfolio project, domain attachment or hosted Redis store was provisioned in this phase.

## Implemented boundaries

- One codebase, separate deployment configuration: `PORTFOLIO_MODE=true` selects the reviewer environment before the public-gate flag is evaluated. Host and forwarded headers cannot select this mode. `.next-portfolio` separates its build/dev output from the public site's `.next` directory.
- Middleware and protected page guards enforce portfolio access. Authenticated reviewers can view the portfolio home, about page, résumé and three case-study scaffolds; retained legacy pages/APIs remain excluded. The public owner cookie and portfolio session are independent.
- `PORTFOLIO_ACCESS_HASH` stores a salted native-scrypt verifier, using fixed `N=32768`, `r=8`, `p=3` parameters. An independent random `PORTFOLIO_SESSION_SECRET` signs eight-hour host-only cookies. Cookie validation rejects malformed, altered, future-issued and expired tokens; changing either secret or the password verifier revokes existing sessions.
- Cookies use HttpOnly, SameSite=Strict and Secure for production/hosted HTTPS. Development HTTP is the explicit Secure-cookie exception. Login/logout require same-origin POST; login accepts bounded form data, uses fixed internal redirects and returns generic failures. Passwords are absent from committed files and client bundles.
- Anonymous requests can fetch only the password form's emitted framework/layout/form assets and fonts. Private route chunks, images and image optimization remain inaccessible. Protected responses carry `noindex` and private/no-store headers.
- The hidden-password setup script writes only the verifier and signing secret to ignored `.env.portfolio.local`, with permissions `0600`; it never prints or persists the plaintext password.

## Verification and limits

| Check | Result and scope |
| --- | --- |
| Backend/setup checks | **23 passed:** correct/wrong password, session tampering/expiry/rotation, environment separation, CSRF and input bounds, concurrent rate limits, persistence, secret-free setup and shared-store failure behavior. |
| Isolated production HTTP checks | **49 passed:** 19 public-mode and 30 portfolio-mode checks across page access, cookie separation, private assets, headers, denied origins, authenticated route scope and logout. Protected page checks used a signed session fixture. |
| Production builds | **Both passed** on Node 22.23.3, using separate public/portfolio output directories. Required middleware manifests were traced into each build. Anonymous asset scans found no tested private copy or secret identifiers. |
| Static quality | ESLint, TypeScript with repository-local type roots, token validation and whitespace checks passed. |
| Independent integration review | Anonymous RSC/prefetch, forged middleware/Host headers, invalid cookies and private image requests remained protected. Cookie separation and authenticated route scope passed. Identified framework-asset and legacy-guard issues were corrected and rechecked. |

Rate limiting permits five attempts per IP and 60 aggregate attempts per 15 minutes, before password derivation. Stored IP identifiers are HMAC digests. Development uses an atomic, persisted filesystem counter, verified with 20 concurrent calls and eight independent processes. Hosted sign-in requires an atomic Upstash Redis REST store; missing, malformed or unavailable configuration denies sign-in with a generic HTTP 503. No in-memory or filesystem fallback is permitted there.

The Redis REST adapter was tested using synthetic responses. **Actual hosted Redis concurrency and hosted password login remain unverified.** The isolated production test intentionally confirmed denial without a shared store; its signed session fixture does not constitute successful production password authentication. Local parity covers the access policy, hashing, sessions and limiter rules; storage differs explicitly between development and hosted environments.

Temporary local evidence: `/private/tmp/jgawlik-phase2-auth-verification/{backend-results,setup-and-shared-results,integration-review,cross-environment}.json` and `/private/tmp/jgawlik-phase2-build.4MmjZz/{http-report,artifact-report,public-exit,portfolio-exit}.json`. These workstation artifacts are not committed fixtures or hosted-provider evidence.

## Content and résumé print scope

The three protected scaffolds are `/portfolio/case-studies/american-express`, `/portfolio/case-studies/thermo-fisher` and `/portfolio/case-studies/tetra`; supporting routes are `/portfolio` and `/portfolio/about`. `NavigationShell` exposes linear/radial and professional/ethereal configuration. Final case-study narratives remain pending approval.

The owner rulings of 5 October 2026 supersede the earlier provisional alignment. Persona document/OG titles and the homepage retain Agentic Systems Architect; the résumé uses Product Designer & Agentic Systems Architect and keywords include both Product Designer and Systems Architect. Employer-confirmed titles remain unchanged and Amex is current. Brand Buddha begins in 2017 (timeline label 2017–2018; résumé 2017–October 2019). Whole Body founding in 2025 is distinguished from platform launch and the agentic phase beginning in 2026. Month-level Amex/Thermo résumé dates remain authoritative; selected-history coverage is deliberate.

Visible metric markers are replaced by owner-approved qualitative observations and active-development language. Unsupported encryption, audience counts, release prices and categorical deployment/novelty assertions are removed or narrowed. Manual I links to its public preview on Whole Body Press; Manuals II–V remain on editorial hold. Records catalog status is separate from an individual album's release. See the [Rulings Applied appendix](content-reconciliation.md#rulings-applied--5-october-2026) for every inventory-row resolution, evidence and the single remaining open item: credentials. These are owner-approved content statements, not independently measured results.

Authenticated `/resume` HTML and its captured print CSS produced three US Letter pages through WeasyPrint 70.0. All pages were rasterized and visually reviewed: white background, readable content, whole job/publication blocks, and no clipped text, overlap, blank pages or orphaned headings. Extracted text confirmed the reconciled dates/current Amex wording and pending metrics; navigation/print controls were absent. **Native browser print-dialog export remains unverified.** Evidence is under `/private/tmp/jgawlik-phase2-verification/`, including `resume-pdf-verification.json`, `resume-pdf-review.md` and the rendered PDF/pages.

That PDF evidence predates the owner rulings above and does not verify the revised résumé copy. The current content pass verifies the updated résumé in the browser on both local experiences; no new native print export is claimed.

## Dependency audit

The updated Phase 2 lockfile reports **zero runtime vulnerabilities** with `npm audit --omit=dev`. The full audit reports **five high development/lint dependency findings**, all tracing to the same unpatched [braces stack-exhaustion advisory, GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm): `braces`, `micromatch`, `fast-glob`, `@next/eslint-plugin-next` and `eslint-config-next`.

Runtime fixes include Next 15.5.27 and a PostCSS 8.5.29 override. The remaining advisory is retained explicitly; npm's suggested forced change downgrades `eslint-config-next` to 14.2.35 rather than supplying a braces patch, so it was not applied. Do not feed untrusted glob patterns into the affected lint tooling. Audit evidence: `/private/tmp/jgawlik-phase2-audit-after.json` and `/private/tmp/jgawlik-phase2-audit-production.json`. These fixes require a separately approved merge/release before they affect Production.
