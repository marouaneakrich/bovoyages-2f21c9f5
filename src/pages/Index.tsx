import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import SEO from "@/components/SEO";
import HeroSearch from "@/components/HeroSearch";
import { TOURS, EXCURSIONS, VEHICLES, IMAGES } from "@/data/content";
import PriceTag from "@/components/PriceTag";
import TourCard from "@/components/TourCard";
import ExcursionCard from "@/components/ExcursionCard";
import hero from "@/assets/hero-atlas.jpg";

const Index = () => {
  const { t } = useTranslation();
  const r1 = useReveal<HTMLDivElement>();
  const r2 = useReveal<HTMLDivElement>();
  const r3 = useReveal<HTMLDivElement>();
  const r4 = useReveal<HTMLDivElement>();
  const r5 = useReveal<HTMLDivElement>();

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

      {/* EXCURSIONS */}
      <section className="relative overflow-hidden bg-secondary/40 py-20 md:py-28 lg:py-32">
        {/* decorative shimmer */}
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

          <div className="mt-10 md:mt-14 grid gap-4 sm:gap-5 md:gap-7 grid-cols-2 lg:grid-cols-4">
            {EXCURSIONS.slice(0, 4).map((ex, i) => (
              <RevealCard key={ex.slug} delay={i}>
                <ExcursionCard ex={ex} />
              </RevealCard>
            ))}
          </div>
        </div>
      </section>

      {/* TRANSFERS */}
      <section className="relative py-20 md:py-28 lg:py-32">
        <div className="container-luxe grid gap-10 md:gap-12 lg:grid-cols-12 lg:items-center">
          <div ref={r3} className="reveal lg:col-span-5">
            <span className="eyebrow">{t("sections.transfers_eyebrow")}</span>
            <h2 className="display-2 mt-4">{t("sections.transfers_title")}</h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
              {t("sections.transfers_subtitle")}
            </p>

            {/* Inline feature pills */}
            <ul className="mt-7 flex flex-wrap gap-2">
              {[
                "transfers_feat_ac",
                "transfers_feat_wifi",
                "transfers_feat_water",
                "transfers_feat_eng",
              ].map((k) => (
                <li key={k} className="v-feature">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {t(`sections.${k}`)}
                </li>
              ))}
            </ul>

            <Link
              to="/transfers"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-soft transition-all hover:bg-primary/90 hover:shadow-elegant hover:-translate-y-0.5"
            >
              {t("sections.transfers_cta")}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2">
              {VEHICLES.map((v, i) => (
                <RevealCard key={v.slug} delay={i}>
                  <Link
                    to={`/booking?service=transfer&vehicle=${v.slug}`}
                    className="vehicle-card group block"
                    aria-label={t(`transfers.vehicles.${v.slug}.name`)}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
                      <img
                        src={v.image}
                        alt={t(`transfers.vehicles.${v.slug}.name`)}
                        loading="lazy"
                        className="v-img"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      <span className="chip-accent absolute right-3 top-3">
                        {v.capacity} <span className="opacity-80">seats</span>
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-4 sm:p-5">
                      <h3 className="font-serif text-lg font-medium leading-tight">
                        {t(`transfers.vehicles.${v.slug}.name`)}
                      </h3>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                        {t(`transfers.vehicles.${v.slug}.best`)}
                      </p>
                      <div className="mt-4 flex items-end justify-between gap-3">
                        <PriceTag price={v.price} size="sm" />
                        <span className="link-underline text-sm font-medium text-foreground/80 group-hover:text-foreground">
                          {t("transfers.request")} →
                        </span>
                      </div>
                    </div>
                  </Link>
                </RevealCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STORY — Our craft */}
      <section className="relative overflow-hidden bg-primary py-20 text-primary-foreground md:py-28 lg:py-32">
        {/* decorative grain / glow */}
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

            {/* Stats row */}
            <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
              {[
                { v: t("sections.story_stat_1_v"), l: t("sections.story_stat_1_l") },
                { v: t("sections.story_stat_2_v"), l: t("sections.story_stat_2_l") },
                { v: t("sections.story_stat_3_v"), l: t("sections.story_stat_3_l") },
              ].map((s) => (
                <div key={s.l} className="story-stat">
                  <div className="font-serif text-2xl font-medium text-primary-foreground sm:text-3xl">
                    {s.v}
                  </div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.16em] text-primary-foreground/65 sm:text-[11px]">
                    {s.l}
                  </div>
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

          {/* Image collage */}
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
