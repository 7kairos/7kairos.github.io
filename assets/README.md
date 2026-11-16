# My Portfolio docs

## Start here: which files should I edit?

| What you want to change | File to edit |
| --- | --- |
| Work and Passion Project titles, cards, cover images, tags, write-ups, and proposal/presentation links | **`assets/js/portfolio-data.js`** |
| About Me bio details, 3 personal photographs, favorite things, social links, tools, language list, resume, leadership descriptions, and leadership popup photos | **`assets/js/sketchbook-data.js`** |
| Passion Projects *scrapbook-only* iterations, inspiration chips, playlist and process | **`assets/js/sketchbook-data.js`** (look for `passions`, explained below) |
| Website interactions or popup layout (usually no need to edit) | `assets/js/sketchbook.js` |
| Layout, text sizes, spacing, watercolor effects, colors | `assets/css/sketchbook.css` |
| Links/scripts loaded by the homepage | `index.html` |

**Important:** `assets/js/portfolio.js` and `assets/js/portfolio-icons.js` are **older unused versions**. Your active `index.html` loads **`portfolio-data.js`, then `sketchbook-data.js`, then `sketchbook.js`**, in that order. Editing `portfolio.js` will not change the published sketchbook. The `portfolio` object in `portfolio-data.js` is the source of truth for project details; `sketchbook-data.js` adds scrapbook-only details by matching project IDs.

### File locations

- `assets/images/` — project covers, project-process images, personal photos and leadership photos. You can make subfolders like `assets/images/leadership/`.
- `assets/artwork/` — the watercolor flowers, stickers, and decorative assets that are already supplied. You generally do **not** need to change these.
- `assets/brand-icons/` — locally bundled logo SVGs such as LinkedIn and Canva.
- `assets/resume/` — add your final PDF resume here.

Paths in your data are relative to the **repository root** (the folder containing `index.html`), not relative to the JS file. Use forward slashes and **match capitalization, spaces, and file extensions exactly** (especially on GitHub Pages).

## 1. Edit a Works project

Open `assets/js/portfolio-data.js`. Under `works: [ ... ]`, find the project object by its `id`. For example:

```js
{
  id: "work-one", // Stable internal ID: keep this when renaming the title.
  title: "Scam Awareness Campaign Website",
  role: "Project Manager & UI/UX Lead",
  year: "2024",
  summary: "One or two sentences about your contribution.",
  image: "assets/images/scam-cover.jpg", // Put this file in assets/images/ first.
  imageAlt: "Screenshot of the Scam Awareness Campaign website",
  url: "", // IMPORTANT: blank = clicking the card opens your portfolio write-up.
  tags: ["Project Management", "UI/UX Design", "User Research"],
  tone: "peach", // peach, rose or sand
  writeup: {
    overview: "What this project is, who it serves, and what you owned.",
    problem: "What user or business challenge you were addressing.",
    process: "Research, decisions, sketches, prototypes, and iterations.",
    outcome: "What happened, evidence of impact, and what you learned.",
    images: [
      {
        src: "assets/images/scam-wireframes.png",
        alt: "Early wireframes for the scam prevention website",
        caption: "Early wireframe explorations"
      }
    ]
  }
}
```

**The difference between `url` and a resource link:**

- `url: ""` opens the built-in write-up when a visitor clicks a project card.
- `url: "https://..."` or `url: "some-page.html"` navigates away instead. It **does not** show the built-in write-up.
- `resources` adds separate document buttons **inside** the built-in write-up. It does not replace the write-up.

The **Scam Awareness Campaign Website** already has these live links configured in its `resources` object:

```js
url: "",
resources: {
  proposal: "https://canva.link/qs7ow7wi7lvijng",
  presentation: "https://canva.link/g4f2ne2zkbtf1lx",
},
```

When you click that card, the popup opens and displays **view proposal** and **view presentation** separately. A blank resource link renders as an unavailable placeholder rather than a broken button.

### Add, remove, or reorder a project

