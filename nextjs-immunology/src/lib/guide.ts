import type { PortableTextBlock } from "next-sanity";
import { client } from "@/sanity/client";

export type GuideTextItem = { text: string };
export type GuideStep = {
  title: string;
  estimatedTime?: string;
  content?: PortableTextBlock[];
  image?: { asset?: { _ref: string } };
};
export type GuideTitledBlock = {
  title?: string;
  content?: PortableTextBlock[];
};
export type GuideChecklistItem = { icon?: string; item: string };
export type GuideFaqItem = {
  question: string;
  answer: PortableTextBlock[];
};
export type GuideRelated = {
  _id: string;
  title: string;
  slug: string;
  shortDescription?: string;
  readingTime?: number;
  heroImage?: { asset?: { _ref: string } };
};

export type GuideDocument = {
  _id: string;
  _type: "guide";
  title: string;
  subtitle?: string;
  slug: string;
  publishedAt: string;
  updatedAt?: string;
  readingTime?: number;
  shortDescription?: string;
  seoTitle?: string;
  seoDescription?: string;
  heroImage?: { asset?: { _ref: string } };
  downloadablePdf?: {
    asset?: { url?: string; originalFilename?: string };
  };
  quickFacts?: GuideTextItem[];
  whoIsFor?: GuideTextItem[];
  steps?: GuideStep[];
  tips?: GuideTitledBlock[];
  warnings?: GuideTitledBlock[];
  checklist?: GuideChecklistItem[];
  afterProcedure?: PortableTextBlock[];
  faq?: GuideFaqItem[];
  related?: GuideRelated[];
};

const GUIDE_PROJECTION = `{
  _id,
  _type,
  title,
  subtitle,
  "slug": slug.current,
  publishedAt,
  updatedAt,
  readingTime,
  shortDescription,
  seoTitle,
  seoDescription,
  heroImage,
  downloadablePdf{
    asset->{url, originalFilename}
  },
  quickFacts[]{text},
  whoIsFor[]{text},
  steps[]{
    title,
    estimatedTime,
    content,
    image
  },
  tips[]{title, content},
  warnings[]{title, content},
  checklist[]{icon, item},
  afterProcedure,
  faq[]{question, answer},
  "related": relatedGuides[]->{
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    readingTime,
    heroImage
  }
}`;

export async function getGuideBySlug(slug: string): Promise<GuideDocument | null> {
  const query = `*[_type == "guide" && slug.current == $slug][0]${GUIDE_PROJECTION}`;
  const guide = await client.fetch<GuideDocument | null>(
    query,
    { slug },
    { next: { revalidate: 30 } },
  );

  if (!guide) return null;

  if (!guide.related?.length) {
    const autoRelated = await client.fetch<GuideRelated[]>(
      `*[_type == "guide" && slug.current != $slug] | order(publishedAt desc)[0...3]{
        _id,
        title,
        "slug": slug.current,
        shortDescription,
        readingTime,
        heroImage
      }`,
      { slug },
      { next: { revalidate: 30 } },
    );
    guide.related = autoRelated;
  }

  return guide;
}
