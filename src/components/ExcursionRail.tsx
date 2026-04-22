import { Excursion } from "@/data/content";
import ExcursionCard from "@/components/ExcursionCard";

type Props = { items: Excursion[]; speed?: number };

const ExcursionRail = ({ items, speed = 70 }: Props) => {
  const loop = [...items, ...items];
  return (
    <div className="excursion-rail group relative">
      {/* Edge fades */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 sm:w-24 bg-gradient-to-r from-secondary/40 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 sm:w-24 bg-gradient-to-l from-secondary/40 to-transparent" />

      <div className="overflow-x-auto sm:overflow-hidden snap-x snap-mandatory scroll-smooth no-scrollbar">
        <div
          className="excursion-track flex w-max items-stretch gap-5 sm:gap-6 md:gap-7 py-2"
          style={{ animationDuration: `${speed}s` }}
        >
          {loop.map((ex, i) => (
            <div
              key={`${ex.slug}-${i}`}
              className="snap-start shrink-0 w-[280px] sm:w-[340px] md:w-[380px]"
            >
              <ExcursionCard ex={ex} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExcursionRail;
