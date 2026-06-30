"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { landingContent, type Locale } from "@/lib/landing-content";
import { LOCALE_STORAGE_KEY } from "@/lib/locale";
import { parseAccent } from "@/lib/parse-accent";
import { NavDropdown } from "./NavDropdown";
import { SituationSection } from "./sections/SituationSection";
import { useReveal } from "./useReveal";
import "@/styles/landing.css";

const TELEGRAM = "https://t.me/Lilyanest28";

const BADGE_ICONS = [
  "fa-graduation-cap",
  "fa-certificate",
  "fa-flask",
  "fa-language",
  "fa-video",
] as const;

const TIMELINE_ICONS = [
  "fa-stethoscope",
  "fa-chart-line",
  "fa-comments",
  "fa-shield-halved",
] as const;

const UNDERSTAND_ICONS = [
  "fa-magnifying-glass",
  "fa-circle-question",
  "fa-heart",
  "fa-route",
] as const;

const VALUE_ICONS = [
  "fa-eye",
  "fa-scale-balanced",
  "fa-comments",
  "fa-crosshairs",
] as const;

export function LandingPage({ initialLocale = "uk" }: { initialLocale?: Locale }) {
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const t = landingContent[locale];

  const setLocalePersisted = (next: Locale) => {
    setLocale(next);
    localStorage.setItem(LOCALE_STORAGE_KEY, next);
  };

  useEffect(() => {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale | null;
    if (stored === "uk" || stored === "en") {
      setLocale(stored);
    }
  }, []);

  useReveal([locale]);

  return (
    <div className="landing-page">
      <nav>
        <div className="nav-logo">
          {t.nav.logo} <span>{t.nav.logoAccent}</span>
        </div>

        <div className="nav-links">
          <NavDropdown label={t.nav.patients} sections={t.nav.patientsMenu} />
          <NavDropdown label={t.nav.doctors} sections={t.nav.doctorsMenu} />
          <a href="#about" className="nav-link-item">
            <span>{t.nav.about}</span>
          </a>
          <a href="#cta" className="nav-link-item">
            <span>{t.nav.contacts}</span>
          </a>
        </div>

        <div className="nav-right">
          <div className="lang-switch" aria-label="Language">
            <button
              type="button"
              className={locale === "uk" ? "active" : ""}
              onClick={() => setLocalePersisted("uk")}
            >
              УКР
            </button>
            <span>|</span>
            <button
              type="button"
              className={locale === "en" ? "active" : ""}
              onClick={() => setLocalePersisted("en")}
            >
              EN
            </button>
          </div>
          <a href="#cta" className="btn-nav nav-mobile-cta">
            {t.nav.cta}
          </a>
          <a href="#cta" className="btn-nav">
            {t.nav.cta}
          </a>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-text">
          <div className="hero-badge">
            <i className="fa-solid fa-circle-dot" />
            {t.hero.badge}
          </div>
          <h1 className="hero-title">{parseAccent(t.hero.title)}</h1>
          <p className="hero-sub">{t.hero.subtitle}</p>
          <div className="hero-ctas">
            <a href="#cta" className="btn-primary">
              <i className="fa-solid fa-calendar-check" />
              {t.hero.ctaPrimary}
            </a>
            <a href="#solution" className="btn-ghost">
              <i className="fa-solid fa-arrow-down" />
              {t.hero.ctaSecondary}
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-card">
            <div className="floating-pill fp1">
              <span className="fp-dot dot-green" />
              {t.hero.pillOnline}
            </div>
            <div className="hero-photo-wrap">
              <div className="floating-pill fp2">
                <i
                  className="fa-solid fa-shield-halved"
                  style={{ color: "var(--amber)", fontSize: "0.75rem" }}
                />
                {t.hero.pillEvidence}
              </div>
              <div className="floating-pill fp3">
                <span className="fp-dot dot-amber" />
                {t.hero.pillChildren}
              </div>
              <div className="hero-photo-frame">
                <Image
                  src="/lilya.jpg"
                  alt={t.hero.doctorName}
                  width={1080}
                  height={1080}
                  priority
                />
              </div>
            </div>

            <div className="doctor-name">{t.hero.doctorName}</div>
            <div className="doctor-spec">{t.hero.doctorSpec}</div>
            <div className="doctor-card-bio">{t.hero.doctorBio}</div>

            <div className="stat-row">
              <div className="stat-box">
                <span className="stat-num">8+</span>
                <span className="stat-lbl">{t.hero.statYears}</span>
              </div>
              <div className="stat-box">
                <span className="stat-num">500+</span>
                <span className="stat-lbl">{t.hero.statPatients}</span>
              </div>
              <div className="stat-box">
                <span className="stat-num">2</span>
                <span className="stat-lbl">{t.hero.statFormats}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="amber-strip">
        <p>
          <strong>{t.amberStrip.strong}</strong> {t.amberStrip.text}
        </p>
        <a href={TELEGRAM} target="_blank" rel="noreferrer" className="btn-amber-strip">
          <i className="fa-brands fa-telegram" /> {t.amberStrip.telegram}
        </a>
      </div>

      <SituationSection content={t.problem} />

      <section className="cred-section" id="cred">
        <div className="cred-grid">
          <div className="reveal">
            <span className="section-label">{t.cred.label}</span>
            <h2 className="section-title">{parseAccent(t.cred.title)}</h2>
            <p className="section-sub" style={{ marginBottom: "1.5rem" }}>
              {t.cred.subtitle}
            </p>
            <div className="cred-badges">
              {t.cred.badges.map((badge, index) => (
                <span key={badge} className="badge">
                  <i className={`fa-solid ${BADGE_ICONS[index]}`} /> {badge}
                </span>
              ))}
            </div>
          </div>
          <div className="timeline reveal reveal-d2">
            {t.cred.timeline.map((item, index) => (
              <div key={item.title} className="tl-item">
                <div className="tl-dot">
                  <i
                    className={`fa-solid ${TIMELINE_ICONS[index]}`}
                    style={{ fontSize: "0.85rem" }}
                  />
                </div>
                <div className="tl-text">
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="solution-section" id="solution">
        <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 4rem" }}>
          <span className="section-label reveal">{t.solution.label}</span>
          <h2 className="section-title reveal reveal-d1">
            {parseAccent(t.solution.title)}
          </h2>
          <p className="section-sub reveal reveal-d2" style={{ margin: "0 auto" }}>
            {t.solution.subtitle}
          </p>
        </div>
        <div className="roadmap">
          {t.solution.steps.map((step, index) => (
            <div key={step.title} className={`rm-step reveal reveal-d${index + 1}`}>
              <div className="rm-num">{index + 1}</div>
              <div className="rm-title">{step.title}</div>
              <div className="rm-desc">{step.text}</div>
            </div>
          ))}
        </div>

        <div className="understand-box reveal">
          <div className="understand-header">
            <div className="understand-icon">
              <i className="fa-solid fa-lightbulb" />
            </div>
            <div>
              <div className="understand-header-label">{t.solution.resultLabel}</div>
              <div className="understand-header-title">{t.solution.resultTitle}</div>
            </div>
          </div>
          <div className="understand-grid">
            {t.solution.understand.map((item, index) => (
              <div key={item.strong} className="understand-item">
                <i className={`fa-solid ${UNDERSTAND_ICONS[index]}`} />
                <p>
                  <strong>{item.strong}</strong> {item.rest}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section" id="about">
        <div className="about-grid">
          <div className="about-img-wrap reveal">
            <div className="about-initials">ЛН</div>
            <Image
              src="/lilya.jpg"
              alt={t.hero.doctorName}
              width={1080}
              height={1080}
            />
            <div className="about-tag">
              <p>{t.solution.aboutQuote}</p>
            </div>
          </div>
          <div className="about-text">
            <span className="section-label reveal">{t.about.label}</span>
            <h2 className="section-title reveal reveal-d1">
              {parseAccent(t.about.title)}
            </h2>
            <p className="section-sub reveal reveal-d2">{t.about.subtitle}</p>
            <div className="values-list">
              {t.about.values.map((value, index) => (
                <div key={value.title} className={`value-item reveal reveal-d${index + 1}`}>
                  <div className="value-icon">
                    <i className={`fa-solid ${VALUE_ICONS[index]}`} />
                  </div>
                  <div>
                    <h4>{value.title}</h4>
                    <p>{value.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="forwhom-section" id="forwhom">
        <div style={{ textAlign: "center", maxWidth: "540px", margin: "0 auto 3rem" }}>
          <span className="section-label reveal">{t.forwhom.label}</span>
          <h2 className="section-title reveal reveal-d1">
            {parseAccent(t.forwhom.title)}
          </h2>
        </div>
        <div className="forwhom-grid">
          <div className="forwhom-card yes reveal reveal-d1">
            <div className="card-head">
              <div className="card-icon-wrap">
                <i className="fa-solid fa-check" />
              </div>
              <h3>{t.forwhom.yesTitle}</h3>
            </div>
            <ul className="check-list">
              {t.forwhom.yesItems.map((item) => (
                <li key={item}>
                  <i className="fa-solid fa-circle-dot" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="forwhom-card no reveal reveal-d2">
            <div className="card-head">
              <div className="card-icon-wrap">
                <i className="fa-solid fa-xmark" />
              </div>
              <h3>{t.forwhom.noTitle}</h3>
            </div>
            <ul className="check-list">
              {t.forwhom.noItems.map((item) => (
                <li key={item}>
                  <i className="fa-solid fa-circle-xmark" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="reviews-section" id="reviews">
        <div style={{ textAlign: "center", maxWidth: "540px", margin: "0 auto 3rem" }}>
          <span className="section-label reveal">{t.reviews.label}</span>
          <h2 className="section-title reveal reveal-d1">
            {parseAccent(t.reviews.title)}
          </h2>
        </div>
        <div className="reviews-grid">
          {t.reviews.items.map((review, index) => (
            <div key={review.name} className={`review-card reveal reveal-d${index + 1}`}>
              <div className="review-stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <i key={i} className="fa-solid fa-star" />
                ))}
              </div>
              <p className="review-text">{review.quote}</p>
              <div className="reviewer">
                <div className="reviewer-av">{review.initials}</div>
                <div>
                  <div className="reviewer-name">{review.name}</div>
                  <div className="reviewer-role">{review.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="guarantee-section" id="guarantee">
        <span className="section-label reveal">{t.guarantee.label}</span>
        <h2
          className="section-title reveal reveal-d1"
          style={{ textAlign: "center", margin: "0 auto 1rem" }}
        >
          {parseAccent(t.guarantee.title)}
        </h2>
        <p
          className="section-sub reveal reveal-d2"
          style={{ textAlign: "center", margin: "0 auto 2.5rem" }}
        >
          {t.guarantee.subtitle}
        </p>
        <div className="guarantee-box reveal reveal-d3">
          <div className="guarantee-icon">
            <i className="fa-solid fa-shield-heart" />
          </div>
          <blockquote>{t.guarantee.quote}</blockquote>
          <ul className="guarantee-list">
            {t.guarantee.items.map((item) => (
              <li key={item}>
                <i className="fa-solid fa-check" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="faq-section" id="faq">
        <div style={{ textAlign: "center", maxWidth: "540px", margin: "0 auto 3rem" }}>
          <span className="section-label reveal">{t.faq.label}</span>
          <h2 className="section-title reveal reveal-d1">
            {parseAccent(t.faq.title)}
          </h2>
        </div>
        <div className="faq-grid" style={{ maxWidth: "900px", margin: "0 auto" }}>
          {t.faq.items.map((item, index) => (
            <div
              key={item.q}
              className={`faq-item${openFaq === index ? " open" : ""}`}
              onClick={() => setOpenFaq(openFaq === index ? null : index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setOpenFaq(openFaq === index ? null : index);
                }
              }}
              role="button"
              tabIndex={0}
            >
              <div className="faq-q">
                {item.q}
                <i className="fa-solid fa-plus" />
              </div>
              <div className="faq-a">{item.a}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section" id="cta">
        <div className="cta-grid">
          <div>
            <span className="section-label reveal">{t.cta.label}</span>
            <h2 className="section-title reveal reveal-d1">
              {parseAccent(t.cta.title)}
            </h2>
            <p className="section-sub reveal reveal-d2">{t.cta.subtitle}</p>
            <div className="contact-rows reveal reveal-d3">
              <div className="contact-row">
                <div className="contact-icon">
                  <i className="fa-brands fa-telegram" />
                </div>
                <div>
                  <div className="contact-lbl">{t.cta.telegramLabel}</div>
                  <div className="contact-val">
                    <a href={TELEGRAM} target="_blank" rel="noreferrer">
                      @Lilyanest28
                    </a>
                  </div>
                </div>
              </div>
              <div className="contact-row">
                <div className="contact-icon">
                  <i className="fa-solid fa-calendar-days" />
                </div>
                <div>
                  <div className="contact-lbl">{t.cta.formatLabel}</div>
                  <div className="contact-val">{t.cta.formatValue}</div>
                </div>
              </div>
              <div className="contact-row">
                <div className="contact-icon">
                  <i className="fa-solid fa-globe" />
                </div>
                <div>
                  <div className="contact-lbl">{t.cta.languagesLabel}</div>
                  <div className="contact-val">{t.cta.languagesValue}</div>
                </div>
              </div>
            </div>
            <a
              href={TELEGRAM}
              target="_blank"
              rel="noreferrer"
              className="btn-cta-big reveal reveal-d4"
            >
              <i className="fa-brands fa-telegram" />
              {t.cta.button}
            </a>
          </div>

          <div className="calc-box reveal reveal-d2">
            <div className="calc-title">
              <i className="fa-solid fa-calendar-check" />
              {t.cta.formatBoxLabel}
            </div>
            <div className="calc-result" style={{ marginTop: 0 }}>
              <div className="calc-result-val">{t.cta.formatBoxTitle}</div>
              <div className="calc-result-note">{t.cta.formatBoxNote}</div>
            </div>
            <p
              style={{
                fontSize: "0.78rem",
                color: "rgba(255,255,255,0.5)",
                marginTop: "1.5rem",
                letterSpacing: "0.04em",
              }}
            >
              {t.cta.formatBoxAfter}
            </p>
            <ul className="format-box-list">
              {t.cta.formatBoxItems.map((item) => (
                <li key={item}>
                  <i className="fa-solid fa-circle-dot" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="footer-amber-bar" />
      <footer>
        <div className="footer-main">
          <div className="footer-brand">
            <div
              style={{
                fontFamily: "var(--font-playfair, 'Playfair Display', serif)",
                fontSize: "1.2rem",
                fontWeight: 700,
                color: "#fff",
              }}
            >
              {t.nav.logo}{" "}
              <span style={{ color: "var(--lav-400)" }}>{t.nav.logoAccent}</span>
            </div>
            <p>{t.footer.tagline}</p>
            <div className="social-row">
              <a href={TELEGRAM} target="_blank" rel="noreferrer" className="soc-icon" title="Telegram">
                <i className="fa-brands fa-telegram" />
              </a>
              <a href="#" className="soc-icon" title="Instagram">
                <i className="fa-brands fa-instagram" />
              </a>
              <a href="#" className="soc-icon" title="Facebook">
                <i className="fa-brands fa-facebook-f" />
              </a>
            </div>
          </div>
          <div className="footer-col">
            <h5>{t.footer.patientsCol.toUpperCase()}</h5>
            <a href="#solution">{t.footer.patientsLinks[0]}</a>
            <Link href="/guides">{t.footer.patientsLinks[1]}</Link>
            <Link href="/guides">{t.footer.patientsLinks[2]}</Link>
            <a href="#faq">{t.footer.patientsLinks[3]}</a>
          </div>
          <div className="footer-col" id="doctors">
            <h5>{t.footer.contactsCol.toUpperCase()}</h5>
            <a href={TELEGRAM} target="_blank" rel="noreferrer">
              {t.footer.contactsLinks[0]}
            </a>
            <a href="#about">{t.footer.contactsLinks[1]}</a>
            <a href="#cta">{t.footer.contactsLinks[2]}</a>
            <a href="#doctors">{t.footer.contactsLinks[3]}</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>{t.footer.copyright}</span>
          <span>{t.footer.tag}</span>
        </div>
      </footer>
    </div>
  );
}
