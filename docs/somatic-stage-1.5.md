# Stage 1.5 — the Living Specimen

Review date: 5 October 2026, America/Los_Angeles. Branch: `feature/somatic`.

**Owner felt-experience review is pending. Stage 1 is not approved as the
foundation gate. Stage 2 CloverMap remains blocked.** This insertion brings
the existing specimen materials to life before any real page adopts them.
The governing design and truth rules remain in [design.md](./design.md),
[ethos.md](./ethos.md), and the reconciled pillar data.

## Review the experience

Run `npm run dev:site` and open
[localhost:3001/somatic-specimen](http://localhost:3001/somatic-specimen).

1. Hover Water, then move between the six panels. Repeat using Tab. Warmth
   and bloom rise over 600ms; the panel settles at 1.02 scale over 850ms.
   Shadows deepen and neighboring blooms and seams dim. Text opacity stays
   intact. The six full-size chambers have the same attention response.
2. Follow the gold currents between panels and chambers. Their normalized
   SVG stroke pulses travel in eight-second loops, offset across the hero
   threads. Chamber connectors occupy the gaps, clear of reading content.
3. Look for the actual procedural grain and local blooms. Grain translates
   at 0.8% of scroll distance, capped at 60px; it is inherited by the field,
   panels, and chamber textures. Paper tooth remains on the reading study.
4. Activate **Walk the rooms**, or the four-heart breathing study. The
   owner's timing choice is **2.8 seconds per chamber**, with a 650ms pause
   between chambers: approximately 20 seconds through all six. The shared
   indigo field crossfades between room temperatures over two seconds.
   Stop walk, Escape, manual wheel/touch scrolling, navigation keys, or
   another anchor cancel the tour. Focus returns to a chamber, rather than
   disappearing with the Stop button. Completion focuses Guardian.
5. Watch the clover's five-second breath. It is a functional 4+1 study that
   starts the walk, not the approved Master Sigil or a CloverMap replacement.
6. Enable **Stillness**. Motion, grain parallax, scale, and animated hue
   transitions stop. Attention retains an immediate static color/focus
   response. Walk becomes direct first-chamber navigation. The operating
   system reduced-motion preference enforces this twin and cannot be
   overridden by unchecking Stillness.

The approval question is experiential: does the first room feel warm,
inhabited, and responsive? A passing build does not answer that for the
owner. No Stage 2 work begins until that review passes.

## Preserved materials and scope

All palette/type token values, global font imports, pillar copy/statuses,
SEO data, Unity homepage, gate, and portfolio source remain unchanged from
Stage 1 commit `005864a0983d28b983568796afd92259c5e50270`. The new behavior is
confined to the guarded specimen page, its CSS module, and one client
controller. The complete specimen content remains server-rendered.

Cormorant + Source Sans 3 is provisionally approved. This behavior-only
pass retains Playfair Display + DM Sans under the owner's instruction to
make no type changes. The specimen explicitly discloses that distinction
and the Georgia/Arial fallbacks. No font acquisition or paid license action
occurred.

The two Lumo sigil references supplied during review inform later material
and geometry decisions. They have not been placed in public assets or
silently designated as the approved Master Sigil. Their supplied pixels
remain reference material; selecting the final sigil belongs to the owner.

## Access boundary

The existing server contract remains: `NODE_ENV=development`, `PORT=3001`,
`PUBLIC_GATE=false`, and `PORTFOLIO_MODE=false`. Middleware checks the
reserved route and its emitted script before owner/reviewer cookie bypasses;
page rendering and metadata independently reject other profiles. Host
headers cannot select this privilege. Production profiles and ports
3000/3002 return generic 404s for the specimen, with private/no-store and
noindex behavior. The public Coming Soon gate and portfolio authentication
remain enforced.

## Verification on the final source

Node 22.23.3. All temporary mirrors, synthetic fixtures, logs, and screenshots
are outside the repository. The existing three development caches stay
separate under `.dev/`; production checks used fresh equivalent snapshots
without owner env files or owner passwords.

| Check | Result |
|---|---|
| ESLint | Pass, exit 0. |
| TypeScript | Pass: `tsc --noEmit --incremental false --typeRoots ./node_modules/@types`. |
| Token validation | Pass. |
| Review/public/portfolio production builds | All three pass, exit 0. |
| Three-server HTTP regression | 68/68. |
| Copy and client dependency boundaries | 31/31. |
| Security and reversibility | 25/25. |
| Specimen route and asset access | 101/101. |
| Total HTTP/access checks | **225/225**, zero failures. |
| Source equivalence | 110 files per build snapshot; no canonical drift. Next's isolated portfolio type declaration path rewrite is recorded separately. |
| Preservation | Seven checks against Stage 1: palette, tokens, types, pillar data, SEO, global styles and font/layout source unchanged. |

Manifest-based checks identified the actual new controller assets, rather
than testing guessed URLs. The public `page-d87ef28d24914dcd.js` and
portfolio `page-5f4c75a08d9f7a4a.js` specimen chunks both return 404 with valid
synthetic owner/reviewer cookies. Gate/password dependency chunks contain
no Living Specimen markers.

Rendered browser checks passed:

- Real pointer hover settled Water at scale 1.02 and bloom opacity 0.75;
  neighboring blooms settled at 0.15. Keyboard focus produced the same
  warmth/depth with a visible outline and matching room field.
- Readings 1.2 seconds apart confirmed traveling stroke offsets and a
  changing clover transform; computed cycles are eight and five seconds.
- The complete keyboard-started tour visited all six chambers, showed
  simultaneous fading room layers, updated grain translation, stopped at
  approximately 20 seconds, and focused Guardian. Stop, Escape, manual
  scrolling, and another native anchor each cancelled the walk.
- Real 320×740 and 390×844 viewport checks had no horizontal overflow.
  The 320px tour controls fit within the viewport; Stop remained a 44px
  target. In Stillness, the focused chamber CTA remained above the fixed
  controls. At the 1101px layout boundary the focused pane outline had
  clearance from the viewport edge. Temporary viewport overrides were reset.
- Native Stillness stopped all animations, parallax, scale and hue
  transitions, and directly focused Music. A separate loopback proxy
  exercised the actual system-preference controller branch by substituting
  an always-matching media query: checked/disabled Stillness, no animation,
  direct navigation. This is branch verification, not a claim that the
  owner's OS preference was changed or that a physical mobile device was
  tested.
- A script-blocked fixture retained all six chambers, correct pillar links,
  native anchor navigation, and the SSR Stillness checkbox. Its CSS-only
  `:has(:checked)` twin stopped transitions without hydration.
- Browser regression rendered Coming Soon at `3000/resume`, a password
  form at `3002/resume`, the retained resume at `3001/resume`, and all six
  pillar pages. Fresh loads, including the final specimen, reported no
  console warnings/errors. Earlier specimen hot-reload warnings are
  retained separately from final-load evidence.

Independent source review found no remaining blockers after moving the
gold chamber connectors out of reading content. Conservative compositing
checks cover grain, paper, bloom, attention states, and overlapping field
layers; minimum normal gold text contrast is 4.93:1 and muted captions
6.26:1. This targeted review is not a blanket WCAG certification.

Evidence is retained locally under
`/private/tmp/jgawlik-somatic-15-final/`: command logs and exits,
`http-summary.json`, source/preservation manifests, exact client-boundary
results, browser tour/interruption/motion/responsive/fallback records, and
screenshots. Earlier builds before the connector correction remain in
`/private/tmp/jgawlik-somatic-15/` as preliminary evidence; they are not the
final verification result. Initial sandbox loopback denials are retained;
authorized retries passed.

`main` is untouched. No merge, hosted deployment, launch, authentication
change, Stage 2 implementation, or owner felt-approval is implied by this
local verification.
