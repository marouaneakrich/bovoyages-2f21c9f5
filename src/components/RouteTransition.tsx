import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import BirdMark from "./BirdMark";

/**
 * Quick 500ms wash on route change — bird does one pass.
 * Skipped on first mount (loading screen handles that).
 */
const RouteTransition = () => {
  const { pathname } = useLocation();
  const [active, setActive] = useState(false);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setActive(true);
    const id = window.setTimeout(() => setActive(false), 520);
    return () => window.clearTimeout(id);
  }, [pathname]);

  if (!active) return null;
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[90] flex items-center justify-center"
      style={{ background: "hsl(35 35% 88% / 0.85)", animation: "route-wash 520ms ease-out forwards" }}
      aria-hidden="true"
    >
      <div className="bird-track relative h-12 w-full overflow-hidden">
        <div className="bird-fly-once absolute top-1/2 -translate-y-1/2 text-white">
          <BirdMark className="h-9 w-9" />
        </div>
      </div>
    </div>
  );
};

export default RouteTransition;
