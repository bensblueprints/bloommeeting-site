import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { INDUSTRIES, SITE, WHOP_URL } from "@/lib/config";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

function getIndustry(slug: string) {
  return INDUSTRIES.find((i) => i.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};
  const title = `${SITE.name} for ${industry.name}`;
  const description = `${industry.headline}. ${industry.summary}`;
  return {
    title,
    description,
    alternates: { canonical: `/for/${slug}` },
    openGraph: { title, description, url: `${SITE.url}/for/${slug}` },
  };
}

export default async function ForPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", url: SITE.url },
              { name: "For", url: `${SITE.url}/for/${slug}` },
              { name: industry.name, url: `${SITE.url}/for/${slug}` },
            ])
          ),
        }}
      />

      <p className="text-sm text-muted">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>{" "}
        / For {industry.name}
      </p>
      <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-background-elevated px-4 py-1.5 text-xs font-medium text-muted">
        <span className="h-1.5 w-1.5 rounded-full bg-pink" />
        {SITE.name} for {industry.name}
      </span>
      <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
        {industry.headline}
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted">{industry.summary}</p>

      <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row">
        <a
          href={WHOP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gradient rounded-full px-6 py-3 text-sm font-semibold text-white transition"
        >
          Buy {SITE.name} — {SITE.priceDisplay}
        </a>
        <Link
          href="/download"
          className="rounded-full border border-border px-6 py-3 text-sm font-semibold transition hover:border-pink/50"
        >
          Download &amp; try it
        </Link>
      </div>

      <section className="mt-16 grid gap-8 sm:grid-cols-2">
        <div>
          <h2 className="text-xl font-bold">How {industry.name} use it</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            {industry.useCases.map((u) => (
              <li key={u} className="flex items-start gap-2">
                <span className="mt-0.5 text-pink">✓</span>
                <span>{u}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-bold">The problems it solves</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            {industry.painPoints.map((p) => (
              <li key={p} className="flex items-start gap-2">
                <span className="mt-0.5 text-foreground">–</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-16 rounded-2xl border border-border bg-background-elevated p-8">
        <h2 className="text-xl font-bold">A typical workflow</h2>
        <ol className="mt-6 space-y-4">
          {industry.workflow.map((step, i) => (
            <li key={step} className="flex items-start gap-4 text-sm text-muted">
              <span className="btn-gradient flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white">
                {i + 1}
              </span>
              <span className="pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-16 text-center">
        <h2 className="text-2xl font-bold">
          {SITE.name} pays for itself the first time you use it
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted">
          {SITE.priceDisplay} once, no subscription — vs $20-45/mo on the
          tools built for this same job. See the full breakdown on the{" "}
          <Link href="/vs/riverside" className="text-pink underline">
            comparison pages
          </Link>
          .
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={WHOP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gradient rounded-full px-6 py-3 text-sm font-semibold text-white transition"
          >
            Buy — {SITE.priceDisplay}
          </a>
          <Link
            href="/download"
            className="rounded-full border border-border px-6 py-3 text-sm font-semibold transition hover:border-pink/50"
          >
            Download {SITE.name}
          </Link>
        </div>
      </section>
    </div>
  );
}
