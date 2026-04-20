import { useParams, Link, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Check, MapPin, Calendar } from "lucide-react";
import { TOURS } from "@/data/content";
import PriceTag from "@/components/PriceTag";
import SEO from "@/components/SEO";

const TourDetail = () => {
  const { slug } = useParams();
  const { t } = useTranslation();
  const tour = TOURS.find((x) => x.slug === slug);
  if (!tour) return <Navigate to="/tours" replace />;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.name,
    description: tour.blurb,
    offers: { "@type": "Offer", price: tour.price, priceCurrency: "USD" },
  };

  return (
    <>
      <SEO title={`${tour.name} — Bo Voyages`} description={tour.blurb} jsonLd={jsonLd} image={tour.image} />

      <section className="relative h-[70vh] min-h-[480px] overflow-hidden">
        <img src={tour.image} alt={tour.name} className="absolute inset-0 h-full w-full object-cover animate-ken-burns" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/30 to-black/70" />
        <div className="container-luxe relative flex h-full flex-col justify-end pb-12 text-primary-foreground">
          <span className="eyebrow text-primary-foreground/80 [&::before]:bg-accent">{tour.city} · {tour.days} {t("tours.days")}</span>
          <h1 className="display-1 mt-4 max-w-4xl text-primary-foreground">{tour.name}</h1>
        </div>
      </section>

      <section className="container-luxe grid gap-12 py-16 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <p className="text-lg leading-relaxed text-foreground/85">{tour.blurb}</p>

          <h2 className="display-3 mt-12">{t("tours.highlights")}</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {tour.highlights.map((h) => (
              <li key={h} className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent/20 text-accent">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm text-foreground/85">{h}</span>
              </li>
            ))}
          </ul>

          <h2 className="display-3 mt-12">{t("tours.itinerary")}</h2>
          <ol className="mt-6 space-y-6">
            {Array.from({ length: tour.days }).map((_, i) => (
              <li key={i} className="grid grid-cols-[auto_1fr] gap-5 border-b border-border pb-6 last:border-none">
                <div className="font-serif text-3xl text-accent">{String(i + 1).padStart(2, "0")}</div>
                <div>
                  <h3 className="font-serif text-lg font-medium">Day {i + 1}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    A curated day blending discovery, comfort and the unhurried rhythm of Morocco. Detailed plan shared in your quote.
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <h2 className="display-3 mt-12">{t("tours.included")}</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {[t("tours.private_vehicle"), t("tours.english_speaking"), t("tours.accommodation")].map((it) => (
              <li key={it} className="flex items-start gap-3 text-sm">
                <Check className="mt-0.5 h-4 w-4 text-accent" /> {it}
              </li>
            ))}
          </ul>
        </div>

        <aside className="lg:col-span-4">
          <div className="sticky top-28 rounded-2xl border border-border bg-card p-6 shadow-soft">
            <PriceTag price={tour.price} prefix={t("tours.from_price")} suffix={t("tours.per_person")} size="lg" />
            <div className="mt-6 space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-accent" /> {tour.days} {t("tours.days")}</div>
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-accent" /> {tour.city}</div>
            </div>
            <Link
              to={`/booking?service=tour&tour=${tour.slug}`}
              className="mt-6 block w-full rounded-full bg-primary py-3 text-center text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              {t("tours.request")}
            </Link>
          </div>
        </aside>
      </section>
    </>
  );
};

export default TourDetail;
