
# Bo Voyages — Editorial Luxury Redesign

A premium, full multi-page travel booking site grounded in Bo Voyages' real content (tours, excursions, transfers, prices, brand). Editorial-luxury aesthetic: large serif display headings, cinematic Morocco photography, generous whitespace, refined motion. Brand colors (blue, yellow, white) elevated with warm sand neutrals and an off-white paper background. Trilingual EN/FR/AR with full RTL support.

## Brand & design system
- **Palette (HSL tokens in `index.css`)**: deep brand blue, saffron yellow accent, ivory/paper background, sand neutrals, charcoal ink. Semantic tokens for surfaces, borders, muted text, accents — no hard-coded colors in components.
- **Type**: Display serif (e.g. Fraunces / Cormorant) for headlines; clean sans (Inter) for UI/body; Arabic-aware fallback for AR.
- **Motion**: subtle fade/slide-in on scroll, parallax hero, magnetic buttons, image reveal masks, animated underline links, smooth route transitions. Respects `prefers-reduced-motion`.
- **Components**: shared Header (transparent → solid on scroll, language switcher, sticky CTA), Footer, premium Card, Badge, PriceTag, Stepper, Trust strip.

## Pages & journey

1. **Home** — cinematic hero with Morocco imagery + integrated quick-search (Tours / Excursions / Transfers tabs, From → To, date, passengers). Trust strip (35+ years, 1000+ travelers, 25+ circuits). "Popular Tours" carousel, "Signature Excursions" grid, "Transfer fleet preview" (Minibus 7p · Minibus 10p · Coach 25p · Coach 48p with real prices), testimonials, editorial "Discover Morocco" storytelling block, newsletter, CTA.
2. **Tours** (list + detail) — filterable grid by departure city (Casablanca, Marrakech…) and duration. Detail page: hero gallery, itinerary timeline, inclusions, price card sticky on desktop, "Request this tour" CTA. Real prices preserved (Grand Tour $875.34, Imperial Cities $628.60, Pearl of the South $699.10, Jewel of the North $722.60, etc.).
3. **Excursions** (list + detail) — same pattern, real items and prices (Immouzer $35.25, Massa 4x4 $76.37, Tafraout & Tiznit $49.35, Tiout & Taroudant $52.87, Paradise Valley $32.31, Medina & Calèche $32.31, Crocoparc $21.15, Berber Massage $41.12).
4. **Transfers** — searchable route picker → vehicle comparison grid (Minibus 7p $49.35 · Minibus 10p $84.60 · Coach 25p $155.09 · Coach 48p $211.49) with capacity, luggage, features and clear "Best for" labels. "Compare vehicles" toggle.
5. **Booking flow (request-based)** — 3-step stepper:
   1. Trip details (service type, route/tour, date, passengers)
   2. Vehicle / option selection with live price summary sidebar
   3. Contact details + special requests → submit → branded confirmation page with reference number, WhatsApp + email follow-up CTAs.
6. **About** — brand story, 35+ years heritage, team, values, gallery.
7. **Contact** — form, WhatsApp deep link, phone, address, embedded map, hours.
8. **404** — branded.

## Booking backend (Lovable Cloud)
- `bookings` table: id, ref, service_type, tour_id?, route_from, route_to, vehicle?, date, passengers, name, email, phone, language, notes, status, created_at. RLS: insert open to anon (rate-limited via edge function), select restricted.
- Edge function `submit-booking`: validates with zod (lengths, email, phone), generates human-readable reference (e.g. `BV-7K3X`), stores row, optionally triggers email.
- All forms: zod schema client + server, length caps, sanitized inputs, `encodeURIComponent` for WhatsApp links.

## i18n & RTL
- `react-i18next` with EN/FR/AR JSON dictionaries (UI strings + content for tours/excursions/transfers).
- Language switcher in header, persisted in `localStorage`, syncs `<html lang>` and `dir="rtl"` for AR.
- Tailwind logical properties (`ms-*`, `me-*`, `ps-*`) and RTL-aware layout for nav, cards, stepper, carousels.

## Performance, SEO, accessibility
- Route-level code splitting, lazy images with blur placeholders, preloaded hero, font subset.
- Per-page `<title>`, meta description, OpenGraph, JSON-LD (`TravelAgency`, `TouristTrip`, `Offer` with real prices), hreflang for `/en` `/fr` `/ar`, sitemap + robots.
- Semantic landmarks, focus-visible rings, color contrast on brand blue/yellow checked, keyboard-navigable stepper and carousels, reduced-motion variant.

## Out of scope (this pass)
- Real online payment (kept as quote-request per your choice).
- Admin dashboard for bookings (can follow in a later phase).
