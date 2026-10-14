# SEO launch checklist — nirajvisuals.in

Prepared 29 September 2026. This package changes the source code. The live website has not been updated, and no indexing requests have been submitted.

## What is ready

- Descriptive titles, descriptions and canonical URLs for all ten public pages.
- Server-rendered content, one main heading per page and links between relevant pages.
- Sitemap at `https://nirajvisuals.in/sitemap.xml` and crawler rules at `/robots.txt`.
- Person, website, page, breadcrumb and service structured data that describes visible content. There are no invented ratings, results or guarantees.
- Dedicated Meta ad editing and UGC editing pages, plus a practical video-ad brief guide with an editable template.
- A local social sharing image and favicon.
- Explicit access for OAI-SearchBot, which is used for ChatGPT search discovery. This is separate from GPTBot's training role.

## 1. Publish the updated code

Use your existing Next.js hosting project and domain. Install with `npm ci`, build with `npm run build`, then deploy through that host's normal Next.js process. This ZIP is source code, not a static HTML upload.

Review the service descriptions, client credits, social links, resume and contact details. Add current approved work when available. Keep only testimonials and claims you can substantiate.

After deployment, check these URLs in a private browser window:

- https://nirajvisuals.in/
- https://nirajvisuals.in/services/meta-ads-video-editing
- https://nirajvisuals.in/services/ugc-video-editing
- https://nirajvisuals.in/resources/video-ad-editing-brief
- https://nirajvisuals.in/robots.txt
- https://nirajvisuals.in/sitemap.xml
- https://nirajvisuals.in/opengraph-image

Confirm that public pages return HTTP 200, load without a login, show the intended content and have no unintended `noindex` header or tag. Verify HTTPS and redirect alternate domain versions to the intended domain. Check remote images and YouTube videos on the actual deployment.

## 2. Connect Google Search Console

Open https://search.google.com/search-console/ using your own account.

1. For the supplied HTML-file method, use the URL-prefix property `https://nirajvisuals.in/` and select HTML file upload.
2. Deploy this source to Vercel. It includes `public/googleb09061c103c63eae.html` with the exact supplied verification text.
3. Open `https://nirajvisuals.in/googleb09061c103c63eae.html` without signing in. It must return the line `google-site-verification: googleb09061c103c63eae.html`, not a 404 or the portfolio page.
4. Click Verify in Search Console. Keep the file deployed after verification, because Google checks it again later.
5. Submit `https://nirajvisuals.in/sitemap.xml` in Sitemaps.
6. Inspect the homepage, both service pages and the brief guide with URL Inspection. If the live test succeeds, request indexing.
7. Monitor Page indexing and Performance for crawl problems, impressions and clicks.

HTML-file verification does not require an environment variable. If choosing the separate HTML meta-tag method, set `GOOGLE_SITE_VERIFICATION` to Google's meta-tag token, not the file name or file contents. The existing metadata code supports that alternative after rebuilding and redeploying. A Domain property for `nirajvisuals.in` uses DNS verification instead of this HTML file.

Submitting a sitemap or requesting indexing does not guarantee inclusion or ranking. Repeated requests do not make crawling faster. Changes can take time to appear.

## 3. Connect Bing Webmaster Tools

Open https://www.bing.com/webmasters/ in your own account. Add or import the site, complete verification and submit the same sitemap. If using Bing's HTML meta-tag method, set `BING_SITE_VERIFICATION` to its supplied token and rebuild/redeploy. No placeholder verification tokens are included.

## 4. Check ChatGPT search access

The supplied robots file allows OAI-SearchBot. Your hosting firewall or CDN also needs to permit legitimate crawler requests. Check access logs and the official OpenAI bot documentation if requests are blocked; use the documented bot IP ranges for narrowly scoped rules rather than disabling protection for everyone.

Allowing a crawler makes discovery possible. It does not guarantee that ChatGPT will cite or recommend this portfolio, or that it will appear for a particular prompt. There is no code switch that forces recommendations. GPTBot controls are independent from OAI-SearchBot; this update does not add a training-specific policy.

## 5. Build useful reasons to visit

- Publish two or three approved case studies. For each, explain the brief, audience, your contribution, editing decisions and final work. Add results only with evidence and permission.
- Link the portfolio from your real LinkedIn, YouTube and other relevant professional profiles. Use a relevant service or project page when sharing specific work.
- Ask collaborators for accurate credits and links where appropriate. Avoid purchased links, automated outreach and fabricated reviews.
- Expand the resource section with lessons from actual editing work, such as comparing hook variations or preparing creator footage. Prioritise useful examples over large numbers of generic pages.
- Review search impressions, clicks and qualified enquiries regularly. Use real query data to improve pages; do not repeat keywords unnaturally or create near-identical location pages.

## Maintenance

Keep `lib/seo.js`, the page content and sitemap aligned when adding or removing routes. The sitemap's modification date is the actual content revision date, not a generated build timestamp. Change it only when content meaningfully changes; use per-page dates when future edits affect only some pages. Update schema when your role, services or profiles change. Check the existing analytics configuration before using its reports.

## Official guidance

- Google SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Google sitemap guidance: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- Requesting a recrawl: https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl
- Google AI features and websites: https://developers.google.com/search/docs/appearance/ai-features
- OpenAI search and other crawlers: https://developers.openai.com/api/docs/bots
- Bing getting started: https://www.bing.com/webmasters/help/getting-started-checklist-66a806de

No special AI schema, keyword stuffing or hidden instructions are needed. Useful public content, clear identity, relevant links and reliable crawler access are the foundation.
