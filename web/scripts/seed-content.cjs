/**
 * Seed 2 sample documents per content type.
 * Run: npm run seed:content
 * Requires: sanity login (uses your CLI auth token)
 */

const { createClient } = require("@sanity/client");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { randomBytes } = require("crypto");

const projectId = "6ug4wlfa";
const dataset = "production";

function getAuthToken() {
  if (process.env.SANITY_API_TOKEN) return process.env.SANITY_API_TOKEN;
  const candidates = [
    path.join(os.homedir(), ".config", "sanity", "config.json"),
    path.join(os.homedir(), "Library", "Preferences", "sanity", "config.json"),
  ];
  for (const file of candidates) {
    try {
      const data = JSON.parse(fs.readFileSync(file, "utf8"));
      if (data.authToken) return data.authToken;
    } catch {
      /* try next path */
    }
  }
  return null;
}

const token = getAuthToken();

if (!token) {
  console.error(
    "No auth token. Run `npx sanity login` or set SANITY_API_TOKEN.\n" +
      "https://www.sanity.io/manage/project/6ug4wlfa/api#tokens",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-03-01",
  token,
  useCdn: false,
});

const key = () => randomBytes(4).toString("hex");

function block(text, style = "normal") {
  return {
    _type: "block",
    _key: key(),
    style,
    markDefs: [],
    children: [{ _type: "span", _key: key(), text, marks: [] }],
  };
}

function h2(text) {
  return block(text, "h2");
}

function bodyParagraphs(paragraphs) {
  return paragraphs.map((p) => block(p));
}

const IMAGES = {
  lecture1: "https://picsum.photos/seed/immuno-lecture1/1200/800",
  lecture2: "https://picsum.photos/seed/immuno-lecture2/1200/800",
  guide1: "https://picsum.photos/seed/immuno-guide1/1200/800",
  guide2: "https://picsum.photos/seed/immuno-guide2/1200/800",
  article1: "https://picsum.photos/seed/immuno-article1/1200/800",
  article2: "https://picsum.photos/seed/immuno-article2/1200/800",
  conference1: "https://picsum.photos/seed/immuno-conf1/1200/800",
  conference2: "https://picsum.photos/seed/immuno-conf2/1200/800",
};

async function uploadImage(url, filename) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  return client.assets.upload("image", buffer, { filename });
}

async function coverFromUrl(url, alt, altEn) {
  const asset = await uploadImage(url, `${alt.slice(0, 20).replace(/\s/g, "-")}.jpg`);
  return {
    _type: "image",
    asset: { _type: "reference", _ref: asset._id },
    alt,
    altEn,
  };
}

