# Editing the portfolio

| Update | File |
| --- | --- |
| Work cards, case studies, project images and links | [portfolio-data.js](js/portfolio-data.js) |
| Passion Project cards, scrapbook stories and links | [portfolio-data.js](js/portfolio-data.js), under `passions` |
| About Me, contact details, favorites and graphic design journal | [sketchbook-data.js](js/sketchbook-data.js) |
| Page layout, colors and scrapbook styles | [sketchbook.css](css/sketchbook.css) |
| Work write-up layout and section typography | [writeups.css](css/writeups.css) |
| Navigation, dialogs and scrapbook controls | [sketchbook.js](js/sketchbook.js) |

## Work write-ups

Edit the matching project under `works`. Keep its `id` stable so existing project links still work. Each section contains an array of paragraphs. Use a nested array for a bulleted list. The corresponding entries under `media` supply screenshots and captions.

```js
writeup: {
  overview: ["One paragraph", "Another paragraph"],
  problem: ["A short introduction", ["First issue", "Second issue"]],
  media: {
    overview: [
      { src: "assets/images/example.png", alt: "Describe the image", caption: "Optional caption" },
    ],
  },
},
```

The standard sections are `overview`, `problem`, `process`, `solution` and `outcome`. Empty sections are hidden. Add document links under `resources` to put them inside a write-up. A project with a blank `url` opens its write-up, and a project with a `url` opens that destination.

## Images and preview

Use paths relative to the homepage, such as `assets/images/example.png`. Match the filename's capitalization and include alt text. Set the downloadable résumé path in `profile.resumePdf` under `sketchbook-data.js`.

Run `python -m http.server 8000` from the repository root and open [localhost:8000](http://localhost:8000/).
