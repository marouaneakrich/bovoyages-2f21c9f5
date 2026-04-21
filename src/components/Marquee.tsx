import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  items: string[];
  className?: string;
  speed?: number; // seconds per loop
  separator?: ReactNode;
}

/**
 * Endless horizontal scrolling strip. Doubles content for seamless loop.
 */
const Marquee = ({ items, className, speed = 38, separator }: Props) => {
  const sep = separator ?? <span className="mx-6 text-accent">·</span>;
  return (
    <div className={cn("marquee group relative overflow-hidden", className)} aria-hidden="true">
      <div
        className="marquee-track flex w-max items-center"
        style={{ animationDuration: `${speed}s` }}
      >
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0 items-center">
            {items.map((it, i) => (
              <span
                key={`${dup}-${i}`}
                className="font-serif text-2xl uppercase tracking-[0.18em] text-foreground/70 sm:text-3xl md:text-4xl"
              >
                {it}
                {sep}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
