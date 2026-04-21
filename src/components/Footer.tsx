import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Mail, Phone, MapPin } from "lucide-react";
import Logo from "./Logo";
import { EMAIL, PHONE_DISPLAY } from "@/data/content";

const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="container-luxe py-12 md:py-16">
        <div className="grid gap-10 sm:grid-cols-2 md:gap-12 md:grid-cols-12">
          <div className="sm:col-span-2 md:col-span-5">
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground md:mt-6">
              {t("footer.tagline")}
            </p>
            <div className="mt-6 space-y-3 text-sm text-muted-foreground md:mt-8">
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 break-all hover:text-foreground">
                <Mail className="h-4 w-4 shrink-0 text-accent" /> <span>{EMAIL}</span>
              </a>
              <a href={`tel:${PHONE_DISPLAY.replace(/\s/g, '')}`} className="flex items-center gap-3 hover:text-foreground">
                <Phone className="h-4 w-4 shrink-0 text-accent" /> {PHONE_DISPLAY}
              </a>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 shrink-0 text-accent" /> {t("contact.address_value")}
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{t("footer.explore")}</h4>
            <ul className="mt-4 space-y-3 text-sm md:mt-5">
              <li><Link className="link-underline" to="/tours">{t("nav.tours")}</Link></li>
              <li><Link className="link-underline" to="/excursions">{t("nav.excursions")}</Link></li>
              <li><Link className="link-underline" to="/transfers">{t("nav.transfers")}</Link></li>
              <li><Link className="link-underline" to="/booking">{t("nav.book")}</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{t("footer.company")}</h4>
            <ul className="mt-4 space-y-3 text-sm md:mt-5">
              <li><Link className="link-underline" to="/about">{t("nav.about")}</Link></li>
              <li><Link className="link-underline" to="/contact">{t("nav.contact")}</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{t("footer.legal")}</h4>
            <ul className="mt-4 space-y-3 text-sm md:mt-5">
              <li><Link className="link-underline" to="/">{t("footer.terms")}</Link></li>
              <li><Link className="link-underline" to="/">{t("footer.privacy")}</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center md:mt-14">
          <p>© {year} Bo Voyages. {t("footer.rights")}</p>
          <p className="font-serif italic">"{t("brand.tagline")}"</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
