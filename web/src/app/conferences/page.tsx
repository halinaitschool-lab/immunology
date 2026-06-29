import type { Metadata } from "next";
import { ContentListClient } from "@/components/content/ContentListClient";
import { contentPages } from "@/lib/content-pages";
import { fetchContentList } from "@/lib/fetch-content";

const config = contentPages.conferences;

export const metadata: Metadata = {
  title: `${config.listTitleUk} — Ліля Нестеровська`,
  description: config.listSubtitleUk,
};

export default async function ConferencesPage() {
  const items = await fetchContentList("conference");
  return <ContentListClient config={config} items={items} />;
}
