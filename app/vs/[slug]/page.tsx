import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { COMPETITORS, SITE, WHOP_URL } from "@/lib/config";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export function generateStaticParams() {
  return COMPETITORS.map((c) => ({ slug: c.slug }));
}

function getCompetitor(slug: string) {
  return COMPETITORS.find((c) => c.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const competitor = getCompetitor(slug);
  if (!competitor) return {};
  const title = `${SITE.name} vs ${competitor.name}: one-time $49 vs $${competitor.monthlyPrice}/mo`;
  const description = `Compare ${SITE.name} (${SITE.priceDisplay} once) to ${competitor.name} (${competitor.pricingNote}). Feature-by-feature breakdown, real pricing, and the honest case for switching.`;
  return {
    title,
    description,
    alternates: { canonical: `/vs/${slug}` },
    openGraph: { title, description, url: `${SITE.url}/vs/${slug}` },
  };
}

function yearsToBreakeven(monthly: number) {
  const months = SITE.price / monthly;
  return months;
}

export default async function VsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const competitor = getCompetitor(slug);
  if (!competitor) notFound();

  const breakevenMonths = yearsToBreakeven(competitor.monthlyPrice);
  const threeYearCompetitor = Math.round(competitor.monthlyPrice * 36);
  const threeYearBloom = SITE.price;

  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", url: SITE.url },
              { name: "Compare", url: `${SITE.url}/vs/${slug}` },
              {
                name: `vs ${competitor.name}`,
                url: `${SITE.url}/vs/${slug}`,
              },
            ])
          ),
        }}
      />

      <p className="text-sm text-muted">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>{" "}
        / Compare
      </p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
        {SITE.name} vs <span className="gradient-text">{competitor.name}</span>
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">
        {competitor.name} is {competitor.tagline}. {SITE.name} covers the
        same core workflow — local recording, per-person tracks, AI editing —
        as a {SITE.priceDisplay} one-time desktop app instead of a recurring
        subscription.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <div className="gradient-border gradient-ring rounded-2xl bg-background-elevated p-6">
          <h2 className="text-xl font-bold">{SITE.name}</h2>
          <p className="mt-2 text-3xl font-bold">
            {SITE.priceDisplay}{" "}
            <span className="text-base font-normal text-muted">once</span>
          </p>
          <p className="mt-4 text-sm text-muted">
            Local recording, per-person sync, local AI captions, Dynamic Edit
            auto-cut, Go Live RTMP streaming, silence removal, transcript
            editing, and vertical reels — all included, forever, on one
            license.
          </p>
          <a
            href={WHOP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gradient mt-6 block w-full rounded-full px-5 py-2.5 text-center text-sm font-semibold text-white transition"
          >
            Buy {SITE.name} — {SITE.priceDisplay}
          </a>
        </div>
        <div className="rounded-2xl border border-border p-6">
          <h2 className="text-xl font-bold">{competitor.name}</h2>
          <p className="mt-2 text-3xl font-bold">
            ${competitor.monthlyPrice}
            <span className="text-base font-normal text-muted">/mo</span>
          </p>
          <p className="mt-1 text-xs text-muted">{competitor.pricingNote}</p>
          <p className="mt-4 text-sm text-muted">
            Category: {competitor.category}
          </p>
        </div>
      </div>

      <section className="mt-16">
        <h2 className="text-2xl font-bold tracking-tight">
          The one-time vs subscription math
        </h2>
        <div className="mt-6 overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead className="bg-background-elevated text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Timeframe</th>
                <th className="px-4 py-3 font-medium">{SITE.name}</th>
                <th className="px-4 py-3 font-medium">{competitor.name}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-4 py-3 text-muted">Up front</td>
                <td className="px-4 py-3 font-medium">
                  {SITE.priceDisplay}
                </td>
                <td className="px-4 py-3 font-medium">$0</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-muted">Year 1</td>
                <td className="px-4 py-3 font-medium">
                  {SITE.priceDisplay}
                </td>
                <td className="px-4 py-3 font-medium">
                  ${Math.round(competitor.monthlyPrice * 12)}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-muted">Year 3</td>
                <td className="px-4 py-3 font-medium">{SITE.priceDisplay}</td>
                <td className="px-4 py-3 font-medium">
                  ${threeYearCompetitor}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-muted">Breakeven point</td>
                <td className="px-4 py-3 font-medium text-pink" colSpan={2}>
                  {breakevenMonths < 1
                    ? "Immediately"
                    : `~${breakevenMonths.toFixed(1)} months of ${competitor.name}`}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-muted">
          {SITE.name} total cost after 3 years: {SITE.priceDisplay}. {" "}
          {competitor.name} at ${competitor.monthlyPrice}/mo for 3 years: $
          {threeYearCompetitor} — a difference of $
          {threeYearCompetitor - threeYearBloom}.
        </p>
      </section>

      <section className="mt-16 grid gap-8 sm:grid-cols-2">
        <div>
          <h2 className="text-xl font-bold">
            Where {competitor.name} is genuinely strong
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            {competitor.strengths.map((s) => (
              <li key={s} className="flex items-start gap-2">
                <span className="mt-0.5 text-foreground">+</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-bold">Where it falls short</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            {competitor.weaknesses.map((w) => (
              <li key={w} className="flex items-start gap-2">
                <span className="mt-0.5 text-pink">–</span>
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-16 rounded-2xl border border-border bg-background-elevated p-8">
        <h2 className="text-xl font-bold">
          {competitor.name} is best for teams that...
        </h2>
        <p className="mt-3 text-sm text-muted">{competitor.bestFor}.</p>
        <h2 className="mt-8 text-xl font-bold">Making the switch</h2>
        <p className="mt-3 text-sm text-muted">{competitor.migrationAngle}</p>
      </section>

      <section className="mt-16 text-center">
        <h2 className="text-2xl font-bold">
          Try {SITE.name} before you decide
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted">
          Download it free and record a real session. If it does what you
          need, unlock it for {SITE.priceDisplay} — once.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/download"
            className="rounded-full border border-border px-6 py-3 text-sm font-semibold transition hover:border-pink/50"
          >
            Download {SITE.name}
          </Link>
          <a
            href={WHOP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gradient rounded-full px-6 py-3 text-sm font-semibold text-white transition"
          >
            Buy — {SITE.priceDisplay}
          </a>
        </div>
      </section>
    </div>
  );
}
