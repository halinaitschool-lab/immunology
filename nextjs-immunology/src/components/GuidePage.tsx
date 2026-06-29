import Image from "next/image";
import Link from "next/link";
import { GuideFaqList } from "@/components/GuideFaqList";
import { PortableTextContent } from "@/components/PortableTextContent";
import { LandingNav } from "@/components/LandingNav";
import type { GuideDocument } from "@/lib/guide";
import { urlForImage } from "@/lib/sanityImage";
import doctorPhoto from "@/images/lilya.jpg";

type Locale = "uk" | "en";

const labels = {
  uk: {
    badge: "Гайд для пацієнтів",
    reading: "хв читання",
    updated: "Оновлено",
    download: "Завантажити PDF-гайд",
    home: "Головна",
    guides: "Гайди для пацієнтів",
    quickTitle: "Що потрібно знати?",
    whoTitle: "Цей гайд буде корисним, якщо:",
    stepsTitle: "Покрокова інструкція",
    stepTime: "Крок займає",
    tipTitle: "Порада лікаря",
    warnTitle: "Увага!",
    checklistTitle: "Що взяти із собою?",
    afterTitle: "Після процедури",
    faqTitle: "Часті запитання",
    relatedTitle: "Читайте також",
    relatedCta: "Читати",
    relatedAll: "Переглянути всі гайди",
    showMoreFaq: "Показати більше питань",
    footer: "Алергологія · Імунологія · Діти та дорослі",
  },
  en: {
    badge: "Guide for patients",
    reading: "min read",
    updated: "Updated",
    download: "Download PDF guide",
    home: "Home",
    guides: "Patient guides",
    quickTitle: "What you need to know",
    whoTitle: "This guide is useful if:",
    stepsTitle: "Step-by-step instructions",
    stepTime: "Step takes",
    tipTitle: "Doctor's advice",
    warnTitle: "Attention!",
    checklistTitle: "What to bring",
    afterTitle: "After the procedure",
    faqTitle: "Frequently asked questions",
    relatedTitle: "Read also",
    relatedCta: "Read",
    relatedAll: "View all guides",
    showMoreFaq: "Show more questions",
    footer: "Allergology · Immunology · Children & Adults",
  },
} as const;

