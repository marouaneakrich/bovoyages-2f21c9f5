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

      <section className="container-luxe py-14">
        <div className="grid gap-6 md:grid-cols-2">
          {VEHICLES.map((v) => (
            <article key={v.slug} className="premium-card flex flex-col overflow-hidden">
              <div className="image-mask aspect-[16/9] bg-secondary">
                <img src={v.image} alt={t(`transfers.vehicles.${v.slug}.name`)} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-1 flex-col p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-2xl font-medium">{t(`transfers.vehicles.${v.slug}.name`)}</h3>
                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                      {t("transfers.best_for")}: {t(`transfers.vehicles.${v.slug}.best`)}
                    </p>
                  </div>
                  <PriceTag price={v.price} size="md" />
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-foreground/80">
                    <Users className="h-4 w-4 text-accent" />
                    {v.capacity} {t("transfers.capacity").toLowerCase()}
                  </div>
                  <div className="flex items-center gap-2 text-foreground/80">
                    <Briefcase className="h-4 w-4 text-accent" />
                    {v.luggage}
                  </div>
                </div>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {v.features.map((f) => (
                    <li key={f} className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs text-foreground/80">
                      <Check className="h-3 w-3 text-accent" />
                      {t(`transfers.feat.${f}`)}
                    </li>
                  ))}
                </ul>

                <Link
                  to={`/booking?service=transfer&vehicle=${v.slug}`}
                  className="mt-7 inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
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
