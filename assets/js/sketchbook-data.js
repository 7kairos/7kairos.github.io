/* EDITABLE DATA FOR "ABOUT ME" AND PASSION PROJECTS */
const proj = (id, title, tone, more = {}) => ({
  id, title, tone, role: "Your role", year: "2026",
  summary: "One sentence about the problem and what you designed.",
  image: "", imageAlt: "", url: "", /* url blank = built-in write-up */
  tags: ["Product design", "UX research"],
  writeup: {
    overview: "Introduce the project and your contribution.",
    problem: "Describe the starting point and the people involved.",
    process: "Explain your research, design decisions, and iterations.",
    outcome: "Share the result, evidence, lessons, and next steps.",
    images: [] /* [{src:"assets/images/x.png", alt:"", caption:""}] */
  },
  ...more
});

window.SKETCHBOOK = {
  stickerDir: "assets/artwork",
  artwork: { works: ["ochre-flower", "rose-anemone", "burgundy-bloom"], passions: ["botanical-pair", "buttercup"] },
  profile: {
    name: "khloe sakai",
    year: "2026",
    eyebrow: "product design & ui/ux",

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
    { id: "ocean", label: "my favorite aquarium exhibit", image: "assets/artwork/hobby-jellyfish.png", href: "https://www.montereybayaquarium.org/cams-videos/live-cams/jelly-cam" }
  ],
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
  // Only entries with a `popup` object open a photo-and-description dialog.
  // Leave `src` blank until you add your own photos under assets/images/.
  leadership: [
    {
      role: "Work Party Manager",
      org: "Alpha Gamma Delta, Zeta Eta Chapter",
      url: "https://alphagammadelta.org/",
      description: "Coordinated and tracked member responsibilities, maintained organization for facility care and accountability.",
      featured: true,
      popup: {
        linkLabel: "visit alpha gamma delta",
        photos: [
          { src: "", alt: "Alpha Gamma Delta chapter photograph", caption: "chapter moments" },
          { src: "", alt: "Work party activities photograph", caption: "work party" },
          { src: "", alt: "Alpha Gamma Delta team photograph", caption: "the team" },
        ],
      },
    },
    {
      role: "Lifeguard",
      org: "Morgan Hill Aquatics Center",
      url: "https://www.morganhill.ca.gov/189/Aquatics-Center-AC",
      description: "Honed customer service skills while assisting patrons of all ages; developed effective conflict resolution & composure under high-pressure situations; trained on First Aid, water safety and Red Cross skills.",
      featured: true,
      popup: {
        linkLabel: "visit the aquatics center",
        photos: [
          { src: "", alt: "Aquatics center photograph", caption: "the pool" },
          { src: "", alt: "Lifeguard experience photograph", caption: "on duty" },
          { src: "", alt: "Aquatics team photograph", caption: "the team" },
        ],
      },
    },
    { role: "General Board Member", org: "RPI Philippine American League", featured: false },
    { role: "General Board Member", org: "RPI Club Water Polo", featured: false },
  ],
  works: [proj("work-one", "Work title one", "peach"), proj("work-two", "Work title two", "rose"), proj("work-three", "Work title three", "sand")],

  // PASSION PROJECTS Section
  passions: [
    proj("passion-one", "Music festival poster", "rose", {
      role: "Graphic design · example concept", featured: true,
      summary: "Example content to show the new scrapbook interaction. Replace this with your own poster and process.",
      tags: ["Graphic design", "Poster"],
      scrapbook: {
        iterations: [
          { label: "first sketches", image: "" },
          { label: "type studies", image: "" },
          { label: "latest poster", image: "" }
        ],
        inspirations: ["bold type", "gig posters", "warm colors"],
        playlist: { title: "add a playlist link", url: "" },
        process: "Describe how your first concepts changed, what you explored, and why you chose the final direction."
      }
    }),
    proj("passion-two", "Passion project two", "sand", {
      role: "Personal exploration", featured: true,
      scrapbook: {
        iterations: [
          { label: "early idea", image: "" },
          { label: "in progress", image: "" },
          { label: "most recent", image: "" }
        ],
        inspirations: ["reference one", "reference two"],
        playlist: { title: "add a playlist link", url: "" },
        process: "Add a few sentences about your creative process."
      }
    })
  ]
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
