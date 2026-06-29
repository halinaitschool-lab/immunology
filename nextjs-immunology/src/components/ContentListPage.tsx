import Image from "next/image";
import Link from "next/link";
import { LandingNav } from "@/components/LandingNav";
import type { ContentKind, ContentPost } from "@/lib/content";
import { urlForImage } from "@/lib/sanityImage";

type Locale = "uk" | "en";

type Props = {
  kind: ContentKind;
  locale: Locale;
  posts: ContentPost[];
};

export function ContentListPage({ kind, locale, posts }: Props) {
  const isUk = locale === "uk";
  const rootPath = isUk ? "/" : "/en";
  const slugPrefix = isUk ? "/" : "/en/";
  const guidesPath = isUk ? "/guides" : "/en/guides";
  const lecturesPath = isUk ? "/mini-lectures" : "/en/mini-lectures";

  const title =
    kind === "lecture"
      ? isUk
        ? "Лекції"
        : "Lectures"
      : isUk
        ? "Гайди"
        : "Guides";
  const subtitle = isUk
    ? "Оберіть гайд, щоб переглянути покрокову інструкцію."
    : "Choose a guide to read step-by-step instructions.";
  const empty = isUk
    ? "Поки що немає матеріалів у цій категорії."
    : "No posts yet in this category.";
  const readLabel = isUk ? "Читати гайд" : "Read guide";
  const minRead = isUk ? "хв читання" : "min read";

  const langUkHref = kind === "guide" ? "/guides" : "/mini-lectures";
  const langEnHref = kind === "guide" ? "/en/guides" : "/en/mini-lectures";

  return (
    <div className="content-shell">
      <LandingNav
        locale={locale}
        langUkHref={langUkHref}
        langEnHref={langEnHref}
        activePage={kind === "guide" ? "guides" : "lectures"}
      />

      <main className="guides-list-page">
        <nav className="guides-breadcrumbs" aria-label="Breadcrumb">
          <Link href={rootPath}>{isUk ? "Головна" : "Home"}</Link>
          <span aria-hidden>›</span>
          <span>{title}</span>
        </nav>

        <header className="guides-list-header">
          <span className="guides-list-badge">
            {isUk ? "Для пацієнтів" : "For patients"}
          </span>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </header>

        {posts.length === 0 ? (
          <p className="guides-list-empty">{empty}</p>
        ) : (
          <section className="guides-list-grid">
            {posts.map((post) => {
              const href = `${slugPrefix}${post.slug}`;
              const thumb = urlForImage(post.heroImage)?.width(480).height(320).url();
              return (
                <Link key={post._id} href={href} className="guides-list-card">
                  {thumb ? (
                    <div className="guides-list-card-img">
                      <Image src={thumb} alt="" width={480} height={320} unoptimized />
                    </div>
                  ) : (
                    <div className="guides-list-card-img guides-list-card-img--placeholder">
                      <i className="fa-solid fa-file-lines" aria-hidden />
                    </div>
                  )}
                  <div className="guides-list-card-body">
                    <h2>{post.title}</h2>
                    <div className="guides-list-card-meta">
                      <time dateTime={post.publishedAt}>
                        {new Date(post.publishedAt).toLocaleDateString(
                          isUk ? "uk-UA" : "en-US",
                        )}
                      </time>
                      {post.readingTime != null && (
                        <span>
                          {post.readingTime} {minRead}
                        </span>
                      )}
                    </div>
                    {post.excerpt && <p>{post.excerpt}</p>}
                    <span className="guides-list-card-cta">
                      {readLabel} <i className="fa-solid fa-arrow-right" aria-hidden />
                    </span>
                  </div>
                </Link>
              );
            })}
          </section>
        )}

        {kind === "guide" && (
          <p className="guides-list-back">
            <Link href={lecturesPath}>
              {isUk ? "Лекції для пацієнтів" : "Patient lectures"} →
            </Link>
          </p>
        )}
      </main>
    </div>
  );
}
