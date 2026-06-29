import { applyLandingI18n, buildSetLangScript } from "@/lib/landingI18n";

const HTML_SOURCE_PATH = "/Users/Halyna_Mykolaiv/Downloads/lilya-nesterovska копія.html";

export const LANDING_HTML_PATH = HTML_SOURCE_PATH;

export type PatchLandingOptions = {
  defaultLang?: "uk" | "en";
};

const NAV_HTML = `<!-- NAV -->
<nav class="site-nav">
  <a href="#hero" class="nav-logo">Ліля <span>Нестеровська</span></a>

  <div class="nav-shell" id="navMobilePanel">
    <div class="nav-mobile-head">
      <span data-uk="Меню" data-en="Menu">Меню</span>
      <button type="button" class="nav-mobile-close" aria-label="Закрити">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>

    <div class="nav-mobile-lang">
      <div class="lang-sw lang-sw--menu">
        <button type="button" class="lang-btn active" data-lang="uk" onclick="setLang('uk')">УКР</button>
        <button type="button" class="lang-btn" data-lang="en" onclick="setLang('en')">EN</button>
      </div>
    </div>

    <div class="nav-center">
      <div class="nav-item">
        <button type="button"><span data-uk="Для пацієнтів" data-en="For Patients">Для пацієнтів</span> <i class="fa-solid fa-chevron-down arrow"></i></button>
        <div class="dropdown">
          <div class="dropdown-section" data-uk="МАТЕРІАЛИ" data-en="MATERIALS">МАТЕРІАЛИ</div>
          <a href="/mini-lectures" target="_top" rel="noopener" data-uk-href="/mini-lectures" data-en-href="/en/mini-lectures"><i class="fa-solid fa-book-open"></i><span data-uk="Лекції" data-en="Lectures">Лекції</span></a>
          <a href="/guides" target="_top" rel="noopener" data-uk-href="/guides" data-en-href="/en/guides"><i class="fa-solid fa-file-lines"></i><span data-uk="Гайди" data-en="Guides">Гайди</span></a>
          <hr>
          <div class="dropdown-section" data-uk="КОРИСНЕ" data-en="USEFUL">КОРИСНЕ</div>
          <a href="#solution"><i class="fa-solid fa-route"></i><span data-uk="Як я працюю" data-en="How I Work">Як я працюю</span></a>
          <a href="#reviews"><i class="fa-solid fa-star"></i><span data-uk="Реальні історії" data-en="Real stories">Реальні історії</span></a>
          <a href="#faq"><i class="fa-solid fa-circle-question"></i><span data-uk="Питання та відповіді" data-en="FAQ">Питання та відповіді</span></a>
        </div>
      </div>

      <div class="nav-item">
        <button type="button"><span data-uk="Для лікарів" data-en="For Doctors">Для лікарів</span> <i class="fa-solid fa-chevron-down arrow"></i></button>
        <div class="dropdown">
          <div class="dropdown-section" data-uk="ПУБЛІКАЦІЇ" data-en="PUBLICATIONS">ПУБЛІКАЦІЇ</div>
          <a href="#cred"><i class="fa-solid fa-microscope"></i><span data-uk="Наукові статті" data-en="Research Articles">Наукові статті</span></a>
          <a href="#cred"><i class="fa-solid fa-graduation-cap"></i><span data-uk="Конференції" data-en="Conferences">Конференції</span></a>
        </div>
      </div>

      <div class="nav-item"><a href="#about"><span data-uk="Про мене" data-en="About">Про мене</span></a></div>
      <div class="nav-item"><a href="#cta"><span data-uk="Контакти" data-en="Contact">Контакти</span></a></div>
    </div>
  </div>

  <div class="nav-actions">
    <div class="lang-sw lang-sw--bar">
      <button type="button" class="lang-btn active" data-lang="uk" onclick="setLang('uk')">УКР</button>
      <button type="button" class="lang-btn" data-lang="en" onclick="setLang('en')">EN</button>
    </div>
    <a href="https://t.me/Lilyanest28" target="_blank" rel="noopener noreferrer" class="btn-nav-tg icon-only" aria-label="Telegram">
      <i class="fa-brands fa-telegram"></i>
      <span data-uk="Telegram" data-en="Telegram">Telegram</span>
    </a>
    <a href="#cta" class="btn-nav-book">
      <i class="fa-solid fa-calendar-check"></i>
      <span data-uk="Запис на консультацію" data-en="Book consultation">Запис на консультацію</span>
    </a>
    <button type="button" class="nav-hamburger" aria-label="Меню" aria-expanded="false" aria-controls="navMobilePanel">
      <span class="nav-hamburger-line"></span>
      <span class="nav-hamburger-line"></span>
      <span class="nav-hamburger-line"></span>
    </button>
  </div>

  <div class="nav-backdrop" aria-hidden="true"></div>
</nav>`;

