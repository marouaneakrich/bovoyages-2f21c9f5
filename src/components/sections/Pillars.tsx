import { Compass, Hotel, Calendar, LifeBuoy } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const items = [
  { icon: Compass, title: "Local guides", body: "Born here, trained for years — they know which café opens at 6am and which mountain pass not to miss." },
  { icon: Hotel, title: "Curated stays", body: "Quiet riads, family-run kasbahs, the right place to land each night — vetted by us, not by an algorithm." },
  { icon: Calendar, title: "Flexible itineraries", body: "Hand-shaped to your pace. Slow mornings, optional detours, no forced group schedule." },
  { icon: LifeBuoy, title: "24/7 support", body: "A real person on WhatsApp, every day of your trip — for the small things and the unexpected ones." },
];

const Pillars = () => {
  const r = useReveal<HTMLDivElement>();
  return (
    <section className="relative overflow-hidden bg-secondary/40 py-20 md:py-28">
      <div aria-hidden className="aurora-blob aurora-1" />
      <div aria-hidden className="aurora-blob aurora-2" />
      <div className="container-luxe relative">
        <div ref={r} className="reveal mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">Why travel with us</span>
          <h2 className="display-2 mt-5">Four small things that change everything.</h2>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <PillarCard key={it.title} delay={i}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-500 hover:-translate-y-2 hover:border-accent/50 hover:shadow-elegant">
                  <div className="sheen" />
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-serif text-xl font-medium">{it.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.body}</p>
                </div>
              </PillarCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const PillarCard = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`reveal stagger-${Math.min(delay + 1, 6)}`}>
      {children}
    </div>
  );
};

export default Pillars;
