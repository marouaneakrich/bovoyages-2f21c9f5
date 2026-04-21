import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { TOURS } from "@/data/content";
import SEO from "@/components/SEO";
import PageHero from "@/components/PageHero";
import TourCard from "@/components/TourCard";
import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";
import FAQ from "@/components/sections/FAQ";
import CTAStrip from "@/components/sections/CTAStrip";
import Marquee from "@/components/Marquee";
import { Sparkles, MapPinned, MessagesSquare } from "lucide-react";

const Tours = () => {
  const { t } = useTranslation();
  const [city, setCity] = useState<string>("all");
  const [duration, setDuration] = useState<string>("all");
  const r = useReveal<HTMLDivElement>();

  const cities = useMemo(() => Array.from(new Set(TOURS.map((tt) => tt.city))), []);
  const durations: { key: string; label: string; test: (d: number) => boolean }[] = [
    { key: "all", label: t("tours.all"), test: () => true },
    { key: "short", label: "1–5", test: (d) => d <= 5 },
    { key: "mid", label: "6–8", test: (d) => d >= 6 && d <= 8 },
    { key: "long", label: "9+", test: (d) => d >= 9 },
  ];

  const filtered = TOURS.filter(
    (tour) =>
      (city === "all" || tour.city === city) &&
      (durations.find((d) => d.key === duration)?.test(tour.days) ?? true)
  );

  const featured = TOURS[0];

  const steps = [
    { icon: MessagesSquare, title: "We listen", body: "A short call or email — what you love, your pace, who you're travelling with." },
    { icon: MapPinned, title: "We shape the route", body: "Hand-built itinerary, the right stays, the right guide for each city." },
    { icon: Sparkles, title: "You travel", body: "We hold the threads — driver, riads, support — so you can be present." },
  ];

  return (
    <>
      <SEO title={`${t("tours.title")} — Bo Voyages`} description={t("tours.subtitle")} />
      <PageHero eyebrow={t("sections.tours_eyebrow")} title={t("tours.title")} subtitle={t("tours.subtitle")} />

      {/* MARQUEE */}
      <section className="border-y border-border bg-background py-5">
        <Marquee items={["Imperial Cities", "Sahara Loop", "Atlas Crossing", "Atlantic Coast", "Northern Jewels"]} speed={45} />
      </section>

      {/* FILTERS + GRID */}
      <section className="container-luxe py-10 md:py-14">
        <div className="mb-8 space-y-4 border-b border-border pb-5 md:mb-10 md:pb-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
            <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:text-xs">{t("tours.filter_city")}</span>
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
              <Pill active={city === "all"} onClick={() => setCity("all")}>{t("tours.all")}</Pill>
              {cities.map((c) => (
                <Pill key={c} active={city === c} onClick={() => setCity(c)}>{c}</Pill>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
            <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:text-xs">{t("tours.filter_duration")}</span>
            <div className="flex flex-wrap gap-2">
              {durations.map((d) => (
                <Pill key={d.key} active={duration === d.key} onClick={() => setDuration(d.key)}>{d.label}</Pill>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-5 sm:gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((tour, i) => (
            <RevealItem key={tour.slug} delay={i}>
              <TourCard tour={tour} />
            </RevealItem>
          ))}
        </div>
      </section>

      {/* HOW A TOUR IS BUILT */}
      <section className="bg-secondary/40 py-20 md:py-28">
        <div className="container-luxe">
          <div ref={r} className="reveal mx-auto max-w-2xl text-center">
            <span className="eyebrow justify-center">How a tour is built</span>
            <h2 className="display-2 mt-5">Three quiet steps from idea to road.</h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-3 lg:gap-8">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <RevealItem key={s.title} delay={i}>
                  <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-elegant md:p-8">
                    <div className="sheen" />
                    <div className="font-serif text-5xl font-medium text-accent/30 sm:text-6xl">0{i + 1}</div>
                    <div className="mt-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent transition-transform group-hover:rotate-6">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 font-serif text-xl">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                  </div>
                </RevealItem>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED SPOTLIGHT */}
      <section className="container-luxe py-20 md:py-28">
        <RevealItem>
          <div className="grid items-stretch gap-0 overflow-hidden rounded-3xl border border-border bg-card md:grid-cols-2">
            <div className="image-mask aspect-[4/3] md:aspect-auto">
              <img src={featured.image} alt={featured.name} loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-10 md:p-12">
              <span className="eyebrow">Featured circuit</span>
              <h2 className="display-3 mt-4">{featured.name}</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">{featured.blurb}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {featured.highlights.map((h) => (
                  <li key={h} className="rounded-full bg-secondary px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-foreground/70">
                    {h}
                  </li>
                ))}
              </ul>
              <a href={`/tours/${featured.slug}`} className="mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:-translate-y-0.5">
                {t("tours.view")} →
              </a>
            </div>
          </div>
        </RevealItem>
      </section>

      {/* FAQ */}
      <FAQ
        items={[
          { q: "Are your tours private or in groups?", a: "All circuits are private — your party only, with a dedicated driver-guide. No shared groups, no rigid timetables." },
          { q: "How far in advance should I book?", a: "For peak season (Sept–April), 6–10 weeks ahead is ideal. We can sometimes accommodate shorter notice — just ask." },
          { q: "Can you adapt an itinerary?", a: "Yes — every tour is a starting point. Tell us what to add, remove, or slow down, and we will rebuild it for you." },
          { q: "What's included in the price?", a: "Private vehicle and driver, fuel, all transfers between cities, and our 24/7 support. Stays and meals are quoted separately so you can choose your style." },
        ]}
      />

      <CTAStrip
        title="Ready to shape your circuit?"
        subtitle="Tell us where you'd love to go. We'll send a hand-built proposal within 24 hours."
        ctaLabel="Request a quote"
      />
    </>
  );
};

const RevealItem = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`reveal stagger-${Math.min((delay % 6) + 1, 6)}`}>
      {children}
    </div>
  );
};

const Pill = ({ active, onClick, children }: { active?: boolean; onClick?: () => void; children: React.ReactNode }) => (
  <button
    onClick={onClick}
    className={cn(
      "shrink-0 whitespace-nowrap rounded-full border px-3.5 py-2 text-xs font-medium transition-colors",
      active ? "border-primary bg-primary text-primary-foreground" : "border-border text-foreground/70 hover:bg-secondary"
    )}
  >
    {children}
  </button>
);

export default Tours;
