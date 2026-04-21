import { useEffect, useState } from "react";
import { Quote } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const quotes = [
  {
    body: "From the first email to the last sunset in the dunes, every detail was held with care. We didn't feel like tourists — we felt like guests.",
    name: "Élise & Marc",
    place: "Paris, France",
  },
  {
    body: "The driver became our friend. The riad felt like home. Bo Voyages turned a holiday into the trip we will tell our grandchildren about.",
    name: "Sarah Whitfield",
    place: "London, UK",
  },
  {
    body: "Three generations, three weeks, zero stress. They built an itinerary that worked for my parents and my eight-year-old. Magicians.",
    name: "Karim Belhaj",
    place: "Montréal, Canada",
  },
];

const Testimonials = () => {
  const [i, setI] = useState(0);
  const r = useReveal<HTMLDivElement>();

  useEffect(() => {
    const id = window.setInterval(() => setI((x) => (x + 1) % quotes.length), 6000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden bg-primary py-20 text-primary-foreground md:py-28">
      <div aria-hidden className="aurora-blob aurora-3" />
      <div aria-hidden className="aurora-blob aurora-4" />
      <div className="container-luxe relative">
        <div ref={r} className="reveal mx-auto max-w-3xl text-center">
          <span className="eyebrow justify-center text-primary-foreground/70 [&::before]:bg-accent">
            Travellers' words
          </span>
          <Quote className="mx-auto mt-8 h-10 w-10 text-accent" />
          <div className="relative mt-6 min-h-[180px] sm:min-h-[160px] md:min-h-[140px]">
            {quotes.map((q, idx) => (
              <blockquote
                key={idx}
                className={`absolute inset-0 transition-all duration-700 ${
                  i === idx ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                }`}
              >
                <p className="font-serif text-xl italic leading-relaxed text-primary-foreground sm:text-2xl md:text-3xl">
                  "{q.body}"
                </p>
                <footer className="mt-6 text-xs uppercase tracking-[0.22em] text-primary-foreground/60">
                  {q.name} · {q.place}
                </footer>
              </blockquote>
            ))}
          </div>
          <div className="mt-10 flex justify-center gap-2">
            {quotes.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`Quote ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === idx ? "w-8 bg-accent" : "w-3 bg-primary-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
