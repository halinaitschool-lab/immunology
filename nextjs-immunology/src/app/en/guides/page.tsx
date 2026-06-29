export const dynamic = "force-dynamic";

import { ContentListPage } from "@/components/ContentListPage";
import { getPostsByKind } from "@/lib/content";

export default async function GuidesPageEn() {
  const posts = await getPostsByKind("guide");
  return <ContentListPage kind="guide" locale="en" posts={posts} />;
}
