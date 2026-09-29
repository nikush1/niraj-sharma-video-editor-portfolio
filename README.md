# Niraj Kumar Sharma — performance video editing portfolio

Next.js App Router portfolio for nirajvisuals.in. Refreshed on 29 September 2026 with BeastLife experience, international D2C positioning and enquiries for projects, retainers and remote roles.

## Run locally

Use Node.js 20 or newer.

```bash
npm ci
npm run dev
```

Open http://localhost:3000. For a production build:

```bash
npm run build
npm start
```

The existing Next.js 15 and React 18 dependency versions are retained in package-lock.json. Google Fonts are downloaded during the build, so that step needs network access. Images and YouTube players also use external hosts. Existing Font Awesome 6.4 icons are bundled in public/fontawesome with their license.

## What changed

- BeastLife is prominent in the hero, About page and search metadata.
- Updated location to Delhi NCR and education to final-year BTech.
- Featured seven projects on the homepage; all 17 appear on /work. The supplied BeastLife Mass Gainer Short is first on both pages.
- Focused the services on Meta/D2C ads, UGC variations and monthly editing.
- Kept the existing 2025 showreel accurately dated until a new reel is supplied.
- Removed unverified headline counters and the unsupported Adobe-certified claim.
- Preserved old project view values in the data, but hide them until individually verified.
- Added optional project brief, contribution and verified result fields.
- Fixed blank view labels, project filter visibility, navigation state and mobile menu close control.
- Simplified the cursor, improved reduced-motion handling and made content visible before JavaScript.
- Bundled icons locally and improved the mobile theme switch and dark form contrast.
- Unifies contact email as nirajsharma.work@gmail.com.

## Contact behaviour

There is no email delivery backend. The original form posted to `/` and showed success even if delivery failed. The updated form prepares a draft with the enquiry details, then lets the visitor open an email app or copy the draft. It explicitly says that nothing has been sent. Native validation is enabled. No API keys are needed.

To offer in-page sending later, add a server-side delivery provider, server-side validation and abuse protection, and only show a sent confirmation after a successful response. Never expose delivery-provider secrets through NEXT_PUBLIC variables.

## Update the work

Edit `lib/data.js`. Existing YouTube IDs and image links are retained. A project supports:

- `t`: actual project title
- `c`: `sf` for short-form or `lf` for long-form
- `y`: YouTube video ID
- `tags`: relevant format/topic tags
- `d`: duration
- `featured: true`: show on the homepage, in the same order as `PROJ`
- `brief`: actual assignment, if known
- `contribution`: what you personally did
- `result`: an approved result or metric
- `resultVerified: true`: only after checking evidence and permission
- `v` plus `viewsVerified: true`: only for a verified, shareable view count

Niraj supplied the BeastLife Mass Gainer Short (`_-4noehZq8I`) and requested it first. Its title was checked against public YouTube metadata. All 16 earlier projects are retained, and the original six featured videos follow the new entry on the homepage. No duration or performance metrics were supplied for the new Short, so those fields are left empty. Add further approved BeastLife ads and hook variants here; don't rename unrelated older work as BeastLife. Replace the generic titles for the older unnamed shorts after checking each video. No client outcomes, fresh reviews or ad results were invented.

## Before publishing

1. Add further approved BeastLife videos and one set of hook variations; curate the featured entries.
2. Check actual project titles, credits, duration, testimonials and any metrics you enable.
3. Review the existing resume link in `components/Hero.js` and replace it with your current resume if needed.
4. Replace the 2025 showreel only when a new video is ready.
5. Confirm the existing WhatsApp number, social links and selected contact email.
6. Confirm the Analytics property in `app/layout.js` is yours; it uses the supplied `G-PBWNPH0W3T` ID. Check your site's privacy requirements.
7. Test public video embeds and remote images from your deployment; availability can depend on the host and video settings.

## Deploy

