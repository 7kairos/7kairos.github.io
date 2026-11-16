/*
 * EDITABLE PORTFOLIO DATA HERE
 * ACTIVE SOURCE for Works and Passion Projects: cards, recruiter summaries, and write-ups.
 * The homepage loads this file before sketchbook-data.js; that file retains
 * About Me, favorite things and scrapbook-only extras.
 * Keep project IDs unique and stable, even when you rename a project.
 * Paths are relative to index.html: "assets/images/my-project.png".
 * A blank image keeps the designed placeholder; a blank URL opens the built-in write-up.
 * To add a project, duplicate an object in works or passions and change its id.
 * For passion projects, featured: true includes it in recruiter mode.
 */
window.PORTFOLIO = {
  profile: {
    name: "Khloe Sakai",
    year: "2026",
    tagline: "",
    favorites: [],
    github: "https://github.com/7kairos",
    photo: "",
    shortIntroduction: "[ Write a little about yourself here. ]",
    email: "khloekjs@gmail.com",
    linkedin: "https://www.linkedin.com/in/khloe-sakai",
    school: "Rensselaer Polytechnic Institute",
    degree:
      "B.S. dual: Information Technology & Web Science / Communications, Media & Design",
    minor: "Marketing",
    years: "2025–2029 (expected)",
    skills: "Computer programming, Visual & UI/UX design, Low-to-high-fidelity prototyping, Community operations, Event coordination, Cross-functional coordination, Information architecture, Stakeholder interviews and presentations, User research, and more!",
  },
  leadership: [
    {
      role: "Co-Founder",
      organization: "Digital Creator & Community Platform",
    },
    {
      role: "Marketing & Outreach Lead",
      organization: "Allies for Neurodiversity - School Club",
    },
    {
      role: "Work Party Manager",
      organization: "Alpha Gamma Delta",
    },
    {
      role: "General Board Member",
      organization: "Philippine American League",
    },
  ],
  works: [
    {
      id: "work-one",
      title: "Scam Awareness Campaign Website",
      role: "Project Manager & UI/UX Lead",
      year: "2024",
      summary: "Designed a website UI in partnership with the Santa Clara County District Attorney's Office to educate users about online scams and provide resources for scam prevention.",
      image: "assets/images/scda office commendation and recognition.jpg",
      imageAlt: "",
      // Blank url = open the built-in project write-up when the card is clicked.
      url: "",
      resources: {
        proposal: "https://canva.link/qs7ow7wi7lvijng",
        presentation: "https://canva.link/g4f2ne2zkbtf1lx",
      },
      tags: ["Project Management", "UI/UX Design", "Web Development", "User Research"],
      tone: "peach",
      featured: true,
      writeup: {
        overview:
          "[ Introduce the project: who it’s for, why it matters, and what you designed. ]",
        problem:
          "[ What challenge did you set out to solve? What did you learn from people? ]",
        process:
          "[ Share your research, sketches, decisions, iterations, and testing. ]",
        outcome:
          "[ Explain what changed, what you learned, and what you would do next. ]",
        images: [],
      },
    },
    {
      id: "work-two",
      title: "project 02",
      role: "",
      year: "2026",
      summary: "",
      image: "",
      imageAlt: "",
      url: "",
      tags: ["UX research", "Interaction"],
      tone: "rose",
      featured: true,
      writeup: {
        overview:
          "[ Introduce the project: who it’s for, why it matters, and what you designed. ]",
        problem: "[ Describe the problem and the people affected. ]",
        process: "[ Walk through your research and design process. ]",
        outcome: "[ Share the outcome and your reflections. ]",
        images: [],
      },
    },
    {
      id: "work-three",
      title: "project 03",
      role: "",
      year: "2026",
      summary: "",
      image: "",
      imageAlt: "",
      url: "",
      tags: ["UI design", "Prototyping"],
      tone: "sand",
      featured: true,
      writeup: {
        overview:
          "[ Introduce the project: who it’s for, why it matters, and what you designed. ]",
        problem: "[ Describe the problem and the people affected. ]",
        process: "[ Walk through your research and design process. ]",
        outcome: "[ Share the outcome and your reflections. ]",
        images: [],
      },
    },
  ],
  passions: [
    {
      id: "passion-one",
      title: "side project 01",
      role: "",
      year: "2026",
      summary: "",
      image: "",
      imageAlt: "",
      url: "",
      tags: ["Creative exploration"],
      tone: "rose",
      featured: true,
      writeup: {
        overview: "[ What did you make, and what inspired you? ]",
        problem: "[ What question or curiosity started this project? ]",
        process: "[ Show the experiments, iterations, and happy accidents. ]",
        outcome: "[ Share the result and what you learned along the way. ]",
        images: [],
      },
    },
    {
      id: "passion-two",
      title: "side project 02",
      role: "",
      year: "2026",
      summary: "",
      image: "",
      imageAlt: "",
      url: "",
      tags: ["Just for the joy of it"],
      tone: "sand",
      featured: true,
      writeup: {
        overview: "[ What did you make, and what inspired you? ]",
        problem: "[ What question or curiosity started this project? ]",
        process: "[ Show the experiments, iterations, and happy accidents. ]",
        outcome: "[ Share the result and what you learned along the way. ]",
        images: [],
      },
    },
  ],
  artwork: {
    stickerDirectory: "assets/artwork",
    heroMain: "apricot-poppy",
    heroAccent: "pink-blossom-sprig",
    heroTop: "golden-stars",
    heroBotanical: "pressed-daisies",
    heart: "blue-hearts",
    portrait: "sage-leafy-sprig",
    school: "gingham-washi-tape",
    recruiter: "magenta-flower",
    sectionWorks: "pencil-exclamations",
    sectionPassion: "paper-airplane",
    sectionAbout: "olive-sprig",
    gameDecor: "pencil-arrows",
    works: ["pink-pencil-rays", "tangerine-bloom", "olive-sprig"],
    passions: ["lavender-flower", "magenta-flower"],
  },
};
