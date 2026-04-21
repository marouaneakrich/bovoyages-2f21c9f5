import { useState } from "react";
import { useTranslation } from "react-i18next";
import { EXCURSIONS } from "@/data/content";
import SEO from "@/components/SEO";
import PageHero from "@/components/PageHero";
import ExcursionCard from "@/components/ExcursionCard";
import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";
import FAQ from "@/components/sections/FAQ";
import CTAStrip from "@/components/sections/CTAStrip";
import { Sun, Sunset, MapPin, Compass, Camera, Coffee } from "lucide-react";

const Excursions = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<"all" | "half_day" | "full_day">("all");
  const list = EXCURSIONS.filter((e) => filter === "all" || e.duration === filter);
  const r = useReveal<HTMLDivElement>();

  const tips = [
    { icon: Camera, title: "Bring a light layer", body: "Mornings can be cool, afternoons warm — soft cotton works best." },
    { icon: Coffee, title: "Eat lightly before", body: "Many stops include tea or a small meal — leave room for it." },
    { icon: Compass, title: "Trust your guide", body: "They know which corner of the medina is quietest at noon. Listen." },
    { icon: MapPin, title: "Travel slow", body: "Give each stop time to breathe. The best moments aren't on the brochure." },
  ];

  return (
    <>
      <SEO title={`${t("excursions.title")} — Bo Voyages`} description={t("excursions.subtitle")} />
      <PageHero eyebrow={t("sections.excursions_eyebrow")} title={t("excursions.title")} subtitle={t("excursions.subtitle")} />

      {/* FILTERS + GRID */}
      <section className="container-luxe py-10 md:py-16">
        <div className="mb-8 flex flex-col gap-3 border-b border-border pb-5 sm:flex-row sm:flex-wrap sm:items-center md:mb-12 md:pb-6">
          <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:text-xs">{t("excursions.filter_duration")}</span>
          <div className="flex flex-wrap gap-2">
            {(["all", "half_day", "full_day"] as const).map((k) => (
              <button
                key={k}
                onClick={() => setFilter(k)}
                className={cn(
                  "shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors",
                  filter === k ? "border-primary bg-primary text-primary-foreground" : "border-border text-foreground/70 hover:bg-secondary"
                )}
              >
                {k === "all" ? t("tours.all") : t(`excursions.${k}`)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:gap-6 md:gap-7 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((ex, i) => (
            <RevealItem key={ex.slug} delay={i}>
              <ExcursionCard ex={ex} />
            </RevealItem>
          ))}
        </div>
      </section>

      {/* HALF VS FULL DAY */}
      <section className="bg-secondary/40 py-20 md:py-28">
        <div className="container-luxe">
          <div ref={r} className="reveal mx-auto max-w-2xl text-center">
            <span className="eyebrow justify-center">Half day or full day?</span>
            <h2 className="display-3 mt-5">A small choice that shapes your day.</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <RevealItem>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:shadow-elegant md:p-10">
                <div className="sheen" />
                <Sunset className="h-8 w-8 text-accent transition-transform group-hover:rotate-12" />
                <h3 className="mt-5 font-serif text-2xl">Half day · 4–5 hours</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  A morning souk walk, an afternoon valley drive — perfect when you want to keep the rest of the day open for the riad pool, the hammam, or simply nothing.
                </p>
              </div>
            </RevealItem>
            <RevealItem delay={1}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:shadow-elegant md:p-10">
                <div className="sheen" />
                <Sun className="h-8 w-8 text-accent transition-transform group-hover:rotate-12" />
                <h3 className="mt-5 font-serif text-2xl">Full day · 8–10 hours</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Reach further — a Berber village, a coastal drive, a mountain lake. Includes a long lunch in a hand-picked spot, then back before sunset.
                </p>
              </div>
            </RevealItem>
          </div>
        </div>
      </section>

      {/* TRAVEL TIPS */}
      <section className="container-luxe py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">Travel tips</span>
          <h2 className="display-3 mt-5">Small things, big difference.</h2>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {tips.map((tip, i) => {
            const Icon = tip.icon;
            return (
              <RevealItem key={tip.title} delay={i}>
                <div className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-elegant">
                  <Icon className="h-6 w-6 text-accent transition-transform group-hover:scale-110" />
                  <h3 className="mt-4 font-serif text-lg">{tip.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tip.body}</p>
                </div>
              </RevealItem>
            );
          })}
        </div>
      </section>

      {/* FAQ */}
      <FAQ
        eyebrow="Quick answers"
        items={[
          { q: "Where do excursions start from?", a: "All excursions depart from your hotel or riad in the Agadir / Souss-Massa area at no extra cost." },
          { q: "What's the minimum group size?", a: "There's no minimum — even one traveller. All excursions are private to your party." },
          { q: "Are meals included?", a: "Full-day excursions include a sit-down lunch at a hand-picked local spot. Half-day stops include tea or coffee." },
        ]}
      />

      <CTAStrip
        title="Add a day of magic to your stay."
        subtitle="Tell us your dates and we'll suggest the right excursions for your pace."
        ctaLabel="Plan an excursion"
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

export default Excursions;