function formatDate(date: string, locale: Locale) {
  return new Date(date).toLocaleDateString(locale === "uk" ? "uk-UA" : "en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function hasItems<T>(items?: T[]) {
  return Boolean(items && items.length > 0);
}

export function GuidePage({ guide, locale }: { guide: GuideDocument; locale: Locale }) {
  const t = labels[locale];
  const root = locale === "uk" ? "/" : "/en";
  const guidesHref = locale === "uk" ? "/guides" : "/en/guides";
  const slugPrefix = locale === "uk" ? "/" : "/en/";

  const heroUrl = urlForImage(guide.heroImage)?.width(900).height(700).url();
  const pdfUrl = guide.downloadablePdf?.asset?.url;
  const displayDate = guide.updatedAt ?? guide.publishedAt;
  const firstTip = guide.tips?.[0];

  return (
    <div className="guide-page content-shell">
      <LandingNav
        locale={locale}
        langUkHref={`/${guide.slug}`}
        langEnHref={`/en/${guide.slug}`}
        activePage="guides"
      />

      <nav className="guide-breadcrumbs" aria-label="Breadcrumb">
        <Link href={root}>{t.home}</Link>
        <span aria-hidden>›</span>
        <Link href={guidesHref}>{t.guides}</Link>
        <span aria-hidden>›</span>
        <span>{guide.title}</span>
      </nav>

      <section className="guide-hero">
        <div className="guide-hero-content">
          <span className="guide-hero-badge">{t.badge}</span>
          <h1>{guide.title}</h1>
          {guide.subtitle && <p className="guide-hero-sub">{guide.subtitle}</p>}

          <div className="guide-hero-meta">
            {guide.readingTime != null && (
              <span>
                <i className="fa-regular fa-clock" aria-hidden /> {guide.readingTime} {t.reading}
              </span>
            )}
            <span>
              <i className="fa-regular fa-calendar" aria-hidden /> {t.updated}:{" "}
              {formatDate(displayDate, locale)}
            </span>
          </div>

          {guide.shortDescription && <p className="guide-hero-desc">{guide.shortDescription}</p>}

          {pdfUrl && (
            <a href={pdfUrl} className="guide-btn-download" download target="_blank" rel="noopener noreferrer">
              <i className="fa-solid fa-download" aria-hidden />
              {t.download}
            </a>
          )}
        </div>

        {heroUrl && (
          <div className="guide-hero-media">
            <Image src={heroUrl} alt={guide.title} width={900} height={700} priority unoptimized />
          </div>
        )}
      </section>

      {(hasItems(guide.quickFacts) || hasItems(guide.whoIsFor)) && (
        <section className="guide-section guide-duo">
          {guide.quickFacts && guide.quickFacts.length > 0 && (
            <article className="guide-card guide-card--lav">
              <div className="guide-card-head">
                <span className="guide-card-icon guide-card-icon--bulb" aria-hidden>
                  <i className="fa-regular fa-lightbulb" />
                </span>
                <h2>{t.quickTitle}</h2>
              </div>
              <ul className="guide-checklist">
                {guide.quickFacts.map((item) => (
                  <li key={item.text}>
                    <i className="fa-solid fa-check" aria-hidden />
                    {item.text}
                  </li>
                ))}
              </ul>
            </article>
          )}

          {guide.whoIsFor && guide.whoIsFor.length > 0 && (
            <article className="guide-card guide-card--lav">
              <div className="guide-card-head">
                <span className="guide-card-icon guide-card-icon--people" aria-hidden>
                  <i className="fa-solid fa-user-group" />
                </span>
                <h2>{t.whoTitle}</h2>
              </div>
              <ul className="guide-checklist">
                {guide.whoIsFor.map((item) => (
                  <li key={item.text}>
                    <i className="fa-solid fa-check" aria-hidden />
                    {item.text}
                  </li>
                ))}
              </ul>
            </article>
          )}
        </section>
      )}

      {guide.steps && guide.steps.length > 0 && (
        <section className="guide-section">
          <h2 className="guide-section-title">{t.stepsTitle}</h2>
          <div className="guide-steps">
            {guide.steps.map((step, index) => {
              const stepImg = urlForImage(step.image)?.width(400).height(280).url();
              return (
                <article key={`${step.title}-${index}`} className="guide-step">
                  <span className="guide-step-num">{index + 1}</span>
                  {stepImg && (
                    <div className="guide-step-img">
                      <Image src={stepImg} alt="" width={400} height={280} unoptimized />
                    </div>
                  )}
                  <h3>{step.title}</h3>
                  {step.content && <PortableTextContent value={step.content} className="guide-step-text" />}
                  {step.estimatedTime && (
                    <p className="guide-step-time">
                      <i className="fa-regular fa-clock" aria-hidden /> {t.stepTime} {step.estimatedTime}
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      )}

      {(hasItems(guide.tips) || hasItems(guide.warnings)) && (
        <section className="guide-section guide-duo">
          {firstTip && (
            <article className="guide-card guide-card--tip">
              <div className="guide-card-head">
                <span className="guide-card-icon guide-card-icon--tip" aria-hidden>
                  <i className="fa-solid fa-comment-dots" />
                </span>
                <h2>{firstTip.title || t.tipTitle}</h2>
              </div>
              <div className="guide-tip-body">
                <PortableTextContent value={firstTip.content} />
                <Image src={doctorPhoto} alt="" className="guide-tip-photo" width={200} height={260} />
              </div>
              {guide.tips && guide.tips.length > 1 && (
                <div className="guide-more-tips">
                  {guide.tips.slice(1).map((tip, i) => (
                    <div key={`tip-${i}`} className="guide-subblock">
                      {tip.title && <h3>{tip.title}</h3>}
                      <PortableTextContent value={tip.content} />
                    </div>
                  ))}
                </div>
              )}
            </article>
          )}

          {guide.warnings && guide.warnings.length > 0 && (
            <article className="guide-card guide-card--warn">
              <div className="guide-card-head">
                <span className="guide-card-icon guide-card-icon--warn" aria-hidden>
                  <i className="fa-solid fa-triangle-exclamation" />
                </span>
                <h2>{guide.warnings[0]?.title || t.warnTitle}</h2>
              </div>
              {guide.warnings.map((warn, i) => (
                <div key={`warn-${i}`} className="guide-warn-block">
                  {i > 0 && warn.title && <h3>{warn.title}</h3>}
                  <PortableTextContent value={warn.content} className="guide-warn-text" />
                </div>
              ))}
            </article>
          )}
        </section>
      )}

      {(hasItems(guide.checklist) || hasItems(guide.afterProcedure)) && (
        <section className="guide-section guide-duo">
          {guide.checklist && guide.checklist.length > 0 && (
            <article className="guide-card guide-card--lav">
              <div className="guide-card-head">
                <span className="guide-card-icon" aria-hidden>
                  <i className="fa-solid fa-clipboard-list" />
                </span>
                <h2>{t.checklistTitle}</h2>
              </div>
              <div className="guide-pills">
                {guide.checklist.map((item) => (
                  <div key={item.item} className="guide-pill">
                    <span className="guide-pill-icon">{item.icon || "📄"}</span>
                    <span>{item.item}</span>
                  </div>
                ))}
              </div>
            </article>
          )}

          {guide.afterProcedure && guide.afterProcedure.length > 0 && (
            <article className="guide-card guide-card--lav guide-card--after">
              <div className="guide-card-head">
                <span className="guide-card-icon" aria-hidden>
                  <i className="fa-solid fa-circle-check" />
                </span>
                <h2>{t.afterTitle}</h2>
              </div>
              <PortableTextContent value={guide.afterProcedure} className="guide-after-text" />
            </article>
          )}
        </section>
      )}

      {(hasItems(guide.faq) || hasItems(guide.related)) && (
        <section className="guide-section guide-duo guide-duo--faq">
          {guide.faq && guide.faq.length > 0 && (
            <div className="guide-faq-col">
              <h2 className="guide-section-title">{t.faqTitle}</h2>
              <GuideFaqList items={guide.faq} showMoreLabel={t.showMoreFaq} />
            </div>
          )}

          {guide.related && guide.related.length > 0 && (
            <div className="guide-related-col">
              <h2 className="guide-section-title">{t.relatedTitle}</h2>
              <div className="guide-related-list">
                {guide.related.map((item) => {
                  const thumb = urlForImage(item.heroImage)?.width(120).height(90).url();
                  return (
                    <article key={item._id} className="guide-related-card">
                      {thumb && (
                        <Image src={thumb} alt="" width={120} height={90} className="guide-related-thumb" unoptimized />
                      )}
                      <div>
                        <h3>
                          <Link href={`${slugPrefix}${item.slug}`}>{item.title}</Link>
                        </h3>
                        {item.shortDescription && <p>{item.shortDescription}</p>}
                        <Link href={`${slugPrefix}${item.slug}`} className="guide-related-link">
                          {t.relatedCta} →
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
              <Link href={guidesHref} className="guide-link-more">
                {t.relatedAll} →
              </Link>
            </div>
          )}
        </section>
      )}

      <footer className="guide-footer">
        <p>{t.footer}</p>
      </footer>
    </div>
  );
}
