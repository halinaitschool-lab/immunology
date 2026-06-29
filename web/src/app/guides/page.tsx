import type { Metadata } from "next";
import { ContentListClient } from "@/components/content/ContentListClient";
import { contentPages } from "@/lib/content-pages";
import { fetchContentList } from "@/lib/fetch-content";

const config = contentPages.guides;

export const metadata: Metadata = {
  title: `${config.listTitleUk} — Ліля Нестеровська`,
  description: config.listSubtitleUk,
};

export default async function GuidesPage() {
  const items = await fetchContentList("guide");
  return <ContentListClient config={config} items={items} />;
}
