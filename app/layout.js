import './globals.css';
import './creative.css';
import localFont from 'next/font/local';
import { GoogleAnalytics } from '@next/third-parties/google';
import StructuredData from '@/components/StructuredData';
import { SITE_URL, SEO_PAGES, buildMetadata, siteSchema } from '@/lib/seo';

const outfit = localFont({ src: './fonts/outfit-latin.woff2', variable: '--font-outfit', display: 'swap', weight: '100 900' });

// Shared defaults; each route supplies its own title, description and canonical URL.
export const metadata = {
  ...buildMetadata(SEO_PAGES[0]),
  metadataBase: new URL(SITE_URL),
  authors: [{ name: 'Niraj Kumar Sharma', url: `${SITE_URL}/about` }],
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  verification: {
    ...(process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : {}),
    ...(process.env.BING_SITE_VERIFICATION ? { other: { 'msvalidate.01': process.env.BING_SITE_VERIFICATION } } : {}),
  },
};

// Theme color
export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#faf9f6' },
    { media: '(prefers-color-scheme: dark)', color: '#faf9f6' },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-theme="light"
      className={outfit.variable}
    >
      <head>
        {/* Prevent theme flicker */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
              try{
                document.documentElement.setAttribute('data-theme','light');
                document.documentElement.removeAttribute('data-motion');
              }catch(e){}
            })();`,
          }}
        />

        {/* Font Awesome */}
        <link
          rel="stylesheet"
          href="/fontawesome/css/all.min.css"
          crossOrigin="anonymous"
        />

        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="/fontawesome/webfonts/fa-solid-900.woff2"
          crossOrigin="anonymous"
        />

        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="/fontawesome/webfonts/fa-brands-400.woff2"
          crossOrigin="anonymous"
        />

        <StructuredData data={siteSchema} />
      </head>

      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        {children}
      </body>

      {/* Google Analytics */}
      <GoogleAnalytics gaId="G-PBWNPH0W3T" />
    </html>
  );
}
