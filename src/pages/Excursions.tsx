import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { EXCURSIONS } from "@/data/content";
import PriceTag from "@/components/PriceTag";
import SEO from "@/components/SEO";
import PageHero from "@/components/PageHero";
import { cn } from "@/lib/utils";

const Excursions = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<"all" | "half_day" | "full_day">("all");
  const list = EXCURSIONS.filter((e) => filter === "all" || e.duration === filter);

  return (
    <>
      <SEO title={`${t("excursions.title")} — Bo Voyages`} description={t("excursions.subtitle")} />
      <PageHero eyebrow={t("sections.excursions_eyebrow")} title={t("excursions.title")} subtitle={t("excursions.subtitle")} />

      <section className="container-luxe py-14">
        <div className="mb-10 flex flex-wrap items-center gap-3 border-b border-border pb-6">
          <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{t("excursions.filter_duration")}</span>
          {(["all", "half_day", "full_day"] as const).map((k) => (
            <button
              key={k}
              onClick={() => setFilter(k)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                filter === k ? "border-primary bg-primary text-primary-foreground" : "border-border text-foreground/70 hover:bg-secondary"
              )}
            >
              {k === "all" ? t("tours.all") : t(`excursions.${k}`)}
            </button>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((ex) => (
            <Link key={ex.slug} to={`/excursions/${ex.slug}`} className="premium-card group">
              <div className="image-mask aspect-[4/3] bg-secondary">
                <img src={ex.image} alt={ex.name} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="p-6">
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{t(`excursions.${ex.duration}`)}</p>
                <h3 className="mt-2 font-serif text-xl font-medium leading-tight">{ex.name}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{ex.blurb}</p>
                <div className="mt-5 flex items-end justify-between">
                  <PriceTag price={ex.price} size="sm" />
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

export default Excursions;