This ZIP contains source code only. Redeploy this revision through your existing Vercel project by replacing the corresponding source files in its connected repository. Use `npm ci` and `npm run build`. Keep Vercel's standard Next.js deployment process; do not upload `.next` as a standalone static website. This revision has not been deployed by the assistant.

Follow `SEO_LAUNCH_CHECKLIST.md` after deployment to verify crawler access, connect Google Search Console and Bing Webmaster Tools, submit the sitemap and measure results. Search-account verification and indexing requests have not been performed.

## Search and ChatGPT discovery

All ten public pages now have descriptive titles and descriptions, canonical URLs, social sharing metadata and relevant JSON-LD. The site includes a generated sitemap, robots rules allowing OAI-SearchBot, a local 1200 × 630 share card, and a local favicon. Optional Google and Bing verification tokens are documented in `.env.local.example`; use values from your own accounts and rebuild after setting them.

Google HTML-file verification: the exact text supplied by Niraj is in `public/googleb09061c103c63eae.html`. After redeploying to Vercel, open `https://nirajvisuals.in/googleb09061c103c63eae.html` and confirm it displays `google-site-verification: googleb09061c103c63eae.html`. Then click Verify for the `https://nirajvisuals.in/` URL-prefix property in Google Search Console. Keep this file deployed after verification. This method does not require `GOOGLE_SITE_VERIFICATION`; the filename is not a meta-tag verification token. Search Console verification itself has not been completed by the assistant.

Two service pages explain Meta ad editing and UGC editing. A practical video-ad brief guide includes an editable, copyable template. The pages link to the portfolio and contact page, and remain readable without JavaScript. Crawler access helps discovery but does not guarantee Google ranking, traffic or ChatGPT recommendations.

Edit `lib/seo.js` for shared metadata, `lib/service-pages.js` for the service copy, and `app/resources/video-ad-editing-brief/page.js` for the guide. Keep visible content and structured data consistent. The sitemap date reflects this content revision; do not refresh it just because a build ran.

## Key files

Google Analytics: `app/layout.js` uses Next.js's existing `GoogleAnalytics` component with the measurement ID `G-PBWNPH0W3T`, supplied by Niraj on 29 September 2026. The prior ID was replaced. Do not add the separate raw gtag snippet as well, since the component already loads and configures the Google tag. Deploy this revision to Vercel, then visit the live site and check Realtime in the corresponding Analytics property. This source update does not change the live deployment or move historical data between properties.

- `components/Hero.js`: main positioning, image and resume link
- `components/About.js`: current and previous experience
- `components/Services.js`: primary offers
- `lib/data.js`: projects, FAQs, thumbnails and legacy certificates
- `components/Contact.js`: enquiry details and email draft
- `app/layout.js`: metadata, schema, fonts and analytics
- `app/globals.css`: existing cream/gold design, dark mode and responsive styles

## Validation

### Video playback update

The latest revision uses YouTube's standard `https://www.youtube.com/embed/VIDEO_ID` endpoint for both project videos and the showreel. Niraj reported a browser-level failure loading the previous `youtube-nocookie.com` URL. This removes that failing host from the player's requests; it does not establish the exact cause of the network failure or guarantee playback on every network. Players still load only after the visitor clicks a preview. This is the standard YouTube embed, rather than its privacy-enhanced domain.

Deploy this revision to the existing Vercel project and refresh the page. If an error still names `youtube-nocookie.com`, an older deployment or cached page is being served; this source no longer builds player URLs using that host.

Projects and the showreel share `components/YouTubePlayer.js`. The iframe now consistently sends the site's origin and a `strict-origin-when-cross-origin` referrer, enables inline playback on mobile, and keeps native controls available when autoplay is blocked. Playing frames are at least 200px tall, including small mobile long-form videos. Each active player has Retry and Watch on YouTube controls; the showreel also has a close control.

The YouTube iframe API reports actual playback, autoplay blocks and error codes. A delay message means only that playback is taking longer; an iframe load or timeout is never treated as proof of playback or video removal. All existing video IDs are retained. YouTube remains responsible for availability and embedding permissions.

