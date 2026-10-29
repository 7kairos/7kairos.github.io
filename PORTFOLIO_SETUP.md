# Khloe’s portfolio — integration with your current folder

This package fits the `7kairos.github.io` folder in your screenshot. It uses ordinary HTML, CSS, and JavaScript. There is no npm installation, build step, database, or PHP setup.

## Copy these files into your repository

1. Keep a backup of your current `index.html` before replacing it. Your screenshot shows that file has local modifications.
2. Extract the ZIP. Open the extracted `khloe-portfolio-2026` folder.
3. Copy its `index.html` into the root of `7kairos.github.io`, beside your existing `README.md`.
4. Merge the supplied `assets` folder into your existing `assets` folder. **Do not replace or delete your whole existing assets folder.**
5. Copy the new `assets/icons/stickers/` folder too. It contains all 12 transparent PNG stickers. The portfolio now uses these stickers throughout.
6. Open the root `index.html`, or use VS Code’s Live Server if you already have it. The page has no external runtime dependencies.

There is no need to change `figma mockups`, `milkymon`, your existing images or sounds, or your current `README.md`. `PORTFOLIO_SETUP.md` is a separate guide so it will not overwrite your README.

The new files are:

| Repository path                | Purpose                                                             |
| ------------------------------ | ------------------------------------------------------------------- |
| `index.html`                   | New landing page entry point.                                       |
| `assets/css/portfolio.css`     | Palette, typography, layout, responsive styling, and print rules.   |
| `assets/js/portfolio-data.js`  | **All editable content. Start here.**                               |
| `assets/js/portfolio.js`       | Navigation, project rendering, recruiter mode, write-ups, and game. |
| `assets/js/portfolio-icons.js` | Locally bundled Lucide icons.                                       |
| `assets/js/lucide-LICENSE.txt` | Icon license.                                                       |
| `assets/fonts/portfolio/`      | Local font files and their licenses.                                |

All required decorative artwork is included in `assets/icons/stickers/`. The original flower is no longer referenced. Project cover images and your photo intentionally remain placeholders. `STICKERS_PREVIEW.png` is a labeled guide to the 12 new PNGs; `STICKERS.md` lists their filenames and placements.

## Edit your content in one file

Open **`assets/js/portfolio-data.js`**. Edits there update both the full portfolio and recruiter mode. Save the file and refresh the page. There is no browser draft or export step in this version.

- `profile`: name, year, tagline, introduction, photo, contact links, school, degree, minor, dates, and skills.
- `leadership`: your positions and clubs.
- `works`: the three starter work slots.
- `passions`: the two starter passion-project slots.
- `artwork`: the sticker folder and which stickers appear in the hero, cards, about section, and recruiter view.

Project titles, images, descriptions, and write-up text are intentionally placeholders. The introduction and tagline are starting drafts you can rewrite. Education, leadership, and contact details came from your references; review them before sharing.

### Add an image or illustration

Place it inside your existing `assets/images` folder, then set its path:

```js
image: "assets/images/project-one.png",
imageAlt: "Describe what your project image shows",
```

All content paths are relative to the root `index.html`. Use forward slashes, match the filename’s capitalization, and do not put a Windows `C:\\...` path here.

Leave `image: ""` to keep the placeholder. If an image cannot load, the project cover returns to the placeholder.

### Add or edit a project

Here is the structure of one entry:

```js
{
  id: "my-project", // unique and stable; used by the write-up link
  title: "My project title",
  role: "Product designer",
  year: "2026",
  summary: "One sentence about the problem and what you designed.",
  image: "assets/images/my-project.png",
  imageAlt: "A description of the cover image",
  url: "", // blank opens the built-in write-up
  tags: ["Product design", "UX research"],
  tone: "peach", // peach, rose, or sand
  featured: true, // passion projects only: include in recruiter mode
  writeup: {
    overview: "Introduce the project and your contribution.",
    problem: "Describe the starting point and the people involved.",
    process: "Explain your research, design decisions, and iterations.",
    outcome: "Share the result, evidence, lessons, and next steps.",
    images: [
      {
        src: "assets/images/my-project-process.png",
        alt: "A description of the process image",
        caption: "An optional caption."
      }
    ]
  }
}
```

