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
  stickerDir: "assets/icons/stickers",
  artwork: { works: ["ochre-flower", "rose-anemone", "burgundy-bloom"], passions: ["botanical-pair", "buttercup"] },
  profile: {
    name: "khloe sakai",
    year: "2026",
    eyebrow: "product design & ui/ux",

    heroKicker: "welcome to my",
    heroTitle: "portfolio",
    heroDescriptor: "product design & ui/ux",
    photo: "", photoAlt: "A portrait of Khloe",
    resumePdf: "assets/resume/khloe-sakai-resume.pdf",
    email: "khloekjs@gmail.com", linkedin: "linkedin.com/in/khloe-sakai",
    github: "https://github.com/7kairos",
    school: "Rensselaer Polytechnic Institute",
    degree: "B.S. Dual: Information Technology & Web Science / Communications, Media & Design",
    minor: "Marketing", dates: "Aug 2025 – May 2029 (expected)",
    skills: ["Visual & UI/UX design", "Low to high fidelity prototyping", "Figma", "Photoshop & Illustrator", "HTML / CSS / JavaScript", "Python, SQL, C#, Unity"]
  },
  // FAVORITE THINGS Section
  favorites: [
    { id: "matcha", label: "homemade matcha lattes", image: "assets/icons/hobbies/matcha.png" },
    { id: "music", label: "playlist-making", image: "assets/icons/hobbies/headphones.png", href: "https://open.spotify.com/user/9n7o35e91l272fnouizjp1wyy?si=f2f742a8f17a4a31" },
    { id: "games", label: "videogames!", image: "assets/icons/hobbies/game-controller.png", href: "milkymon/index.html" },
    { id: "sketches", label: "creative writing", image: "assets/icons/hobbies/sketching-pen.png" },
    { id: "ocean", label: "my favorite aquarium exhibit", image: "assets/icons/hobbies/jellyfish.png", href: "https://www.montereybayaquarium.org/cams-videos/live-cams/jelly-cam" }
  ],
  // WHAT I USE Section
  designTools: [
    { name: "Figma", icon: "https://api.iconify.design/logos/figma.svg" },
    { name: "Adobe Illustrator", icon: "https://api.iconify.design/logos/adobe-illustrator.svg" },
    { name: "Adobe Photoshop", icon: "https://api.iconify.design/logos/adobe-photoshop.svg" },
    { name: "Adobe Lightroom", icon: "https://api.iconify.design/logos/adobe-lightroom.svg" },
    { name: "DaVinci Resolve", icon: "https://commons.wikimedia.org/wiki/Special:FilePath/Logo_DavinciResolve_Simple.svg" },
    { name: "ChatGPT", icon: "https://api.iconify.design/logos/openai-icon.svg" },
    { name: "Claude", icon: "https://api.iconify.design/fa7-brands/claude.svg" }
  ],
  programmingLanguages: ["Python", "HTML", "CSS", "C++", "C#", "SQL", "PHP"],
  leadership: [
    { role: "Co-Founder", org: "Independent Project · gaming creator community" },
    { role: "Work Party Manager", org: "Alpha Gamma Delta" },
    { role: "General Board Member", org: "Philippine American League" },
    { role: "General Board Member", org: "Club Water Polo" },
    { role: "Marketing Lead", org: "School Club · 2022–2025" }
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
