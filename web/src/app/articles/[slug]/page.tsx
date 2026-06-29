import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentDetailClient } from "@/components/content/ContentDetailClient";
import { contentPages } from "@/lib/content-pages";
import { fetchContentDetail } from "@/lib/fetch-content";

const config = contentPages.articles;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await fetchContentDetail("article", slug);
  if (!item) return { title: "Стаття" };
  return {
    title: `${item.title} — Наукові статті`,
    description: item.excerpt,
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = await fetchContentDetail("article", slug);
  if (!item) notFound();
  return <ContentDetailClient config={config} item={item} />;
}