To add a fourth work or a third passion project, duplicate a whole entry inside the appropriate array and give it a new `id`. Keep a comma between entries. The section wraps additional cards and can scroll vertically when needed.

Keep IDs unchanged when you rename titles so shared links continue to work. To remove a slot, remove that entry from the array.

### Link to a write-up in your existing folders

Set a local file path:

```js
url: "milkymon/writeup.html",
```

That is a path example, not a claim that the file exists. Change it to the real file in your repository. Local links open normally in the same tab. External URLs such as `https://...` open in a new tab.

Use `url: ""` to keep the built-in write-up. Fill in `writeup.overview`, `problem`, `process`, and `outcome`. Line breaks can be written as `\n`; text is displayed as plain text rather than interpreted as HTML.

### Choose relevant passion projects for recruiters

Set `featured: false` on a passion project to leave it in the full portfolio but exclude it from recruiter mode. Set it back to `true` to include it. All work entries appear in recruiter mode.

### Change the decorative stickers

The `artwork` section assigns sticker names to places in the design. Names omit the `.png` extension:

```js
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
  passions: ["botanical-pair", "buttercup"]
}
```

To choose a sticker for one project, add a field such as `sticker: "blush-bloom"` to that project. Otherwise the cards use the artwork defaults above. New sticker filenames should use lowercase letters, numbers, and hyphens.

The stickers retain the exact original painted pixels, alpha transparency, and colors. Each was trimmed and given 8 pixels of transparent padding. No recoloring or old flower-crop rules are used. The minigame matches four distinct stickers: buttercup, rose anemone, coral flower, and crimson daisy.

## How the page behaves

- The five sections scroll sideways. Use the navigation, bottom arrows, horizontal swipe, trackpad, or mouse wheel.
- Left/Right arrow shortcuts work when focus is on the page; they do not override interactive controls.
- On small screens, cards stack inside each section. Scroll down inside a tall section; swipe sideways or use the navigation to switch sections.
- Recruiter mode is a simple vertical overview with links to each relevant write-up.
- **Print / save PDF** opens the browser’s print dialog. For a cleaner PDF, turn off the browser’s headers and footers if desired. Added content may require additional printed pages.
- The minigame has four pairs, move counting, a completion message, and replay. It has no time limit.

Shareable URL endings are:

| Ending                        | Opens                                   |
| ----------------------------- | --------------------------------------- |
| `#works`                      | Works section.                          |
| `#passion`                    | Passion projects.                       |
| `#about`                      | About section.                          |
| `#play`                       | Flower game.                            |
| `#recruiter`                  | Recruiter overview.                     |
| `#project/work-one`           | One built-in write-up.                  |
| `#recruiter/project/work-one` | A write-up over the recruiter overview. |

Replace `work-one` with the project’s actual ID.

## Visual customization

The palette is at the top of `assets/css/portfolio.css`, inside `:root`:

- `--paper`: warm ivory.
- `--rust`: terracotta headings and links.
- `--ink`: body text.
- `--muted`: supporting text.
- `--line`: subtle borders.

The typography uses locally bundled Cormorant Garamond and DM Sans. The CSS is formatted and organized so you can change it directly. No Tailwind configuration is required.

## Verification

JavaScript syntax and eight DOM-based integration tests pass, including all five write-ups, recruiter navigation, project edits shared between views, relative links, image fallback, and a complete game/replay cycle. File references and font assets were checked.

DOM tests do not verify rendered appearance, touch behavior, scroll physics, or print pagination. Browser visual verification is still pending because automatic browser security review blocked the local preview earlier. `VERIFICATION.md` records this limit. No public deployment was performed.
