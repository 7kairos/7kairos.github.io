/*
 * Khloe’s portfolio — plain JavaScript, no build step.
 * CONTENT: edit portfolio-data.js. DESIGN: edit ../css/portfolio.css.
 * This file renders the shared content and handles navigation, write-ups, and play.
 */
(() => {
  "use strict";

  const root = document.getElementById("portfolio-app");
  const data = window.PORTFOLIO;
  if (
    !data ||
    !data.profile ||
    !Array.isArray(data.works) ||
    !Array.isArray(data.passions)
  ) {
    root.innerHTML =
      '<div class="starter-message"><h1>One little thing…</h1><p>The portfolio content could not load. Check that assets/js/portfolio-data.js is beside portfolio.js and has no missing commas or quotes.</p></div>';
    return;
  }

  const profile = data.profile;
  const works = data.works;
  const passions = data.passions;
  const projects = [...works, ...passions];
  const leadership = Array.isArray(data.leadership) ? data.leadership : [];
  // Navigation is local UI state, never part of a shared URL.
  const pageUrl = location.href.split("#")[0];
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  function clearFragment() {
    if (!location.hash) return;
    try {
      history.replaceState(null, "", pageUrl);
    } catch {
      // Some browsers restrict History API changes for local file previews.
      // This replaces only the fragment on the same document.
      location.replace(pageUrl);
    }
  }
  clearFragment();
  const state = {
    section: 0,
    position: 0,
    recruiter: false,
    project: null,
    trigger: null,
  };
  const esc = (value = "") =>
    String(value ?? "").replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  const icon = (name) => window.PORTFOLIO_ICONS?.[name] || "";
  const number = (value) => String(value).padStart(2, "0");
  const reducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Accept local paths and web URLs; never insert executable URL schemes from content.
  function safePath(value) {
    const path = String(value || "").trim();
    if (!path || /[\u0000-\u001f\u007f\\]/.test(path) || path.startsWith("//"))
      return "";
    if (/^[a-z][a-z0-9+.-]*:/i.test(path) && !/^https?:\/\//i.test(path))
      return "";
    return path;
  }
  function externalAttributes(url) {
    return /^https?:\/\//i.test(url)
      ? ' target="_blank" rel="noopener noreferrer"'
      : "";
  }
  function projectLink(project) {
    return safePath(project.url) || pageUrl;
  }
  function sticker(name, className = "", label = "") {
    const directory = safePath(
      data.artwork?.stickerDirectory || "assets/icons/stickers",
    ).replace(/\/$/, "");
    const filename = /^[a-z0-9-]+$/.test(name || "") ? name : "coral-flower";
    const source = directory + "/" + filename + ".png";
    return `<span class="sticker ${className}" ${label ? `role="img" aria-label="${esc(label)}"` : 'aria-hidden="true"'}><img src="${esc(source)}" alt="" draggable="false" data-sticker data-sticker-name="${esc(filename)}"></span>`;
  }
  function tags(project) {
    return `<div class="project-tags">${(project.tags || []).map((tag) => `<span>${esc(tag)}</span>`).join("")}</div>`;
  }
  function cover(project, extraClass = "") {
    const source = safePath(project.image);
    const tone = ["peach", "rose", "sand"].includes(project.tone)
      ? project.tone
      : "peach";
    return `<div class="project-cover ${tone} ${extraClass}">
      <div class="cover-placeholder" ${source ? "hidden" : ""}>${icon("image")}<span>[ your project image here ]</span><span class="placeholder-note">a space for something thoughtful</span></div>
      ${source ? `<img class="cover-image" src="${esc(source)}" alt="${esc(project.imageAlt || `${project.title} cover`)}" loading="lazy" data-cover>` : ""}
    </div>`;
  }
  function projectCard(project, index, passion = false) {
    const href = projectLink(project);
    const external = externalAttributes(href);
    const internal = !safePath(project.url)
      ? ` data-project-link="${esc(project.id)}"`
      : "";
    return `<article class="project-card ${passion ? "passion-card" : ""}">
      <a class="cover-link" href="${esc(href)}" aria-label="Read ${esc(project.title)}"${external}${internal}>
        ${cover(project)}<span class="cover-index">${number(index + 1)}</span>
        ${sticker(project.sticker || (passion ? data.artwork?.passions?.[index % 2] : data.artwork?.works?.[index % 3]), passion ? "card-sticker" : "work-sticker")}<span class="cover-open">${icon("external")}</span>
      </a>
      <div class="project-meta"><span>${esc(project.role)} · ${esc(project.year)}</span><span>${passion ? "Passion project" : "Selected work"}</span></div>
      <h3><a href="${esc(href)}"${external}${internal}>${esc(project.title)}${icon("external")}</a></h3>
      <p>${esc(project.summary)}</p>${tags(project)}
    </article>`;
  }
  function leadershipList() {
    return `<ol class="leadership-list">${leadership.map((item, i) => `<li><span class="list-number">${number(i + 1)}</span><div><strong>${esc(item.role)}</strong><p>${esc(item.organization)}</p></div></li>`).join("")}</ol>`;
  }
  function recruiterRows(items) {
    return `<div class="resume-projects">${items
      .map((project) => {
        const href = projectLink(project);
        return `<article><div><h3>${esc(project.title)} <span>· ${esc(project.role)} · ${esc(project.year)}</span></h3><p>${esc(project.summary)}</p></div><a href="${esc(href)}"${externalAttributes(href)}${!safePath(project.url) ? ` data-project-link="${esc(project.id)}"` : ""}>Write-up ${icon("external")}</a></article>`;
      })
      .join("")}</div>`;
  }
  const email = `mailto:${encodeURIComponent(String(profile.email || "").trim()).replace(/%40/g, "@")}`;
  const linkedin = safePath(profile.linkedin);
  const photo = safePath(profile.photo);
  const github = safePath(profile.github || "https://github.com/7kairos");
  const favorites = Array.isArray(profile.favorites)
    ? profile.favorites
    : [
        "[ A favorite hobby ]",
        "[ A favorite place ]",
        "[ A little thing you love ]",
      ];

  root.innerHTML = `
    <div class="portfolio-shell" id="full-portfolio">
      <a class="skip-link" href="${esc(pageUrl)}" data-action="skip-content">Skip to portfolio content</a>
      <header class="site-header">
        <a class="wordmark" href="${esc(pageUrl)}" data-go="0">khloe’s portfolio <span>’${esc(String(profile.year).slice(-2))}</span></a>
        <nav aria-label="Main navigation">
          ${["works", "passion projects", "about me", "for fun"].map((label, i) => `<a href="${esc(pageUrl)}" data-go="${i + 1}">${label}</a>`).join("")}
        </nav>
        <button class="pill-button recruiter-toggle" data-action="recruiter">recruiter mode ${icon("external")}</button>
      </header>
      <main id="portfolio-content" class="horizontal-track" tabindex="-1" aria-label="Horizontal portfolio; use navigation, a sideways swipe, or the arrow buttons">
        <section class="panel hero-panel" aria-label="Welcome" data-section="home">
          <div class="hero-copy"><h1>khloe’s<br><span>portfolio</span><span class="hero-year">${esc(profile.year)}</span></h1>
            <p class="hero-discipline">product design & ui/ux</p><p class="hero-tagline">${esc(profile.tagline)}</p>
            <button class="text-link hero-scroll" data-go="1">scroll sideways ${icon("right")}</button>
          </div>
          <div class="hero-art"><div class="hero-collage" role="img" aria-label="A collage of coral, terracotta, and golden watercolor flowers with a botanical sprig and a heart">
            ${sticker(data.artwork?.heroMain, "hero-sticker-main")}
            ${sticker(data.artwork?.heroAccent, "hero-sticker-accent")}
            ${sticker(data.artwork?.heroTop, "hero-sticker-top")}
            ${sticker(data.artwork?.heroBotanical, "hero-sticker-botanical")}
            ${sticker(data.artwork?.heart, "hero-sticker-heart")}
          </div><span class="sticker-caption">a little bit of me, in every petal.</span></div>
        </section>
        <section class="panel works-panel" aria-labelledby="works-heading" data-section="works">
          <div class="section-heading"><div><span class="section-number">01 / SELECTED WORKS</span><h2 id="works-heading">Made with <em>intention.</em></h2></div><p>A few problems, a lot of curiosity.<br>A selection of my product & UI/UX work.</p></div>
          <div class="projects-grid">${works.map((project, i) => projectCard(project, i)).join("")}</div>
        </section>
        <section class="panel passions-panel" aria-labelledby="passion-heading" data-section="passion">
          <div class="section-heading"><div><span class="section-number">02 / PASSION PROJECTS</span><h2 id="passion-heading">Just because <em>I love it.</em></h2></div><p>Ideas that wandered off the page.<br>Personal projects, experiments & little joys.</p></div>
          <div class="passion-grid">${passions.map((project, i) => projectCard(project, i, true)).join("")}</div>
        </section>
        <section class="panel about-panel" aria-labelledby="about-heading" data-section="about">
          <div class="section-heading"><div><span class="section-number">03 / ABOUT ME</span><h2 id="about-heading">The person <em>behind the pixels.</em></h2></div><span class="handwritten">nice to meet you!</span></div>
          <div class="about-grid"><div class="about-intro">
            <div class="polaroid"><div class="photo-slot">${photo ? `<img src="${esc(photo)}" alt="${esc(profile.name)}" loading="lazy" data-photo>` : ""}</div><span class="photo-caption">hi, i’m khloe</span>${sticker(data.artwork?.portrait, "portrait-sticker")}</div>
            <section class="about-bio"><h3>A little about me</h3><p>${esc(profile.shortIntroduction || "[ Add a short introduction here. ]")}</p></section>
            <section class="favorites"><h3>A few favorite things</h3><ul>${favorites.map((item) => `<li>${esc(item)}</li>`).join("")}</ul></section>
          </div><div class="leadership-paper">${sticker(data.artwork?.heart, "leadership-sticker")}<h3>leadership & community</h3>${leadershipList()}</div>
          <div class="about-school"><div class="school-card">${sticker(data.artwork?.school, "school-sticker")}<h3>school & major</h3><strong>${esc(profile.school)}</strong><p>${esc(profile.degree)}</p><p>Minor: ${esc(profile.minor)}</p><span class="education-years">${esc(profile.years)}</span></div>
            
          </div></div>
        </section>
        <section class="panel play-panel" aria-labelledby="play-heading" data-section="play">
          <div class="game-layout"><div class="game-copy"><span class="section-number">04 / FOR FUN</span><h2 id="play-heading">A little<br><em>flower break.</em></h2><p>Good things take a little curiosity.<br>Turn over the cards and find the four matching pairs.</p></div>
            <div class="game-paper"><div class="game-topline"><span>the little flower garden</span><span id="game-moves">0 moves</span></div>
              <div class="memory-grid" id="memory-grid" aria-label="Flower matching game"></div>
              <div class="game-bottom"><span id="game-status" role="status" aria-live="polite">0 / 4 pairs found</span><button class="text-link" data-action="restart">${icon("restart")} Play again</button></div>
            </div>
          </div>
        </section>
      </main>
      <footer class="site-footer">
        <nav class="footer-social" aria-label="Contact and profiles"><a class="pill-button" href="${esc(email)}">Email</a><a class="pill-button" href="${esc(linkedin)}"${externalAttributes(linkedin)}>LinkedIn</a><a class="pill-button" href="${esc(github)}"${externalAttributes(github)}>GitHub</a></nav>
        <div class="page-controls"><button class="icon-button" data-action="previous" aria-label="Previous section">${icon("left")}</button><button class="icon-button" data-action="next" aria-label="Next section">${icon("right")}</button></div>
      </footer>
    </div>
    <main class="resume-page" id="recruiter-overview" hidden>
      <div class="resume-tools"><button class="text-link" data-action="portfolio">${icon("left")} Back to the full portfolio</button><button class="text-link" data-action="print">${icon("download")} Print / save PDF</button></div>
      <header class="resume-header"><div><h1>${esc(String(profile.name).toLowerCase())}</h1><p>Product design & UI/UX <span>· Recruiter mode</span></p></div><div class="resume-contact"><a href="${esc(email)}">${esc(profile.email)}${icon("external")}</a>${linkedin ? `<a href="${esc(linkedin)}"${externalAttributes(linkedin)}>LinkedIn${icon("external")}</a>` : ""}</div>${sticker(data.artwork?.recruiter, "resume-sticker")}</header>
      <div class="resume-columns"><div><section><h2>selected works</h2>${recruiterRows(works)}</section><section><h2>passion projects</h2>${recruiterRows(passions.filter((project) => project.featured !== false))}</section></div>
        <div><section class="resume-education"><h2>education</h2><strong>${esc(profile.school)}</strong><p>${esc(profile.degree)}</p><p>Minor: ${esc(profile.minor)} · ${esc(profile.years)}</p></section><section><h2>leadership & community</h2>${leadershipList()}</section><section class="resume-skills"><h2>skills & tools</h2><p>${esc(profile.skills)}</p></section></div>
      </div><footer class="resume-footer"><span>${esc(profile.name)} · Portfolio ${esc(profile.year)}</span><a href="${esc(pageUrl)}" data-action="portfolio">Back to the full portfolio</a></footer>
    </main>
    <dialog class="story-dialog" id="project-dialog" aria-labelledby="story-title"></dialog>
  `;

  const track = document.getElementById("portfolio-content");
  const fullPortfolio = document.getElementById("full-portfolio");
  const overview = document.getElementById("recruiter-overview");
  const dialog = document.getElementById("project-dialog");
  let scrollFrame;
  let positionFrame;
  let programmaticScroll = false;

  // Never stretch a landing-page sticker beyond its source pixels, including
  // on high-density displays. Intrinsic CSS sizing also protects initial load.
  function sizeHeroSticker(image) {
    if (!image.naturalWidth || !image.naturalHeight) return;
    const density = Math.max(1, window.devicePixelRatio || 1);
    image.style.setProperty(
      "--sticker-pixel-width",
      `${image.naturalWidth / density}px`,
    );
    image.style.setProperty(
      "--sticker-pixel-height",
      `${image.naturalHeight / density}px`,
    );
  }
  function sizeHeroStickers() {
    root
      .querySelectorAll(".hero-collage [data-sticker]")
      .forEach(sizeHeroSticker);
  }
  root.addEventListener(
    "load",
    (event) => {
      if (
        event.target instanceof HTMLImageElement &&
        event.target.matches(".hero-collage [data-sticker]")
      ) {
        sizeHeroSticker(event.target);
      }
    },
    true,
  );
  sizeHeroStickers();

  // Decorative image failures do not leave browser broken-image icons in the layout.
  root.addEventListener(
    "error",
    (event) => {
      const image = event.target;
      if (!(image instanceof HTMLImageElement)) return;
      if (image.hasAttribute("data-cover")) {
        image.hidden = true;
        image.parentElement.querySelector(".cover-placeholder").hidden = false;
      } else if (image.hasAttribute("data-photo")) {
        image.hidden = true;
      } else if (image.hasAttribute("data-sticker")) {
        image.hidden = true;
      } else if (image.hasAttribute("data-detail")) {
        image.hidden = true;
        image.nextElementSibling.textContent =
          "[ Image unavailable — check its path in portfolio-data.js. ]";
      }
    },
    true,
  );

  // Every panel belongs to the same scroll surface. Some panels can be wider
  // than a viewport, so navigation uses their measured positions.
  function layoutStops() {
    let width = 0;
    const starts = [...track.querySelectorAll(":scope > .panel")].map(
      (panel) => {
        const start = width;
        width += panel.offsetWidth || track.clientWidth;
        return start;
      },
    );
    const end = Math.max(0, width - track.clientWidth);
    return { starts, end };
  }
  function nearestSection() {
    const { starts } = layoutStops();
    let closest = 0;
    starts.forEach((start, index) => {
      if (
        Math.abs(start - track.scrollLeft) <
        Math.abs(starts[closest] - track.scrollLeft)
      )
        closest = index;
    });
    return closest;
  }
  function updateIndicators(index) {
    state.section = Math.min(4, Math.max(0, index));
    root.querySelectorAll(".site-header [data-go]").forEach((link) => {
      if (Number(link.dataset.go) === state.section)
        link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
    root.querySelector('[data-action="previous"]').disabled =
      track.scrollLeft <= 1;
    root.querySelector('[data-action="next"]').disabled =
      track.scrollLeft >= layoutStops().end - 1;
  }
  function goTo(index) {
    positionSection(Math.min(4, Math.max(0, index)), true);
  }
  function moveTrack(left, smooth) {
    cancelAnimationFrame(positionFrame);
    programmaticScroll = true;
    positionFrame = requestAnimationFrame(() => {
      track.scrollTo({
        left,
        behavior: smooth && !reducedMotion() ? "smooth" : "instant",
      });
      state.position = track.clientWidth
        ? track.scrollLeft / track.clientWidth
        : 0;
      programmaticScroll = false;
      updateIndicators(nearestSection());
    });
  }
  function stepSection(direction) {
    const { starts, end } = layoutStops();
    const stops = [
      ...new Set([...starts.map((start) => Math.min(start, end)), end]),
    ];
    const left =
      direction > 0
        ? (stops.find((stop) => stop > track.scrollLeft + 1) ?? end)
        : (stops.reverse().find((stop) => stop < track.scrollLeft - 1) ?? 0);
    moveTrack(left, true);
  }
  function positionSection(index, smooth) {
    const { starts, end } = layoutStops();
    moveTrack(Math.min(starts[index] || 0, end), smooth);
  }
  function renderStory(project) {
    if (!project) {
      dialog.innerHTML = `<div class="story-sheet"><div class="story-toolbar"><span>PROJECT NOTES</span><button class="icon-button" data-action="close-story" aria-label="Close write-up">${icon("close")}</button></div><h1 id="story-title">This project isn’t here yet.</h1><p>The link may have changed. You can find the current projects in the portfolio.</p><button class="pill-button" data-action="close-story">${icon("left")} Back to the portfolio</button></div>`;
      return;
    }
    const writeup = project.writeup || {};
    const sections = [
      ["overview", "The overview"],
      ["problem", "The starting point"],
      ["process", "The process"],
      ["outcome", "The outcome & reflections"],
    ];
    dialog.innerHTML = `<div class="story-sheet"><div class="story-toolbar"><span>PROJECT NOTES / ${esc(project.year)}</span><button class="icon-button" data-action="close-story" aria-label="Close write-up">${icon("close")}</button></div>
      <div class="story-heading"><span>${esc(project.role)}</span><h1 id="story-title">${esc(project.title)}</h1><p>${esc(project.summary)}</p>${tags(project)}</div>${cover(project, "story-cover")}
      <div class="story-body">${sections.map(([key, title], i) => `<section><div class="story-section-heading"><span>${number(i + 1)}</span><h2>${title}</h2></div><p>${esc(writeup[key] || "[ Add your notes here. ]")}</p></section>`).join("")}
        ${(writeup.images || [])
          .filter((image) => safePath(image.src))
          .map(
            (image, i) =>
              `<figure><img src="${esc(safePath(image.src))}" alt="${esc(image.alt || `Project detail ${i + 1}`)}" loading="lazy" data-detail><figcaption>${esc(image.caption)}</figcaption></figure>`,
          )
          .join("")}
        <button class="pill-button" data-action="close-story">${icon("left")} Back to the portfolio</button>
      </div></div>`;
  }
  function updateTitle() {
    document.title = `${profile.name} · ${state.recruiter ? "Recruiter overview" : `Portfolio ${profile.year}`}`;
  }
  function setRecruiter(enabled) {
    state.recruiter = enabled;
    document.documentElement.classList.toggle("portfolio-mode", !enabled);
    fullPortfolio.hidden = enabled;
    overview.hidden = !enabled;
    window.scrollTo(0, 0);
    if (!enabled) {
      track.scrollTo({
        left: state.position * track.clientWidth,
        behavior: "instant",
      });
    }
    updateTitle();
  }
  function openStory(id, trigger) {
    const project = projects.find((item) => item.id === id);
    state.project = id;
    state.trigger = trigger;
    renderStory(project);
    dialog.showModal();
    document.title = `${project?.title || "Project not found"} · ${profile.name}`;
  }
  function closeStory() {
    if (dialog.open) dialog.close();
    state.project = null;
    const trigger = state.trigger;
    state.trigger = null;
    updateTitle();
    requestAnimationFrame(() => {
      if (trigger?.isConnected && !trigger.closest("[hidden]"))
        trigger.focus({ preventScroll: true });
    });
  }
  function startAtBeginning() {
    clearFragment();
    if (dialog.open) dialog.close();
    state.project = null;
    state.trigger = null;
    state.position = 0;
    setRecruiter(false);
    positionSection(0, false);
  }
  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeStory();
  });
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) closeStory();
  });

  root.addEventListener("click", (event) => {
    const sectionButton = event.target.closest("[data-go]");
    if (sectionButton) {
      event.preventDefault();
      goTo(Number(sectionButton.dataset.go));
      return;
    }
    const projectAnchor = event.target.closest("[data-project-link]");
    if (
      projectAnchor &&
      !event.ctrlKey &&
      !event.metaKey &&
      !event.shiftKey &&
      event.button === 0
    ) {
      event.preventDefault();
      openStory(projectAnchor.dataset.projectLink, projectAnchor);
      return;
    }
    const card = event.target.closest("[data-card]");
    if (card) {
      flipCard(Number(card.dataset.card));
      return;
    }
    const action = event.target.closest("[data-action]")?.dataset.action;
    if (!action) return;
    event.preventDefault();
    if (action === "next") stepSection(1);
    if (action === "previous") stepSection(-1);
    if (action === "recruiter") setRecruiter(true);
    if (action === "portfolio") setRecruiter(false);
    if (action === "skip-content") track.focus({ preventScroll: true });
    if (action === "close-story") closeStory();
    if (action === "print") window.print();
    if (action === "restart") newGame();
  });
  track.addEventListener(
    "scroll",
    () => {
      if (scrollFrame || state.recruiter || !track.clientWidth) return;
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = null;
        if (!programmaticScroll) {
          state.position = track.scrollLeft / track.clientWidth;
          updateIndicators(nearestSection());
        }
      });
    },
    { passive: true },
  );
  track.addEventListener(
    "wheel",
    (event) => {
      if (
        event.ctrlKey ||
        event.shiftKey ||
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
      )
        return;
      if (!event.deltaY) return;
      event.preventDefault();
      track.scrollLeft +=
        event.deltaY *
        (event.deltaMode === 1
          ? 18
          : event.deltaMode === 2
            ? track.clientWidth
            : 1);
    },
    { passive: false },
  );
  window.addEventListener("keydown", (event) => {
    if (
      state.recruiter ||
      dialog.open ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      event.target.closest(
        "input, textarea, select, button, a, [contenteditable]",
      )
    )
      return;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      stepSection(event.key === "ArrowRight" ? 1 : -1);
    }
  });
  window.addEventListener("resize", () => {
    sizeHeroStickers();
    if (!state.recruiter) {
      // Preserve fractional progress when resizing; never round to a section.
      track.scrollTo({
        left: state.position * track.clientWidth,
        behavior: "instant",
      });
    }
  });
  // Old bookmarked fragments also resolve to the beginning, then disappear.
  window.addEventListener("hashchange", startAtBeginning);
  window.addEventListener("pageshow", startAtBeginning);

  // Memory game: four pairs, no timer or sound, with a readable completion state.
  let cards = [];
  let flipped = [];
  let matched = new Set();
  let moves = 0;
  let matchTimer;
  const grid = document.getElementById("memory-grid");
  const gameStatus = document.getElementById("game-status");
  const gameMoves = document.getElementById("game-moves");
  function newGame() {
    clearTimeout(matchTimer);
    flipped = [];
    matched = new Set();
    moves = 0;
    const blooms = [
      { name: "Buttercup", sticker: "buttercup" },
      { name: "Rose", sticker: "rose-anemone" },
      { name: "Coral", sticker: "coral-flower" },
      { name: "Poppy", sticker: "crimson-daisy" },
    ];
    cards = blooms.flatMap((bloom, pair) =>
      [0, 1].map((copy) => ({ ...bloom, pair, id: `${pair}-${copy}` })),
    );
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    grid.innerHTML = cards
      .map((_, i) => `<button class="memory-card" data-card="${i}"></button>`)
      .join("");
    paintGame();
  }
  function paintGame() {
    grid.querySelectorAll("[data-card]").forEach((button, index) => {
      const card = cards[index];
      const isMatched = matched.has(card.pair);
      const revealed = flipped.includes(index) || isMatched;
      button.className = `memory-card ${revealed ? "revealed" : ""} ${isMatched ? "matched" : ""}`;
      button.setAttribute(
        "aria-disabled",
        String(revealed || flipped.length === 2),
      );
      button.setAttribute(
        "aria-label",
        revealed
          ? `${card.name} flower${isMatched ? ", matched" : ""}`
          : `Turn over card ${index + 1}`,
      );
      button.innerHTML = revealed
        ? `${sticker(card.sticker, "game-sticker")}<span>${card.name}</span>${isMatched ? icon("check") : ""}`
        : `${sticker(data.artwork?.heart, "card-back-sticker")}<span class="card-back-label">bloom</span>`;
      button.querySelector("svg")?.classList.add("match-check");
    });
    gameMoves.textContent = `${moves} ${moves === 1 ? "move" : "moves"}`;
    gameStatus.textContent =
      matched.size === 4
        ? "A garden in full bloom. Lovely work!"
        : `${matched.size} / 4 pairs found`;
  }
  function flipCard(index) {
    if (
      !cards[index] ||
      flipped.length >= 2 ||
      flipped.includes(index) ||
      matched.has(cards[index].pair)
    )
      return;
    flipped.push(index);
    if (flipped.length === 2) moves += 1;
    paintGame();
    if (flipped.length === 2) {
      const same = cards[flipped[0]].pair === cards[flipped[1]].pair;
      matchTimer = setTimeout(
        () => {
          if (same) matched.add(cards[flipped[0]].pair);
          flipped = [];
          paintGame();
        },
        same ? 450 : 1000,
      );
    }
  }

  newGame();
  startAtBeginning();
})();
