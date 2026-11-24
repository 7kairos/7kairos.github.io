# Khloe Sakai’s portfolio

A React portfolio with live Troy weather, case studies, community and leadership roles, and a matcha mug that opens a printable About receipt.

## Run locally

Use Node.js 24 LTS.

```sh
npm ci
npm run dev
```

Open the local URL printed in the terminal. The local visit counter resets when the dev server restarts.

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

## Put it on GitHub

Copy the extracted files into the root of your repository, including `.github` and `.gitignore`. Commit and push the source files. Build output is generated from the lockfile.

### GitHub Pages

1. Open **Settings → Pages** and set **Source** to **GitHub Actions**.
2. Open **Actions → Deploy to GitHub Pages** and choose **Run workflow**.

The workflow runs on demand and publishes `dist/client`. It works for both a user site such as `7kairos.github.io` and a project site under a repository path. GitHub Pages serves static files, so this build displays `order #—` on the receipt. [GitHub Pages setup](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)

### Cloudflare Worker with the shared visit counter

Keep the source in GitHub and use this hosting option if you want to show a shared order number.

1. Sign in with `npx wrangler login` and create a database with `npx wrangler d1 create khloe-portfolio-visits`.
2. Paste the returned database ID into `wrangler.jsonc`.
3. Run the migration, build, and deploy.

```sh
npx wrangler d1 migrations apply khloe-portfolio-visits --remote
npm run build
npx wrangler deploy
```

The Worker serves the site and assigns one visit number per browser-tab session. A fresh database starts at 1. [Cloudflare D1 setup](https://developers.cloudflare.com/d1/get-started/)

## Credits

The custom typing and print effects were inspired by [Motion Natural Typing](https://motion.dev/examples/js-typewriter-natural-typing) and [React Bits Pro Receipt Printer](https://pro.reactbits.dev/docs/components/receipt-printer). The case-study carousel was inspired by [React Bits Pro Skewed Carousel](https://pro.reactbits.dev/docs/components/skewed-carousel). The weather illustration was inspired by [React Bits Pro Stipple Gradient](https://pro.reactbits.dev/docs/components/stipple-gradient).
