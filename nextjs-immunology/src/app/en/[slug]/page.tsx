import { GuidePage } from "@/components/GuidePage";
import { PostPage } from "@/components/PostPage";
import { getGuideBySlug } from "@/lib/guide";

export default async function EnSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);
  if (guide) return <GuidePage guide={guide} locale="en" />;
  return <PostPage slug={slug} locale="en" />;
}
