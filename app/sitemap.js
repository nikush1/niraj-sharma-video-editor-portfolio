import { SEO_PAGES, absoluteUrl } from '@/lib/seo';

export default function sitemap() {
  // Update this date only when these pages are meaningfully changed.
  // Do not replace it with the build time or change it solely to appear fresh.
  return SEO_PAGES.map(page => ({
    url: absoluteUrl(page.path),
    lastModified: '2026-09-29',
  }));
}
