import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { TOURS } from "@/data/content";
import SEO from "@/components/SEO";
import PageHero from "@/components/PageHero";
import TourCard from "@/components/TourCard";
import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";

const Tours = () => {
  const { t } = useTranslation();
  const [city, setCity] = useState<string>("all");
  const [duration, setDuration] = useState<string>("all");

  const cities = useMemo(() => Array.from(new Set(TOURS.map((tt) => tt.city))), []);
  const durations: { key: string; label: string; test: (d: number) => boolean }[] = [
    { key: "all", label: t("tours.all"), test: () => true },
    { key: "short", label: "1–5", test: (d) => d <= 5 },
    { key: "mid", label: "6–8", test: (d) => d >= 6 && d <= 8 },
    { key: "long", label: "9+", test: (d) => d >= 9 },
  ];

  const filtered = TOURS.filter((tour) =>
    (city === "all" || tour.city === city) &&
    (durations.find((d) => d.key === duration)?.test(tour.days) ?? true)
  );

  return (
    <>
      <SEO title={`${t("tours.title")} — Bo Voyages`} description={t("tours.subtitle")} />
      <PageHero eyebrow={t("sections.tours_eyebrow")} title={t("tours.title")} subtitle={t("tours.subtitle")} />

      <section className="container-luxe py-14">
        <div className="mb-10 flex flex-wrap items-center gap-6 border-b border-border pb-6">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{t("tours.filter_city")}</span>
            <Pill active={city === "all"} onClick={() => setCity("all")}>{t("tours.all")}</Pill>
            {cities.map((c) => (
              <Pill key={c} active={city === c} onClick={() => setCity(c)}>{c}</Pill>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{t("tours.filter_duration")}</span>
            {durations.map((d) => (
              <Pill key={d.key} active={duration === d.key} onClick={() => setDuration(d.key)}>{d.label}</Pill>
            ))}
          </div>
        </div>

        <div className="grid gap-7 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((tour, i) => (
            <RevealItem key={tour.slug} delay={i}>
              <TourCard tour={tour} />
            </RevealItem>
          ))}
        </div>
      </section>
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
      "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
      active ? "border-primary bg-primary text-primary-foreground" : "border-border text-foreground/70 hover:bg-secondary"
    )}
  >
    {children}
  </button>
);

export default Tours;
