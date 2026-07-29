import Link from "next/link";
import { COMPETITORS, INDUSTRIES, SITE } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background-elevated">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <span className="text-lg font-semibold">{SITE.name}</span>
            <p className="mt-3 text-sm text-muted">{SITE.tagline}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Product</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>
                <Link href="/#features" className="hover:text-foreground">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="hover:text-foreground">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/download" className="hover:text-foreground">
                  Download
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-foreground">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Compare
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              {COMPETITORS.map((c) => (
                <li key={c.slug}>
                  <Link href={`/vs/${c.slug}`} className="hover:text-foreground">
                    Bloom Meeting vs {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">For</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              {INDUSTRIES.slice(0, 8).map((i) => (
                <li key={i.slug}>
                  <Link href={`/for/${i.slug}`} className="hover:text-foreground">
                    {i.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-xs text-muted sm:flex-row sm:items-center">
          <span>
            &copy; {new Date().getFullYear()} {SITE.name}. Built by Advanced
            Marketing.
          </span>
          <a
            href={SITE.githubRepoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground"
          >
            Source & releases on GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
