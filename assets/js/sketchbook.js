(() => {
  'use strict';

  const D = window.SKETCHBOOK;
  if (!D) return;
  const P = D.profile;
  const body = document.body;
  const element = name => `assets/icons/elements/${name}.png`;
  const icon = name => `assets/icons/${name}.png`;
  const sticker = name => `${D.stickerDir}/${name}.png`;
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
  const inRecruiter = () => body.classList.contains('recruiter');
  let currentPage = 'home';

  function openProject(project) {
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

  function openWriteup(project) {
    const w = project.writeup || {};
    dialog.replaceChildren(
      el('button', { type: 'button', class: 'dialog-close hand', onclick: () => dialog.close(),
        'aria-label': 'Close project write-up' }, 'close ×'),
      el('p', { class: 'meta hand' }, `${project.role} · ${project.year}`),
      el('h2', { class: 'serif' }, project.title),
      ...[
        ['overview', 'overview'], ['problem', 'the problem'],
        ['process', 'the process'], ['outcome', 'the outcome']
      ].flatMap(([key, title]) => w[key]
        ? [el('h3', { class: 'hand' }, title), el('p', { class: 'writeup-text' }, w[key])] : []),
      ...(w.images || []).map(im => el('figure', {},
        el('img', { src: im.src, alt: im.alt || '' }),
        im.caption ? el('figcaption', { class: 'hand' }, im.caption) : null))
    );
    if (!dialog.open) dialog.showModal();
  }

  dialog.addEventListener('close', () => {
    if (location.hash.includes('project/')) {
      history.replaceState(null, '', inRecruiter() ? '#recruiter' : `#${currentPage}`);
    }
  });
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });

  const heroTitle = P.heroTitle || 'portfolio';
  const heroKicker = P.heroKicker || 'welcome to my';
  
  const useOptionThreeWordmark = heroTitle.trim().toLowerCase() === 'portfolio' &&
    heroKicker.trim().toLowerCase() === 'welcome to my';
  const heroHeading = useOptionThreeWordmark
    ? el('h1', { class: 'hero-title hero-title-reference serif', 'aria-label': `${heroKicker} ${heroTitle}` },
        el('img', {
          class: 'hero-lettering-image',
          src: 'assets/images/hero-option-three-lettering.png',
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
    [element('olive-sprig'), '3%', '7%', size(8, 20, 65), -8],
    [element('blue-dashes'), '13%', '78%', size(8, 16, 55), -10, 'small-art'],
    [icon('patchwork-star'), '82%', '7%', size(6, 12, 55), 8, 'small-art']
  ], heading('my works', 'things i made & loved'), ...D.works.map((p, i) => projectCard(p, i, 'works')));

  
  function passionArt(project, index, cssClass) {
    const src = project.image;
    const fallback = () => el('div', { class: `${cssClass} passion-flower ${project.tone || 'rose'}` },
      el('img', { src: sticker(project.sticker || D.artwork.passions[index % D.artwork.passions.length]), alt: '', draggable: 'false' }));
    return src ? el('img', { class: cssClass, src, alt: project.imageAlt || '', draggable: 'false',
      onerror: event => event.currentTarget.replaceWith(fallback()) }) : fallback();
  }

  const passionWorkspace = el('div', {
    class: 'passion-workspace', id: 'passion-workspace', role: 'region',
    'aria-label': 'Passion project scrapbook workspace'
  });

  function showPassion(project, index) {
    const sb = project.scrapbook || {};
    const iterations = sb.iterations || [
      { label: 'first idea', image: '' },
      { label: 'in progress', image: '' },
      { label: 'latest version', image: '' }
    ];
    const inspiration = sb.inspirations || ['add inspiration', 'add sketches'];
    const playlist = sb.playlist || { title: 'add your playlist', url: '' };
    const inspirationNode = (item, i) => {
      const data = typeof item === 'string' ? { label: item } : item;
      const swatch = data.image
        ? el('img', { src: data.image, alt: data.alt || data.label || 'Inspiration image',
            onerror: event => event.currentTarget.replaceWith(el('span', { class: 'inspiration-swatch' })) })
        : el('span', { class: 'inspiration-swatch' });
      return el('div', { class: 'inspiration-chip', style: `--swatch-index:${i}` },
        swatch, el('span', {}, data.label || 'reference'));
    };
    const iterationNode = (item, i) => el('figure', { class: 'passion-iteration' },
      item.image
        ? el('img', { src: item.image, alt: item.alt || `${item.label || 'Iteration'} image`,
          onerror: event => event.currentTarget.replaceWith(
            el('div', { class: 'iteration-empty' },
              el('img', { src: sticker(project.sticker || D.artwork.passions[index % D.artwork.passions.length]), alt: '' }))) })
        : el('div', { class: 'iteration-empty' },
          el('img', { src: sticker(project.sticker || D.artwork.passions[index % D.artwork.passions.length]), alt: '' })),
      el('figcaption', { class: 'hand' }, item.label || `version ${i + 1}`));

    const details = el('div', { class: 'workspace-project' },
      el('div', { class: 'workspace-title' },
        el('p', { class: 'hand workspace-overline' }, 'a little closer look'),
        el('button', { type: 'button', class: 'workspace-project-title serif',
          onclick: () => openProject(project), title: 'Open full project write-up' }, project.title),
        el('p', { class: 'hand workspace-meta' }, `${project.role} · ${project.year}`)),
      el('div', { class: 'workspace-grid' },
        el('div', { class: 'workspace-feature' },
          passionArt(project, index, 'workspace-cover'),
          el('p', { class: 'workspace-summary' }, project.summary)),
        el('div', { class: 'workspace-notes' },
          el('section', { class: 'scrap-section' },
            el('h4', { class: 'hand' }, 'the iterations'),
            el('div', { class: 'iteration-strip' }, iterations.slice(0, 3).map(iterationNode))),
          el('div', { class: 'scrap-bottom' },
            el('section', { class: 'scrap-section' },
              el('h4', { class: 'hand' }, 'inspiration board'),
              el('div', { class: 'inspiration-chips' },
                inspiration.slice(0, 4).map(inspirationNode))),
            el('section', { class: 'scrap-section' },
              el('h4', { class: 'hand' }, 'playlist'),
              playlist.url
                ? el('a', { class: 'playlist-link', href: playlist.url,
                    target: '_blank', rel: 'noopener noreferrer' }, '♫ ', playlist.title, ' ↗')
                : el('p', { class: 'playlist-note' }, '♫ ', playlist.title))),
          el('section', { class: 'scrap-section process-note' },
            el('h4', { class: 'hand' }, 'the process'),
            el('p', {}, sb.process || 'Add your thoughts, experiments and design decisions here.')))));
    passionWorkspace.classList.add('has-project');
    passionWorkspace.replaceChildren(details);
    document.querySelectorAll('.passion-thumb').forEach(node => {
      node.classList.toggle('chosen', node.dataset.project === project.id);
      node.setAttribute('aria-pressed', String(node.dataset.project === project.id));
    });
  }

  passionWorkspace.append(el('div', { class: 'workspace-empty' },
    el('span', { class: 'workspace-doodle hand', 'aria-hidden': 'true' }, '✳'),
    el('p', { class: 'serif' }, 'A blank page, for now.'),
    el('span', { class: 'hand' }, 'drag a project here, or tap one in the folder')));

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
        style: `--folder-index:${i};--folder-count:${D.passions.length};`
      }, passionArt(project, i, 'passion-thumb-cover'),
      el('span', { class: 'passion-thumb-caption hand' }, project.title));
      wirePassionDrag(button, project, i);
      return button;
    })),
    el('div', { class: 'folder-front' },
      el('span', { class: 'hand' }, 'collected with love ♡')),
    el('p', { class: 'folder-hint hand' }, 'drag onto the page · or tap'));

  const passions = section('passion', [
    [icon('pink-brush-wash'), '-10%', '30%', size(40, 64, 230), 0, 'wash']
  ], el('div', { class: 'passion-spread' },
    heading('passion projects'),
    el('div', { class: 'passion-content' }, folder, passionWorkspace)));

  const portrait = el('div', { class: 'portrait-wrap' }, P.photo
    ? el('img', { class: 'portrait', src: P.photo, alt: P.photoAlt || 'Portrait' })
    : el('div', { class: 'portrait portrait-placeholder' },
        el('img', { src: sticker('coral-flower'), alt: '' }),
        el('span', { class: 'hand' }, 'your photo goes here')));

        
  const favoriteCursor = el('span', { class: 'favorite-cursor hand', 'aria-hidden': 'true' });
  const favorites = Array.isArray(D.favorites) ? D.favorites : [];
  let activeFavorite = null;
  function positionFavoriteCursor(clientX, clientY) {
    const inset = 12;
    const width = favoriteCursor.offsetWidth || 190;
    const height = favoriteCursor.offsetHeight || 34;
    favoriteCursor.style.left = `${Math.max(inset, Math.min(clientX + 16, innerWidth - width - inset))}px`;
    favoriteCursor.style.top = `${Math.max(inset, Math.min(clientY + 16, innerHeight - height - inset))}px`;
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
      'aria-label': label
    }, el('img', { src: item.image, alt: '', loading: 'eager', draggable: 'false' }));
    picture.addEventListener('pointerenter', event => {
      if (event.pointerType !== 'touch') showFavoriteCursor(item, event.clientX, event.clientY);
    });
    picture.addEventListener('pointermove', event => {
      if (event.pointerType !== 'touch') showFavoriteCursor(item, event.clientX, event.clientY);
    });
    picture.addEventListener('pointerleave', () => hideFavoriteCursor(item));
    picture.addEventListener('focus', () => {
      const rect = picture.getBoundingClientRect();
      showFavoriteCursor(item, rect.left + rect.width / 2, rect.bottom + 1);
    });
    picture.addEventListener('blur', () => hideFavoriteCursor(item));
    if (!linked) picture.addEventListener('click', () => {
      const rect = picture.getBoundingClientRect();
      showFavoriteCursor(item, rect.left + rect.width / 2, rect.bottom + 1);
    });
    return picture;
  }
  const favoriteBoard = el('div', { class: 'favorite-board' },
    el('p', { class: 'hand favorite-overline' }, 'a few of my favorite things ♡'),
    el('div', { class: 'favorite-gallery' }, favorites.map(makeFavorite)));

  const aboutIntro = el('div', { class: 'about-intro' },
    el('h2', { class: 'serif' }, 'meet the designer'),
    favoriteBoard,
    el('div', { class: 'social-links' },
      el('a', { href: `mailto:${P.email}`, class: 'hand hello-link' }, 'say hello ↗'),
      el('a', { href: P.linkedin.startsWith('http') ? P.linkedin : `https://${P.linkedin}`,
        target: '_blank', rel: 'noopener noreferrer', class: 'social-icon-link',
        'aria-label': 'LinkedIn profile' },
        el('img', { src: 'assets/icons/social/linkedin.svg', alt: 'LinkedIn', width: '29', height: '29' })),
      P.github ? el('a', { href: P.github, target: '_blank', rel: 'noopener noreferrer',
        class: 'social-icon-link', 'aria-label': 'GitHub profile' },
        el('img', { src: 'assets/icons/social/github.svg', alt: 'GitHub', width: '29', height: '29' })) : null));

  const designTools = Array.isArray(D.designTools) ? D.designTools : [];
  const programmingLanguages = Array.isArray(D.programmingLanguages) ? D.programmingLanguages : [];
  const aboutFacts = el('div', { class: 'about-facts' },
    el('section', { class: 'about-fact' },
      el('h3', { class: 'hand' }, 'school'),
      el('strong', { class: 'serif' }, P.school),
      el('p', {}, P.degree),
      el('p', { class: 'meta' }, `Minor: ${P.minor} · ${P.dates}`)),
    el('section', { class: 'about-fact' },
      el('h3', { class: 'hand' }, 'leadership'),
      ...D.leadership.map(l => el('p', { class: 'lead-item' }, el('strong', {}, l.role), ` · ${l.org}`))),
    el('section', { class: 'about-fact tools-fact' },
      el('h3', { class: 'hand' }, 'things i use'),
      el('div', { class: 'design-tool-grid' }, designTools.map(tool =>
        el('div', { class: 'design-tool', title: tool.name },
          el('img', { src: tool.icon, alt: tool.name, width: '36', height: '36', loading: 'eager' }),
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

  const resumePath = P.resumePdf || 'assets/resume/khloe-sakai-resume.pdf';
  const recSection = (title, ...children) => el('section', { class: 'recruiter-section' },
    el('h2', { class: 'hand' }, title), ...children);
  const recProject = project => el('button', {
    class: 'recruiter-project', type: 'button', onclick: () => openProject(project),
    'aria-label': `Read ${project.title} write-up`
  }, el('h3', { class: 'serif' }, project.title),
    el('span', { class: 'meta hand' }, `${project.role} · ${project.year}`),
    el('p', {}, project.summary));

  const recruiter = el('main', { id: 'recruiter-view' },
    el('div', { class: 'recruiter-sheet' },
      artwork([icon('coral-butterfly'), '92%', '2%', size(8, 14, 62), 12, 'recruiter-art']),
      artwork([icon('blush-brush-wash'), '-11%', '49%', size(29, 45, 200), -4, 'recruiter-art wash']),
      el('div', { class: 'recruiter-top' },
        el('div', {}, el('h1', { class: 'serif' }, P.name),
          el('p', { class: 'hand recruiter-role' }, P.eyebrow)),
        el('div', { class: 'recruiter-contact' },
          el('a', { href: `mailto:${P.email}` }, P.email),
          el('a', { href: `https://${P.linkedin}`, target: '_blank', rel: 'noopener noreferrer' }, P.linkedin))),
      el('div', { class: 'recruiter-grid' },
        el('div', { class: 'recruiter-column' },
          recSection('education',
            el('h3', { class: 'serif' }, P.school),
            el('p', {}, P.degree),
            el('p', { class: 'meta' }, `Minor: ${P.minor}`),
            el('p', { class: 'meta' }, P.dates)),
          recSection('skills', el('div', { class: 'recruiter-skills' },
            P.skills.map(skill => el('span', {}, skill))))),
        el('div', { class: 'recruiter-column' },
          recSection('works', D.works.map(recProject))),
        el('div', { class: 'recruiter-column' },
          recSection('leadership',
            D.leadership.map(item => el('div', { class: 'recruiter-lead' },
              el('strong', {}, item.role), el('span', {}, item.org)))),
          recSection('passion projects',
            D.passions.filter(project => project.featured !== false).map(recProject)))),
      el('div', { class: 'recruiter-footer' },
        el('a', { class: 'resume-button hand', href: resumePath, download: '' },
          'download resume ↓'))));

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
    if (dialog.open || inRecruiter() || event.altKey || event.ctrlKey || event.metaKey ||
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

  document.getElementById('app').append(header, track, recruiter, dialog, favoriteCursor);
  window.addEventListener('hashchange', route);
  route();
})();
