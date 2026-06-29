"use client";

import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/locale";
import {
  formatDate,
  localizedExcerpt,
  localizedTitle,
} from "@/lib/localized-content";
import type { ContentListItem } from "@/sanity/types";
import { urlFor } from "@/sanity/image";

type Props = {
  item: ContentListItem;
  href: string;
  locale: Locale;
  featured?: boolean;
  icon: string;
  readLabel: string;
};

export function ContentCard({
  item,
  href,
  locale,
  featured,
  icon,
  readLabel,
}: Props) {
  const title = localizedTitle(item, locale);
  const excerpt = localizedExcerpt(item, locale);
  const imageUrl = item.coverImage?.asset
    ? urlFor(item.coverImage).width(800).height(500).url()
    : null;

  return (
    <Link
      href={href}
      className={`content-card${featured ? " content-card-featured" : ""}`}
    >
      <div className="content-card-image">
        {imageUrl ? (
          <Image src={imageUrl} alt={item.coverImage?.alt || title} width={800} height={500} />
        ) : (
          <div className="content-card-image-placeholder">
            <i className={`fa-solid ${icon}`} />
          </div>
        )}
      </div>
      <div className="content-card-body">
        <div className="content-card-meta">
          {item.publishedAt ? (
            <span>
              <i className="fa-regular fa-calendar" />
              {formatDate(item.publishedAt, locale)}
            </span>
          ) : null}
          {item.readingTimeMinutes ? (
            <span>
              <i className="fa-regular fa-clock" />
              {item.readingTimeMinutes} {locale === "en" ? "min" : "хв"}
            </span>
          ) : null}
        </div>
        <h2>{title}</h2>
        <p>{excerpt}</p>
        <span className="content-card-link">
          {readLabel} <i className="fa-solid fa-arrow-right" />
        </span>
      </div>
    </Link>
  );
}
