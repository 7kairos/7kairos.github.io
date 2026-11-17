/* EDITABLE DATA FOR "ABOUT ME" AND PASSION PROJECTS */
window.SKETCHBOOK = {
  stickerDir: "assets/artwork",
  artwork: { works: ["ochre-flower", "rose-anemone", "burgundy-bloom"], passions: ["botanical-pair", "buttercup"] },
  profile: {
    name: "khloe sakai",
    year: "2026",
    eyebrow: "product management, design & ui/ux - 2026",

    heroKicker: "welcome to my",
    heroTitle: "portfolio",
    heroDescriptor: "product management, design & ui/ux",
    photo: "", photoAlt: "my photos!",
    photoStrip: ["assets/images/flower photo 1.png", "assets/images/me  (2).jpg", "assets/images/drinks (1).jpg"],
    resumePdf: "assets/resume/khloe-sakai-resume.pdf",
    email: "khloekjs@gmail.com", linkedin: "linkedin.com/in/khloe-sakai",
    github: "https://github.com/7kairos",
    school: "Rensselaer Polytechnic Institute", schoolUrl: "https://www.rpi.edu/",
    degree: "B.S. Dual: Information Technology & Web Science / Communications, Media & Design",
    minor: "Marketing", dates: "Aug 2025 – May 2029 (expected)",
    // Editable education highlights used on About Me (and the recruiter view).
    achievements: [
      { title: "Recognition and Commendation", detail: "Santa Clara County District Attorney’s Office · 2025" },
      { title: "Rensselaer Women’s Leadership Scholarship", detail: "2025–2026" },
      { title: "AMSE Artist Honors: Media Arts Track", detail: "Graduated from Valley Christian High School · 2025" },
    ],
    skills: [
      "Visual & UI/UX design", "Low- to high-fidelity prototyping",
      "Community operations", "Event coordination", "Marketing & communications"
    ]
  },
  // FAVORITE THINGS Section
  favorites: [
    { id: "matcha", label: "homemade matcha lattes", image: "assets/artwork/hobby-matcha.png" },
    { id: "music", label: "playlist-making", image: "assets/artwork/hobby-headphones.png", href: "https://open.spotify.com/user/9n7o35e91l272fnouizjp1wyy?si=f2f742a8f17a4a31" },
    { id: "games", label: "videogames!", image: "assets/artwork/hobby-game-controller.png", href: "milkymon/index.html" },
    { id: "sketches", label: "creative writing", image: "assets/artwork/hobby-sketching-pen.png" },
    { id: "ocean", label: "my favorite aquarium exhibit", image: "assets/artwork/hobby-jellyfish.png", href: "https://www.montereybayaquarium.org/cams-videos/live-cams/jelly-cam" },
    //{ id: "journal", label: "graphics portfolio", image: "assets/artwork/hobby-journal.png", journal: true }
  ],
  // GRAPHIC DESIGN BOOK — opened by clicking the watercolor journal in Favorite Things.
  // Put your own artwork under assets/images/ and replace each empty src path.
  // Add or remove pages and pieces freely; the book's navigation adjusts automatically.
  designJournal: {
    kicker: "graphic design / collected works",
    signature: "khloe sakai · 2026",
    pages: [
      {
        title: "posters & print",
        description: "Posters, layouts, and other things made for people to see out in the world. This page is ready for finished pieces and earlier versions of each design.",
        caption: "selected posters",
        pieces: [
          { src: "", label: "poster 01" },
          { src: "", label: "poster 02" },
          { src: "", label: "poster 03" },
        ],
      },
      {
        title: "visual identity",
        description: "A space for branding, typography, and the small details that help a collection of visuals feel connected.",
        caption: "identity studies",
        pieces: [
          { src: "", label: "identity 01" },
          { src: "", label: "identity 02" },
        ],
      },
      {
        title: "in the making",
        description: "Drafts, experiments, alternate directions, and anything worth remembering from the creative process.",
        caption: "sketches & iterations",
        pieces: [
          { src: "", label: "early sketches" },
          { src: "", label: "color studies" },
          { src: "", label: "final exploration" },
        ],
      },
    ],
  },
  // WHAT I USE Section
  designTools: [
    { name: "Figma", icon: "https://api.iconify.design/logos/figma.svg" },
    { name: "Adobe Illustrator", icon: "https://api.iconify.design/logos/adobe-illustrator.svg" },
    { name: "Adobe Photoshop", icon: "https://api.iconify.design/logos/adobe-photoshop.svg" },
    { name: "Adobe Lightroom", icon: "https://api.iconify.design/logos/adobe-lightroom.svg" },
    { name: "DaVinci Resolve", icon: "https://commons.wikimedia.org/wiki/Special:FilePath/Logo_DavinciResolve_Simple.svg" },
    { name: "ChatGPT", icon: "https://api.iconify.design/logos/openai-icon.svg" },
    { name: "Claude", icon: "https://api.iconify.design/fa7-brands/claude.svg" },
    { name: "Canva", icon: "assets/brand-icons/canva.svg" }
  ],
  programmingLanguages: ["Python", "HTML", "CSS", "C++", "C#", "SQL", "PHP"],
  // ABOUT ME / COMMUNITY & LEADERSHIP
  leadership: [
    {
      role: "Work Party Manager · 2026",
      org: "Alpha Gamma Delta, Zeta Eta Chapter",
      url: "https://alphagammadelta.org/",
      description: "Coordinated and tracked member responsibilities, maintained organization for facility care and accountability.",
      featured: true,
    },
    {
      role: "Lifeguard · 2023-2026",
      org: "Morgan Hill Aquatics Center",
      url: "https://www.morganhill.ca.gov/189/Aquatics-Center-AC",
      description: "Honed customer service skills while assisting patrons of all ages; developed effective conflict resolution & composure under high-pressure situations; trained on First Aid, water safety and Red Cross skills.",
      featured: true,
    },
    { role: "General Board Member", org: "RPI Philippine American League", featured: false },
    { role: "General Board Member", org: "RPI Club Water Polo", featured: false },
  ],
  works: [],
  passions: []
};


// PROJECT CONTENT BRIDGE
// The homepage loads portfolio-data.js before this file. Edit that file for
// titles, covers, summaries and write-ups. Keep scrapbook-only extras here.
// This avoids two separate sources of truth for the same project popups.
if (window.PORTFOLIO) {
  for (const category of ['works', 'passions']) {
    const source = window.PORTFOLIO[category];
    if (!Array.isArray(source)) continue;
    const existing = new Map((window.SKETCHBOOK[category] || []).map(project => [project.id, project]));
    window.SKETCHBOOK[category] = source.map(project => {
      const extras = existing.get(project.id) || {};
      return {
        ...extras,
        ...project,
        scrapbook: project.scrapbook || extras.scrapbook
      };
    });
  }
}
