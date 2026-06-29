import type { Locale } from "@/lib/locale";
import type { ContentListItem } from "@/sanity/types";

export function pickLocale<T extends string | undefined>(
  locale: Locale,
  uk: T,
  en: T | undefined,
): T | undefined {
  if (locale === "en" && en) return en;
  return uk;
}

export function pickLocaleList(
  locale: Locale,
  uk: string[] | undefined,
  en: string[] | undefined,
) {
  if (locale === "en" && en?.length) return en;
  return uk;
}

export function localizedTitle(item: ContentListItem, locale: Locale) {
  return pickLocale(locale, item.title, item.titleEn) ?? item.title;
}

export function localizedExcerpt(item: ContentListItem, locale: Locale) {
  return pickLocale(locale, item.excerpt, item.excerptEn) ?? item.excerpt;
}

export function formatDate(date: string | undefined, locale: Locale) {
  if (!date) return "";
  return new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "uk-UA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}
