import './globals.css';
import { Playfair_Display, Outfit } from 'next/font/google';

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

// ✅ FIXED: Removed themeColor from metadata
export const metadata = {
  title: 'Niraj Kumar Sharma – Freelance Video Editor India | D2C Brands & Creators',
  description:
    'Performance video editor for D2C brands & creators. High-converting reels, YouTube videos & Meta ads. 80+ happy clients, 6M+ views. Based in India, serving UAE, USA, UK & Australia.',
  keywords:
    'video editor India, freelance video editor, D2C brand video editor, Instagram reels editor, YouTube video editor, Meta ads video editor, Niraj Kumar Sharma',
  authors: [{ name: 'Niraj Kumar Sharma' }],
  openGraph: {
    title:
      'Niraj Kumar Sharma – Freelance Video Editor India | D2C Brands & Creators',
    description:
      'Performance video editor for D2C brands & creators. High-converting reels, YouTube videos & Meta ads.',
    url: 'https://nirajvisuals.in',
    siteName: 'Niraj Kumar Sharma – Video Editor',
    images: [
      {
        url: 'https://i.ibb.co/G4M2R6v3/Startup-Grind-Profile-photo.jpg',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Niraj Kumar Sharma – Freelance Video Editor India',
    description:
      'Performance video editor for D2C brands. Reels, YouTube & Meta ads. 80+ clients, 6M+ views.',
    creator: '@itsnirajsharma',
    images: [
      'https://i.ibb.co/G4M2R6v3/Startup-Grind-Profile-photo.jpg',
    ],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://nirajvisuals.in/' },
  metadataBase: new URL('https://nirajvisuals.in'),
};

// ✅ NEW: Correct place for themeColor
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
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          crossOrigin="anonymous"
        />

        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/fa-solid-900.woff2"
          crossOrigin="anonymous"
        />

        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/fa-brands-400.woff2"
          crossOrigin="anonymous"
        />

        {/* Favicon */}
        <link
          rel="icon"
          href="https://i.ibb.co/G4M2R6v3/Startup-Grind-Profile-photo.jpg"
        />

        {/* Structured Data (SEO Boost 🔥) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Niraj Kumar Sharma',
              jobTitle: 'Freelance Video Editor',
              url: 'https://nirajvisuals.in',
              image:
                'https://i.ibb.co/G4M2R6v3/Startup-Grind-Profile-photo.jpg',
              email: 'nirajsharma.work@gmail.com',
              telephone: '+919693574910',
              sameAs: [
                'https://www.linkedin.com/in/nirajsharmaeditor',
                'https://www.instagram.com/itsnirajsharma/',
                'https://www.youtube.com/@NikushVlogs',
              ],
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Bhilai',
                addressRegion: 'Chhattisgarh',
                addressCountry: 'IN',
              },
              worksFor: [
                { '@type': 'Organization', name: 'GrowMedia' },
                { '@type': 'Organization', name: 'Media Magnetix' },
              ],
            }),
          }}
        />
      </head>

      <body>{children}</body>
    </html>
  );
}