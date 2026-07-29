import Image from "next/image";
import Link from "next/link";
import { SITE, WHOP_URL } from "@/lib/config";

export default function Hero() {
  return (
    <section className="gradient-ring relative overflow-hidden border-b border-border">
      <div className="mx-auto max-w-6xl px-6 pb-20 pt-20 sm:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background-elevated px-4 py-1.5 text-xs font-medium text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-pink" />
            The Riverside.fm replacement you buy once
          </span>
          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
            Record remote podcast guests in{" "}
            <span className="gradient-text">studio quality.</span>
            <br />
            Pay <span className="gradient-text">$49</span> once.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
            Guests join from a browser link — nothing to install. Everyone
            records locally, per-person tracks sync automatically, and local
            AI handles captions, auto-editing, and reels. {SITE.name} is a
            desktop app you own, not a subscription you rent.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={WHOP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gradient w-full rounded-full px-8 py-3.5 text-center text-base font-semibold text-white shadow-xl shadow-pink/20 transition sm:w-auto"
            >
              Buy Bloom Meeting — $49
            </a>
            <Link
              href="/download"
              className="w-full rounded-full border border-border px-8 py-3.5 text-center text-base font-semibold text-foreground transition hover:border-pink/50 sm:w-auto"
            >
              Download &amp; try it
            </Link>
          </div>
          <p className="mt-4 text-xs text-muted">
            vs Riverside $24/mo ($288/yr) &middot; one-time, no seats, no meter
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 pb-24">
        <div className="gradient-border overflow-hidden rounded-2xl bg-background-elevated shadow-2xl shadow-black/40">
          <Image
            src="/images/bloommeeting-home.png"
            alt="Bloom Meeting host dashboard showing a live meeting with guest thumbnails and recording controls"
            width={1600}
            height={1000}
            priority
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
}
