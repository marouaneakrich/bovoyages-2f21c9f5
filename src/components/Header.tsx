import { Link, NavLink as RouterNavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import LanguageSwitcher from "./LanguageSwitcher";
import CurrencySwitcher from "./CurrencySwitcher";
import Logo from "./Logo";

const Header = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isHome = pathname === "/";
  const transparent = isHome && !scrolled && !open;

  const links = [
    { to: "/tours", label: t("nav.tours") },
    { to: "/excursions", label: t("nav.excursions") },
    { to: "/transfers", label: t("nav.transfers") },
    { to: "/about", label: t("nav.about") },
    { to: "/contact", label: t("nav.contact") },
  ];

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        transparent ? "bg-transparent" : "glass border-b border-border"
      )}
    >
      <div className="container-luxe flex h-16 items-center justify-between gap-4 md:h-20">
        <Link to="/" aria-label="Bo Voyages — home" className="flex items-center gap-2">
          <Logo light={transparent} />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <RouterNavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                cn(
                  "link-underline text-sm font-medium tracking-wide transition-colors",
                  transparent ? "text-primary-foreground/90 hover:text-primary-foreground" : "text-foreground/80 hover:text-foreground",
                  isActive && (transparent ? "text-primary-foreground" : "text-foreground")
                )
              }
            >
              {l.label}
            </RouterNavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <div className="hidden sm:block"><CurrencySwitcher light={transparent} /></div>
          <LanguageSwitcher light={transparent} />
          <Link
            to="/booking"
            className={cn(
              "hidden rounded-full px-5 py-2.5 text-sm font-medium transition-all md:inline-flex",
              transparent
                ? "bg-accent text-accent-foreground hover:bg-accent/90"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
          >
            {t("nav.book")}
          </Link>
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-full lg:hidden",
              transparent ? "text-primary-foreground" : "text-foreground"
            )}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "lg:hidden overflow-hidden border-t border-border bg-background transition-[max-height] duration-500",
          open ? "max-h-[80vh]" : "max-h-0"
        )}
      >
        <nav className="container-luxe flex flex-col gap-1 py-4">
          {links.map((l) => (
            <RouterNavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                cn(
                  "rounded-lg px-3 py-3 text-base font-medium",
                  isActive ? "bg-secondary text-foreground" : "text-foreground/80"
                )
              }
            >
              {l.label}
            </RouterNavLink>
          ))}
          <div className="mt-3 sm:hidden px-3"><CurrencySwitcher /></div>
          <Link
            to="/booking"
            className="mt-2 inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
          >
            {t("nav.book")}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
