import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentDetailClient } from "@/components/content/ContentDetailClient";
import { contentPages } from "@/lib/content-pages";
import { fetchContentDetail } from "@/lib/fetch-content";

const config = contentPages.lectures;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await fetchContentDetail("lecture", slug);
  if (!item) return { title: "Лекція" };
  return {
    title: `${item.title} — Лекції`,
    description: item.excerpt,
  };
}

export default async function LectureDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = await fetchContentDetail("lecture", slug);
  if (!item) notFound();
  return <ContentDetailClient config={config} item={item} />;
}
