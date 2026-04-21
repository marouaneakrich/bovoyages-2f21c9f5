import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";
import PageHero from "@/components/PageHero";
import { IMAGES } from "@/data/content";
import Timeline from "@/components/sections/Timeline";
import Testimonials from "@/components/sections/Testimonials";
import Pillars from "@/components/sections/Pillars";
import CTAStrip from "@/components/sections/CTAStrip";
import { useReveal } from "@/hooks/useReveal";
import { Award, Newspaper, Star, Globe2 } from "lucide-react";

const About = () => {
  const { t } = useTranslation();
  const r = useReveal<HTMLDivElement>();

  return (
    <>
      <SEO title={`${t("about.title")} — Bo Voyages`} description={t("about.subtitle")} />
      <PageHero eyebrow={t("sections.story_eyebrow")} title={t("about.title")} subtitle={t("about.subtitle")} />

      {/* STORY */}
      <section className="container-luxe grid gap-10 py-12 md:py-16 lg:grid-cols-12 lg:items-start lg:gap-12">
        <div className="lg:col-span-7 space-y-5 text-foreground/85 md:space-y-6">
          <p className="font-serif text-xl leading-relaxed sm:text-2xl first-letter:float-start first-letter:me-2 first-letter:font-serif first-letter:text-5xl first-letter:leading-none first-letter:text-accent sm:first-letter:text-6xl">
            {t("about.body_1")}
          </p>
          <p className="text-sm leading-relaxed sm:text-base">{t("about.body_2")}</p>

          <div className="grid grid-cols-3 gap-3 border-t border-border pt-6 sm:gap-6 md:pt-8">
            {[
              { v: "1989", k: "Founded" },
              { v: "35+", k: t("trust.years") },
              { v: "Agadir", k: "HQ" },
            ].map((s) => (
              <div key={s.k}>
                <div className="font-serif text-2xl font-medium sm:text-3xl">{s.v}</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.16em] text-muted-foreground sm:text-xs">{s.k}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <img src={IMAGES.essaouira} alt="Essaouira" loading="lazy" decoding="async" className="aspect-[3/4] rounded-2xl object-cover" />
            <img src={IMAGES.kasbah} alt="Kasbah" loading="lazy" decoding="async" className="aspect-[3/4] rounded-2xl object-cover translate-y-4 sm:translate-y-6" />
            <img src={IMAGES.taroudant} alt="Taroudant" loading="lazy" decoding="async" className="aspect-[3/4] rounded-2xl object-cover" />
            <img src={IMAGES.chefchaouen} alt="Chefchaouen" loading="lazy" decoding="async" className="aspect-[3/4] rounded-2xl object-cover translate-y-4 sm:translate-y-6" />
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <Timeline />

      {/* PILLARS */}
      <Pillars />

      {/* TEAM INTRO */}
      <section className="container-luxe py-20 md:py-28">
        <div ref={r} className="reveal mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">The team</span>
          <h2 className="display-2 mt-5">A small family with a big black book.</h2>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Twelve people in our Agadir office, twenty drivers across Morocco, and a network of guides, riad keepers, and cooks we have known for years. Everything we book passes through someone we trust.
          </p>
        </div>
      </section>

      {/* AWARDS / PRESS */}
      <section className="bg-secondary/40 py-20 md:py-28">
        <div className="container-luxe">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow justify-center">Recognised by</span>
            <h2 className="display-3 mt-5">Quietly trusted, since 1989.</h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Star, label: "4.9 / 5", sub: "Average review" },
              { icon: Award, label: "Travel+Leisure", sub: "Listed agency" },
              { icon: Newspaper, label: "Le Monde", sub: "Featured 2022" },
              { icon: Globe2, label: "10k+", sub: "Travellers hosted" },
            ].map((p, i) => {
              const Icon = p.icon;
              return (
                <RevealItem key={p.label} delay={i}>
                  <div className="group h-full rounded-2xl border border-border bg-card p-6 text-center transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-elegant">
                    <Icon className="mx-auto h-7 w-7 text-accent transition-transform group-hover:scale-110" />
                    <div className="mt-4 font-serif text-2xl font-medium">{p.label}</div>
                    <div className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">{p.sub}</div>
                  </div>
                </RevealItem>
              );
            })}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <Testimonials />

      <CTAStrip
        title="Travel with people who know."
        subtitle="Three decades of curating Morocco — start your journey with a quick conversation."
        ctaLabel="Talk to us"
        to="/contact"
      />
    </>
  );
};

const RevealItem = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`reveal stagger-${Math.min((delay % 6) + 1, 6)}`}>
      {children}
    </div>
  );
};

export default About;
