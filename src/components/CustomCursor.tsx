import { useEffect, useRef, useState } from "react";

/**
 * Two-layer luxury cursor — outer ring lags, inner dot follows 1:1.
 * Auto-disables on touch / coarse pointer. Adds .cursor-none to <html>.
 */
const CustomCursor = () => {
  const [enabled, setEnabled] = useState(false);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({ x: 0, y: 0, rx: 0, ry: 0, hover: false, down: false });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-none");

    const s = stateRef.current;
    const onMove = (e: PointerEvent) => {
      s.x = e.clientX;
      s.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${s.x}px, ${s.y}px, 0) translate(-50%, -50%)`;
      }
    };
    const onOver = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null;
      const interactive = !!t?.closest('a, button, [role="button"], input, textarea, select, label');
      s.hover = interactive;
      if (ringRef.current) {
        ringRef.current.dataset.hover = interactive ? "1" : "0";
      }
    };
    const onDown = () => {
      s.down = true;
      if (ringRef.current) ringRef.current.dataset.down = "1";
    };
    const onUp = () => {
      s.down = false;
      if (ringRef.current) ringRef.current.dataset.down = "0";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });

    let raf = 0;
    const tick = () => {
      s.rx += (s.x - s.rx) * 0.18;
      s.ry += (s.y - s.ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${s.rx}px, ${s.ry}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.classList.remove("cursor-none");
    };
  }, []);

  if (!enabled) return null;
  return (
    <>
      <div
        ref={ringRef}
        data-hover="0"
        data-down="0"
        className="cursor-ring pointer-events-none fixed left-0 top-0 z-[120]"
        aria-hidden="true"
      />
      <div
        ref={dotRef}
        className="cursor-dot pointer-events-none fixed left-0 top-0 z-[120]"
        aria-hidden="true"
      />
    </>
  );
};

export default CustomCursor;