const PATCH_CSS = `
nav{
  position:fixed;top:0;left:0;right:0;z-index:200;
  display:flex;align-items:center;justify-content:space-between;
  padding:0 4vw;height:64px;
  background:rgba(253,251,247,0.92);
  backdrop-filter:blur(20px);
  border-bottom:1px solid rgba(160,122,255,0.12);
}
.nav-logo{
  font-family:'Playfair Display',serif;
  font-size:1.15rem;font-weight:700;color:var(--lav-700);
  letter-spacing:-0.01em;white-space:nowrap;text-decoration:none;
}
.nav-logo span{color:var(--lav-400)}
.nav-center{display:flex;align-items:center;gap:0.2rem}
.nav-item{position:relative}
.nav-item>a,.nav-item>button{
  background:none;border:none;cursor:pointer;font-family:'DM Sans',sans-serif;
  display:flex;align-items:center;gap:0.3rem;
  padding:0.5rem 0.75rem;border-radius:8px;
  font-size:0.82rem;font-weight:500;color:var(--muted);
  text-decoration:none;transition:all .2s;white-space:nowrap;
}
.nav-item>a:hover,.nav-item>button:hover{background:var(--lav-50);color:var(--lav-700)}
.nav-item>button i.arrow{font-size:0.65rem;transition:transform .2s}
.nav-item:hover>button i.arrow{transform:rotate(180deg)}
.dropdown{
  position:absolute;top:calc(100% + 8px);left:0;
  background:white;border:1px solid var(--lav-200);border-radius:14px;
  padding:0.6rem;min-width:220px;
  box-shadow:0 20px 50px rgba(38,23,51,0.12);
  opacity:0;visibility:hidden;transform:translateY(6px);
  transition:all .2s;z-index:300;
}
.nav-item:hover .dropdown{opacity:1;visibility:visible;transform:translateY(0)}
.dropdown a{
  display:flex;align-items:center;gap:0.7rem;
  padding:0.6rem 0.8rem;border-radius:8px;
  text-decoration:none;font-size:0.82rem;color:var(--muted);transition:all .15s;
}
.dropdown a:hover{background:var(--lav-50);color:var(--lav-700)}
.dropdown a i{width:16px;text-align:center;color:var(--lav-500);font-size:0.8rem}
.dropdown-section{
  font-size:0.68rem;letter-spacing:.08em;text-transform:uppercase;
  color:var(--lav-500);padding:0.5rem 0.8rem 0.2rem;font-weight:500;
}
.dropdown hr{border:none;border-top:1px solid var(--lav-100);margin:0.4rem 0}
.nav-right{display:flex;align-items:center;gap:0.75rem}
.lang-sw{
  display:flex;align-items:center;background:var(--lav-50);
  border:1px solid var(--lav-200);border-radius:50px;padding:3px;
}
.lang-btn{
  padding:0.25rem 0.65rem;border-radius:50px;cursor:pointer;
  background:none;border:none;font-family:'DM Sans',sans-serif;
  font-size:0.75rem;font-weight:500;color:var(--muted);transition:all .2s;
}
.lang-btn.active{background:var(--lav-700);color:#fff}
.btn-nav-tg{
  display:flex;align-items:center;gap:0.4rem;
  background:var(--lav-500);color:#fff;
  padding:0.45rem 1.1rem;border-radius:50px;
  font-size:0.8rem;font-weight:500;text-decoration:none;transition:all .2s;white-space:nowrap;
}
.btn-nav-tg:hover{background:var(--lav-600);transform:translateY(-1px)}
.btn-nav-tg i{font-size:0.85rem}
.btn-nav-tg.icon-only{padding:0;width:38px;height:38px;justify-content:center;border-radius:50%}
.btn-nav-tg.icon-only span{display:none}
.btn-nav-book{
  display:inline-flex;align-items:center;justify-content:center;gap:0.4rem;
  background:var(--lav-500);color:#fff;border:none;
  padding:0.45rem 1.1rem;border-radius:50px;font-size:0.8rem;font-weight:500;
  text-decoration:none;white-space:nowrap;transition:all .2s;font-family:'DM Sans',sans-serif;
  box-shadow:0 6px 18px rgba(128,82,232,0.22);
}
.btn-nav-book:hover{background:var(--lav-600);transform:translateY(-1px)}
.btn-nav-book i{font-size:0.85rem}
.nav-actions{display:flex;align-items:center;gap:0.75rem;flex-shrink:0;min-width:0}
.nav-mobile-lang{display:none;padding:0.85rem 1.1rem;border-bottom:1px solid var(--lav-100)}
.lang-sw--menu{width:100%;justify-content:center}
.nav-hamburger,.nav-backdrop,.nav-mobile-head,.nav-mobile-lang{display:none}
.nav-shell{display:flex;align-items:center;flex:1;min-width:0;margin-left:1rem}
.site-nav.nav-compact{flex-wrap:nowrap;gap:0.5rem}
.site-nav.nav-compact .lang-sw--bar{display:none}
.site-nav.nav-compact .nav-mobile-lang{display:block}
.hero-card{position:relative}
.doctor-photo-wrap .doctor-photo{width:100%;height:100%;object-fit:cover;display:block}
.about-img-wrap .doctor-photo{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0}
.about-tag{z-index:1}
.floating-pill{z-index:2}
.calc-box .calc-title{display:flex;align-items:center;gap:0.4rem}
.calc-box .calc-title i{color:var(--amber-light);flex-shrink:0}
.cta-after-booking ul{list-style:none;display:flex;flex-direction:column;gap:0.55rem;padding:0;margin:0}
.cta-after-booking li{
  display:flex;gap:0.55rem;align-items:flex-start;
  font-size:0.85rem;color:rgba(255,255,255,0.65);
}
.cta-after-booking li::before{
  content:'';width:6px;height:6px;border-radius:50%;
  background:var(--amber-light);margin-top:0.45rem;flex-shrink:0;
}
.cal-embed-wrap{width:100%;margin-top:2.5rem;position:relative;z-index:1}
.cal-embed-wrap .cal-inline-target{
  width:100%;min-height:720px;border-radius:1rem;overflow:auto;
  background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.09);
}
.site-nav.nav-compact .nav-actions{
    display:flex;align-items:center;gap:0.45rem;margin-left:auto;
    flex-direction:row;flex-wrap:nowrap;padding:0;border:none;background:transparent;
  }
.site-nav.nav-compact .btn-nav-book{padding:0.45rem 0.75rem;font-size:0.72rem}
.site-nav.nav-compact .btn-nav-book span{max-width:9.5rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.site-nav.nav-compact .nav-hamburger{
    display:flex;flex-shrink:0;flex-direction:column;justify-content:center;align-items:center;
    gap:5px;width:40px;height:40px;padding:0;border:none;border-radius:50%;
    background:var(--lav-50);border:1px solid var(--lav-200);cursor:pointer;
    transition:background .2s,border-color .2s,transform .2s;
  }
.site-nav.nav-compact .nav-hamburger:hover{background:var(--lav-100);border-color:var(--lav-300)}
.site-nav.nav-compact .nav-hamburger-line{
    display:block;width:18px;height:2px;border-radius:2px;background:var(--lav-700);
    transition:transform .3s ease,opacity .3s ease,width .3s ease;
  }
.site-nav.nav-open .nav-hamburger-line:nth-child(1){transform:translateY(7px) rotate(45deg)}
.site-nav.nav-open .nav-hamburger-line:nth-child(2){opacity:0;width:0}
.site-nav.nav-open .nav-hamburger-line:nth-child(3){transform:translateY(-7px) rotate(-45deg)}
.site-nav.nav-compact .nav-backdrop{
    display:block;position:fixed;inset:64px 0 0;z-index:190;
    background:rgba(38,23,51,0.35);backdrop-filter:blur(4px);
    opacity:0;visibility:hidden;pointer-events:none;
    transition:opacity .35s ease,visibility .35s ease;
  }
.site-nav.nav-open .nav-backdrop{opacity:1;visibility:visible;pointer-events:auto}
.site-nav.nav-compact .nav-shell{
    position:fixed;top:64px;right:0;bottom:0;z-index:210;
    width:min(88vw,340px);margin-left:0;flex:unset;
    flex-direction:column;align-items:stretch;justify-content:flex-start;
    padding:0;background:rgba(253,251,247,0.98);
    border-left:1px solid var(--lav-200);
    box-shadow:-16px 0 48px rgba(38,23,51,0.14);
    transform:translateX(105%);visibility:hidden;
    transition:transform .4s cubic-bezier(.22,1,.36,1),visibility .4s;
    overflow:hidden;
  }
.site-nav.nav-open .nav-shell{transform:translateX(0);visibility:visible}
.site-nav.nav-compact .nav-mobile-head{
    display:flex;align-items:center;justify-content:space-between;
    padding:1rem 1.1rem 0.65rem;border-bottom:1px solid var(--lav-100);
    font-family:'Playfair Display',serif;font-size:1.05rem;font-weight:700;color:var(--lav-700);
  }
.site-nav.nav-compact .nav-mobile-close{
    width:36px;height:36px;border:none;border-radius:50%;cursor:pointer;
    background:var(--lav-50);color:var(--lav-700);font-size:1rem;
    display:flex;align-items:center;justify-content:center;transition:background .2s;
  }
.site-nav.nav-compact .nav-mobile-close:hover{background:var(--lav-100)}
.site-nav.nav-compact .nav-center{
    flex:1;flex-direction:column;align-items:stretch;gap:0.15rem;
    padding:0.75rem 0.85rem 0.5rem;overflow-y:auto;
  }
.site-nav.nav-compact .nav-item{width:100%}
.site-nav.nav-compact .nav-item>a,.site-nav.nav-compact .nav-item>button{
    width:100%;justify-content:space-between;padding:0.75rem 0.85rem;
    font-size:0.9rem;border-radius:10px;
  }
.site-nav.nav-compact .nav-item>button i.arrow{transition:transform .25s ease}
.site-nav.nav-compact .nav-item.open>button i.arrow{transform:rotate(180deg)}
.site-nav.nav-compact .nav-item:hover>button i.arrow{transform:none}
.site-nav.nav-compact .nav-item.open>button i.arrow{transform:rotate(180deg)}
.site-nav.nav-compact .dropdown{
    position:static;opacity:1;visibility:visible;transform:none;
    box-shadow:none;border:none;background:transparent;padding:0 0 0.35rem;
    max-height:0;overflow:hidden;transition:max-height .35s ease;
    pointer-events:none;
  }
.site-nav.nav-compact .nav-item.open .dropdown{max-height:520px;pointer-events:auto}
.site-nav.nav-compact .dropdown a{padding:0.55rem 0.85rem 0.55rem 1.5rem;font-size:0.86rem}
.site-nav.nav-compact .dropdown-section{padding:0.45rem 0.85rem 0.2rem 1.1rem}
@media (max-width:480px){
  .btn-nav-book span{display:none}
  .btn-nav-book{padding:0;width:38px;height:38px;justify-content:center;border-radius:50%}
}
`;

