import Image from "next/image";
import Link from "next/link";
import lilyaImage from "@/images/lilya.jpg";

type Locale = "uk" | "en";

type HomeCopy = {
  locale: Locale;
  logo: string;
  badge: string;
  heroTitle: string;
  heroText: string;
  ctaPrimary: string;
  ctaSecondary: string;
  nav: {
    patients: string;
    doctors: string;
    about: string;
    contacts: string;
    lectures: string;
    guides: string;
    doctorsArticles: string;
  };
  sections: {
    problemLabel: string;
    problemTitle: string;
    problemSubtitle: string;
    problems: string[];
    processLabel: string;
    processTitle: string;
    process: string[];
    aboutLabel: string;
    aboutTitle: string;
    aboutText: string;
    faqLabel: string;
    faqTitle: string;
    faq: Array<{ q: string; a: string }>;
    contactTitle: string;
    contactText: string;
    footerText: string;
  };
};

const contentByLocale: Record<Locale, HomeCopy> = {
  uk: {
    locale: "uk",
    logo: "Ліля Нестеровська",
    badge: "Алергологія · Імунологія · Діти та дорослі",
    heroTitle: "Коли ніхто не може пояснити, що відбувається",
    heroText:
      "Консультації з алергології та імунології. Точна діагностика, зрозумілі пояснення та індивідуальний план.",
    ctaPrimary: "Записатися в Telegram",
    ctaSecondary: "Як я працюю",
    nav: {
      patients: "Для пацієнтів",
      doctors: "Для лікарів",
      about: "Про мене",
      contacts: "Контакти",
      lectures: "Лекції",
      guides: "Гайди",
      doctorsArticles: "Професійні статті",
    },
    sections: {
      problemLabel: "Ваша ситуація",
      problemTitle: "Чи впізнаєте себе тут?",
      problemSubtitle: "Часто люди приходять після кількох консультацій без результату.",
      problems: [
        "Ви вже були у кількох спеціалістів, але симптоми залишаються без пояснення.",
        "Призначене лікування не покращує стан або ефект тимчасовий.",
        "Інформації забагато і це лише підсилює тривогу.",
      ],
      processLabel: "Як проходить консультація",
      processTitle: "Від симптомів до ясності",
      process: [
        "Детальний анамнез і аналіз симптомів.",
        "Оцінка стану та визначення діагностичних кроків.",
        "Зрозумілий індивідуальний план дій.",
      ],
      aboutLabel: "Про мене",
      aboutTitle: "Лікар алерголог-імунолог",
      aboutText:
        "Працюю з дітьми і дорослими, пояснюю складні речі просто, використовую доказовий підхід.",
      faqLabel: "Часті запитання",
      faqTitle: "Ваші питання",
      faq: [
        {
          q: "Чи можна онлайн?",
          a: "Так, проводжу онлайн-консультації для первинних та повторних візитів.",
        },
        {
          q: "Чи приймаєте дітей?",
          a: "Так, приймаю дітей будь-якого віку.",
        },
        {
          q: "Як підготуватися?",
          a: "Підготуйте попередні аналізи, список ліків і короткий опис симптомів.",
        },
      ],
      contactTitle: "Зробіть перший крок",
      contactText:
        "Якщо потрібна зрозуміла медична підтримка та чіткий план, напишіть у Telegram.",
      footerText: "Алергологія · Імунологія · Діти та дорослі",
    },
  },
  en: {
    locale: "en",
    logo: "Lilya Nesterovska",
    badge: "Allergology · Immunology · Children & Adults",
    heroTitle: "When nobody can explain what is happening",
    heroText:
      "Allergy and immunology consultations with clear explanations, accurate diagnostics, and an individual plan.",
    ctaPrimary: "Book via Telegram",
    ctaSecondary: "How I work",
    nav: {
      patients: "For patients",
      doctors: "For doctors",
      about: "About",
      contacts: "Contact",
      lectures: "Lectures",
      guides: "Guides",
      doctorsArticles: "Professional articles",
    },
    sections: {
      problemLabel: "Your situation",
      problemTitle: "Do you recognize this?",
      problemSubtitle: "Many people come after several consultations without clear answers.",
      problems: [
        "You have seen several doctors but symptoms are still unexplained.",
        "Treatment does not improve the condition or helps only temporarily.",
        "Too much information creates more anxiety instead of clarity.",
      ],
      processLabel: "How consultation works",
      processTitle: "From symptoms to clarity",
      process: [
        "Detailed history and symptom analysis.",
        "Assessment and diagnostic strategy.",
        "Clear personalized action plan.",
      ],
      aboutLabel: "About me",
      aboutTitle: "Allergist-immunologist",
      aboutText:
        "I work with children and adults, explain complex topics clearly, and follow evidence-based medicine.",
      faqLabel: "FAQ",
      faqTitle: "Your questions",
      faq: [
        {
          q: "Do you provide online consultations?",
          a: "Yes, online appointments are available for initial and follow-up visits.",
        },
        {
          q: "Do you see children?",
          a: "Yes, I consult children of all ages.",
        },
        {
          q: "How should I prepare?",
          a: "Prepare previous test results, current medications, and a short symptom summary.",
        },
      ],
      contactTitle: "Take the first step",
      contactText: "If you need clear medical support and a realistic plan, message me on Telegram.",
      footerText: "Allergology · Immunology · Children & Adults",
    },
  },
};

