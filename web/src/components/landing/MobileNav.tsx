"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import type { Locale, NavMenuSection } from "@/lib/landing-content";

type NavContent = {
  patients: string;
  patientsMenu: NavMenuSection[];
  doctors: string;
  doctorsMenu: NavMenuSection[];
  about: string;
  contacts: string;
  cta: string;
  menuOpen: string;
  menuClose: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
  nav: NavContent;
};

function MobileMenuLink({
  href,
  children,
  onClose,
}: {
  href: string;
  children: ReactNode;
  onClose: () => void;
}) {
  const className = "mobile-nav-link";

  if (href.startsWith("#")) {
    return (
      <a href={href} className={className} onClick={onClose}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={onClose}>
      {children}
    </Link>
  );
}

function MobileNavGroup({
  label,
  sections,
  onClose,
}: {
  label: string;
  sections: NavMenuSection[];
  onClose: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`mobile-nav-group${expanded ? " open" : ""}`}>
      <button
        type="button"
        className="mobile-nav-group-trigger"
        onClick={() => setExpanded((value) => !value)}
        aria-expanded={expanded}
      >
        <span>{label}</span>
        <i className="fa-solid fa-chevron-down" aria-hidden="true" />
      </button>
      <div className="mobile-nav-group-panel">
        {sections.map((section, sectionIndex) => (
          <div
            key={section.title}
            className={`mobile-nav-section${sectionIndex > 0 ? " divided" : ""}`}
          >
            <div className="mobile-nav-section-title">{section.title}</div>
            {section.items.map((item) => (
              <MobileMenuLink key={item.href} href={item.href} onClose={onClose}>
                <i className={`fa-solid ${item.icon}`} aria-hidden="true" />
                {item.label}
              </MobileMenuLink>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function MobileNav({ open, onClose, locale, onLocaleChange, nav }: Props) {
  return (
    <div className={`mobile-nav${open ? " open" : ""}`} aria-hidden={!open}>
      <button
        type="button"
        className="mobile-nav-backdrop"
        onClick={onClose}
        aria-label={nav.menuClose}
      />
      <div className="mobile-nav-panel" id="mobile-nav-panel" role="dialog" aria-modal="true" aria-label="Menu">
        <div className="mobile-nav-header">
          <span className="mobile-nav-title">Menu</span>
          <button
            type="button"
            className="mobile-nav-close"
            onClick={onClose}
            aria-label={nav.menuClose}
          >
            <i className="fa-solid fa-xmark" aria-hidden="true" />
          </button>
        </div>

        <div className="mobile-nav-body">
          <MobileNavGroup
            label={nav.patients}
            sections={nav.patientsMenu}
            onClose={onClose}
          />
          <MobileNavGroup
            label={nav.doctors}
            sections={nav.doctorsMenu}
            onClose={onClose}
          />
          <MobileMenuLink href="#about" onClose={onClose}>
            {nav.about}
          </MobileMenuLink>
          <MobileMenuLink href="#cta" onClose={onClose}>
            {nav.contacts}
          </MobileMenuLink>
        </div>

        <div className="mobile-nav-footer">
          <div className="lang-switch mobile-lang-switch" aria-label="Language">
            <button
              type="button"
              className={locale === "uk" ? "active" : ""}
              onClick={() => onLocaleChange("uk")}
            >
              УКР
            </button>
            <span>|</span>
            <button
              type="button"
              className={locale === "en" ? "active" : ""}
              onClick={() => onLocaleChange("en")}
            >
              EN
            </button>
          </div>
          <a href="#cta" className="btn-nav mobile-nav-cta" onClick={onClose}>
            {nav.cta}
          </a>
        </div>
      </div>
    </div>
  );
}
