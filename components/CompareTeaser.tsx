import Link from "next/link";
import { COMPETITORS, INDUSTRIES } from "@/lib/config";

export default function CompareTeaser() {
  return (
    <section className="border-y border-border bg-background-elevated">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 sm:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              How Bloom Meeting compares
            </h2>
            <p className="mt-3 text-sm text-muted">
              Honest, line-by-line breakdowns against the tools you&apos;re
              probably paying for right now.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {COMPETITORS.map((c) => (
                <Link
                  key={c.slug}
                  href={`/vs/${c.slug}`}
                  className="gradient-border rounded-full bg-background px-4 py-2 text-sm text-muted transition hover:border-pink/40 hover:text-foreground"
                >
                  vs {c.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Built for how you actually work
            </h2>
            <p className="mt-3 text-sm text-muted">
              The same recorder, tailored guidance for how different teams
              use it.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {INDUSTRIES.slice(0, 10).map((i) => (
                <Link
                  key={i.slug}
                  href={`/for/${i.slug}`}
                  className="gradient-border rounded-full bg-background px-4 py-2 text-sm text-muted transition hover:border-pink/40 hover:text-foreground"
                >
                  {i.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
