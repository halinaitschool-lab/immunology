export const dynamic = "force-dynamic";

import { ContentListPage } from "@/components/ContentListPage";
import { getPostsByKind } from "@/lib/content";

export default async function GuidesPage() {
  const posts = await getPostsByKind("guide");
  return <ContentListPage kind="guide" locale="uk" posts={posts} />;
}
