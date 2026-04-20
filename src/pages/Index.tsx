import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import SEO from "@/components/SEO";
import HeroSearch from "@/components/HeroSearch";
import { TOURS, EXCURSIONS, VEHICLES, IMAGES } from "@/data/content";
import PriceTag from "@/components/PriceTag";
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
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/70" />
        </div>

        <div className="container-luxe relative flex min-h-[100svh] flex-col justify-end pb-12 pt-32 text-primary-foreground md:pb-20">
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

          <div className="mt-12 md:mt-16">
            <HeroSearch />
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-border bg-background">
        <div className="container-luxe grid grid-cols-2 gap-8 py-10 md:grid-cols-4">
          {[
            { v: "35+", k: "trust.years" },
            { v: "10k+", k: "trust.travelers" },
            { v: "25+", k: "trust.circuits" },
            { v: "4.9★", k: "trust.rating" },
          ].map((s) => (
            <div key={s.k} className="text-center md:text-start">
              <div className="font-serif text-4xl font-medium text-foreground md:text-5xl">{s.v}</div>
              <div className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">{t(s.k)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TOURS */}
      <section className="py-20 md:py-28">
        <div className="container-luxe">
          <div ref={r1} className="reveal flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <span className="eyebrow">{t("sections.tours_eyebrow")}</span>
              <h2 className="display-2 mt-4">{t("sections.tours_title")}</h2>
            </div>
            <Link to="/tours" className="link-underline text-sm font-medium">
              {t("sections.tours_cta")} →
            </Link>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {TOURS.slice(0, 3).map((tour) => (
              <Link key={tour.slug} to={`/tours/${tour.slug}`} className="premium-card group">
                <div className="image-mask aspect-[4/5] bg-secondary">
                  <img src={tour.image} alt={tour.name} loading="lazy" className="h-full w-full object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    <span>{tour.city}</span>
                    <span>{tour.days} {t("tours.days")}</span>
                  </div>
                  <h3 className="mt-3 font-serif text-2xl font-medium leading-tight">{tour.name}</h3>
                  <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{tour.blurb}</p>
                  <div className="mt-5 flex items-end justify-between">
                    <PriceTag price={tour.price} prefix={t("tours.from_price")} suffix={t("tours.per_person")} size="sm" />
                    <span className="text-sm font-medium text-foreground link-underline">{t("tours.view")} →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* EXCURSIONS */}
      <section className="bg-secondary/40 py-20 md:py-28">
        <div className="container-luxe">
          <div ref={r2} className="reveal flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <span className="eyebrow">{t("sections.excursions_eyebrow")}</span>
              <h2 className="display-2 mt-4">{t("sections.excursions_title")}</h2>
            </div>
            <Link to="/excursions" className="link-underline text-sm font-medium">
              {t("sections.excursions_cta")} →
            </Link>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {EXCURSIONS.slice(0, 4).map((ex) => (
              <Link key={ex.slug} to={`/excursions/${ex.slug}`} className="group block">
                <div className="image-mask aspect-square overflow-hidden rounded-2xl bg-card">
                  <img src={ex.image} alt={ex.name} loading="lazy" className="h-full w-full object-cover" />
                </div>
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-serif text-lg font-medium leading-tight">{ex.name}</h3>
                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                      {t(`excursions.${ex.duration}`)}
                    </p>
                  </div>
                  <PriceTag price={ex.price} size="sm" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TRANSFERS */}
      <section className="py-20 md:py-28">
        <div className="container-luxe grid gap-12 lg:grid-cols-12 lg:items-center">
          <div ref={r3} className="reveal lg:col-span-5">
            <span className="eyebrow">{t("sections.transfers_eyebrow")}</span>
            <h2 className="display-2 mt-4">{t("sections.transfers_title")}</h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
              {t("sections.transfers_subtitle")}
            </p>
            <Link
              to="/transfers"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              {t("sections.transfers_cta")}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-2">
              {VEHICLES.map((v) => (
                <div key={v.slug} className="premium-card flex flex-col">
                  <div className="image-mask aspect-[16/10] bg-secondary">
                    <img src={v.image} alt={t(`transfers.vehicles.${v.slug}.name`)} loading="lazy" className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 p-5">
                    <h3 className="font-serif text-lg font-medium">{t(`transfers.vehicles.${v.slug}.name`)}</h3>
                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                      {t(`transfers.vehicles.${v.slug}.best`)}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <PriceTag price={v.price} size="sm" />
                      <Link to={`/booking?service=transfer&vehicle=${v.slug}`} className="link-underline text-sm font-medium">
                        {t("transfers.request")} →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="bg-primary py-24 text-primary-foreground md:py-32">
        <div className="container-luxe grid gap-12 lg:grid-cols-12 lg:items-center">
          <div ref={r4} className="reveal lg:col-span-6">
            <span className="eyebrow text-primary-foreground/70 [&::before]:bg-accent">{t("sections.story_eyebrow")}</span>
            <h2 className="display-2 mt-4 text-primary-foreground">{t("sections.story_title")}</h2>
            <p className="mt-6 text-base leading-relaxed text-primary-foreground/80 md:text-lg">
              {t("sections.story_body")}
            </p>
            <Link to="/about" className="mt-8 inline-block link-underline text-sm font-medium text-accent">
              {t("nav.about")} →
            </Link>
          </div>
          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-4">
              <img src={IMAGES.marrakech} alt="Marrakech" loading="lazy" className="aspect-[3/4] rounded-2xl object-cover" />
              <img src={IMAGES.sahara} alt="Sahara" loading="lazy" className="aspect-[3/4] rounded-2xl object-cover translate-y-8" />
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

export default Index;
