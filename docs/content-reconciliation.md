# Content reconciliation — 5 October 2026

Review surface: `http://localhost:3001/`. Branch: `feature/portfolio-subdomain`. The owner confirmed that American Express employment is **current** and ruled on titles, dates and claims on 5 October 2026. The [Rulings Applied appendix](#rulings-applied--5-october-2026) is authoritative; credentials are the only remaining open inventory item. The new Unity Center and pillar build stays parked until the owner reviews this pass.

## Scope and provenance

The three-server setup was committed and pushed at `b862b7fd6b74247c8e87bf8ded56d346a8c12558`. The earlier Phase 2 commit, `4dbd7e56ad945071f84d44b3395ce3918f171bd3`, had already changed Amex to current, changed the metadata/résumé positioning from Designer to Architect, aligned Brand Buddha and Whole Body years, and replaced some metrics with `[METRIC — PENDING]`. Those earlier title/date choices were provisional. The initial reconciliation at `827b374` inventoried the decisions and removed dead code/contact delivery scaffolding; the owner-ruling pass below now applies approved title, date, metric, publication and claim corrections.

The inventory and its awaiting-decision statuses below are the **pre-ruling audit snapshot at `827b374`**; the appendix records how those rows were resolved. These baseline locations use repository-relative `file:line` references. Locations marked **historical** refer to the named commit; removed files and original claims remain recoverable from Git. For example: `git show b862b7f:src/components/PortfolioShell.tsx`. The initial cleanup changed no active page, layout, typography or design token. The subsequent owner-ruling pass changes copy and content bindings only; routing, DOM composition, styles and motion remain unchanged.

## Confirmed employment status

| Location | Current text | Proposed resolution | Status |
| --- | --- | --- | --- |
| `src/lib/data/resume.ts:13` | “Currently at American Express.” Previously “Former American Express” at `6001ee4:src/lib/data/resume.ts:13`. | Retain current employment wording, consistent with Present in the experience record. | **auto-fixed** in `4dbd7e5`; reverified against owner ground truth. |
| `src/app/layout.tsx:8` | Metadata description: “Currently at American Express.” Previously “Former American Express” at `6001ee4:src/app/layout.tsx:7`. | Retain current wording in ungated metadata. Gate/private metadata does not assert an employment status. | **auto-fixed** in `4dbd7e5`; reverified. |
| `src/lib/data/resume.ts:19`; rendered by `src/app/resume/page.tsx:13` | “Senior Product Designer — American Express”; “April 2022–Present”. | Retain Present. Past-tense achievement bullets describe completed work, not former employment. | **auto-fixed**: current and consistent; no additional edit needed. |
| `src/lib/data/projects.ts:5`; rendered by `src/components/WorkGallery.tsx:146` | American Express, “Senior Product Designer”, “2022–Present”. | Retain Present; precision of the starting date is recorded below. | **auto-fixed**: current and consistent. |
| `src/lib/data/timeline.ts:5` | American Express, 2022; “Leading product design…” | Retain present-tense description. | **auto-fixed** in `4dbd7e5`; reverified. |

Repository-wide source searches found no remaining “Former American Express” and no JSON-LD, `schema.org`, `worksFor` or occupation markup to correct. No structured-data employment assertion was added.

## Title decision inventory

The audited Designer-versus-Architect mismatch is no longer present in active page-level titles because `4dbd7e5` changed them before this instruction. **That agreement does not constitute the owner's final choice.** Leave current strings untouched until one title is approved. Employment and publication credits are separate factual roles; do not replace every occurrence of Designer with Architect.

| Location | Current text | Proposed resolution | Status |
| --- | --- | --- | --- |
| `src/app/layout.tsx:7` | Document title: “Jesse Gawlik — Agentic Systems Architect”. Historical `6001ee4:src/app/layout.tsx:6`: “…Agentic Systems Designer”. | Owner chooses the overall positioning once; then update document title, OG title, keyword, résumé title and homepage together. | **awaiting owner decision**. |
| `src/app/layout.tsx:12` | OG title: “Jesse Gawlik — Agentic Systems Architect”. Historical `6001ee4:src/app/layout.tsx:11`: “…Designer”. | Apply the same approved positioning. | **awaiting owner decision**. |
| `src/app/layout.tsx:9` | Keywords include “Product Design” and “Systems Architect”; historical keywords were “Product Designer” and “Systems Designer”. | Confirm keywords after the title choice; retain skill terms where appropriate. | **awaiting owner decision**. |
| `src/components/Hero.tsx:6`; `src/components/Hero.tsx:20` | H1 words: “AGENTIC SYSTEMS ARCHITECT”. | Apply the owner's chosen positioning without changing composition. | **awaiting owner decision**. |
| `src/components/Hero.tsx:19` | Kicker: “JESSE GAWLIK // AGENTIC SYSTEMS ARCHITECT”. | Match the approved overall title. | **awaiting owner decision**. |
| `src/lib/data/resume.ts:3`; `src/app/resume/page.tsx:13` | Résumé title: “Agentic Systems Architect”. Historical `6001ee4:src/lib/data/resume.ts:3`: “Agentic Systems Designer”. | Match the approved overall title. | **awaiting owner decision**. |
| `src/lib/data/projects.ts:31` | Whole Body role: “Founder · Architect · Developer”. Historical role: “Founder · Designer · Developer”. | Confirm whether this project credit follows the global positioning or records a distinct role. | **awaiting owner decision**. |
| `src/lib/data/projects.ts:44` | Whole Body Studios role: “Systems Architect”. Historical role: “Systems Designer”. | Confirm the specific project role alongside the global choice. | **awaiting owner decision**. |
| `src/lib/data/resume.ts:19`; `src/lib/data/projects.ts:5`; `src/lib/data/timeline.ts:5` | Amex employment title: “Senior Product Designer”. | Preserve the confirmed employment title separately from overall positioning; owner supplies any official title correction. | **awaiting owner decision** on global title only; job title retained. |
| `src/lib/data/resume.ts:20`; `src/lib/data/projects.ts:18`; `src/lib/data/timeline.ts:6` | Thermo employment title: “Senior UX Designer”. | Preserve historical employment credit; do not infer Architect. | **awaiting owner decision** on global title only; job title retained. |
| `src/lib/data/timeline.ts:8`; `src/lib/data/timeline.ts:9` | “Senior Graphic Designer”; “Senior Web Designer”. | Preserve historical roles; reconcile résumé coverage below. | **awaiting owner decision** on history coverage. |
| `src/lib/data/publications.ts:4`; `src/lib/data/publications.ts:6` | “Author · Designer · Publisher”; “Executive Producer · Brand Designer”. | Preserve publication-specific credits unless owner corrects them. | **awaiting owner decision** on publication evidence, not automatic title substitution. |
| **historical** `b862b7f:src/components/PortfolioShell.tsx:93`; `:174` | Dead template H1/footer: “DESIGNER” / “AGENTIC SYSTEMS DESIGNER”. | Remove the unreachable alternate template, retaining Git provenance. Its removal does not decide the active title. | **auto-fixed** in this reconciliation. |

The résumé footer (`src/app/resume/page.tsx:13`), résumé availability sentence (`src/lib/data/resume.ts:15`) and contact section (`src/components/Contact.tsx:7`) mention senior/principal **product design roles**. These are job preferences, not another declared professional title. Generic “design thinking”, “brand architecture” and “agent architecture” describe skills rather than a Designer/Architect title choice. Gate/private titles (`src/app/layout.tsx:21`, `:25`, `:29`, `:34`) and résumé document metadata (`src/app/resume/page.tsx:9`) do not select either title.

## Dates and history coverage

| Location | Current text | Proposed resolution | Status |
| --- | --- | --- | --- |
| `src/lib/data/timeline.ts:7`; `src/lib/data/resume.ts:21` | Brand Buddha timeline now “2018”; résumé “January 2018–October 2019”. Historical `6001ee4:src/lib/data/timeline.ts:7` said “2017”. | Confirm January 2018 as employment start and 2018 as the abbreviated timeline year, or identify a distinct 2017 engagement before changing anything. Earlier alignment is provisional. | **awaiting owner decision**; no new date edit. |
| `src/lib/data/timeline.ts:4`; `src/lib/data/resume.ts:18`; `src/lib/data/projects.ts:31` | Whole Body now “2025” / “2025–Present”. Historical `6001ee4:src/lib/data/timeline.ts:4` said “2026”. | Confirm founding date versus platform/product launch date. If founding was 2025 and launch 2026, label those as different events rather than forcing one date. | **awaiting owner decision**; earlier alignment provisional. |
| `src/lib/data/projects.ts:44`; `src/lib/data/resume.ts:18`; `src/lib/data/timeline.ts:4` | Agentic work case “2026–Present”, included in a founder résumé entry starting 2025 and a 2025 timeline entry mentioning Agentic AI. | Confirm the agent collaboration start and whether the timeline describes founding or the beginning of AI work. Proposed: separate 2025 founding from a 2026 AI phase if true. | **awaiting owner decision**. |
| `src/lib/data/resume.ts:19`; `src/lib/data/projects.ts:5`; `src/lib/data/timeline.ts:5` | Amex “April 2022–Present” versus “2022–Present” / “2022”. | Likely intentional precision difference. Confirm the résumé as month-level authority, with year-only summaries elsewhere. | **awaiting owner decision** on date precision; current employment confirmed. |
| `src/lib/data/resume.ts:20`; `src/lib/data/projects.ts:18`; `src/lib/data/timeline.ts:6` | Thermo “November 2019–March 2022” versus “2019–2022” / “2019”. | Likely intentional precision difference. Confirm month-level résumé dates and retain abbreviated summaries. | **awaiting owner decision**. |
| `src/lib/data/resume.ts:22`; `src/lib/data/timeline.ts:8`; `:9` | Résumé includes Waveside “December 2015–December 2017”; timeline omits it. Timeline includes FortuneBuilders 2014 and Anacom Media 2012; résumé omits both and provides no end dates. | Confirm whether both are deliberately selected histories. If completeness is desired, owner supplies missing date ranges and overlap/contract context. Do not infer start/end dates. | **awaiting owner decision**. |
| `docs/phase-2-verification.md:36` | Earlier report states dates agree with the résumé without identifying that approval is outstanding. | Add an explicit cross-reference that owner confirmation supersedes that earlier alignment statement. | **auto-fixed** in this reconciliation. |

## Unsupported claims and publication assertions

No customer/member ledger, measured study, analytics export, Lighthouse report, deployment evidence for the described external products, crypto implementation for dodeca.life, publication release manifest or price catalog is tracked in this repository. Describing such artifacts in prose is not supporting evidence. Counts visible in local illustrations prove the illustration, not business adoption or operational readiness. This is a **repository evidence review**, not independent verification of the external organizations or linked sites.

Each row below needs owner-supplied evidence, an approved qualified statement supported by observations, or removal. Prefixing an unsupported number with “~” does not establish its truth. Current claims and existing placeholders are unchanged in this pass.

| Location | Current text | Proposed resolution | Status |
| --- | --- | --- | --- |
| `src/lib/data/projects.ts:12` | `[METRIC — PENDING]`; historical `6001ee4` same line: “35% faster targeted workflows · junior ramp time cut from 6 months to 3”. | Supply study period, baseline, sample and attribution, or approve qualitative process wording/removal. | **awaiting owner decision**; prior placeholder retained. |
| `src/lib/data/projects.ts:25` | `[METRIC — PENDING]`; historical: “50% reduction in design-to-development handoff time”. | Supply before/after handoff measurements and scope, or remove the quantitative claim. | **awaiting owner decision**. |
| `src/lib/data/projects.ts:38`; `src/lib/data/resume.ts:18` | Project metric and résumé adoption are pending. Historical project metric: “200+ active members · 95+ Lighthouse scores · four live properties”; historical résumé: “200+ active members”. | Define active-member criteria/date, supply aggregate count and property-specific Lighthouse/deployment records; then approve precise or bounded wording. | **awaiting owner decision**. |
| `src/lib/data/timeline.ts:4` | “Product delivery: [METRIC — PENDING].” Historical: “Shipped four live products.” | Identify products and released versions/dates before asserting a live-product count. | **awaiting owner decision**. |
| `src/lib/data/resume.ts:19`; `src/lib/data/timeline.ts:5` | Amex reach/impact `[METRIC — PENDING]`. Historical claims included “millions of customers” / “serving millions of customers”. | Confirm whether the relevant audience is corporate administrators, cardholders or platform-wide customers; supply an authorized attributable count. | **awaiting owner decision**. |
| `src/lib/data/projects.ts:50`; `:51` | “A&R scouting, royalty logic, and onboarding are the intended use cases. Prototype readiness: [METRIC — PENDING].”; metric pending. Historical: “Three use cases are prototyped or functional” / “three active prototypes”. | Confirm each workflow's actual status with runnable evidence; distinguish designed, prototyped, functional and deployed. | **awaiting owner decision**. |
| `src/lib/data/resume.ts:18` | “encrypted memberships”; “zero-knowledge encryption” for dodeca.life. | Supply the implementation, threat model, key ownership and review evidence from the relevant product, or approve removal/precise scoped wording. The portfolio's password hash is unrelated proof. | **awaiting owner decision**. |
| `src/lib/data/projects.ts:6`; `:10`; `:11`; `:13` | “Deployed” TETRA OS, “Rolled it out” via workshops, supported a wizard/navigation/library; documentation, prompt library, decision trees, prototypes and usability reports listed as artifacts. | Confirm delivery stage, permitted employer attribution and each available supporting artifact; approve concept/pilot language if that is the actual scope. | **awaiting owner decision**. |
| `src/lib/data/projects.ts:9` | “stakeholder alignment took months” and slow cycles / limited junior autonomy. | Supply research basis and scope, or approve a less categorical account. | **awaiting owner decision**. |
| `src/lib/data/projects.ts:23`; `:24`; `:26`; `src/lib/data/resume.ts:20` | React variants, Figma + React library, accessibility audit, maintainability/speed improvement, and “UX patterns adopted across product suite”. | Supply delivery/adoption and audit artifacts; scope qualitative impact to verified work. | **awaiting owner decision**. |
| `src/lib/data/projects.ts:32`; `:36`; `:37`; `:39`; `src/lib/data/resume.ts:18`; `src/components/WorkGallery.tsx:160` | “launched”, a “live multi-property SaaS loop”, shared auth, Stripe subscriptions/webhooks, automated/AI workflows and “VISIT LIVE PLATFORM”. | Supply the released properties and capability-specific evidence; distinguish specified agents from deployed agents and available checkout from active subscriptions. | **awaiting owner decision**. |
| `src/lib/data/projects.ts:34`; `:49`; `:52`; `src/lib/data/resume.ts:18` | Built/operated alone; five specialized agents, five specifications, royalty logic, checkpoint dashboard, collaboration with Chris Kyser; “five business units” and 12 House symbols. | Confirm collaborators, implemented versus specified artifacts, organizational count and brand scope. Preserve credit for shared work. | **awaiting owner decision**. |
| `src/lib/data/projects.ts:46` | “Creative teams spend most of their energy” on operational tasks. | Supply research context or approve qualified observation language that identifies whose experience this reflects. | **awaiting owner decision**. |
| `src/lib/data/resume.ts:13`; `:14`; `src/components/Hero.tsx:21`; `src/app/layout.tsx:8`; `:13` | “ship autonomous AI products”, “Enterprise-grade”, workflows that “replace operational bottlenecks”, and “Pioneered” a methodology. | Confirm shipped autonomous behavior, enterprise scope and evidence for novelty/impact; owner approves narrower language where warranted. | **awaiting owner decision**. |
| `src/lib/data/publications.ts:4`; rendered by `src/components/PublishedWork.tsx:5` | “The Living Earth Codex”; “Five-volume operating system”; “Author · Designer · Publisher”; `$25–$297`; link to the general Whole Body homepage. | Confirm actual released volumes/formats, credits, current prices and direct product/excerpt URL. If still a concept, approve preparation language and remove sale prices. | **awaiting owner decision**. |
| `src/lib/data/publications.ts:5`; rendered by `src/components/PublishedWork.tsx:5` | “Sandabado”; “Debut album”; producer/songwriter/director credits; “Vinyl $33 · Stream Free”. | Confirm release/catalog identity, credits, available formats, price and legitimate streaming destination. Confirm display spelling Sandabado versus Sandābādo; ASCII domain stays unchanged. | **awaiting owner decision**. |
| `src/lib/data/publications.ts:6`; rendered by `src/components/PublishedWork.tsx:5` | “Living Earth: Volume 1”; “Twelve tracks. Twelve houses. Twelve framers.”; producer/brand-designer credit; `$25 digital · $150 vinyl`; generic homepage link. | Supply track/release manifest, contributor credits, sale availability, prices and direct product URL. Confirm whether “framers” is intentional terminology; no guessed typo correction. | **awaiting owner decision**. |
| `src/lib/data/publications.ts:4`; `src/lib/data/resume.ts:18`; `src/components/BrandSystemGrid.tsx:12`; `:14`; `src/lib/data/projects.ts:33` | Living Earth Codex / five-arm Guardian–Foundation–Studios–Presence–Press model versus the future brief's Living Body Manuals I–V and new six-pillar IA. | Owner confirms product naming and legacy-to-future mapping after this review. Existing work may describe a historical model; do not silently rewrite history to match future IA. | **awaiting owner decision**. |
| `src/lib/data/resume.ts:24`; `:25` | Degree names/date ranges and three certifications, without tracked credentials. | Confirm exact awarded degree/certificate titles and completion; clarify whether “Business Marketing” is coursework or a completed degree. | **awaiting owner decision**. |

The four local project records (`src/lib/data/projects.ts:3`) and three private case-study scaffolds (`src/app/portfolio/case-studies.ts:1`) are intentional separate experiences, not evidence that a project disappeared. “Four rooms” (`src/components/WorkGallery.tsx:200`) matches the four records. The nine-system directory, build-sequence phases and twelve rendered house glyphs are directly backed by local arrays; they are not member, sales or performance metrics.

## Dead code and contact delivery

Unreachability was checked with a TypeScript import/export/dynamic-import/require graph starting at **all 16 app/framework entry files and middleware**, plus repository-wide symbol/path searches. There were no nonliteral imports to obscure reachability. AlchemicalSeal has an incoming import, but only from the unreachable ProjectCard. None of these families appears in the live homepage DOM; active page sources remain identical to `b862b7f`.

| Location | Current text / defect before removal | Proposed resolution | Status |
| --- | --- | --- | --- |
| **historical** `b862b7f:src/components/PortfolioShell.tsx:7`; `:10`; `:18`; `:26`; `:93`; `:167`; `:174`; `:175` | Unimported template with Atlas / Signal / One / Mercury projects, Designer positioning, `hello@jessegawlik.com` and Los Angeles footer. Live site instead uses the shared case data, Gmail contact and Morongo Valley résumé location. | Remove the unreachable alternate source; Git retains its content and provenance. | **auto-fixed**. |
| **historical** `b862b7f:src/components/ProjectCard.tsx:10`; `:27` | Unimported older card with obsolete project-ID mapping (`amex-virtual-cards`, `thermo-fisher`, `wholebody-earth`, `agentic-ai`); live WorkSection uses WorkGallery. | Remove the unreachable card. Preserve shared Project type, data, Glyph and Dodecahedron used by active pages. | **auto-fixed**. |
| **historical** `b862b7f:src/components/AlchemicalSeal.tsx:11` | Only imported by the dead ProjectCard. | Remove the unreachable dependency; it is not claimed to have zero imports. | **auto-fixed**. |
| **historical** `b862b7f:src/components/WaxStamp.tsx:5` | No references to the exported wax stamp. | Remove the unreachable component. | **auto-fixed**. |
| **historical** `b862b7f:src/components/ResonanceField.tsx:1` | No references to the exported field. The gate has its own lightweight CSS field. | Remove this unused field; keep the gate and active ambient visuals. | **auto-fixed**. |
| **historical** `b862b7f:src/lib/sacred-grid.ts:1`; `:3`; `:13`; `:14` | Unreferenced spacing/type/grid exports. | Remove the unused utility. Keep active CSS design tokens and the existing validator. | **auto-fixed**. |
| **historical** `b862b7f:src/app/globals.css:160`; `:177`; `:188`; `:250`; `:251`; `:339`; `:350`; `:351`; `:352` | Unused resonance/seal/card visuals and retired architecture diagram/detail/selector rules, plus responsive branches and three resonance-only keyframes. | Remove 125 wholly unused rules; narrow one mixed mobile selector while preserving its publication/capability/timeline declarations; remove floatSphere/driftPrism/ringOrbit. Keep active architecture section/header, oracle, scaling model and architectureOrbit. No PortfolioShell/WaxStamp selector block exists in this version. | **auto-fixed**. |
| **historical** `b862b7f:src/app/api/contact/route.ts:3`; `:5` | POST acknowledges “Thanks for reaching out.” / `ok: true`, but sends nothing and has no callers. | Remove the route. The original site now returns 404 for `/api/contact`; gate/private mode policies continue denying it. Existing visible contact links remain `mailto:`. | **auto-fixed**. |

No unambiguous spelling typo was found that could be changed without choosing brand terminology or altering a claim. In particular, “framers”, Sandabado/Sandābādo and Living Earth/Living Body are held for owner review.

## Verification

| Check | Result |
| --- | --- |
| Lint / tokens / whitespace | **Pass:** `npm run lint`, `npm run design-system:validate`, `git diff --check`. |
| TypeScript | **Pass:** `tsc --noEmit --typeRoots ./node_modules/@types` with repository-local type roots. |
| Production mode builds | **Pass:** public and portfolio builds on Node 22.23.3 in `/private/tmp/jgawlik-content-build`, using the current tracked source and the repository's installed dependencies. Private environment files were not copied. `/api/contact` is absent from both route inventories. |
| Direct checkout build | **Machine-specific limitation:** source compilation passed, but type validation picked up an unrelated ancestor `@types/abstract-leveldown` package and failed with “Cannot find type definition file for 'abstract-leveldown'”. The failed log is retained; the clean temporary builds above avoid that ambient package. Root compiler configuration was not changed as part of this content-only scope. |
| Three-server HTTP regression | **44 checks passed:** gated retained paths and private assets on 3000; anonymous reviewer redirect on 3002; retained pages on 3001; mode-specific POST policy. Removed `/api/contact` POST returns 404 on 3001, 503 on the public gate and 401 for an anonymous reviewer request. |
| Wrong password | **Pass:** one synthetic same-origin incorrect password returns the generic error redirect and issues no session cookie. The owner's password was not read or reset. |
| Browser / current employment | **Pass:** original and authenticated private résumés show “Currently at American Express.” and “April 2022–Present”, no Former claim, and no error overlay. Original home, public gate and authenticated portfolio render; captured console error lists are empty. |
| Styling preservation | **Pass:** 548 retained CSS rules keep their order, selectors and declarations (apart from removing dead selectors from one mixed rule). Sixteen computed-style samples match the original homepage baseline exactly after hot reload. All active page/component/data sources remain unchanged. |

Local evidence is retained under `/private/tmp/jgawlik-content-reconciliation/`: `reachability.json`, `css-removal.json`, `css-preservation.json`, `layout-comparison.json`, `http-results.json`, `password-check.json`, `browser-resume.json`, `browser-final.json`, `typecheck.log` and the three build logs. The résumé screenshot is saved outside Git in the task visualization directory. The earlier owner-reported incognito/password-flow pass is recorded in `docs/three-server-verification.md`; it is separate from automated checks after this reconciliation. No new incognito window was controlled by the agent.

## Original owner decision queue (superseded by the rulings below)

1. Choose the overall title and confirm the two project-specific roles in the title inventory.
2. Confirm Brand Buddha start, Whole Body founding versus launch, AI collaboration start, and selected-history coverage.
3. Supply or resolve the held metrics, encryption/deployment claims, publication identity/credits/prices and supporting credentials.

Review of the applied-ruling pass is the prerequisite for the next homepage/pillar build. No new pillar pages or ContentItem schema were added during this reconciliation.

## Rulings Applied — 5 October 2026

The owner authorized these content-only changes on `feature/portfolio-subdomain`. The three decisions below supersede every awaiting-decision entry in the baseline inventory except the credentials row. Historical audit text remains for provenance, not as current reviewer-facing copy or an unresolved decision queue.

### Governing rule: contextual titling

Use **Agentic Systems Architect** for persona/elevation surfaces: document title, OG title, Hero H1 and kicker. Use employment-verifiable Product Designer wording for structured/credential surfaces. The résumé combines both as **Product Designer & Agentic Systems Architect**; search keywords include **Product Designer** and **Systems Architect**. Do not substitute Architect for an employer's title. Whole Body project roles are **Founder · Architect · Developer** and **Systems Architect**. Publication credits remain as previously recorded. Future edits must follow this contextual rule rather than forcing one universal string.

The row numbers in the resolution tables count data rows within their corresponding baseline inventory table, in order.

| Title inventory rows | Applied resolution | Status |
| --- | --- | --- |
| 1–2: document and OG titles | Retained “Jesse Gawlik — Agentic Systems Architect” in `src/app/layout.tsx:7` and `:12`. | Applied / retained by owner ruling. |
| 3: keywords | `src/app/layout.tsx:9` now includes both Product Designer and Systems Architect. | Applied. |
| 4–5: Hero H1 and kicker | Architect wording remains in `src/components/Hero.tsx:6`, `:19`, `:20`. | Retained by owner ruling. |
| 6: résumé title | `src/lib/data/resume.ts:3` is “Product Designer & Agentic Systems Architect”; the existing résumé component renders it. | Applied. |
| 7–8: venture/project roles | Whole Body “Founder · Architect · Developer” and Studios “Systems Architect” remain in `src/lib/data/projects.ts:31`, `:44`. | Retained by owner ruling. |
| 9–11: Amex, Thermo and historical employer roles | Exact existing titles remain; Amex remains Present. No Architect substitution and no additional history entries. | Retained by owner ruling. |
| 12: publication credits | Author · Designer · Publisher and Executive Producer · Brand Designer remain in `src/lib/data/publications.ts:4`, `:6`; album credits also remain unchanged. | Retained by owner ruling. |
| 13: alternate Designer template | Remains deleted at `827b374`; recoverable at `b862b7f`. | Closed by prior cleanup. |

### Dates: distinct events and deliberate precision

| Date inventory row | Applied resolution | Status |
| --- | --- | --- |
| 1: Brand Buddha | `src/lib/data/timeline.ts:7` uses the owner's requested 2017–2018 label and states that work continued through October 2019. `src/lib/data/resume.ts:21` uses 2017–October 2019. The owner confirmed the start year but supplied no start month; none was invented. | Applied. |
| 2: Whole Body founding versus launch | Timeline remains keyed to 2025 and is titled “Founded Whole Body Earth”; its description explicitly states platform launch in 2026. The founder résumé and Whole Body project description distinguish the same two events. | Applied. |
| 3: agentic phase | Timeline and founder copy identify the AI phase as beginning in 2026; `src/lib/data/projects.ts:44` stays 2026–Present. | Applied. |
| 4: Amex precision | Résumé April 2022–Present is authority; 2022 summaries intentionally remain year-only. | Retained by owner ruling. |
| 5: Thermo precision | Résumé November 2019–March 2022 is authority; 2019–2022 / 2019 summaries intentionally remain year-only. | Retained by owner ruling. |
| 6: selected-history coverage | Existing Waveside résumé entry and FortuneBuilders/Anacom timeline entries remain; no entries were added, deleted or reordered. | Retained by owner ruling. |
| 7: earlier verification narrative | `docs/phase-2-verification.md` now records these rulings and links to this appendix; the prior PDF is explicitly labeled as predating the updated copy. | Applied. |

### Claims: qualitative observations and live R&D

| Claim inventory row | Applied resolution | Status |
| --- | --- | --- |
| 1: Amex TETRA speed/ramp metric | Replaced the visible marker with “Early observations indicate compressed design-cycle time and higher stakeholder confidence; formal measurement ongoing.” No percentage or ramp-duration number. | Applied. |
| 2: Thermo handoff metric | “Improved handoff efficiency observed across the product suite.” No percentage. | Applied. |
| 3: member/Lighthouse/property counts | Whole Body metric and founder adoption copy use active-development language, referring members/product states to wholebody.earth. No member count, Lighthouse score or live-property count. | Applied. |
| 4: shipped-product count | Timeline records founding/launch/AI events and active development rather than a number of shipped products. | Applied. |
| 5: Amex audience reach | Timeline and résumé scope work to virtual cards/account navigation within @ Work; no audience-size assertion. | Applied. |
| 6: prototype count/readiness | Studios outcome describes active R&D and intended human review; its metric uses the owner's qualitative ecosystem wording. No prototype-readiness marker or active-prototype count. | Applied. |
| 7: encryption claims | Removed encrypted memberships and zero-knowledge encryption. No replacement security claim was inferred for dodeca.life; the copy describes the product and its active-development context. | Applied. |
| 8: TETRA rollout/artifacts | Project title and illustration label now identify workflow R&D. Description uses the permitted “built and currently stress-tested inside my role at American Express”; approach is a pilot in the owner's workflow with human review. Artifacts are framed as work in development, explorations and review plans. | Applied. |
| 9: alignment took months | Replaced categorical timing/autonomy assertions with the workflow areas the owner set out to improve. | Applied. |
| 10: Thermo implementation/adoption/audit | Narrowed prose to component design and research patterns; removed the categorical React implementation, certified-audit and suite-wide adoption implications. Outcome and résumé use the approved qualitative handoff observation. | Applied. |
| 11: live platform / infrastructure | Whole Body says built and operate, active development, evolving integrations and human review. Categorical launch/automated-production claims and webhook artifact assertion are narrowed. The five-arm model and existing live platform link remain. Illustration captions identify membership/commerce/workflow R&D. | Applied. |
| 12: sole authorship / deployed agents / artifact completeness | Removed “alone”, categorical operational-agent counts and “complete” brand-system wording. Collaboration with Chris Kyser remains; agent work and supporting artifacts are identified as exploration, concepts or planning. Five-arm brand/model geometry remains. | Applied. |
| 13: teams spend most of their energy | Replaced the unsupported generalization with recurring areas for exploration in studio work. | Applied. |
| 14: autonomous shipping / enterprise grade / pioneering | Hero, résumé and metadata say building and stress-testing, senior-level enterprise experience, hands-on implementation and human-reviewed workflows. No novelty or autonomous-product-shipping claim. | Applied. |
| 15: book identity / price / preview | First publication card now identifies Whole Body Presence — Manual I, links to its Press book page, states public preview and Manuals II–V editorial hold, and has no sale price. Publication credit and existing card ID/format remain. | Applied. |
| 16: album release / price / spelling | Display text is Sandābādo (uppercase Sandābādo in the marquee/brand tile); ASCII sandabado.com URLs remain unchanged. Album copy separates the live Records catalog status from release details in preparation. No vinyl price or Stream Free assertion. | Applied. |
| 17: compilation / contributors / price / framers | Living Earth: Volume 1 is explicitly in preparation; unsupported track/participant counts and prices are removed. “framers” remains intentional terminology; producer/brand-designer credit remains. Link points to the Studio Records room. | Applied. |
| 18: Codex / five arms versus future IA | The historical/current Guardian–Foundation–Studios–Presence–Press model is retained. Updating the public-preview publication identity does not rewrite that model; the future six-pillar IA remains parked. | Retained by owner ruling. |
| 19: degrees and certifications | Exact text in `src/lib/data/resume.ts:24`, `:25` remains unchanged. Owner will confirm awarded titles, dates/completion and certifications separately. | **Open — only remaining inventory decision.** |

The five employment-status inventory rows remain consistent with current Amex employment. All eight dead-code/contact rows remain closed by `827b374`; nothing was restored. All metric-marker occurrences in runtime source, including the three private case-study Outcome sections, are replaced by the approved qualitative observations. Other case-study sections remain explicitly in preparation; this pass does not claim completed case-study narratives.

On 5 October 2026, the browser verified [Whole Body Press](https://www.wholebody.press/): Manual I preview open, four subsequent manuals on editorial hold; and [Whole Body Studio](https://www.wholebody.studio/): Sandābādo on the roster and Records catalog active. These primary pages support publication/status framing, not sales, measured adoption, cryptography or formal workflow metrics. The text-fetch tool could not open these domains; browser evidence is saved in `/private/tmp/jgawlik-owner-rulings/publication-status.json`.

### Applied-ruling verification

| Check | Result for the 5 October owner-ruling pass |
| --- | --- |
| Lint / tokens / whitespace | **Pass:** `npm run lint`, `npm run design-system:validate`, `git diff --check`. |
| TypeScript | **Pass:** `tsc --noEmit --typeRoots ./node_modules/@types`. Repository-local type roots avoid the previously recorded unrelated ancestor type package; compiler configuration is unchanged. |
| Public and portfolio production builds | **Pass:** both modes build on Node 22.23.3 in `/private/tmp/jgawlik-owner-rulings-build`, with the repository's installed dependencies. All 76 tracked runtime/public/config files match the working source byte-for-byte; no private environment files were copied. These clean builds avoid the direct-checkout ambient type-package limitation recorded above. |
| Content and preservation assertions | **26 passed:** approved titles, observations, dates and publication states; credentials and employer titles retained; selected history and five-arm model retained; no runtime metric markers, prices or unsupported encryption wording. AST comparisons confirm unchanged component composition, numeric props and motion configuration in all five edited TSX files; every CSS file is byte-identical to `827b374`. |
| Three-server HTTP regression | **44 passed:** public gate on 3000, retained routes on 3001, anonymous portfolio/password and private-asset protection on 3002, and mode-specific POST policies. `/api/contact` remains removed. Separate source mirrors/caches and all three servers remain running. |
| Original-site browser | **Pass:** home and résumé render the contextual titles, current Amex wording, confirmed Brand Buddha span, distinct Whole Body events and updated publication statuses. No invalid-copy matches or horizontal overflow in the checked views. |
| Authenticated portfolio browser | **Pass:** home, résumé and all three case-study routes render through the existing owner-authenticated session. Amex/TETRA and Thermo Outcome sections display the approved qualitative observations; no metric markers remain. The password and session configuration were not read, reset or changed. |
| Public gate / console | **Pass:** the browser still shows only Coming Soon on 3000; captured console error lists are empty for all three experiences, and no current runtime/build error dialog is present. Anonymous route checks use requests without cookies. The owner's earlier incognito/password-flow verification remains separate evidence; no new agent-controlled incognito session is claimed. |
| Visual review / print boundary | **Pass:** the updated résumé viewport was captured and visually reviewed; the combined title fits without clipping and the existing layout remains intact. No new PDF/native print export was performed; the Phase 2 PDF evidence predates these rulings. |

Evidence is retained in `/private/tmp/jgawlik-owner-rulings/`: `content-checks.json`, `http-results.json`, `browser-original.json`, `browser-final.json`, `source-equivalence.json`, `publication-status.json`, and lint/typecheck/public/portfolio build logs. The updated résumé screenshot is outside Git in the task visualization directory. Authentication, middleware, cache configuration, route structure and styles have no changes in this pass. Credentials remain the only open inventory decision. The Unity Center build remains parked pending owner review of this pass.
