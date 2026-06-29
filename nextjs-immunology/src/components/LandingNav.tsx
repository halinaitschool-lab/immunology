"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";

type Locale = "uk" | "en";
type ActivePage = "guides" | "lectures" | undefined;

type Props = {
  locale: Locale;
  langUkHref: string;
  langEnHref: string;
  activePage?: ActivePage;
};

const copy = {
  uk: {
    menu: "Меню",
    patients: "Для пацієнтів",
    doctors: "Для лікарів",
    materials: "МАТЕРІАЛИ",
    lectures: "Лекції",
    guides: "Гайди",
    useful: "КОРИСНЕ",
    howWork: "Як я працюю",
    stories: "Реальні історії",
    faq: "Питання та відповіді",
    publications: "ПУБЛІКАЦІЇ",
    articles: "Наукові статті",
    conferences: "Конференції",
    about: "Про мене",
    contact: "Контакти",
    book: "Запис на консультацію",
  },
  en: {
    menu: "Menu",
    patients: "For Patients",
    doctors: "For Doctors",
    materials: "MATERIALS",
    lectures: "Lectures",
    guides: "Guides",
    useful: "USEFUL",
    howWork: "How I Work",
    stories: "Real stories",
    faq: "FAQ",
    publications: "PUBLICATIONS",
    articles: "Research Articles",
    conferences: "Conferences",
    about: "About",
    contact: "Contact",
    book: "Book consultation",
  },
} as const;

