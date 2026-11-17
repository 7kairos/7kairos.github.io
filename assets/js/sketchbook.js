(() => {
  'use strict';

  const D = window.SKETCHBOOK;
  if (!D) return;
  const P = D.profile;
  const body = document.body;
  const element = name => `assets/artwork/element-${name}.png`;
  const icon = name => `assets/artwork/${name}.png`;
  const sticker = name => `${D.stickerDir}/sticker-${name}.png`;
  const logoFallback = event => {
    const image = event.currentTarget;
    if (image.dataset.flowerFallback) return;
    image.dataset.flowerFallback = 'true';
    image.classList.add('is-flower-fallback');
    image.alt = 'Watercolor flower (logo unavailable)';
    image.src = sticker('coral-flower');
  };
  const resumePath = P.resumePdf || 'assets/resume/khloe-sakai-resume.pdf';
  const size = (vw, vh, min = 80) => `min(max(${vw}vw, ${min}px), ${vh}vh)`;

  function el(tag, attrs = {}, ...children) {
    const node = document.createElement(tag);
    for (const [key, value] of Object.entries(attrs)) {
      if (value === null || value === undefined || value === false) continue;
      if (key === 'class') node.className = value;
      else if (key === 'style') node.style.cssText = value;
      else if (key.startsWith('on') && typeof value === 'function') node.addEventListener(key.slice(2), value);
      else node.setAttribute(key, value);
    }
    node.append(...children.flat(Infinity).filter(child => child !== null && child !== undefined && child !== false));
    return node;
  }

  // Decorative artwork: [path, left, top, width, rotation, class, mobile position]
  function artwork([src, left, top, width, rotation = 0, extra = '', mobile]) {
    return el('img', {
      class: `stk ${extra}`.trim(), src, alt: '', 'aria-hidden': 'true', draggable: 'false',
      style: `--x:${left};--y:${top};--w:${width};--r:${rotation}deg;` +
        (mobile ? `--mx:${mobile[0]};--my:${mobile[1]};` : '')
    });
  }

  const section = (id, decorative, ...children) =>
    el('section', { class: 'page flow', id }, decorative.map(artwork), el('div', { class: 'page-row' }, ...children));
  const heading = (title, subtitle) =>
    el('div', { class: 'section-heading' }, el('h2', { class: 'serif' }, title),
      subtitle ? el('p', { class: 'hand' }, subtitle) : null);
  const dialog = el('dialog', { id: 'writeup', 'aria-label': 'Project write-up' });
  const recruiterPassionDialog = el('dialog', { id: 'recruiter-passion-dialog', 'aria-label': 'Passion project details' });
  const journalDialog = el('dialog', { id: 'design-journal', 'aria-label': 'Graphic design portfolio book' });
  const inRecruiter = () => body.classList.contains('recruiter');
  let currentPage = 'home';

  function openProject(project) {
    // Recruiter mode has its own self-contained scrapbook popup.
    if (project.scrapbook?.noPopup) {
      if (inRecruiter()) openRecruiterPassion(project);
      else {
        const index = D.passions.findIndex(p => p.id === project.id);
        if (index >= 0) { goTo('passion'); showPassion(project, index); }
      }
      return;
    }
    if (project.url) {
      if (/^https?:\/\//i.test(project.url)) window.open(project.url, '_blank', 'noopener,noreferrer');
      else window.location.href = project.url;
      return;
    }
    location.hash = `${inRecruiter() ? 'recruiter/' : ''}project/${project.id}`;
  }

  function coverPlaceholder(project, index, category) {
    const choices = D.artwork[category];
    return el('div', { class: `cover-placeholder ${project.tone || 'peach'}` },
      el('img', { src: sticker(project.sticker || choices[index % choices.length]), alt: '' }));
  }

  function projectCard(project, index, category) {
    const media = project.image
      ? el('img', { class: 'cover', src: project.image, alt: project.imageAlt || '',
          onerror: event => event.currentTarget.replaceWith(coverPlaceholder(project, index, category)) })
      : coverPlaceholder(project, index, category);
    return el('button', {
      type: 'button', class: `project-card card ${category === 'passions' ? 'pol' : ''}`,
      'aria-label': `Read ${project.title} write-up`, onclick: () => openProject(project)
    }, media, el('div', { class: 'card-details' },
      el('h3', { class: 'serif' }, project.title),
      el('p', { class: 'meta hand' }, `${project.role} · ${project.year}`),
      el('p', { class: 'summary' }, project.summary),
      (project.tags || []).length
        ? el('p', { class: 'tags' }, project.tags.map(tag => el('span', {}, tag))) : null));
  }

  // Chapter-style case study: keep each part compact, browsable and editable.
  // w.media accepts { overview: [{src, alt, caption}], problem: [...], ... }.
  // Older projects with only overview/problem/process/outcome still work.
  function openWriteup(project) {
    const w = project.writeup || {};
    const chapters = [
      ['overview', 'Overview'],
      ['problem', 'Problem'],
      ['process', 'Process'],
      ['solution', 'Solution'],
      ['outcome', 'Outcomes']
    ];
    // Optional chapter list lets projects tell different stories, with their own sections.
    // [{ key: 'experience', label: 'The regions' }, ...] in portfolio-data.js.
    const chapterList = Array.isArray(w.chapters) && w.chapters.length
      ? w.chapters.map(ch => [ch.key, ch.label || ch.key])
      : chapters;
    const visibleChapters = chapterList.filter(([key]) => Boolean(w[key] ||
      (w.media && w.media[key]?.length) || (w.visuals && w.visuals[key])));
    if (!visibleChapters.length) visibleChapters.push(['overview', 'Overview']);

    // A project may link to documents, a social page, a playable demo, or other work.
    // The label comes from its key in portfolio-data.js. Never render unsafe URL schemes.
    const resources = Object.entries(project.resources || {})
      .map(([key, rawTarget]) => {
        const target = String(rawTarget || '').trim();
        const label = key === 'proposal' || key === 'presentation' ? `view ${key}`
          : key === 'instagram' ? 'visit instagram' : key === 'demo' ? 'play the demo'
          : `view ${key.replace(/[-_]/g, ' ')}`;
        if (!target) return null;
        if (!/^https?:\/\//i.test(target) && !/^(?!\/\/)[a-z0-9][a-z0-9/_.% -]*$/i.test(target)) return null;
        return el('a', { class: 'writeup-resource hand', href: target,
          ...( /^https?:\/\//i.test(target) ? { target: '_blank', rel: 'noopener noreferrer' } : {} ) },
          `${label} ↗`);
      }).filter(Boolean);

    const tabs = [];
    const panels = [];
    const progress = el('span', { class: 'case-counter', 'aria-live': 'polite' }, '01 / 05');
    const progressBar = el('span', { class: 'case-progress-fill', 'aria-hidden': 'true' });
    const backButton = el('button', { type: 'button', class: 'case-step-button hand' }, '← previous');
    const nextButton = el('button', { type: 'button', class: 'case-step-button case-next hand' }, 'next page →');
    const main = el('div', { class: 'case-main' });
    let activeStep = 0;

    const paragraphs = value => String(value || '').trim().split(/\n\s*\n/)
      .map(text => text.trim()).filter(Boolean)
      .map(text => el('p', { class: 'case-paragraph' }, text));

    const imageNode = (im, index) => {
      const item = typeof im === 'string' ? { src: im } : im || {};
      const empty = () => el('div', { class: 'case-image-empty' },
        el('img', { src: sticker('coral-flower'), alt: '', 'aria-hidden': 'true' }),
        el('span', { class: 'hand' }, 'add a project image'));
      return el('figure', { class: 'case-figure' },
        item.src ? el('img', { src: item.src, alt: item.alt || `Project illustration ${index + 1}`,
          loading: 'lazy', onerror: event => event.currentTarget.replaceWith(empty()) }) : empty(),
        item.caption ? el('figcaption', { class: 'hand' }, item.caption) : null);
    };

    // Data-driven visual sidebars, used for community/operations case studies.
    // Unlike the standard image gallery, these can show a member journey or workstreams.
    function communityVisual(config) {
      const type = config.type || 'cards';
      const items = Array.isArray(config.items) ? config.items : [];
      if (!items.length) return null;
      const cards = items.map((item, i) => {
        const node = typeof item === 'string' ? { title: item } : item;
        return el('div', { class: 'community-visual-item' },
          el('span', { class: 'community-visual-number' }, String(i + 1).padStart(2, '0')),
          el('div', {}, el('strong', {}, node.title || ''),
            node.text ? el('p', {}, node.text) : null));
      });
      return el('aside', { class: `community-visual community-visual--${type}` },
        config.title ? el('p', { class: 'community-visual-heading hand' }, config.title) : null,
        el('div', { class: 'community-visual-list' }, ...cards),
        config.note ? el('p', { class: 'community-visual-note hand' }, config.note) : null);
    }

    for (const [index, [key, title]] of visibleChapters.entries()) {
      const tab = el('button', { type: 'button', class: 'case-tab hand', role: 'tab',
        id: `case-tab-${index}`, 'aria-controls': `case-panel-${index}` },
        el('span', { class: 'case-tab-number' }, String(index + 1).padStart(2, '0')),
        title);
      tabs.push(tab);
      const media = (w.media && w.media[key]) || (key === 'outcome' ? (w.images || []) : []);
      const highlights = (w.highlights && w.highlights[key]) || [];
      const copy = el('div', { class: 'case-copy' }, ...paragraphs(w[key] || ''));
      const customVisual = w.visuals && w.visuals[key] ? communityVisual(w.visuals[key]) : null;
      const stats = highlights.length ? el('div', { class: 'case-highlights' },
        highlights.map(h => el('div', { class: 'case-highlight' },
          el('strong', { class: 'serif' }, h.value || ''), el('span', {}, h.label || '')))) : null;
      const rightColumn = (media.length || stats || customVisual) ? el('div', { class: 'case-visual-column' },
        customVisual,
        media.length ? el('div', { class: `case-gallery ${media.length > 1 ? 'multiple' : ''}` },
          media.map(imageNode)) : null,
        stats) : null;
      const content = el('div', { class: `case-layout ${rightColumn ? 'has-media' : ''}` },
        copy,
        rightColumn);
      const panel = el('section', { class: 'case-panel', id: `case-panel-${index}`,
        role: 'tabpanel', 'aria-labelledby': `case-tab-${index}` }, content);
      panels.push(panel);
    }

    function setStep(index, moveFocus = false) {
      activeStep = Math.max(0, Math.min(index, visibleChapters.length - 1));
      tabs.forEach((tab, i) => {
        const active = i === activeStep;
        tab.setAttribute('aria-selected', String(active));
        tab.tabIndex = active ? 0 : -1;
        panels[i].hidden = !active;
      });
      progress.textContent = `${String(activeStep + 1).padStart(2, '0')} / ${String(visibleChapters.length).padStart(2, '0')}`;
      progressBar.style.width = `${100 * (activeStep + 1) / visibleChapters.length}%`;
      backButton.disabled = activeStep === 0;
      nextButton.textContent = activeStep === visibleChapters.length - 1 ? 'finish reading ✓' : 'next page →';
      main.scrollTop = 0;
      // Make the selected chapter visible in the swipeable mobile tab rail.
      const selected = tabs[activeStep];
      const rail = selected.parentElement;
      if (rail) {
        const tabBounds = selected.getBoundingClientRect();
        const railBounds = rail.getBoundingClientRect();
        if (tabBounds.left < railBounds.left) rail.scrollLeft -= railBounds.left - tabBounds.left + 8;
        else if (tabBounds.right > railBounds.right) rail.scrollLeft += tabBounds.right - railBounds.right + 8;
      }
      if (moveFocus) selected.focus({ preventScroll: true });
    }
    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => setStep(i));
      tab.addEventListener('keydown', event => {
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
          event.preventDefault();
          setStep((i + (event.key === 'ArrowRight' ? 1 : -1) + visibleChapters.length) % visibleChapters.length, true);
        }
        if (event.key === 'Home' || event.key === 'End') {
          event.preventDefault();
          setStep(event.key === 'Home' ? 0 : visibleChapters.length - 1, true);
        }
      });
    });
    backButton.addEventListener('click', () => setStep(activeStep - 1));
    nextButton.addEventListener('click', () => {
      if (activeStep === visibleChapters.length - 1) dialog.close();
      else setStep(activeStep + 1);
    });
    main.append(...panels);
    dialog.classList.add('case-dialog');
    dialog.replaceChildren(
      el('div', { class: 'case-shell' },
        el('header', { class: 'case-header' },
          el('div', { class: 'case-topline' },
            el('span', { class: 'case-eyebrow hand' }, 'from the sketchbook / case study'),
            el('button', { type: 'button', class: 'case-close hand',
              'aria-label': 'Close project case study', onclick: () => dialog.close() }, 'close ×')),
          el('h2', { class: 'case-title serif' }, project.title),
          el('div', { class: 'case-header-bottom' },
            el('p', { class: 'case-meta hand' }, [project.role, project.year].filter(Boolean).join(' · ')),
            resources.length ? el('div', { class: 'writeup-resources' }, ...resources) : null)),
        el('nav', { class: 'case-tabs', role: 'tablist', 'aria-label': 'Case study chapters' }, ...tabs),
        main,
        el('footer', { class: 'case-footer' },
          backButton,
          el('div', { class: 'case-progress' }, progress,
            el('span', { class: 'case-progress-track' }, progressBar)),
          nextButton)));
    setStep(0);
    if (!dialog.open) dialog.showModal();
  }

  dialog.addEventListener('close', () => {
    if (location.hash.includes('project/')) {
      history.replaceState(null, '', inRecruiter() ? '#recruiter' : `#${currentPage}`);
    }
  });
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });

  // About Me leadership entries are plain text: no extra popups or click actions.
  function leadershipBullet(item) {
    return el('span', {}, el('strong', {}, item.role), ` · ${item.org}`);
  }

  const heroTitle = P.heroTitle || 'portfolio';
  const heroKicker = P.heroKicker || 'welcome to my';
  
  const useOptionThreeWordmark = heroTitle.trim().toLowerCase() === 'portfolio' &&
    heroKicker.trim().toLowerCase() === 'welcome to my';
  const heroHeading = useOptionThreeWordmark
    ? el('h1', { class: 'hero-title hero-title-reference serif', 'aria-label': `${heroKicker} ${heroTitle}` },
        el('img', {
          class: 'hero-lettering-image',
          src: 'assets/artwork/hero-option-three-lettering.png',
          alt: '', 'aria-hidden': 'true', draggable: 'false',
          onerror: event => { event.currentTarget.replaceWith(el('span', { class: 'hero-word' }, heroTitle)); }
        }))
    : el('div', { class: 'hero-editable-title' },
        el('p', { class: 'hero-kicker hand' }, heroKicker),
        el('h1', { class: 'hero-title serif' }, el('span', { class: 'hero-word' }, heroTitle)));
  const home = el('section', { class: 'page hero', id: 'home' },
    [
      [element('orange-wash'), '-22%', '-11%', size(52, 89, 320), 0, 'wash'],
      [element('rose-wash'), '72%', '39%', size(32, 56, 210), 0, 'wash'],
      [sticker('coral-flower'), '77%', '57%', size(17, 30, 125), 13, 'sway', ['71%', '65%']],
      [element('orange-bloom'), '6.5%', '7.5%', size(15, 25, 95), -9, 'small-art', ['6%', '10%']],
      [element('gold-stars'), '86%', '66%', size(7, 12, 50), 8, 'small-art nomob']
    ].map(artwork),
    el('div', { class: 'hero-copy' },
      heroHeading,
      el('div', { class: 'hero-foot' },
        el('p', { class: 'hand hero-descriptor' }, P.heroDescriptor || P.eyebrow),
        el('span', { class: 'hero-year hand' }, P.year))));

  const works = section('works', [
    [icon('apricot-brush-wash'), '-7%', '60%', size(38, 58, 210), 0, 'wash'],
    [icon('patchwork-star'), '6%', '78%', size(8, 16, 55), -10, 'small-art'],
    [element('blue-dashes'), '91%', '6%', size(7, 12, 55), 8, 'small-art']
  ], heading('my works', '& their processes!'), ...D.works.map((p, i) => projectCard(p, i, 'works')));

  
  function passionArt(project, index, cssClass) {
    const src = project.image;
    const fallback = () => el('div', { class: `${cssClass} passion-flower ${project.tone || 'rose'}` },
      el('img', { src: sticker(project.sticker || D.artwork.passions[index % D.artwork.passions.length]), alt: '', draggable: 'false' }));
    return src ? el('img', { class: cssClass, src, alt: project.imageAlt || '', draggable: 'false',
      onerror: event => event.currentTarget.replaceWith(fallback()) }) : fallback();
  }

  const passionWorkspace = el('div', {
    class: 'passion-workspace', id: 'passion-workspace', role: 'region',
    'aria-label': 'Passion project scrapbook workspace. Drag a polaroid here or tap one to explore.'
  });

  // Milkymon uses one data-driven, three-tab spread in both portfolio modes.
  function makeCommunitySpread(project) {
    const sb = project.scrapbook || {};
    const makeLink = link => el('a', {
      class: 'hand milkymon-link', href: link.url, target: '_blank', rel: 'noopener noreferrer'
    }, `${link.label} ↗`);
    const brand = el('aside', { class: 'milkymon-identity' },
      el('figure', { class: 'milkymon-logo-print' },
        el('img', { src: project.image, alt: project.imageAlt || 'Milkymon logo' })));

    const pathList = el('ol', { class: 'milkymon-path' },
      ...(sb.recruitment || []).map((step, i) => el('li', {},
        el('span', { class: 'milkymon-step-number' }, String(i + 1).padStart(2, '0')),
        el('div', {}, el('strong', { class: 'hand' }, step.title), el('p', {}, step.text)))));
    const how = el('div', { class: 'milkymon-how' },
      el('p', { class: 'milkymon-intro' }, sb.description || project.summary || ''),
      el('h4', { class: 'hand' }, ""), pathList);
    const role = el('div', { class: 'milkymon-responsibilities' },
      ...(sb.responsibilities || []).map(item => el('article', { class: 'milkymon-duty' },
        el('h4', { class: 'hand' }, item.title), el('p', {}, item.text))));
    const outcome = el('div', { class: 'milkymon-outcomes' },
      el('div', { class: 'milkymon-stat-grid' }, ...(sb.stats || []).map(item =>
        el('div', { class: 'milkymon-stat' },
          el('strong', { class: 'serif' }, item.value), el('span', {}, item.label)))),
      el('p', {}, sb.outcome || ''));
    const tabData = [
      { label: 'description & how it works', content: how },
      { label: 'what i do', content: role },
      { label: "outcomes / what i've learned", content: outcome },
    ];
    const tabs = el('div', { class: 'story-tab-strip milkymon-tabs', role: 'tablist',
      'aria-label': 'Milkymon project sections' });
    const stage = el('div', { class: 'story-page-stage milkymon-stage' });
    const buttons = [], panes = [];
    function choose(i) {
      buttons.forEach((button, j) => {
        button.setAttribute('aria-selected', String(i === j));
        button.tabIndex = i === j ? 0 : -1;
      });
      panes.forEach((pane, j) => { pane.hidden = j !== i; });
      stage.scrollTop = 0;
    }
    tabData.forEach((tab, i) => {
      const paneId = `milkymon-${i}-${Math.random().toString(36).slice(2,8)}`;
      const pane = el('section', { id: paneId, class: 'story-page milkymon-page',
        role: 'tabpanel', hidden: i !== 0, 'aria-label': tab.label }, tab.content);
      const button = el('button', { type: 'button', class: 'story-tab hand milkymon-tab',
        role: 'tab', 'aria-selected': String(i === 0),
        'aria-controls': paneId, onclick: () => choose(i) }, tab.label);
      buttons.push(button); panes.push(pane);
      tabs.append(button); stage.append(pane);
    });
    choose(0);
    const main = el('div', { class: 'milkymon-main' }, tabs, stage);
    return el('div', { class: 'story-spread milkymon-spread' },
      el('div', { class: 'milkymon-columns' }, brand, main),
      el('nav', { class: 'milkymon-links', 'aria-label': 'Milkymon links' },
        ...(sb.links || []).filter(link => /^https?:\/\//i.test(link.url || '')).map(makeLink)));
  }

  function makeStorySpread(project) {
    if (project.scrapbook?.layout === 'community') return makeCommunitySpread(project);
    const sb = project.scrapbook || {};
    const pages = [];
    const photos = Array.isArray(sb.gallery) ? sb.gallery : [];
    const impacts = Array.isArray(sb.impact) ? sb.impact : [];
    const title = project.id === 'passion-egress' ? 'behind the game' : 'the club & its purpose';
    const actionLabel = project.id === 'passion-egress' ? 'my contributions' : 'our impact';
    const coverPhoto = photos[0];
    const opening = el('div', { class: 'story-overview' },
      coverPhoto?.image ? el('figure', { class: 'story-lead-photo' },
        el('img', { src: coverPhoto.image, alt: coverPhoto.alt || coverPhoto.label || project.title }),
        el('figcaption', { class: 'hand' }, coverPhoto.label || 'a moment from the project')) : null,
      el('div', { class: 'story-opening-copy' },
        el('p', { class: 'hand story-eyebrow' }, title),
        el('p', {}, sb.description || project.summary)));
    const impact = el('div', { class: 'story-impact-grid' },
      ...impacts.map((item, i) => el('article', { class: 'story-impact-card' },
        el('span', { class: 'story-impact-number' }, String(i + 1).padStart(2, '0')),
        el('h4', { class: 'hand' }, item.title || ''),
        el('p', {}, item.text || ''))));
    const photosPage = el('div', { class: `story-photo-grid ${project.id === 'passion-egress' ? 'story-photo-grid--game' : 'story-photo-grid--events'}` },
      ...photos.map((info, i) => el('figure', { class: 'story-photo' },
        info.image ? el('img', { src: info.image, alt: info.alt || info.label || `Project photograph ${i + 1}`, loading: 'eager',
          onerror: e => e.currentTarget.replaceWith(
            el('div', { class: 'story-photo-placeholder' },
              el('img', { src: sticker('coral-flower'), alt: '', 'aria-hidden': 'true' }),
              el('span', { class: 'hand' }, 'add photo'))) }) :
          el('div', { class: 'story-photo-placeholder' },
            el('img', { src: sticker('coral-flower'), alt: '', 'aria-hidden': 'true' }),
            el('span', { class: 'hand' }, 'add photo')),
        el('figcaption', { class: 'hand' }, info.label || 'project photo'))));
    const tabs = [
      { label: 'the story', content: opening },
      { label: actionLabel, content: impact },
      { label: 'photos & visuals', content: photosPage }
    ];
    const tabStrip = el('div', { class: 'story-tab-strip', role: 'tablist', 'aria-label': `${project.title} sections` });
    const content = el('div', { class: 'story-page-stage' });
    const triggers = [];
    tabs.forEach((tab, i) => {
      const pane = el('section', { class: 'story-page', role: 'tabpanel', hidden: i !== 0,
        'aria-label': tab.label }, tab.content);
      pages.push(pane);
      const trigger = el('button', { type: 'button', class: 'hand story-tab', role: 'tab',
        'aria-selected': String(i === 0), onclick: () => selectPage(i) }, tab.label);
      triggers.push(trigger);
      tabStrip.append(trigger);
      content.append(pane);
    });
    function selectPage(index) {
      pages.forEach((pane, i) => { pane.hidden = i !== index; });
      triggers.forEach((btn, i) => btn.setAttribute('aria-selected', String(i === index)));
    }
    return el('div', { class: 'story-spread' },
      tabStrip,
      content,
      sb.link?.url ? el('nav', { class: 'story-links', 'aria-label': `${project.title} links` },
        el('a', { class: 'hand story-source-link', href: sb.link.url,
          target: '_blank', rel: 'noopener noreferrer' }, (sb.link.label || 'view more') + ' ↗')) : null);
  }

  // Each Passion Project chooses its own scrapbook layout in portfolio-data.js.
  // 'gallery': image-led work, inspirations and optional playlist.
  // 'journal': creative process / notes, milestones, and optional supporting art.
  // No playlist, iterations or note blocks are forced on every project.
  function showPassion(project, index) {
    const sb = project.scrapbook || {};
    const layout = ['journal', 'gallery', 'community', 'advocacy', 'game'].includes(sb.layout) ? sb.layout : 'gallery';
    const rows = Array.isArray(sb.gallery) ? sb.gallery :
      (Array.isArray(sb.iterations) ? sb.iterations : []);
    const notes = Array.isArray(sb.notes) ? sb.notes : [];
    const inspiration = Array.isArray(sb.inspirations) ? sb.inspirations : [];
    const playlist = sb.playlist || {};

    function photo(item, i) {
      const info = typeof item === 'string' ? { label: item } : item || {};
      const art = info.image
        ? el('img', { src: info.image, alt: info.alt || info.label || 'Creative work',
            loading: 'lazy', onerror: event => event.currentTarget.replaceWith(placeholder()) })
        : placeholder();
      function placeholder() {
        return el('div', { class: 'scrap-photo-empty' },
          el('img', { src: sticker(D.artwork.passions[(index + i) % D.artwork.passions.length]),
            alt: '', 'aria-hidden': 'true' }),
          el('span', { class: 'hand' }, 'add image'));
      }
      return el('figure', { class: 'scrap-artifact' }, art,
        el('figcaption', { class: 'hand' }, info.label || `piece ${i + 1}`));
    }

    function inspirationNode(item, i) {
      const info = typeof item === 'string' ? { label: item } : item || {};
      return el('span', { class: 'inspiration-chip', style: `--swatch-index:${i}` },
        info.image
          ? el('img', { src: info.image, alt: info.alt || '',
              onerror: event => event.currentTarget.replaceWith(el('span', { class: 'inspiration-swatch' })) })
          : el('span', { class: 'inspiration-swatch' }),
        el('span', {}, info.label || 'reference'));
    }

    const feature = el('div', { class: 'workspace-feature' },
      passionArt(project, index, 'workspace-cover'),
      project.summary ? el('p', { class: 'workspace-summary' }, project.summary) : null);

    const galleryContent = el('div', { class: 'workspace-notes workspace-gallery-layout' },
      rows.length ? el('section', { class: 'scrap-section' },
        el('h4', { class: 'hand' }, sb.galleryTitle || 'the collection'),
        el('div', { class: 'scrap-art-gallery' }, rows.slice(0, 4).map(photo))) : null,
      inspiration.length ? el('section', { class: 'scrap-section' },
        el('h4', { class: 'hand' }, sb.inspirationTitle || 'visual inspirations'),
        el('div', { class: 'inspiration-chips' }, inspiration.slice(0, 5).map(inspirationNode))) : null,
      playlist.url ? el('section', { class: 'scrap-section' },
        el('h4', { class: 'hand' }, 'sounds of this project'),
        el('a', { class: 'playlist-link', href: playlist.url, target: '_blank', rel: 'noopener noreferrer' },
          `♫ ${playlist.title || 'listen to the playlist'} ↗`)) : null,
      sb.process ? el('section', { class: 'scrap-section process-note' },
        el('h4', { class: 'hand' }, sb.processTitle || 'behind the work'),
        el('p', {}, sb.process)) : null
    );

    const journalContent = el('div', { class: 'workspace-notes workspace-journal-layout' },
      el('p', { class: 'hand journal-kicker' }, sb.kicker || 'notes from the process'),
      notes.length ? el('div', { class: 'journal-notes' },
        ...notes.slice(0, 4).map((note, i) => el('article', { class: 'journal-note' },
          el('span', { class: 'journal-index' }, String(i + 1).padStart(2, '0')),
          el('div', {}, el('h4', { class: 'hand' }, note.title || 'a note'),
            el('p', {}, note.text || 'Add a short note about this part of the project.'))))) : null,
      rows.length ? el('section', { class: 'scrap-section journal-clippings' },
        el('h4', { class: 'hand' }, sb.galleryTitle || 'little snapshots'),
        el('div', { class: 'scrap-art-gallery' }, rows.slice(0, 3).map(photo))) : null,
      sb.process ? el('p', { class: 'journal-reflection' }, sb.process) : null,
      sb.link?.url ? el('a', { class: 'journal-link hand', href: sb.link.url,
        ...( /^https?:\/\//i.test(sb.link.url) ? { target: '_blank', rel: 'noopener noreferrer' } : {} ) },
        (sb.link.label || 'view more') + ' ↗') : null
    );

    // Bespoke scrapbook spreads: a region map, advocacy milestones, and game development.
    // The text and linked artifacts remain editable as data; no duplicate content sources.
    const advocacyContent = el('div', { class: 'workspace-notes workspace-advocacy-layout' },
      el('p', { class: 'hand journal-kicker' }, sb.kicker || 'outreach & community'),
      el('div', { class: 'scrap-advocacy-timeline' },
        ...notes.slice(0, 4).map((note, i) => el('article', { class: 'scrap-advocacy-event' },
          el('span', { class: 'scrap-event-marker' }, '✿'),
          el('div', {}, el('h4', { class: 'hand' }, note.title || `event ${i + 1}`),
            el('p', {}, note.text || ''))))),
      sb.process ? el('p', { class: 'scrap-closing-note hand' }, sb.process) : null,
      sb.link?.url ? el('a', { class: 'journal-link hand', href: sb.link.url,
        ...( /^https?:\/\//i.test(sb.link.url) ? { target: '_blank', rel: 'noopener noreferrer' } : {} ) },
        (sb.link.label || 'see more') + ' ↗') : null);

    const gameContent = el('div', { class: 'workspace-notes workspace-game-layout' },
      el('p', { class: 'hand journal-kicker' }, sb.kicker || 'from concept to code'),
      rows.length ? el('section', { class: 'scrap-section' },
        el('h4', { class: 'hand' }, sb.galleryTitle || 'from the build'),
        el('div', { class: 'scrap-art-gallery' }, rows.slice(0, 3).map(photo))) : null,
      notes.length ? el('div', { class: 'scrap-game-notes' },
        ...notes.slice(0, 3).map(note => el('div', { class: 'scrap-game-note' },
          el('strong', { class: 'hand' }, note.title || ''),
          el('p', {}, note.text || '')))) : null,
      sb.process ? el('p', { class: 'scrap-closing-note hand' }, sb.process) : null,
      sb.link?.url ? el('a', { class: 'journal-link hand', href: sb.link.url,
        ...( /^https?:\/\//i.test(sb.link.url) ? { target: '_blank', rel: 'noopener noreferrer' } : {} ) },
        (sb.link.label || 'view demo') + ' ↗') : null);

    // Allies and Egress have in-scrapbook story pages instead of a second modal.
    // Each page is short enough to fit the scrapbook without vertical scrolling.
    const contentByLayout = {
      gallery: galleryContent,
      journal: journalContent,
      community: null,
      advocacy: advocacyContent,
      game: gameContent,
    };

    const inlineStory = Boolean(sb.noPopup);
    const projectName = inlineStory
      ? el('h3', { class: 'workspace-project-title serif story-static-title' }, project.title)
      : el('button', { type: 'button', class: 'workspace-project-title serif',
          onclick: () => openProject(project), title: 'Open full project write-up' }, project.title);
    const details = el('div', { class: `workspace-project workspace-project--${layout}${inlineStory ? ' workspace-project--story' : ''}` },
      el('div', { class: 'workspace-title' },
        projectName,
        el('p', { class: 'hand workspace-meta' }, [project.role, project.year].filter(Boolean).join(' · '))),
      inlineStory ? makeStorySpread(project) : el('div', { class: 'workspace-grid' }, feature, contentByLayout[layout]));
    passionWorkspace.classList.add('has-project');
    passionWorkspace.replaceChildren(details);
    document.querySelectorAll('.passion-thumb').forEach(node => {
      node.classList.toggle('chosen', node.dataset.project === project.id);
      node.setAttribute('aria-pressed', String(node.dataset.project === project.id));
    });
  }

  passionWorkspace.append(el('div', { class: 'workspace-empty' },
    el('p', { class: 'workspace-empty-label hand' }, 'drag a polaroid here · or tap one to explore')));

  function wirePassionDrag(button, project, index) {
    let drag = null;
    const insideWorkspace = (x, y) => {
      const box = passionWorkspace.getBoundingClientRect();
      return x >= box.left && x <= box.right && y >= box.top && y <= box.bottom;
    };
    const cleanup = () => {
      if (!drag) return;
      drag.ghost?.remove();
      passionWorkspace.classList.remove('drag-over');
      button.classList.remove('dragging');
      drag = null;
    };
    button.addEventListener('pointerdown', event => {
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      drag = { id: event.pointerId, startX: event.clientX, startY: event.clientY,
        active: false, ghost: null };
      button.setPointerCapture?.(event.pointerId);
    });
    button.addEventListener('pointermove', event => {
      if (!drag || drag.id !== event.pointerId) return;
      const distance = Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY);
      if (!drag.active && distance > 8) {
        drag.active = true;
        drag.ghost = button.cloneNode(true);
        drag.ghost.removeAttribute('id');
        drag.ghost.classList.add('passion-drag-ghost');
        drag.ghost.setAttribute('aria-hidden', 'true');
        drag.ghost.tabIndex = -1;
        document.body.append(drag.ghost);
        button.classList.add('dragging');
      }
      if (drag.active) {
        event.preventDefault();
        drag.ghost.style.left = `${event.clientX}px`;
        drag.ghost.style.top = `${event.clientY}px`;
        passionWorkspace.classList.toggle('drag-over', insideWorkspace(event.clientX, event.clientY));
      }
    });
    button.addEventListener('pointerup', event => {
      if (!drag || drag.id !== event.pointerId) return;
      if (drag.active) {
        // Do not turn a failed drop into an accidental selection.
        button.dataset.suppressClick = 'yes';
        window.setTimeout(() => { delete button.dataset.suppressClick; }, 100);
        if (insideWorkspace(event.clientX, event.clientY)) showPassion(project, index);
      }
      cleanup();
    });
    button.addEventListener('pointercancel', cleanup);
    button.addEventListener('lostpointercapture', () => { if (drag) cleanup(); });
    button.addEventListener('click', () => {
      if (button.dataset.suppressClick !== 'yes') showPassion(project, index);
    });
  }

  const folder = el('div', { class: 'passion-folder', 'aria-label': 'Folder of passion projects' },
    el('div', { class: 'folder-back' }, el('span', { class: 'folder-tab hand' }, 'little projects')),
    el('div', { class: 'folder-papers' }, D.passions.map((project, i) => {
      const button = el('button', {
        type: 'button', class: 'passion-thumb', 'data-project': project.id,
        'aria-label': `Explore ${project.title}`, 'aria-pressed': 'false',
        style: `--folder-index:${i};--folder-count:${D.passions.length};--folder-step:${D.passions.length > 3 ? 65 : 91}px;`
      }, passionArt(project, i, 'passion-thumb-cover'),
      el('span', { class: 'passion-thumb-caption hand' }, project.title));
      wirePassionDrag(button, project, i);
      return button;
    })),
    el('div', { class: 'folder-front' },
      el('span', { class: 'hand' }, '♡')),
    el('p', { class: 'folder-hint hand' }, ''));

  const passions = section('passion', [
    [icon('pink-brush-wash'), '-10%', '30%', size(40, 64, 230), 0, 'wash'],
    // Small watercolor details, kept behind and away from the interactive scrapbook.
    [element('olive-sprig'), '1%', '16%', size(6, 18, 55), -12, 'passion-decor passion-leaves'],
    [element('gold-stars'), '80%', '11%', size(7, 12, 58), 11, 'passion-decor'],
    [element('pink-buds'), '90%', '66%', size(7, 19, 58), -14, 'passion-decor']
  ], el('div', { class: 'passion-spread' },
    heading('passion projects'),
    el('div', { class: 'passion-content' }, folder, passionWorkspace)));

  // Three independently editable photo slots. The old profile.photo still works as slot 1.
  const photoStripImages = Array.isArray(P.photoStrip) ? P.photoStrip.slice(0, 3) : [];
  while (photoStripImages.length < 3) photoStripImages.push('');
  if (!photoStripImages[0] && P.photo) photoStripImages[0] = P.photo;
  const photostripFlowers = ['rose-anemone', 'blush-bloom', 'ochre-flower'];
  const photoPlaceholder = index => el('div', { class: 'photostrip-placeholder' },
    el('img', { src: sticker(photostripFlowers[index]), alt: '', draggable: 'false' }));
  const portrait = el('div', { class: 'photostrip-wrap', 'aria-label': 'Personal photo strip' },
    el('div', { class: 'photostrip-paper' },
      el('div', { class: 'photostrip-stack' }, photoStripImages.map((photo, index) =>
        el('div', { class: `photostrip-frame photostrip-frame-${index + 1}` },
          photo ? el('img', { src: photo,
            alt: `Photo ${index + 1} of Khloe`, loading: 'eager',
            onerror: event => event.currentTarget.replaceWith(photoPlaceholder(index)) })
            : photoPlaceholder(index)))),
      el('div', { class: 'photostrip-footer' },
        el('span', { class: 'hand' }, 'khloe sakai · 2026'),
        el('span', { class: 'photostrip-heart', 'aria-hidden': 'true' }, '♡'))));

        
  // The sixth favorite opens an independent, editable graphic design book.
  // Edit the journal's pages and image paths in sketchbook-data.js (designJournal).
  const journalData = D.designJournal || {};
  const journalSpreads = Array.isArray(journalData.pages) ? journalData.pages : [];
  const journalBook = el('div', { class: 'journal-book-spread' });
  const journalCount = el('span', { class: 'journal-book-count hand', 'aria-live': 'polite' });
  const previousJournal = el('button', { type: 'button', class: 'hand journal-book-arrow',
    'aria-label': 'Previous graphic design spread' }, '← previous');
  const nextJournal = el('button', { type: 'button', class: 'hand journal-book-arrow',
    'aria-label': 'Next graphic design spread' }, 'next page →');
  let activeJournalPage = 0;

  function bookPiece(piece, i) {
    const item = typeof piece === 'string' ? { label: piece } : (piece || {});
    const placeholder = () => el('div', { class: 'journal-book-placeholder' },
      el('img', { src: sticker(['blush-bloom', 'ochre-flower', 'buttercup', 'coral-flower'][i % 4]),
        alt: '', 'aria-hidden': 'true' }),
      el('span', { class: 'hand' }, 'add your artwork'));
    const visual = item.src
      ? el('img', { src: item.src, alt: item.alt || item.label || 'Graphic design project',
        loading: 'eager', onerror: event => event.currentTarget.replaceWith(placeholder()) })
      : placeholder();
    return el('figure', { class: 'journal-book-piece' }, visual,
      el('figcaption', { class: 'hand' }, item.label || `piece ${i + 1}`));
  }

  function renderJournalPage() {
    if (!journalSpreads.length) return;
    activeJournalPage = Math.max(0, Math.min(activeJournalPage, journalSpreads.length - 1));
    const page = journalSpreads[activeJournalPage];
    const pieces = Array.isArray(page.pieces) ? page.pieces : [];
    const left = el('section', { class: 'journal-book-page journal-book-page--left' },
      el('p', { class: 'hand journal-book-kicker' }, journalData.kicker || 'from my sketchbook'),
      el('p', { class: 'journal-book-numeral' }, `0${activeJournalPage + 1} / selected work`),
      el('h2', { class: 'serif journal-book-title' }, page.title || 'visual explorations'),
      el('p', { class: 'journal-book-description' }, page.description || ''),
      el('img', { class: 'journal-book-sticker', src: sticker('botanical-pair'), alt: '',
        'aria-hidden': 'true' }),
      el('p', { class: 'hand journal-book-signature' }, journalData.signature || 'khloe sakai · 2026'));
    const right = el('section', { class: 'journal-book-page journal-book-page--right' },
      el('p', { class: 'hand journal-book-side-title' }, page.caption || 'bits & pieces'),
      el('div', { class: 'journal-book-pieces' },
        ...(pieces.length ? pieces.slice(0, 4).map(bookPiece) : [bookPiece({label:'your work here'},0)])),
      el('p', { class: 'hand journal-book-side-note' }, 'a little collection, always growing'));
    journalBook.replaceChildren(left, right);
    journalCount.textContent = `${String(activeJournalPage + 1).padStart(2, '0')} / ${String(journalSpreads.length).padStart(2, '0')}`;
    previousJournal.disabled = activeJournalPage === 0;
    nextJournal.disabled = activeJournalPage === journalSpreads.length - 1;
  }
  previousJournal.addEventListener('click', () => { activeJournalPage--; renderJournalPage(); });
  nextJournal.addEventListener('click', () => { activeJournalPage++; renderJournalPage(); });
  journalDialog.append(
    el('div', { class: 'journal-dialog-heading' },
      el('span', { class: 'hand' }, 'a peek inside my sketchbook'),
      el('button', { class: 'hand journal-dialog-close', type: 'button',
        'aria-label': 'Close graphic design book', onclick: () => journalDialog.close() }, 'close ×')),
    journalBook,
    el('div', { class: 'journal-book-navigation' }, previousJournal, journalCount, nextJournal));
  journalDialog.addEventListener('click', event => {
    if (event.target === journalDialog) journalDialog.close();
  });
  journalDialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      const delta = event.key === 'ArrowRight' ? 1 : -1;
      activeJournalPage = Math.max(0, Math.min(journalSpreads.length - 1, activeJournalPage + delta));
      renderJournalPage();
    }
  });
  function openDesignJournal() {
    if (!journalSpreads.length) return;
    activeJournalPage = 0;
    renderJournalPage();
    if (!journalDialog.open) journalDialog.showModal();
  }

  const favoriteCursor = el('span', { class: 'favorite-cursor hand', 'aria-hidden': 'true' });
  const favorites = Array.isArray(D.favorites) ? D.favorites : [];
  let activeFavorite = null;
  function positionFavoriteCursor(clientX, clientY) {
    const inset = 12;
    const width = favoriteCursor.offsetWidth || 190;
    const height = favoriteCursor.offsetHeight || 34;
    favoriteCursor.style.left = `${Math.max(width / 2 + inset, Math.min(clientX, innerWidth - width / 2 - inset))}px`;
    favoriteCursor.style.top = `${Math.max(height / 2 + inset, Math.min(clientY, innerHeight - height / 2 - inset))}px`;
  }
  function showFavoriteCursor(item, x, y) {
    favoriteCursor.textContent = item.label || item.title || '';
    activeFavorite = item.id;
    favoriteCursor.classList.add('visible');
    positionFavoriteCursor(x, y);
  }
  function hideFavoriteCursor(item) {
    if (!item || activeFavorite === item.id) {
      favoriteCursor.classList.remove('visible');
      activeFavorite = null;
    }
  }
  function makeFavorite(item, index) {
    const linked = Boolean(item.href);
    const isExternal = linked && /^https?:\/\//i.test(item.href);
    const label = item.label || item.title || '';
    const picture = el(linked ? 'a' : 'button', {
      class: `favorite-item favorite-item-${index + 1}`,
      type: linked ? null : 'button',
      href: linked ? item.href : null,
      target: isExternal ? '_blank' : null,
      rel: isExternal ? 'noopener noreferrer' : null,
      'aria-label': item.journal ? 'Open graphic design portfolio book' : label
    }, el('img', { src: item.image, alt: '', loading: 'eager', draggable: 'false' }));
    picture.addEventListener('pointerenter', event => {
      if (event.pointerType !== 'touch') showFavoriteCursor(item, event.clientX, event.clientY);
    });
    picture.addEventListener('pointermove', event => {
      if (event.pointerType !== 'touch') showFavoriteCursor(item, event.clientX, event.clientY);
    });
    picture.addEventListener('pointerleave', () => hideFavoriteCursor(item));
    picture.addEventListener('focus', event => {
      if (event.target.matches(':focus-visible')) {
        const rect = picture.getBoundingClientRect();
        showFavoriteCursor(
          item,
          rect.left + rect.width / 2,
          rect.bottom + 1
        );
      }
    });
    picture.addEventListener('blur', () => hideFavoriteCursor(item));
    if (item.journal) picture.addEventListener('click', () => {
      hideFavoriteCursor(item);
      openDesignJournal();
    });
    if (!linked && !item.journal) picture.addEventListener('click', event => {
      if (event.detail === 0) return; // Keyboard clicks
      showFavoriteCursor(item, event.clientX, event.clientY);
    });
    return picture;
  }
  const favoriteBoard = el('div', { class: 'favorite-board' },
    el('p', { class: 'hand favorite-overline' }, 'a few of my favorite things'),
    el('div', { class: 'favorite-gallery' }, favorites.map(makeFavorite)));

  const aboutIntro = el('div', { class: 'about-intro' },
    el('h2', { class: 'serif' }, 'meet the designer'),
    favoriteBoard,
    el('div', { class: 'social-links' },
      el('a', { href: `mailto:${P.email}`, class: 'social-icon-link',
        'aria-label': 'Email Khloe', title: 'Send an email' },
        el('img', { src: 'assets/brand-icons/mail.svg',
          alt: '', width: '29', height: '29', onerror: logoFallback })),
      el('a', { href: P.linkedin.startsWith('http') ? P.linkedin : `https://${P.linkedin}`,
        target: '_blank', rel: 'noopener noreferrer', class: 'social-icon-link',
        'aria-label': 'LinkedIn profile' },
        el('img', { src: 'assets/brand-icons/linkedin.svg',
          alt: 'LinkedIn', width: '29', height: '29', onerror: logoFallback })),
      P.github ? el('a', { href: P.github, target: '_blank', rel: 'noopener noreferrer',
        class: 'social-icon-link', 'aria-label': 'GitHub profile' },
        el('img', { src: 'https://cdn.simpleicons.org/github/9F4C39',
          alt: 'GitHub', width: '29', height: '29', onerror: logoFallback })) : null,
      el('a', { class: 'about-resume hand', href: resumePath, download: '',
        'aria-label': 'Download resume PDF' }, 'download resume ↓')));

  const designTools = Array.isArray(D.designTools) ? D.designTools : [];
  const programmingLanguages = Array.isArray(D.programmingLanguages) ? D.programmingLanguages : [];
  const achievements = Array.isArray(P.achievements) ? P.achievements : [];
  const achievementList = className => achievements.length
    ? el('ul', { class: `achievement-list ${className || ''}` },
      achievements.map(item => el('li', {},
        el('strong', {}, item.title || ''),
        item.detail ? el('span', {}, ' · ' + item.detail) : null))) : null;
  const aboutFacts = el('div', { class: 'about-facts' },
    el('section', { class: 'about-fact education-fact' },
      el('h3', { class: 'hand' }, 'education & achievements'),
      el('strong', { class: 'serif' }, el('a', { class: 'school-name-link', href: P.schoolUrl || 'https://www.rpi.edu/',
        target: '_blank', rel: 'noopener noreferrer' }, P.school)),
      el('p', {}, P.degree),
      el('p', { class: 'meta' }, `Minor: ${P.minor} · ${P.dates}`),
      achievementList('about-achievements')),
    el('section', { class: 'about-fact' },
      el('h3', { class: 'hand' }, 'community & leadership'),
      ...D.leadership.map(l => el('p', { class: 'lead-item' }, leadershipBullet(l)))),
    el('section', { class: 'about-fact tools-fact' },
      el('h3', { class: 'hand' }, 'things i use'),
      el('div', { class: 'design-tool-grid' }, designTools.map(tool =>
        el('div', { class: 'design-tool', title: tool.name },
          el('img', { src: tool.icon, alt: tool.name, width: '36', height: '36',
            loading: 'eager', onerror: logoFallback }),
          el('span', {}, tool.name)))),
      el('h4', { class: 'hand code-heading' }, 'programming languages'),
      el('div', { class: 'language-list' }, programmingLanguages.map(language =>
        el('span', {}, language)))));

  const about = section('about', [
    [icon('lemon-brush-wash'), '-4%', '59%', size(39, 60, 230), 0, 'wash'],
    [element('pink-blossoms'), '88%', '6%', size(11, 24, 80), 7]
  ], portrait, aboutIntro, aboutFacts);

  // Navigation is next to recruiter mode rather than floating in the center.
  const navItems = [
    ['works', 'works'], ['passion', 'passion projects'], ['about', 'about me']
  ];
  const pageIds = ['home', ...navItems.map(([id]) => id)];
  const track = el('div', { id: 'track', 'aria-label': 'Sideways scrolling portfolio' }, home, works, passions, about);

  function goTo(id) {
    const target = document.getElementById(id);
    if (!target) return;
    if (inRecruiter()) { location.hash = id; return; }
    track.scrollTo({ left: target.offsetLeft, behavior: 'smooth' });
    history.replaceState(null, '', `#${id}`);
  }

  const header = el('header', { id: 'site-header' },
    el('button', { class: 'wordmark hand', type: 'button', onclick: () => goTo('home'),
      'aria-label': "Khloe's portfolio, back to home" },
      el('img', { src: sticker('coral-flower'), alt: '' }), "khloe's portfolio"),
    el('div', { class: 'header-actions' },
      el('nav', { 'aria-label': 'Portfolio sections' },
        navItems.map(([id, text]) => el('button', { class: 'nav-link hand', type: 'button',
          'data-id': id, onclick: () => goTo(id) }, text))),
      el('button', { class: 'recruiter-toggle hand', id: 'recruiter-toggle', type: 'button',
        onclick: () => { location.hash = inRecruiter() ? 'home' : 'recruiter'; } }, 'recruiter mode')));

  // A project viewed from Recruiter Mode stays in Recruiter Mode.
  // The in-modal tabs reuse the exact scrapbook content and media.
  function openRecruiterPassion(project) {
    const spread = makeStorySpread(project);
    recruiterPassionDialog.replaceChildren(
      el('div', { class: 'recruiter-passion-shell' },
        el('header', { class: 'recruiter-passion-heading' },
          el('div', {},
            el('p', { class: 'hand recruiter-passion-kicker' }, 'passion projects / from the scrapbook'),
            el('h2', { class: 'serif' }, project.title),
            el('p', { class: 'hand recruiter-passion-meta' }, `${project.role} · ${project.year}`)),
          el('button', { type: 'button', class: 'case-close hand',
            'aria-label': 'Close passion project', onclick: () => recruiterPassionDialog.close() }, 'close ×')),
        spread));
    if (!recruiterPassionDialog.open) recruiterPassionDialog.showModal();
  }
  recruiterPassionDialog.addEventListener('click', event => {
    if (event.target === recruiterPassionDialog) recruiterPassionDialog.close();
  });

  const recSection = (title, ...children) => el('section', { class: 'recruiter-section' },
    el('h2', { class: 'hand' }, title),
    ...children);
  const recProject = project => el('button', {
    class: 'recruiter-project', type: 'button',
    onclick: () => {
      if (project.scrapbook?.noPopup) openRecruiterPassion(project);
      else openProject(project);
    },
    'aria-label': project.scrapbook?.noPopup ? `View ${project.title} details` : `Read ${project.title} write-up`
  }, el('h3', { class: 'serif' }, project.title),
    el('span', { class: 'meta hand' }, `${project.role} · ${project.year}`),
    el('p', {}, project.summary));

  // Recruiter mode: school + leadership on the left; work, passion and skills on the right.
  // The three featured leadership roles have editable descriptions in sketchbook-data.js.
  const featuredLeadershipRoles = new Set(['Co-Founder', 'Work Party Manager', 'Marketing Lead', 'Lifeguard']);
  const recruiterLeadership = D.leadership.filter(item => item.featured === true ||
    (item.featured !== false && featuredLeadershipRoles.has(item.role)));
  const recSkillGroup = (title, items) => el('div', { class: 'recruiter-skill-group' },
    el('h3', { class: 'hand' }, title),
    el('div', { class: 'recruiter-skills' }, items.map(item => el('span', {}, item))));

  const recruiter = el('main', { id: 'recruiter-view' },
    el('div', { class: 'recruiter-sheet' },
      artwork([icon('coral-butterfly'), '95%', '3%', size(8, 14, 62), 12, 'recruiter-art']),
      artwork([icon('blush-brush-wash'), '-11%', '49%', size(29, 45, 200), -4, 'recruiter-art wash']),
      el('div', { class: 'recruiter-top' },
        el('div', {}, el('h1', { class: 'serif' }, P.name),
          el('p', { class: 'hand recruiter-role' }, P.eyebrow))),

        el('div', { class: 'recruiter-top-right' },
          el('div', { class: 'recruiter-contact recruiter-social-icons' },
            el('a', { href: `mailto:${P.email}`, class: 'social-icon-link',
              'aria-label': 'Email Khloe', title: 'Send an email' },
              el('img', { src: 'assets/brand-icons/mail.svg', alt: '',
                width: '29', height: '29', onerror: logoFallback })),
            el('a', { href: P.linkedin.startsWith('http') ? P.linkedin : `https://${P.linkedin}`,
              target: '_blank', rel: 'noopener noreferrer', class: 'social-icon-link',
              'aria-label': 'LinkedIn profile', title: 'LinkedIn' },
              el('img', { src: 'assets/brand-icons/linkedin.svg', alt: '',
                width: '29', height: '29', onerror: logoFallback })),
            P.github ? el('a', { href: P.github.startsWith('http') ? P.github : `https://${P.github}`,
              target: '_blank', rel: 'noopener noreferrer', class: 'social-icon-link',
              'aria-label': 'GitHub profile', title: 'GitHub' },
              el('img', { src: 'https://cdn.simpleicons.org/github/9F4C39', alt: '',
                width: '29', height: '29', onerror: logoFallback })) : null
          ),
          el('a', {
            class: 'resume-button hand', href: resumePath, download: '',
            'aria-label': 'Download resume PDF'
          }, 'download resume ↓')
        )
      ),
      el('div', { class: 'recruiter-grid' },
        el('div', { class: 'recruiter-column recruiter-background' },
          recSection('education & achievements',
            el('h3', { class: 'serif' }, el('a', { href: P.schoolUrl || 'https://www.rpi.edu/',
              target: '_blank', rel: 'noopener noreferrer', class: 'school-name-link' }, P.school)),
            el('p', {}, P.degree),
            el('p', { class: 'meta' }, `Minor: ${P.minor}`),
            el('p', { class: 'meta' }, P.dates),
            achievementList('recruiter-achievements')),
          recSection('community & leadership',
            recruiterLeadership.map(item => el('div', { class: 'recruiter-lead' },
              el('strong', {}, item.role),
              el('span', { class: 'recruiter-lead-org' }, item.org),
              item.description ? el('p', { class: 'recruiter-lead-description' }, item.description) : null)))),
        el('div', { class: 'recruiter-column recruiter-work-and-skills' },
          recSection('works', D.works.map(recProject)),
          recSection('skills',
            el('div', { class: 'recruiter-skill-grid' },
              recSkillGroup('apps i use', designTools.map(tool => tool.name)),
              recSkillGroup('programming languages', programmingLanguages),
              recSkillGroup('skills', P.skills)))),
        el('div', { class: 'recruiter-column recruiter-passions' },
          recSection('passion projects',
            D.passions.filter(project => project.featured !== false).map(recProject)))));


  let ticking = false;
  function updateNavigation() {
    const probe = track.scrollLeft + track.clientWidth * 0.43;
    let next = 'home';
    for (const id of pageIds) {
      const target = document.getElementById(id);
      if (target && target.offsetLeft <= probe) next = id;
    }
    currentPage = next;
    document.querySelectorAll('.nav-link').forEach(button => {
      const active = !inRecruiter() && button.dataset.id === next;
      button.classList.toggle('active', active);
      if (active) button.setAttribute('aria-current', 'page');
      else button.removeAttribute('aria-current');
    });
    ticking = false;
  }

  track.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(updateNavigation); }
  }, { passive: true });
  track.addEventListener('wheel', event => {
    // Mouse wheel scrolls horizontally; native horizontal trackpad gestures still work.
    if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
      event.preventDefault();
      const magnitude = event.deltaMode === 1 ? 18 : event.deltaMode === 2 ? track.clientWidth : 1;
      track.scrollLeft += event.deltaY * magnitude;
    }
  }, { passive: false });

  window.addEventListener('keydown', event => {
    if (dialog.open || journalDialog.open || recruiterPassionDialog.open || inRecruiter() || event.altKey || event.ctrlKey || event.metaKey ||
      /^(INPUT|BUTTON|A|TEXTAREA|SELECT)$/.test(event.target.tagName)) return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      track.scrollBy({ left: (event.key === 'ArrowRight' ? 1 : -1) * track.clientWidth * .72,
        behavior: 'smooth' });
    }
  });

  function route() {
    const segments = location.hash.slice(1).split('/');
    const recruiterMode = segments[0] === 'recruiter';
    const routeParts = recruiterMode ? segments.slice(1) : segments;
    body.classList.toggle('recruiter', recruiterMode);
    document.getElementById('recruiter-toggle').textContent =
      recruiterMode ? 'back to sketchbook' : 'recruiter mode';

    if (routeParts[0] === 'project') {
      const project = [...D.works, ...D.passions].find(p => p.id === routeParts[1]);
      if (project?.scrapbook?.noPopup) {
        if (recruiterMode) {
          history.replaceState(null, '', '#recruiter');
          openRecruiterPassion(project);
        } else {
          history.replaceState(null, '', '#passion');
          showPassion(project, D.passions.findIndex(p => p.id === project.id));
          track.scrollTo({ left: document.getElementById('passion').offsetLeft, behavior: 'auto' });
        }
        if (dialog.open) dialog.close();
        updateNavigation();
        return;
      }
      if (project) { openWriteup(project); updateNavigation(); return; }
      history.replaceState(null, '', recruiterMode ? '#recruiter' : '#home');
      if (dialog.open) dialog.close();
      updateNavigation();
      return;
    }
    if (dialog.open) dialog.close();
    if (!recruiterMode) {
      const page = document.getElementById(routeParts[0] || 'home');
      if (page && page.closest('#track')) track.scrollTo({ left: page.offsetLeft, behavior: 'auto' });
    }
    updateNavigation();
  }

  document.getElementById('app').append(header, track, recruiter, dialog, recruiterPassionDialog, journalDialog, favoriteCursor);
  window.addEventListener('hashchange', route);
  route();
})();
