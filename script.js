/* ==========================================================
   Portfolio — all editable content lives in CONFIG below.
   Everything under the "ENGINE" divider renders it and wires
   up the interactions. You normally never need to touch that.

   All values here are SAMPLE placeholders. Replace them with
   your own. Any field left empty ("" or []) is hidden — no
   broken links, no fake buttons.
   ========================================================== */

const CONFIG = {
  // ---------- Theme ----------
  theme: {
    defaultTheme: "dark", // "dark" | "light" (used when no saved preference)
    accentDark: "",       // e.g. "#8b9bff" — leave "" to use style.css default
    accentLight: "",      // e.g. "#4338ca"
  },

  // ---------- SEO ----------
  site: {
    title: "Your Name | Full Stack Developer Portfolio",
    description:
      "Portfolio of Your Name, a full stack developer building fast, accessible web products. Explore projects, skills, experience and get in touch.",
  },

  // ---------- Person ----------
  person: {
    name: "Your Name",
    initials: "YN",
    roles: ["Full Stack Developer", "Frontend Developer", "Problem Solver"], // typed in the hero
    headline: "I build fast, accessible and thoughtful web products.",
    intro:
      "[SAMPLE] Replace this with two or three sentences about what you do, who you help, and the value you bring.",
    availability: "Open to new opportunities", // "" hides the badge
    profileImage: "", // e.g. "assets/images/profile.jpg" — "" shows your initials instead
    resume: "",       // e.g. "assets/resume.pdf" — "" hides the résumé button
    footerTagline: "Designing and building for the web, one detail at a time.",
  },

  // ---------- About ----------
  about: {
    image: "", // e.g. "assets/images/about.jpg" — "" shows a neutral visual
    paragraphs: [
      "[SAMPLE] Write a short professional introduction here: who you are and what you do.",
      "[SAMPLE] Describe your background and career journey in a few honest sentences.",
    ],
    highlights: [
      { title: "Specialization", text: "[SAMPLE] Your main areas of focus." },
      { title: "Interests", text: "[SAMPLE] What you enjoy exploring." },
      { title: "Goals", text: "[SAMPLE] Where you want to grow next." },
      { title: "Approach", text: "[SAMPLE] How you break down and solve problems." },
    ],
    // Only add stats you can verify. Empty array hides them.
    // Example: [{ value: "3+", label: "Years of experience" }]
    stats: [],
  },

  // ---------- Skills (category cards; no percentages) ----------
  // icon: any Lucide icon name — https://lucide.dev/icons
  skills: [
    { title: "Frontend", icon: "layout-template", items: ["HTML5", "CSS3", "JavaScript", "Tailwind CSS", "React"] },
    { title: "Backend", icon: "server", items: ["Node.js", "Express", "REST APIs", "Authentication"] },
    { title: "Databases", icon: "database", items: ["MongoDB", "PostgreSQL", "MySQL"] },
    { title: "Languages", icon: "code-xml", items: ["JavaScript", "Python", "SQL"] },
    { title: "Data & Analytics", icon: "chart-column", items: ["Pandas", "Power BI", "Excel"] },
    { title: "Tools & Platforms", icon: "wrench", items: ["Git", "GitHub", "VS Code", "Figma", "Vercel"] },
  ],

  // ---------- Projects ----------
  // category must match across projects to be grouped by the filter buttons.
  // Leave image/demo/source/caseStudy as "" to hide them.
  projects: [
    {
      title: "Sample Project One",
      category: "Web Development",
      description: "[SAMPLE] A concise description of what this project is and the problem it solves.",
      features: ["Key feature or problem solved", "Another notable detail"],
      tech: ["React", "Node.js", "MongoDB"],
      image: "", // e.g. "assets/images/project-1.jpg"
      demo: "",
      source: "",
      caseStudy: "",
    },
    {
      title: "Sample Project Two",
      category: "Web Development",
      description: "[SAMPLE] Describe the outcome, not just the stack.",
      features: ["Key feature or problem solved"],
      tech: ["HTML", "Tailwind CSS", "JavaScript"],
      image: "", demo: "", source: "", caseStudy: "",
    },
    {
      title: "Sample Analytics Dashboard",
      category: "Data Analytics",
      description: "[SAMPLE] Explain what question the analysis answered.",
      features: ["Insight or business question answered"],
      tech: ["Python", "Pandas", "Power BI"],
      image: "", demo: "", source: "", caseStudy: "",
    },
    {
      title: "Sample ML Model",
      category: "Data Science",
      description: "[SAMPLE] Describe the dataset, approach and result you can verify.",
      features: ["Approach or evaluation method"],
      tech: ["Python", "scikit-learn"],
      image: "", demo: "", source: "", caseStudy: "",
    },
  ],

  // ---------- Experience & education ----------
  // type: "work" | "internship" | "freelance" | "education" | "training" | "project"
  experience: [
    {
      type: "work",
      title: "[SAMPLE] Job Title",
      org: "Company Name",
      start: "Month 20XX",
      end: "Present",
      bullets: ["[SAMPLE] A responsibility or achievement.", "[SAMPLE] Another verifiable accomplishment."],
      tech: ["Technology", "Technology"],
    },
    {
      type: "education",
      title: "[SAMPLE] Degree / Qualification",
      org: "University or Institution",
      start: "20XX",
      end: "20XX",
      bullets: ["[SAMPLE] Relevant coursework, thesis or highlights."],
      tech: [],
    },
  ],

  // ---------- Certifications & achievements ----------
  // Empty array hides the whole section.
  // Example:
  // { title: "Certification name", issuer: "Issuer", date: "2025", description: "", url: "", icon: "award" }
  achievements: [],

  // ---------- Contact ----------
  // Leave a field "" to hide that card. Samples below are placeholders — replace them.
  contact: {
    email: "you@example.com",
    phone: "+910000000000",
    whatsapp: { number: "910000000000", message: "Hi! I found your portfolio and would like to connect." }, // country code + number, digits only
    linkedin: "https://www.linkedin.com/in/your-username",
    github: "https://github.com/your-username",
    instagram: "https://www.instagram.com/your-username",
    location: "City, Country",
  },
};

