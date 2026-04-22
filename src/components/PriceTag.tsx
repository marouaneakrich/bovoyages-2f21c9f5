import { cn } from "@/lib/utils";
import { useCurrency } from "@/contexts/CurrencyContext";

export const formatPrice = (n: number) =>
  `$${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

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
  const { format } = useCurrency();
  return (
    <div className={cn("flex items-baseline gap-2", className)}>
      {prefix && <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{prefix}</span>}
      <span className={cn("font-serif font-medium text-foreground", sizes[size])}>
        {format(price)}
      </span>
      {suffix && <span className="text-xs text-muted-foreground">{suffix}</span>}
    </div>
  );
};

export default PriceTag;
