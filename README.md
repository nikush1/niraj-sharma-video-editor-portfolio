# Niraj Visuals — Light Motion Portfolio (Improved)

The restored Light Motion version of Niraj Kumar Sharma’s Next.js portfolio, with reliability and accessibility fixes. The design combines an ivory background, oversized type, coral and cobalt accents, pastel service panels and a playful composition built around the actual editing work.

## Install this update

Extract this ZIP into a new folder. Its contents start directly with `app/`, `components/`, `lib/`, `public/` and `package.json`; there is no extra project folder inside the archive.

For your existing website, copy the extracted contents into the existing Next.js repository root—the folder that already contains `package.json`—and replace matching files. Include `scripts/`, both package files and configuration files. Do not add the extraction folder as an extra subfolder. Preserve existing private environment variables and domain settings.

The lower-left corner should show a WhatsApp icon, with no Motion on/off control. If you still see Motion on/off, check which source revision and deployment your browser is displaying; that screenshot alone does not establish the cause. Updating these files does not automatically redeploy your live site.

## Run locally

Use Node.js 20 or newer. Open a terminal in the extracted project folder (the folder containing `package.json`), then run:

```bash
npm ci
npm run dev
```

Open http://localhost:3000. To build and run the production version:

```bash
npm run build
npm start
```

The project uses Next.js App Router, React and GSAP with ScrollTrigger. The lockfile records the dependency versions. `npm run dev` runs the small wrapper in `scripts/dev.mjs`, which forwards options to Next.js.

This is website source code, not a double-click HTML file. It needs the Next.js server above or a Next.js deployment.

Outfit is bundled in `app/fonts/outfit-latin.woff2`, with its license alongside it. The build does not fetch Google Fonts. Font Awesome icons and their license are bundled in `public/fontawesome/`. Dependency installation still requires access to the package registry; YouTube, Analytics and the remaining remote images require their respective hosts at runtime.

## Preserved Light Motion experience

- A GSAP opening sequence assembles oversized lettering and flying project frames, stacks the frames, sweeps a playhead across the screen and opens five shutters onto the homepage. It is skippable and can be replayed from the hero.
- The hero uses floating work cards, pointer movement, a staggered text entrance and scroll-driven movement on suitable desktop screens.
- Seven featured projects form a pinned horizontal gallery on desktop screens at least 900px wide and 700px high. Smaller screens, short desktop windows and motion-disabled views use a native horizontal gallery that visitors can swipe or scroll.
- A scrolling statement and type ribbon lead into a portrait that changes shape as it enters the page.
- Three pastel service panels stack while scrolling, followed by five numbered process steps.
- Full-screen navigation, project hover effects, a contextual play cursor, thumbnail previews and a large animated contact footer complete the redesign.

The site stays light regardless of device appearance or an older saved theme preference. There is no dark-theme switch in this version.

## Motion and WhatsApp

The lower-left floating WhatsApp button opens `+91 96935 74910` in a new tab with “Hi Niraj, I want to discuss video editing” prefilled. It replaces the former Motion on/off control. Its inline SVG uses the bundled Font Awesome WhatsApp artwork and does not depend on an icon font loading. Opening the link does not send a message automatically.

Animations still respect the browser's `prefers-reduced-motion` setting. The retired saved manual pause preference is ignored, so returning visitors are not stuck with motion disabled after the switch was removed. The brand marquee retains its local Pause/Resume button.

The opening runs once per browser tab session. Use **Replay the entrance** on the homepage to see it again. The Skip intro button, Escape or Tab dismisses it. Replay respects the device's reduced-motion preference.

## Preserved content and routes

All 17 project videos are retained: 13 short-form and four long-form. Seven remain featured on the homepage. The BeastLife Mass Gainer Short (`_-4noehZq8I`) stays first, and the existing showreel (`b9DFOfJUSyE`) remains labelled 2025. The work archive keeps its All / Short form / Long form filters.

The existing contact email, WhatsApp number, social profiles, resume link, brand relationship labels, testimonials, thumbnail collection, analytics ID and search metadata are retained. Optional project results are displayed only when marked verified; legacy view counts are not displayed.

| Route | Content |
| --- | --- |
| `/` | Homepage and featured projects |
| `/work` | All 17 edits and thumbnail gallery |
| `/about` | Editor profile and resume link |
| `/services` | Editing services |
| `/services/meta-ads-video-editing` | Meta and D2C ad editing details |
| `/services/ugc-video-editing` | UGC editing details |
| `/process` | Five-step collaboration process |
| `/reviews` | Existing client and collaborator feedback |
| `/contact` | Contact links and direct enquiry form with email/WhatsApp fallbacks |
| `/resources/video-ad-editing-brief` | Guide and editable, copyable brief |

