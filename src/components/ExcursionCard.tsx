import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, Heart } from "lucide-react";
import { Excursion, CURRENCY } from "@/data/content";
import { useWishlist } from "@/hooks/useWishlist";
import { cn } from "@/lib/utils";

type Props = {
  ex: Excursion;
  className?: string;
};

const ExcursionCard = ({ ex, className }: Props) => {
  const { t } = useTranslation();
  const { saved, toggle } = useWishlist(`ex:${ex.slug}`);

  return (
    <Link
      to={`/excursions/${ex.slug}`}
      className={cn("poster-card group", className)}
      aria-label={`${ex.name} — ${t(`excursions.${ex.duration}`)}`}
    >
      <div className="relative aspect-[4/5] w-full">
        <img
          src={ex.image}
          alt={ex.name}
          loading="lazy"
          className="poster-img"
          width={700}
          height={875}
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

      {/* Top chips: duration left, price right */}
      <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between p-4">
        <span className="chip-glass">{t(`excursions.${ex.duration}`)}</span>
        <span className="chip-accent">
          {CURRENCY}
          {ex.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      </div>

      {/* Bottom overlay content */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-5 text-white">
        <h3 className="font-serif text-xl md:text-[1.4rem] font-medium leading-tight text-shadow-poster">
          {ex.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-white/85 text-shadow-poster">
          {ex.blurb}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="cta-pill">
            {t("cards.view_experience")}
            <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ExcursionCard;
