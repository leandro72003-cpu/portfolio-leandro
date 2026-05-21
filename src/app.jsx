const { useState, useEffect, useRef, useCallback } = React;

/* ============================================
   DATA
   ============================================ */
const STATS = [
{ label: "Buts marqués", value: 4, suffix: "", note: "expériences pro" },
{ label: "Saisons jouées", value: 5, suffix: "", note: "années cumulées" },
{ label: "Niveau global", value: 88, suffix: "/100", note: "indice CV" },
{ label: "Langues", value: 5, suffix: "", note: "fr · pt · es · en · it" }];


const EXPERIENCES = [
{
  rating: 88,
  pos: "CDS",
  name: "Pomona TerreAzur Aquitaine",
  club: "Chef de secteur & Assistant Web/Marketing",
  year: "10.2024 — 10.2026",
  crest: "P",
  minute: "MIN 86'",
  featured: true,
  stats: [
  { v: "B2B", l: "Vente" },
  { v: "WEB", l: "Marketing" },
  { v: "AQT", l: "Région" }],

  bullets: [
  "Alternance Master — pilotage commercial multi-comptes",
  "Coordination digitale & support marketing terrain",
  "Reporting performance et animation de secteur"]

},
{
  rating: 85,
  pos: "AC",
  name: "J'OCEANE — Rungis",
  club: "Assistant Commercial (alternance)",
  year: "2023 — 2024",
  crest: "J",
  minute: "MIN 67'",
  stats: [
  { v: "B2B", l: "Prospection" },
  { v: "€€", l: "Tarification" },
  { v: "OPS", l: "Achats marée" }],

  bullets: [
  "Prospection et fidélisation restaurateurs B2B",
  "Tarification hebdo, négociation achats marée fraîche/surgelée",
  "Reporting commercial et gestion relation client"]

},
{
  rating: 82,
  pos: "DIR",
  name: "J'OCEANE — Direction",
  club: "Assistant de Direction (apprentissage)",
  year: "2021 — 2023",
  crest: "J",
  minute: "MIN 42'",
  stats: [
  { v: "DATA", l: "Analyse BDD" },
  { v: "MKT", l: "Stratégie" },
  { v: "QSE", l: "Qualité" }],

  bullets: [
  "Analyse de bases de données et optimisation contrats",
  "Déploiement marketing : covering véhicules, site web, animation",
  "Démarche QSE et amélioration continue"]

},
{
  rating: 76,
  pos: "ANI",
  name: "Centre de loisirs (94)",
  club: "Animateur — saisonnier",
  year: "Juillet 2021",
  crest: "C",
  minute: "MIN 18'",
  stats: [
  { v: "BAFA", l: "Diplôme" },
  { v: "KIDS", l: "Encadrement" },
  { v: "SECU", l: "Sécurité" }],

  bullets: [
  "Cohésion de groupe et animation d'activités",
  "Sécurité des enfants & surveillance baignade",
  "Première expérience d'encadrement et de leadership"]

}];


const TROPHIES = [
{
  year: "2024",
  title: "Bachelor Chargé d'Affaires",
  school: "Skale Business School — Antony",
  detail: "Commerce & Marketing — formation orientée business développement.",
  place: "OR"
},
{
  year: "2023",
  title: "BTS Gestion PME",
  school: "C3A — Antony",
  detail: "Gestion d'entreprise, relation client, pilotage administratif et commercial.",
  place: "ARG"
},
{
  year: "2021",
  title: "Baccalauréat Général · Mention",
  school: "Lycée Frédéric Mistral",
  detail: "Spécialités SES et LLCE Anglais — base économique et internationale.",
  place: "BRO"
}];


const SKILLS = [
{ name: "Vente B2B & Prospection", v: 92 },
{ name: "Marketing Digital", v: 86 },
{ name: "SEO & Contenu", v: 80 },
{ name: "Social Media Advertising", v: 82 },
{ name: "Email Marketing", v: 78 },
{ name: "Pack Office", v: 90 },
{ name: "ERP Microsoft Navision", v: 75 }];


const SOFT_SKILLS = ["Organisation", "Autonomie", "Adaptabilité", "B.A.F.A.", "Leadership", "Esprit d'équipe"];

const LANGUAGES = [
{ name: "Français", level: "Courant", flag: ["#0055A4", "#FFFFFF", "#EF4135"], type: "v" },
{ name: "Portugais", level: "Courant", flag: ["#006600", "#FF0000"], type: "v" },
{ name: "Espagnol", level: "B1", flag: ["#AA151B", "#F1BF00", "#AA151B"], type: "h", weights: [25, 50, 25] },
{ name: "Anglais", level: "B1", flag: "uk" },
{ name: "Italien", level: "C1", flag: ["#008C45", "#F4F5F0", "#CD212A"], type: "v" }];


