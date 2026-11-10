import type { MetadataRoute } from "next";
import { projetos } from "@/content/site";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteUrl}/`, changeFrequency: "monthly", priority: 1 },
    ...["/servicos", "/projetos", "/sobre", "/contato"].map((caminho) => ({
      url: `${siteUrl}${caminho}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...projetos.map((p) => ({
      url: `${siteUrl}/projetos/${p.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
