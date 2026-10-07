/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'i.ibb.co' },
      { protocol: 'https', hostname: 'i.ytimg.com' },
      { protocol: 'https', hostname: 'sevensoftwares.com' },
      { protocol: 'https', hostname: 'adobe.psu.edu' },
      { protocol: 'https', hostname: 'p.kindpng.com' },
    ],
  },
};
export default nextConfig;
