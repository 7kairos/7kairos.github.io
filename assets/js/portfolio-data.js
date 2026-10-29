/*
 * EDIT YOUR PORTFOLIO HERE.
 * Everything in this file updates both the full portfolio and recruiter mode.
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
    tagline: "Thoughtful experiences, made with a little heart.",
    favorites: [
      "[ A favorite hobby ]",
      "[ A favorite place ]",
      "[ A little thing you love ]",
    ],
    github: "https://github.com/7kairos",
    photo: "",
    shortIntroduction: "[ Add a short introduction here. ]",
    email: "khloekjs@gmail.com",
    linkedin: "https://www.linkedin.com/in/khloe-sakai",
    school: "Rensselaer Polytechnic Institute",
    degree:
      "B.S. dual: Information Technology & Web Science / Communications, Media & Design",
    minor: "Marketing",
    years: "2025–2029 (expected)",
    skills: "[ Add your skills and tools ]",
  },
  leadership: [
    {
      role: "Co-Founder",
      organization: "Independent Project, gaming creator community",
    },
    {
      role: "Project Lead",
      organization: "Scam Awareness Campaign Website",
    },
    {
      role: "Marketing Lead",
      organization: "School club",
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
      title: "Work title one",
      role: "[ Your role ]",
      year: "2026",
      summary:
        "One line on the problem you explored and the difference you made.",
      image: "",
      imageAlt: "",
      url: "",
      tags: ["Product design", "UI/UX"],
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
      title: "Work title two",
      role: "[ Your role ]",
      year: "2026",
      summary:
        "One line on the problem you explored and the difference you made.",
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
      title: "Work title three",
      role: "[ Your role ]",
      year: "2026",
      summary:
        "One line on the problem you explored and the difference you made.",
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
      title: "Passion project one",
      role: "[ What it is ]",
      year: "2026",
      summary: "A little about what sparked this idea and why you made it.",
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
      title: "Passion project two",
      role: "[ What it is ]",
      year: "2026",
      summary: "A little about what sparked this idea and why you made it.",
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
    stickerDirectory: "assets/icons/stickers",
    heroMain: "coral-flower",
    heroAccent: "terracotta-poppy",
    heroTop: "golden-petals",
    heroBotanical: "botanical-stem",
    heart: "heart-rays",
    portrait: "botanical-stem",
    school: "golden-petals",
    recruiter: "blush-bloom",
    works: ["ochre-flower", "rose-anemone", "burgundy-bloom"],
    passions: ["botanical-pair", "buttercup"],
  },
};