To add a new work, duplicate a complete `{ ... }` entry **within** the `works` array, separate entries with commas, then change its `id` to something unique, like `"campus-redesign"`. To reorder projects, move their entire objects up or down. To remove one, delete the full object and correct the surrounding commas. Keep existing IDs if you only change a title: project links use `#project/your-id`.

Adding an image to a project cover:

1. Put a JPG, PNG, WebP, or SVG in `assets/images/`.
2. Set `image: "assets/images/your-file.png"`.
3. Set a meaningful `imageAlt` for accessibility.
4. Leave `image: ""` to keep the flower placeholder.

## 2. Customize Passion Projects and the draggable scrapbook

A Passion Project has **two** connected data areas:

1. **`assets/js/portfolio-data.js` → `passions`**: change `id`, `title`, `role`, `year`, `summary`, `image`, `tags`, `writeup` and `featured`. This controls the Polaroid label, project details and recruiter list.
2. **`assets/js/sketchbook-data.js` → `passions`**: change `scrapbook` content **under the exact same `id`**. This controls the iterations, inspiration board, playlist and process shown after dragging or tapping the Polaroid.

Example scrapbook data (in `sketchbook-data.js`):

```js
proj("passion-one", "Music festival poster", "rose", {
  scrapbook: {
    iterations: [
      { label: "first sketch", image: "assets/images/poster-sketch.jpg" },
      { label: "color exploration", image: "assets/images/poster-v2.jpg" },
      { label: "final poster", image: "assets/images/poster-final.jpg" }
    ],
    inspirations: [
      { label: "concert typography", image: "assets/images/type-reference.jpg" },
      "warm colors",
      "vintage gig posters"
    ],
    playlist: { title: "songs behind this poster", url: "https://open.spotify.com/playlist/YOUR_ID" },
    process: "My design decisions and how the poster evolved."
  }
}),
```

**Make sure `id: "passion-one"` in `portfolio-data.js` matches `proj("passion-one", ...)` in `sketchbook-data.js`.** If you add a passion project with a new ID and want custom scrapbook notes, add a matching `proj(...)` entry in the sketchbook file too. If no matching entry exists, the scrapbook still opens but shows generic placeholders. `featured: false` in `portfolio-data.js` hides it only from Recruiter Mode, not from the Passion Projects page.

## 3. About Me: photos, favorites, skills and contact

Open `assets/js/sketchbook-data.js` and edit `profile`:

```js
profile: {
  name: "khloe sakai",
  year: "2026",
  photoStrip: [
    "assets/images/photostrip-1.jpg",
    "assets/images/photostrip-2.jpg",
    "assets/images/photostrip-3.jpg"
  ],
  resumePdf: "assets/resume/khloe-sakai-resume.pdf",
  email: "khloekjs@gmail.com",
  linkedin: "linkedin.com/in/khloe-sakai",
  github: "https://github.com/7kairos",
  // school, degree, minor, dates and skills also go here.
}
```

The photostrip has **three frames**. Use `""` for a frame you haven't filled yet; it shows a watercolor illustration. The three photo paths in your current uploaded file (`flower photo 1.png`, `me  (2).jpg`, `drinks (1).jpg`) are **not included in this supplied package**. Add files with those precise names to `assets/images/`, or update the paths to your real files, to replace the placeholders. The caption under the strip is **khloe sakai · 2026**. If you want to change that *label*, it currently lives in `assets/js/sketchbook.js`.

For favorite-things illustrations, edit the `favorites` array:

```js
{ id: "music", label: "playlist-making", image: "assets/artwork/hobby-headphones.png",
  href: "https://open.spotify.com/user/YOUR_PROFILE" }
```

`label` is the text that follows your mouse, `image` is the painted illustration, and `href` makes that illustration a link. Omit `href` for a nonclickable favorite. Edit `designTools` for software logos and `programmingLanguages` for the programming language chips. Edit `profile.skills` for the skill tags in Recruiter Mode.

To add your resume, put a **real PDF** at the path in `profile.resumePdf`. If the PDF isn't there, the Download Resume link won't work.

