# Somatic Stage 1 — design foundation review

Review date: 5 October 2026. Branch: `feature/somatic`.

**Owner ruling, 5 October 2026:** Stage 1 is not approved as the foundation
gate. [Stage 1.5 — the Living Specimen](./somatic-stage-1.5.md) now supplies
the experiential review gate. Stage 2 remains blocked until the owner
approves that living study by feel. Cormorant + Source Sans 3 is provisionally
approved; the existing type remains in this behavior-only pass. The record
below preserves the original Stage 1 submission and verification.

Stage 1 establishes the token layer and a private development specimen for
**Desert Mysticism × Industrial Craft**: a monk's manuscript built with an
engineer's hands. The governing sources are [design.md](./design.md) and
[ethos.md](./ethos.md). Their generative imagery mandate supersedes the
commission's earlier photography and photograph-based artefact guidance.

Owner review is pending. Font approval is pending. No new fonts have been
acquired, installed, purchased, or licensed for this stage.

## Review surface and boundaries

The specimen is intended for
[localhost:3001/somatic-specimen](http://localhost:3001/somatic-specimen).
Its access contract is a strict server guard: the route is available only in
the development site environment on port 3001. It must reject access in
production, on the public gate at 3000, and on the private portfolio at 3002.
Client-side hiding does not satisfy this contract. Verification is recorded
below before Stage 1 is submitted as complete.

The three existing review surfaces remain distinct:

| Port | Experience | Stage 1 boundary |
|---|---|---|
| 3000 | Public Coming Soon gate | No Unity, specimen, portfolio copy, or JSON-LD leakage. |
| 3001 | Unity and retained site review | Development specimen and token review. |
| 3002 | Password-protected portfolio | Existing server authentication remains in force. |

Stage 1 does not authorize a merge to `main`, public launch, deployment,
authentication change, or progression to Stage 2. Stage commits and pushes
follow successful verification; the owner approves each stage before the
next stage begins.

## Token review

All six rooms share a deep-indigo field. The palette expresses temperature
through restrained illumination, precise gold lead-lines, and readable
foregrounds. Pure black, neon treatment, generic gradient heroes, and
glassmorphism are outside the design direction.

| Room | Pillar | Intended temperature |
|---|---|---|
| Water | Music | Deep blues and cyan-glass. |
| Earth | Foundation | Desert ochre, bone, terracotta, and dusk orange. |
| Fire | Community | Ember orange and rose gold. |
| Air | Manuals | Pale silver-violet. |
| The Hand | Design | Near-monochrome professional steel. |
| Ether | Guardian | Violet and gold. |

The review package covers these token roles:

- Field, surface, text, accent, border, focus, and room-temperature colors.
- Editorial display scale reaching 120px or more on suitable viewports,
  comfortable body text, and legible whisper captions.
- Subtle procedural film grain, paper-tooth reading surfaces, and gold
  lead-line/rim-light utilities. No photographic texture or image asset.
- Quiet interaction and a reduced-motion branch. Signature clover motion is
  reserved for Stage 2.

The provisional specimen uses the already imported **Playfair Display +
DM Sans**. This demonstrates scale, color, and material roles with existing
typefaces. It is not a rendering of Cormorant, Bodoni Moda, Domaine Display,
Source Sans 3, or Lato. The production font pairing remains an owner decision.
If an imported face fails to load, the specimen must disclose the fallback
rather than present a system font as the selected face.

## Font shortlist — owner decision pending

Pairing assessments below are design judgments. License statements were
checked against the designer, foundry, or official project repositories.

### 1. Cormorant + Source Sans 3 — recommended

Cormorant provides the expressive manuscript register and large-scale
contrast; Source Sans 3 provides a calm, approachable reading and interface
register. This is the strongest fit for the manuscript/craft tension.
Cormorant's designer describes the family as a display face intended for
large sizes; Adobe describes Source Sans 3 as designed for UI environments.

Both are distributed under SIL Open Font License 1.1. No paid font purchase
is needed; any later bundling must retain the applicable copyright and
license notices. The owner still approves the pairing before adoption.

- [Cormorant designer repository](https://github.com/CatharsisFonts/Cormorant)
  and [license](https://github.com/CatharsisFonts/Cormorant/blob/master/OFL.txt).
- [Source Sans 3 Adobe repository](https://github.com/adobe-fonts/source-sans)
  and [license](https://github.com/adobe-fonts/source-sans/blob/release/LICENSE.md).
- Actual hosted specimens: [Cormorant](https://fonts.google.com/specimen/Cormorant)
  and [Source Sans 3](https://adobe-fonts.github.io/source-sans/).

### 2. Bodoni Moda + Lato

Bodoni Moda offers the sharper editorial and industrial register, including
optical sizes. Lato adds warmer, semi-rounded humanist detail to the body.
This pair puts more emphasis on chiseled precision than on manuscript
eccentricity.

Both are distributed under SIL Open Font License 1.1. No paid font purchase
is needed; later bundling retains their copyright and license notices.

- [Bodoni Moda official project description](https://github.com/google/fonts/blob/main/ofl/bodonimoda/DESCRIPTION.en_us.html)
  and [license](https://github.com/google/fonts/blob/main/ofl/bodonimoda/OFL.txt).
- [Lato designer site](https://www.latofonts.com/lato-free-fonts/)
  and [official source license](https://github.com/latofonts/lato-source/blob/master/LICENSE.txt).
- Actual hosted specimens: [Bodoni Moda](https://fonts.google.com/specimen/Bodoni+Moda)
  and [Lato](https://www.latofonts.com/lato-free-fonts/).

### 3. Domaine Display + Source Sans 3 — premium alternative

Domaine Display offers sharp, curved serif forms and triangular detailing
for a more distinctive crafted editorial register. Source Sans 3 preserves
the readable body register. The foundry supplies a real specimen for review.

Domaine requires an owner-approved paid web license for production. The
license covers the specified domain and a page-view or unique-user tier;
it permits the supplied WOFF2 web files and a secure related development
environment. Source Sans 3 remains OFL.

- [Domaine Display foundry specimen](https://klim.co.nz/fonts/domaine-display/).
- [Klim web-font license](https://klim.co.nz/licences/web-fonts/).
- [Klim test-font information](https://klim.co.nz/test-fonts/)
  and [Test Font Licence](https://klim.co.nz/licences/test-fonts/).

The hosted foundry specimen can be viewed without purchasing the font.
Installing a local Domaine test font would require the owner to accept the
Test Font Licence first. That license permits internal evaluation, excludes
commercial/public use and external distribution, and supplies limited
character sets. No test-font download or license acceptance has occurred.

### What can be reviewed now

The development specimen can show the token layer with existing typefaces,
and the official hosted specimens above show the actual shortlisted faces.
The two OFL pairs can later be used without a paid license, subject to their
notices and the owner's choice. The premium option is not embedded in the
local specimen. System-font studies must be labeled as fallback studies;
they cannot stand in as evidence of a shortlisted font's appearance.

## Owner decisions

- Approve or revise the six room temperatures and shared indigo field.
- Approve or revise type scale, reading comfort, texture restraint, gold
  lead-lines, focus treatment, and reduced-motion behavior.
- Select one of the three font pairs, or request another shortlist. Existing
  Playfair Display + DM Sans remains provisional until that decision.
- Approve Stage 1 before Stage 2 begins. Font selection does not itself
  authorize a premium purchase or acceptance of a test-font contract.

## Future stages — parked until their review gates open

| Stage | Work and required inputs |
|---|---|
| 2 — CloverMap | Derive the functional four-leaf clover and golden stem-point from the approved Master Sigil SVG. Preserve route mappings, keyboard navigation, and reduced-motion meaning. No unapproved emblem is substituted. |
| 3 — Player | Use an owner-supplied list of real, hosted Sandābādo catalog audio URLs. Audio is opt-in; no autoplay, invented tracks, playback URLs, or unreleased debut content. Status remains data-driven. |
| 4 — Generative field gallery | Build procedural data, sound, terrain, fire, and architectural wireframe works. Actual audio may drive spectra; verified terrain or environmental measurements may drive landscape parameters. Art direction may use clearly identified procedural parameters without presenting them as measured facts. No photographs, stock images, or photographic assets are requested or accepted. Provide an equivalent keyboard list view. |
| 5 — Design proof chamber | Build from reconciled TETRA/Trust Harness, Thermo Fisher, and Whole Body Studios data. Render procedural gold lead-line artefacts and diagrams from verified diagram inputs; do not invent architecture or outcomes. The tetrahedron remains exclusive to the Design room. No photography or photograph-based artefact rail. |

Each stage receives its own commit, successful full verification, push, and
owner review before the next stage proceeds. No later-stage implementation
is authorized merely by this roadmap.

## Truth discipline

Status labels remain verbatim and data-driven from `pillars.ts` and the
reconciliation. Metrics require owner-confirmed records; qualitative
outcomes remain qualified. Architect is the persona title; employment and
machine-parsed titles remain employer-verifiable. Credentials remain
intentionally deferred until verified values are supplied.

Generative scenes are art unless verified measurements support a factual
claim. No release, track, URL, diagram relationship, license, or asset is
invented. Existing public and private gate requirements remain in force.
No authentication secrets belong in this record. `main` remains untouched.

## Verification — passed locally, owner review pending

Verified on 5 October 2026 using Node 22.23.3. The final source includes
24px gold pane numerals, additional right-edge focus clearance, and a
1100px stacking breakpoint. Independent review identified the numeral
contrast and focus-clearance issues; both were corrected before the final
frozen-source suite. Earlier build/check evidence was retained.

| Check | Result |
|---|---|
| `npm run lint` | Passed. |
| `tsc --noEmit --incremental false --typeRoots ./node_modules/@types` | Passed; no canonical generated files changed. |
| `npm run design-system:validate` | Passed; six rooms and 80 solid-color contrast checks. Minimum normal-text ratio 6.17:1; minimum focus ratio 9.83:1. |
| Three isolated `next build` runs | Review, public gate, and portfolio passed with no build warnings/errors. |
| Three-server HTTP regression | 68/68 passed. |
| Copy/privacy boundaries | 31/31 passed. |
| Production security and reversibility | 25/25 passed. |
| Additional specimen access tests | 101/101 passed. |
| Browser checks | Specimen, Unity, all six pillars, retained résumé/design-system, Coming Soon, and password form rendered. Native anchors, skip link, keyboard focus, and script-blocked rendering passed. Normal browser consoles were empty of warnings/errors. |
| Responsive checks | Real 320px and 390px narrow views passed; 930px stacked layout and 1101px pane-focus clearance verified. Long room names fit at 320px. Desktop hero exceeds 120px. |
| Reduced motion | The exact CSS reduced-motion branch was activated in a script-blocked local proxy; transitions and smooth scrolling stopped while all six rooms remained available. No OS preference was changed. |
| Live token watch and cache isolation | A temporary field-color edit updated the specimen without manual navigation and synchronized to all three physical token mirrors. Original bytes were restored; separate build roots remained intact. |

All **225 HTTP/access checks** passed against the final production fixtures
and restarted dev servers. Production tests included valid synthetic owner
bypass and reviewer sessions, with positive control routes, then confirmed
that neither grants specimen access. They covered gate-on, gate-off, and
portfolio production profiles; GET/HEAD/POST/OPTIONS; encoded, trailing,
and child paths; forged Host/RSC/middleware headers; and emitted specimen
JavaScript. Gate/password dependencies contained no specimen layer. No
owner secret or password was used in those fixtures.

The browser verified actual foregrounds/backgrounds, 3% grain, 2.5% paper
texture, 24px numerals, and the gold 2px focus outline. A conservative
hover/glow composite gives the enlarged gold numerals at least 3.77:1,
above the 3:1 large-text threshold; focus remains above 6:1. Texture
overlays sit beneath text. These are scoped rendering/accessibility checks,
not a claim of full WCAG certification. The font stack and fallback
disclosure are verified; the shortlisted fonts are still external
specimens, not installed local faces.

Each build captured the same **109 runtime/config files**. Canonical files
remained unchanged. The sole portfolio snapshot rewrite was Next's
generated `next-env.d.ts` path from `.next/types/routes.d.ts` to
`.next-portfolio/types/routes.d.ts`; runtime source/config stayed equivalent.
After the live-edit probe, canonical hashes and all three token mirrors
again matched the checked source exactly.

Final local evidence is retained at
`/private/tmp/jgawlik-somatic-1-release/`: `summary.json`,
`source-equivalence.json`, `post-browser-source-equivalence.json`,
`access-suite-summary.json`, `browser-results.json`, build/check logs, and
the generated-type diff. Temporary QA code, mirrors, and synthetic values
stay outside tracked source. The normal `.dev/` wrappers remain ignored.

The specimen sits outside `(unity)`. Its tokens and scoped CSS do not
change the gate, password form, Unity Center, or retained site styling.
The development launcher now watches `tokens/` alongside `src/` and
`public/`. The public/private access systems and approved content data
remain unchanged. No deployment or `main` change is part of Stage 1.

Stage 1 commit label: `somatic-1-tokens`. Owner acceptance of palettes,
materials, type scale, and final font pairing remains open. Stage 2 stays
parked until that approval and the approved Master Sigil SVG are supplied.
