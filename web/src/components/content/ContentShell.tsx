"use client";

import Link from "next/link";
import { landingContent } from "@/lib/landing-content";
import { NavDropdown } from "@/components/landing/NavDropdown";
import { useLocale } from "./useLocale";
import "@/styles/content.css";

const TELEGRAM = "https://t.me/Lilyanest28";

export function ContentShell({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useLocale();
  const t = landingContent[locale];

  return (
    <div className="content-page">
      <header className="content-shell-nav">
        <Link href="/" className="nav-logo">
          {t.nav.logo} <span>{t.nav.logoAccent}</span>
        </Link>

        <div className="nav-links">
          <NavDropdown label={t.nav.patients} sections={t.nav.patientsMenu} />
          <NavDropdown label={t.nav.doctors} sections={t.nav.doctorsMenu} />
          <Link href="/#about" className="nav-link-item">
            <span>{t.nav.about}</span>
          </Link>
          <Link href="/#cta" className="nav-link-item">
            <span>{t.nav.contacts}</span>
          </Link>
        </div>

        <div className="nav-right">
          <div className="lang-switch" aria-label="Language">
            <button
              type="button"
              className={locale === "uk" ? "active" : ""}
              onClick={() => setLocale("uk")}
            >
              УКР
            </button>
            <span>|</span>
            <button
              type="button"
              className={locale === "en" ? "active" : ""}
              onClick={() => setLocale("en")}
            >
              EN
            </button>
          </div>
          <a href={TELEGRAM} target="_blank" rel="noreferrer" className="btn-nav">
            {t.nav.cta}
          </a>
        </div>
      </header>

      <main className="content-main">{children}</main>
    </div>
  );
}
