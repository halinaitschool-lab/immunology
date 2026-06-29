"use client";

import Image from "next/image";
import Link from "next/link";
import type { ContentPageConfig } from "@/lib/content-pages";
import {
  formatDate,
  localizedExcerpt,
  localizedTitle,
  pickLocale,
  pickLocaleList,
} from "@/lib/localized-content";
import type {
  Article,
  Conference,
  ContentDocument,
  Guide,
  Lecture,
} from "@/sanity/types";
import { urlFor } from "@/sanity/image";
import { ContentShell } from "./ContentShell";
import { PortableTextRenderer } from "./PortableTextRenderer";
import { useLocale } from "./useLocale";

type Props = {
  config: ContentPageConfig;
  item: ContentDocument;
};

function Sidebar({ item, locale }: { item: ContentDocument; locale: "uk" | "en" }) {
  if (item._type === "lecture") {
    const lecture = item as Lecture;
    const outcomes = pickLocaleList(
      locale,
      lecture.learningOutcomes,
      lecture.learningOutcomesEn,
    );
    return (
      <>
        {lecture.videoUrl ? (
          <div className="content-sidebar-card">
            <h3>{locale === "en" ? "Watch" : "Відео"}</h3>
            <a href={lecture.videoUrl} target="_blank" rel="noreferrer" className="content-btn">
              <i className="fa-solid fa-play" />
              {locale === "en" ? "Open video" : "Відкрити відео"}
            </a>
          </div>
        ) : null}
        {outcomes?.length ? (
          <div className="content-sidebar-card">
            <h3>{locale === "en" ? "You will learn" : "Ви дізнаєтесь"}</h3>
            <ul className="content-sidebar-list">
              {outcomes.map((point) => (
                <li key={point}>
                  <i className="fa-solid fa-check" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {lecture.topics?.length ? (
          <div className="content-sidebar-card">
            <h3>{locale === "en" ? "Topics" : "Теми"}</h3>
            <div className="content-tag-row">
              {lecture.topics.map((tag) => (
                <span key={tag} className="content-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ) : null}
      </>
    );
  }

  if (item._type === "guide") {
    const guide = item as Guide;
    const audience = pickLocale(locale, guide.targetAudience, guide.targetAudienceEn);
    return (
      <>
        {audience ? (
          <div className="content-sidebar-card">
            <h3>{locale === "en" ? "For whom" : "Для кого"}</h3>
            <p>{audience}</p>
          </div>
        ) : null}
        {guide.steps?.length ? (
          <div className="content-sidebar-card">
            <h3>{locale === "en" ? "Overview" : "Коротко"}</h3>
            <div className="content-steps">
              {guide.steps.map((step, index) => (
                <div key={index} className="content-step">
                  <div className="content-step-num">{index + 1}</div>
                  <div>
                    <h4>
                      {pickLocale(locale, step.title, step.titleEn) || step.title}
                    </h4>
                    <p>{pickLocale(locale, step.description, step.descriptionEn)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
        {guide.downloadUrl ? (
          <a href={guide.downloadUrl} target="_blank" rel="noreferrer" className="content-btn">
            <i className="fa-solid fa-download" />
            PDF
          </a>
        ) : null}
      </>
    );
  }

  if (item._type === "article") {
    const article = item as Article;
    const abstract = pickLocale(locale, article.abstract, article.abstractEn);
    const relevance = pickLocale(
      locale,
      article.clinicalRelevance,
      article.clinicalRelevanceEn,
    );
    return (
      <>
        {article.journal ? (
          <div className="content-sidebar-card">
            <h3>{locale === "en" ? "Source" : "Джерело"}</h3>
            <p>{article.journal}</p>
            {article.authors?.length ? (
              <p style={{ marginTop: "0.5rem", fontSize: "0.86rem", color: "var(--muted)" }}>
                {article.authors.join(", ")}
              </p>
            ) : null}
          </div>
        ) : null}
        {abstract ? (
          <div className="content-sidebar-card">
            <h3>{locale === "en" ? "Abstract" : "Анотація"}</h3>
            <p style={{ fontSize: "0.88rem", lineHeight: 1.6 }}>{abstract}</p>
          </div>
        ) : null}
        {relevance ? (
          <div className="content-sidebar-card">
            <h3>{locale === "en" ? "Clinical relevance" : "Клінічна значущість"}</h3>
            <p style={{ fontSize: "0.88rem", lineHeight: 1.6 }}>{relevance}</p>
          </div>
        ) : null}
        {article.keywords?.length ? (
          <div className="content-sidebar-card">
            <h3>{locale === "en" ? "Keywords" : "Ключові слова"}</h3>
            <div className="content-tag-row">
              {article.keywords.map((tag) => (
                <span key={tag} className="content-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ) : null}
        {article.externalUrl ? (
          <a href={article.externalUrl} target="_blank" rel="noreferrer" className="content-btn">
            <i className="fa-solid fa-arrow-up-right-from-square" />
            {locale === "en" ? "Full publication" : "Повна публікація"}
          </a>
        ) : null}
      </>
    );
  }

  const conference = item as Conference;
  return (
    <>
      <div className="content-sidebar-card">
        <h3>{locale === "en" ? "Event details" : "Деталі заходу"}</h3>
        <ul className="content-sidebar-list">
          {conference.eventDate ? (
            <li>
              <i className="fa-regular fa-calendar" />
              {formatDate(conference.eventDate, locale)}
            </li>
          ) : null}
          {pickLocale(locale, conference.location, conference.locationEn) ? (
            <li>
              <i className="fa-solid fa-location-dot" />
              {pickLocale(locale, conference.location, conference.locationEn)}
            </li>
          ) : null}
          {conference.organizer ? (
            <li>
              <i className="fa-solid fa-building" />
              {conference.organizer}
            </li>
          ) : null}
        </ul>
      </div>
      {conference.presentationTopics?.length ? (
        <div className="content-sidebar-card">
          <h3>{locale === "en" ? "Topics" : "Теми"}</h3>
          <ul className="content-sidebar-list">
            {conference.presentationTopics.map((topic) => (
              <li key={topic}>
                <i className="fa-solid fa-circle-dot" />
                {topic}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {conference.registrationUrl ? (
        <a href={conference.registrationUrl} target="_blank" rel="noreferrer" className="content-btn">
          {locale === "en" ? "Event page" : "Сторінка заходу"}
        </a>
      ) : null}
      {conference.slidesUrl ? (
        <a
          href={conference.slidesUrl}
          target="_blank"
          rel="noreferrer"
          className="content-btn content-btn-ghost"
        >
          {locale === "en" ? "Slides" : "Матеріали"}
        </a>
      ) : null}
    </>
  );
}

export function ContentDetailClient({ config, item }: Props) {
  const [locale] = useLocale();
  const title = localizedTitle(item, locale);
  const excerpt = localizedExcerpt(item, locale);
  const body =
    (locale === "en" && item.bodyEn?.length ? item.bodyEn : item.body) ?? item.body;
  const listTitle = locale === "en" ? config.listTitleEn : config.listTitleUk;
  const imageUrl = item.coverImage?.asset
    ? urlFor(item.coverImage).width(1200).height(900).url()
    : null;

  return (
    <ContentShell>
      <div className="content-breadcrumb">
        <Link href="/">{locale === "en" ? "Home" : "Головна"}</Link>
        <span>/</span>
        <Link href={config.basePath}>{listTitle}</Link>
        <span>/</span>
        <span>{title}</span>
      </div>

      <section className="content-detail-hero">
        <div className="content-detail-cover">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={item.coverImage?.alt || title}
              width={1200}
              height={900}
              priority
            />
          ) : null}
        </div>
        <div className="content-detail-intro">
          <h1>{title}</h1>
          <p className="excerpt">{excerpt}</p>
          <div className="content-detail-meta">
            {item.publishedAt ? (
              <span>
                <i className="fa-regular fa-calendar" />{" "}
                {formatDate(item.publishedAt, locale)}
              </span>
            ) : null}
            {item._type === "conference" && (item as Conference).eventDate ? (
              <span>
                <i className="fa-solid fa-microphone-lines" />{" "}
                {formatDate((item as Conference).eventDate, locale)}
              </span>
            ) : null}
            {item.readingTimeMinutes ? (
              <span>
                <i className="fa-regular fa-clock" /> {item.readingTimeMinutes}{" "}
                {locale === "en" ? "min read" : "хв читання"}
              </span>
            ) : null}
          </div>
        </div>
      </section>

      <div className="content-layout">
        <article className="content-prose">
          <PortableTextRenderer value={body} />
        </article>
        <aside className="content-sidebar">
          <Sidebar item={item} locale={locale} />
        </aside>
      </div>

      <div className="content-back-row">
        <Link href={config.basePath} className="content-btn content-btn-ghost">
          <i className="fa-solid fa-arrow-left" />
          {locale === "en" ? `Back to ${listTitle}` : `Назад до «${listTitle}»`}
        </Link>
      </div>
    </ContentShell>
  );
}
