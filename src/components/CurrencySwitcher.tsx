import { useEffect, useRef, useState } from "react";
import { Coins } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCurrency, CurrencyCode } from "@/contexts/CurrencyContext";

const CurrencySwitcher = ({ light = false }: { light?: boolean }) => {
  const { currency, setCurrency, list, meta } = useCurrency();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border px-3 py-2 text-xs font-medium tracking-wider transition-colors",
          light
            ? "border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            : "border-border text-foreground/80 hover:bg-secondary"
        )}
        aria-label="Currency"
      >
        <Coins className="h-3.5 w-3.5" />
        <span>{meta.symbol} {currency}</span>
      </button>
      {open && (
        <div className="absolute end-0 mt-2 min-w-[160px] overflow-hidden rounded-xl border border-border bg-popover shadow-elegant z-50">
          {list.map((c) => (
            <button
              key={c.code}
              onClick={() => { setCurrency(c.code as CurrencyCode); setOpen(false); }}
              className={cn(
                "flex w-full items-center justify-between gap-3 px-4 py-2.5 text-start text-sm transition-colors hover:bg-secondary",
                currency === c.code && "bg-secondary font-medium"
              )}
            >
              <span>{c.code}</span>
              <span className="text-muted-foreground">{c.symbol}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CurrencySwitcher;
