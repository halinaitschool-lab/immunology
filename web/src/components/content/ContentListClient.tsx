"use client";

import type { ContentPageConfig } from "@/lib/content-pages";
import type { ContentListItem } from "@/sanity/types";
import { ContentShell } from "./ContentShell";
import { ContentCard } from "./ContentCard";
import { useLocale } from "./useLocale";

type Props = {
  config: ContentPageConfig;
  items: ContentListItem[];
};

export function ContentListClient({ config, items }: Props) {
  const [locale] = useLocale();
  const title = locale === "en" ? config.listTitleEn : config.listTitleUk;
  const subtitle = locale === "en" ? config.listSubtitleEn : config.listSubtitleUk;
  const empty = locale === "en" ? config.emptyEn : config.emptyUk;
  const readLabel = locale === "en" ? "Read more" : "Читати";

  const featured = items.filter((item) => item.featured);
  const regular = items.filter((item) => !item.featured);

  return (
    <ContentShell>
      <section className="content-hero">
        <div className="content-hero-badge">
          <i className={`fa-solid ${config.icon}`} />
          {title}
        </div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </section>

      {items.length === 0 ? (
        <div className="content-empty">{empty}</div>
      ) : (
        <div className="content-grid">
          {featured.map((item) => (
            <ContentCard
              key={item._id}
              item={item}
              href={`${config.basePath}/${item.slug}`}
              locale={locale}
              featured
              icon={config.icon}
              readLabel={readLabel}
            />
          ))}
          {regular.map((item) => (
            <ContentCard
              key={item._id}
              item={item}
              href={`${config.basePath}/${item.slug}`}
              locale={locale}
              icon={config.icon}
              readLabel={readLabel}
            />
          ))}
        </div>
      )}
    </ContentShell>
  );
}
