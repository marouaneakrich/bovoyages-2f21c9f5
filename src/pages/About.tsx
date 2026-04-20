import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";
import PageHero from "@/components/PageHero";
import { IMAGES } from "@/data/content";

const About = () => {
  const { t } = useTranslation();
  return (
    <>
      <SEO title={`${t("about.title")} — Bo Voyages`} description={t("about.subtitle")} />
      <PageHero eyebrow={t("sections.story_eyebrow")} title={t("about.title")} subtitle={t("about.subtitle")} />

      <section className="container-luxe grid gap-12 py-16 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-7 space-y-6 text-foreground/85">
          <p className="font-serif text-2xl leading-relaxed first-letter:float-start first-letter:me-2 first-letter:font-serif first-letter:text-6xl first-letter:leading-none first-letter:text-accent">
            {t("about.body_1")}
          </p>
          <p className="text-base leading-relaxed">{t("about.body_2")}</p>

          <div className="grid grid-cols-3 gap-6 border-t border-border pt-8">
            {[
              { v: "1989", k: "Founded" },
              { v: "35+", k: t("trust.years") },
              { v: "Agadir", k: "Headquarters" },
            ].map((s) => (
              <div key={s.k}>
                <div className="font-serif text-3xl font-medium">{s.v}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">{s.k}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="grid grid-cols-2 gap-3">
            <img src={IMAGES.essaouira} alt="" className="aspect-[3/4] rounded-2xl object-cover" />
            <img src={IMAGES.kasbah} alt="" className="aspect-[3/4] rounded-2xl object-cover translate-y-6" />
            <img src={IMAGES.taroudant} alt="" className="aspect-[3/4] rounded-2xl object-cover" />
            <img src={IMAGES.chefchaouen} alt="" className="aspect-[3/4] rounded-2xl object-cover translate-y-6" />
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
