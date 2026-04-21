import { useState } from "react";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import SEO from "@/components/SEO";
import PageHero from "@/components/PageHero";
import { EMAIL, IMAGES, PHONE_DISPLAY, WHATSAPP_NUMBER } from "@/data/content";
import { toast } from "@/hooks/use-toast";
import FAQ from "@/components/sections/FAQ";
import CTAStrip from "@/components/sections/CTAStrip";
import { useReveal } from "@/hooks/useReveal";

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(160),
  message: z.string().trim().min(5).max(1000),
});

const Contact = () => {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const r = useReveal<HTMLDivElement>();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) {
      toast({ title: "Please check your details", description: Object.values(r.error.flatten().fieldErrors).flat()[0] ?? "Invalid input", variant: "destructive" });
      return;
    }
    setSending(true);
    const wa = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hello Bo Voyages, I'm ${form.name} (${form.email}). ${form.message}`)}`;
    setTimeout(() => {
      window.open(wa, "_blank", "noopener,noreferrer");
      toast({ title: "Opening WhatsApp", description: "We will get back to you within a few hours." });
      setSending(false);
      setForm({ name: "", email: "", message: "" });
    }, 300);
  };

  return (
    <>
      <SEO title={`${t("contact.title")} — Bo Voyages`} description={t("contact.subtitle")} />
      <PageHero eyebrow="" title={t("contact.title")} subtitle={t("contact.subtitle")} compact />

      {/* FORM + ASIDE */}
      <section className="container-luxe grid gap-8 py-10 md:py-12 lg:grid-cols-12 lg:gap-12">
        <form onSubmit={submit} className="order-2 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-6 md:p-8 lg:order-1 lg:col-span-7">
          <Field label={t("contact.name")}>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} maxLength={100} className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </Field>
          <Field label={t("contact.email")}>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={160} className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </Field>
          <Field label={t("contact.message")}>
            <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} maxLength={1000} rows={5} className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </Field>
          <button disabled={sending} className="w-full rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-60 sm:w-auto">
            {t("contact.send")}
          </button>
        </form>

        <aside className="order-1 grid gap-4 sm:grid-cols-2 lg:order-2 lg:col-span-5 lg:grid-cols-1 lg:gap-6">
          <Item icon={<Phone className="h-4 w-4" />} label={t("contact.phone")} value={PHONE_DISPLAY} href={`tel:${PHONE_DISPLAY.replace(/\s/g, "")}`} />
          <Item icon={<Mail className="h-4 w-4" />} label={t("contact.email")} value={EMAIL} href={`mailto:${EMAIL}`} />
          <Item icon={<MapPin className="h-4 w-4" />} label={t("contact.address")} value={t("contact.address_value")} />
          <Item icon={<Clock className="h-4 w-4" />} label={t("contact.hours")} value={t("contact.hours_value")} />
        </aside>
      </section>

      {/* OFFICE MAP & HOURS */}
      <section className="bg-secondary/40 py-20 md:py-28">
        <div className="container-luxe">
          <div ref={r} className="reveal mx-auto max-w-2xl text-center">
            <span className="eyebrow justify-center">Find us</span>
            <h2 className="display-3 mt-5">Our office in Agadir</h2>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <div className="overflow-hidden rounded-2xl border border-border bg-card lg:col-span-2">
              <iframe
                title="Bo Voyages office map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-9.6%2C30.4%2C-9.55%2C30.45&amp;layer=mapnik"
                className="h-72 w-full sm:h-96"
                loading="lazy"
              />
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
              <h3 className="font-serif text-xl">Visiting hours</h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex justify-between border-b border-border pb-3">
                  <span className="text-muted-foreground">Mon — Fri</span>
                  <span className="font-medium">9:00 — 19:00</span>
                </li>
                <li className="flex justify-between border-b border-border pb-3">
                  <span className="text-muted-foreground">Saturday</span>
                  <span className="font-medium">9:00 — 17:00</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Sunday</span>
                  <span className="font-medium">By appointment</span>
                </li>
              </ul>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition-all hover:bg-accent/90"
              >
                <MessageCircle className="h-4 w-4" />
                Message on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CHANNELS */}
      <section className="container-luxe py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">Reach us how you prefer</span>
          <h2 className="display-3 mt-5">A real person, every channel.</h2>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {[
            { icon: Phone, label: "Call us", value: PHONE_DISPLAY, href: `tel:${PHONE_DISPLAY.replace(/\s/g, "")}` },
            { icon: MessageCircle, label: "WhatsApp", value: "Reply within 1h", href: `https://wa.me/${WHATSAPP_NUMBER}` },
            { icon: Mail, label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
          ].map((c, i) => {
            const Icon = c.icon;
            return (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-accent/50 hover:shadow-elegant"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="sheen" />
                <Icon className="h-7 w-7 text-accent transition-transform group-hover:scale-110 group-hover:rotate-6" />
                <div className="mt-5 text-xs uppercase tracking-[0.18em] text-muted-foreground">{c.label}</div>
                <div className="mt-1 break-words font-serif text-lg sm:text-xl">{c.value}</div>
              </a>
            );
          })}
        </div>
      </section>

      {/* OFFICE GALLERY */}
      <section className="bg-secondary/30 py-20 md:py-28">
        <div className="container-luxe">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow justify-center">A glimpse of our world</span>
            <h2 className="display-3 mt-5">Where Morocco starts.</h2>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            {[IMAGES.marrakech, IMAGES.essaouira, IMAGES.kasbah, IMAGES.taroudant].map((src, i) => (
              <div key={i} className="image-mask aspect-square rounded-2xl">
                <img src={src} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ
        eyebrow="Quick answers"
        title="Before you reach out"
        items={[
          { q: "How quickly do you reply?", a: "Within a few hours during office hours, and within 24 hours otherwise — every single message." },
          { q: "Do you speak my language?", a: "We work in English, French, Arabic and Spanish. Tell us your preference and we'll match you with the right team member." },
          { q: "Can I just call?", a: "Of course — we love a real conversation. Pick up the phone any time during office hours." },
        ]}
      />

      <CTAStrip
        title="Ready to start the conversation?"
        subtitle="Send us a quick note — we'll come back with ideas, not a hard sell."
        ctaLabel="Send a message"
        to="#top"
      />
    </>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <label className="block">
    <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-muted-foreground">{label}</span>
    {children}
  </label>
);

const Item = ({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) => {
  const Tag: any = href ? "a" : "div";
  return (
    <Tag href={href} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 transition-colors hover:bg-secondary sm:gap-4 sm:p-5">
      <span className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">{icon}</span>
      <div className="min-w-0 flex-1">
        <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground sm:text-xs">{label}</div>
        <div className="mt-1 break-words font-serif text-base sm:text-lg">{value}</div>
      </div>
    </Tag>
  );
};

export default Contact;
