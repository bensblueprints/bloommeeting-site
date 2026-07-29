import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllSlugs, getPost } from "@/lib/blog";
import { SITE, WHOP_URL } from "@/lib/config";
import { articleJsonLd } from "@/lib/jsonld";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${SITE.url}/blog/${slug}`,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              title: post.title,
              description: post.description,
              date: post.date,
              url: `${SITE.url}/blog/${slug}`,
            })
          ),
        }}
      />
      <p className="text-sm text-muted">
        <Link href="/blog" className="hover:text-foreground">
          Blog
        </Link>
      </p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight">
        {post.title}
      </h1>
      <p className="mt-3 text-sm text-muted">
        {new Date(post.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}{" "}
        &middot; {post.author}
      </p>

      <div className="prose-bloom mt-10">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </div>

      <div className="mt-16 rounded-2xl border border-border bg-background-elevated p-8 text-center">
        <h2 className="text-xl font-bold">
          Ready to record without the monthly bill?
        </h2>
        <p className="mt-2 text-sm text-muted">
          {SITE.name} is {SITE.priceDisplay}, once.
        </p>
        <a
          href={WHOP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gradient mt-6 inline-block rounded-full px-6 py-3 text-sm font-semibold text-white transition"
        >
          Buy {SITE.name}
        </a>
      </div>
    </div>
  );
}
