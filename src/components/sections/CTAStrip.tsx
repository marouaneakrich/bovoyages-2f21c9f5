import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import MagneticButton from "@/components/MagneticButton";

interface Props {
  title: string;
  subtitle?: string;
  ctaLabel: string;
  to?: string;
}

const CTAStrip = ({ title, subtitle, ctaLabel, to = "/booking" }: Props) => {
  const r = useReveal<HTMLDivElement>();
  return (
    <section className="py-20 md:py-28">
      <div className="container-luxe">
        <div
          ref={r}
          className="reveal relative overflow-hidden rounded-3xl bg-primary p-8 text-primary-foreground sm:p-12 md:p-16"
        >
          <div aria-hidden className="aurora-blob aurora-3 opacity-60" />
          <div aria-hidden className="aurora-blob aurora-4 opacity-50" />
          <div className="relative grid items-center gap-6 md:grid-cols-[1fr_auto] md:gap-10">
            <div>
              <h2 className="display-3 text-primary-foreground">{title}</h2>
              {subtitle && (
                <p className="mt-3 max-w-xl text-sm text-primary-foreground/75 md:text-base">
                  {subtitle}
                </p>
              )}
            </div>
            <MagneticButton as="div">
              <Link
                to={to}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 text-sm font-medium text-accent-foreground transition-all hover:bg-accent/90"
              >
                {ctaLabel}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTAStrip;
