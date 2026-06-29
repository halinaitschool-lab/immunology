import type { ContentKind } from "@/sanity/types";

export type ContentPageConfig = {
  kind: ContentKind;
  basePath: string;
  listTitleUk: string;
  listTitleEn: string;
  listSubtitleUk: string;
  listSubtitleEn: string;
  emptyUk: string;
  emptyEn: string;
  icon: string;
};

export const contentPages: Record<
  "lectures" | "guides" | "articles" | "conferences",
  ContentPageConfig
> = {
  lectures: {
    kind: "lecture",
    basePath: "/lectures",
    listTitleUk: "Лекції",
    listTitleEn: "Lectures",
    listSubtitleUk:
      "Короткі навчальні матеріали про алергологію та імунологію — зрозуміло і без зайвого жаргону.",
    listSubtitleEn:
      "Educational materials on allergology and immunology — clear and without unnecessary jargon.",
    emptyUk: "Лекції скоро з’являться. Додайте перші матеріали в Sanity Studio.",
    emptyEn: "Lectures coming soon. Add your first items in Sanity Studio.",
    icon: "fa-book-open",
  },
  guides: {
    kind: "guide",
    basePath: "/guides",
    listTitleUk: "Гайди",
    listTitleEn: "Guides",
    listSubtitleUk:
      "Покрокові інструкції для пацієнтів — від підготовки до візиту до повсякденного догляду.",
    listSubtitleEn:
      "Step-by-step guides for patients — from visit preparation to everyday care.",
    emptyUk: "Гайди скоро з’являться. Додайте перші матеріали в Sanity Studio.",
    emptyEn: "Guides coming soon. Add your first items in Sanity Studio.",
    icon: "fa-file-lines",
  },
  articles: {
    kind: "article",
    basePath: "/articles",
    listTitleUk: "Наукові статті",
    listTitleEn: "Scientific articles",
    listSubtitleUk:
      "Огляди досліджень і публікацій з коментарями щодо клінічної значущості.",
    listSubtitleEn:
      "Research reviews and publications with notes on clinical relevance.",
    emptyUk: "Статті скоро з’являться. Додайте перші матеріали в Sanity Studio.",
    emptyEn: "Articles coming soon. Add your first items in Sanity Studio.",
    icon: "fa-file-medical",
  },
  conferences: {
    kind: "conference",
    basePath: "/conferences",
    listTitleUk: "Конференції",
    listTitleEn: "Conferences",
    listSubtitleUk:
      "Доповіді, участь у заходах і матеріали з професійних конференцій.",
    listSubtitleEn:
      "Talks, event participation, and materials from professional conferences.",
    emptyUk: "Конференції скоро з’являться. Додайте перші матеріали в Sanity Studio.",
    emptyEn: "Conferences coming soon. Add your first items in Sanity Studio.",
    icon: "fa-microphone-lines",
  },
};

export function getPageConfigByKind(kind: ContentKind) {
  return Object.values(contentPages).find((page) => page.kind === kind)!;
}
