

# Cinematic Polish — Animations, Custom Cursor, Loading Screen & Section Expansion

A premium upgrade pass: a branded loading screen with a flying white bird, a custom luxury cursor, advanced "ReactBits-style" motion across the site, and expanded layouts so every page has 7+ sections with no awkward empty desktop sides.

---

## 1. Brand loading screen (entry + page transitions)

A full-screen ivory/sand wash (slightly brownish: `hsl(35 35% 88%)`) with the **Bo Voyages white bird** as the centerpiece.

- Bird flies **left → right across the screen, exits, re-enters from the left**, wings flapping, on a perfectly seamless loop.
- Built with inline SVG (white bird silhouette, two wing paths) so wings can animate via CSS `transform: rotate` keyframes (flap ~280ms cycle).
- Body translates across screen (~3.5s loop) with a gentle sine-wave Y bob.
- Subtle "BO VOYAGES" wordmark fades in below at low opacity.
- **First visit:** shows for ~1.6s minimum, then fades out (400ms) once `window.load` fires.
- **Route changes:** quick 500ms wash (bird does one pass) so navigation feels cinematic, not jarring.
- Respects `prefers-reduced-motion` (static bird, quick fade).

Files: `src/components/LoadingScreen.tsx` (new), `src/components/BirdMark.tsx` (new SVG), `src/components/RouteTransition.tsx` (new), wired in `src/App.tsx` + `src/components/SiteLayout.tsx`.

---

## 2. Custom cursor (luxury editorial)

Two-layer cursor (desktop only — auto-disabled on touch):

- **Outer ring** — 32px hollow circle, saffron `hsl(var(--accent))`, lags behind by ~120ms (smooth follow via `requestAnimationFrame` + lerp).
- **Inner dot** — 6px solid ink dot, follows pointer 1:1.
- **Hover state** — over links/buttons/`[role="button"]`, ring scales to 56px, fills with low-opacity accent, inner dot hides. Over images, ring becomes a small "View" pill.
- **Click state** — quick scale-down pulse.
- Native cursor hidden via `cursor: none` on `html` (only when custom cursor is active).
- Skipped entirely on `(hover: none)` / `(pointer: coarse)` — mobile keeps native touch.

Files: `src/components/CustomCursor.tsx` (new), mounted once in `SiteLayout`.

---

## 3. Animation system upgrade (ReactBits-inspired, hand-built)

We rebuild the equivalents in-house (no external dep, lighter, brand-tuned). Added to `src/index.css` + new hook files:

- **SplitText reveal** — headings split per word, each word fades up + slight blur-out → blur-in (60ms stagger). Used on every `display-1/2/3`.
- **Magnetic buttons** — primary CTAs subtly pull toward the cursor within a 60px radius (`MagneticButton.tsx`).
- **Marquee strip** — endless horizontal scroll for trust logos / destination names ("MARRAKECH · ESSAOUIRA · FES · CHEFCHAOUEN · SAHARA …") between sections.
- **Tilted image (no card-tilt)** — only background images get a 3-deg parallax follow on cursor (`useParallax` hook). Cards themselves stay still per your earlier direction.
- **ScrollFloat** — section eyebrows + numbers count-up when in view.
- **Shiny text** — animated gradient sheen on the hero accent word and section section eyebrows.
- **Aurora background** — soft animated gradient blobs behind dark sections (already partial — extend with multi-blob drift).
- **Image reveal mask** — clip-path wipe from bottom on hero/story images entering viewport.

---

## 4. Fix empty desktop sides

Three approaches mixed by section:

- **Side rail decor (left + right gutters)** on wide screens (≥1280px): vertical thin rule + rotated label ("EST. 1989 · AGADIR" / "MOROCCO 31°N 9°W"), small social icons stack, scroll-progress dot. Sits in the empty 6–10% gutters outside `.container-luxe`.
- **Asymmetric image bleed** — let select images bleed to viewport edge (full-bleed on right) on Tours / Story sections so there's no dead space.
- **Floating destination chips** (low opacity, parallax) drifting in the gutters on hero & excursions sections.
- A persistent **side scroll-progress indicator** (right gutter, vertical) showing journey through page.

Files: `src/components/SideRails.tsx` (new), `src/components/ScrollProgressRail.tsx` (new).

---

## 5. Every page → 7+ sections

Below is what each page gets. Existing sections kept; new ones marked **NEW**.

**Home (`/`)** — currently 7, polishing + 2 new = 9
1. Hero (split-text + magnetic CTA + parallax bg)
2. Trust strip (count-up numbers)
3. **NEW** Destination marquee (scrolling city names with thumbnails)
4. Signature circuits (Tours)
5. Day excursions
6. Private transfers
7. **NEW** "Why travel with us" — 4-pillar grid w/ icons + hover lift (Local guides · Curated stays · Flexible itineraries · 24/7 support)
8. Our craft (story + collage)
9. **NEW** Testimonials carousel (3 quotes, auto-fade)
10. Newsletter

**Tours (`/tours`)** → 7 sections: hero, filter bar, grid, **NEW** "How a tour is built" 3-step, **NEW** featured tour spotlight, **NEW** FAQ accordion, CTA strip.

**Excursions (`/excursions`)** → 7: hero, filters, grid, **NEW** "Half-day vs full-day" comparison, **NEW** popular pairings, **NEW** travel tips, CTA.

**Transfers (`/transfers`)** → 7: hero, vehicle grid, **NEW** routes & rates table, **NEW** included amenities, **NEW** booking process 3-step, FAQ, CTA.

**About (`/about`)** → 7: hero, story, **NEW** timeline (1989 → today), values, team intro, **NEW** awards/press strip, CTA.

**Contact (`/contact`)** → 7: hero, contact form, **NEW** office map/hours card, channels (WhatsApp/email/phone), **NEW** FAQ short, **NEW** office gallery, CTA.

**Tour/Excursion detail** → ensure 7 blocks: hero, overview, itinerary, included/excluded, gallery, **NEW** map & meeting point, **NEW** related tours, booking CTA.

All new sections animate in with split-text + scroll-reveal + stagger.

---

## 6. Performance & a11y safeguards

- All new motion respects `prefers-reduced-motion` (existing global rule already handles).
- Custom cursor + side rails only mount when `matchMedia('(hover: hover) and (pointer: fine)').matches` and viewport ≥ `lg`.
- Loading screen has 2.5s hard timeout fallback so it never blocks content.
- Bird SVG inlined (~1.5kb), no extra requests.
- IntersectionObserver re-used across animations to avoid duplicate observers.

---

## Files (summary)

**New:** `LoadingScreen.tsx`, `BirdMark.tsx`, `RouteTransition.tsx`, `CustomCursor.tsx`, `MagneticButton.tsx`, `SplitText.tsx`, `Marquee.tsx`, `SideRails.tsx`, `ScrollProgressRail.tsx`, `Testimonials.tsx`, `Pillars.tsx`, `FAQ.tsx`, `Timeline.tsx`, `useParallax.ts`, `useCountUp.ts`.

**Edited:** `src/App.tsx`, `src/components/SiteLayout.tsx`, `src/index.css` (add cursor/cursor-none, sheen, marquee, split-text, aurora keyframes), all page files in `src/pages/*` to add the new sections, `src/i18n/locales/{en,fr,ar}.json` (new keys for testimonials, pillars, FAQ, timeline, marquee).

