# Three-server development verification — 5 October 2026

This change stays on `feature/portfolio-subdomain`. It changes local launchers and development isolation; the deployed public gate, production environment values and portfolio credentials are unchanged.

| Command | Port | Policy | Generated project / cache |
| --- | --- | --- | --- |
| `npm run dev` | 3000 | Public gate, owner bypass only | `.dev/gate/.next` |
| `npm run dev:site` | 3001 | Retained original site, ungated | `.dev/site/.next` |
| `npm run dev:portfolio` | 3002 | Reviewer password and signed session | `.dev/portfolio/.next-portfolio` |

All listeners bind to `127.0.0.1`. A port availability check rejects occupied fixed ports with a nonzero exit. Each launcher loads the root development environment, loads the private portfolio file only when appropriate, then enforces its own mode flags. Generated source views synchronize from the canonical `src/` and `public/` folders; edit those canonical folders, not `.dev/`. Environment and build-config changes require a restart.

Next 15's route watcher does not discover a directory-symlink source view. It also writes `next-env.d.ts` in the project root. Separate generated project roots with synchronized physical files solve both issues without modifying Next internals. Each root has its own TypeScript config, route declarations, incremental state and webpack cache. Production build paths remain `.next` and `.next-portfolio` in the repository root.

## Results

| Verification | Result |
| --- | --- |
| Three home pages | **Pass:** public Coming Soon, original full homepage, authenticated portfolio render concurrently. |
| Original `/resume` and `/design-system` | **Pass:** both load on 3001 without password or owner bypass. Existing design-system styling/API limitations remain outside this change. |
| Protected portfolio routes | **Pass:** existing owner-selected password session survives the port move; home, about, three cases and resume render without an error overlay. |
| Anonymous HTTP | **44 checks passed:** retained paths stay gated on 3000, reviewer paths redirect on 3002, anonymous private chunks remain denied, emitted public dependencies load, and mode-specific POST responses match policy. |
| Wrong-password login | **Pass:** same-origin incorrect password redirects to the generic error state and issues no session cookie. |
| Hot reload | **Pass on all three:** temporary shared CSS and server-layout probes changed in already-open browser tabs without manual reload, then disappeared automatically when restored. Gate updates may use Next's automatic full reload. No test probes remain in source. |
| Cache / generated-file isolation | **14 checks passed:** distinct output/type/incremental paths; no sibling generated types; tracked bootstrap/config and private environment files remain checksum-identical after startup and live edits. |
| Source synchronization | **11 checks passed:** updates, additions, deletions, directory moves, file/directory conversions and atomic replacements; unexpected destination links are rejected safely. |
| Static quality | **Pass:** ESLint, repository-local TypeScript, design-token validation and whitespace checks. |
| Browser console | **Pass:** no captured errors across the three verified tabs. |
| Clean private/incognito browser | **Pass, owner verified:** 3000 `/resume` shows only Coming Soon with no content leakage; 3002 `/resume` shows only the password form; the portfolio password flow works. The owner reported these results on 5 October 2026. Native computer control was unavailable; this is manual evidence, separate from anonymous HTTP checks. |

Localhost cookies span ports. A `portfolio_session` never grants public-site access; a valid `preview_key` still bypasses the gate by design. The private browser check must use a fresh session without either cookie.

Local evidence is under `/private/tmp/jgawlik-three-server-verification/`: `http-results.json`, `password-check.json`, `authenticated-browser-routes.json`, `browser-hmr.json`, `browser-console.json`, `isolation-review.json` and `mirror-review.json`. Screenshots are saved outside Git in the task's visualization directory. No plaintext password or environment secrets are included in the report or committed files.
