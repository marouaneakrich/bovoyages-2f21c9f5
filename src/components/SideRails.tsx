import { useEffect, useState } from "react";

/**
 * Vertical decorative rails in left/right gutters on wide screens (≥1280px).
 * Adds rotated label, vertical rule, and scroll-progress dot on the right.
 */
const SideRails = () => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const check = () => setVisible(window.innerWidth >= 1280);
    check();
    window.addEventListener("resize", check);
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? window.scrollY / h : 0;
      setProgress(Math.min(1, Math.max(0, p)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", check);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Left rail */}
      <div
        className="pointer-events-none fixed bottom-0 left-3 top-0 z-30 hidden xl:flex flex-col items-center justify-end gap-4 pb-8 pt-28"
        aria-hidden="true"
      >
        <div className="h-24 w-px bg-foreground/15" />
        <div
          className="font-serif text-[10px] uppercase tracking-[0.42em] text-foreground/45"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          Est. 1989 · Agadir
        </div>
        <div className="h-12 w-px bg-foreground/15" />
      </div>

      {/* Right rail with progress */}
      <div
        className="pointer-events-none fixed bottom-0 right-3 top-0 z-30 hidden xl:flex flex-col items-center justify-end gap-4 pb-8 pt-28"
        aria-hidden="true"
      >
        <div className="relative h-40 w-px bg-foreground/15">
          <div
            className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_10px_hsl(var(--accent)/0.6)] transition-[top] duration-150"
            style={{ top: `${progress * 100}%` }}
          />
        </div>
        <div
          className="font-serif text-[10px] uppercase tracking-[0.42em] text-foreground/45"
          style={{ writingMode: "vertical-rl" }}
        >
          Morocco · 31°N 9°W
        </div>
        <div className="h-12 w-px bg-foreground/15" />
      </div>
    </>
  );
};

export default SideRails;
