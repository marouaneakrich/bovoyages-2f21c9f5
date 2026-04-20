import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { TOURS } from "@/data/content";
import PriceTag from "@/components/PriceTag";
import SEO from "@/components/SEO";
import PageHero from "@/components/PageHero";
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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((tour) => (
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
                  <span className="link-underline text-sm font-medium">{t("tours.view")} →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
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
