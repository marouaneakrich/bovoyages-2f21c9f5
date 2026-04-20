import { Link, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Check } from "lucide-react";
import SEO from "@/components/SEO";
import { WHATSAPP_NUMBER } from "@/data/content";

const Confirmation = () => {
  const { t } = useTranslation();
  const [params] = useSearchParams();
  const ref = params.get("ref") || "BV-XXXX";

  const wa = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hello Bo Voyages, my reference is ${ref}.`)}`;

  return (
    <>
      <SEO title={`${t("confirmation.title")} — Bo Voyages`} />
      <section className="container-luxe pb-20 pt-32 md:pt-40">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-8 inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 text-accent">
            <Check className="h-7 w-7" />
          </div>
          <h1 className="display-2">{t("confirmation.title")}</h1>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">{t("confirmation.subtitle")}</p>

          <div className="mx-auto mt-10 inline-flex flex-col items-center rounded-2xl border border-border bg-card px-10 py-6">
            <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{t("confirmation.ref")}</span>
            <span className="mt-1 font-serif text-3xl font-medium tracking-wider text-accent">{ref}</span>
          </div>

          <div className="mt-12 grid gap-4 text-start sm:grid-cols-3">
            {[t("confirmation.step_1"), t("confirmation.step_2"), t("confirmation.step_3")].map((s, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-5">
                <div className="font-serif text-3xl text-accent">{i + 1}</div>
                <p className="mt-2 text-sm text-foreground/80">{s}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              href={wa}
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground hover:bg-accent/90"
            >
              {t("confirmation.whatsapp")}
            </a>
            <Link to="/" className="rounded-full border border-border px-6 py-3 text-sm font-medium hover:bg-secondary">
              {t("confirmation.home")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Confirmation;