export function LandingNav({ locale, langUkHref, langEnHref, activePage }: Props) {
  const t = copy[locale];
  const home = locale === "uk" ? "/" : "/en";
  const hash = (id: string) => `${home}#${id}`;
  const lecturesHref = locale === "uk" ? "/mini-lectures" : "/en/mini-lectures";
  const guidesHref = locale === "uk" ? "/guides" : "/en/guides";

  const navRef = useRef<HTMLElement>(null);

  const closeNav = useCallback(() => {
    const nav = navRef.current;
    if (!nav) return;
    nav.classList.remove("nav-open");
    document.body.style.overflow = "";
    nav.querySelector(".nav-hamburger")?.setAttribute("aria-expanded", "false");
    nav.querySelector(".nav-backdrop")?.setAttribute("aria-hidden", "true");
    nav.querySelectorAll(".nav-item.open").forEach((el) => el.classList.remove("open"));
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const mq = window.matchMedia("(max-width: 900px)");

    const updateCompact = () => {
      nav.classList.remove("nav-compact");
      if (mq.matches) {
        nav.classList.add("nav-compact");
        return;
      }
      if (nav.scrollWidth > nav.clientWidth + 1) nav.classList.add("nav-compact");
    };

    updateCompact();
    window.addEventListener("resize", updateCompact);
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(updateCompact) : null;
    ro?.observe(nav);

    const toggle = nav.querySelector(".nav-hamburger");
    const backdrop = nav.querySelector(".nav-backdrop");
    const closeBtn = nav.querySelector(".nav-mobile-close");

    const openNav = () => {
      nav.classList.add("nav-open");
      document.body.style.overflow = "hidden";
      toggle?.setAttribute("aria-expanded", "true");
      backdrop?.setAttribute("aria-hidden", "false");
    };

    const onToggle = () => {
      if (nav.classList.contains("nav-open")) closeNav();
      else openNav();
    };

    toggle?.addEventListener("click", onToggle);
    backdrop?.addEventListener("click", closeNav);
    closeBtn?.addEventListener("click", closeNav);

    nav.querySelectorAll(".nav-shell a[href]").forEach((link) => {
      link.addEventListener("click", () => {
        if (nav.classList.contains("nav-compact")) closeNav();
      });
    });

    nav.querySelectorAll(".nav-item > button").forEach((btn) => {
      btn.addEventListener("click", (event) => {
        if (!nav.classList.contains("nav-compact")) return;
        event.preventDefault();
        const item = btn.closest(".nav-item");
        if (!item) return;
        const wasOpen = item.classList.contains("open");
        nav.querySelectorAll(".nav-item.open").forEach((el) => el.classList.remove("open"));
        if (!wasOpen) item.classList.add("open");
      });
    });

    const onResize = () => {
      updateCompact();
      if (!nav.classList.contains("nav-compact")) closeNav();
    };

    window.addEventListener("resize", onResize);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeNav();
    };
    document.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("resize", updateCompact);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("keydown", onKey);
      ro?.disconnect();
      toggle?.removeEventListener("click", onToggle);
      backdrop?.removeEventListener("click", closeNav);
      closeBtn?.removeEventListener("click", closeNav);
    };
  }, [closeNav]);

  return (
    <nav ref={navRef} className="site-nav">
      <Link href={home} className="nav-logo">
        {locale === "uk" ? "Ліля" : "Lilya"} <span>{locale === "uk" ? "Нестеровська" : "Nesterovska"}</span>
      </Link>

      <div className="nav-shell" id="navMobilePanel">
        <div className="nav-mobile-head">
          <span>{t.menu}</span>
          <button type="button" className="nav-mobile-close" aria-label="Close">
            <i className="fa-solid fa-xmark" />
          </button>
        </div>

        <div className="nav-mobile-lang">
          <div className="lang-sw lang-sw--menu">
            <Link href={langUkHref} className={`lang-btn ${locale === "uk" ? "active" : ""}`}>
              УКР
            </Link>
            <Link href={langEnHref} className={`lang-btn ${locale === "en" ? "active" : ""}`}>
              EN
            </Link>
          </div>
        </div>

        <div className="nav-center">
          <div className="nav-item">
            <button type="button">
              {t.patients} <i className="fa-solid fa-chevron-down arrow" />
            </button>
            <div className="dropdown">
              <div className="dropdown-section">{t.materials}</div>
              <Link
                href={lecturesHref}
                className={activePage === "lectures" ? "nav-link-active" : undefined}
              >
                <i className="fa-solid fa-book-open" />
                {t.lectures}
              </Link>
              <Link
                href={guidesHref}
                className={activePage === "guides" ? "nav-link-active" : undefined}
              >
                <i className="fa-solid fa-file-lines" />
                {t.guides}
              </Link>
              <hr />
              <div className="dropdown-section">{t.useful}</div>
              <Link href={hash("solution")}>
                <i className="fa-solid fa-route" />
                {t.howWork}
              </Link>
              <Link href={hash("reviews")}>
                <i className="fa-solid fa-star" />
                {t.stories}
              </Link>
              <Link href={hash("faq")}>
                <i className="fa-solid fa-circle-question" />
                {t.faq}
              </Link>
            </div>
          </div>

          <div className="nav-item">
            <button type="button">
              {t.doctors} <i className="fa-solid fa-chevron-down arrow" />
            </button>
            <div className="dropdown">
              <div className="dropdown-section">{t.publications}</div>
              <Link href={hash("cred")}>
                <i className="fa-solid fa-microscope" />
                {t.articles}
              </Link>
              <Link href={hash("cred")}>
                <i className="fa-solid fa-graduation-cap" />
                {t.conferences}
              </Link>
            </div>
          </div>

          <div className="nav-item">
            <Link href={hash("about")}>{t.about}</Link>
          </div>
          <div className="nav-item">
            <Link href={hash("cta")}>{t.contact}</Link>
          </div>
        </div>
      </div>

      <div className="nav-actions">
        <div className="lang-sw lang-sw--bar">
          <Link href={langUkHref} className={`lang-btn ${locale === "uk" ? "active" : ""}`}>
            УКР
          </Link>
          <Link href={langEnHref} className={`lang-btn ${locale === "en" ? "active" : ""}`}>
            EN
          </Link>
        </div>
        <a
          href="https://t.me/Lilyanest28"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-nav-tg icon-only"
          aria-label="Telegram"
        >
          <i className="fa-brands fa-telegram" />
        </a>
        <Link href={hash("cta")} className="btn-nav-book">
          <i className="fa-solid fa-calendar-check" />
          <span>{t.book}</span>
        </Link>
        <button
          type="button"
          className="nav-hamburger"
          aria-label={t.menu}
          aria-expanded="false"
          aria-controls="navMobilePanel"
        >
          <span className="nav-hamburger-line" />
          <span className="nav-hamburger-line" />
          <span className="nav-hamburger-line" />
        </button>
      </div>

      <div className="nav-backdrop" aria-hidden="true" />
    </nav>
  );
}
