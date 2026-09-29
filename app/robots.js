import { SITE_URL } from '@/lib/seo';

export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      // ChatGPT search discovery uses OAI-SearchBot, independently of GPTBot training.
      { userAgent: 'OAI-SearchBot', allow: '/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
