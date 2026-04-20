# Elevate Tour & Excursion Cards — Immersive, Conversion-Focused

Redesign the cards in **Signature Circuits** (home + Tours page) and **Day Excursions** (home + Excursions page) into cinematic, image-forward "poster" cards with overlay metadata, richer motion, and stronger conversion cues — without the tilt/parallax movement on hover.

## Card redesign — visual

**Tour cards (Signature Circuits)**

- Taller cinematic aspect (4/5 → 3/4 on home, full-bleed image fills card).
- City + duration **moved on top of the image** as floating chips:
  - Top-left: city pill (glass, blurred, ivory text).
  - Top-right: duration pill (saffron accent, e.g. "12 days").
- Bottom gradient scrim (transparent → deep blue/black) for legibility.
- Title + blurb sit **over the image** at the bottom in white serif.
- Price row: large saffron price, "from / per person" small caps, and a circular arrow CTA button that subtly pulses.
- Optional ribbon for "Bestseller" / "New" / "Limited dates" on top tours (Grand Tour, Imperial Cities) — drives urgency.

**Excursion cards (Day Excursions)**

- Square → 4/5 poster format, image full-bleed.
- Top-left: duration chip ("Half day" / "Full day") in glass style.
- Top-right: small saffron price tag (always visible, easy to compare).
- Bottom: serif title + one-line blurb over gradient scrim.
- Hover reveals a "View experience →" pill sliding up from the bottom.

## Motion (no tilt, no card movement)

Inspired by `reactbits.dev/tilted-card` look, but **static position** — the card itself does not translate or rotate on hover. Instead:

- **Image-only Ken Burns**: slow scale (1 → 1.08) + 2px pan inside the mask.
- **Scrim deepens** on hover (gradient opacity rises) so text pops more.
- **Sheen sweep**: a soft diagonal light gradient sweeps across the image once on hover (1s).
- **Chips lift**: city/duration chips fade-up 4px on hover.
- **CTA pill reveal**: bottom "View →" pill slides up from below the title.
- **Price pulse**: saffron price gets a one-time subtle glow on card enter-viewport.
- **Stagger reveal on scroll**: cards fade-up sequentially (50ms stagger) using existing `useReveal` + a new `.stagger-*` delay utility.
- **Focus-visible ring** in saffron for keyboard users.
- All motion respects `prefers-reduced-motion` (already handled globally).

## Readability & trust upgrades

- WCAG-AA contrast: bottom scrim from `hsl(220 40% 8% / 0)` → `hsl(220 40% 8% / 0.85)`, white text + `text-shadow` for safety on bright photos.
- Consistent chip system (glass, 12px uppercase tracked) used across both card types.
- Price always top-right on excursions and bottom on tours — predictable scanning.
- Number of highlights/dot-separator on tours ("Atlas · Sahara · Fes") under title for instant value.

## Conversion ideas (recommendations)

1. **Urgency ribbon** on 1–2 tours: "Most booked" (Grand Tour), "Selling fast" (Imperial Cities).
2. **Social proof** micro-line under price: "★ 4.9 · 120+ travelers" (config-driven, optional per item).
3. **Quick "Request quote" shortcut** on hover — secondary text link beside main arrow, deep-linking into `/booking?tour=<slug>`.
4. **"Save / wishlist" heart** in top-right corner (localStorage-only, no backend) so visitors can shortlist on mobile.
5. **"From" price anchoring** — show original/strikethrough only if a real promo exists; otherwise just "from $XXX" (no fake discounts — keeps trust).
6. Ribbon copy is i18n-driven (EN/FR/AR keys).

## Files to change

- `src/index.css` — add `.poster-card`, `.chip-glass`, `.chip-accent`, `.scrim-bottom`, `.sheen`, `.stagger-1..6` utilities; refine `.image-mask` Ken Burns.
- `src/components/TourCard.tsx` *(new)* — reusable poster card for tours with overlay chips, ribbon, price, CTA.
- `src/components/ExcursionCard.tsx` *(new)* — reusable poster card for excursions.
- `src/pages/Index.tsx` — replace inline tour/excursion cards with new components, add stagger reveal.
- `src/pages/Tours.tsx` — use `TourCard` in grid.
- `src/pages/Excursions.tsx` — use `ExcursionCard` in grid.
- `src/data/content.ts` — optional `badge?: 'bestseller' | 'new' | 'limited'`, `rating?`, `reviews?` fields on a couple of items.
- `src/i18n/locales/{en,fr,ar}.json` — keys: `cards.bestseller`, `cards.selling_fast`, `cards.most_booked`, `cards.view_experience`, `cards.request_quote`, `cards.save`.

## Questions for you

1. **Ribbons** — want me to add "Most booked" / "Selling fast" badges on top tours, or keep cards purely editorial without urgency tags? no
2. **Wishlist heart** — include the save-to-wishlist (localStorage) on cards, or skip? yes do it 
3. **Ratings line** — show "★ 4.9 · 120+ travelers" under price (you provide real numbers later), or omit until real reviews exist? omit it   
4. make everything more readable i mean spationly on those sections and make the price Bald 

Reply with answers (or "go ahead with all") and I'll implement.