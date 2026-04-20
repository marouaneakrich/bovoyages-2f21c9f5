import { Link, Navigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { EXCURSIONS } from "@/data/content";
import PriceTag from "@/components/PriceTag";
import SEO from "@/components/SEO";

const ExcursionDetail = () => {
  const { slug } = useParams();
  const { t } = useTranslation();
  const ex = EXCURSIONS.find((x) => x.slug === slug);
  if (!ex) return <Navigate to="/excursions" replace />;

  return (
    <>
      <SEO title={`${ex.name} — Bo Voyages`} description={ex.blurb} image={ex.image} />
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden">
        <img src={ex.image} alt={ex.name} className="absolute inset-0 h-full w-full object-cover animate-ken-burns" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/30 to-black/70" />
        <div className="container-luxe relative flex h-full flex-col justify-end pb-12 text-primary-foreground">
          <span className="eyebrow text-primary-foreground/80 [&::before]:bg-accent">{t(`excursions.${ex.duration}`)}</span>
          <h1 className="display-1 mt-4 max-w-4xl text-primary-foreground">{ex.name}</h1>
        </div>
      </section>

      <section className="container-luxe grid gap-12 py-16 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <p className="text-lg leading-relaxed text-foreground/85">{ex.blurb}</p>
          <p className="mt-6 text-sm text-muted-foreground">
            Pickup is arranged from your hotel in Agadir or Taghazout. All excursions are run with a private vehicle and an experienced local team.
          </p>
        </div>
        <aside className="lg:col-span-4">
          <div className="sticky top-28 rounded-2xl border border-border bg-card p-6 shadow-soft">
            <PriceTag price={ex.price} prefix={t("tours.from_price")} suffix={t("tours.per_person")} size="lg" />
            <Link
              to={`/booking?service=excursion&excursion=${ex.slug}`}
              className="mt-6 block w-full rounded-full bg-primary py-3 text-center text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              {t("excursions.request")}
            </Link>
          </div>
        </aside>
      </section>
    </>
  );
};

export default ExcursionDetail;
