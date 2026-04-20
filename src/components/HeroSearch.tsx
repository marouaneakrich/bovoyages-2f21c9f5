import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import { CITIES } from "@/data/content";
import { cn } from "@/lib/utils";

type Tab = "tours" | "excursions" | "transfers";

const HeroSearch = () => {
  const { t } = useTranslation();
  const [tab, setTab] = useState<Tab>("transfers");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [pax, setPax] = useState("2");

  const params = new URLSearchParams({
    service: tab === "transfers" ? "transfer" : tab === "excursions" ? "excursion" : "tour",
    ...(from && { from }),
    ...(to && { to }),
    ...(date && { date }),
    ...(pax && { passengers: pax }),
  });

  return (
    <div className="rounded-2xl border border-primary-foreground/15 bg-card/95 p-2 shadow-elegant backdrop-blur-sm md:rounded-full md:p-2">
      <div className="flex flex-wrap items-center gap-1 px-3 pt-1 md:px-2">
        {(["tours", "excursions", "transfers"] as Tab[]).map((tk) => (
          <button
            key={tk}
            onClick={() => setTab(tk)}
            className={cn(
              "rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors",
              tab === tk
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-secondary"
            )}
          >
            {t(`search.tabs.${tk}`)}
          </button>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-1 gap-1 p-1 sm:grid-cols-2 md:grid-cols-5">
        <Field icon={<MapPin className="h-4 w-4" />} label={t("search.from")}>
          <select value={from} onChange={(e) => setFrom(e.target.value)} className="bg-transparent w-full text-sm outline-none">
            <option value="">{t("search.any")}</option>
            {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>
        <Field icon={<MapPin className="h-4 w-4" />} label={t("search.to")}>
          <select value={to} onChange={(e) => setTo(e.target.value)} className="bg-transparent w-full text-sm outline-none">
            <option value="">{t("search.any")}</option>
            {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>
        <Field icon={<Calendar className="h-4 w-4" />} label={t("search.date")}>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="bg-transparent w-full text-sm outline-none" />
        </Field>
        <Field icon={<Users className="h-4 w-4" />} label={t("search.passengers")}>
          <input type="number" min={1} max={50} value={pax} onChange={(e) => setPax(e.target.value)} className="bg-transparent w-full text-sm outline-none" />
        </Field>
        <Link
          to={`/booking?${params.toString()}`}
          className="flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90 md:rounded-full"
        >
          <Search className="h-4 w-4" />
          {t("search.search")}
        </Link>
      </div>
    </div>
  );
};

const Field = ({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) => (
  <label className="flex items-center gap-3 rounded-xl px-4 py-2.5 hover:bg-secondary md:rounded-full">
    <span className="text-accent">{icon}</span>
    <span className="flex flex-col">
      <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
      <span className="-mt-0.5 text-sm font-medium text-foreground">{children}</span>
    </span>
  </label>
);

export default HeroSearch;