const INTERESTS = [
{ num: "01", title: "Sport", desc: "Musculation et tennis — discipline, constance, performance physique." },
{ num: "02", title: "Voyage", desc: "Europe et Émirats Arabes Unis — curiosité culturelle et ouverture internationale." },
{ num: "03", title: "Automobile & Moto", desc: "Passion mécanique — sens du détail technique et de la performance." }];


/* ============================================
   PITCH LINES — SVG decoration
   ============================================ */
function PitchLines() {
  return (
    <svg className="pitch-lines" viewBox="0 0 1280 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="line-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.0" />
          <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.06" />
        </linearGradient>
      </defs>
      {/* Center circle */}
      <circle cx="640" cy="400" r="180" stroke="url(#line-fade)" strokeWidth="1.5" fill="none" />
      <circle cx="640" cy="400" r="6" fill="rgba(255,255,255,0.2)" />
      {/* Half line */}
      <line x1="0" y1="400" x2="1280" y2="400" stroke="url(#line-fade)" strokeWidth="1.5" />
      {/* Penalty area left */}
      <rect x="-1" y="240" width="180" height="320" stroke="url(#line-fade)" strokeWidth="1.5" fill="none" />
      <rect x="-1" y="320" width="70" height="160" stroke="url(#line-fade)" strokeWidth="1.5" fill="none" />
      {/* Penalty area right */}
      <rect x="1101" y="240" width="180" height="320" stroke="url(#line-fade)" strokeWidth="1.5" fill="none" />
      <rect x="1211" y="320" width="70" height="160" stroke="url(#line-fade)" strokeWidth="1.5" fill="none" />
      {/* Corners */}
      <path d="M 0 0 A 20 20 0 0 1 20 20" stroke="url(#line-fade)" strokeWidth="1.5" fill="none" />
      <path d="M 1280 0 A 20 20 0 0 0 1260 20" stroke="url(#line-fade)" strokeWidth="1.5" fill="none" />
      <path d="M 0 800 A 20 20 0 0 0 20 780" stroke="url(#line-fade)" strokeWidth="1.5" fill="none" />
      <path d="M 1280 800 A 20 20 0 0 1 1260 780" stroke="url(#line-fade)" strokeWidth="1.5" fill="none" />
    </svg>);

}

/* ============================================
   COUNTER — animated number on view
   ============================================ */
function Counter({ value, suffix = "", duration = 1600 }) {
  const [n, setN] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const tick = (now) => {
            const t = Math.min(1, (now - startTime) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setN(Math.round(eased * value));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value, duration]);

  return (
    <span className="num" ref={ref}>
      {n}
      {suffix && <span className="suffix">{suffix}</span>}
    </span>);

}

/* ============================================
   SCROLL RAIL — gold line + ball that tracks scroll
   ============================================ */
function ScrollRail() {
  const fillRef = useRef(null);
  const ballRef = useRef(null);
  const rotation = useRef(0);
  const lastY = useRef(0);

  useEffect(() => {
    let raf;
    const update = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      const p = docH > 0 ? y / docH : 0;
      const railTop = window.innerHeight * 0.18;
      const railBottom = window.innerHeight * 0.18;
      const railH = window.innerHeight - railTop - railBottom;
      const fillH = Math.max(0, p * railH);

      if (fillRef.current) {
        fillRef.current.style.height = fillH + "px";
      }
      if (ballRef.current) {
        const delta = y - lastY.current;
        rotation.current += delta * 0.6;
        lastY.current = y;
        ballRef.current.style.transform = `translateY(${fillH - 10}px) rotate(${rotation.current}deg)`;
      }
      raf = null;
    };
    const onScroll = () => {
      if (raf == null) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="scroll-rail" aria-hidden="true">
      <div className="scroll-rail-track" />
      <div className="scroll-rail-fill" ref={fillRef} style={{ height: 0 }}>
        <div className="scroll-ball" ref={ballRef} style={{ top: 0 }} />
      </div>
    </div>);

}

/* ============================================
   PLAYER CARD — Panini-inspired with 3D tilt + reveal
   ============================================ */
function PlayerCard({ exp, index }) {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);

  // Intersection: reveal + goal flash trigger
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // stagger by index
          setTimeout(() => setRevealed(true), index * 120);
          obs.disconnect();
        }
      });
    }, { threshold: 0.25 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [index]);

  // Tilt effect
  const onMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.dataset.tilt = "1";
    el.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(0)`;
  }, []);
  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
    el.dataset.tilt = "0";
  }, []);

  return (
    <article
      ref={ref}
      className={`player-card ${revealed ? "revealed" : ""} ${exp.featured ? "featured" : ""}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}>
      
      <div className="goal-flash">⚽ GOAL · {exp.minute}</div>
      <div className="pc-content">
        <div className="pc-top">
          <div className="pc-rating">
            <div className="score">{exp.rating}</div>
            <div className="pos">{exp.pos}</div>
          </div>
          <div className="pc-badge">
            <div className="year">{exp.year}</div>
            <div className="crest">{exp.crest}</div>
          </div>
        </div>
        <h3 className="pc-name">{exp.name}</h3>
        <div className="pc-club">{exp.club}</div>
        <div className="pc-stats">
          {exp.stats.map((s, i) =>
          <div key={i} className="pc-stat">
              <div className="v">{s.v}</div>
              <div className="l">{s.l}</div>
            </div>
          )}
        </div>
        <ul className="pc-bullets">
          {exp.bullets.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
      </div>
    </article>);

}

