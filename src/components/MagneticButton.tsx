import { forwardRef, useEffect, useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  className?: string;
  as?: "button" | "a" | "div";
  href?: string;
  to?: string;
  strength?: number;
  onClick?: () => void;
}

/**
 * Subtle magnetic pull toward cursor when within ~80px.
 * Disabled on touch devices.
 */
const MagneticButton = forwardRef<HTMLElement, Props>(
  ({ children, className, as = "button", strength = 0.35, ...rest }, _) => {
    const ref = useRef<HTMLElement | null>(null);

    useEffect(() => {
      const el = ref.current;
      if (!el) return;
      const fine =
        typeof window !== "undefined" &&
        window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      if (!fine) return;

      const onMove = (e: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.hypot(dx, dy);
        if (dist < 100) {
          el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
        } else {
          el.style.transform = "";
        }
      };
      const onLeave = () => {
        el.style.transform = "";
      };

      window.addEventListener("pointermove", onMove, { passive: true });
      el.addEventListener("pointerleave", onLeave);
      return () => {
        window.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      };
    }, [strength]);

    const Tag: any = as;
    return (
      <Tag
        ref={ref as any}
        className={cn("magnetic inline-flex", className)}
        {...rest}
      >
        {children}
      </Tag>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

export default MagneticButton;
