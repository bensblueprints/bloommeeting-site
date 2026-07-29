import Link from "next/link";
import Image from "next/image";
import { NAV_LINKS, SITE, WHOP_URL } from "@/lib/config";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/icon.png"
            alt={`${SITE.name} logo`}
            width={32}
            height={32}
            className="rounded-lg"
          />
          <span className="text-lg font-semibold tracking-tight">
            {SITE.name}
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-muted md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <a
          href={WHOP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gradient rounded-full px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-pink/10 transition"
        >
          Buy once — {SITE.priceDisplay}
        </a>
      </div>
    </header>
  );
}
