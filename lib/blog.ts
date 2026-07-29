import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  content: string;
};

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getPost(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    date: data.date ?? "",
    author: data.author ?? "Bloom Meeting",
    content,
  };
}

export function getAllPosts(): BlogPost[] {
  return getAllSlugs()
    .map((slug) => getPost(slug))
    .filter((p): p is BlogPost => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