/* ============================================
   BAR — skill bar with animated fill on view
   ============================================ */
function Bar({ name, v }) {
  const ref = useRef(null);
  const fillRef = useRef(null);
  const numRef = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          if (fillRef.current) fillRef.current.style.width = v + "%";
          // animate number
          const start = performance.now();
          const dur = 1400;
          const step = (now) => {
            const t = Math.min(1, (now - start) / dur);
            const eased = 1 - Math.pow(1 - t, 3);
            if (numRef.current) numRef.current.textContent = Math.round(eased * v);
            if (t < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      });
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [v]);

  return (
    <div className="bar" ref={ref}>
      <div className="bar-head">
        <span className="name">{name}</span>
        <span className="v"><span ref={numRef}>0</span></span>
      </div>
      <div className="bar-track">
        <div className="bar-fill" ref={fillRef} />
      </div>
    </div>);

}

/* ============================================
   FLAG — small CSS flag from data
   ============================================ */
function Flag({ data }) {
  if (data.flag === "uk") {
    // Union Jack approximation — original, geometric
    return (
      <div className="lang-flag" style={{
        background:
        "linear-gradient(#012169, #012169)",
        position: "relative"
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: `
            linear-gradient(to bottom right, transparent 45%, #fff 45%, #fff 55%, transparent 55%),
            linear-gradient(to bottom left, transparent 45%, #fff 45%, #fff 55%, transparent 55%),
            linear-gradient(to bottom right, transparent 47%, #C8102E 47%, #C8102E 53%, transparent 53%),
            linear-gradient(to bottom left, transparent 47%, #C8102E 47%, #C8102E 53%, transparent 53%)
          `
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: `
            linear-gradient(#fff, #fff) center/100% 30% no-repeat,
            linear-gradient(#fff, #fff) center/30% 100% no-repeat
          `
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: `
            linear-gradient(#C8102E, #C8102E) center/100% 16% no-repeat,
            linear-gradient(#C8102E, #C8102E) center/16% 100% no-repeat
          `
        }} />
      </div>);

  }
  const colors = data.flag;
  if (data.type === "v") {
    return (
      <div className="lang-flag" style={{
        background: `linear-gradient(90deg, ${colors.map((c, i) => `${c} ${i / colors.length * 100}%, ${c} ${(i + 1) / colors.length * 100}%`).join(", ")})`
      }} />);

  }
  // horizontal with weights
  const w = data.weights || colors.map(() => 100 / colors.length);
  let cum = 0;
  const stops = colors.map((c, i) => {
    const start = cum;
    cum += w[i];
    return `${c} ${start}%, ${c} ${cum}%`;
  }).join(", ");
  return (
    <div className="lang-flag" style={{
      background: `linear-gradient(180deg, ${stops})`
    }} />);

}

/* ============================================
   TROPHY — original geometric SVG
   ============================================ */
