import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { SITE } from "@/lib/config";

export const metadata: Metadata = {
  title: "Blog",
  description: `Guides and updates from ${SITE.name} — remote podcast recording, editing, and the case for buying software once.`,
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        The <span className="gradient-text">{SITE.name}</span> blog
      </h1>
      <p className="mt-4 max-w-2xl text-muted">
        Guides on remote recording, editing workflows, and honest comparisons
        with the tools you&apos;re probably already paying for.
      </p>

      <div className="mt-14 space-y-8">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="gradient-border block rounded-2xl bg-background-elevated p-6 transition hover:border-pink/40"
          >
            <p className="text-xs text-muted">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <h2 className="mt-2 text-xl font-bold">{post.title}</h2>
            <p className="mt-2 text-sm text-muted">{post.description}</p>
          </Link>
        ))}
        {posts.length === 0 && (
          <p className="text-sm text-muted">No posts published yet.</p>
        )}
      </div>
    </div>
  );
}