export function HomePage({ locale }: { locale: Locale }) {
  const c = contentByLocale[locale];
  const isUk = locale === "uk";
  const telegramLink = "https://t.me/Lilyanest28";
  const langHref = isUk ? "/en" : "/";
  const lecturesHref = isUk ? "/mini-lectures" : "/en/mini-lectures";
  const guidesHref = isUk ? "/guides" : "/en/guides";
  const doctorsHref = isUk ? "/for-doctors" : "/en/for-doctors";

  return (
    <main>
      <header className="site-nav">
        <Link href={isUk ? "/" : "/en"} className="nav-logo">
          {c.logo}
        </Link>
        <nav className="nav-links">
          <a href="#about">{c.nav.about}</a>
          <a href="#faq">FAQ</a>
          <a href="#contact">{c.nav.contacts}</a>
          <Link href={lecturesHref}>{c.nav.lectures}</Link>
          <Link href={guidesHref}>{c.nav.guides}</Link>
          <Link href={doctorsHref}>{c.nav.doctorsArticles}</Link>
        </nav>
        <div className="nav-actions">
          <Link href={langHref} className="btn-lang">
            {isUk ? "EN" : "UA"}
          </Link>
          <a href={telegramLink} target="_blank" rel="noreferrer" className="btn-primary">
            {c.ctaPrimary}
          </a>
        </div>
      </header>

      <section className="hero">
        <div className="hero-text">
          <p className="hero-badge">{c.badge}</p>
          <h1>{c.heroTitle}</h1>
          <p>{c.heroText}</p>
          <div className="hero-ctas">
            <a href={telegramLink} target="_blank" rel="noreferrer" className="btn-primary">
              {c.ctaPrimary}
            </a>
            <a href="#process" className="btn-ghost">
              {c.ctaSecondary}
            </a>
          </div>
        </div>
        <div className="hero-image">
          <Image src={lilyaImage} alt={c.logo} priority />
        </div>
      </section>

      <section className="section-block section-dark">
        <p className="section-label">{c.sections.problemLabel}</p>
        <h2>{c.sections.problemTitle}</h2>
        <p className="section-sub">{c.sections.problemSubtitle}</p>
        <div className="cards-grid">
          {c.sections.problems.map((item) => (
            <article key={item} className="card">
              {item}
            </article>
          ))}
        </div>
      </section>

      <section id="process" className="section-block">
        <p className="section-label">{c.sections.processLabel}</p>
        <h2>{c.sections.processTitle}</h2>
        <div className="cards-grid">
          {c.sections.process.map((item) => (
            <article key={item} className="card">
              {item}
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="section-block section-dark">
        <p className="section-label">{c.sections.aboutLabel}</p>
        <h2>{c.sections.aboutTitle}</h2>
        <p className="section-sub">{c.sections.aboutText}</p>
      </section>

      <section id="faq" className="section-block">
        <p className="section-label">{c.sections.faqLabel}</p>
        <h2>{c.sections.faqTitle}</h2>
        <div className="faq-list">
          {c.sections.faq.map((item) => (
            <details key={item.q} className="faq-item">
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="contact" className="section-block section-contact">
        <h2>{c.sections.contactTitle}</h2>
        <p>{c.sections.contactText}</p>
        <a href={telegramLink} target="_blank" rel="noreferrer" className="btn-primary">
          {c.ctaPrimary}
        </a>
      </section>

      <footer className="site-footer">
        <p>{c.sections.footerText}</p>
      </footer>
    </main>
  );
}
