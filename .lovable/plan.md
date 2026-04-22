

# Refine Home Sections + Add Currency Switcher

Four focused changes: bigger excursion cards, reorder so "Who we are" comes right after the destination marquee, restyle Private Transfers to be more conversion-focused, and add a global currency switcher (USD / EUR / MAD / GBP).

---

## 1. Currency switcher (global)

A new global currency context lets every price on the site re-render in the chosen currency.

- **New file:** `src/contexts/CurrencyContext.tsx` — provider with `currency`, `setCurrency`, and a `format(amount)` helper. Persists choice to `localStorage`.
- **Supported currencies:** USD ($), EUR (€), MAD (DH), GBP (£). Static conversion rates stored in the context (base = USD, since current prices are in `$`). Editable in one place later.
- **Switcher UI:** small dropdown chip in the `Header` next to the language switcher. Shows current symbol + code (e.g. `$ USD`). On change, all prices update instantly.
- **Wire-in:** wrap app in `<CurrencyProvider>` in `src/main.tsx` (or `App.tsx`). Update `src/components/PriceTag.tsx` and `src/components/ExcursionCard.tsx` (which formats inline) to use `useCurrency().format(price)` instead of the hardcoded `CURRENCY` constant. Keep `CURRENCY` export for backward compat but stop using it in card UIs.
- **Mobile:** dropdown collapses into the existing mobile menu sheet.

---

## 2. Reorder home sections — "Who we are" right after marquee

New home order:

1. Hero
2. Trust strip
3. Destination marquee
4. **Who we are** (was "Our craft" — moved up + retitled)
5. Tours (Signature circuits)
6. Day excursions (now bigger cards)
7. Private transfers (redesigned)
8. Why travel with us (Pillars)
9. Testimonials
10. Newsletter

The story section keeps its dark-primary background, image collage, stats, and CTA — only its **title becomes "Who we are"** (`sections.story_title` updated in `en.json`, `fr.json` → "Qui sommes-nous", `ar.json` → "من نحن"). Eyebrow stays as a small label above.

---

## 3. Day excursions — bigger, marquee-style

Currently 4-column on desktop with small cards. New approach: **a horizontal "marquee-style" rail** of larger excursion cards that auto-scrolls slowly and pauses on hover, with manual drag/scroll on touch. Inspired by the destination marquee but for real cards (image + price + name + CTA), not just text.

- New component: `src/components/ExcursionRail.tsx` — duplicates the items twice for seamless loop, uses CSS `animation: marquee-scroll Xs linear infinite`, `:hover { animation-play-state: paused }`.
- Card size increases: `min-w-[280px] sm:min-w-[340px] md:min-w-[380px]` with taller `aspect-[3/4]`.
- Edge fade masks (left/right gradient) so cards "appear" out of the page edges — fills empty desktop sides and avoids the rigid grid feel.
- On mobile: same rail, swipeable, snap-x.
- The 4-card grid is replaced by the rail showing **all 8 excursions** (more inventory visible = more conversion).
- Existing `ExcursionCard` is reused as-is (already has the right look).

---

## 4. Private transfers — high-conversion redesign

Make this section the strongest sales pitch on the page.

**Layout (desktop):**

```text
┌──────────────────────────────────────────────────────────┐
│  [eyebrow]                                                │
│  Private transfers, on your schedule.    [Big price hook] │
│  subtitle                                from $49 / ride  │
│                                                            │
│  ┌─ Featured vehicle (large, glass card) ──────────────┐  │
│  │  [hero img w/ ken-burns]   Mercedes Minibus · 7 pax │  │
│  │                            ✓ AC  ✓ Wi-Fi  ✓ Water   │  │
│  │                            ✓ English-speaking driver│  │
│  │                            [ Book this transfer → ] │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                            │
│  Other vehicles:  [10pax] [25pax] [48pax]   (small chips) │
│                                                            │
│  ━━━━━ Trust row ━━━━━                                    │
│  ⏱ Free 24h cancel │ 🛡 Insured fleet │ ⭐ 4.9 / 5      │
└──────────────────────────────────────────────────────────┘
```

**Key upgrades:**
- **Hero vehicle card** — first vehicle gets an oversized glass-morphism card with a ken-burns image, large price, full feature list, and a magnetic "Book this transfer" CTA. This is the eye magnet.
- **Compact secondary vehicles** — remaining 3 vehicles render as horizontal pill chips (`capacity + price`) below the hero card, each clickable to swap into the hero spot (state on click) or jump straight to booking. Less visual noise, more focus.
- **Trust row** — three quick reassurance items (free cancellation, insured fleet, rating) directly under the card to reduce booking hesitation.
- **Animated background** — soft drifting accent blobs (already in the codebase via `animate-float-slow`) behind the section for depth.
- **Sticky price hook** in the headline area: "From {format(49)} / one-way ride" using the new currency context, so the price changes when the user switches currency.

---

## 5. Files touched

**New:**
- `src/contexts/CurrencyContext.tsx`
- `src/components/CurrencySwitcher.tsx`
- `src/components/ExcursionRail.tsx`

**Edited:**
- `src/main.tsx` — wrap in `<CurrencyProvider>`
- `src/components/Header.tsx` — add `<CurrencySwitcher />` (desktop + mobile menu)
- `src/components/PriceTag.tsx` — use `useCurrency().format()`
- `src/components/ExcursionCard.tsx` — use `useCurrency().format()`
- `src/pages/Index.tsx` — reorder sections, swap excursion grid → rail, replace transfers section with new layout
- `src/index.css` — `.marquee-scroll` keyframes for the excursion rail, `.glass-card` for the featured vehicle
- `src/i18n/locales/{en,fr,ar}.json` — add `sections.who_title` ("Who we are"/"Qui sommes-nous"/"من نحن"), transfer trust-row keys, "from X / ride" key, currency switcher labels

No breaking changes to existing components — `CURRENCY` constant remains exported for any code I haven't updated.