const HERO_ORANGE_PANEL = `  <div class="hero-orange-panel">
    <p data-uk="<strong>Є питання?</strong> Напишіть у Telegram — відповідаю особисто." data-en="<strong>Have a question?</strong> Message on Telegram — I reply personally."><strong>Є питання?</strong> Напишіть у Telegram — відповідаю особисто.</p>
    <a href="https://t.me/Lilyanest28" target="_blank" rel="noopener noreferrer" class="btn-hero-orange">
      <i class="fa-brands fa-telegram"></i>
      <span>@Lilyanest28</span>
    </a>
  </div>`;

/** Injected before </style> so it overrides the exported HTML hero rules. */
const HERO_FIT_CSS = `
/* Hero: one screen + orange panel at bottom */
.hero{
  height:100dvh;height:100vh;
  min-height:100dvh;max-height:100dvh;
  display:grid;
  grid-template-columns:1fr 1fr;
  grid-template-rows:minmax(0,1fr) auto;
  padding:calc(64px + 0.75rem) 4vw 0;
  column-gap:clamp(1.25rem,2.5vw,2rem);
  row-gap:0;
  align-items:stretch;
  overflow:hidden;
  box-sizing:border-box;
}
.hero-text{
  grid-column:1;grid-row:1;
  display:flex;flex-direction:column;justify-content:center;
  min-height:0;
}
.hero-orange-panel{
  grid-column:1/-1;grid-row:2;
  background:var(--amber);
  margin:0 -4vw;
  width:calc(100% + 8vw);
  padding:0.85rem 4vw;
  display:flex;align-items:center;justify-content:space-between;
  gap:1rem;flex-wrap:wrap;
  box-sizing:border-box;
}
.hero-orange-panel p{
  margin:0;
  font-size:clamp(0.82rem,1vw,0.9rem);
  color:rgba(255,255,255,0.88);
  font-weight:300;
  line-height:1.45;
}
.hero-orange-panel p strong{color:#fff;font-weight:600}
.btn-hero-orange{
  display:inline-flex;align-items:center;gap:0.5rem;
  background:rgba(255,255,255,0.15);color:#fff;
  border:1px solid rgba(255,255,255,0.32);
  padding:0.5rem 1.25rem;border-radius:50px;
  font-size:0.82rem;font-weight:500;text-decoration:none;
  white-space:nowrap;transition:background .2s;
  font-family:'DM Sans',sans-serif;
}
.btn-hero-orange:hover{background:rgba(255,255,255,0.25)}
.hero-badge{margin-bottom:0.75rem}
h1.hero-title{
  font-size:clamp(1.9rem,3.5vw,3.1rem);
  margin-bottom:0.75rem;
  line-height:1.08;
}
.hero-sub{
  font-size:clamp(0.88rem,1vw,0.98rem);
  margin-bottom:1rem;
  line-height:1.5;
}
.hero-visual{
  grid-column:2;grid-row:1;
  display:flex!important;
  align-items:stretch;
  justify-content:center;
  min-height:0;
  height:auto;
  align-self:stretch;
  margin-top:3rem;
  margin-bottom:3rem;
}
.hero-card{
  width:100%;
  height:100%;
  max-height:calc(100dvh - 64px - 4.5rem);
  padding:1rem 1.2rem;
  overflow:visible;
  display:flex;
  flex-direction:column;
  box-sizing:border-box;
}
.hero-card-photo-area{
  flex:1 1 auto;
  min-height:0;
  position:relative;
  margin-bottom:0.5rem;
  overflow:visible;
}
.doctor-photo-wrap{
  position:absolute;
  inset:0;
  width:100%;
  height:100%;
  margin:0;
  border-radius:1.15rem;
  overflow:hidden;
}
.doctor-photo-wrap .doctor-photo{
  object-fit:cover;
  object-position:center 15%;
}
.hero-card-footer{
  flex:0 0 auto;
  min-height:0;
  display:flex;
  flex-direction:column;
  gap:1rem;
}
.hero-card .doctor-name{font-size:1.05rem;margin:0;line-height:1.2}
.hero-card .doctor-spec{font-size:0.72rem;margin:0}
.hero-card .hero-card-note{
  margin:0!important;
  display:-webkit-box;
  -webkit-line-clamp:1;
  -webkit-box-orient:vertical;
  overflow:hidden;
}
.hero-card .stat-row{margin:0;gap:0.4rem}
.hero-card .stat-box{padding:0.4rem 0.3rem}
.hero-card .stat-lbl{font-size:0.62rem}
.hero-card-photo-area .floating-pill{font-size:0.7rem;padding:0.4rem 0.8rem;z-index:3}
.hero-card-photo-area .floating-pill.fp1{top:5%;right:-10%;left:auto;bottom:auto}
.hero-card-photo-area .floating-pill.fp2{left:-10%;bottom:15%;top:auto;right:auto}
.hero-card-photo-area .floating-pill.fp3{top:40%;right:-10%;bottom:auto;left:auto}
@media (max-height:820px){
  h1.hero-title{font-size:clamp(1.65rem,3vw,2.4rem);margin-bottom:0.55rem}
  .hero-badge{margin-bottom:0.5rem;font-size:0.72rem}
  .hero-sub{margin-bottom:0.85rem;font-size:0.85rem}
  .hero-card{padding:0.85rem 1rem}
  .hero-card .stat-num{font-size:1.05rem}
}
@media (max-width:900px){
  .hero{
    height:auto;min-height:100dvh;max-height:none;
    grid-template-columns:1fr;
    grid-template-rows:auto auto;
    padding:5.5rem 4vw 0;
    overflow:visible;
    align-items:center;
  }
  .hero-text{grid-column:1;grid-row:1}
  .hero-orange-panel{grid-column:1;grid-row:2;margin:1.5rem -4vw 0}
  .hero-visual{display:none!important}
}
html[lang="en"] .about-section::before{content:'L'}
html[lang="uk"] .about-section::before{content:'Л'}
.hero[id],section[id]{scroll-margin-top:5rem}
html{scroll-behavior:smooth}
`;

