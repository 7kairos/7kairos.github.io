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
      year: "2025",
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
        overview: `How can we make online scam prevention resources more accessible for people of all ages and levels of technological literacy?

In today's digital age, online scams are becoming increasingly sophisticated, yet trustworthy information isn't always easy to find, especially for those with lower levels of digital literacy.

As Project Lead on a four-person team, I coordinated our research and development process, organized interview findings and our written proposal, and headed the design of the website interface. We worked with the Santa Clara County District Attorney's Office to explore an accessible, easy-to-navigate scam awareness resource for local residents. Our overarching goal was to make prevention feel less overwhelming and more approachable.`,
        problem: `People were concerned about scams, but didn't know where to turn for help.

Through interviews with stakeholders ranging from teenagers to seniors, we identified three recurring challenges: high concern but low awareness of resources, scattered or unreliable information, and accessibility barriers for people with limited technological experience.

Only 15% of participants in our initial research sample were aware of existing scam-related resources. Younger interviewees were often particularly concerned about older relatives who were less comfortable with technology or weren't fluent in English.

Rather than simply building another informational website, we needed to design something people could understand, trust, and navigate confidently.`,
        process: `We conducted over 40 interviews across different age groups, spoke with online-fraud professionals, and regularly met with a community prosecutor specializing in crime prevention. I helped organize our interview data and proposal so the team could find patterns and turn research into design priorities.

We used an ideation exercise called “Worst Idea Ever” to explore unexpected directions before narrowing our ideas. I headed the website's interface design, starting with a landing-page prototype that made the website's purpose and scam categories easy to find. Teammates explored features such as quizzes, victim testimonies, and scam updates.

After creating paper sketches and digital mockups, we developed a working Wix prototype and returned to users for feedback. Their responses pushed us toward clearer categories, shorter descriptions, accessible guidance, prominent emergency resources, and more engaging visuals without unnecessary complexity.`,
        solution: `Our prototype brought information about four scam categories into one approachable experience: phishing, pig butchering, romance scams, and extortion.

Each category used a consistent format to explain the scam, explain the warning signs, share protection tips, and point visitors toward next steps and relevant resources. We also included a victim testimonies section to show that scams can affect anyone.

For the homepage, I focused on introducing the resource clearly and making navigation feel intuitive. Features we explored included a walkthrough video, larger text, translations, and text-to-speech support. The goal was for people with different levels of technical confidence to find help without feeling overwhelmed.`,
        outcome: `65% of interviewed participants indicated that a resource like ours would be useful to them or someone they knew. Their feedback reinforced the value of a centralized, clearly organized website.

Our team developed a website prototype and presented the research, design decisions, and proposed implementation plan to representatives of the Santa Clara County District Attorney's Office and San Jose Police Department. I helped organize and co-author the written proposal, including our findings, design rationale, and next steps.

This project taught me how important it is to organize research thoughtfully, establish clear priorities and team communication, and turn qualitative feedback into design decisions. But most importantly, I learned that thoughtful design doesn't have to be complex. Sometimes, making information easier to understand is what helps people feel confident enough to use it.`,
        highlights: {
          problem: [
            { value: '40+', label: 'user interviews conducted' },
            { value: '85%', label: 'initial participants unaware of scam resources' },
          ],
          outcome: [{ value: '65%', label: 'participants who said the resource would be useful' }],
        },
        // Each section has its own editable image gallery. Add or change src/caption as needed.
        media: {
          overview: [{ src: 'assets/images/scam-interface-desktop.png', alt: 'Scam awareness website desktop prototype', caption: 'The central idea: an approachable, easy-to-navigate resource.' }],
          problem: [{ src: 'assets/images/scam-research-charts.png', alt: 'Research charts comparing scam concern and awareness of resources', caption: 'Interview findings: concern about scams contrasted with low awareness of existing resources.' }],
          process: [{ src: 'assets/images/scam-prototype-explorations.png', alt: 'Four early prototypes from Khloe, Luke, Bhavya, and Parth', caption: 'Early concept explorations from our team, including my landing-page prototype.' }],
          solution: [
            { src: 'assets/images/scam-interface-desktop.png', alt: 'Desktop homepage mockup for the scam awareness site', caption: 'Homepage prototype' },
            { src: 'assets/images/scam-interface-mobile.png', alt: 'Three mobile views of the prototype', caption: 'Mobile layouts and topic pages' },
          ],
          outcome: [{ src: 'assets/images/scda office commendation and recognition.jpg', alt: 'Recognition from Santa Clara County for the project', caption: 'Project recognition & commendation' }],
        },
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
