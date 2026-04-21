import { useState } from "react";
import { useTranslation } from "react-i18next";
import { EXCURSIONS } from "@/data/content";
import SEO from "@/components/SEO";
import PageHero from "@/components/PageHero";
import ExcursionCard from "@/components/ExcursionCard";
import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";

const Excursions = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<"all" | "half_day" | "full_day">("all");
  const list = EXCURSIONS.filter((e) => filter === "all" || e.duration === filter);

  return (
    <>
      <SEO title={`${t("excursions.title")} — Bo Voyages`} description={t("excursions.subtitle")} />
      <PageHero eyebrow={t("sections.excursions_eyebrow")} title={t("excursions.title")} subtitle={t("excursions.subtitle")} />

      <section className="container-luxe py-10 md:py-16 lg:py-20">
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