const SEED = [
  {
    _id: "seed-lecture-1",
    _type: "lecture",
    title: "Алергічний риніт: що потрібно знати",
    titleEn: "Allergic rhinitis: what you need to know",
    slug: { _type: "slug", current: "allergic-rhinitis-basics" },
    excerpt:
      "Чому нежить не завжди «просто застуда» — і коли варто звернутися до алерголога.",
    excerptEn:
      "Why a runny nose isn't always «just a cold» — and when to see an allergist.",
    imageKey: "lecture1",
    alt: "Лікар консультує пацієнта",
    altEn: "Doctor consulting a patient",
    publishedAt: "2025-11-12T10:00:00.000Z",
    readingTimeMinutes: 12,
    featured: true,
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    duration: "45 хв",
    durationEn: "45 min",
    level: "basic",
    learningOutcomes: [
      "Розуміти різницю між алергічним та інфекційним ринітом",
      "Знати основні тригери та сезонність",
      "Розуміти варіанти лікування без «магічних» обіцянок",
    ],
    learningOutcomesEn: [
      "Understand allergic vs infectious rhinitis",
      "Know common triggers and seasonality",
      "Understand treatment options without false promises",
    ],
    topics: ["риніт", "алергія", "діагностика"],
    bodyUk: bodyParagraphs([
      "Алергічний риніт — одна з найпоширеніших причин хронічного нежитю. Часто його плутають із частими застудами, але механізм зовсім інший.",
      "На консультації ми розбираємо симптоми, тригери та результати попередніх обстежень. Це допомагає скласти реалістичний план — не лише призначити спрей «на всякий випадок».",
    ]),
    bodyEn: bodyParagraphs([
      "Allergic rhinitis is one of the most common causes of chronic runny nose. It is often confused with frequent colds, but the mechanism is different.",
      "During a consultation we review symptoms, triggers, and previous tests. This helps build a realistic plan — not just prescribe a spray «just in case».",
    ]),
  },
  {
    _id: "seed-lecture-2",
    _type: "lecture",
    title: "Первинні імунодефіцити: коли підозрювати",
    titleEn: "Primary immunodeficiency: when to suspect",
    slug: { _type: "slug", current: "primary-immunodeficiency-signs" },
    excerpt:
      "Часті інфекції, довге одужання, антибіотики курс за курсом — коли це не «просто слабкий імунітет».",
    excerptEn:
      "Frequent infections, slow recovery, antibiotics course after course — when it's not «just weak immunity».",
    imageKey: "lecture2",
    alt: "Лабораторні дослідження",
    altEn: "Laboratory research",
    publishedAt: "2025-10-05T10:00:00.000Z",
    readingTimeMinutes: 18,
    featured: false,
    duration: "50 хв",
    durationEn: "50 min",
    level: "intermediate",
    learningOutcomes: [
      "Побачити «червоні прапорці» в анамнезі",
      "Зрозуміти, які обстеження можуть бути потрібні",
      "Знати, коли потрібна очна консультація імунолога",
    ],
    learningOutcomesEn: [
      "Spot red flags in medical history",
      "Understand which tests may be needed",
      "Know when an in-person immunology visit is required",
    ],
    topics: ["імунодефіцит", "інфекції", "діти"],
    bodyUk: bodyParagraphs([
      "Первинні імунодефіцити рідкісні, але їх наслідки серйозні. Важливо не пропустити пацієнта, який роками лікує «синусити» без системного погляду.",
      "На лекції розглядаємо клінічні сценарії та алгоритм первинної оцінки — без залякування, але з повагою до фактів.",
    ]),
    bodyEn: bodyParagraphs([
      "Primary immunodeficiencies are rare but serious. It's important not to miss patients who for years treat «sinusitis» without a systematic view.",
      "This lecture covers clinical scenarios and a primary assessment algorithm — without scare tactics, but with respect for facts.",
    ]),
  },
  {
    _id: "seed-guide-1",
    _type: "guide",
    title: "Як підготуватися до першого візиту",
    titleEn: "How to prepare for your first visit",
    slug: { _type: "slug", current: "first-visit-preparation" },
    excerpt:
      "Список документів, питань і очікувань — щоб консультація була максимально корисною.",
    excerptEn:
      "Documents, questions, and expectations — so your consultation is as useful as possible.",
    imageKey: "guide1",
    alt: "Підготовка документів до візиту",
    altEn: "Preparing documents for a visit",
    publishedAt: "2025-09-20T10:00:00.000Z",
    readingTimeMinutes: 8,
    featured: true,
    targetAudience: "Пацієнти, які вперше записуються на консультацію",
    targetAudienceEn: "Patients booking their first consultation",
    steps: [
      {
        _key: key(),
        title: "Зберіть документи",
        titleEn: "Gather documents",
        description: "Аналізи, висновки інших лікарів, список ліків.",
        descriptionEn: "Test results, other doctors' notes, medication list.",
      },
      {
        _key: key(),
        title: "Запишіть симптоми",
        titleEn: "Write down symptoms",
        description: "Коли почалось, що провокує, що допомагає.",
        descriptionEn: "When it started, triggers, what helps.",
      },
      {
        _key: key(),
        title: "Підготуйте питання",
        titleEn: "Prepare questions",
        description: "3–5 головних питань, які хочете обговорити.",
        descriptionEn: "3–5 main questions you want to discuss.",
      },
    ],
    relatedConditions: ["алергія", "астма", "риніт"],
    bodyUk: [
      h2("Перед візитом"),
      ...bodyParagraphs([
        "Перша консультація — це не іспит. Вам не потрібно «правильно» описати симптоми. Достатньо чесно розповісти, що вас турбує.",
        "Якщо є фото висипань або додаткові результати — візьміть їх із собою або надішліть заздалегідь.",
      ]),
    ],
    bodyEn: [
      h2("Before the visit"),
      ...bodyParagraphs([
        "The first consultation is not an exam. You don't need to describe symptoms «correctly». Just honestly share what bothers you.",
        "If you have photos of rashes or extra test results — bring them or send in advance.",
      ]),
    ],
  },
  {
    _id: "seed-guide-2",
    _type: "guide",
    title: "Алергія у дитини: перші кроки для батьків",
    titleEn: "Child allergy: first steps for parents",
    slug: { _type: "slug", current: "child-allergy-first-steps" },
    excerpt:
      "Що фіксувати, коли звертатися до лікаря і чого не варто робити самостійно.",
    excerptEn:
      "What to track, when to see a doctor, and what not to do on your own.",
    imageKey: "guide2",
    alt: "Лікар оглядає дитину",
    altEn: "Doctor examining a child",
    publishedAt: "2025-08-14T10:00:00.000Z",
    readingTimeMinutes: 10,
    featured: false,
    targetAudience: "Батьки дітей з підозрою на алергію",
    targetAudienceEn: "Parents of children with suspected allergy",
    steps: [
      {
        _key: key(),
        title: "Щоденник симптомів",
        titleEn: "Symptom diary",
        description: "Їжа, висипання, нежить — 7–14 днів.",
        descriptionEn: "Food, rashes, runny nose — 7–14 days.",
      },
      {
        _key: key(),
        title: "Не прибирайте продукти без плану",
        titleEn: "Don't remove foods without a plan",
        description: "Жорсткі дієти без діагностики часто шкодять.",
        descriptionEn: "Strict diets without diagnostics often cause harm.",
      },
    ],
    relatedConditions: ["харчова алергія", "атопічний дерматит", "діти"],
    bodyUk: bodyParagraphs([
      "Батьки часто приходять виснажені місяцями пошуків у Google. Цей гайд допоможе структурувати спостереження до візиту.",
      "Пам'ятайте: алергія у дитини потребує очної оцінки, особливо при першому зверненні.",
    ]),
    bodyEn: bodyParagraphs([
      "Parents often arrive exhausted after months of Googling. This guide helps structure observations before the visit.",
      "Remember: allergy in a child requires in-person assessment, especially at the first visit.",
    ]),
  },
  {
    _id: "seed-article-1",
    _type: "article",
    title: "EAACI 2024: огляд нових рекомендацій з алергії",
    titleEn: "EAACI 2024: overview of new allergy guidelines",
    slug: { _type: "slug", current: "eaaci-2024-guidelines" },
    excerpt:
      "Короткий огляд ключових змін у підходах до лікування алергічного риніту та астми.",
    excerptEn:
      "Brief overview of key changes in allergic rhinitis and asthma management.",
    imageKey: "article1",
    alt: "Наукові публікації",
    altEn: "Scientific publications",
    publishedAt: "2025-07-01T10:00:00.000Z",
    readingTimeMinutes: 15,
    featured: true,
    journal: "EAACI Position Paper / Clinical Reviews",
    authors: ["L. Nesterovska", "EAACI Working Group"],
    doi: "10.1000/demo.eaaci2024",
    abstract:
      "Огляд оновлених рекомендацій EAACI щодо алергічного риніту та легкої астми з акцентом на доказову терапію та step-up/step-down підходи.",
    abstractEn:
      "Review of updated EAACI recommendations on allergic rhinitis and mild asthma, focusing on evidence-based therapy and step-up/step-down approaches.",
    keywords: ["EAACI", "риніт", "астма", "guidelines"],
    clinicalRelevance:
      "Допомагає узгодити локальну практику з міжнародними протоколами та пояснити пацієнтам логіку зміни терапії.",
    clinicalRelevanceEn:
      "Helps align local practice with international protocols and explain therapy changes to patients.",
    bodyUk: bodyParagraphs([
      "У 2024 році EAACI акцентувала увагу на комorbidity алергії та астми, а також на важливості adherence до базової терапії.",
      "Для практикуючих лікарів ключове — не лише «що нового», а як це застосувати до конкретного пацієнта.",
    ]),
    bodyEn: bodyParagraphs([
      "In 2024 EAACI emphasized allergy-asthma comorbidity and the importance of adherence to baseline therapy.",
      "For practicing physicians the key is not only «what's new» but how to apply it to a specific patient.",
    ]),
  },
  {
    _id: "seed-article-2",
    _type: "article",
    title: "Біологічна терапія при тяжкій астмі: практичний огляд",
    titleEn: "Biologic therapy in severe asthma: a practical review",
    slug: { _type: "slug", current: "biologics-severe-asthma" },
    excerpt: "Коли розглядати біологіки, як обрати препарат і що моніторити.",
    excerptEn: "When to consider biologics, how to choose, and what to monitor.",
    imageKey: "article2",
    alt: "Стетоскоп — символ клінічної практики",
    altEn: "Stethoscope — symbol of clinical practice",
    publishedAt: "2025-06-10T10:00:00.000Z",
    readingTimeMinutes: 20,
    featured: false,
    journal: "Journal of Clinical Immunology (demo)",
    authors: ["L. Nesterovska"],
    keywords: ["біологіки", "астма", "тип 2 inflammation"],
    clinicalRelevance:
      "Пацієнти з неконтрольованою астмою часто приходять після багатьох курсів системних стероїдів — важливо знати критерії направлення.",
    clinicalRelevanceEn:
      "Patients with uncontrolled asthma often arrive after many systemic steroid courses — referral criteria matter.",
    bodyUk: bodyParagraphs([
      "Біологічна терапія змінила підхід до важкої астми, але не замінює базову терапію та роботу з adherence.",
      "Огляд фокусується на phenotyping та практичних кроках до призначення.",
    ]),
    bodyEn: bodyParagraphs([
      "Biologic therapy changed severe asthma management but does not replace baseline therapy and adherence work.",
      "This review focuses on phenotyping and practical steps toward prescription.",
    ]),
  },
  {
    _id: "seed-conference-1",
    _type: "conference",
    title: "EAACI Congress 2025 — доповідь про алергопроби",
    titleEn: "EAACI Congress 2025 — talk on allergy testing",
    slug: { _type: "slug", current: "eaaci-congress-2025" },
    excerpt:
      "Матеріали доповіді про інтерпретацію шкірних проб та поєднання з лабораторними тестами.",
    excerptEn:
      "Talk materials on skin test interpretation combined with laboratory testing.",
    imageKey: "conference1",
    alt: "Конференц-зал",
    altEn: "Conference hall",
    publishedAt: "2025-05-18T10:00:00.000Z",
    readingTimeMinutes: 6,
    featured: true,
    eventDate: "2025-05-15T09:00:00.000Z",
    location: "Франкфурт, Німеччина / офлайн",
    locationEn: "Frankfurt, Germany / in person",
    organizer: "EAACI",
    role: "speaker",
    presentationTitle: "Шкірні проби в 2025: практика та помилки",
    presentationTitleEn: "Skin prick tests in 2025: practice and pitfalls",
    presentationTopics: [
      "інтерпретація результатів",
      "комбінація з sIgE",
      "безпека проведення",
    ],
    bodyUk: bodyParagraphs([
      "На конгресі обговорили типові помилки інтерпретації шкірних проб у дітей та дорослих.",
      "Презентація доступна для колег — звертайтеся через контакти на сайті.",
    ]),
    bodyEn: bodyParagraphs([
      "At the congress we discussed common misinterpretations of skin tests in children and adults.",
      "Slides available for colleagues — contact via website.",
    ]),
  },
  {
    _id: "seed-conference-2",
    _type: "conference",
    title: "Український конгрес алергологів 2024",
    titleEn: "Ukrainian Congress of Allergists 2024",
    slug: { _type: "slug", current: "uk-allergy-congress-2024" },
    excerpt:
      "Участь у секції з клінічної імунології та обмін досвідом з колегами.",
    excerptEn:
      "Participation in the clinical immunology section and exchange with colleagues.",
    imageKey: "conference2",
    alt: "Доповідь на конференції",
    altEn: "Conference presentation",
    publishedAt: "2024-11-22T10:00:00.000Z",
    readingTimeMinutes: 5,
    featured: false,
    eventDate: "2024-11-20T10:00:00.000Z",
    location: "Київ, Україна",
    locationEn: "Kyiv, Ukraine",
    organizer: "Асоціація алергологів України",
    role: "participant",
    presentationTopics: ["імунодефіцити", "алергія у дітей", "доказова медицина"],
    bodyUk: bodyParagraphs([
      "Конгрес став платформою для обговорення викликів воєнного часу в алергологічній практиці.",
      "Окремо обговорювали доступність обстежень та онлайн-консультацій для пацієнтів з різних регіонів.",
    ]),
    bodyEn: bodyParagraphs([
      "The congress was a platform to discuss wartime challenges in allergology practice.",
      "We also discussed test availability and online consultations for patients from different regions.",
    ]),
  },
];

async function seedOne(doc) {
  const { imageKey, alt, altEn, bodyUk, bodyEn, ...rest } = doc;
  console.log(`  → ${doc.title}`);
  const coverImage = await coverFromUrl(IMAGES[imageKey], alt, altEn);
  await client.createOrReplace({ ...rest, coverImage, body: bodyUk, bodyEn: bodyEn });
}

async function main() {
  console.log(`Seeding ${SEED.length} documents to ${projectId}/${dataset}...\n`);
  for (const doc of SEED) await seedOne(doc);
  console.log("\nDone! Visit:");
  console.log("  http://localhost:3000/lectures");
  console.log("  http://localhost:3000/guides");
  console.log("  http://localhost:3000/articles");
  console.log("  http://localhost:3000/conferences");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
