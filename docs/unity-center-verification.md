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

## “The One Hand” copy refresh — 5 October 2026

The owner's subsequent copy package replaces the hero, compass prompts and destination captions, six card titles/descriptions, bio and footer. `OnePractice.tsx` adds “One Practice, Many Materials” between the hero/compass and the pillar cards. It is server-rendered and reuses the existing bio typography and layout classes. Section numbering now runs 01–04. The hero's “Enter the field” anchor still enters the compass.

The owner explicitly chose “At American Express, I stress-test systems so **people** can trust them,” preserving the reconciliation's removal of the unverified audience-size assertion. The remainder uses the supplied positioning. Existing status labels are retained verbatim, including “Active — Case studies in review,” “Records live · Debut in preparation” and “Invite-only beta · Open access 2027.” Enum statuses and their badge markup are unchanged. Card headings retain the existing title-case treatment.

All stylesheets, navigation behavior, authentication, public gating, route destinations, ContentItem schema and SEO utility/Person JSON-LD remain byte-identical to `fec0806`. Updated pillar summaries feed the existing per-pillar metadata utility automatically; no SEO implementation changes were made. Retained résumé, project, timeline and publication data are unchanged. No Phase 5 pillar content or integrations were added.

| Check | Copy-refresh result |
| --- | --- |
| Lint / TypeScript / tokens / whitespace | **Pass:** ESLint, `tsc --noEmit --typeRoots ./node_modules/@types`, design-token validation and `git diff --check`. |
| Production builds | **Pass:** review, public gate and password portfolio modes on Node 22.23.3 in isolated source copies. All 104 captured source/config files matched canonical before and after builds; no private env files were copied. The previously documented direct-checkout ambient type-package limitation is unchanged. |
| Three-server regression | **68 anonymous HTTP checks passed:** original/pillar routes, gate/password redirects, public/private assets and API method policies. |
| Updated-copy boundary | **31 checks passed:** new copy appears on 3001; none appears in anonymous responses from the gated routes or publicly permitted assets on 3000/3002. No Unity Person JSON-LD appears on those gate responses. |
| Desktop and mobile | **Pass:** rendered at 1280 px and 390 px viewport widths; the document and checked copy/links have no horizontal overflow. The five compass points and Design door wrap within the 327 px mobile field. The new section sits between compass and cards and displays the owner-approved wording. |
| Navigation / appearance | **Pass:** hero anchor focuses the compass; mobile native constellation opens and closes with Escape, its seven links fit without overflow, and professional/ethereal appearance changes in place while the copy remains present. |
| Gate / private portfolio / console | **Pass:** browser 3000 shows Coming Soon only; the existing owner-authenticated 3002 session retains its private homepage and portfolio navigation. Captured console error lists are empty for all three experiences. No new incognito test or password entry is claimed. |
| Preservation / dev parity | **Pass:** 28 selected retained content/style/access/navigation/SEO files match `fec0806` byte-for-byte. All 90 source/public files match each of the three dev mirrors. Existing loopback listeners and separate caches remain in use; no restart or secret change was needed. |

Evidence is retained in `/private/tmp/jgawlik-one-hand/`: lint/typecheck and three build logs, source-equivalence and preservation manifests, HTTP/copy-boundary results and browser results. An initial scratch assertion compared the gate's raw HTML with its rendered heading and failed on the existing nested span; inspection confirmed no copy leakage. The assertion was corrected to normalize heading markup, and the initial result is retained. Browser locator ambiguities were resolved using the observed href/label; they produced no application console errors.

Screenshots `one-hand-hero-desktop.png`, `one-hand-practice-desktop.png` and `one-hand-compass-mobile.png` are saved outside Git in the task visualization directory. The temporary test tab was closed and its viewport override reset. All three review tabs/servers remain available. This refresh is local on `feature/unity-center`; no push, merge, deployment, hosted verification or native print/PDF export was performed.
