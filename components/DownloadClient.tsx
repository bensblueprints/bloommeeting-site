"use client";

import { useEffect, useMemo, useState } from "react";
import { SITE, WHOP_URL } from "@/lib/config";

type GithubAsset = {
  name: string;
  size: number;
  browser_download_url: string;
  download_count: number;
};

type GithubRelease = {
  tag_name: string;
  name: string;
  body: string;
  published_at: string;
  prerelease: boolean;
  assets: GithubAsset[];
};

type DetectedOS = "windows" | "mac" | "other";

function detectOS(): DetectedOS {
  if (typeof navigator === "undefined") return "other";
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("win")) return "windows";
  if (ua.includes("mac")) return "mac";
  return "other";
}

function assetOS(assetName: string): DetectedOS {
  const n = assetName.toLowerCase();
  if (n.endsWith(".exe") || n.endsWith(".msi")) return "windows";
  if (n.endsWith(".dmg") || n.endsWith(".pkg")) return "mac";
  return "other";
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function DownloadClient() {
  const [releases, setReleases] = useState<GithubRelease[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [detected, setDetected] = useState<DetectedOS>("other");

  useEffect(() => {
    // Client-only value (navigator isn't available during SSR), so it must
    // be set after mount rather than derived during render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDetected(detectOS);
    fetch(SITE.githubReleasesApi, {
      headers: { Accept: "application/vnd.github+json" },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub API returned ${res.status}`);
        return res.json();
      })
      .then((data: GithubRelease[]) => {
        setReleases(data.filter((r) => Array.isArray(r.assets)));
      })
      .catch((err) => setError(err.message ?? "Failed to load releases"));
  }, []);

  const latest = useMemo(
    () => (releases && releases.length > 0 ? releases[0] : null),
    [releases]
  );

  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Download <span className="gradient-text">{SITE.name}</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-muted">
          Grab the latest release straight from GitHub. Try it free — buying
          unlocks the license.
        </p>
      </div>

      {error && (
        <div className="mt-10 rounded-xl border border-border bg-background-elevated p-6 text-center text-sm text-muted">
          Couldn&apos;t load releases from GitHub right now ({error}). You can
          browse them directly on{" "}
          <a
            href={SITE.githubRepoUrl + "/releases"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink underline"
          >
            GitHub
          </a>
          .
        </div>
      )}

      {!releases && !error && (
        <div className="mt-10 text-center text-sm text-muted">
          Loading releases…
        </div>
      )}

      {releases && releases.length === 0 && !error && (
        <div className="mt-10 rounded-xl border border-border bg-background-elevated p-6 text-center text-sm text-muted">
          No releases are published yet. Check back shortly, or watch the{" "}
          <a
            href={SITE.githubRepoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink underline"
          >
            GitHub repo
          </a>{" "}
          for the first release.
        </div>
      )}

      {latest && (
        <div className="gradient-border gradient-ring mt-12 rounded-2xl bg-background-elevated p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs text-muted">
                Latest release
              </span>
              <h2 className="mt-3 text-2xl font-bold">
                {latest.name || latest.tag_name}
              </h2>
              <p className="mt-1 text-sm text-muted">
                Published {formatDate(latest.published_at)}
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {(["windows", "mac"] as DetectedOS[]).map((os) => {
              const asset = latest.assets.find((a) => assetOS(a.name) === os);
              const isDetected = detected === os;
              return (
                <div
                  key={os}
                  className={`rounded-xl border p-5 ${
                    isDetected ? "border-pink/60 bg-background" : "border-border"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">
                      {os === "windows" ? "Windows" : "macOS"}
                    </span>
                    {isDetected && (
                      <span className="rounded-full bg-pink/15 px-2 py-0.5 text-xs font-medium text-pink">
                        Detected
                      </span>
                    )}
                  </div>
                  {asset ? (
                    <>
                      <p className="mt-1 text-xs text-muted">
                        {asset.name} &middot; {formatBytes(asset.size)}
                      </p>
                      <a
                        href={asset.browser_download_url}
                        className="btn-gradient mt-4 block w-full rounded-full px-5 py-2.5 text-center text-sm font-semibold text-white transition"
                      >
                        Download for {os === "windows" ? "Windows" : "Mac"}
                      </a>
                    </>
                  ) : (
                    <p className="mt-3 text-xs text-muted">
                      No {os === "windows" ? "Windows" : "macOS"} build in
                      this release yet.
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {latest.body && (
            <div className="mt-8 border-t border-border pt-6">
              <h3 className="text-sm font-semibold text-foreground">
                What&apos;s in this release
              </h3>
              <pre className="mt-3 whitespace-pre-wrap font-sans text-sm leading-relaxed text-muted">
                {latest.body}
              </pre>
            </div>
          )}
        </div>
      )}

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border p-6 text-sm text-muted">
          <h3 className="font-semibold text-foreground">
            First launch on Windows
          </h3>
          <p className="mt-2 leading-relaxed">
            Bloom Meeting is a small indie release, so Windows SmartScreen may
            show &quot;Windows protected your PC.&quot; Click{" "}
            <strong className="text-foreground">More info</strong>, then{" "}
            <strong className="text-foreground">Run anyway</strong>. This is
            expected for apps without a paid EV code-signing certificate — it
            doesn&apos;t mean anything is wrong with the download.
          </p>
        </div>
        <div className="rounded-xl border border-border p-6 text-sm text-muted">
          <h3 className="font-semibold text-foreground">
            First launch on macOS
          </h3>
          <p className="mt-2 leading-relaxed">
            macOS Gatekeeper may block the first launch with &quot;can&apos;t
            be opened because Apple cannot check it for malicious
            software.&quot; Right-click (or Control-click) the app in
            Finder, choose <strong className="text-foreground">Open</strong>,
            then confirm <strong className="text-foreground">Open</strong>{" "}
            again in the dialog. You only need to do this once.
          </p>
        </div>
      </div>

      <div className="mt-10 rounded-xl border border-border bg-background-elevated p-6 text-center text-sm text-muted">
        Downloading installs a fully working trial. Buy a license to unlock
        it permanently —{" "}
        <a
          href={WHOP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-pink underline"
        >
          {SITE.priceDisplay} one time
        </a>
        , no subscription.
      </div>

      {releases && releases.length > 1 && (
        <div className="mt-14">
          <h2 className="text-xl font-bold">Previous releases</h2>
          <div className="mt-6 space-y-4">
            {releases.slice(1, 8).map((r) => (
              <div
                key={r.tag_name}
                className="rounded-xl border border-border p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-semibold">{r.name || r.tag_name}</span>
                  <span className="text-xs text-muted">
                    {formatDate(r.published_at)}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {r.assets.map((a) => (
                    <a
                      key={a.name}
                      href={a.browser_download_url}
                      className="rounded-full border border-border px-3 py-1.5 text-xs text-muted transition hover:border-pink/40 hover:text-foreground"
                    >
                      {a.name} ({formatBytes(a.size)})
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
