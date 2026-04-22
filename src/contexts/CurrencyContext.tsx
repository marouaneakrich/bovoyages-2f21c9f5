import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";

export type CurrencyCode = "USD" | "EUR" | "MAD" | "GBP";

type Meta = { symbol: string; rate: number; locale: string; code: CurrencyCode };

// Base = USD. Static approximate rates; editable here.
const CURRENCIES: Record<CurrencyCode, Meta> = {
  USD: { symbol: "$", rate: 1, locale: "en-US", code: "USD" },
  EUR: { symbol: "€", rate: 0.92, locale: "fr-FR", code: "EUR" },
  MAD: { symbol: "DH", rate: 9.95, locale: "fr-MA", code: "MAD" },
  GBP: { symbol: "£", rate: 0.79, locale: "en-GB", code: "GBP" },
};

type Ctx = {
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  format: (usd: number) => string;
  meta: Meta;
  list: Meta[];
};

const CurrencyContext = createContext<Ctx | null>(null);
const STORAGE_KEY = "bv:currency";

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
    if (typeof window === "undefined") return "USD";
    const stored = localStorage.getItem(STORAGE_KEY) as CurrencyCode | null;
    return stored && CURRENCIES[stored] ? stored : "USD";
  });

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, currency); } catch {}
  }, [currency]);

  const value = useMemo<Ctx>(() => {
    const meta = CURRENCIES[currency];
    const format = (usd: number) => {
      const converted = usd * meta.rate;
      const isMAD = meta.code === "MAD";
      const formatted = converted.toLocaleString(meta.locale, {
        minimumFractionDigits: isMAD ? 0 : 2,
        maximumFractionDigits: isMAD ? 0 : 2,
      });
      return isMAD ? `${formatted} ${meta.symbol}` : `${meta.symbol}${formatted}`;
    };
    return {
      currency,
      setCurrency: setCurrencyState,
      format,
      meta,
      list: Object.values(CURRENCIES),
    };
  }, [currency]);

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
};

export const useCurrency = () => {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
};
