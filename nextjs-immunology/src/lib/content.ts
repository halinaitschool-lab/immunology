import type { SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";

export type ContentKind = "guide" | "lecture";

export type ContentPost = {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt?: string;
  readingTime?: number;
  heroImage?: { asset?: { _ref: string } };
};

const KIND_FILTER: Record<ContentKind, string> = {
  guide: '_type == "guide"',
  lecture:
    '_type == "post" && (slug.current match "lecture-*" || lower(title) match "*лекц*" || lower(title) match "*lecture*")',
};

export async function getPostsByKind(kind: ContentKind) {
  const filter = KIND_FILTER[kind];
  const guideFields =
    'readingTime, heroImage, "excerpt": coalesce(shortDescription, "")';
  const lectureFields = '"excerpt": pt::text(body[0..1])[0...180]';
  const extra = kind === "guide" ? guideFields : lectureFields;

  const query = `*[${filter}] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    ${extra}
  }`;

  return client.fetch<ContentPost[]>(query, {}, { next: { revalidate: 30 } });
}

export async function getPostBySlug(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0]`;
  return client.fetch<SanityDocument | null>(query, { slug }, { next: { revalidate: 30 } });
}
