import { ContentListPage } from "@/components/ContentListPage";
import { getPostsByKind } from "@/lib/content";

export default async function MiniLecturesPage() {
  const posts = await getPostsByKind("lecture");
  return <ContentListPage kind="lecture" locale="uk" posts={posts} />;
}