## Contact behaviour

The contact form posts to `/api/contact`, which validates the request on the server and sends accepted enquiries through the Resend API to `nirajsharma.work@gmail.com`. Configure `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` in the hosting provider's server-side environment settings; the sending address must be verified with Resend. Do not add a `NEXT_PUBLIC_` prefix. These values are documented in `.env.local.example`.

Until the provider is configured, the endpoint returns an explicit unavailable response; the form keeps the entered values and offers a prefilled email fallback plus the existing WhatsApp link. The form includes server and client validation, duplicate-submit prevention, a honeypot field, accessible field errors, and success/failure states. A successful message means Resend accepted the request, not that inbox delivery was confirmed. Direct email, WhatsApp and social links remain available.

The honeypot provides basic bot filtering. Add a persistent rate limit or CAPTCHA at the hosting/provider layer before high-traffic promotion; no persistent rate-limiting integration is configured in this repository.

## Update the work

Edit `lib/data.js`. The project fields are:

| Field | Use |
| --- | --- |
| `t` | Actual project title |
| `c` | `sf` for short-form or `lf` for long-form |
| `y` | YouTube video ID |
| `tags` | Format and topic tags |
| `categories` | Verified filter categories: `d2c-meta`, `ugc`, `brand-stories`, `youtube-long` |
| `d` | Duration, when known |
| `featured` | Include in the homepage selection when `true` |
| `brief` | Actual assignment, when known |
| `contribution` | Niraj’s contribution |
| `result` | Approved result or metric |
| `resultVerified` | Set to `true` only after checking the result and permission to publish |

Project posters use `public/images/work-VIDEO_ID.jpg`. Add a corresponding local image when adding a project. Preserve the original IDs unless intentionally replacing work. Generic project titles should be replaced only after checking the video; do not label unrelated work as a BeastLife project.

The featured gallery and archive derive their counts from `lib/data.js`. The header still displays the current total of 17; update it if the collection changes. Filter categories are intentionally only assigned when supported by the existing project information. At present there are no projects specifically confirmed as UGC, so that filter is empty until the relevant footage/project identity is confirmed. Hero and opening poster selections are defined separately in `components/Hero.js` and `components/OpeningSequence.js`.

The portrait, showreel poster, all 17 project posters and nine thumbnail designs are local. One legacy Garba Night thumbnail and reviewer portraits retain their original remote image URLs.

## Video playback

Project videos and the showreel share `components/VideoModal.js` and `components/YouTubePlayer.js`. Playback loads after a visitor selects a video. The modal supports Escape, a close button, backdrop dismissal and focus restoration.

The player uses the standard `https://www.youtube.com/embed/VIDEO_ID` endpoint with the site origin, a `strict-origin-when-cross-origin` referrer and inline mobile playback. It provides retry and direct YouTube links. The iframe API reports playback state, autoplay blocks and errors; a slow-loading message does not claim that a video is unavailable.

Actual streaming and embedding permissions remain controlled by YouTube. Test a short-form video, a long-form video and the showreel on the live host after deployment. Errors 101/150 indicate embedding restrictions; error 153 relates to player identification or referrer information.

