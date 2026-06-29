const listProjection = `{
  _id,
  _type,
  title,
  titleEn,
  "slug": slug.current,
  excerpt,
  excerptEn,
  coverImage,
  publishedAt,
  readingTimeMinutes,
  featured
}`;

export function listQuery(type: string) {
  return `*[_type == "${type}"] | order(featured desc, publishedAt desc) ${listProjection}`;
}

export function detailQuery(type: string) {
  return `*[_type == "${type}" && slug.current == $slug][0]`;
}

export const lectureListQuery = listQuery("lecture");
export const guideListQuery = listQuery("guide");
export const articleListQuery = listQuery("article");
export const conferenceListQuery = listQuery("conference");

export const lectureDetailQuery = detailQuery("lecture");
export const guideDetailQuery = detailQuery("guide");
export const articleDetailQuery = detailQuery("article");
export const conferenceDetailQuery = detailQuery("conference");
