import { useEffect, useState } from "react";
import BirdMark from "./BirdMark";

/**
 * Brand loading screen: ivory/sand wash with a flying white bird that loops.
 * Shown on initial load. Auto-dismisses after window load OR a 2.5s safety timeout.
 */
const LoadingScreen = () => {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const minDuration = 1600;
    const start = performance.now();
    let dismissed = false;

    const dismiss = () => {
      if (dismissed) return;
      dismissed = true;
      const elapsed = performance.now() - start;
      const wait = Math.max(0, minDuration - elapsed);
      window.setTimeout(() => {
        setFading(true);
        window.setTimeout(() => setVisible(false), 480);
      }, wait);
    };

    if (document.readyState === "complete") {
      dismiss();
    } else {
      window.addEventListener("load", dismiss, { once: true });
    }
    // Safety fallback
    const safety = window.setTimeout(dismiss, 2500);
    return () => {
      window.removeEventListener("load", dismiss);
      window.clearTimeout(safety);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center transition-opacity duration-500 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
      style={{ background: "hsl(35 35% 88%)" }}
      aria-hidden="true"
    >
      <div className="bird-track relative h-16 w-full overflow-hidden">
        <div className="bird-fly absolute top-1/2 -translate-y-1/2 text-white drop-shadow-[0_3px_10px_hsl(220_40%_12%/0.18)]">
          <BirdMark className="h-10 w-10 sm:h-12 sm:w-12" />
        </div>
      </div>
      <div className="mt-6 font-serif text-xs uppercase tracking-[0.42em] text-foreground/45 animate-fade-in">
        Bo&nbsp;·&nbsp;Voyages
      </div>
    </div>
  );
};

export default LoadingScreen;
