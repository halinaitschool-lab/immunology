import type { Metadata } from "next";
import { ContentListClient } from "@/components/content/ContentListClient";
import { contentPages } from "@/lib/content-pages";
import { fetchContentList } from "@/lib/fetch-content";

const config = contentPages.articles;

export const metadata: Metadata = {
  title: `${config.listTitleUk} — Ліля Нестеровська`,
  description: config.listSubtitleUk,
};

export default async function ArticlesPage() {
  const items = await fetchContentList("article");
  return <ContentListClient config={config} items={items} />;
}
