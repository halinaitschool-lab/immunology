/** Escape text for use inside double-quoted HTML attributes. */
function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

/** Add data-uk / data-en on an element opening tag (before closing `>`). */
function attr(key: string, uk: string, en: string): string {
  return ` data-i18n="${key}" data-uk="${esc(uk)}" data-en="${esc(en)}"`;
}

type ReplaceRule = [find: string, key: string, uk: string, en: string];

const RULES: ReplaceRule[] = [
  [
    "<title>Ліля Нестеровська — Алергологія & Імунологія</title>",
    "page.title",
    "Ліля Нестеровська — Алергологія & Імунологія",
    "Lilya Nesterovska — Allergy & Immunology",
  ],

  // ── Hero ──
  [
    '<div class="hero-badge">\n      <i class="fa-solid fa-circle-dot"></i>\n      Алергологія · Імунологія · Діти та дорослі\n    </div>',
    "hero.badge",
    '<i class="fa-solid fa-circle-dot"></i>\n      Алергологія · Імунологія · Діти та дорослі',
    '<i class="fa-solid fa-circle-dot"></i>\n      Allergy · Immunology · Children & adults',
  ],
  [
    '<h1 class="hero-title">\n      Коли ніхто<br>не може <em>пояснити</em>,<br>що відбувається\n    </h1>',
    "hero.title",
    "Коли ніхто<br>не може <em>пояснити</em>,<br>що відбувається",
    "When no one<br>can <em>explain</em><br>what is happening",
  ],
  [
    `<p class="hero-sub">
      Консультації з алергології та імунології. Точна діагностика, зрозумілі пояснення та індивідуальний план — без обіцянок неможливого.
    </p>`,
    "hero.sub",
    "Консультації з алергології та імунології. Точна діагностика, зрозумілі пояснення та індивідуальний план — без обіцянок неможливого.",
    "Allergy and immunology consultations. Accurate diagnosis, clear explanations, and an individual plan — without impossible promises.",
  ],
  [
    `<a href="#cta" class="btn-primary">
        <i class="fa-solid fa-calendar-check"></i>
        Запис на консультацію
      </a>`,
    "hero.cta.book",
    '<i class="fa-solid fa-calendar-check"></i>\n        Запис на консультацію',
    '<i class="fa-solid fa-calendar-check"></i>\n        Book consultation',
  ],
  [
    `<a href="#solution" class="btn-ghost">
        <i class="fa-solid fa-arrow-down"></i>
        Як це працює
      </a>`,
    "hero.cta.how",
    '<i class="fa-solid fa-arrow-down"></i>\n        Як це працює',
    '<i class="fa-solid fa-arrow-down"></i>\n        How it works',
  ],
  [
    `<div class="floating-pill fp1">
        <span class="fp-dot dot-green"></span>
        Онлайн / офлайн
      </div>`,
    "hero.pill.online",
    '<span class="fp-dot dot-green"></span>\n        Онлайн / офлайн',
    '<span class="fp-dot dot-green"></span>\n        Online / in-person',
  ],
  [
    `<div class="floating-pill fp2">
        <i class="fa-solid fa-shield-halved" style="color:var(--amber);font-size:0.75rem;"></i>
        Доказова медицина
      </div>`,
    "hero.pill.evidence",
    '<i class="fa-solid fa-shield-halved" style="color:var(--amber);font-size:0.75rem;"></i>\n        Доказова медицина',
    '<i class="fa-solid fa-shield-halved" style="color:var(--amber);font-size:0.75rem;"></i>\n        Evidence-based medicine',
  ],
  [
    `<div class="floating-pill fp3">
        <span class="fp-dot dot-amber"></span>
        Діти від 0 р.
      </div>`,
    "hero.pill.kids",
    '<span class="fp-dot dot-amber"></span>\n        Діти від 0 р.',
    '<span class="fp-dot dot-amber"></span>\n        Children from birth',
  ],
  [
    "<div class=\"doctor-name\">Ліля Нестеровська</div>",
    "hero.doctor.name",
    "Ліля Нестеровська",
    "Lilya Nesterovska",
  ],
  [
    "<div class=\"doctor-spec\">Лікар алерголог-імунолог · MD</div>",
    "hero.doctor.spec",
    "Лікар алерголог-імунолог · MD",
    "Allergist-immunologist · MD",
  ],
  [
    "Спеціалізується на складних, невирішених випадках — коли попередні консультації не дали відповіді на питання.",
    "hero.doctor.note",
    "Спеціалізується на складних, невирішених випадках — коли попередні консультації не дали відповіді на питання.",
    "Specializes in complex, unresolved cases — when previous consultations did not answer your questions.",
  ],
  [
    '<span class="stat-lbl">Років досвіду</span>',
    "hero.stat.years",
    "Років досвіду",
    "Years of experience",
  ],
  [
    '<span class="stat-lbl">Пацієнтів</span>',
    "hero.stat.patients",
    "Пацієнтів",
    "Patients",
  ],
  [
    '<span class="stat-lbl">Формати</span>',
    "hero.stat.formats",
    "Формати",
    "Formats",
  ],

  // ── Problem ──
  ['<span class="section-label">Ваша ситуація</span>', "problem.label", "Ваша ситуація", "Your situation"],
  [
    '<h2 class="section-title">Чи впізнаєте себе <em>тут?</em></h2>',
    "problem.title",
    "Чи впізнаєте себе <em>тут?</em>",
    "Do you recognize yourself <em>here?</em>",
  ],
  [
    '<p class="section-sub">Часто до мене приходять люди, які вже були у кількох спеціалістів і все ще говорять:</p>',
    "problem.sub",
    "Часто до мене приходять люди, які вже були у кількох спеціалістів і все ще говорять:",
    "People often come to me after seeing several specialists and still say:",
  ],
  ["<h3>«Ніхто не знає, що зі мною»</h3>", "problem.c1.title", "«Ніхто не знає, що зі мною»", "“No one knows what is wrong with me”"],
  [
    "<p>Ви вже були у кількох спеціалістів, але симптоми залишаються без пояснення. Відчуття невизначеності виснажує.</p>",
    "problem.c1.text",
    "Ви вже були у кількох спеціалістів, але симптоми залишаються без пояснення. Відчуття невизначеності виснажує.",
    "You have seen several doctors, but symptoms remain unexplained. The uncertainty is exhausting.",
  ],
  ["<h3>Лікування не допомагає</h3>", "problem.c2.title", "Лікування не допомагає", "Treatment does not help"],
  [
    "<p>Призначили ліки — але стан не покращується або покращується тимчасово. Схема лікування потребує перегляду.</p>",
    "problem.c2.text",
    "Призначили ліки — але стан не покращується або покращується тимчасово. Схема лікування потребує перегляду.",
    "You were prescribed medication, but there is no lasting improvement. Your treatment plan may need revision.",
  ],
  ["<h3>Занадто багато інформації</h3>", "problem.c3.title", "Занадто багато інформації", "Too much information"],
  [
    "<p>Інтернет, форуми, знайомі — всі дають поради. Але вони лише посилюють тривогу, а не дають ясності.</p>",
    "problem.c3.text",
    "Інтернет, форуми, знайомі — всі дають поради. Але вони лише посилюють тривогу, а не дають ясності.",
    "The internet, forums, and friends all give advice — but it increases anxiety instead of clarity.",
  ],
  ["<h3>Хвора дитина — страх батьків</h3>", "problem.c4.title", "Хвора дитина — страх батьків", "A sick child — parents' fear"],
  [
    "<p>Часті алергії, висипання, інфекції у дитини — і ви не розумієте причину. Потрібен спеціаліст, якому можна довіряти.</p>",
    "problem.c4.text",
    "Часті алергії, висипання, інфекції у дитини — і ви не розумієте причину. Потрібен спеціаліст, якому можна довіряти.",
    "Frequent allergies, rashes, or infections in your child — and you do not understand why. You need a specialist you can trust.",
  ],
  [
    "<p>«Іноді пацієнту потрібні не лише ліки, а <em>розуміння</em> — що відбувається, чому і що робити далі.»</p>",
    "problem.quote",
    "«Іноді пацієнту потрібні не лише ліки, а <em>розуміння</em> — що відбувається, чому і що робити далі.»",
    "“Sometimes a patient needs not only medication, but <em>understanding</em> — what is happening, why, and what to do next.”",
  ],

  // ── Credibility ──
  ['<span class="section-label">Чому мені довіряють</span>', "cred.label", "Чому мені довіряють", "Why patients trust me"],
  [
    '<h2 class="section-title">Підхід, що <em>працює</em></h2>',
    "cred.title",
    "Підхід, що <em>працює</em>",
    "An approach that <em>works</em>",
  ],
  [
    "Я не обіцяю неможливого — але гарантую системний, доказовий підхід та повагу до вашого часу.",
    "cred.sub",
    "Я не обіцяю неможливого — але гарантую системний, доказовий підхід та повагу до вашого часу.",
    "I do not promise the impossible — but I guarantee a systematic, evidence-based approach and respect for your time.",
  ],
  ['<span class="badge"><i class="fa-solid fa-graduation-cap"></i> Медична освіта</span>', "cred.b1", '<i class="fa-solid fa-graduation-cap"></i> Медична освіта', '<i class="fa-solid fa-graduation-cap"></i> Medical education'],
  ['<span class="badge"><i class="fa-solid fa-certificate"></i> Сертифікований спеціаліст</span>', "cred.b2", '<i class="fa-solid fa-certificate"></i> Сертифікований спеціаліст', '<i class="fa-solid fa-certificate"></i> Certified specialist'],
  ['<span class="badge"><i class="fa-solid fa-flask"></i> Доказова медицина</span>', "cred.b3", '<i class="fa-solid fa-flask"></i> Доказова медицина', '<i class="fa-solid fa-flask"></i> Evidence-based medicine'],
  ['<span class="badge"><i class="fa-solid fa-language"></i> Українська / English</span>', "cred.b4", '<i class="fa-solid fa-language"></i> Українська / English', '<i class="fa-solid fa-language"></i> Ukrainian / English'],
  ['<span class="badge"><i class="fa-solid fa-video"></i> Онлайн-консультації</span>', "cred.b5", '<i class="fa-solid fa-video"></i> Онлайн-консультації', '<i class="fa-solid fa-video"></i> Online consultations'],
  [
    "<h4>Спеціалізація: алергологія та клінічна імунологія</h4>",
    "cred.tl1.title",
    "Спеціалізація: алергологія та клінічна імунологія",
    "Specialization: allergy and clinical immunology",
  ],
  [
    "<p>Діти та дорослі. Від алергічного риніту до первинних імунодефіцитів.</p>",
    "cred.tl1.text",
    "Діти та дорослі. Від алергічного риніту до первинних імунодефіцитів.",
    "Children and adults. From allergic rhinitis to primary immunodeficiencies.",
  ],
  [
    "<h4>Постійне навчання та оновлення знань</h4>",
    "cred.tl2.title",
    "Постійне навчання та оновлення знань",
    "Continuous learning and up-to-date knowledge",
  ],
  [
    "<p>Слідкую за міжнародними протоколами та клінічними настановами EAACI, WAO.</p>",
    "cred.tl2.text",
    "Слідкую за міжнародними протоколами та клінічними настановами EAACI, WAO.",
    "I follow international protocols and clinical guidelines from EAACI and WAO.",
  ],
  ["<h4>Прозора комунікація</h4>", "cred.tl3.title", "Прозора комунікація", "Transparent communication"],
  [
    "<p>Кожен пацієнт отримує зрозуміле пояснення — без медичного жаргону та зайвої складності.</p>",
    "cred.tl3.text",
    "Кожен пацієнт отримує зрозуміле пояснення — без медичного жаргону та зайвої складності.",
    "Every patient receives a clear explanation — without jargon or unnecessary complexity.",
  ],
  ["<h4>Чесна позиція</h4>", "cred.tl4.title", "Чесна позиція", "An honest position"],
  [
    "<p>Якщо ваш випадок потребує іншого спеціаліста — я скажу про це прямо.</p>",
    "cred.tl4.text",
    "Якщо ваш випадок потребує іншого спеціаліста — я скажу про це прямо.",
    "If your case requires another specialist, I will tell you directly.",
  ],

  // ── Solution ──
  ['<span class="section-label reveal">Як проходить консультація</span>', "sol.label", "Як проходить консультація", "How a consultation works"],
  [
    '<h2 class="section-title reveal reveal-d1">Від симптомів до <em>ясності</em></h2>',
    "sol.title",
    "Від симптомів до <em>ясності</em>",
    "From symptoms to <em>clarity</em>",
  ],
  [
    "Кожен крок побудований так, щоб ви вийшли з консультації з чітким розумінням свого стану.",
    "sol.sub",
    "Кожен крок побудований так, щоб ви вийшли з консультації з чітким розумінням свого стану.",
    "Each step is designed so you leave the consultation with a clear understanding of your condition.",
  ],
  ["<div class=\"rm-title\">Анамнез</div>", "sol.s1", "Анамнез", "Medical history"],
  [
    "<div class=\"rm-desc\">Детальна розмова про симптоми, тригери та попереднє лікування. Без поспіху.</div>",
    "sol.s1d",
    "Детальна розмова про симптоми, тригери та попереднє лікування. Без поспіху.",
    "A detailed discussion of symptoms, triggers, and previous treatment. Without rushing.",
  ],
  ["<div class=\"rm-title\">Оцінка стану</div>", "sol.s2", "Оцінка стану", "Assessment"],
  [
    "<div class=\"rm-desc\">Аналіз симптомів, фізикальний огляд, оцінка попередніх обстежень.</div>",
    "sol.s2d",
    "Аналіз симптомів, фізикальний огляд, оцінка попередніх обстежень.",
    "Analysis of symptoms, physical examination, and review of prior tests.",
  ],
  ["<div class=\"rm-title\">Діагностика</div>", "sol.s3", "Діагностика", "Diagnostics"],
  [
    "<div class=\"rm-desc\">За потреби — алергопроби, дихальні тести, лабораторні обстеження.</div>",
    "sol.s3d",
    "За потреби — алергопроби, дихальні тести, лабораторні обстеження.",
    "If needed — allergy tests, lung function tests, and laboratory work.",
  ],
  ["<div class=\"rm-title\">Ваш план</div>", "sol.s4", "Ваш план", "Your plan"],
  [
    "<div class=\"rm-desc\">Зрозумілий діагноз, рекомендації щодо способу життя та чіткі наступні кроки.</div>",
    "sol.s4d",
    "Зрозумілий діагноз, рекомендації щодо способу життя та чіткі наступні кроки.",
    "A clear diagnosis, lifestyle recommendations, and concrete next steps.",
  ],
  [
    '<div class="understand-header-label">Результат консультації</div>',
    "sol.under.label",
    "Результат консультації",
    "Consultation outcome",
  ],
  [
    '<div class="understand-header-title">Що ви зрозумієте після консультації</div>',
    "sol.under.title",
    "Що ви зрозумієте після консультації",
    "What you will understand after the consultation",
  ],
  [
    "<p><strong>Що саме</strong> відбувається з вашим станом зараз</p>",
    "sol.u1",
    "<strong>Що саме</strong> відбувається з вашим станом зараз",
    "<strong>What exactly</strong> is happening with your condition now",
  ],
  [
    "<p><strong>Чому це виникло</strong> і які фактори підтримують стан</p>",
    "sol.u2",
    "<strong>Чому це виникло</strong> і які фактори підтримують стан",
    "<strong>Why it started</strong> and which factors keep it going",
  ],
  [
    "<p><strong>Як з цим жити</strong> щодня без постійної тривоги</p>",
    "sol.u3",
    "<strong>Як з цим жити</strong> щодня без постійної тривоги",
    "<strong>How to live with it</strong> day to day without constant anxiety",
  ],
  [
    "<p><strong>Що робити далі</strong> — чіткі кроки та пріоритети</p>",
    "sol.u4",
    "<strong>Що робити далі</strong> — чіткі кроки та пріоритети",
    "<strong>What to do next</strong> — clear steps and priorities",
  ],

  // ── About ──
  [
    "<p>«Легше не стало, але я розумію свою хворобу» — іноді це найважливіше, що може дати лікар.</p>",
    "about.tag",
    "«Легше не стало, але я розумію свою хворобу» — іноді це найважливіше, що може дати лікар.",
    "“I do not feel better yet, but I understand my illness” — sometimes that is the most important thing a doctor can offer.",
  ],
  ['<span class="section-label reveal">Про мене</span>', "about.label", "Про мене", "About me"],
  [
    '<h2 class="section-title reveal reveal-d1">Ліля <em>Нестеровська</em></h2>',
    "about.title",
    "Ліля <em>Нестеровська</em>",
    "Lilya <em>Nesterovska</em>",
  ],
  [
    "Лікар алерголог-імунолог для дітей і дорослих. Моя робота — не просто призначити ліки, а допомогти вам зрозуміти свій стан і побудувати стратегію.",
    "about.sub",
    "Лікар алерголог-імунолог для дітей і дорослих. Моя робота — не просто призначити ліки, а допомогти вам зрозуміти свій стан і побудувати стратегію.",
    "Allergist-immunologist for children and adults. My work is not just to prescribe medication, but to help you understand your condition and build a strategy.",
  ],
  ["<h4>Уважність до кожного пацієнта</h4>", "about.v1t", "Уважність до кожного пацієнта", "Attention to every patient"],
  [
    "<p>Кожна консультація — це не конвеєр, а індивідуальна розмова.</p>",
    "about.v1p",
    "Кожна консультація — це не конвеєр, а індивідуальна розмова.",
    "Each consultation is not a conveyor belt, but an individual conversation.",
  ],
  ["<h4>Доказовий підхід</h4>", "about.v2t", "Доказовий підхід", "Evidence-based approach"],
  [
    "<p>Тільки методи з підтвердженою ефективністю. Без псевдонауки.</p>",
    "about.v2p",
    "Тільки методи з підтвердженою ефективністю. Без псевдонауки.",
    "Only methods with proven effectiveness. No pseudoscience.",
  ],
  ["<h4>Пояснення зрозумілою мовою</h4>", "about.v3t", "Пояснення зрозумілою мовою", "Explanations in plain language"],
  [
    "<p>Ваш діагноз — це не таємниця. Ви маєте право розуміти свій стан.</p>",
    "about.v3p",
    "Ваш діагноз — це не таємниця. Ви маєте право розуміти свій стан.",
    "Your diagnosis is not a secret. You have the right to understand your condition.",
  ],
  ["<h4>Лікування, що підходить саме вам</h4>", "about.v4t", "Лікування, що підходить саме вам", "Treatment tailored to you"],
  [
    "<p>Не стандартний протокол «для всіх», а план під вашу ситуацію.</p>",
    "about.v4p",
    "Не стандартний протокол «для всіх», а план під вашу ситуацію.",
    "Not a one-size-fits-all protocol, but a plan for your situation.",
  ],

  // ── For whom ──
  [
    '<span class="section-label reveal">Для кого ця консультація</span>',
    "forwhom.label",
    "Для кого ця консультація",
    "Who this consultation is for",
  ],
  [
    '<h2 class="section-title reveal reveal-d1">Чесно про <em>очікування</em></h2>',
    "forwhom.title",
    "Чесно про <em>очікування</em>",
    "Honestly about <em>expectations</em>",
  ],
  [
    '<p class="section-sub reveal reveal-d2" style="margin:0.8rem auto 0;text-align:center">Коли варто звернутися</p>',
    "forwhom.when",
    "Коли варто звернутися",
    "When to seek help",
  ],
  ["<h3>Вам підійде, якщо...</h3>", "forwhom.yes.title", "Вам підійде, якщо...", "This is for you if..."],
  [
    "<li><i class=\"fa-solid fa-circle-dot\"></i>Є часті алергічні реакції або висипання</li>",
    "forwhom.yes.1",
    '<i class="fa-solid fa-circle-dot"></i>Є часті алергічні реакції або висипання',
    '<i class="fa-solid fa-circle-dot"></i>You have frequent allergic reactions or rashes',
  ],
  [
    "<li><i class=\"fa-solid fa-circle-dot\"></i>Хронічний нежить або кашель без зрозумілої причини</li>",
    "forwhom.yes.2",
    '<i class="fa-solid fa-circle-dot"></i>Хронічний нежить або кашель без зрозумілої причини',
    '<i class="fa-solid fa-circle-dot"></i>Chronic runny nose or cough without a clear cause',
  ],
  [
    "<li><i class=\"fa-solid fa-circle-dot\"></i>Підозра на астму або діагноз без чіткого плану</li>",
    "forwhom.yes.3",
    '<i class="fa-solid fa-circle-dot"></i>Підозра на астму або діагноз без чіткого плану',
    '<i class="fa-solid fa-circle-dot"></i>Suspected asthma or a diagnosis without a clear plan',
  ],
  [
    "<li><i class=\"fa-solid fa-circle-dot\"></i>Часті інфекції або ослаблений імунітет</li>",
    "forwhom.yes.4",
    '<i class="fa-solid fa-circle-dot"></i>Часті інфекції або ослаблений імунітет',
    '<i class="fa-solid fa-circle-dot"></i>Frequent infections or weakened immunity',
  ],
  [
    "<li><i class=\"fa-solid fa-circle-dot\"></i>Хочете другу думку щодо свого діагнозу</li>",
    "forwhom.yes.5",
    '<i class="fa-solid fa-circle-dot"></i>Хочете другу думку щодо свого діагнозу',
    '<i class="fa-solid fa-circle-dot"></i>You want a second opinion on your diagnosis',
  ],
  [
    "<li><i class=\"fa-solid fa-circle-dot\"></i>Ваша дитина має алергію або імунні проблеми</li>",
    "forwhom.yes.6",
    '<i class="fa-solid fa-circle-dot"></i>Ваша дитина має алергію або імунні проблеми',
    '<i class="fa-solid fa-circle-dot"></i>Your child has allergy or immune problems',
  ],
  ["<h3>Не підійде, якщо...</h3>", "forwhom.no.title", "Не підійде, якщо...", "This is not for you if..."],
  [
    "<li><i class=\"fa-solid fa-circle-xmark\"></i>Шукаєте «магічні» ліки без діагностики</li>",
    "forwhom.no.1",
    '<i class="fa-solid fa-circle-xmark"></i>Шукаєте «магічні» ліки без діагностики',
    '<i class="fa-solid fa-circle-xmark"></i>You are looking for a “magic” cure without diagnosis',
  ],
  [
    "<li><i class=\"fa-solid fa-circle-xmark\"></i>Хочете підтвердження вже прийнятого рішення, а не об'єктивної оцінки</li>",
    "forwhom.no.2",
    '<i class="fa-solid fa-circle-xmark"></i>Хочете підтвердження вже прийнятого рішення, а не об\'єктивної оцінки',
    '<i class="fa-solid fa-circle-xmark"></i>You want confirmation of a decision already made, not an objective assessment',
  ],
  [
    "<li><i class=\"fa-solid fa-circle-xmark\"></i>Очікуєте гарантованого результату за один прийом</li>",
    "forwhom.no.3",
    '<i class="fa-solid fa-circle-xmark"></i>Очікуєте гарантованого результату за один прийом',
    '<i class="fa-solid fa-circle-xmark"></i>You expect a guaranteed result after one visit',
  ],
  [
    "<li><i class=\"fa-solid fa-circle-xmark\"></i>Не готові до чесного, але можливо непростого діагнозу</li>",
    "forwhom.no.4",
    '<i class="fa-solid fa-circle-xmark"></i>Не готові до чесного, але можливо непростого діагнозу',
    '<i class="fa-solid fa-circle-xmark"></i>You are not ready for an honest, possibly difficult diagnosis',
  ],
  [
    "<li><i class=\"fa-solid fa-circle-xmark\"></i>Шукаєте призначень без фізичного огляду (для первинних випадків)</li>",
    "forwhom.no.5",
    '<i class="fa-solid fa-circle-xmark"></i>Шукаєте призначень без фізичного огляду (для первинних випадків)',
    '<i class="fa-solid fa-circle-xmark"></i>You want prescriptions without a physical exam (for first visits)',
  ],

  // ── Reviews ──
  ['<span class="section-label reveal">Що кажуть пацієнти</span>', "reviews.label", "Що кажуть пацієнти", "What patients say"],
  [
    '<h2 class="section-title reveal reveal-d1">Реальні <em>історії</em></h2>',
    "reviews.title",
    "Реальні <em>історії</em>",
    "Real <em>stories</em>",
  ],
  [
    "«Мені вас порадили — і я не пошкодувала. Вперше за роки отримала чітку відповідь на питання, що зі мною.»",
    "reviews.r1",
    "«Мені вас порадили — і я не пошкодувала. Вперше за роки отримала чітку відповідь на питання, що зі мною.»",
    "“I was referred to you — and I am glad. For the first time in years I got a clear answer about what is wrong.”",
  ],
  ['<div class="reviewer-name">Оксана Р.</div>', "reviews.r1n", "Оксана Р.", "Oksana R."],
  ['<div class="reviewer-role">Пацієнтка, 34 роки</div>', "reviews.r1r", "Пацієнтка, 34 роки", "Patient, age 34"],
  [
    "«Легше не стало, але я розумію свою хворобу — і це вже дуже допомагає. Дякую за чесність і уважність.»",
    "reviews.r2",
    "«Легше не стало, але я розумію свою хворобу — і це вже дуже допомагає. Дякую за чесність і уважність.»",
    "“I do not feel better yet, but I understand my illness — and that already helps a lot. Thank you for your honesty and care.”",
  ],
  ['<div class="reviewer-name">Михайло К.</div>', "reviews.r2n", "Михайло К.", "Mykhailo K."],
  ['<div class="reviewer-role">Пацієнт, 41 рік</div>', "reviews.r2r", "Пацієнт, 41 рік", "Patient, age 41"],
  [
    "«Прийшла з дитиною після трьох безрезультатних прийомів. Ліля поставила діагноз і пояснила все — дякую!»",
    "reviews.r3",
    "«Прийшла з дитиною після трьох безрезультатних прийомів. Ліля поставила діагноз і пояснила все — дякую!»",
    "“I came with my child after three unhelpful visits elsewhere. Lilya made a diagnosis and explained everything — thank you!”",
  ],
  ['<div class="reviewer-name">Наталія В.</div>', "reviews.r3n", "Наталія В.", "Natalia V."],
  ['<div class="reviewer-role">Мама пацієнта, 3 роки</div>', "reviews.r3r", "Мама пацієнта, 3 роки", "Patient's mother, child age 3"],
  [
    "«Нарешті лікар, який говорить зрозуміло. Не просто виписала рецепт, а пояснила кожен крок лікування.»",
    "reviews.r4",
    "«Нарешті лікар, який говорить зрозуміло. Не просто виписала рецепт, а пояснила кожен крок лікування.»",
    "“Finally a doctor who speaks clearly. She did not just write a prescription — she explained every step of treatment.”",
  ],
  ['<div class="reviewer-name">Тетяна Л.</div>', "reviews.r4n", "Тетяна Л.", "Tetiana L."],
  ['<div class="reviewer-role">Пацієнтка, 28 років</div>', "reviews.r4r", "Пацієнтка, 28 років", "Patient, age 28"],

  // ── Guarantee ──
  ['<span class="section-label reveal">Моя гарантія</span>', "guar.label", "Моя гарантія", "My commitment"],
  [
    '<h2 class="section-title reveal reveal-d1" style="text-align:center;margin:0 auto 1rem;">Чесно про <em>медицину</em></h2>',
    "guar.title",
    "Чесно про <em>медицину</em>",
    "Honestly about <em>medicine</em>",
  ],
  [
    "У медицині немає гарантій результату. Але є те, що я можу обіцяти завжди.",
    "guar.sub",
    "У медицині немає гарантій результату. Але є те, що я можу обіцяти завжди.",
    "Medicine cannot guarantee outcomes. But there are things I can always promise.",
  ],
  [
    "«Жоден відповідальний лікар не може обіцяти неможливе.<br>Але я гарантую підхід, якому можна довіряти.»",
    "guar.quote",
    "«Жоден відповідальний лікар не може обіцяти неможливе.<br>Але я гарантую підхід, якому можна довіряти.»",
    "“No responsible doctor can promise the impossible.<br>But I guarantee an approach you can trust.”",
  ],
  [
    "<li><i class=\"fa-solid fa-check\"></i>Уважність під час кожної консультації</li>",
    "guar.l1",
    '<i class="fa-solid fa-check"></i>Уважність під час кожної консультації',
    '<i class="fa-solid fa-check"></i>Attention during every consultation',
  ],
  [
    "<li><i class=\"fa-solid fa-check\"></i>Чесна оцінка вашої ситуації</li>",
    "guar.l2",
    '<i class="fa-solid fa-check"></i>Чесна оцінка вашої ситуації',
    '<i class="fa-solid fa-check"></i>An honest assessment of your situation',
  ],
  [
    "<li><i class=\"fa-solid fa-check\"></i>Доказовий підхід до діагностики</li>",
    "guar.l3",
    '<i class="fa-solid fa-check"></i>Доказовий підхід до діагностики',
    '<i class="fa-solid fa-check"></i>Evidence-based diagnostics',
  ],
  [
    "<li><i class=\"fa-solid fa-check\"></i>Пояснення зрозумілою мовою</li>",
    "guar.l4",
    '<i class="fa-solid fa-check"></i>Пояснення зрозумілою мовою',
    '<i class="fa-solid fa-check"></i>Explanations in plain language',
  ],
  [
    "<li><i class=\"fa-solid fa-check\"></i>Лікування, що підходить саме вам</li>",
    "guar.l5",
    '<i class="fa-solid fa-check"></i>Лікування, що підходить саме вам',
    '<i class="fa-solid fa-check"></i>Treatment tailored to you',
  ],
  [
    "<li><i class=\"fa-solid fa-check\"></i>Повага до вашого часу та рішень</li>",
    "guar.l6",
    '<i class="fa-solid fa-check"></i>Повага до вашого часу та рішень',
    '<i class="fa-solid fa-check"></i>Respect for your time and decisions',
  ],

  // ── FAQ ──
  ['<span class="section-label reveal">Часті запитання</span>', "faq.label", "Часті запитання", "FAQ"],
  [
    '<h2 class="section-title reveal reveal-d1">Ваші <em>питання</em></h2>',
    "faq.title",
    "Ваші <em>питання</em>",
    "Your <em>questions</em>",
  ],
  [
    '<div class="faq-q">Чи приймаєте ви дітей?<i class="fa-solid fa-plus"></i></div>',
    "faq.q1",
    'Чи приймаєте ви дітей?<i class="fa-solid fa-plus"></i>',
    'Do you see children?<i class="fa-solid fa-plus"></i>',
  ],
  [
    '<div class="faq-a">Так, я приймаю дітей будь-якого віку — від немовлят до підлітків. Для дітей до 14 років на консультації має бути присутній один із батьків або законний представник.</div>',
    "faq.a1",
    "Так, я приймаю дітей будь-якого віку — від немовлят до підлітків. Для дітей до 14 років на консультації має бути присутній один із батьків або законний представник.",
    "Yes, I see children of all ages — from infants to teenagers. For children under 14, a parent or legal guardian must be present.",
  ],
  [
    '<div class="faq-q">Чи можна отримати консультацію онлайн?<i class="fa-solid fa-plus"></i></div>',
    "faq.q2",
    'Чи можна отримати консультацію онлайн?<i class="fa-solid fa-plus"></i>',
    'Can I have an online consultation?<i class="fa-solid fa-plus"></i>',
  ],
  [
    '<div class="faq-a">Так, я проводжу онлайн-консультації. Це зручний формат для повторних прийомів, обговорення результатів аналізів або якщо ви не маєте можливості приїхати особисто.</div>',
    "faq.a2",
    "Так, я проводжу онлайн-консультації. Це зручний формат для повторних прийомів, обговорення результатів аналізів або якщо ви не маєте можливості приїхати особисто.",
    "Yes, I offer online consultations — convenient for follow-ups, discussing test results, or if you cannot visit in person.",
  ],
  [
    '<div class="faq-q">Як підготуватися до консультації?<i class="fa-solid fa-plus"></i></div>',
    "faq.q3",
    'Як підготуватися до консультації?<i class="fa-solid fa-plus"></i>',
    'How should I prepare for a consultation?<i class="fa-solid fa-plus"></i>',
  ],
  [
    '<div class="faq-a">Після запису ви отримаєте інструкцію: які документи та результати обстежень взяти, як підготуватися та що очікувати. Зазвичай потрібні попередні аналізи, медична картка та список поточних ліків.</div>',
    "faq.a3",
    "Після запису ви отримаєте інструкцію: які документи та результати обстежень взяти, як підготуватися та що очікувати. Зазвичай потрібні попередні аналізи, медична картка та список поточних ліків.",
    "After booking you will receive instructions: which documents and test results to bring, how to prepare, and what to expect. Usually you need prior labs, medical records, and a list of current medications.",
  ],
  [
    '<div class="faq-q">Чому повторна консультація оплачується окремо?<i class="fa-solid fa-plus"></i></div>',
    "faq.q4",
    'Чому повторна консультація оплачується окремо?<i class="fa-solid fa-plus"></i>',
    'Why is a follow-up visit billed separately?<i class="fa-solid fa-plus"></i>',
  ],
  [
    '<div class="faq-a">Повторна консультація — це повноцінна зустріч: я аналізую динаміку стану, коригую план лікування та відповідаю на нові питання. Це окрема робота, яка вимагає часу та уваги.</div>',
    "faq.a4",
    "Повторна консультація — це повноцінна зустріч: я аналізую динаміку стану, коригую план лікування та відповідаю на нові питання. Це окрема робота, яка вимагає часу та уваги.",
    "A follow-up is a full visit: I review your progress, adjust treatment, and answer new questions. It requires dedicated time and attention.",
  ],
  [
    '<div class="faq-q">Які тести ви можете призначити?<i class="fa-solid fa-plus"></i></div>',
    "faq.q5",
    'Які тести ви можете призначити?<i class="fa-solid fa-plus"></i>',
    'Which tests can you order?<i class="fa-solid fa-plus"></i>',
  ],
  [
    '<div class="faq-a">Залежно від вашого стану: шкірні алергопроби, аналіз крові на специфічні IgE, загальний аналіз крові, спірометрія (дихальний тест), імунограма та інші лабораторні обстеження.</div>',
    "faq.a5",
    "Залежно від вашого стану: шкірні алергопроби, аналіз крові на специфічні IgE, загальний аналіз крові, спірометрія (дихальний тест), імунограма та інші лабораторні обстеження.",
    "Depending on your condition: skin allergy tests, specific IgE blood tests, complete blood count, spirometry, immunogram, and other lab work.",
  ],
  [
    '<div class="faq-q">Скільки триває консультація?<i class="fa-solid fa-plus"></i></div>',
    "faq.q6",
    'Скільки триває консультація?<i class="fa-solid fa-plus"></i>',
    'How long is a consultation?<i class="fa-solid fa-plus"></i>',
  ],
  [
    '<div class="faq-a">Первинна консультація зазвичай займає 45–60 хвилин. Цього часу достатньо для детального збору анамнезу, огляду та складання індивідуального плану.</div>',
    "faq.a6",
    "Первинна консультація зазвичай займає 45–60 хвилин. Цього часу достатньо для детального збору анамнезу, огляду та складання індивідуального плану.",
    "An initial consultation usually takes 45–60 minutes — enough time for a detailed history, examination, and individual plan.",
  ],

  // ── CTA ──
  [
    '<span class="section-label reveal">Записатися на консультацію</span>',
    "cta.label",
    "Записатися на консультацію",
    "Book a consultation",
  ],
  [
    '<h2 class="section-title reveal reveal-d1">Зробіть перший <em>крок</em> до ясності</h2>',
    "cta.title",
    "Зробіть перший <em>крок</em> до ясності",
    "Take the first <em>step</em> toward clarity",
  ],
  [
    "Якщо ви шукаєте не просто прийом, а зрозумілу медичну підтримку — буду рада допомогти.",
    "cta.sub",
    "Якщо ви шукаєте не просто прийом, а зрозумілу медичну підтримку — буду рада допомогти.",
    "If you are looking for more than a quick visit — clear medical support — I will be glad to help.",
  ],
  ['<div class="contact-lbl">Telegram</div>', "cta.tg.lbl", "Telegram", "Telegram"],
  ['<div class="contact-lbl">Онлайн або офлайн</div>', "cta.fmt.lbl", "Онлайн або офлайн", "Online or in-person"],
  [
    '<div class="contact-val">Зручний для вас формат</div>',
    "cta.fmt.val",
    "Зручний для вас формат",
    "A format that works for you",
  ],
  ['<div class="contact-lbl">Мови</div>', "cta.lang.lbl", "Мови", "Languages"],
  ['<div class="contact-val">Українська · English</div>', "cta.lang.val", "Українська · English", "Ukrainian · English"],
  [
    `<a href="https://t.me/Lilyanest28" target="_blank" class="btn-cta-big reveal reveal-d4">
        <i class="fa-brands fa-telegram"></i>
        Написати в Telegram
      </a>`,
    "cta.tg.btn",
    '<i class="fa-brands fa-telegram"></i>\n        Написати в Telegram',
    '<i class="fa-brands fa-telegram"></i>\n        Message on Telegram',
  ],
  [
    '<div class="calc-result-val" id="qcVal">Первинна консультація</div>',
    "cta.qc.val",
    "Первинна консультація",
    "Initial consultation",
  ],
  [
    '<div class="calc-result-note" id="qcNote">60 хв · офлайн · з фізикальним оглядом</div>',
    "cta.qc.note",
    "60 хв · офлайн · з фізикальним оглядом",
    "60 min · in-person · with physical examination",
  ],

  // ── Footer ──
  [
    "<p>Лікар алерголог-імунолог для дітей та дорослих. Доказова медицина. Зрозумілі пояснення.</p>",
    "footer.tagline",
    "Лікар алерголог-імунолог для дітей та дорослих. Доказова медицина. Зрозумілі пояснення.",
    "Allergist-immunologist for children and adults. Evidence-based medicine. Clear explanations.",
  ],
  ["<h5>ДЛЯ ПАЦІЄНТІВ</h5>", "footer.col1", "ДЛЯ ПАЦІЄНТІВ", "FOR PATIENTS"],
  ['<a href="#solution">Як я працюю</a>', "footer.a1", "Як я працюю", "How I work"],
  ['<a href="/mini-lectures" data-uk-href="/mini-lectures" data-en-href="/en/mini-lectures">Лекції та навчання</a>', "footer.a2", "Лекції та навчання", "Lectures & learning"],
  ['<a href="/guides" data-uk-href="/guides" data-en-href="/en/guides">Гайди та інструкції</a>', "footer.a3", "Гайди та інструкції", "Guides & instructions"],
  ['<a href="#faq">Питання та відповіді</a>', "footer.a4", "Питання та відповіді", "Questions & answers"],
  ["<h5>КОНТАКТИ</h5>", "footer.col2", "КОНТАКТИ", "CONTACT"],
  ['<a href="#about">Про мене</a>', "footer.a5", "Про мене", "About me"],
  ['<a href="#cta">Записатися</a>', "footer.a6", "Записатися", "Book now"],
  ['<a href="#cred">Для лікарів</a>', "footer.a7", "Для лікарів", "For doctors"],
  [
    "<span>© 2026 Ліля Нестеровська. Алергологія та імунологія.</span>",
    "footer.copy",
    "© 2026 Ліля Нестеровська. Алергологія та імунологія.",
    "© 2026 Lilya Nesterovska. Allergy & immunology.",
  ],
  [
    "<span>Для дітей та дорослих</span>",
    "footer.for",
    "Для дітей та дорослих",
    "For children and adults",
  ],
];

