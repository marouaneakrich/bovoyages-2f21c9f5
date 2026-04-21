import { useReveal } from "@/hooks/useReveal";

const milestones = [
  { year: "1989", title: "Founded in Agadir", body: "A small fleet, a quiet office, and a conviction that Morocco should be travelled gently." },
  { year: "1998", title: "First imperial circuits", body: "Our signature multi-city loops are born — Fes, Meknes, Rabat, Marrakech." },
  { year: "2008", title: "Sahara expeditions", body: "We open routes into Merzouga and Erg Chigaga with hand-picked desert camps." },
  { year: "2015", title: "Premium fleet upgrade", body: "A full refresh of vehicles — climate, Wi-Fi, the right comfort for long roads." },
  { year: "2024", title: "35 years in", body: "Three decades, ten thousand travellers, the same family approach to every booking." },
];

const Timeline = () => {
  const r = useReveal<HTMLDivElement>();
  return (
    <section className="relative bg-secondary/30 py-20 md:py-28">
      <div className="container-luxe">
        <div ref={r} className="reveal mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">Our timeline</span>
          <h2 className="display-2 mt-5">Three decades, one approach.</h2>
        </div>
        <ol className="relative mx-auto mt-14 max-w-3xl">
          <div aria-hidden className="absolute bottom-0 start-3 top-0 w-px bg-border md:start-1/2" />
          {milestones.map((m, i) => (
            <Item key={m.year} m={m} i={i} />
          ))}
        </ol>
      </div>
    </section>
  );
};

const Item = ({ m, i }: { m: typeof milestones[number]; i: number }) => {
  const ref = useReveal<HTMLLIElement>();
  const left = i % 2 === 0;
  return (
    <li
      ref={ref}
      className={`reveal stagger-${Math.min(i + 1, 6)} relative mb-10 ps-10 md:mb-14 md:ps-0 md:grid md:grid-cols-2 md:gap-10`}
    >
      <span
        aria-hidden
        className="absolute start-3 top-2 h-3 w-3 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_0_4px_hsl(var(--background))] md:start-1/2"
      />
      <div className={left ? "md:pe-10 md:text-end" : "md:order-2 md:ps-10"}>
        <div className="font-serif text-3xl font-medium text-accent sm:text-4xl">{m.year}</div>
        <h3 className="mt-2 font-serif text-lg font-medium sm:text-xl">{m.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.body}</p>
      </div>
      <div className={left ? "hidden md:block" : "hidden md:block md:order-1"} />
    </li>
  );
};

export default Timeline;
