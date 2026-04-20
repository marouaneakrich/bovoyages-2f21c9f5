import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

const langs = [
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
  { code: "ar", label: "AR" },
];

const LanguageSwitcher = ({ light = false }: { light?: boolean }) => {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = (i18n.language || "en").slice(0, 2);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border px-3 py-2 text-xs font-medium tracking-wider transition-colors",
          light
            ? "border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            : "border-border text-foreground/80 hover:bg-secondary"
        )}
        aria-label="Language"
      >
        <Globe className="h-3.5 w-3.5" />
        {current.toUpperCase()}
      </button>
      {open && (
        <div className="absolute end-0 mt-2 min-w-[140px] overflow-hidden rounded-xl border border-border bg-popover shadow-elegant">
          {langs.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                i18n.changeLanguage(l.code);
                setOpen(false);
              }}
              className={cn(
                "block w-full px-4 py-2.5 text-start text-sm transition-colors hover:bg-secondary",
                current === l.code && "bg-secondary font-medium"
              )}
            >
              {t(`lang.${l.code}`)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
