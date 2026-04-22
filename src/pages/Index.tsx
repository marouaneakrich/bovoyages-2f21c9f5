import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowRight, Check, ShieldCheck, Clock, Star } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import { useCurrency } from "@/contexts/CurrencyContext";
import SEO from "@/components/SEO";
import HeroSearch from "@/components/HeroSearch";
import { TOURS, EXCURSIONS, VEHICLES, IMAGES } from "@/data/content";
import TourCard from "@/components/TourCard";
import ExcursionRail from "@/components/ExcursionRail";
import Marquee from "@/components/Marquee";
import Pillars from "@/components/sections/Pillars";
import Testimonials from "@/components/sections/Testimonials";
import hero from "@/assets/hero-atlas.jpg";

const Index = () => {
  const { t } = useTranslation();
  const { format } = useCurrency();
  const r1 = useReveal<HTMLDivElement>();
  const r2 = useReveal<HTMLDivElement>();
  const r3 = useReveal<HTMLDivElement>();
  const r4 = useReveal<HTMLDivElement>();
  const r5 = useReveal<HTMLDivElement>();

  const [activeVehicle, setActiveVehicle] = useState(VEHICLES[0].slug);
  const featured = VEHICLES.find((v) => v.slug === activeVehicle) ?? VEHICLES[0];
  const otherVehicles = VEHICLES.filter((v) => v.slug !== featured.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Bo Voyages",
    description: t("footer.tagline"),
    address: { "@type": "PostalAddress", addressLocality: "Agadir", addressCountry: "MA" },
    areaServed: "Morocco",
    priceRange: "$$",
  };

  return (
    <>
      <SEO
        title="Bo Voyages — Premium travel & private transfers in Morocco"
        description="Curated multi-day tours, signature excursions and premium private transfers across Morocco. 35+ years of trusted travel expertise."
        jsonLd={jsonLd}
      />

      {/* HERO */}
      <section className="relative min-h-[100svh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={hero}
            alt="Atlas mountains at golden hour"
            className="h-full w-full object-cover animate-ken-burns"
            width={1920}
            height={1080}
            decoding="async"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/70" />
        </div>

        <div className="container-luxe relative flex min-h-[100svh] flex-col justify-end pb-8 pt-28 text-primary-foreground sm:pt-32 md:pb-20">
          <div className="max-w-3xl animate-fade-in-up">
            <span className="eyebrow text-primary-foreground/80 [&::before]:bg-accent">
              {t("hero.eyebrow")}
            </span>
            <h1 className="display-1 mt-6 text-primary-foreground">
              {t("hero.title")}
              <em className="not-italic font-serif text-accent">{t("hero.title_em")}</em>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/85 md:text-lg">
              {t("hero.subtitle")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/booking"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-accent-foreground transition-all hover:bg-accent/90"
              >
                {t("hero.cta_primary")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180" />
              </Link>
              <Link
                to="/tours"
                className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 bg-transparent px-6 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10"
              >
                {t("hero.cta_secondary")}
              </Link>
            </div>
          </div>

          <div className="mt-8 sm:mt-12 md:mt-16">
            <HeroSearch />
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-border bg-background">
        <div className="container-luxe grid grid-cols-2 gap-6 py-8 sm:gap-8 sm:py-10 md:grid-cols-4">
          {[
            { v: "35+", k: "trust.years" },
            { v: "10k+", k: "trust.travelers" },
            { v: "25+", k: "trust.circuits" },
            { v: "4.9★", k: "trust.rating" },
          ].map((s) => (
            <div key={s.k} className="text-center md:text-start">
              <div className="font-serif text-3xl font-medium text-foreground sm:text-4xl md:text-5xl">{s.v}</div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:text-xs">{t(s.k)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* DESTINATION MARQUEE */}
      <section className="border-b border-border bg-background py-6 sm:py-8">
        <Marquee
          items={["Marrakech", "Essaouira", "Fes", "Chefchaouen", "Sahara", "Atlas", "Agadir", "Casablanca", "Tangier", "Merzouga"]}
        />
      </section>

      {/* WHO WE ARE — moved up, retitled */}
      <section className="relative overflow-hidden bg-primary py-20 text-primary-foreground md:py-28 lg:py-32">
        <div aria-hidden className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-accent/15 blur-3xl animate-float-slow" />
        <div aria-hidden className="pointer-events-none absolute bottom-0 -left-20 h-72 w-72 rounded-full bg-primary-glow/20 blur-3xl animate-float-slow" style={{ animationDelay: "3s" }} />

        <div className="container-luxe relative grid gap-12 md:gap-14 lg:grid-cols-12 lg:items-center">
          <div ref={r4} className="reveal order-2 lg:order-1 lg:col-span-6">
            <span className="eyebrow text-primary-foreground/70 [&::before]:bg-accent">
              {t("sections.story_eyebrow")}
            </span>
            <h2 className="display-2 mt-4 text-primary-foreground">
              {t("sections.story_title")}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-primary-foreground/85 md:text-lg">
              {t("sections.story_body")}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-primary-foreground/70 md:text-base">
              {t("sections.story_body_2")}
            </p>

            <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
              {[
                { v: t("sections.story_stat_1_v"), l: t("sections.story_stat_1_l") },
                { v: t("sections.story_stat_2_v"), l: t("sections.story_stat_2_l") },
                { v: t("sections.story_stat_3_v"), l: t("sections.story_stat_3_l") },
              ].map((s) => (
                <div key={s.l} className="story-stat">
                  <div className="font-serif text-2xl font-medium text-primary-foreground sm:text-3xl">{s.v}</div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.16em] text-primary-foreground/65 sm:text-[11px]">{s.l}</div>
                </div>
              ))}
            </div>

            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-all hover:bg-accent/90 hover:-translate-y-0.5"
            >
              {t("sections.story_cta")}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-6">
            <div className="relative grid grid-cols-5 grid-rows-6 gap-3 sm:gap-4">
              <div className="story-frame col-span-3 row-span-4 animate-float-slow">
                <img src={IMAGES.marrakech} alt="Marrakech medina" loading="lazy" className="story-img aspect-[3/4]" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">Marrakech</div>
                  <div className="font-serif text-base text-white">The red city</div>
                </div>
              </div>
              <div className="story-frame col-span-2 row-span-3 col-start-4 row-start-2 animate-float-slow" style={{ animationDelay: "1.5s" }}>
                <img src={IMAGES.sahara} alt="Sahara dunes" loading="lazy" className="story-img aspect-square" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <div className="text-[9px] font-semibold uppercase tracking-[0.2em] text-accent">Sahara</div>
                  <div className="font-serif text-sm text-white">Endless dunes</div>
                </div>
              </div>
              <div className="story-frame col-span-3 row-span-2 col-start-3 row-start-5 animate-float-slow" style={{ animationDelay: "2.5s" }}>
                <img src={IMAGES.chefchaouen} alt="Chefchaouen" loading="lazy" className="story-img aspect-[16/10]" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <div className="text-[9px] font-semibold uppercase tracking-[0.2em] text-accent">Chefchaouen</div>
                  <div className="font-serif text-sm text-white">The blue pearl</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TOURS */}
      <section className="py-20 md:py-28 lg:py-32">
        <div className="container-luxe">
          <div ref={r1} className="reveal flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <span className="eyebrow">{t("sections.tours_eyebrow")}</span>
              <h2 className="display-2 mt-5">{t("sections.tours_title")}</h2>
            </div>
            <Link to="/tours" className="link-underline text-sm font-medium">
              {t("sections.tours_cta")} →
            </Link>
          </div>

          <div className="mt-10 md:mt-14 grid gap-5 sm:gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {TOURS.slice(0, 3).map((tour, i) => (
              <RevealCard key={tour.slug} delay={i}>
                <TourCard tour={tour} />
              </RevealCard>
            ))}
          </div>
        </div>
      </section>

      {/* EXCURSIONS — bigger cards, marquee-style rail */}
      <section className="relative overflow-hidden bg-secondary/40 py-20 md:py-28 lg:py-32">
        <div aria-hidden className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-accent/10 blur-3xl animate-float-slow" />
        <div aria-hidden className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl animate-float-slow" style={{ animationDelay: "2s" }} />

        <div className="container-luxe relative">
          <div ref={r2} className="reveal flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <span className="eyebrow">{t("sections.excursions_eyebrow")}</span>
              <h2 className="display-2 mt-5">{t("sections.excursions_title")}</h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                {t("sections.excursions_subtitle")}
              </p>
            </div>
            <Link to="/excursions" className="link-underline text-sm font-medium">
              {t("sections.excursions_cta")} →
            </Link>
          </div>
        </div>

        {/* Full-bleed rail, fills empty desktop sides */}
        <div className="mt-10 md:mt-14">
          <ExcursionRail items={EXCURSIONS} />
        </div>
      </section>

      {/* TRANSFERS — high-conversion redesign */}
      <section className="relative overflow-hidden py-20 md:py-28 lg:py-32">
        {/* Animated bg blobs */}
        <div aria-hidden className="pointer-events-none absolute -top-24 left-1/4 h-80 w-80 rounded-full bg-accent/10 blur-3xl animate-float-slow" />
        <div aria-hidden className="pointer-events-none absolute -bottom-24 right-1/4 h-80 w-80 rounded-full bg-primary/10 blur-3xl animate-float-slow" style={{ animationDelay: "2.5s" }} />

        <div className="container-luxe relative" ref={r3}>
          {/* Header row */}
          <div className="reveal flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <span className="eyebrow">{t("sections.transfers_eyebrow")}</span>
              <h2 className="display-2 mt-5">{t("sections.transfers_title")}</h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                {t("sections.transfers_subtitle")}
              </p>
            </div>
            <div className="rounded-2xl border border-accent/30 bg-accent/10 px-5 py-4 text-start sm:text-end">
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {t("sections.transfers_from")}
              </div>
              <div className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
                {format(VEHICLES[0].price)}
              </div>
              <div className="text-xs text-muted-foreground">{t("sections.transfers_per_ride")}</div>
            </div>
          </div>

          {/* Featured glass card */}
          <div className="mt-10 md:mt-14 glass-card rounded-3xl overflow-hidden grid lg:grid-cols-2">
            <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[420px] overflow-hidden">
              <img
                key={featured.slug}
                src={featured.image}
                alt={t(`transfers.vehicles.${featured.slug}.name`)}
                className="absolute inset-0 h-full w-full object-cover animate-ken-burns"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <span className="chip-accent absolute right-4 top-4">
                {featured.capacity} <span className="opacity-80">seats</span>
              </span>
            </div>

            <div className="flex flex-col justify-between p-6 sm:p-8 md:p-10">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  {t(`transfers.vehicles.${featured.slug}.best`)}
                </p>
                <h3 className="mt-2 font-serif text-2xl font-medium text-foreground sm:text-3xl md:text-4xl">
                  {t(`transfers.vehicles.${featured.slug}.name`)}
                </h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-serif text-4xl font-bold text-foreground sm:text-5xl">
                    {format(featured.price)}
                  </span>
                  <span className="text-xs text-muted-foreground">{t("sections.transfers_per_ride")}</span>
                </div>

                <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {featured.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-foreground/85">
                      <Check className="h-4 w-4 text-accent shrink-0" />
                      {t(`transfers.feat.${f}`)}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                to={`/booking?service=transfer&vehicle=${featured.slug}`}
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-soft transition-all hover:bg-primary/90 hover:shadow-elegant hover:-translate-y-0.5"
              >
                {t("sections.transfers_book")}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
            </div>
          </div>

          {/* Secondary vehicle chips */}
          <div className="mt-6 flex flex-wrap gap-2.5">
            {otherVehicles.map((v) => (
              <button
                key={v.slug}
                onClick={() => setActiveVehicle(v.slug)}
                className="group inline-flex items-center gap-3 rounded-full border border-border bg-card px-4 py-2.5 text-sm transition-all hover:border-accent/60 hover:-translate-y-0.5 hover:shadow-soft"
              >
                <span className="font-medium">{v.capacity} pax</span>
                <span className="h-3 w-px bg-border" />
                <span className="font-serif font-semibold">{format(v.price)}</span>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 rtl:rotate-180" />
              </button>
            ))}
          </div>

          {/* Trust row */}
          <div className="mt-10 grid gap-3 sm:grid-cols-3 sm:gap-5">
            {[
              { icon: Clock, key: "sections.transfers_trust_cancel" },
              { icon: ShieldCheck, key: "sections.transfers_trust_insured" },
              { icon: Star, key: "sections.transfers_trust_rating" },
            ].map(({ icon: Icon, key }) => (
              <div key={key} className="flex items-center gap-3 rounded-2xl border border-border bg-card/60 px-4 py-3.5">
                <Icon className="h-5 w-5 text-accent shrink-0" />
                <span className="text-sm font-medium text-foreground/85">{t(key)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY TRAVEL WITH US */}
      <Pillars />

      {/* TESTIMONIALS */}
      <Testimonials />

      {/* NEWSLETTER */}
      <section ref={r5} className="reveal py-20 md:py-28">
        <div className="container-luxe">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="display-3">{t("sections.newsletter_title")}</h2>
            <p className="mt-4 text-muted-foreground">{t("sections.newsletter_body")}</p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                placeholder="you@example.com"
                className="flex-1 rounded-full border border-border bg-card px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                {t("sections.newsletter_cta")}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

const RevealCard = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`reveal stagger-${Math.min(delay + 1, 6)}`}>
      {children}
    </div>
  );
};

export default Index;
