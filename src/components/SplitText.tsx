import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface SplitTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  stagger?: number;
  startDelay?: number;
}

/**
 * Word-by-word reveal. Each word fades up + blur-out → blur-in.
 * Triggers once when in view (or immediately if `as` is h1 in hero).
 */
const SplitText = ({
  text,
  className,
  as: Tag = "h2",
  stagger = 60,
  startDelay = 0,
}: SplitTextProps) => {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!ref.current || shown) return;
    const el = ref.current;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);

  const words = text.split(/(\s+)/);

  return (
    <Tag ref={ref as any} className={cn("split-text", className)}>
      {words.map((w, i) =>
        w.trim() === "" ? (
          <span key={i}>{w}</span>
        ) : (
          <span key={i} className="split-word">
            <span
              className={cn("split-word-inner", shown && "in")}
              style={{ transitionDelay: `${startDelay + (i * stagger) / 2}ms` }}
            >
              {w}
            </span>
          </span>
        )
      )}
    </Tag>
  );
};

export default SplitText;
