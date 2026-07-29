import { FAQS } from "@/lib/config";
import { faqJsonLd } from "@/lib/jsonld";

export default function FAQSection() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-6 py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }}
      />
      <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
        Frequently asked questions
      </h2>
      <div className="mt-10 divide-y divide-border">
        {FAQS.map((faq) => (
          <details key={faq.question} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between text-left font-medium text-foreground">
              {faq.question}
              <span className="ml-4 shrink-0 text-muted transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
