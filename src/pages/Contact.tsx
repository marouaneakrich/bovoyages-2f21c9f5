import { useState } from "react";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import SEO from "@/components/SEO";
import PageHero from "@/components/PageHero";
import { EMAIL, PHONE_DISPLAY, WHATSAPP_NUMBER } from "@/data/content";
import { toast } from "@/hooks/use-toast";

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(160),
  message: z.string().trim().min(5).max(1000),
});

const Contact = () => {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

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

      <section className="container-luxe grid gap-12 py-12 lg:grid-cols-12">
        <form onSubmit={submit} className="space-y-4 lg:col-span-7 rounded-2xl border border-border bg-card p-6 md:p-8">
          <Field label={t("contact.name")}>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} maxLength={100} className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </Field>
          <Field label={t("contact.email")}>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={160} className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </Field>
          <Field label={t("contact.message")}>
            <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} maxLength={1000} rows={5} className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </Field>
          <button disabled={sending} className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-60">
            {t("contact.send")}
          </button>
        </form>

        <aside className="space-y-6 lg:col-span-5">
          <Item icon={<Phone className="h-4 w-4" />} label={t("contact.phone")} value={PHONE_DISPLAY} href={`tel:${PHONE_DISPLAY.replace(/\s/g, "")}`} />
          <Item icon={<Mail className="h-4 w-4" />} label={t("contact.email")} value={EMAIL} href={`mailto:${EMAIL}`} />
          <Item icon={<MapPin className="h-4 w-4" />} label={t("contact.address")} value={t("contact.address_value")} />
          <Item icon={<Clock className="h-4 w-4" />} label={t("contact.hours")} value={t("contact.hours_value")} />
        </aside>
      </section>
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
    <Tag href={href} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 hover:bg-secondary">
      <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent/15 text-accent">{icon}</span>
      <div>
        <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{label}</div>
        <div className="mt-1 font-serif text-lg">{value}</div>
      </div>
    </Tag>
  );
};

export default Contact;
