import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentDetailClient } from "@/components/content/ContentDetailClient";
import { contentPages } from "@/lib/content-pages";
import { fetchContentDetail } from "@/lib/fetch-content";

const config = contentPages.conferences;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await fetchContentDetail("conference", slug);
  if (!item) return { title: "Конференція" };
  return {
    title: `${item.title} — Конференції`,
    description: item.excerpt,
  };
}

export default async function ConferenceDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = await fetchContentDetail("conference", slug);
  if (!item) notFound();
  return <ContentDetailClient config={config} item={item} />;
}
