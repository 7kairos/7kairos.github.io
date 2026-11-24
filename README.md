# Khloe Sakai’s portfolio

a website portfolio.

## Run locally

Use Node.js 24 LTS.

```sh
npm ci
npm run dev
```

## Edit the site

| File | Content |
| --- | --- |
| `src/content.json` | Introduction, majors, activity, weather location, and leadership roles |
| `src/projects.json` | Project titles, roles, dates, case-study text, highlighted phrases, and carousel images |
| `src/receipt.jsx` | About receipt text and social links |
| `src/ReceiptCollage.jsx` | Sketches and photo placeholders |
| `src/CaseStudyCarousel.jsx` | Case-study image navigation |
| `src/style.css` | Shared styles and page layouts |
| `src/receipt.css` | Printer, paper feed, and collage |
| `public/images/` | Screenshots, research visuals, and the campus map |
| `public/matcha-mug.png` and `src/assets/receipt/` | Mug and sketch artwork |
| `server/worker.js` and `drizzle/` | Shared visit counter and its database schema |

To move the weather location, update its label, latitude, longitude, and time zone together. Weather data comes from [Open-Meteo](https://open-meteo.com/).
