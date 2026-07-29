import { SITE, WHOP_URL } from "@/lib/config";

const INCLUDED = [
  "Unlimited meetings, unlimited guests over time",
  "Up to 4 guests + host per meeting",
  "Per-person studio-quality local recording",
  "Local AI captions & transcription (no per-minute fees)",
  "Dynamic Edit auto-cut + Go Live RTMP streaming",
  "Silence removal, transcript editing, vertical reels",
  "Free updates to future 2.x releases",
];

export default function PricingSection() {
  return (
    <section id="pricing" className="mx-auto max-w-6xl px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          One price. <span className="gradient-text">Own it forever.</span>
        </h2>
        <p className="mt-4 text-muted">
          No seats, no monthly meter, no &quot;grow&quot; tier that unlocks
          the feature you actually needed. Pay once, keep using it.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
        <div className="gradient-border gradient-ring rounded-2xl bg-background-elevated p-8">
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold">{SITE.priceDisplay}</span>
            <span className="text-muted">one time</span>
          </div>
          <p className="mt-2 text-sm font-medium text-pink">
            Bloom Meeting — Windows &amp; macOS
          </p>
          <ul className="mt-6 space-y-3 text-sm text-muted">
            {INCLUDED.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-0.5 text-pink">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <a
            href={WHOP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gradient mt-8 block w-full rounded-full px-5 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-pink/10 transition"
          >
            Buy Bloom Meeting — {SITE.priceDisplay}
          </a>
        </div>

        <div className="rounded-2xl border border-border p-8 opacity-80">
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold text-muted">
              $24<span className="text-2xl">/mo</span>
            </span>
          </div>
          <p className="mt-2 text-sm font-medium text-muted">
            Riverside.fm Pro — the subscription alternative
          </p>
          <ul className="mt-6 space-y-3 text-sm text-muted">
            <li className="flex items-start gap-2">
              <span className="mt-0.5">•</span>
              <span>$288/yr, forever, as long as you use it</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5">•</span>
              <span>Editing features split across pricier tiers</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5">•</span>
              <span>Storage & transcription minutes metered per plan</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5">•</span>
              <span>Stop paying, lose access</span>
            </li>
          </ul>
          <p className="mt-8 rounded-lg bg-background px-4 py-3 text-center text-sm text-muted">
            Bloom Meeting pays for itself before month two.
          </p>
        </div>
      </div>
    </section>
  );
}
