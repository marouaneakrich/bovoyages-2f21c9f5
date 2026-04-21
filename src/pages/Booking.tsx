import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { Check, ChevronRight, ChevronLeft } from "lucide-react";
import { CITIES, TOURS, EXCURSIONS, VEHICLES } from "@/data/content";
import PriceTag from "@/components/PriceTag";
import SEO from "@/components/SEO";
import PageHero from "@/components/PageHero";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

type ServiceType = "tour" | "excursion" | "transfer";

const schema = z.object({
  service: z.enum(["tour", "excursion", "transfer"]),
  from: z.string().max(80).optional(),
  to: z.string().max(80).optional(),
  date: z.string().max(20).optional(),
  passengers: z.coerce.number().int().min(1).max(60),
  tour: z.string().max(80).optional(),
  excursion: z.string().max(80).optional(),
  vehicle: z.string().max(40).optional(),
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().min(6).max(40),
  notes: z.string().max(1000).optional(),
});

const Booking = () => {
  const { t, i18n } = useTranslation();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    service: (params.get("service") as ServiceType) || "transfer",
    from: params.get("from") || "",
    to: params.get("to") || "",
    date: params.get("date") || "",
    passengers: params.get("passengers") || "2",
    tour: params.get("tour") || "",
    excursion: params.get("excursion") || "",
    vehicle: params.get("vehicle") || "minibus7",
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm((f) => ({ ...f, [k]: v }));

  const selectedVehicle = VEHICLES.find((v) => v.slug === form.vehicle);
  const selectedTour = TOURS.find((tt) => tt.slug === form.tour);
  const selectedExcursion = EXCURSIONS.find((e) => e.slug === form.excursion);

  const indicativePrice = useMemo(() => {
    if (form.service === "transfer" && selectedVehicle) return selectedVehicle.price;
    if (form.service === "tour" && selectedTour) return selectedTour.price;
    if (form.service === "excursion" && selectedExcursion) return selectedExcursion.price;
    return null;
  }, [form, selectedVehicle, selectedTour, selectedExcursion]);

  const steps = [t("booking.steps.trip"), t("booking.steps.vehicle"), t("booking.steps.contact")];

  const handleSubmit = async () => {
    const parsed = schema.safeParse({ ...form, language: i18n.language });
    if (!parsed.success) {
      toast({ title: "Please check your details", description: Object.values(parsed.error.flatten().fieldErrors).flat()[0] ?? "Invalid input", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    // Lovable Cloud submission can be wired in a follow-up — generate a local reference for now.
    const ref = "BV-" + Math.random().toString(36).slice(2, 6).toUpperCase();
    setTimeout(() => {
      navigate(`/confirmation?ref=${ref}&service=${form.service}`);
    }, 600);
  };

  return (
    <>
      <SEO title={`${t("booking.title")} — Bo Voyages`} description={t("booking.subtitle")} />
      <PageHero eyebrow="" title={t("booking.title")} subtitle={t("booking.subtitle")} compact />

      <section className="container-luxe grid gap-8 py-10 md:py-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-8">
          {/* Stepper */}
          <ol className="mb-8 grid grid-cols-3 gap-2 md:mb-10">
            {steps.map((label, i) => (
              <li key={i} className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3">
                <span className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-medium",
                  i < step ? "bg-accent text-accent-foreground" : i === step ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                )}>
                  {i < step ? <Check className="h-4 w-4" /> : i + 1}
                </span>
                <span className={cn("text-[10px] uppercase tracking-[0.14em] sm:text-xs sm:tracking-[0.16em]", i === step ? "text-foreground" : "text-muted-foreground")}>
                  {label}
                </span>
              </li>
            ))}
          </ol>

          <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 md:p-8">
            {step === 0 && (
              <div className="space-y-6">
                <Field label={t("booking.service")}>
                  <div className="grid gap-2 sm:grid-cols-3">
                    {(["transfer", "excursion", "tour"] as ServiceType[]).map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => set("service", s)}
                        className={cn(
                          "rounded-xl border px-4 py-3 text-sm font-medium transition-colors",
                          form.service === s ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-secondary"
                        )}
                      >
                        {t(`booking.trip_type.${s}`)}
                      </button>
                    ))}
                  </div>
                </Field>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label={t("booking.from")}>
                    <Select value={form.from} onChange={(v) => set("from", v)} options={["", ...CITIES]} />
                  </Field>
                  <Field label={t("booking.to")}>
                    <Select value={form.to} onChange={(v) => set("to", v)} options={["", ...CITIES]} />
                  </Field>
                  <Field label={t("booking.date")}>
                    <Input type="date" value={form.date} onChange={(v) => set("date", v)} />
                  </Field>
                  <Field label={t("booking.passengers")}>
                    <Input type="number" min={1} max={60} value={form.passengers} onChange={(v) => set("passengers", v)} />
                  </Field>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-6">
                {form.service === "transfer" && (
                  <div className="grid gap-3">
                    {VEHICLES.map((v) => (
                      <label key={v.slug} className={cn(
                        "flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition-colors sm:gap-4 sm:p-4",
                        form.vehicle === v.slug ? "border-primary bg-primary/5" : "border-border hover:bg-secondary"
                      )}>
                        <input type="radio" name="vehicle" className="sr-only" checked={form.vehicle === v.slug} onChange={() => set("vehicle", v.slug)} />
                        <img src={v.image} alt="" loading="lazy" className="h-14 w-20 shrink-0 rounded-lg object-cover sm:h-16 sm:w-24" />
                        <div className="min-w-0 flex-1">
                          <div className="truncate font-serif text-base font-medium sm:text-lg">{t(`transfers.vehicles.${v.slug}.name`)}</div>
                          <div className="truncate text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:text-xs">{t(`transfers.vehicles.${v.slug}.best`)}</div>
                        </div>
                        <PriceTag price={v.price} size="sm" />
                      </label>
                    ))}
                  </div>
                )}

                {form.service === "tour" && (
                  <Field label={t("booking.trip_type.tour")}>
                    <Select value={form.tour} onChange={(v) => set("tour", v)} options={["", ...TOURS.map((tt) => tt.slug)]} labelMap={Object.fromEntries(TOURS.map((tt) => [tt.slug, tt.name]))} />
                  </Field>
                )}

                {form.service === "excursion" && (
                  <Field label={t("booking.trip_type.excursion")}>
                    <Select value={form.excursion} onChange={(v) => set("excursion", v)} options={["", ...EXCURSIONS.map((e) => e.slug)]} labelMap={Object.fromEntries(EXCURSIONS.map((e) => [e.slug, e.name]))} />
                  </Field>
                )}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <Field label={t("booking.name")}><Input value={form.name} onChange={(v) => set("name", v)} maxLength={100} /></Field>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label={t("booking.email")}><Input type="email" value={form.email} onChange={(v) => set("email", v)} maxLength={160} /></Field>
                  <Field label={t("booking.phone")}><Input value={form.phone} onChange={(v) => set("phone", v)} maxLength={40} /></Field>
                </div>
                <Field label={t("booking.notes")}>
                  <textarea
                    value={form.notes}
                    onChange={(e) => set("notes", e.target.value)}
                    maxLength={1000}
                    rows={4}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </Field>
              </div>
            )}

            <div className="mt-8 flex justify-between gap-3">
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4 rtl:rotate-180" /> {t("booking.back")}
              </button>
              {step < 2 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => s + 1)}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  {t("booking.next")} <ChevronRight className="h-4 w-4 rtl:rotate-180" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-accent-foreground hover:bg-accent/90 disabled:opacity-60"
                >
                  {submitting ? t("booking.submitting") : t("booking.submit")}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Summary */}
        <aside className="lg:col-span-4">
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 lg:sticky lg:top-28">
            <h3 className="font-serif text-lg font-medium sm:text-xl">{t("booking.summary")}</h3>
            <dl className="mt-4 space-y-3 text-sm sm:mt-5">
              <Row k={t("booking.service")} v={t(`booking.trip_type.${form.service}`)} />
              {form.from && <Row k={t("booking.from")} v={form.from} />}
              {form.to && <Row k={t("booking.to")} v={form.to} />}
              {form.date && <Row k={t("booking.date")} v={form.date} />}
              <Row k={t("booking.passengers")} v={form.passengers} />
              {form.service === "transfer" && selectedVehicle && (
                <Row k={t("booking.vehicle")} v={t(`transfers.vehicles.${selectedVehicle.slug}.name`)} />
              )}
              {form.service === "tour" && selectedTour && <Row k={t("booking.trip_type.tour")} v={selectedTour.name} />}
              {form.service === "excursion" && selectedExcursion && <Row k={t("booking.trip_type.excursion")} v={selectedExcursion.name} />}
            </dl>
            {indicativePrice !== null && (
              <div className="mt-5 border-t border-border pt-4 sm:mt-6 sm:pt-5">
                <PriceTag price={indicativePrice} prefix={t("tours.from_price")} size="md" />
              </div>
            )}
          </div>
        </aside>
      </section>
    </>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <label className="block">
    <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-muted-foreground">{label}</span>
    {children}
  </label>
);

const Input = (p: { value: string; onChange: (v: string) => void; type?: string; min?: number; max?: number; maxLength?: number }) => (
  <input
    type={p.type || "text"}
    value={p.value}
    onChange={(e) => p.onChange(e.target.value)}
    min={p.min}
    max={p.max}
    maxLength={p.maxLength}
    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
  />
);

const Select = ({ value, onChange, options, labelMap }: { value: string; onChange: (v: string) => void; options: string[]; labelMap?: Record<string, string> }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
  >
    {options.map((o) => (
      <option key={o} value={o}>{o ? (labelMap?.[o] ?? o) : "—"}</option>
    ))}
  </select>
);

const Row = ({ k, v }: { k: string; v: string }) => (
  <div className="flex items-baseline justify-between gap-3">
    <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{k}</dt>
    <dd className="text-end font-medium text-foreground">{v}</dd>
  </div>
);

export default Booking;
