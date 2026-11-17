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
  title: "RPI Lost & Found",
  role: "Student Developer · Frontend Development",
  year: "2026",
  summary: "Developing a centralized lost-and-found website to help RPI students browse reported items, find their belongings, and connect with campus lost-and-found services.",
  image: "assets/images/rpilnf items.png",
  imageAlt: "RPI Lost & Found website showing item listings, filters, and status labels",
  url: "",

  tags: [
    "Web Development",
    "React",
    "Frontend Development",
    "UI/UX Design"
  ],
  tone: "rose",
  featured: true,

  writeup: {
    overview: `What if finding something you lost on campus was as simple as checking a website?

Losing something is already frustrating enough. Having to walk between different buildings, ask around, and hope someone turned it in makes the process even more stressful.

For our Web Systems Development course, my team of five is building RPI Lost & Found, a website designed to bring campus lost-and-found information into one place.

Our idea is to give students a way to browse reported items, see where something was found, and figure out where to go to retrieve it. Instead of checking different locations individually, students could start their search online.`,

    problem: `There's a lost and found on campus, but finding out what's actually been turned in isn't always easy.

    RPI has existing lost-and-found services, including Public Safety and individual locations around campus. However, there isn't one public-facing place where students can browse everything that's been reported.

    If someone loses their keys, wallet, or water bottle, they might have to visit several buildings or contact different offices without knowing whether their belongings have even been found.

    We wanted to address three main issues:
    -  Lost belongings can end up in different locations, making it difficult to know where to start looking.
    -  Students don't have a centralized way to see reported items, their descriptions, or when and where they were found.
    -  Making lost-item information public could also make it easier for someone to falsely claim an item. We needed to consider how to make information accessible without making the retrieval process less secure.

    Our goal wasn't to replace RPI's existing lost-and-found services. We wanted to explore how a digital system could make those services easier for students to navigate.`,

    process: `We started by outlining what a student would actually need from a lost-and-found website. At the most basic level, users should be able to see a list of reported items, view information about each item, and find out where to go next.

    We also planned different levels of access. Guests would be able to browse listings, while authenticated users could report items and manage their own posts. Administrators would have additional permissions to moderate listings and manage the system.

    One of our main considerations was balancing convenience with security. We discussed possible verification requirements and ways to avoid exposing information that could allow someone to claim an item that wasn't theirs.


    We began with frontend mockups and sample lost-and-found listings before moving toward a React application. The interface includes reusable components for item cards, filters, forms, and navigation. Breaking the website into smaller components helps us maintain consistency as different teammates work on different parts of the application.

    I worked on the filtering functionality and item status styling, helping make the listings easier to navigate and distinguish. The filtering system lets users narrow down what they're looking at, while the status indicators help communicate important information about each listing without requiring someone to read every detail. These are relatively small interface decisions, but they contribute to the overall goal of making the website straightforward and easy to use.


    Alongside the frontend, our team is developing the backend using Laravel and MySQL. Our architecture separates the application into three main parts: the React frontend, the Laravel API, and the MySQL database. Docker helps us run these services together in a consistent development environment.

    We've also been planning how users will create, update, and manage listings through the API, as well as how permissions should work for ordinary users and administrators. Because we're working as a team, we've been using GitHub to organize changes and keep different parts of the project moving forward.`,

    solution: `The website is designed around a simple idea: students should be able to find useful information about lost items before having to visit a physical location.

    The browsing page displays reported belongings with photographs, descriptions, locations, dates, and item statuses. Students can see what's been reported without visiting multiple campus offices.

    Users can switch between All, Lost, and Found to narrow down the displayed items. Colored labels help distinguish lost items from found belongings at a glance, making the listings easier to scan. This was one of the frontend features I worked on. 

    There is also a dedicated contact page that provides information for RPI Public Safety and the Union Lost & Found, and a login page. Our planned authentication system will allow registered users to manage listings, with additional permissions for administrators.

    The frontend currently uses sample item data for parts of the browsing experience while we continue working on backend integration and database functionality.`,

    outcome: `Still in progress!

    So far, we've established the project's overall structure, created frontend mockups, built reusable React components, and set up the Laravel and MySQL development environment. We've also developed the browsing interface and worked on filtering and item status indicators. Our next steps include connecting the frontend to the backend, completing database functionality, implementing authentication, and testing the full experience.

    One thing this project has shown me is how much planning goes into something that initially sounds pretty simple. A lost-and-found website might seem like it just needs a list of items and a search function, but once we started thinking about how people would actually use it, we had to consider permissions, item ownership, information organization, and how the frontend would communicate with the database.

    Working on the frontend has also helped me think more carefully about how small details affect usability. Something as simple as a filter or status label can make information much easier to understand. As we continue building the project, I'm looking forward to seeing how the different parts of our work come together into a functional application.`,

    highlights: {},

    media: {
      overview: [
        {
          src: "assets/images/rpilnf items.png",
          alt: "RPI Lost & Found homepage showing recent lost and found items",
          caption: "Our browsing interface, with item listings and filters."
        }
      ],

      problem: [
        {
          src: "assets/images/rpilnf contact.png",
          alt: "Contact page with information for RPI Public Safety and the Union Lost & Found",
          caption: "Helping students find the right campus office."
        }
      ],

      process: [
        {
          src: "assets/images/rpilnf frontend planning.png",
          alt: "Initial planning and concepts for the frontend.",
          caption: "Modeled similarly to the RPI website and color scheme."
        }
      ],

      solution: [
        {
          src: "assets/images/rpilnf items.png",
          alt: "Lost and found item browsing page with All, Lost, and Found filters",
          caption: "Browse reported belongings and filter items by status."
        },
        {
          src: "assets/images/rpilnf contact.png",
          alt: "Contact information for campus lost-and-found services",
          caption: "A dedicated page for contacting Public Safety and the Union Lost & Found."
        },
        {
          src: "assets/images/rpilnf login.png",
          alt: "RPI Lost & Found login page with username and password fields",
          caption: "The login interface."
        }
      ],

      outcome: [
        {
          src: "assets/images/rpilnf items.png",
          alt: "Current RPI Lost & Found frontend prototype",
          caption: "Current development progress — Fall 2026."
        }
      ]
    },

    images: []
  }
},
  ],
  passions: [
    {
      id: "work-three",
      title: "Digital Creator & Community Platform",
      role: "Co-Founder · Community Operations",
      year: "2025–present",
      summary: "Co-founded Milkymon, a creator community built around four regions, shared events, friendly competition, and collaboration. I focus on recruitment and the day-to-day operations behind the community.",
      image: "assets/images/milkymon-logo.png",
      imageAlt: "Pink Milkymon Regions creator-community logo",
      url: "",
      resources: {
        twitter: "https://x.com/milkymonsmp",
        wiki: "https://milkymon.miraheze.org/wiki/Help:NPC_Pages",
        video: "https://youtu.be/_ReUC4-3e90?si=sk7TUn8oR4xzfILU",
      },
      tags: ["Creator Recruitment", "Community Operations", "Event Planning", "Leadership"],
      tone: "rose",
      featured: true,
      scrapbook: {
        layout: "community",
        noPopup: true,
        description: "I co-founded Milkymon, a creator community where members join one of four regions, compete in events, earn points, and make connections through shared projects. Each region gives creators a smaller group to belong to within the larger community. The competition is a fun reason to participate, but helping people build lasting connections is the bigger goal.",
        recruitment: [
          { title: "Applications & interviews", text: "Creators submit applications for our team to review. Those who pass screening are invited to an interview." },
          { title: "Meet the Regions", text: "At an open house I organized, region leaders share projects, events, and what makes their group unique." },
          { title: "Preferences & placement", text: "Creators rank regions; I work with the team to balance their preferences with community fit." },
          { title: "Onboarding", text: "We help new members get set up, work through technical issues, and make their first connections." },
        ],
        responsibilities: [
          { title: "Recruitment & onboarding", text: "Reviewing applications, conducting interviews, determining fit and region placement, and organizing the events, information, and processes new members need." },
          { title: "Internal affairs", text: "Helping with HR conversations and conflict resolution, keeping communication consistent across leadership, and collecting feedback to improve the community." },
          { title: "Events & finances", text: "Supporting community events and tracking donations and the resources that keep our projects running. Fundraising incentives are in development." },
        ],
        stats: [
          { value: "600+", label: "applications screened" },
          { value: "75", label: "creators on the roster" },
          { value: "~50k", label: "digital impressions per month" },
          { value: "$250", label: "donations raised" },
        ],
        outcome: "Milkymon is still growing. Our creators range from around 300 Twitch followers to 500,000 YouTube subscribers, and together they reach audiences across Twitch, YouTube, TikTok, and X. I've learned that the events are only one part of running a community. Most of the work happens in the background: keeping people informed, sorting through problems, listening when something isn't working, and making sure new members don't feel lost. It's been especially rewarding to watch creators who didn't know each other start making things together.",
        links: [
          { label: "find us on Twitter", url: "https://x.com/milkymonsmp" },
          { label: "view community wiki", url: "https://milkymon.miraheze.org/wiki/Help:NPC_Pages" },
          { label: "watch creator content", url: "https://youtu.be/_ReUC4-3e90?si=sk7TUn8oR4xzfILU" },
        ],
      },
    },
    {
      id: "passion-allies-neurodiversity",
      title: "Allies for Neurodiversity",
      role: "Founding Officer · Marketing & Outreach Lead",
      year: "2022–2025",
      summary: "Helped found a school club advocating for the neurodiverse community through awareness events, teacher workshops, nonprofit partnerships, and fundraising.",
      image: "assets/images/allies-los-arboles-celebration.jpg",
      imageAlt: "Allies for Neurodiversity leading an awareness event for elementary school students",
      url: "",
      tags: ["Community Outreach", "Advocacy", "Marketing", "Event Planning"],
      tone: "peach",
      featured: true,
      // This project is explored directly in the scrapbook; no additional popup.
      scrapbook: {
        layout: "advocacy",
        noPopup: true,
        description: "I became a founding officer of Allies for Neurodiversity at Valley Christian High School and took on the role of Marketing & Outreach Lead. Our club worked to advocate for and bring awareness to the local neurodiverse community through events, workshops, and fundraisers.",
        impact: [
          { title: "national neurodiversity week", text: "Helped launch our first schoolwide awareness week, coordinating guest speakers and food sponsors, including local nonprofit leaders and Santa Clara Mayor Lisa Gillmor (2024)." },
          { title: "faculty workshops", text: "Worked with faculty and the accommodations program to share different learning styles and perspectives, emphasizing that learning isn't one-size-fits-all." },
          { title: "community outreach", text: "Partnered with elementary schools and local nonprofits for awareness workshops, holiday events, and community fundraisers." },
          { title: "behind the scenes", text: "Led and trained our marketing committee, managed the club Instagram, created schoolwide graphics, coordinated venues, catering and sponsors, and helped raise hundreds of dollars for local nonprofits." },
        ],
        gallery: [
          { label: "Los Arboles Elementary celebration", image: "assets/images/allies-los-arboles-celebration.jpg", alt: "Student leaders holding a neurodiversity awareness event with elementary students" },
          { label: "National Neurodiversity Week speaker", image: "assets/images/allies-national-neurodiversity-week-speaker.jpg", alt: "Guest speaker addressing a school audience" },
          { label: "Splash Tower fundraiser", image: "assets/images/allies-splash-tower-activity.jpg", alt: "Students taking part in an outdoor water activity" },
          { label: "Fundraising event", image: "assets/images/allies-splash-tower-fundraiser.jpg", alt: "Student participants using a water bucket splash tower" },
        ],
        link: { label: "club instagram", url: "https://www.instagram.com/allies4neurodiversity/" },
      },
    },
    {
      id: "passion-egress",
      title: "Egress — Published Game Demo",
      role: "Project Manager · Student Developer",
      year: "2024",
      summary: "Created a published 2D game demo with a four-person programming and art team during the COSMOS game-design program at UC Santa Cruz.",
      image: "assets/images/egress-title-screen.jpg",
      imageAlt: "Egress game title screen with a dark pixel-art asylum exterior",
      url: "",
      tags: ["Game Development", "Unity", "C#", "Storytelling", "Project Management"],
      tone: "rose",
      featured: true,
      scrapbook: {
        layout: "game",
        noPopup: true,
        description: "At the California State Summer School for Mathematics and Science (COSMOS) at UC Santa Cruz, I learned to develop games under the guidance of UCSC professors, balancing visual appeal, user experience, and team coordination.",
        impact: [
          { title: "narrative & interaction", text: "I directed the story and worldbuilding, and built core interactions such as character movement, object interactions, and scene transitions in Unity and C#." },
          { title: "bringing the build together", text: "I integrated programmers' code with artists' assets so the gameplay, visuals, and narrative worked as one cohesive experience." },
          { title: "project management", text: "I coordinated our four-person team across programming and art, keeping track of scope, deadlines, and the final published demo." },
          { title: "what I learned", text: "Even a small game takes a lot of coordination. Understanding both the creative and technical sides made it easier to bring everyone's work together." },
        ],
        gallery: [
          // Include the actual group photo at this path in your repository.
          { label: "egress team", image: "assets/images/cosmos egress team.jpg", alt: "Egress development team at UC Santa Cruz" },
          { label: "title screen", image: "assets/images/egress-title-screen.jpg", alt: "Pixel-art title screen of the Egress game" },
          { label: "hallway scene", image: "assets/images/egress-hallway.jpg", alt: "Gameplay scene showing a player character standing in a hallway" },
          { label: "patient record", image: "assets/images/egress-patient-record.jpg", alt: "In-game patient record interface and narrative artifact" },
        ],
        link: { label: "COSMOS — The Design of Fun from Concept to Code", url: "https://cosmos.ucsc.edu/academics/clusters/cluster-5/" },
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
