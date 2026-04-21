import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useReveal } from "@/hooks/useReveal";

interface FAQItem {
  q: string;
  a: string;
}
interface Props {
  eyebrow?: string;
  title?: string;
  items: FAQItem[];
}

const FAQ = ({ eyebrow = "Good to know", title = "Frequently asked", items }: Props) => {
  const r = useReveal<HTMLDivElement>();
  return (
    <section className="py-20 md:py-28">
      <div className="container-luxe">
        <div ref={r} className="reveal mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">{eyebrow}</span>
          <h2 className="display-3 mt-5">{title}</h2>
        </div>
        <div className="mx-auto mt-10 max-w-3xl">
          <Accordion type="single" collapsible className="space-y-3">
            {items.map((it, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="overflow-hidden rounded-2xl border border-border bg-card px-5 transition-all hover:border-accent/40"
              >
                <AccordionTrigger className="py-5 text-start font-serif text-base font-medium hover:no-underline sm:text-lg">
                  {it.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {it.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
