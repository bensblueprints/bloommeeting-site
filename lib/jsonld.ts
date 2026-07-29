import { FAQS, SITE, WHOP_URL } from "./config";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/images/icon.png`,
  };
}

export function softwareAppJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE.name,
    operatingSystem: "Windows, macOS",
    applicationCategory: "MultimediaApplication",
    description: SITE.description,
    url: SITE.url,
    image: `${SITE.url}${SITE.ogImage}`,
    offers: {
      "@type": "Offer",
      price: String(SITE.price),
      priceCurrency: "USD",
      url: WHOP_URL,
      availability: "https://schema.org/InStock",
    },
  };
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function articleJsonLd(opts: {
  title: string;
  description: string;
  date: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    datePublished: opts.date,
    author: { "@type": "Organization", name: SITE.name },
    publisher: { "@type": "Organization", name: SITE.name },
    url: opts.url,
  };
}
