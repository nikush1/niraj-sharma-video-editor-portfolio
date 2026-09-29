import Link from 'next/link';

const SERVICES = [
  {
    icon: 'fas fa-ad',
    title: 'D2C & Meta Ad Editing',
    desc: 'Product demos, offer-led creatives and direct-response ads. Clear product benefits, supporting footage and a focused call to action.',
    for: 'D2C brands · E-commerce',
    href: '/services/meta-ads-video-editing',
  },
  {
    icon: 'fas fa-mobile-alt',
    title: 'UGC & Creative Variations',
    desc: 'Turn creator footage into ad-ready edits. Test different hooks, story structures, captions and CTAs using the same source footage.',
    for: 'Brands · Performance agencies',
    href: '/services/ugc-video-editing',
  },
  {
    icon: 'fas fa-calendar-alt',
    title: 'Monthly Editing Support',
    desc: 'An agreed monthly scope for recurring creative needs. Plan batches, organise feedback and create the next set of edits around what you learn.',
    for: 'Ongoing brand · Agency partnerships',
  },
];

export default function Services({ headingLevel = 'h2' }) {
  const Heading = headingLevel;
  return (
    <section className="services" id="services">
      <div className="c">
        <div className="stitle reveal">
          <span className="tag">Work With Me</span>
          <Heading>{headingLevel === 'h1' ? 'Video editing services for D2C brands' : 'Editing for your next creative test'}</Heading>
          <p>From an individual ad to ongoing editing support, with deliverables and timelines agreed before work begins.</p>
        </div>
        <div className="sv-grid">
          {SERVICES.map(s => (
            <div className="sv-card reveal" key={s.title}>
              <div className="sv-icon" aria-hidden="true"><i className={s.icon} /></div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <span className="sv-for">{s.for}</span>
              {s.href && <p><Link href={s.href}>Explore {s.title.toLowerCase()} →</Link></p>}
            </div>
          ))}
        </div>
        <p className="services-extra">Also available: creator reels, YouTube editing and thumbnail design. <Link href="/contact">Tell me what you need →</Link></p>
      </div>
    </section>
  );
}
