export const SITE_URL = 'https://nirajvisuals.in';
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const SITE_NAME = 'Niraj Kumar Sharma';

export const SEO_PAGES = [
  { path: '/', title: 'Niraj Kumar Sharma | D2C & Meta Ads Video Editor', description: 'Performance video editor at BeastLife. Meta ads, UGC and product videos for D2C brands and agencies. Based in Delhi NCR, working internationally.' },
  { path: '/work', title: 'Video Editing Portfolio | Niraj Kumar Sharma', description: 'Watch brand videos, creator reels and YouTube edits by Niraj Kumar Sharma. Browse short-form and long-form work and discuss your next project.' },
  { path: '/services', title: 'D2C, Meta Ads & UGC Video Editing Services | Niraj Sharma', description: 'Explore Meta ad editing, UGC creative variations and monthly editing support for D2C brands and agencies. Share your brief for a scoped quote.' },
  { path: '/about', title: 'About Niraj Kumar Sharma | Video Editor at BeastLife', description: 'Meet Niraj Kumar Sharma, Video Editor Executive at BeastLife in Gurugram. Editing Meta ads, UGC and D2C content for brands and international clients.' },
  { path: '/process', title: 'Video Editing Process | Niraj Kumar Sharma', description: 'How we work together: brief, creative angles, first cut, consolidated feedback and final exports. A clear process for D2C and UGC video projects.' },
  { path: '/reviews', title: 'Video Editing Client Reviews | Niraj Kumar Sharma', description: 'Read feedback on Niraj Kumar Sharma’s video editing work from clients and collaborators, then explore his portfolio or discuss a project.' },
  { path: '/contact', title: 'Hire Niraj Kumar Sharma | Video Editor for D2C Brands', description: 'Contact Niraj Kumar Sharma about D2C ads, UGC editing, monthly retainers or remote roles. Share your scope, budget and timeline to start a conversation.' },
  { path: '/services/meta-ads-video-editing', title: 'Meta Ads Video Editing for D2C Brands | Niraj Sharma', description: 'Meta ad editing for D2C brands: product stories, offer creatives, hook variations and placement-ready exports. Explore the scope and share your brief.' },
  { path: '/services/ugc-video-editing', title: 'UGC Video Editing for Brands & Agencies | Niraj Sharma', description: 'Turn creator footage into clear UGC edits with captions, supporting product shots and creative variations. See deliverables and what to include in your brief.' },
  { path: '/resources/video-ad-editing-brief', title: 'How to Brief a Video Ad Editor | D2C & UGC Checklist', description: 'A practical D2C and UGC video-editing brief checklist: audience, footage, hooks, deliverables, approved claims, deadlines and feedback. Includes an example.' },
];

export function absoluteUrl(path = '/') {
  return new URL(path, `${SITE_URL}/`).toString();
}

export function buildMetadata({ title, description, path }) {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website', locale: 'en_IN', title, description, url, siteName: SITE_NAME,
      images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: 'Niraj Kumar Sharma — performance video editor for D2C brands' }],
    },
    twitter: {
      card: 'summary_large_image', title, description,
      images: [`${SITE_URL}/opengraph-image`],
    },
  };
}

export function pageSchema({ path, title, description, type = 'WebPage', breadcrumbs = [] }) {
  const url = absoluteUrl(path);
  const graph = [{
    '@type': type,
    '@id': `${url}#webpage`,
    url, name: title, description,
    inLanguage: 'en',
    isPartOf: { '@id': WEBSITE_ID },
    author: { '@id': PERSON_ID },
    ...(type === 'AboutPage' ? { mainEntity: { '@id': PERSON_ID } } : {}),
    ...(breadcrumbs.length ? { breadcrumb: { '@id': `${url}#breadcrumb` } } : {}),
  }];
  if (breadcrumbs.length) graph.push({
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem', position: index + 1, name: item.name, item: absoluteUrl(item.path),
    })),
  });
  return { '@context': 'https://schema.org', '@graph': graph };
}

export const siteSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite', '@id': WEBSITE_ID, url: `${SITE_URL}/`,
      name: SITE_NAME, alternateName: 'Niraj Visuals', inLanguage: 'en',
      description: 'The video editing portfolio and services of Niraj Kumar Sharma.',
      publisher: { '@id': PERSON_ID },
    },
    {
      '@type': 'Person', '@id': PERSON_ID,
      name: 'Niraj Kumar Sharma', url: `${SITE_URL}/about`,
      jobTitle: 'Video Editor Executive',
      description: 'Performance video editor at BeastLife, specialising in Meta ads, UGC and D2C creative variations.',
      worksFor: { '@type': 'Organization', name: 'BeastLife', url: 'https://beastlife.in/' },
      homeLocation: { '@type': 'Place', name: 'Delhi NCR, India' },
      knowsAbout: ['Video editing', 'Meta ad creatives', 'UGC editing', 'D2C product videos', 'Adobe Premiere Pro', 'Adobe After Effects'],
      email: 'nirajsharma.work@gmail.com',
      sameAs: [
        'https://www.linkedin.com/in/nirajsharmaeditor',
        'https://www.instagram.com/itsnirajsharma/',
        'https://www.youtube.com/@NikushVlogs',
      ],
    },
  ],
};
