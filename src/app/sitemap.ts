import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nabill.tech";
const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://apim.nabilll.tech/";
const BLOG_API_URL = `${apiUrl}api/blog/public`;

// TODO: Replace NEXT_PUBLIC_SITE_URL with your real production domain.

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [{
    url: SITE_URL,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
  }];

  try {
    const response = await fetch(BLOG_API_URL, { next: { revalidate: 300 } });
    if (!response.ok) return entries;

    const result = (await response.json()) as {
      success: boolean;
      data: { slug: string; updatedAt: string; publishedAt: string }[];
    };

    if (result.success) {
      entries.push(...result.data.map((post) => ({
        url: `${SITE_URL}/blog/${post.slug}`,
        lastModified: new Date(post.updatedAt || post.publishedAt),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })));
    }
  } catch {
  }

  return entries;
}
