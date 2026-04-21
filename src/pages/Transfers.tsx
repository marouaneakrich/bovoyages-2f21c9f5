import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Check, Users, Briefcase } from "lucide-react";
import { VEHICLES } from "@/data/content";
import PriceTag from "@/components/PriceTag";
import SEO from "@/components/SEO";
import PageHero from "@/components/PageHero";

const Transfers = () => {
  const { t } = useTranslation();

  return (
    <>
      <SEO title={`${t("transfers.title")} — Bo Voyages`} description={t("transfers.subtitle")} />
      <PageHero eyebrow={t("sections.transfers_eyebrow")} title={t("transfers.title")} subtitle={t("transfers.subtitle")} />

      <section className="container-luxe py-10 md:py-14">
        <div className="grid gap-5 md:gap-6 sm:grid-cols-2 xl:grid-cols-2">
          {VEHICLES.map((v) => (
            <article key={v.slug} className="premium-card flex flex-col overflow-hidden">
              <div className="image-mask aspect-[16/9] bg-secondary">
                <img src={v.image} alt={t(`transfers.vehicles.${v.slug}.name`)} loading="lazy" decoding="async" className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6 md:p-7">
                <div className="flex items-start justify-between gap-3 sm:gap-4">
                  <div className="min-w-0">
                    <h3 className="font-serif text-xl font-medium leading-tight sm:text-2xl">{t(`transfers.vehicles.${v.slug}.name`)}</h3>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-muted-foreground sm:text-xs">
                      {t("transfers.best_for")}: {t(`transfers.vehicles.${v.slug}.best`)}
                    </p>
                  </div>
                  <PriceTag price={v.price} size="md" />
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3 text-sm sm:mt-6 sm:gap-4">
                  <div className="flex items-center gap-2 text-foreground/80">
                    <Users className="h-4 w-4 shrink-0 text-accent" />
                    <span className="truncate">{v.capacity} {t("transfers.capacity").toLowerCase()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground/80">
                    <Briefcase className="h-4 w-4 shrink-0 text-accent" />
                    <span className="truncate">{v.luggage}</span>
                  </div>
                </div>

                <ul className="mt-4 flex flex-wrap gap-2 sm:mt-5">
                  {v.features.map((f) => (
                    <li key={f} className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-[11px] text-foreground/80 sm:text-xs">
                      <Check className="h-3 w-3 text-accent" />
                      {t(`transfers.feat.${f}`)}
                    </li>
                  ))}
                </ul>

                <Link
                  to={`/booking?service=transfer&vehicle=${v.slug}`}
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:-translate-y-0.5 sm:mt-7"
                >
                  {t("transfers.request")}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};

export default Transfers;
