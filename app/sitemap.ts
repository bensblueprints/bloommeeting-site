import type { MetadataRoute } from "next";
import { COMPETITORS, INDUSTRIES, SITE } from "@/lib/config";
import { getAllSlugs } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE.url}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.url}/download`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE.url}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
  ];

  const vsRoutes: MetadataRoute.Sitemap = COMPETITORS.map((c) => ({
    url: `${SITE.url}/vs/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const forRoutes: MetadataRoute.Sitemap = INDUSTRIES.map((i) => ({
    url: `${SITE.url}/for/${i.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = getAllSlugs().map((slug) => ({
    url: `${SITE.url}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...vsRoutes, ...forRoutes, ...blogRoutes];
}
