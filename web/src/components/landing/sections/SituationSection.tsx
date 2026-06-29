import { parseAccent } from "@/lib/parse-accent";
import type { LandingContent } from "@/lib/landing-content";
import "./situation-section.css";

const ICONS = [
  "fa-user-doctor",
  "fa-pills",
  "fa-brain",
  "fa-child",
] as const;

type Props = {
  content: LandingContent["problem"];
};

export function SituationSection({ content }: Props) {
  return (
    <section className="situation-section" id="problem">
      <div className="reveal">
        <span className="section-label">{content.label}</span>
        <h2 className="section-title">{parseAccent(content.title)}</h2>
        <p className="section-sub">{content.subtitle}</p>
      </div>

      <div className="situation-grid">
        {content.cards.map((card, index) => (
          <article
            key={index}
            className={`situation-card reveal reveal-d${index + 1}`}
          >
            <div className="situation-card-icon" aria-hidden="true">
              <i className={`fa-solid ${ICONS[index]}`} />
            </div>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </article>
        ))}
      </div>

      <div className="situation-quote reveal">
        <p>{parseAccent(content.quote)}</p>
      </div>
    </section>
  );
}
