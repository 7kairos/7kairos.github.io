# Khloe's sketchbook portfolio — updated setup

This is an updated version of your existing horizontal sketchbook portfolio, built with regular HTML, CSS, and JavaScript (no npm/build step required).

## Install

1. Back up your current `index.html`.
2. Extract this ZIP and copy `index.html` into the root of `7kairos.github.io`.
3. **Merge** the supplied `assets` folder with your existing `assets` folder. Do not delete or replace unrelated project files in your repo.
4. Open `index.html` in your browser, or use VS Code Live Server. The Google Fonts link needs internet for Caveat and Cormorant Garamond; local fallbacks are supplied by CSS.

## Latest visual refinements (v4)

- Removed the pink butterfly from **Passion Projects** and **About Me**. The landing-page and recruiter decorative butterfly are unchanged.
- Removed the blue cloud from Passion Projects.
- Moved the **passion projects** title and subtitle above the folder and scrapbook, with the two interactive pieces side by side underneath.
- Removed the sage-green tape from the scrapbook instead of leaving half of it clipped by the page boundary. The rest of the watercolor/scrapbook styling remains.
- Kept the same drag-or-tap scrapbook behavior, horizontal-only scrolling, project data, write-ups, and recruiter mode.

## What changed

- All four sections (`home`, `works`, `passion`, `about`) occupy one uninterrupted ivory watercolor-paper background.
- Horizontal scroll has **no snapping** and can stop between sections. Scrolling a mouse wheel moves sideways, trackpad gestures and touch swipes work natively, and Left/Right keyboard keys move sideways. Pages cannot scroll vertically.
- Removed bottom arrows, the play page/game, old book binding holes, paper planes, and black arrow art.
- Section navigation moved next to **recruiter mode**; the current section gets a painted underline.
- Work project **entire cards** are clickable, including their titles and cover rectangles. Hovering does not underline the titles.
- Passion projects now live as loose photo cards in an illustrated folder. **Drag a photo onto the blank scrapbook page** with a mouse/pen/touch, or **click/tap a photo** for the same reveal. The page shows your iterations, inspiration images or swatches, playlist link, and process notes; selecting its title opens the full write-up.
- Empty project covers display only the selected watercolor flower. Adding a real cover image replaces the flower automatically.
- Removed the stray pressed-wildflower sticker from the landing/about artwork, and removed per-section clipping that caused flowers and watercolor washes to end at a hard vertical seam.
- Recruiter mode is a compact grouped three-column layout on desktop, and a responsive two/one-column layout on narrower screens. It now has watercolor decor and a **download resume** button at the bottom.
- Selected new art is named and saved directly in `assets/icons/` (see names below). Original artwork is retained in the ZIP; unused airplane/arrow files are no longer referenced by the running site.

## Edit your content

Edit `assets/js/sketchbook-data.js` to update your project titles, descriptions, cover images, role, dates, links, tags, and write-up sections. Both the portfolio cards and recruiter page read from the same data. A project with `url: ""` opens the built-in write-up; set a local URL if you have a separate page.

The main source files are:

- `index.html` — entry point
- `assets/css/sketchbook.css` — visual theme, horizontal layout, responsiveness
- `assets/js/sketchbook-data.js` — **content + resume PDF path**
- `assets/js/sketchbook.js` — rendering, navigation, dialogs, recruiter mode

### Add your resume

Copy the resume you send later to:

`assets/resume/khloe-sakai-resume.pdf`

The download button is already linked to this path. **It will not download until a real PDF is added.** You can rename the PDF and change `profile.resumePdf` in `assets/js/sketchbook-data.js` if needed.

### Add cover photos

Place your images in `assets/images/` and change `image: ""` to e.g. `image: "assets/images/my-project.png"` for each project. Keep each project's stable `id` if you have shared write-up links. The current portrait and flower-only empty covers are intentional. The example music-festival poster in Passion Projects is **sample content, not a claim of completed work**; replace its details before publishing.

## Customize the scrapbook folder

Open `assets/js/sketchbook-data.js`, find the `passions` array, and edit the `scrapbook` object on each entry. Example:

```js
proj("festival", "Music festival poster", "rose", {
  role: "Graphic designer",
  image: "assets/images/festival-final.png", // real cover replaces the flower
  summary: "A short project description.",
  scrapbook: {
    iterations: [
      { label: "first sketches", image: "assets/images/festival-v1.png" },
      { label: "type explorations", image: "assets/images/festival-v2.png" },
      { label: "final poster", image: "assets/images/festival-final.png" }
    ],
    inspirations: [
      { label: "concert ephemera", image: "assets/images/concert-reference.png" },
      { label: "bold typography", image: "assets/images/type-reference.png" }
    ],
    playlist: { title: "Songs behind the poster", url: "https://open.spotify.com/playlist/YOUR_ID" },
    process: "Explain how the visual direction evolved and why."
  }
})
```

Use your own real file paths and playlist URL. The example is illustrative, not a URL that already works. Blank images use watercolor flower placeholders; inspiration labels without photos use small color swatches. Only the first **three iterations** and first **four inspirations** display on the scrapbook page, to prevent vertical scrolling. The original `writeup` fields are still editable, and the project title inside the scrapbook opens that longer write-up. The folder supports additional projects, but you may want to adjust the photo overlap in `sketchbook.css` if you add several.

The drag interaction is designed for pointer devices; selecting a photo normally with mouse, keyboard, or touch is the equivalent non-drag action. On narrower screens, keep scrolling **sideways** to reach the scrapbook workspace. The folder page does not get its own vertical scrollbar.

## New named decorative elements

New trimmed, transparent PNGs from your `Untitled design (1).zip`, saved in `assets/icons/`:

| Filename | Original |
|---|---|
| `coral-gingham-tape.png` | 1.png |
| `blue-gingham-tape.png` | 2.png |
| `sage-washi-tape.png` | 4.png |
| `grid-paper-tape.png` | 5.png |
| `blue-cloud.png` | 6.png |
| `patchwork-star.png` | 8.png |
| `coral-butterfly.png` | 9.png |
| `blush-brush-wash.png` | 10.png |
| `apricot-brush-wash.png` | 11.png |
| `pink-brush-wash.png` | 14.png |
| `lemon-brush-wash.png` | 15.png |
| `coral-paint-splash.png` | 16.png |

Not every new element is used: this keeps the design less cluttered. Other original images stay where they were for compatibility.

## Hash links

`#home`, `#works`, `#passion`, `#about`, `#recruiter`, `#project/work-one`, and `#recruiter/project/work-one` are supported. All project IDs in the data file can be linked in place of `work-one`.