References: [YouTube player parameters](https://developers.google.com/youtube/player_parameters), [player events and errors](https://developers.google.com/youtube/iframe_api_reference), and [referrer requirements](https://developers.google.com/youtube/terms/required-minimum-functionality).

## Brand logos

The local brand assets and existing relationship labels are retained. Original logo colours are displayed at full opacity in larger frames. White marks use dark backgrounds; colour and black marks use white backgrounds. Anakage and Techstars are sized to compensate for padding inside their original images, and the MLSA badge retains its blue/white detail. Edit `lib/brands.js` to change the list. It includes BeastLife, Anakage Technologies, Homversity, GrowMedia, Media Magnetix, Techstars Startup Weekend Dhamtari, micro1 and Microsoft Learn Student Ambassadors (Rungta Chapter 1).

`public/brands/SOURCES.md` records asset provenance. Use an accurate relationship label when adding an organization; the existing event, student-community and AI Trainer relationships remain distinguished. GrowMedia uses its text wordmark. No external logo API is needed.

`components/Brands.js` renders the logo loop and its pause control. Duplicate visual groups are hidden from screen readers, and reduced-motion styling presents the brands without a moving loop. The redesign’s loop timing is set in `app/creative.css`.

## Search metadata and analytics

The ten public content routes retain descriptive metadata, canonical URLs, social sharing metadata and JSON-LD. The sitemap, robots rules, local favicon and share-image route remain in place. The canonical site URL is `https://nirajvisuals.in`, configured in `lib/seo.js`.

Google Analytics remains configured once through Next.js’s `GoogleAnalytics` component in `app/layout.js`, using the supplied measurement ID `G-PBWNPH0W3T`. Do not add a second raw gtag snippet. Source changes do not move historical Analytics data or modify the live deployment.

Optional Google and Bing verification tokens are documented in `.env.local.example`. The existing HTML verification file is `public/googleb09061c103c63eae.html`; it should remain deployed if used for Search Console verification. Its filename is not a meta-tag verification token. Search account verification and indexing are separate actions, not performed by this redesign.

Use `SEO_LAUNCH_CHECKLIST.md` after deployment. Edit shared metadata in `lib/seo.js`, service detail copy in `lib/service-pages.js`, and the guide in `app/resources/video-ad-editing-brief/page.js`. Keep structured data consistent with visible content. Update the sitemap content date only when appropriate for a content revision, rather than for every build.

## Publish through the existing Vercel project

After replacing the source files at the existing repository root, commit and push them to the repository connected to your Vercel project, then check the resulting deployment. If automatic deployments are disabled, deploy the updated revision through that existing project. The Vercel Root Directory must point to the folder containing `package.json`.

Use Vercel’s standard Next.js preset with `npm ci` and `npm run build`. Do not upload `.next` as a standalone static website. No deployment or live-domain change is claimed by this deliverable.

After deploying, confirm the public video embeds, external image availability, contact links and Analytics Realtime on the actual domain.

## Fixes in this improved version

- Restored the original Light Motion design and opening choreography.
- Replaced the menu's fully hidden clip-path entrance with an always-visible animated native dialog. Menu links work independently of GSAP, including on narrow screens. Escape, focus trapping and focus return are supported.
- Shared scroll-lock ownership prevents an intro, menu, video or thumbnail cleanup from unlocking another overlay or leaving the page stuck.
- Opening replay and Skip/Escape cleanup are idempotent. A deadline and page-visibility handling prevent a stalled animation from blocking the page.
- GSAP entrance animations now belong to their cleanup context, so replay and pause do not leave content hidden.
- Keyboard navigation brings the correct pinned project into view. Native gallery progress updates on scroll and resize; counts come from the collection.
- Thumbnail previews make background content inert and restore focus on close.
- The contact form rejects whitespace-only required fields and moves focus to the draft action or back to the form.
- The contact form submits to the server-side Resend endpoint when configured and preserves email/WhatsApp fallbacks when not configured.
- FAQ answer heights update when text reflows. Brand marks use original colours, per-logo sizes and contrasting frames on the light theme.

## Verification status

Latest update: brand-logo loading, original-colour rendering, desktop/mobile logo sizing, removal of the floating motion switch, and the WhatsApp button destination were checked. The final production build passed after this update.

Earlier reliability checks covered desktop and 390px/320px layouts, repeated menu open/close and Escape, menu route navigation, all 17 archive projects and the 13/4 filters, video modal focus restoration, thumbnail navigation, contact whitespace validation and draft editing, opening replay/Skip/Escape, motion pause/resume, pinned/native gallery keyboard access and progress, and FAQ expansion. No enquiries were sent.

`node --test tests/scroll-lock.test.mjs` verifies overlapping locks, reverse close order, repeated release, restored overflow and server-side safety (3 tests).

The latest public YouTube oEmbed check returned metadata for all 18 preserved video IDs (17 projects and the showreel), confirming the project titles but not successful playback or embedding permission. One discrepancy needs owner confirmation: the showreel ID `b9DFOfJUSyE` returns “Editbyamit Podcast trailer” from YouTube metadata, while the portfolio labels it a 2025 editing showreel. The ID has been preserved because no replacement URL is confirmed. Actual playback depends on YouTube, browser settings and network access; recheck embeds on the live host after deployment.

## Key files

- `components/OpeningSequence.js`: opening choreography and replay lifecycle.
- `components/ClientEffects.js`: GSAP scroll scenes, gallery pinning and motion preferences.
- `components/Hero.js`: homepage headline, floating work cards and showreel.
- `components/Projects.js`: featured gallery, archive and filters.
- `components/About.js`: profile and resume link.
- `components/Services.js` and `components/Process.js`: service panels and workflow.
- `components/Contact.js`: enquiry fields and delivery/fallback states.
- `app/api/contact/route.js`: validated server-side Resend delivery endpoint.
- `lib/data.js`: projects, FAQs, thumbnails and legacy certificates.
- `lib/brands.js`: brand list and relationship labels.
- `app/layout.js`: local font, metadata defaults and Analytics.
- `app/creative.css`: current light visual identity, responsive layouts and motion styling.
- `app/globals.css`: shared base and supporting component styles, overridden by the current design where necessary.
