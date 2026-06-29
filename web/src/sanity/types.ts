import type { PortableTextBlock } from "@portabletext/react";

export type SanityImage = {
  asset?: { _ref: string };
  alt?: string;
  altEn?: string;
  caption?: string;
};

export type ContentListItem = {
  _id: string;
  title: string;
  titleEn?: string;
  slug: string;
  excerpt: string;
  excerptEn?: string;
  coverImage?: SanityImage;
  publishedAt?: string;
  readingTimeMinutes?: number;
  featured?: boolean;
};

export type Lecture = ContentListItem & {
  _type: "lecture";
  videoUrl?: string;
  duration?: string;
  durationEn?: string;
  level?: string;
  learningOutcomes?: string[];
  learningOutcomesEn?: string[];
  topics?: string[];
  body?: PortableTextBlock[];
  bodyEn?: PortableTextBlock[];
};

export type Guide = ContentListItem & {
  _type: "guide";
  targetAudience?: string;
  targetAudienceEn?: string;
  steps?: {
    title?: string;
    titleEn?: string;
    description?: string;
    descriptionEn?: string;
  }[];
  relatedConditions?: string[];
  downloadUrl?: string;
  body?: PortableTextBlock[];
  bodyEn?: PortableTextBlock[];
};

export type Article = ContentListItem & {
  _type: "article";
  journal?: string;
  authors?: string[];
  doi?: string;
  abstract?: string;
  abstractEn?: string;
  keywords?: string[];
  externalUrl?: string;
  clinicalRelevance?: string;
  clinicalRelevanceEn?: string;
  body?: PortableTextBlock[];
  bodyEn?: PortableTextBlock[];
};

export type Conference = ContentListItem & {
  _type: "conference";
  eventDate?: string;
  location?: string;
  locationEn?: string;
  organizer?: string;
  role?: string;
  presentationTitle?: string;
  presentationTitleEn?: string;
  presentationTopics?: string[];
  registrationUrl?: string;
  slidesUrl?: string;
  body?: PortableTextBlock[];
  bodyEn?: PortableTextBlock[];
};

export type ContentDocument = Lecture | Guide | Article | Conference;

export type ContentKind = "lecture" | "guide" | "article" | "conference";

export const CONTENT_TYPES: ContentKind[] = [
  "lecture",
  "guide",
  "article",
  "conference",
];
