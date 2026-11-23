// Project cards, case studies, and scrapbook stories. Keep project IDs stable.
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
      url: "",
      resources: {
        proposal: "https://canva.link/qs7ow7wi7lvijng",
        presentation: "https://canva.link/g4f2ne2zkbtf1lx",
      },
      tags: ["Project Management", "UI/UX Design", "Web Development", "User Research"],
      tone: "peach",
      featured: true,
      writeup: {
        overview: [
          "How can we make online scam prevention resources more accessible for people of all ages and levels of technological literacy?",
          "In today's digital age, online scams are becoming increasingly sophisticated. Yet trustworthy information isn't always easy to find, especially for those with lower levels of digital literacy. This is the issue that Deputy District Attorney Phong Banh initially presented to us.",
          "As Project Lead on a four-person team, I coordinated our research and development process, organized interview findings and our written proposal, and headed the design of the website interface. We worked in collaboration with the Santa Clara County District Attorney's Office to explore an accessible, easy-to-navigate scam awareness resource for local residents. Our overarching goal was to make scam prevention and recieving aid feel less overwhelming and more approachable.",
        ],
        problem: [
          "Concern for online scams was increasing within the community, but people didn’t know where to turn for information or help.",
          "We interviewed community stakeholders, ages ranging from 12-98, and identified three recurring challenges: high concern but low awareness of resources, scattered or unreliable information, and accessibility barriers for people with lower technology literacy and non-native English speakers.",
          "Only 15% of participants in our initial research sample were aware of existing scam-related resources. While younger interviewees weren’t concerned for themselves, they were mainly concerned about older relatives who struggle with technology and don’t speak English fluently.",
          "Rather than simply building another informational website, we needed to design something that users could understand, trust, and navigate confidently.",
        ],
        process: [
          "We conducted over 40 interviews across community stakeholders, spoke with online fraud professionals, and regularly met with a community prosecutor who specialized in crime prevention.",
          "I helped organize our interview data and proposal, so that the team could find patterns and turn research into design decisions. We used an ideation exercise called “Worst Idea Ever” to explore unexpected directions before narrowing our ideas. I headed the website’s initial interface design, starting with a landing page prototype that made the website’s purpose and scam information easy to find. My teammates explored features such as quizzes, victim testimonies, and a news article segment that focused on scams.",
          "After creating these early designs, we developed a functional Wix website prototype and returned to the community for feedback.",
        ],
        solution: [
          "Our prototype brought information about four scam categories into one approachable resource. Each category used a consistent format to explain the scam: defining the warning signs, sharing protection tips, and pointing victims towards “next steps” and relevant resources. We also included a victim testimonies page to show that scams can affect anyone, regardless of technological skill.",
          "For the homepage, I focused on introducing the resource clearly and making navigation feel intuitive. Using the data from stakeholder interviews, we ended up implementing features such as included a walkthrough video, larger text, shorter descriptions, translations, and text-to-speech support. The main objective was for people with varying levels of tech literacy to find help and information without getting lost and feeling overwhelmed.",
        ],
        outcome: [
          "After returning once more to stakeholder interviews, 65% of interviewed participants indicated that a resource like ours would be useful to them or someone they knew.",
          "We presented our research, design decisions, and proposed implementation plan to representatives of the Santa Clara County District Attorney’s Office and the San Jose Police Department. This project taught me the importance of thoughtfully organized research, clear and established team communications, and turning qualitative feedback into design decisions. But most importantly, I learned that thoughtful design doesn't have to be complex. Sometimes, making information “easier” is what helps people feel confident enough to use it.",
        ],
        media: {
          problem: [
            {
              src: "assets/images/scam-research-charts.png",
              alt: "Research charts comparing scam concern and awareness of resources",
              caption: "Interview findings on scam concerns and awareness of existing resources.",
            },
          ],
          process: [
            {
              src: "assets/images/scam-prototype-explorations.png",
              alt: "Four early prototypes from Khloe, Luke, Bhavya, and Parth",
              caption: "Early concept explorations from our team, including my landing-page prototype.",
            },
          ],
          solution: [
            {
              src: "assets/images/scam-interface-desktop.png",
              alt: "Desktop homepage mockup for the scam awareness site",
              caption: "Homepage prototype",
            },
            {
              src: "assets/images/scam-interface-mobile.png",
              alt: "Three mobile views of the prototype",
              caption: "Mobile layouts and topic pages",
            },
          ],
          outcome: [
            {
              src: "assets/images/scda office commendation and recognition.jpg",
              alt: "Recognition from Santa Clara County for the project",
              caption: "Project recognition & commendation",
            },
          ],
        },
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
      tags: ["Web Development", "React", "Frontend Development", "UI/UX Design"],
      tone: "rose",
      featured: true,
      writeup: {
        overview: [
          "What if finding something you lost on campus was as simple as just checking a website? Losing something is already frustrating enough. Having to walk between different buildings, ask around, and hope someone was kind enough to turn it in makes the process even more stressful. And though RPI already has existing lost-and-found services in place, they are often hard to find or unreliable.",
          "For my Web Systems Development course, my team of 5 is building a RPI Lost & Found, a website designed to centralize the campus lost-and-found. Our main idea is to give students a way to browse “lost” items, see where an item was found, and make it easier to retrieve lost items.",
        ],
        problem: [
          "Though RPI already has existing lost-and-found services in place, they are often found inconvenient and difficult to navigate. There isn’t one singular public-facing lost & found service, but rather several scattered around campus - and with 78 buildings, finding a misplaced item isn’t as easy as one might initially assume. If someone loses their keys, wallet, or water bottle, they might have to visit several buildings or contact different offices without knowing whether their belongings have even been found.",
          "We wanted to address three main issues:",
          [
            "Lost belongings can end up in different locations, making it difficult to know where to start looking.",
            "Students don't have a centralized way to see reported items, their descriptions, or when and where they were found.",
            "Making lost-item information public could also make it easier for someone to falsely claim an item. We needed to consider how to make information accessible without making the retrieval process less secure.",
          ],
          "Our end-goal isn’t to replace RPI’s existing lost-and-found service, but rather create a digital system that makes the lost-and-found easier for the public to navigate.",
        ],
        process: [
          "We began by outlining what students would need from a lost-and-found. At the most basic level, users should be able to view a list of “found” items, view information about each item, and find out where to go next.",
          "We also planned out differing levels of access. Guests would be able to browse listings, while authenticated users could report items and manage their own posts. Administrative users would have additional permissions to moderate listings and manage the overall system.",
          "We began in Figma with frontend mockups and lost-and-found listings, before moving towards a React application. The interface includes reusable components for item cards, filters, forms, and navigation. Breaking the website into smaller components helped maintain consistency as different teammates worked on different parts of the application.",
          "We've also been planning how users will create, update, and manage listings through the API, as well as how permissions should work for ordinary users and administrators. One of our main considerations was balancing convenience with security. We discussed possible verification requirements and ways to avoid exposing information that could allow someone to claim an item that wasn't theirs.",
          "The backend was developed using Laravel and MySQL. Our architecture separates the application into three main parts: the React frontend, the Laravel API, and the MySQL database. Docker helps us run these services together in a consistent development environment. Because we're working as a team, we've been using GitHub to organize changes and keep different parts of the project moving forward.",
        ],
        solution: [
          "The main/browsing page displays reported belongings with photographs, item descriptions, location found, dates, and item statuses. Students can see what's been reported without having to visit multiple campus offices.",
          "Users can filter between tags “All”, “Lost”, and “Found” to narrow down displayed items. Colored labels help users easily distinguish the lost from found belongings. There is also a dedicated contact page that provides information for RPI Public Safety and the Union Lost & Found, and a login page. Our planned authentication system will allow registered users to manage listings, with additional permissions for administrators.",
          "The frontend currently uses sample item data for parts of the browsing experience while we continue working on backend integration and database functionality.",
        ],
        outcome: [
          "Still in progress!",
          "One thing this project has shown me is how much planning goes into something that initially sounds pretty simple. A lost-and-found website might seem like it just needs a list of items and a search function, but once we started thinking about how people would actually use it, we had to consider permissions, item ownership, information organization, and how the frontend would communicate with the database.",
        ],
        media: {
          process: [
            {
              src: "assets/images/rpilnf frontend planning.png",
              alt: "Initial planning and concepts for the frontend",
              caption: "Early frontend designs using RPI’s color scheme",
            },
          ],
          solution: [
            {
              src: "assets/images/rpilnf items.png",
              alt: "Lost and found item browsing page with All, Lost, and Found filters",
              caption: "Item listings and filters",
            },
            {
              src: "assets/images/rpilnf contact.png",
              alt: "Contact information for campus lost-and-found services",
              caption: "Campus lost-and-found contacts",
            },
            {
              src: "assets/images/rpilnf login.png",
              alt: "RPI Lost & Found login page with username and password fields",
              caption: "Login interface",
            },
          ],
        },
      },
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
