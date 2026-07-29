import type { Metadata } from "next";
import DownloadClient from "@/components/DownloadClient";
import { SITE } from "@/lib/config";

export const metadata: Metadata = {
  title: "Download",
  description: `Download ${SITE.name} for Windows or macOS. Try it free, buy a license for ${SITE.priceDisplay} once to unlock it — no subscription.`,
  alternates: { canonical: "/download" },
};

export default function DownloadPage() {
  return <DownloadClient />;
}
