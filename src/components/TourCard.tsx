import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, Heart } from "lucide-react";
import { Tour, CURRENCY } from "@/data/content";
import { useWishlist } from "@/hooks/useWishlist";
import { cn } from "@/lib/utils";

type Props = {
  tour: Tour;
  className?: string;
  aspect?: "4/5" | "3/4";
};

const TourCard = ({ tour, className, aspect = "3/4" }: Props) => {
  const { t } = useTranslation();
  const { saved, toggle } = useWishlist(`tour:${tour.slug}`);

  return (
    <Link
      to={`/tours/${tour.slug}`}
      className={cn("poster-card group", className)}
      aria-label={`${tour.name} — ${tour.city}, ${tour.days} ${t("tours.days")}`}
    >
      {/* Image layer */}
      <div className={cn("relative w-full", aspect === "4/5" ? "aspect-[4/5]" : "aspect-[3/4]")}>
        <img
          src={tour.image}
          alt={tour.name}
          loading="lazy"
          className="poster-img"
          width={800}
          height={1000}
        />
        <div className="sheen" />
        <div className="scrim-bottom" />
      </div>

      {/* Wishlist */}
      <button
        type="button"
        onClick={toggle}
        data-saved={saved}
        aria-label={saved ? t("cards.saved") : t("cards.save")}
        className="wishlist-btn"
      >
        <Heart className={cn("h-4 w-4 transition-transform", saved && "fill-current scale-110")} />
      </button>

      {/* Top chips */}
      <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between p-4 md:p-5">
        <span className="chip-glass">{tour.city}</span>
        <span className="chip-accent">
          {tour.days} {t("tours.days")}
        </span>
      </div>

      {/* Bottom content over image */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-5 md:p-7 text-white">
        <h3 className="font-serif text-2xl md:text-[1.7rem] font-medium leading-[1.1] text-shadow-poster">
          {tour.name}
        </h3>
        {tour.highlights?.length > 0 && (
          <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.16em] text-white/85">
            {tour.highlights.slice(0, 3).join(" · ")}
          </p>
        )}
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-white/85 text-shadow-poster">
          {tour.blurb}
        </p>

        <div className="mt-5 flex items-end justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70">
              {t("tours.from_price")}
            </span>
            <span className="price-bold mt-1">
              {CURRENCY}
              {tour.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/65">
              {t("tours.per_person")}
            </span>
          </div>

          <span
            aria-hidden
            className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg transition-transform duration-500 group-hover:translate-x-1 group-hover:scale-110 rtl:group-hover:-translate-x-1"
          >
            <ArrowRight className="h-5 w-5 rtl:rotate-180" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default TourCard;
