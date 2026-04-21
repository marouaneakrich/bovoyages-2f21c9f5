import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

const PageHero = ({
  eyebrow,
  title,
  subtitle,
  image,
  compact = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image?: string;
  compact?: boolean;
}) => {
  return (
    <section className={cn("relative overflow-hidden bg-secondary/50", image ? "text-primary-foreground" : "text-foreground")}>
      {image && (
        <>
          <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
        </>
      )}
      <div className={cn("container-luxe relative", compact ? "pt-24 pb-10 sm:pt-28 md:pt-32 md:pb-12" : "pt-28 pb-14 sm:pt-32 sm:pb-16 md:pt-40 md:pb-20 lg:pt-44 lg:pb-24")}>
        {eyebrow && (
          <span className={cn("eyebrow", image ? "text-primary-foreground/80 [&::before]:bg-accent" : "")}>
            {eyebrow}
          </span>
        )}
        <h1 className={cn("display-2 mt-4 max-w-3xl", image ? "text-primary-foreground" : "")}>{title}</h1>
        {subtitle && (
          <p className={cn("mt-4 max-w-2xl text-sm leading-relaxed sm:text-base md:mt-5 md:text-lg", image ? "text-primary-foreground/85" : "text-muted-foreground")}>
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
};

export default PageHero;
