import { ContentListPage } from "@/components/ContentListPage";
import { getPostsByKind } from "@/lib/content";

export default async function MiniLecturesPageEn() {
  const posts = await getPostsByKind("lecture");
  return <ContentListPage kind="lecture" locale="en" posts={posts} />;
}
