import { client } from "@/sanity/client";
import type { ContentKind, ContentDocument, ContentListItem } from "@/sanity/types";
import {
  articleDetailQuery,
  articleListQuery,
  conferenceDetailQuery,
  conferenceListQuery,
  guideDetailQuery,
  guideListQuery,
  lectureDetailQuery,
  lectureListQuery,
} from "@/sanity/queries";

const listQueries: Record<ContentKind, string> = {
  lecture: lectureListQuery,
  guide: guideListQuery,
  article: articleListQuery,
  conference: conferenceListQuery,
};

const detailQueries: Record<ContentKind, string> = {
  lecture: lectureDetailQuery,
  guide: guideDetailQuery,
  article: articleDetailQuery,
  conference: conferenceDetailQuery,
};

export async function fetchContentList(type: ContentKind) {
  try {
    return await client.fetch<ContentListItem[]>(listQueries[type]);
  } catch {
    return [];
  }
}

export async function fetchContentDetail(type: ContentKind, slug: string) {
  try {
    return await client.fetch<ContentDocument | null>(detailQueries[type], { slug });
  } catch {
    return null;
  }
}