const CTA_SIDE_BOX = `    <div class="calc-box reveal reveal-d2">
      <div class="calc-title"><i class="fa-solid fa-wand-magic-sparkles"></i><span data-uk="ВАШ ФОРМАТ" data-en="YOUR FORMAT">ВАШ ФОРМАТ</span></div>
      <div class="calc-result" style="margin-top:0">
        <div class="calc-result-val" id="qcVal">Первинна консультація</div>
        <div class="calc-result-note" id="qcNote">60 хв · офлайн · з фізикальним оглядом</div>
      </div>
      <div class="calc-title" style="margin-top:1.5rem;margin-bottom:0.75rem">
        <i class="fa-solid fa-wand-magic-sparkles"></i>
        <span data-uk="Після запису ви отримаєте інформацію:" data-en="After booking you will receive information about:">Після запису ви отримаєте інформацію:</span>
      </div>
      <div class="cta-after-booking">
        <ul>
          <li data-uk="як підготуватися" data-en="how to prepare">як підготуватися</li>
          <li data-uk="які документи взяти" data-en="which documents to bring">які документи взяти</li>
          <li data-uk="чи потрібна присутність батьків" data-en="whether a parent needs to be present">чи потрібна присутність батьків</li>
          <li data-uk="формат консультації (онлайн або офлайн)" data-en="consultation format (online or in-person)">формат консультації (онлайн або офлайн)</li>
        </ul>
      </div>
    </div>`;

