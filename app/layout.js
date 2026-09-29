import './globals.css';
import { Playfair_Display, Outfit } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import StructuredData from '@/components/StructuredData';
import { SITE_URL, SEO_PAGES, buildMetadata, siteSchema } from '@/lib/seo';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '600', '700', '800'],
  style: ['normal', 'italic'],
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

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
    { media: '(prefers-color-scheme: light)', color: '#F9F6F1' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-theme="light"
      className={`${playfair.variable} ${outfit.variable}`}
    >
      <head>
        {/* Prevent theme flicker */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
              try{
                var t = localStorage.getItem('nk-theme');
                if(t){
                  document.documentElement.setAttribute('data-theme', t);
                } else if(window.matchMedia('(prefers-color-scheme:dark)').matches){
                  document.documentElement.setAttribute('data-theme','dark');
                }
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
