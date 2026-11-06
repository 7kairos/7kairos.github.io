/* ALL EDITABLE CONTENT LIVES HERE (same structure as before). Save + refresh. */
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
    name: "Khloe Sakai",
    year: "2026",
    eyebrow: "product design & ui/ux",
    tagline: "Thoughtful experiences, made with a",
    accent: "little heart.",
    intro: "i love talking to people, untangling complicated things, and making them feel friendly. i pay attention to the little details that make an experience thoughtful.",
    photo: "", photoAlt: "A portrait of Khloe",
    resumePdf: "assets/resume/khloe-sakai-resume.pdf", // Add your PDF here when available.
    email: "khloekjs@gmail.com", linkedin: "linkedin.com/in/khloe-sakai",
    school: "Rensselaer Polytechnic Institute",
    degree: "B.S. Dual: Information Technology & Web Science / Communications, Media & Design",
    minor: "Marketing", dates: "Aug 2025 – May 2029 (expected)",
    skills: ["Visual & UI/UX design", "Low to high fidelity prototyping", "Figma", "Photoshop & Illustrator", "HTML / CSS / JavaScript", "Python, SQL, C#, Unity"]
  },
  leadership: [
    { role: "Co-Founder", org: "Independent Project · gaming creator community" },
    { role: "Work Party Manager", org: "Alpha Gamma Delta" },
    { role: "General Board Member", org: "Philippine American League" },
    { role: "General Board Member", org: "Club Water Polo" },
    { role: "Marketing Lead", org: "School Club · 2022–2025" }
  ],
  works: [proj("work-one", "Work title one", "peach"), proj("work-two", "Work title two", "rose"), proj("work-three", "Work title three", "sand")],
  // SAMPLE only: replace titles, cover paths and scrapbook fields with your real projects.
  // Drag a photo from the folder into the scrapbook area, or click it.
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
