import { CURRENCY } from "@/data/content";
import { cn } from "@/lib/utils";

export const formatPrice = (n: number) =>
  `${CURRENCY}${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const PriceTag = ({
  price,
  prefix,
  suffix,
  className,
  size = "md",
}: {
  price: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}) => {
  const sizes = {
    sm: "text-base",
    md: "text-2xl",
    lg: "text-4xl md:text-5xl",
  } as const;
  return (
    <div className={cn("flex items-baseline gap-2", className)}>
      {prefix && <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{prefix}</span>}
      <span className={cn("font-serif font-medium text-foreground", sizes[size])}>
        {formatPrice(price)}
      </span>
      {suffix && <span className="text-xs text-muted-foreground">{suffix}</span>}
    </div>
  );
};

export default PriceTag;