function wrapWithI18n(find: string, key: string, uk: string, en: string): string {
  const a = attr(key, uk, en);
  if (find.startsWith("<") && find.includes(">")) {
    return find.replace(/^<([a-z0-9]+)([^>]*)>/i, `<$1$2${a}>`);
  }
  return `<span${a}>${find}</span>`;
}

export function applyLandingI18n(html: string): string {
  let out = html;
  for (const [find, key, uk, en] of RULES) {
    if (!out.includes(find)) continue;
    const replacement = wrapWithI18n(find, key, uk, en);
    out = out.replace(find, replacement);
  }
  return out;
}

export function buildSetLangScript(
  defaultLang: "uk" | "en" = "uk",
  useSavedPreference = defaultLang === "en",
): string {
  const initLang = useSavedPreference
    ? `let lang = '${defaultLang}';
    try {
      const saved = localStorage.getItem('landing-lang');
      if (saved === 'uk' || saved === 'en') lang = saved;
    } catch (e) {}
    setLang(lang);`
    : `setLang('uk');`;

  return `
  const currentLang = { lang: '${defaultLang}' };
  function setLang(l) {
    currentLang.lang = l;
    try { localStorage.setItem('landing-lang', l); } catch (e) {}
    document.documentElement.lang = l === 'en' ? 'en' : 'uk';
    document.body.classList.toggle('lang-en', l === 'en');
    document.body.classList.toggle('lang-uk', l !== 'en');
    document.querySelectorAll('.lang-btn').forEach((b) =>
      b.classList.toggle('active', b.getAttribute('data-lang') === l),
    );
    document.querySelectorAll('[data-uk]').forEach((el) => {
      const txt = el.getAttribute('data-' + l);
      if (!txt) return;
      if (el.tagName === 'OPTION' || el.tagName === 'TITLE') el.textContent = txt;
      else el.innerHTML = txt;
    });
    document.querySelectorAll('img[data-uk-alt]').forEach((el) => {
      const alt = el.getAttribute('data-' + l + '-alt');
      if (alt) el.setAttribute('alt', alt);
    });
    document.querySelectorAll('[data-uk-href]').forEach((el) => {
      const href = el.getAttribute('data-' + l + '-href');
      if (href) el.setAttribute('href', href);
    });
  }
  document.addEventListener('DOMContentLoaded', () => {
    ${initLang}
  });
`;
}
