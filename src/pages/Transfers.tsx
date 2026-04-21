import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Check, Users, Briefcase, MapPin, Calendar, Send } from "lucide-react";
import { VEHICLES } from "@/data/content";
import PriceTag from "@/components/PriceTag";
import SEO from "@/components/SEO";
import PageHero from "@/components/PageHero";
import FAQ from "@/components/sections/FAQ";
import CTAStrip from "@/components/sections/CTAStrip";
import { useReveal } from "@/hooks/useReveal";

const ROUTES = [
  { from: "Agadir", to: "Marrakech", duration: "3h", from_price: "$140" },
  { from: "Agadir", to: "Essaouira", duration: "2h30", from_price: "$120" },
  { from: "Marrakech", to: "Fes", duration: "8h", from_price: "$320" },
  { from: "Marrakech", to: "Merzouga", duration: "9h", from_price: "$340" },
  { from: "Casablanca", to: "Rabat", duration: "1h15", from_price: "$95" },
  { from: "Fes", to: "Chefchaouen", duration: "3h30", from_price: "$165" },
];

const STEPS = [
  { icon: Send, title: "Send your request", body: "Tell us your route, date, and party size. Takes 2 minutes." },
  { icon: Calendar, title: "Receive a quote", body: "We confirm vehicle availability and price within a few hours." },
  { icon: MapPin, title: "Travel in comfort", body: "Your driver meets you at the agreed point — clean vehicle, water, English-speaking." },
];

const Transfers = () => {
  const { t } = useTranslation();
  const r = useReveal<HTMLDivElement>();

  return (
    <>
      <SEO title={`${t("transfers.title")} — Bo Voyages`} description={t("transfers.subtitle")} />
      <PageHero eyebrow={t("sections.transfers_eyebrow")} title={t("transfers.title")} subtitle={t("transfers.subtitle")} />

      {/* VEHICLE GRID */}
      <section className="container-luxe py-10 md:py-14">
        <div className="grid gap-5 md:gap-6 sm:grid-cols-2 xl:grid-cols-2">
          {VEHICLES.map((v, i) => (
            <RevealItem key={v.slug} delay={i}>
              <article className="premium-card flex flex-col overflow-hidden">
                <div className="image-mask aspect-[16/9] bg-secondary">
                  <img src={v.image} alt={t(`transfers.vehicles.${v.slug}.name`)} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6 md:p-7">
                  <div className="flex items-start justify-between gap-3 sm:gap-4">
                    <div className="min-w-0">
                      <h3 className="font-serif text-xl font-medium leading-tight sm:text-2xl">{t(`transfers.vehicles.${v.slug}.name`)}</h3>
                      <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-muted-foreground sm:text-xs">
                        {t("transfers.best_for")}: {t(`transfers.vehicles.${v.slug}.best`)}
                      </p>
                    </div>
                    <PriceTag price={v.price} size="md" />
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3 text-sm sm:mt-6 sm:gap-4">
                    <div className="flex items-center gap-2 text-foreground/80">
                      <Users className="h-4 w-4 shrink-0 text-accent" />
                      <span className="truncate">{v.capacity} {t("transfers.capacity").toLowerCase()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-foreground/80">
                      <Briefcase className="h-4 w-4 shrink-0 text-accent" />
                      <span className="truncate">{v.luggage}</span>
                    </div>
                  </div>

                  <ul className="mt-4 flex flex-wrap gap-2 sm:mt-5">
                    {v.features.map((f) => (
                      <li key={f} className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-[11px] text-foreground/80 sm:text-xs">
                        <Check className="h-3 w-3 text-accent" />
                        {t(`transfers.feat.${f}`)}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={`/booking?service=transfer&vehicle=${v.slug}`}
                    className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:-translate-y-0.5 sm:mt-7"
                  >
                    {t("transfers.request")}
                  </Link>
                </div>
              </article>
            </RevealItem>
          ))}
        </div>
      </section>

      {/* ROUTES & RATES */}
      <section className="bg-secondary/40 py-20 md:py-28">
        <div className="container-luxe">
          <div ref={r} className="reveal mx-auto max-w-2xl text-center">
            <span className="eyebrow justify-center">Popular routes</span>
            <h2 className="display-3 mt-5">Indicative routes & rates</h2>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              From, per vehicle, one-way. Final quote depends on date, vehicle, and stops.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-2xl border border-border bg-card">
            <div className="grid grid-cols-4 border-b border-border bg-secondary/60 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground sm:px-6 sm:text-xs">
              <span>From</span>
              <span>To</span>
              <span className="hidden sm:block">Duration</span>
              <span className="text-end">From</span>
            </div>
            {ROUTES.map((r, i) => (
              <div key={i} className="grid grid-cols-4 items-center border-b border-border px-4 py-4 text-sm transition-colors hover:bg-secondary/40 last:border-0 sm:px-6">
                <span className="font-medium">{r.from}</span>
                <span className="font-medium">{r.to}</span>
                <span className="hidden text-muted-foreground sm:block">{r.duration}</span>
                <span className="text-end font-serif text-lg font-medium text-accent sm:text-xl">{r.from_price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INCLUDED AMENITIES */}
      <section className="container-luxe py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">Always included</span>
          <h2 className="display-3 mt-5">The small things that make a long road feel short.</h2>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { t: "Climate control", d: "A cool cabin, every season." },
            { t: "On-board Wi-Fi", d: "Stay connected on the road." },
            { t: "Bottled water", d: "Cold, refreshed at every stop." },
            { t: "English-speaking driver", d: "Local knowledge, kind manner." },
          ].map((it, i) => (
            <RevealItem key={it.t} delay={i}>
              <div className="group h-full rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-elegant">
                <Check className="h-6 w-6 text-accent transition-transform group-hover:scale-110" />
                <h3 className="mt-4 font-serif text-lg">{it.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.d}</p>
              </div>
            </RevealItem>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-primary py-20 text-primary-foreground md:py-28">
        <div className="container-luxe">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow justify-center text-primary-foreground/70 [&::before]:bg-accent [&::after]:bg-accent">Booking process</span>
            <h2 className="display-3 mt-5 text-primary-foreground">Three steps. A few hours. Done.</h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-3 lg:gap-8">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <RevealItem key={s.title} delay={i}>
                  <div className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-6 backdrop-blur-sm transition-all hover:bg-accent/10 md:p-8">
                    <div className="font-serif text-5xl font-medium text-accent/40">0{i + 1}</div>
                    <Icon className="mt-3 h-6 w-6 text-accent" />
                    <h3 className="mt-4 font-serif text-xl text-primary-foreground">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-primary-foreground/75">{s.body}</p>
                  </div>
                </RevealItem>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ
        items={[
          { q: "Are prices per person or per vehicle?", a: "All transfer prices are per vehicle, one-way — share the cost across your party." },
          { q: "Can the driver wait or do multiple stops?", a: "Yes. Tell us your stops in advance and we'll quote a route price including waiting time." },
          { q: "What if my flight is delayed?", a: "We track your flight. The driver will be there when you land — no extra charge for reasonable delays." },
          { q: "Are car seats available?", a: "Yes, on request — child and infant seats at no extra cost." },
        ]}
      />

      <CTAStrip
        title="Where would you like to be driven?"
        subtitle="Send us your route. We'll come back with a clear, all-in price."
        ctaLabel="Request a transfer"
      />
    </>
  );
};

const RevealItem = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`reveal stagger-${Math.min((delay % 6) + 1, 6)}`}>
      {children}
    </div>
  );
};

export default Transfers;
