export type Locale = "uk" | "en";

export type NavMenuItem = { label: string; href: string; icon: string };
export type NavMenuSection = { title: string; items: NavMenuItem[] };

export type LandingContent = {
  nav: {
    logo: string;
    logoAccent: string;
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
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    pillOnline: string;
    pillEvidence: string;
    pillChildren: string;
    doctorName: string;
    doctorSpec: string;
    doctorBio: string;
    statYears: string;
    statPatients: string;
    statFormats: string;
  };
  amberStrip: { text: string; strong: string; telegram: string };
  problem: {
    label: string;
    title: string;
    subtitle: string;
    cards: { title: string; text: string }[];
    quote: string;
  };
  cred: {
    label: string;
    title: string;
    subtitle: string;
    badges: string[];
    timeline: { title: string; text: string }[];
  };
  solution: {
    label: string;
    title: string;
    subtitle: string;
    steps: { title: string; text: string }[];
    resultLabel: string;
    resultTitle: string;
    understand: { strong: string; rest: string }[];
    aboutQuote: string;
  };
  about: {
    label: string;
    title: string;
    subtitle: string;
    values: { title: string; text: string }[];
  };
  forwhom: {
    label: string;
    title: string;
    yesTitle: string;
    yesItems: string[];
    noTitle: string;
    noItems: string[];
  };
  reviews: {
    label: string;
    title: string;
    items: { quote: string; initials: string; name: string; role: string }[];
  };
  guarantee: {
    label: string;
    title: string;
    subtitle: string;
    quote: string;
    items: string[];
  };
  faq: {
    label: string;
    title: string;
    items: { q: string; a: string }[];
  };
  cta: {
    label: string;
    title: string;
    subtitle: string;
    telegramLabel: string;
    formatLabel: string;
    formatValue: string;
    languagesLabel: string;
    languagesValue: string;
    button: string;
    formatBoxLabel: string;
    formatBoxTitle: string;
    formatBoxNote: string;
    formatBoxAfter: string;
    formatBoxItems: string[];
  };
  footer: {
    tagline: string;
    patientsCol: string;
    patientsLinks: string[];
    contactsCol: string;
    contactsLinks: string[];
    copyright: string;
    tag: string;
    developerCredit: { prefix: string; name: string };
  };
};