## 4. Community & Leadership popups (Alpha Gamma Delta and Lifeguard)

Open **`assets/js/sketchbook-data.js` → `leadership`**. The Alpha Gamma Delta **Work Party Manager** and **Lifeguard** entries already have `popup` settings. Clicking their bulletpoint on About Me (or the role in Recruiter Mode if listed) opens a dialog containing photos, your role description, and an optional destination link.

```js
{
  role: "Work Party Manager",
  org: "Alpha Gamma Delta, Zeta Eta Chapter",
  description: "What I did and learned in this position.",
  url: "https://alphagammadelta.org/", // Link inside the popup, NOT a direct bulletpoint link.
  featured: true, // Show in Recruiter Mode.
  popup: {
    linkLabel: "visit alpha gamma delta",
    photos: [
      { src: "assets/images/leadership/agd-1.jpg", alt: "Chapter service event", caption: "chapter moments" },
      { src: "assets/images/leadership/agd-2.jpg", alt: "Members working together", caption: "work party" },
      { src: "assets/images/leadership/agd-3.jpg", alt: "Group picture", caption: "the team" }
    ]
  }
}
```

**First add your actual photos** to `assets/images/leadership/`, and replace each `src: ""` in the current file with its path. Until then, the dialog shows three tasteful flower placeholders. `alt` describes the photo for screen readers, and `caption` labels it underneath. Change `description` and `url` whenever you need to. Remove `url` or set it to `""` to hide the link button. Change `linkLabel` to rename the link. Only entries with a `popup: { ... }` object open a dialog; other leadership entries are plain text (or an ordinary link when a `url` is provided). `featured: false` keeps a role in About Me but removes it from Recruiter Mode.

## 5. Preview and publish

From your `7kairos.github.io` repository folder in VS Code:

- Open `index.html` using VS Code **Live Server**, or run `python -m http.server 8000` in a terminal and visit `http://localhost:8000/`.
- Make changes in the correct data file, **save it**, and refresh. If nothing changes, try **Ctrl+Shift+R** / **Cmd+Shift+R** to avoid an old cached JS file.
- Open the browser's **Developer Tools → Console** for syntax errors (often a missing quote or comma), and **Network** for image `404` errors.
- Make sure the `index.html` you preview is the one in your repository root. Do **not** load the legacy `portfolio.js`.
- Commit and push the changed files to GitHub. GitHub Pages must publish from the branch/folder you configured.

**Quick syntax check** (optional, if Node.js is installed):

```bash
node --check assets/js/portfolio-data.js
node --check assets/js/sketchbook-data.js
node --check assets/js/sketchbook.js
```

## 6. Common problems

| Symptom | Check |
| --- | --- |
| Works card opens Canva instead of a popup | `url` must be `""`. Put proposal/presentation under `resources`, not `url`. |
| Edited a title but popup still shows old text | Edit **`portfolio-data.js`**, save, hard refresh. Ensure your `index.html` loads it *before* `sketchbook-data.js`. |
| Project Polaroid changes but iterations do not | Match `id` between the two files; edit `scrapbook` in `sketchbook-data.js`. |
| Photo not appearing | Check the exact `assets/images/...` path and capitalization. The file needs to exist in the repository. |
| Leadership popup shows flowers instead of photos | Fill the `popup.photos[].src` paths and upload those files. |
| Leadership row opens a website directly | Add `popup: { photos: [...] }` to that role; `url` then appears as a button **inside** the dialog. |
| Resume button goes nowhere | Add the PDF at `assets/resume/khloe-sakai-resume.pdf`, or edit `resumePdf`. |
| Changes aren't showing on GitHub Pages | Check the deployed branch/folder, look for old browser cache, and confirm the latest commit contains your updated files. |

## Notes

This site does not require external frameworks or a database. Some software logos still load from published external URLs and use a watercolor-flower fallback if unavailable. The photo slots and first few work/passions entries may contain sample content; review all public text, dates, resume contents and contact links before publishing. Avoid uploading private documents or images you don't have permission to share.