function TrophyIcon({ place }) {
  // place: OR (gold), ARG (silver), BRO (bronze)
  const c =
  place === "OR" ? "#FFD700" :
  place === "ARG" ? "#C0C0C0" :
  "#CD7F32";
  return (
    <svg width="48" height="58" viewBox="0 0 48 58" fill="none" aria-hidden="true">
      {/* Handles */}
      <path d="M 8 12 C 0 12, 0 28, 12 30" stroke={c} strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 40 12 C 48 12, 48 28, 36 30" stroke={c} strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Cup */}
      <path d="M 10 8 L 38 8 L 36 32 C 36 38, 32 42, 24 42 C 16 42, 12 38, 12 32 Z"
      fill={c} fillOpacity="0.18" stroke={c} strokeWidth="2" />
      {/* Stem */}
      <rect x="21" y="42" width="6" height="6" fill={c} fillOpacity="0.5" />
      {/* Base */}
      <rect x="10" y="48" width="28" height="4" fill={c} />
      <rect x="6" y="52" width="36" height="4" fill={c} fillOpacity="0.7" />
      {/* Star center */}
      <circle cx="24" cy="22" r="4" fill={c} />
    </svg>);

}

/* ============================================
   CONTACT — icons
   ============================================ */
const Icon = {
  mail: () =>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>,

  phone: () =>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 4h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 6a2 2 0 012-2z" />
    </svg>,

  linkedin: () =>
  <svg viewBox="0 0 24 24" fill="currentColor">
      <rect x="3" y="9" width="4" height="12" />
      <circle cx="5" cy="5" r="2" />
      <path d="M10 9h4v2c.6-1 2-2 4-2 3 0 5 2 5 5v7h-4v-6c0-2-1-3-3-3s-3 1-3 3v6h-3V9z" />
    </svg>

};

/* ============================================
   APP
   ============================================ */
