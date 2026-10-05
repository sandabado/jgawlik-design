# Unity Center foundation — 5 October 2026

Branch: `feature/unity-center`, based on the owner-approved reconciliation at `cfa9a4e` on `feature/portfolio-subdomain`. This is a local review build. Neither feature branch is merged to `main`; no deployment or domain change is part of this pass.

## Implemented scope

`src/app/(unity)/` contains the new homepage and six explicit pillar routes. Its server layout calls `requirePublicAccess()` before rendering the shell. The existing public middleware still rewrites anonymous requests to Coming Soon, and portfolio middleware still serves only its intended reviewer routes. The gate sits outside the Unity route group.

- Home: `UnityHero`, the reused lightweight gate field, `Quincunx`, six data-driven landing cards, the supplied `ArchitectBio`, and contact/résumé footer.
- Pillars: `/design`, `/music`, `/manuals`, `/community`, `/foundation`, `/guardian`. Each has its approved status line and a link home; substantive content remains Phase 5 work.
- Data: `src/lib/data/pillars.ts` holds every prompt, destination, status label, pillar description, appearance default and keyword set. `PillarEntry` extends the new `ContentItem` in `src/lib/types.ts`, which also supports design-case, album, manual, event and article work types.
- Navigation: `NavigationShell` adds an explicit `scope="unity"`; its default portfolio scope and existing rendered links/sign-out remain intact. Linear and radial Unity navigation share the pillar data. Narrow screens use a native disclosure; its constellation reuses the homepage component.
- Appearance: professional defaults on Design, ethereal elsewhere. The shell control changes presentation in place; an explicit choice persists across client navigation within the Unity group. It does not persist an account/browser setting.
- SEO: `SeoConfig` prepares distinct canonical URLs, descriptions and keyword/pillar metadata. Home presents Whole Body Architect; its Person JSON-LD uses Product Designer and current American Express employment. When gated/private, Unity metadata inherits the existing generic gate/private metadata. Approved music audio/profile URLs can be supplied later; no release, playback URL or Spotify/Apple Music ID is invented.

The original homepage assembly is preserved in `src/components/OriginalHome.tsx`. Start the review server with `UNITY_CENTER=false npm run dev:site` to restore it; restart after flag changes. The flag defaults to enabled and changes neither `PUBLIC_GATE` nor reviewer authentication. `/resume` and `/design-system` remain on their existing routes with their reconciled content.

## Copy and pattern decisions

The owner's supplied package is authoritative for this new homepage, including its status wording and bio. These new statements are owner-approved positioning, not independently measured results. The optional post-2027 career-transition line is omitted. The prior credentials decision remains open and its data is unchanged.

The community reference pattern was inspected at `/Users/cougarceleste/Websites/whole-body/apps/presence/app/components/HomeExperience.tsx:81`. This implementation adapts its five-point, link-based entry; it does not copy its WebGL hero, loader, product data or body mapping. The owner package governs the mappings here:

| Body / element | Destination |
| --- | --- |
| Spiritual / Fire | Community |
| Mental / Air | Manuals |
| Emotional / Water | Music |
| Physical / Earth | Foundation |
| Ethereal / Ether (center) | Guardian |
| Additional “I want to build” doorway | Design |

Five energies and six destinations are thus distinct. Every cell keeps the supplied feeling prompt. Existing historical/current five-arm content in the reconciled data modules is unchanged.

Live Press/Studio ingestion is deferred with the pillar content, as required by the Phase 5 stub constraint. Their canonical source URLs are recorded in the data. This scaffold uses the supplied preview/hold/catalog copy; it does not imply a working CMS sync, released album, agreement-request form, event booking or completed Trust Harness case study.

## Verification

| Check | Result |
| --- | --- |
| Lint / tokens / whitespace | **Pass:** ESLint, design-token validation and `git diff --check`. |
| TypeScript | **Pass:** `tsc --noEmit --typeRoots ./node_modules/@types`. Stale root route types from the moved homepage were preserved outside Git before regeneration; compiler settings remain unchanged. |
| Production builds | **Pass:** ungated review, public gate and portfolio modes on Node 22.23.3, using three isolated source copies and the repository's installed dependencies. No private env files were copied. The direct checkout's unrelated ancestor `@types/abstract-leveldown` failure remains documented; its failed log is retained. |
| Three-server regression | **68 anonymous HTTP checks passed:** retained pages/APIs, all six new routes, asset exclusions and method policies on ports 3000/3001/3002. The new routes are visible only on 3001 without owner bypass. |
| Production gate and fallback | **25 checks passed:** all new destinations still show the gate, no future copy or Person JSON-LD appears there, RSC/forged middleware-header requests stay gated, emitted Unity route bundles return 404, permitted gate assets load without Unity copy, and `UNITY_CENTER=false` restores the retained homepage in an isolated loopback dev server. |
| Browser / six pillars | **Pass:** every pillar renders its exact data-driven status, correct H1, canonical URL and pillar metadata. Design defaults to professional; the others default to ethereal. |
| Browser / navigation and appearance | **Pass:** linear/radial controls, both appearances, native disclosure, Escape close/focus return, Enter reopen, Tab traversal and Enter navigation. Radial/professional state survives client navigation to Community; the disclosure closes on navigation. |
| Mobile / preservation | **Pass:** the 390 px view and open constellation fit without horizontal overflow; all five points plus the Design door remain reachable. Thirty-two selected baseline content/access/style files are byte-identical to `cfa9a4e`; the original homepage assembly is preserved exactly apart from its function name. |
| Scripts blocked | **Pass:** temporary loopback QA fixture uses CSP `script-src 'none'`. The homepage, six door links and native disclosure render; following Music navigates to its status scaffold. Enhancement-only controls remain hidden. |
| Reduced motion | **Pass:** a separate temporary QA fixture activates the existing reduced-motion CSS branch. Field and entrance animation are `none`, point transitions are `0s`, and root scroll behavior is `auto`. This is CSS-branch proof, not native OS preference emulation. |
| Early disclosure hydration | **Fixed and rechecked:** opening the native disclosure before hydration initially produced an `open` attribute mismatch. The uncontrolled disclosure now explicitly preserves native pre-hydration state; a fresh mobile tab has no captured console errors. The original failure log is retained. |
| Gate / private browser regression | **Pass:** port 3000 still renders only Coming Soon; authenticated 3002 retains the same private title, home copy, portfolio navigation and sign-out. No Unity navigation appears there. Final captured console error lists are empty in all three experiences. |
| Cache and source parity | **Pass:** all 94 runtime/config files match each of the three isolated build sources. All three generated dev source mirrors match the canonical source and retain distinct cache paths. |

Local evidence lives in `/private/tmp/jgawlik-unity-center/`: build/lint/typecheck logs, `http-results.json`, `security-results.json`, `preservation.json`, `source-equivalence.json`, `browser-unity.json`, and the retained disclosure failure. Screenshots are saved outside Git in the task visualization directory. Temporary QA servers/tabs were removed; the three authorized review servers remain running. Existing password secrets were not read or reset. Hosted/CI/native-print verification is outside this local pass.
