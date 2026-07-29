import Image from "next/image";
import { FEATURES } from "@/lib/config";

export default function FeatureGrid() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Everything a remote podcast studio needs.{" "}
          <span className="gradient-text">Nothing it doesn&apos;t.</span>
        </h2>
        <p className="mt-4 text-muted">
          Built on the same local-first recording engine as BloomRecorder,
          with a meeting layer on top designed for one thing: getting a
          remote guest recorded at studio quality with zero setup friction.
        </p>
      </div>

      <div className="mt-16 grid gap-6 sm:grid-cols-2">
        {FEATURES.map((feature) => (
          <div
            key={feature.title}
            className="gradient-border flex flex-col overflow-hidden rounded-2xl bg-background-elevated transition hover:border-pink/40"
          >
            {feature.image && (
              <div className="relative aspect-video w-full overflow-hidden border-b border-border bg-background">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover object-top"
                />
              </div>
            )}
            <div className="p-6">
              <h3 className="text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