/* ==========================================================
   ENGINE — rendering & interactions
   ========================================================== */
(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const esc = (v) =>
    String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // Only allow http(s) URLs; anything else is dropped (link is hidden).
  const safeUrl = (u) => {
    if (!u) return "";
    try {
      const url = new URL(u, window.location.href);
      return ["http:", "https:"].includes(url.protocol) ? u : "";
    } catch {
      return "";
    }
  };

  const icon = (name, cls = "") => `<i data-lucide="${esc(name)}" class="${esc(cls)}" aria-hidden="true"></i>`;
  const EXT = 'target="_blank" rel="noopener noreferrer"';

  /* ---------- Rendering ---------- */

  function bindText() {
    const p = CONFIG.person;
    const map = { name: p.name, initials: p.initials, footerTagline: p.footerTagline };
    $$("[data-bind]").forEach((el) => {
      const v = map[el.dataset.bind];
      if (v !== undefined) el.textContent = v;
    });
    document.title = CONFIG.site.title;
    const meta = $('meta[name="description"]');
    if (meta) meta.setAttribute("content", CONFIG.site.description);
    const ogt = $('meta[property="og:title"]');
    if (ogt) ogt.setAttribute("content", CONFIG.site.title);
  }

  function frame(src, alt, initialsText) {
    const img = safeUrlLocal(src)
      ? `<img src="${esc(src)}" alt="${esc(alt)}" data-img decoding="async">`
      : "";
    return `<div class="media-frame"><div class="media-placeholder" aria-hidden="true"><span>${esc(initialsText)}</span></div>${img}</div>`;
  }
  // Local asset paths (assets/...) and http(s) URLs are both fine for images.
  const safeUrlLocal = (u) => !!u && !/^\s*(javascript|data):/i.test(u);

  function socialLinks() {
    const c = CONFIG.contact;
    const list = [];
    const gh = safeUrl(c.github), li = safeUrl(c.linkedin), ig = safeUrl(c.instagram);
    if (gh) list.push({ href: gh, icon: "github", label: "GitHub", ext: true });
    if (li) list.push({ href: li, icon: "linkedin", label: "LinkedIn", ext: true });
    if (ig) list.push({ href: ig, icon: "instagram", label: "Instagram", ext: true });
    if (c.email) list.push({ href: `mailto:${c.email}`, icon: "mail", label: "Email", ext: false });
    return list;
  }

  function renderHero() {
    const p = CONFIG.person;
    $("#hero-greeting").textContent = `Hi, I'm ${p.name}.`;
    $("#hero-title").textContent = p.headline;
    $("#hero-intro").textContent = p.intro;

    if (p.availability) {
      $("#availability-text").textContent = p.availability;
      $("#availability").hidden = false;
    }

    $("#hero-visual").innerHTML = frame(p.profileImage, `Portrait of ${p.name}`, p.initials);

    const html = socialLinks()
      .map(
        (s) =>
          `<li><a class="social-link" href="${esc(s.href)}" ${s.ext ? EXT : ""} aria-label="${esc(s.label)}">${icon(s.icon)}</a></li>`
      )
      .join("");
    $("#hero-socials").innerHTML = html;
    $("#footer-socials").innerHTML = html;
    if (!html) {
      $("#hero-socials").hidden = true;
      $("#footer-socials").closest("div").hidden = true;
    }
  }

  function renderAbout() {
    const a = CONFIG.about;
    const p = CONFIG.person;

    // Left visual: image if provided, otherwise a stat/location panel
    const visual = $("#about-visual");
    if (a.image) {
      visual.innerHTML = `<div class="max-w-sm mx-auto lg:mx-0" style="aspect-ratio:4/5">${frame(a.image, `Photo of ${p.name}`, p.initials)}</div>`;
    } else {
      visual.innerHTML = `<div class="max-w-sm mx-auto lg:mx-0" style="aspect-ratio:4/5">${frame("", "", p.initials)}</div>`;
    }

    const paragraphs = (a.paragraphs || []).map((t) => `<p class="c-muted text-base sm:text-lg">${esc(t)}</p>`).join("");
    const highlights = (a.highlights || [])
      .map((h) => `<div class="card mini-card"><h3>${esc(h.title)}</h3><p>${esc(h.text)}</p></div>`)
      .join("");
    const stats = (a.stats || []).length
      ? `<dl class="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3">${a.stats
          .map((s) => `<div><dd class="stat-value">${esc(s.value)}</dd><dt class="c-muted text-sm">${esc(s.label)}</dt></div>`)
          .join("")}</dl>`
      : "";
    const resumeHref = safeUrlLocal(p.resume) ? p.resume : "";
    const resume = resumeHref
      ? `<a class="btn btn-primary mt-8" href="${esc(resumeHref)}" download>${icon("download")} Download résumé</a>`
      : "";

    $("#about-content").innerHTML = `
      <div class="grid gap-4">${paragraphs}</div>
      <div class="mt-8 grid gap-4 sm:grid-cols-2">${highlights}</div>
      ${stats}${resume}`;
  }

  function renderSkills() {
    $("#skills-grid").innerHTML = (CONFIG.skills || [])
      .filter((c) => c.items && c.items.length)
      .map(
        (c, i) => `
        <article class="card card-hover reveal p-6" style="--reveal-delay:${i * 60}ms">
          <div class="flex items-center gap-3">
            <span class="icon-box">${icon(c.icon || "code-xml")}</span>
            <h3 class="text-lg">${esc(c.title)}</h3>
          </div>
          <ul class="mt-5 flex flex-wrap gap-2">
            ${c.items.map((s) => `<li class="badge">${esc(s)}</li>`).join("")}
          </ul>
        </article>`
      )
      .join("");
  }

  function renderProjects() {
    const projects = CONFIG.projects || [];
    const grid = $("#projects-grid");
    if (!projects.length) {
      $("#projects").hidden = true;
      return;
    }

    grid.innerHTML = projects
      .map((p, i) => {
        const demo = safeUrl(p.demo), src = safeUrl(p.source), cs = safeUrl(p.caseStudy);
        const links = [
          demo && `<a class="btn btn-primary btn-sm" href="${esc(demo)}" ${EXT}>${icon("external-link")} Live demo<span class="sr-only"> of ${esc(p.title)}</span></a>`,
          src && `<a class="btn btn-ghost btn-sm" href="${esc(src)}" ${EXT}>${icon("github")} Source code<span class="sr-only"> of ${esc(p.title)}</span></a>`,
          cs && `<a class="btn btn-ghost btn-sm" href="${esc(cs)}" ${EXT}>${icon("book-open")} Case study<span class="sr-only"> of ${esc(p.title)}</span></a>`,
        ].filter(Boolean);
        const thumb = `
          <div class="project-thumb">
            <div class="media-placeholder" aria-hidden="true"><span>${esc((p.title || "?").trim().charAt(0))}</span></div>
            ${safeUrlLocal(p.image) ? `<img src="${esc(p.image)}" alt="Screenshot of ${esc(p.title)}" loading="lazy" decoding="async" data-img>` : ""}
          </div>`;
        return `
        <article class="card card-hover project-card reveal" data-category="${esc(p.category || "Other")}" style="--reveal-delay:${(i % 3) * 70}ms">
          ${thumb}
          <div class="project-body">
            <p class="project-cat">${esc(p.category || "Other")}</p>
            <h3 class="project-title">${esc(p.title)}</h3>
            <p class="project-desc">${esc(p.description)}</p>
            ${
              p.features && p.features.length
                ? `<ul class="feature-list">${p.features.map((f) => `<li>${icon("check")}<span>${esc(f)}</span></li>`).join("")}</ul>`
                : ""
            }
            ${
              p.tech && p.tech.length
                ? `<ul class="mt-4 flex flex-wrap gap-2" aria-label="Technologies used">${p.tech.map((t) => `<li class="badge">${esc(t)}</li>`).join("")}</ul>`
                : ""
            }
            ${links.length ? `<div class="project-links">${links.join("")}</div>` : ""}
          </div>
        </article>`;
      })
      .join("");

    // Filters (only when there is something to filter)
    const cats = [...new Set(projects.map((p) => p.category || "Other"))];
    if (projects.length >= 3 && cats.length > 1) {
      const box = $("#project-filters");
      box.innerHTML = ["All", ...cats]
        .map((c, i) => `<button type="button" class="filter-btn" data-filter="${esc(c)}" aria-pressed="${i === 0}">${esc(c)}</button>`)
        .join("");
      box.hidden = false;
    }
  }

  const TYPE_META = {
    work: { label: "Work", icon: "briefcase" },
    internship: { label: "Internship", icon: "briefcase" },
    freelance: { label: "Freelance", icon: "laptop" },
    education: { label: "Education", icon: "graduation-cap" },
    training: { label: "Training", icon: "book-open" },
    project: { label: "Academic project", icon: "flask-conical" },
  };

  function renderExperience() {
    const items = CONFIG.experience || [];
    if (!items.length) {
      $("#experience").hidden = true;
      return;
    }
    $("#timeline").innerHTML = items
      .map((e) => {
        const meta = TYPE_META[e.type] || TYPE_META.work;
        const dates = [e.start, e.end].filter(Boolean).join(" – ");
        return `
        <li class="timeline-item reveal">
          <div class="card timeline-card">
            <div class="timeline-meta">
              <span class="timeline-type">${icon(meta.icon)} ${esc(meta.label)}</span>
              ${dates ? `<span aria-hidden="true">·</span><span>${esc(dates)}</span>` : ""}
            </div>
            <h3 class="timeline-title">${esc(e.title)}${e.org ? ` <span class="timeline-org">· ${esc(e.org)}</span>` : ""}</h3>
            ${e.bullets && e.bullets.length ? `<ul class="timeline-bullets">${e.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>` : ""}
            ${e.tech && e.tech.length ? `<ul class="mt-4 flex flex-wrap gap-2" aria-label="Technologies">${e.tech.map((t) => `<li class="badge">${esc(t)}</li>`).join("")}</ul>` : ""}
          </div>
        </li>`;
      })
      .join("");
  }

  function renderAchievements() {
    const items = CONFIG.achievements || [];
    if (!items.length) return; // section stays hidden
    $("#achievements").hidden = false;
    $("#achievements-grid").innerHTML = items
      .map((a, i) => {
        const url = safeUrl(a.url);
        const inner = `
          <span class="icon-box">${icon(a.icon || "award")}</span>
          <div>
            <h3 class="text-base">${esc(a.title)}</h3>
            <p class="c-muted text-sm mt-1">${[a.issuer, a.date].filter(Boolean).map(esc).join(" · ")}</p>
            ${a.description ? `<p class="c-muted text-sm mt-2">${esc(a.description)}</p>` : ""}
          </div>`;
        const cls = "card card-hover reveal flex gap-4 p-5";
        const delay = `style="--reveal-delay:${i * 60}ms"`;
        return url
          ? `<a class="${cls}" ${delay} href="${esc(url)}" ${EXT}>${inner}</a>`
          : `<article class="${cls}" ${delay}>${inner}</article>`;
      })
      .join("");
  }

  function renderContact() {
    const c = CONFIG.contact;
    const cards = [];
    const digits = (s) => String(s || "").replace(/\D/g, "");

    if (c.email) cards.push({ icon: "mail", label: "Email", value: c.email, href: `mailto:${c.email}` });
    if (c.phone) cards.push({ icon: "phone", label: "Phone", value: c.phone, href: `tel:${String(c.phone).replace(/[^\d+]/g, "")}` });
    if (c.whatsapp && digits(c.whatsapp.number)) {
      const text = c.whatsapp.message ? `?text=${encodeURIComponent(c.whatsapp.message)}` : "";
      cards.push({ icon: "message-circle", label: "WhatsApp", value: "Chat on WhatsApp", href: `https://wa.me/${digits(c.whatsapp.number)}${text}`, ext: true });
    }
    const li = safeUrl(c.linkedin), gh = safeUrl(c.github), ig = safeUrl(c.instagram);
    if (li) cards.push({ icon: "linkedin", label: "LinkedIn", value: "Connect professionally", href: li, ext: true });
    if (gh) cards.push({ icon: "github", label: "GitHub", value: "Browse my code", href: gh, ext: true });
    if (ig) cards.push({ icon: "instagram", label: "Instagram", value: "Follow along", href: ig, ext: true });
    if (c.location) cards.push({ icon: "map-pin", label: "Location", value: c.location });

    $("#contact-grid").innerHTML = cards
      .map((k, i) => {
        const body = `
          <span class="icon-box">${icon(k.icon)}</span>
          <span class="min-w-0"><span class="contact-label block">${esc(k.label)}</span><span class="contact-value block">${esc(k.value)}</span></span>`;
        const delay = `style="--reveal-delay:${i * 50}ms"`;
        return k.href
          ? `<a class="card contact-card reveal" ${delay} href="${esc(k.href)}" ${k.ext ? EXT : ""} aria-label="${esc(k.label)}: ${esc(k.value)}">${body}${icon("arrow-up-right", "contact-arrow")}</a>`
          : `<div class="card contact-card reveal" ${delay}>${body}</div>`;
      })
      .join("");

    if (!cards.length) $("#contact-grid").hidden = true;
  }

  function applyAccent() {
    const t = CONFIG.theme;
    if (t.accentDark) document.documentElement.style.setProperty("--accent-dark", t.accentDark);
    if (t.accentLight) document.documentElement.style.setProperty("--accent-light", t.accentLight);
  }

  /* ---------- Interactions ---------- */

  function initTheme() {
    const KEY = "portfolio-theme";
    const root = document.documentElement;
    const btn = $("#theme-toggle");
    const metaColor = $('meta[name="theme-color"]');
    const get = () => { try { return localStorage.getItem(KEY); } catch { return null; } };
    const set = (v) => { try { localStorage.setItem(KEY, v); } catch { /* storage unavailable */ } };

    const apply = (theme) => {
      root.setAttribute("data-theme", theme);
      if (metaColor) metaColor.setAttribute("content", theme === "light" ? "#fafafa" : "#0b0d12");
      if (btn) btn.setAttribute("aria-label", theme === "light" ? "Switch to dark theme" : "Switch to light theme");
    };

    const saved = get();
    apply(saved === "light" || saved === "dark" ? saved : CONFIG.theme.defaultTheme === "light" ? "light" : "dark");

    if (btn) {
      btn.addEventListener("click", () => {
        const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
        apply(next);
        set(next);
      });
    }
  }

  function initMenu() {
    const btn = $("#menu-toggle");
    const menu = $("#mobile-menu");
    const header = $("#site-header");
    if (!btn || !menu || !header) return;

    const setOpen = (open) => {
      menu.hidden = !open;
      btn.setAttribute("aria-expanded", String(open));
      btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };

    btn.addEventListener("click", () => setOpen(menu.hidden));
    menu.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("click", (e) => { if (!menu.hidden && !header.contains(e.target)) setOpen(false); });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !menu.hidden) { setOpen(false); btn.focus(); }
    });
    window.matchMedia("(min-width: 1024px)").addEventListener("change", (e) => { if (e.matches) setOpen(false); });
  }

  function initActiveNav() {
    const links = $$("[data-nav]");
    const ids = [...new Set(links.map((l) => l.getAttribute("href").slice(1)))];
    const sections = ids.map((id) => document.getElementById(id)).filter((s) => s && !s.hidden);
    if (!sections.length) return;

    const setActive = (id) => {
      links.forEach((l) => {
        if (l.getAttribute("href") === `#${id}`) l.setAttribute("aria-current", "true");
        else l.removeAttribute("aria-current");
      });
    };

    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => entries.forEach((en) => { if (en.isIntersecting) setActive(en.target.id); }),
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      sections.forEach((s) => io.observe(s));
    }
    setActive(sections[0].id);

    // Edge case: short last section never crosses the middle band at page bottom
    window.addEventListener("scroll", () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        setActive(sections[sections.length - 1].id);
      }
    }, { passive: true });
  }

  function initReveal() {
    const els = $$(".reveal:not(.is-visible)");
    if (reducedMotion() || !("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
      }),
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
    );
    els.forEach((e) => io.observe(e));
  }

  function initFilters() {
    const box = $("#project-filters");
    const grid = $("#projects-grid");
    if (!box || box.hidden || !grid) return;
    box.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;
      const cat = btn.dataset.filter;
      $$(".filter-btn", box).forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
      $$(".project-card", grid).forEach((card) => {
        const show = cat === "All" || card.dataset.category === cat;
        card.hidden = !show;
        if (show) {
          card.classList.add("is-visible");
          card.classList.remove("filter-in");
          void card.offsetWidth; // restart animation
          if (!reducedMotion()) card.classList.add("filter-in");
        }
      });
    });
  }

  function initTyping() {
    const el = $("#typed-role");
    if (!el) return;
    const roles = (CONFIG.person.roles || []).filter(Boolean);
    if (!roles.length) { el.textContent = CONFIG.person.name; return; }
    if (roles.length === 1 || reducedMotion()) {
      el.textContent = roles[0];
      const caret = $(".caret");
      if (caret) caret.hidden = true;
      return;
    }
    let r = 0, c = 0, deleting = false;
    const tick = () => {
      const word = roles[r];
      c += deleting ? -1 : 1;
      el.textContent = word.slice(0, c);
      let delay = deleting ? 35 : 75;
      if (!deleting && c === word.length) { deleting = true; delay = 1700; }
      else if (deleting && c === 0) { deleting = false; r = (r + 1) % roles.length; delay = 350; }
      setTimeout(tick, delay);
    };
    tick();
  }

  function initBackToTop() {
    const buttons = $$("[data-back-to-top]");
    const fab = $("#back-to-top");
    buttons.forEach((b) =>
      b.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: reducedMotion() ? "auto" : "smooth" });
        const home = $("#home");
        if (home) { home.setAttribute("tabindex", "-1"); home.focus({ preventScroll: true }); }
      })
    );
    if (!fab) return;
    let ticking = false;
    const update = () => { fab.hidden = window.scrollY < 600; ticking = false; };
    window.addEventListener("scroll", () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  // If an <img> fails to load, drop it so the placeholder underneath shows
  function initImageFallback() {
    document.addEventListener("error", (e) => {
      const t = e.target;
      if (t && t.tagName === "IMG" && t.hasAttribute("data-img")) t.remove();
    }, true);
  }

  function initYear() {
    const y = $("#year");
    if (y) y.textContent = new Date().getFullYear();
  }

  /* ---------- Boot ---------- */
  function init() {
    applyAccent();
    initImageFallback();
    bindText();
    renderHero();
    renderAbout();
    renderSkills();
    renderProjects();
    renderExperience();
    renderAchievements();
    renderContact();

    if (window.lucide && typeof window.lucide.createIcons === "function") window.lucide.createIcons();

    initTheme();
    initMenu();
    initActiveNav();
    initReveal();
    initFilters();
    initTyping();
    initBackToTop();
    initYear();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