The live players loaded video titles and durations during diagnosis but remained at 0:00 without a specific error. Successful public metadata responses for all 17 IDs did not establish successful streaming. After deploying, test a short-form video, long-form video and showreel on the affected device. If a video reports error 101/150, check that video's Allow embedding setting in YouTube Studio; error 153 relates to player identification/referrer. Capture the displayed error code if the problem continues.

Validation for this revision: production build passed. Focused browser checks covered homepage and /work open/close, retry cleanup, 320px mobile player dimensions, simulated YouTube playback/autoplay/error events, and continued access to the iframe and YouTube link when the API request is blocked. No JavaScript runtime errors were observed in those checks. Simulated events verify the site's response, not actual video streaming. Direct YouTube playback also stayed at 0:00 in the diagnostic browser, so the observed stall has not been isolated to portfolio code.

References: [YouTube player parameters](https://developers.google.com/youtube/player_parameters), [player events and errors](https://developers.google.com/youtube/iframe_api_reference), and [referrer requirements](https://developers.google.com/youtube/terms/required-minimum-functionality).

### Earlier checks

Production build completed successfully. Browser checks covered all seven routes, six featured / 16 total projects, short/long filters, player open/close, thumbnail dialog and Escape, required-field validation, monthly-retainer and remote-role email drafts, mobile/tablet navigation at 390px and 820px, and theme switching. No enquiries were sent. External image hosts did not load reliably in the test environment; video playback and image availability need checking on the live host.

## Homepage brand logo loop

The “Brands I’ve worked with” section appears directly below the hero. It includes BeastLife, Anakage Technologies, Homversity, GrowMedia, Media Magnetix, Techstars Startup Weekend Dhamtari, micro1, and Microsoft Learn Student Ambassadors (Rungta Chapter 1). The four earlier additions were checked against indexed content from Niraj’s LinkedIn profile; the publicly accessible Experience list is incomplete. MLSA was added at Niraj’s explicit request, with the chapter and Lead Video Editor role identified. Labels also distinguish the Dhamtari event and micro1’s AI Trainer role. Logo assets are bundled in `public/brands/`; provenance and evidence are recorded in `public/brands/SOURCES.md`.

To add or remove a brand, edit `lib/brands.js`. Supply the real logo file, natural width/height, an accurate relationship label and a `tone` of `light`, `dark` or `black` for contrast. GrowMedia uses the native text wordmark from its official website. No external logo API is required.

`components/Brands.js` renders two matching groups, repeating shorter brand lists to fill the strip; `brandLoopRight` in `app/globals.css` moves the strip left to right over 34 seconds. Change the duration to adjust speed. Hover or use the Pause button to stop it. Reduced-motion preferences show each logo once in a static grid. Repeated animation copies are hidden from screen readers.

Brand-strip verification: production build passed; all local logo assets loaded; checked left-to-right travel, matching loop-group widths, pause/resume, hover pause, mobile overflow and the reduced-motion layout.

LinkedIn brand expansion: repeated the production build and focused browser checks with all seven organizations. Six local image logos and GrowMedia’s native text wordmark render correctly; the accessible list and reduced-motion grid each contain seven unique entries. Visually reviewed desktop and mobile layouts.

MLSA addition: the final strip has eight organizations. The production build passed, the official MLSA badge loaded locally, and the chapter label, accessible list and desktop/mobile layouts were checked with no horizontal overflow.

SEO verification: production build passed with ten public content routes. Production browser checks confirmed server-rendered content without JavaScript, unique titles, canonical/social URLs, valid JSON-LD and one H1 on every page. Checked all internal route links, sitemap and robots responses, readable HTML for the search crawler user agent, 404/noindex for unknown pages, the local 1200 × 630 share image, mobile guide layout and actual brief copying. Visually reviewed the desktop service page, mobile guide and share image. These checks do not measure rankings or confirm live indexing.
