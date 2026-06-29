export const dynamic = "force-dynamic";

import { GuidePage } from "@/components/GuidePage";
import { PostPage } from "@/components/PostPage";
import { getGuideBySlug } from "@/lib/guide";

export default async function SlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);
  if (guide) return <GuidePage guide={guide} locale="uk" />;
  return <PostPage slug={slug} locale="uk" />;
}