export const landingContent: Record<Locale, LandingContent> = {
  uk: {
    nav: {
      logo: "Ліля",
      logoAccent: "Нестеровська",
      patients: "Для пацієнтів",
      patientsMenu: [
        {
          title: "Матеріали",
          items: [
            { label: "Лекції", href: "/lectures", icon: "fa-book-open" },
            { label: "Гайди", href: "/guides", icon: "fa-file-lines" },
          ],
        },
        {
          title: "Корисне",
          items: [
            { label: "Як я працюю", href: "#solution", icon: "fa-route" },
            { label: "Реальні історії", href: "#reviews", icon: "fa-star" },
            {
              label: "Питання та відповіді",
              href: "#faq",
              icon: "fa-circle-question",
            },
          ],
        },
      ],
      doctors: "Для лікарів",
      doctorsMenu: [
        {
          title: "Матеріали",
          items: [
            {
              label: "Наукові статті",
              href: "/articles",
              icon: "fa-file-medical",
            },
            {
              label: "Конференції",
              href: "/conferences",
              icon: "fa-microphone-lines",
            },
          ],
        },
      ],
      about: "Про мене",
      contacts: "Контакти",
      cta: "Запис на консультацію",
      menuOpen: "Відкрити меню",
      menuClose: "Закрити меню",
    },
    hero: {
      badge: "Алергологія · Імунологія · Діти та дорослі",
      title: "Коли ніхто не може *пояснити*, що відбувається",
      subtitle:
        "Консультації з алергології та імунології. Точна діагностика, зрозумілі пояснення та індивідуальний план — без обіцянок неможливого.",
      ctaPrimary: "Запис на консультацію",
      ctaSecondary: "Як це працює",
      pillOnline: "Онлайн / офлайн",
      pillEvidence: "Доказова медицина",
      pillChildren: "Діти від 0 р.",
      doctorName: "Ліля Нестеровська",
      doctorSpec: "Лікар алерголог-імунолог · MD",
      doctorBio:
        "Спеціалізується на складних, невирішених випадках — коли попередні консультації не дали відповіді на питання.",
      statYears: "Років досвіду",
      statPatients: "Пацієнтів",
      statFormats: "Формати",
    },
    amberStrip: {
      strong: "Є питання?",
      text: "Напишіть у Telegram — відповідаю особисто.",
      telegram: "@Lilyanest28",
    },
    problem: {
      label: "Ваша ситуація",
      title: "Чи впізнаєте себе *тут*?",
      subtitle:
        "Часто до мене приходять люди, які вже були у кількох спеціалістів і все ще говорять:",
      cards: [
        {
          title: "«Ніхто не знає, що зі мною»",
          text: "Ви вже були у кількох спеціалістів, але симптоми залишаються без пояснення. Відчуття невизначеності виснажує.",
        },
        {
          title: "Лікування не допомагає",
          text: "Призначили ліки — але стан не покращується або покращується тимчасово. Схема лікування потребує перегляду.",
        },
        {
          title: "Занадто багато інформації",
          text: "Інтернет, форуми, знайомі — всі дають поради. Але вони лише посилюють тривогу, а не дають ясності.",
        },
        {
          title: "Хвора дитина — страх батьків",
          text: "Часті алергії, висипання, інфекції у дитини — і ви не розумієте причину. Потрібен спеціаліст, якому можна довіряти.",
        },
      ],
      quote:
        "«Іноді пацієнту потрібні не лише ліки, а *розуміння* — що відбувається, чому і що робити далі.»",
    },
    cred: {
      label: "Чому мені довіряють",
      title: "Підхід, що *працює*",
      subtitle:
        "Я не обіцяю неможливого — але гарантую системний, доказовий підхід та повагу до вашого часу.",
      badges: [
        "Медична освіта",
        "Сертифікований спеціаліст",
        "Доказова медицина",
        "Українська / English",
        "Онлайн-консультації",
      ],
      timeline: [
        {
          title: "Спеціалізація: алергологія та клінічна імунологія",
          text: "Діти та дорослі. Від алергічного риніту до первинних імунодефіцитів.",
        },
        {
          title: "Постійне навчання та оновлення знань",
          text: "Слідкую за міжнародними протоколами та клінічними настановами EAACI, WAO.",
        },
        {
          title: "Прозора комунікація",
          text: "Кожен пацієнт отримує зрозуміле пояснення — без медичного жаргону та зайвої складності.",
        },
        {
          title: "Чесна позиція",
          text: "Якщо ваш випадок потребує іншого спеціаліста — я скажу про це прямо.",
        },
      ],
    },
    solution: {
      label: "Як проходить консультація",
      title: "Від симптомів до *ясності*",
      subtitle:
        "Кожен крок побудований так, щоб ви вийшли з консультації з чітким розумінням свого стану.",
      steps: [
        {
          title: "Анамнез",
          text: "Детальна розмова про симптоми, тригери та попереднє лікування. Без поспіху.",
        },
        {
          title: "Оцінка стану",
          text: "Аналіз симптомів, фізикальний огляд, оцінка попередніх обстежень.",
        },
        {
          title: "Діагностика",
          text: "За потреби — алергопроби, дихальні тести, лабораторні обстеження.",
        },
        {
          title: "Ваш план",
          text: "Зрозумілий діагноз, рекомендації щодо способу життя та чіткі наступні кроки.",
        },
      ],
      resultLabel: "Результат консультації",
      resultTitle: "Що ви зрозумієте після консультації",
      understand: [
        { strong: "Що саме", rest: "відбувається з вашим станом зараз" },
        { strong: "Чому це виникло", rest: "і які фактори підтримують стан" },
        { strong: "Як з цим жити", rest: "щодня без постійної тривоги" },
        { strong: "Що робити далі", rest: "— чіткі кроки та пріоритети" },
      ],
      aboutQuote:
        "«Легше не стало, але я розумію свою хворобу» — іноді це найважливіше, що може дати лікар.",
    },
    about: {
      label: "Про мене",
      title: "Ліля *Нестеровська*",
      subtitle:
        "Лікар алерголог-імунолог для дітей і дорослих. Моя робота — не просто призначити ліки, а допомогти вам зрозуміти свій стан і побудувати стратегію.",
      values: [
        {
          title: "Уважність до кожного пацієнта",
          text: "Кожна консультація — це не конвеєр, а індивідуальна розмова.",
        },
        {
          title: "Доказовий підхід",
          text: "Тільки методи з підтвердженою ефективністю. Без псевдонауки.",
        },
        {
          title: "Пояснення зрозумілою мовою",
          text: "Ваш діагноз — це не таємниця. Ви маєте право розуміти свій стан.",
        },
        {
          title: "Лікування, що підходить саме вам",
          text: "Не стандартний протокол «для всіх», а план під вашу ситуацію.",
        },
      ],
    },
    forwhom: {
      label: "Для кого ця консультація",
      title: "Чесно про *очікування*",
      yesTitle: "Вам підійде, якщо...",
      yesItems: [
        "Є часті алергічні реакції або висипання",
        "Хронічний нежить або кашель без зрозумілої причини",
        "Підозра на астму або діагноз без чіткого плану",
        "Часті інфекції або ослаблений імунітет",
        "Хочете другу думку щодо свого діагнозу",
        "Ваша дитина має алергію або імунні проблеми",
      ],
      noTitle: "Не підійде, якщо...",
      noItems: [
        "Шукаєте «магічні» ліки без діагностики",
        "Хочете підтвердження вже прийнятого рішення, а не об'єктивної оцінки",
        "Очікуєте гарантованого результату за один прийом",
        "Не готові до чесного, але можливо непростого діагнозу",
        "Шукаєте призначень без фізичного огляду (для первинних випадків)",
      ],
    },
    reviews: {
      label: "Що кажуть пацієнти",
      title: "Реальні *історії*",
      items: [
        {
          quote:
            "«Мені вас порадили — і я не пошкодувала. Вперше за роки отримала чітку відповідь на питання, що зі мною.»",
          initials: "О.Р",
          name: "Оксана Р.",
          role: "Пацієнтка, 34 роки",
        },
        {
          quote:
            "«Легше не стало, але я розумію свою хворобу — і це вже дуже допомагає. Дякую за чесність і уважність.»",
          initials: "М.К",
          name: "Михайло К.",
          role: "Пацієнт, 41 рік",
        },
        {
          quote:
            "«Прийшла з дитиною після трьох безрезультатних прийомів. Ліля поставила діагноз і пояснила все — дякую!»",
          initials: "Н.В",
          name: "Наталія В.",
          role: "Мама пацієнта, 3 роки",
        },
        {
          quote:
            "«Нарешті лікар, який говорить зрозуміло. Не просто виписала рецепт, а пояснила кожен крок лікування.»",
          initials: "Т.Л",
          name: "Тетяна Л.",
          role: "Пацієнтка, 28 років",
        },
      ],
    },
    guarantee: {
      label: "Моя гарантія",
      title: "Чесно про *медицину*",
      subtitle:
        "У медицині немає гарантій результату. Але є те, що я можу обіцяти завжди.",
      quote:
        "«Жоден відповідальний лікар не може обіцяти неможливе. Але я гарантую підхід, якому можна довіряти.»",
      items: [
        "Уважність під час кожної консультації",
        "Чесна оцінка вашої ситуації",
        "Доказовий підхід до діагностики",
        "Пояснення зрозумілою мовою",
        "Лікування, що підходить саме вам",
        "Повага до вашого часу та рішень",
      ],
    },
    faq: {
      label: "Часті запитання",
      title: "Ваші *питання*",
      items: [
        {
          q: "Чи приймаєте ви дітей?",
          a: "Так, я приймаю дітей будь-якого віку — від немовлят до підлітків. Для дітей до 14 років на консультації має бути присутній один із батьків або законний представник.",
        },
        {
          q: "Чи можна отримати консультацію онлайн?",
          a: "Так, я проводжу онлайн-консультації. Це зручний формат для повторних прийомів, обговорення результатів аналізів або якщо ви не маєте можливості приїхати особисто.",
        },
        {
          q: "Як підготуватися до консультації?",
          a: "Після запису ви отримаєте інструкцію: які документи та результати обстежень взяти, як підготуватися та що очікувати. Зазвичай потрібні попередні аналізи, медична картка та список поточних ліків.",
        },
        {
          q: "Чому повторна консультація оплачується окремо?",
          a: "Повторна консультація — це повноцінна зустріч: я аналізую динаміку стану, коригую план лікування та відповідаю на нові питання. Це окрема робота, яка вимагає часу та уваги.",
        },
        {
          q: "Які тести ви можете призначити?",
          a: "Залежно від вашого стану: шкірні алергопроби, аналіз крові на специфічні IgE, загальний аналіз крові, спірометрія (дихальний тест), імунограма та інші лабораторні обстеження.",
        },
        {
          q: "Скільки триває консультація?",
          a: "Первинна консультація зазвичай займає 45–60 хвилин. Цього часу достатньо для детального збору анамнезу, огляду та складання індивідуального плану.",
        },
      ],
    },
    cta: {
      label: "Запис на консультацію",
      title: "Зробіть перший *крок* до ясності",
      subtitle:
        "Якщо ви шукаєте не просто прийом, а зрозумілу медичну підтримку — буду рада допомогти.",
      telegramLabel: "Telegram",
      formatLabel: "Онлайн або офлайн",
      formatValue: "Зручний для вас формат",
      languagesLabel: "Мови",
      languagesValue: "Українська · English",
      button: "Написати в Telegram",
      formatBoxLabel: "Ваш формат",
      formatBoxTitle: "Первинна консультація",
      formatBoxNote: "60 хв · офлайн · з фізичним оглядом",
      formatBoxAfter: "Після запису ви отримаєте інформацію:",
      formatBoxItems: [
        "як підготуватися",
        "які документи взяти",
        "чи потрібна присутність батьків",
        "формат консультації (онлайн або офлайн)",
      ],
    },
    footer: {
      tagline:
        "Лікар алерголог-імунолог для дітей та дорослих. Доказова медицина. Зрозумілі пояснення.",
      patientsCol: "Для пацієнтів",
      patientsLinks: [
        "Як я працюю",
        "Лекції та навчання",
        "Гайди та інструкції",
        "Питання та відповіді",
      ],
      contactsCol: "Контакти",
      contactsLinks: [
        "Telegram: @Lilyanest28",
        "Про мене",
        "Записатися",
        "Для лікарів",
      ],
      copyright: "© 2026 Ліля Нестеровська. Алергологія та імунологія.",
      tag: "Для дітей та дорослих",
      developerCredit: { prefix: "Сайт розроблено", name: "HIT LAB" },
    },
  },
  en: {
    nav: {
      logo: "Lilia",
      logoAccent: "Nesterovska",
      patients: "For patients",
      patientsMenu: [
        {
          title: "Materials",
          items: [
            { label: "Lectures", href: "/lectures", icon: "fa-book-open" },
            { label: "Guides", href: "/guides", icon: "fa-file-lines" },
          ],
        },
        {
          title: "Useful",
          items: [
            { label: "How I work", href: "#solution", icon: "fa-route" },
            { label: "Real stories", href: "#reviews", icon: "fa-star" },
            { label: "Q&A", href: "#faq", icon: "fa-circle-question" },
          ],
        },
      ],
      doctors: "For doctors",
      doctorsMenu: [
        {
          title: "Materials",
          items: [
            {
              label: "Scientific articles",
              href: "/articles",
              icon: "fa-file-medical",
            },
            {
              label: "Conferences",
              href: "/conferences",
              icon: "fa-microphone-lines",
            },
          ],
        },
      ],
      about: "About me",
      contacts: "Contact",
      cta: "Book a consultation",
      menuOpen: "Open menu",
      menuClose: "Close menu",
    },
    hero: {
      badge: "Allergology · Immunology · Children & adults",
      title: "When *no one can explain* what is happening",
      subtitle:
        "Allergology and immunology consultations. Accurate diagnostics, clear explanations, and an individual plan — without promising the impossible.",
      ctaPrimary: "Book a consultation",
      ctaSecondary: "How it works",
      pillOnline: "Online / in person",
      pillEvidence: "Evidence-based medicine",
      pillChildren: "Children from birth",
      doctorName: "Lilia Nesterovska",
      doctorSpec: "Allergist-immunologist · MD",
      doctorBio:
        "Specializes in complex, unresolved cases — when previous consultations did not answer your questions.",
      statYears: "Years of experience",
      statPatients: "Patients",
      statFormats: "Formats",
    },
    amberStrip: {
      strong: "Have a question?",
      text: "Message me on Telegram — I reply personally.",
      telegram: "@Lilyanest28",
    },
    problem: {
      label: "Your situation",
      title: "Do you recognize yourself *here*?",
      subtitle:
        "People often come to me after seeing several specialists and still saying:",
      cards: [
        {
          title: "“No one knows what's wrong with me”",
          text: "You've seen several specialists, but symptoms remain unexplained. The uncertainty is exhausting.",
        },
        {
          title: "Treatment doesn't help",
          text: "Medication was prescribed — but your condition doesn't improve or only improves temporarily. The treatment plan needs review.",
        },
        {
          title: "Too much information",
          text: "The internet, forums, friends — everyone gives advice. But it increases anxiety instead of bringing clarity.",
        },
        {
          title: "A sick child — parents' fear",
          text: "Frequent allergies, rashes, infections in your child — and you don't understand why. You need a specialist you can trust.",
        },
      ],
      quote:
        "“Sometimes a patient needs not only medicine, but *understanding* — what is happening, why, and what to do next.”",
    },
    cred: {
      label: "Why patients trust me",
      title: "An approach that *works*",
      subtitle:
        "I don't promise the impossible — but I guarantee a systematic, evidence-based approach and respect for your time.",
      badges: [
        "Medical education",
        "Certified specialist",
        "Evidence-based medicine",
        "Ukrainian / English",
        "Online consultations",
      ],
      timeline: [
        {
          title: "Specialization: allergology & clinical immunology",
          text: "Children and adults. From allergic rhinitis to primary immunodeficiencies.",
        },
        {
          title: "Continuous learning",
          text: "I follow international protocols and clinical guidelines from EAACI and WAO.",
        },
        {
          title: "Transparent communication",
          text: "Every patient receives a clear explanation — without medical jargon or unnecessary complexity.",
        },
        {
          title: "Honest position",
          text: "If your case requires another specialist — I will tell you directly.",
        },
      ],
    },
    solution: {
      label: "How a consultation works",
      title: "From symptoms to *clarity*",
      subtitle:
        "Each step is designed so you leave the consultation with a clear understanding of your condition.",
      steps: [
        {
          title: "History",
          text: "A detailed conversation about symptoms, triggers, and previous treatment. Without rushing.",
        },
        {
          title: "Assessment",
          text: "Analysis of symptoms, physical examination, review of previous tests.",
        },
        {
          title: "Diagnostics",
          text: "If needed — allergy tests, breathing tests, laboratory examinations.",
        },
        {
          title: "Your plan",
          text: "A clear diagnosis, lifestyle recommendations, and concrete next steps.",
        },
      ],
      resultLabel: "Consultation outcome",
      resultTitle: "What you will understand after the consultation",
      understand: [
        { strong: "What exactly", rest: "is happening with your condition now" },
        { strong: "Why it arose", rest: "and which factors maintain it" },
        { strong: "How to live with it", rest: "day to day without constant anxiety" },
        { strong: "What to do next", rest: "— clear steps and priorities" },
      ],
      aboutQuote:
        "“It didn't get easier, but I understand my illness” — sometimes that's the most important thing a doctor can give.",
    },
    about: {
      label: "About me",
      title: "Lilia *Nesterovska*",
      subtitle:
        "Allergist-immunologist for children and adults. My work is not just to prescribe medication, but to help you understand your condition and build a strategy.",
      values: [
        {
          title: "Attention to every patient",
          text: "Every consultation is not a conveyor belt, but an individual conversation.",
        },
        {
          title: "Evidence-based approach",
          text: "Only methods with proven effectiveness. No pseudoscience.",
        },
        {
          title: "Explanations in plain language",
          text: "Your diagnosis is not a secret. You have the right to understand your condition.",
        },
        {
          title: "Treatment tailored to you",
          text: "Not a standard protocol “for everyone”, but a plan for your situation.",
        },
      ],
    },
    forwhom: {
      label: "Who this consultation is for",
      title: "Honestly about *expectations*",
      yesTitle: "It's right for you if...",
      yesItems: [
        "You have frequent allergic reactions or rashes",
        "Chronic runny nose or cough without a clear cause",
        "Suspected asthma or a diagnosis without a clear plan",
        "Frequent infections or weakened immunity",
        "You want a second opinion on your diagnosis",
        "Your child has allergy or immune problems",
      ],
      noTitle: "It's not right if...",
      noItems: [
        "You're looking for “magic” pills without diagnostics",
        "You want confirmation of a decision already made, not an objective assessment",
        "You expect a guaranteed result in one visit",
        "You're not ready for an honest, possibly difficult diagnosis",
        "You want prescriptions without a physical exam (for initial cases)",
      ],
    },
    reviews: {
      label: "What patients say",
      title: "Real *stories*",
      items: [
        {
          quote:
            "“I was referred to you — and I don't regret it. For the first time in years I got a clear answer to what's wrong with me.”",
          initials: "O.R",
          name: "Oksana R.",
          role: "Patient, 34",
        },
        {
          quote:
            "“It didn't get easier, but I understand my illness — and that already helps a lot. Thank you for honesty and care.”",
          initials: "M.K",
          name: "Mykhailo K.",
          role: "Patient, 41",
        },
        {
          quote:
            "“I came with my child after three unhelpful appointments. Lilia made a diagnosis and explained everything — thank you!”",
          initials: "N.V",
          name: "Natalia V.",
          role: "Parent of patient, 3",
        },
        {
          quote:
            "“Finally a doctor who speaks clearly. She didn't just write a prescription — she explained every step of treatment.”",
          initials: "T.L",
          name: "Tetiana L.",
          role: "Patient, 28",
        },
      ],
    },
    guarantee: {
      label: "My guarantee",
      title: "Honestly about *medicine*",
      subtitle:
        "Medicine offers no guarantees of outcome. But there are things I can always promise.",
      quote:
        "“No responsible doctor can promise the impossible. But I guarantee an approach you can trust.”",
      items: [
        "Full attention during every consultation",
        "Honest assessment of your situation",
        "Evidence-based approach to diagnostics",
        "Explanations in plain language",
        "Treatment tailored to you",
        "Respect for your time and decisions",
      ],
    },
    faq: {
      label: "FAQ",
      title: "Your *questions*",
      items: [
        {
          q: "Do you see children?",
          a: "Yes, I see children of any age — from infants to teenagers. For children under 14, a parent or legal guardian must be present at the consultation.",
        },
        {
          q: "Can I get an online consultation?",
          a: "Yes, I offer online consultations. This is convenient for follow-up visits, discussing test results, or if you cannot come in person.",
        },
        {
          q: "How should I prepare for a consultation?",
          a: "After booking you will receive instructions: which documents and test results to bring, how to prepare, and what to expect. Usually you need previous tests, medical records, and a list of current medications.",
        },
        {
          q: "Why is a follow-up consultation charged separately?",
          a: "A follow-up consultation is a full appointment: I analyze changes in your condition, adjust the treatment plan, and answer new questions. It requires separate time and attention.",
        },
        {
          q: "What tests can you order?",
          a: "Depending on your condition: skin allergy tests, specific IgE blood tests, complete blood count, spirometry (breathing test), immunogram, and other laboratory tests.",
        },
        {
          q: "How long does a consultation last?",
          a: "An initial consultation usually takes 45–60 minutes. This is enough time for a detailed history, examination, and an individual plan.",
        },
      ],
    },
    cta: {
      label: "Book a consultation",
      title: "Take the first *step* toward clarity",
      subtitle:
        "If you're looking for more than an appointment — clear medical support — I'll be glad to help.",
      telegramLabel: "Telegram",
      formatLabel: "Online or in person",
      formatValue: "A format that works for you",
      languagesLabel: "Languages",
      languagesValue: "Ukrainian · English",
      button: "Message on Telegram",
      formatBoxLabel: "Your format",
      formatBoxTitle: "Initial consultation",
      formatBoxNote: "60 min · in person · with physical examination",
      formatBoxAfter: "After booking you will receive information on:",
      formatBoxItems: [
        "how to prepare",
        "which documents to bring",
        "whether a parent needs to be present",
        "consultation format (online or in person)",
      ],
    },
    footer: {
      tagline:
        "Allergist-immunologist for children and adults. Evidence-based medicine. Clear explanations.",
      patientsCol: "For patients",
      patientsLinks: [
        "How I work",
        "Lectures & learning",
        "Guides & instructions",
        "Questions & answers",
      ],
      contactsCol: "Contact",
      contactsLinks: [
        "Telegram: @Lilyanest28",
        "About me",
        "Book a visit",
        "For doctors",
      ],
      copyright: "© 2026 Lilia Nesterovska. Allergology & immunology.",
      tag: "For children and adults",
      developerCredit: { prefix: "Site by", name: "HIT LAB" },
    },
  },
};
