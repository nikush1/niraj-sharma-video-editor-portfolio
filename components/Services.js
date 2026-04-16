const SERVICES = [
  {
    icon: 'fas fa-mobile-alt',
    title: 'Short-Form Video Editing',
    desc: 'High-retention Instagram Reels, YouTube Shorts & TikToks with tight hooks, fast cuts, and trending audio sync. Designed to stop the scroll and drive real engagement for D2C brands.',
    for: 'D2C Brands · Creators · Coaches',
    delay: 0,
  },
  {
    icon: 'fas fa-video',
    title: 'Long-Form Video Editing',
    desc: 'Cinematic YouTube videos, brand films, vlogs and event coverage with colour grading, motion graphics, and pacing that holds attention end-to-end.',
    for: 'YouTubers · Agencies · Startups',
    delay: 0.08,
  },
  {
    icon: 'fas fa-image',
    title: 'YouTube Thumbnail Design',
    desc: 'Click-worthy thumbnails combining psychology, contrast, and visual hierarchy to dramatically improve CTR. Tested on 68K+ follower pages.',
    for: 'YouTubers · Content Creators',
    delay: 0.16,
  },
  {
    icon: 'fas fa-ad',
    title: 'Ad Creatives – Meta & YouTube',
    desc: 'UGC-style and scripted video ads for Meta & YouTube with strong hooks, problem-solution-proof structure, and CTAs that convert for D2C e-commerce brands.',
    for: 'D2C Brands · E-commerce · Apps',
    delay: 0.24,
  },
  {
    icon: 'fas fa-calendar-alt',
    title: 'Event Coverage Editing',
    desc: 'Raw event footage turned into highlight reels, recap videos, and behind-the-scenes content — delivered fast in multi-platform formats.',
    for: 'Startups · Colleges · Organisations',
    delay: 0.32,
  },
  {
    icon: 'fas fa-brain',
    title: 'AI-Integrated Video Production',
    desc: 'Next-gen video production using Kling, ElevenLabs, Hedra, Topaz Video AI and more — creating visuals that stand out in any feed.',
    for: 'Forward-thinking Brands',
    delay: 0.40,
  },
];

export default function Services() {
  return (
    <section className="services" id="services">
      <div className="c">
        <div className="stitle reveal">
          <span className="tag">What I Offer</span>
          <h2>Video Editing Services for Brands &amp; Creators</h2>
          <p>Tailored video editing solutions for D2C brands, Instagram creators, and YouTube channels — built for performance, not just aesthetics.</p>
        </div>
        <div className="sv-grid">
          {SERVICES.map(s => (
            <div className="sv-card reveal" key={s.title} style={{ animationDelay: `${s.delay}s` }}>
              <div className="sv-icon" aria-hidden="true"><i className={s.icon} /></div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <span className="sv-for"><i className="fas fa-bullseye" aria-hidden="true" /> {s.for}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
