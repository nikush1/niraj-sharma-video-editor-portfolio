# nirajvisuals — Next.js 14 Portfolio

Full conversion of `nirajvisuals.in` from plain HTML/CSS/JS to **Next.js 14 (App Router)**.

## Tech Stack
- **Next.js 14** — App Router, server + client components
- **next/font/google** — Playfair Display + Outfit (zero FOUT)
- **CSS Modules** — none; global CSS variables for theming (preserves original design 1:1)
- No Tailwind, no extra UI libraries — pure CSS just like the original

---

## Getting Started

```bash
cd nirajvisuals-next
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
nirajvisuals-next/
├── app/
│   ├── globals.css       ← All styles (design tokens, themes, responsive)
│   ├── layout.js         ← Root layout: fonts, metadata, JSON-LD, FA CDN
│   └── page.js           ← Assembles all section components
├── components/
│   ├── ClientEffects.js  ← Cursor, progress bar, BTT, reveal observer (client)
│   ├── ThemeToggle.js    ← Light/dark sidebar toggle (client)
│   ├── Header.js         ← Sticky header + mobile nav (client)
│   ├── Hero.js           ← Hero section (server)
│   ├── ProofBar.js       ← Credentials strip (server)
│   ├── Reel.js           ← Click-to-play showreel (client)
│   ├── Stats.js          ← Count-up stat cards (client)
│   ├── Services.js       ← Service cards (server)
│   ├── Projects.js       ← Portfolio grid + filter + video lightbox (client)
│   ├── Thumbnails.js     ← Marquee gallery + image lightbox (client)
│   ├── Process.js        ← 5-step process (server)
│   ├── Testimonials.js   ← Review cards (server)
│   ├── About.js          ← About + skills (server)
│   ├── Recognition.js    ← Certificate carousel (client)
│   ├── FAQ.js            ← Accordion FAQ (client)
│   ├── Contact.js        ← Contact form with controlled inputs (client)
│   └── Footer.js         ← Footer links + socials (server)
└── lib/
    └── data.js           ← PROJ, THUMBS, FAQS, CERTS arrays
```

---

## Key Differences from HTML Version

| Feature | Original HTML | Next.js |
|---|---|---|
| Fonts | Google Fonts via `<link>` | `next/font/google` (zero-FOUT) |
| Theme init | Inline `<script>` | Same inline script in `layout.js` `<head>` |
| Form submit | Netlify Forms fetch | Controlled React state + same Netlify fetch |
| Video lightbox | Vanilla JS DOM | React state (`useState`) |
| Image lightbox | Vanilla JS DOM | React state (`useState`) |
| Count-up | IntersectionObserver | `useEffect` + IntersectionObserver |
| Carousel | setInterval + DOM | `useState` + `useRef` interval |
| Cursor / scroll | Vanilla JS | `useEffect` in `ClientEffects.js` |
| Filter tabs | DOM classList | `useState` filter |

---

## Deployment

### Vercel (recommended)
```bash
npx vercel
```

### Netlify
```bash
npm run build
# Upload the `.next` folder or connect your repo
```

For Netlify Forms to work, add `data-netlify="true"` to the `<form>` element in `Contact.js`
and add a `netlify.toml` at the project root.

---

## Customisation

- **Projects / Thumbnails / FAQs / Certs** — edit `lib/data.js`
- **Colors / tokens** — edit CSS variables in `app/globals.css` under `[data-theme="light"]` and `[data-theme="dark"]`
- **Contact backend** — swap the `fetch('/')` in `Contact.js` for Resend, EmailJS, or any API route