const CAL_SCRIPT = `
<script type="text/javascript">
(function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
Cal("init", "30min", {origin:"https://app.cal.com"});
Cal.ns["30min"]("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
Cal.ns["30min"]("inline", {
  elementOrSelector: "#cal-booking-embed",
  calLink: "halina-it-school-qwzxut/30min",
  config: {"layout":"month_view","useSlotsViewOnSmallScreen":"true"}
});
</script>`;

export function patchLandingHtml(
  inputHtml: string,
  options: PatchLandingOptions = {},
) {
  const defaultLang = options.defaultLang ?? "uk";
  let html = inputHtml;

  html = html.replace(/<nav>[\s\S]*?<\/nav>/, NAV_HTML);
  html = html.replace('<section class="hero">', '<section class="hero" id="hero">');
  html = html.replace("  /* ── NAV ── */", `  /* ── NAV ── */\n${PATCH_CSS}`);

  html = html.replace(
    '<div class="doctor-avatar">Л</div>',
    '<div class="doctor-photo-wrap"><img src="/images/lilya.jpg" alt="Ліля Нестеровська" class="doctor-photo" data-uk-alt="Ліля Нестеровська" data-en-alt="Lilya Nesterovska" /></div>',
  );

  html = html.replace(
    /<div class="hero-card">\s*<div class="floating-pill fp1">/,
    '<div class="hero-card"><div class="hero-card-photo-area"><div class="floating-pill fp1">',
  );

  html = html.replace(
    /(<div class="doctor-photo-wrap">[\s\S]*?<\/div>)\s*(<div class="doctor-name">)/,
    "$1</div><div class=\"hero-card-footer\">$2",
  );

  html = html.replace(
    /(<span class="stat-lbl">Формати<\/span>\s*<\/div>\s*<\/div>)(\s*<\/div>\s*<\/div>\s*\n<\/section>)/,
    "$1</div>$2",
  );

  html = html.replace(
    /<div style="font-size:0\.83rem;color:var\(--muted\);line-height:1\.6;border-top:1px solid #f0ebff;padding-top:1\.2rem;">/,
    '<div class="hero-card-note" style="font-size:0.83rem;color:var(--muted);line-height:1.6;border-top:1px solid #f0ebff;padding-top:1.2rem;">',
  );

  html = html.replace(
    '<div class="about-initials">ЛН</div>',
    '<img src="/images/lilya.jpg" alt="Ліля Нестеровська" class="doctor-photo" data-uk-alt="Ліля Нестеровська" data-en-alt="Lilya Nesterovska" />',
  );

  html = html.replace(/Записатися на консультацію/g, "Запис на консультацію");

  html = html.replace(
    '<h2 class="section-title reveal reveal-d1">Чесно про <em>очікування</em></h2>',
    `<h2 class="section-title reveal reveal-d1">Чесно про <em>очікування</em></h2>
    <p class="section-sub reveal reveal-d2" style="margin:0.8rem auto 0;text-align:center">Коли варто звернутися</p>`,
  );

  const calcStart = html.indexOf("    <!-- QUICK CALC -->");
  const ctaEnd = html.indexOf("</section>", html.indexOf('<section class="cta-section" id="cta">'));
  if (calcStart !== -1 && ctaEnd !== -1) {
    html = html.slice(0, calcStart) + `${CTA_SIDE_BOX}
  </div>
  <div class="cal-embed-wrap reveal">
    <div class="cal-inline-target" id="cal-booking-embed"></div>
  </div>
` + html.slice(ctaEnd);
  }

  html = html.replace(
    "  // Calculator\n  function selectOpt(btn, group) {",
    `${buildSetLangScript(defaultLang, defaultLang === "en")}\n  // Calculator (unused)\n  function selectOpt(btn, group) {`,
  );

  html = html.replace(
    "const navLinks = document.querySelectorAll('.nav-links a');",
    `const navLinks = document.querySelectorAll('.nav-center a, .nav-item > a');
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
  (function initMobileNav() {
    const nav = document.querySelector('.site-nav');
    const toggle = document.querySelector('.nav-hamburger');
    const backdrop = document.querySelector('.nav-backdrop');
    const closeBtn = document.querySelector('.nav-mobile-close');
    const mq = window.matchMedia('(max-width: 900px)');
    const updateNavCompact = () => {
      if (!nav) return;
      nav.classList.remove('nav-compact');
      if (mq.matches) {
        nav.classList.add('nav-compact');
        return;
      }
      if (nav.scrollWidth > nav.clientWidth + 1) nav.classList.add('nav-compact');
    };
    updateNavCompact();
    window.addEventListener('resize', updateNavCompact);
    if (document.fonts?.ready) document.fonts.ready.then(updateNavCompact);
    if (typeof ResizeObserver !== 'undefined' && nav) {
      new ResizeObserver(updateNavCompact).observe(nav);
    }
    const openNav = () => {
      nav?.classList.add('nav-open');
      document.body.style.overflow = 'hidden';
      toggle?.setAttribute('aria-expanded', 'true');
      backdrop?.setAttribute('aria-hidden', 'false');
    };
    const closeNav = () => {
      nav?.classList.remove('nav-open');
      document.body.style.overflow = '';
      toggle?.setAttribute('aria-expanded', 'false');
      backdrop?.setAttribute('aria-hidden', 'true');
      document.querySelectorAll('.nav-item.open').forEach((item) => item.classList.remove('open'));
    };
    toggle?.addEventListener('click', () => {
      if (nav?.classList.contains('nav-open')) closeNav();
      else openNav();
    });
    backdrop?.addEventListener('click', closeNav);
    closeBtn?.addEventListener('click', closeNav);
    document.querySelectorAll('.nav-shell a[href]').forEach((link) => {
      link.addEventListener('click', () => {
        if (nav?.classList.contains('nav-compact')) closeNav();
      });
    });
    document.querySelectorAll('.nav-item > button').forEach((btn) => {
      btn.addEventListener('click', (event) => {
        if (!nav?.classList.contains('nav-compact')) return;
        event.preventDefault();
        const item = btn.closest('.nav-item');
        if (!item) return;
        const wasOpen = item.classList.contains('open');
        document.querySelectorAll('.nav-item.open').forEach((el) => el.classList.remove('open'));
        if (!wasOpen) item.classList.add('open');
      });
    });
    window.addEventListener('resize', () => {
      updateNavCompact();
      if (!nav?.classList.contains('nav-compact')) closeNav();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeNav();
    });
  })();`,
  );

  html = html.replace("</style>", `${HERO_FIT_CSS}\n</style>`);

  html = html.replace(
    /\n<!-- AMBER STRIP -->\s*<div class="amber-strip">[\s\S]*?<\/div>/,
    "",
  );

  html = html.replace(
    /(<!-- HERO -->\s*<section class="hero">[\s\S]*?)(<\/section>)/,
    `$1\n${HERO_ORANGE_PANEL}\n</section>`,
  );

  html = html.replace(
    '<a href="#" class="soc-icon" title="Instagram"><i class="fa-brands fa-instagram"></i></a>',
    '<a href="https://www.instagram.com/liliianesterovska/" target="_blank" rel="noopener noreferrer" class="soc-icon" title="Instagram"><i class="fa-brands fa-instagram"></i></a>\n        <a href="https://www.threads.com/@liliianesterovska" target="_blank" rel="noopener noreferrer" class="soc-icon" title="Threads"><i class="fa-brands fa-threads"></i></a>',
  );

  html = html.replace(
    /\s*<a href="#" class="soc-icon" title="Facebook"><i class="fa-brands fa-facebook-f"><\/i><\/a>/,
    "",
  );
  html = html.replace(
    /\s*<a href="#" class="soc-icon" title="YouTube"><i class="fa-brands fa-youtube"><\/i><\/a>/,
    "",
  );
  html = html.replace(
    /\s*<a href="#" class="soc-icon" title="LinkedIn"><i class="fa-brands fa-linkedin-in"><\/i><\/a>/,
    "",
  );

  html = html.replace("</body>", `${CAL_SCRIPT}\n</body>`);

  html = applyLandingI18n(html);

  return html;
}
