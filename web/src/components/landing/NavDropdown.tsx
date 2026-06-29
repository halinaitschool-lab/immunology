import Link from "next/link";
import type { ReactNode } from "react";
import type { NavMenuSection } from "@/lib/landing-content";

type Props = {
  label: string;
  sections: NavMenuSection[];
};

function MenuLink({ href, children }: { href: string; children: ReactNode }) {
  const className = "nav-dropdown-item";

  if (href.startsWith("#")) {
    return (
      <a href={href} className={className} role="menuitem">
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} role="menuitem">
      {children}
    </Link>
  );
}

export function NavDropdown({ label, sections }: Props) {
  return (
    <div className="nav-dropdown">
      <button type="button" className="nav-dropdown-trigger" aria-haspopup="true">
        <span>{label}</span>
        <i className="fa-solid fa-chevron-down" aria-hidden="true" />
      </button>
      <div className="nav-dropdown-menu" role="menu">
        {sections.map((section, sectionIndex) => (
          <div
            key={section.title}
            className={`nav-dropdown-section${sectionIndex > 0 ? " nav-dropdown-section-divided" : ""}`}
          >
            <div className="nav-dropdown-section-title">{section.title}</div>
            {section.items.map((item) => (
              <MenuLink key={item.href} href={item.href}>
                <i className={`fa-solid ${item.icon}`} aria-hidden="true" />
                {item.label}
              </MenuLink>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
