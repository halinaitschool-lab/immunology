import type { Metadata } from "next";
import { ContentListClient } from "@/components/content/ContentListClient";
import { contentPages } from "@/lib/content-pages";
import { fetchContentList } from "@/lib/fetch-content";

const config = contentPages.lectures;

export const metadata: Metadata = {
  title: `${config.listTitleUk} — Ліля Нестеровська`,
  description: config.listSubtitleUk,
};

export default async function LecturesPage() {
  const items = await fetchContentList("lecture");
  return <ContentListClient config={config} items={items} />;
}