function App() {
  return (
    <>
      <ScrollRail />

      <nav className="topnav">
        <div className="crest">
          <div className="crest-badge">L7</div>
          <div className="crest-name">DA SILVA</div>
        </div>
        <div className="links">
          <a href="#kickoff">Kickoff</a>
          <a href="#buts">Buts</a>
          <a href="#palmares">Palmarès</a>
          <a href="#stats">Stats</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* ============ HERO ============ */}
      <section className="hero pitch-bg" id="kickoff">
        <PitchLines />
        <div className="wrap">
          <div className="hero-content">
            <div className="hero-tag">
              <span className="live-dot" />
              SAISON 2024 — 2026 · EN COURS
            </div>
            <h1>
              LEANDRO
              <span className="last">DA SILVA</span>
            </h1>
            <div className="role">
              <span>Chef de Secteur</span>
              <span className="sep" />
              <span>Marketing Digital</span>
              <span className="sep" />
              <span>Master · INSEEC</span>
            </div>
            <p className="lede">
              Étudiant en Master Marketing Digital & E-Business à l'INSEEC Bordeaux.
              Profil hybride <strong>vente B2B / digital</strong>, formé sur le terrain,
              joueur d'équipe et passionné de performance.
            </p>
            <div className="hero-cta">
              <a className="btn btn-primary" href="#buts">
                ⚽ Voir le match
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>
              <a className="btn btn-ghost" href="#contact">
                Convoquer le joueur
              </a>
            </div>
          </div>

          <aside className="match-sheet" aria-label="Feuille de match">
            <div className="ms-header">
              <span>FEUILLE DE MATCH</span>
              <span>· OFFICIEL</span>
            </div>
            <div className="ms-jersey">
              <div className="jersey-num">07</div>
              <div className="jersey-meta">
                <div className="pos">Capitaine</div>
                <div className="name">L. Da Silva</div>
                <div className="sub">FR · 1.81M · POLYVALENT</div>
              </div>
            </div>
            <div className="ms-row">
              <span className="k">Poste</span>
              <span className="v">Chef de secteur</span>
            </div>
            <div className="ms-row">
              <span className="k">Club actuel</span>
              <span className="v">Pomona TerreAzur</span>
            </div>
            <div className="ms-row">
              <span className="k">Formation</span>
              <span className="v">M2 · INSEEC Bordeaux</span>
            </div>
            <div className="ms-row">
              <span className="k">Disponibilité</span>
              <span className="v gold">Oct. 2026</span>
            </div>
            <div className="ms-row">
              <span className="k">Mercato</span>
              <span className="v gold">● OUVERT</span>
            </div>
          </aside>
        </div>
      </section>

      {/* ============ SCOREBOARD ============ */}
      <section className="scoreboard" aria-label="Tableau d'affichage">
        <div className="scoreboard-grid">
          {STATS.map((s) =>
          <div className="stat-cell" key={s.label}>
              <div className="label">{s.label}</div>
              <Counter value={s.value} suffix={s.suffix} />
              <div className="footnote">{s.note}</div>
            </div>
          )}
        </div>
      </section>

      {/* ============ BUTS ============ */}
      <section className="buts pitch-bg" id="buts">
        <div className="wrap">
          <div className="eyebrow">
            <span className="dot" />
            ACTE 1 · LES BUTS MARQUÉS
          </div>
          <h2 className="section-title"><span className="num">01</span>EXPÉRIENCES</h2>
          <p className="section-sub">CHAQUE EXPÉRIENCE EST UN BUT. </p>
          <div className="buts-grid">
            {EXPERIENCES.map((exp, i) =>
            <PlayerCard exp={exp} index={i} key={exp.name} />
            )}
          </div>
        </div>
      </section>

      {/* ============ PALMARES ============ */}
      <section className="palmares" id="palmares">
        <div className="wrap">
          <div className="eyebrow">
            <span className="dot" />
            ACTE 2 · LE PALMARÈS
          </div>
          <h2 className="section-title"><span className="num">02</span>FORMATIONS</h2>
          <p className="section-sub">Trois trophées. Trois étapes. Une trajectoire construite.</p>
          <div className="trophy-row">
            {TROPHIES.map((t) =>
            <div className="trophy" key={t.title}>
                <div className="place-badge">{t.place}</div>
                <div className="icon"><TrophyIcon place={t.place} /></div>
                <div className="year">{t.year}</div>
                <h3>{t.title}</h3>
                <div className="school">{t.school}</div>
                <p className="detail">{t.detail}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ============ STATS / SKILLS ============ */}
      <section className="stats-detailed" id="stats">
        <div className="wrap">
          <div>
            <div className="eyebrow">
              <span className="dot" />
              ACTE 3 · LES STATS DU JOUEUR
            </div>
            <h2 className="section-title"><span className="num">03</span>COMPÉTENCES</h2>
            <p className="section-sub">Données techniques mesurées sur 100. Mise à jour saison 2024-26.</p>
            <div className="bar-list">
              {SKILLS.map((s) => <Bar key={s.name} {...s} />)}
            </div>
          </div>

          <div>
            <div className="subblock-title">Qualités</div>
            <div className="chip-grid">
              {SOFT_SKILLS.map((s) => <span key={s} className="chip gold">{s}</span>)}
            </div>

            <div className="subblock-title">Langues parlées</div>
            <div className="lang-grid">
              {LANGUAGES.map((l) =>
              <div className="lang" key={l.name}>
                  <Flag data={l} />
                  <div className="lang-info">
                    <div className="n">{l.name}</div>
                    <div className="lvl">{l.level}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============ INTERESTS ============ */}
      <section className="interests">
        <div className="wrap">
          <div className="eyebrow">
            <span className="dot" />
            HORS-MATCH · LE JOUEUR
          </div>
          <h2 className="section-title"><span className="num">04</span>CENTRES D'INTÉRÊT</h2>
          <div className="interests-grid">
            {INTERESTS.map((i) =>
            <div className="interest-card" key={i.title}>
                <div className="num">{i.num}</div>
                <h4>{i.title}</h4>
                <p>{i.desc}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <section className="contact" id="contact">
        <div className="wrap">
          <div className="eyebrow" style={{ justifyContent: "center" }}>
            <span className="dot" />
            COUP DE SIFFLET FINAL
          </div>
          <h2>
            <span className="gold">RECRUTEZ</span><br />
            VOTRE PROCHAIN<br />
            ATTAQUANT.
          </h2>
          <div className="sub">Disponible pour entretien · CDI · CDD · Mission</div>
          <div className="contact-row">
            <a className="contact-card" href="mailto:leandro.dslv7@gmail.com">
              <div className="icon"><Icon.mail /></div>
              <div>
                <div className="l">Email</div>
                <div className="v">leandro.dslv7@gmail.com</div>
              </div>
            </a>
            <a className="contact-card" href="tel:0611673139">
              <div className="icon"><Icon.phone /></div>
              <div>
                <div className="l">Téléphone</div>
                <div className="v">06 11 67 31 39</div>
              </div>
            </a>
            <a className="contact-card" href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
              <div className="icon"><Icon.linkedin /></div>
              <div>
                <div className="l">LinkedIn</div>
                <div className="v">Leandro Da Silva</div>
              </div>
            </a>
          </div>
        </div>
      </section>

      <footer>
        © 2026 · LEANDRO DA SILVA · PORTFOLIO COUPE DU MONDE · CONÇU AVEC PASSION
      </footer>
    </>);

}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);