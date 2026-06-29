import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentDetailClient } from "@/components/content/ContentDetailClient";
import { contentPages } from "@/lib/content-pages";
import { fetchContentDetail } from "@/lib/fetch-content";

const config = contentPages.guides;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await fetchContentDetail("guide", slug);
  if (!item) return { title: "Гайд" };
  return {
    title: `${item.title} — Гайди`,
    description: item.excerpt,
  };
}

export default async function GuideDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = await fetchContentDetail("guide", slug);
  if (!item) notFound();
  return <ContentDetailClient config={config} item={item} />;
}
