import Image from 'next/image';
import Link from 'next/link';

const SERVICES = [
  {
    number: '01',
    tone: 'lilac',
    title: 'D2C & Meta ads.',
    description: 'A strong opening. A clear product story. A reason to act. I turn your footage into ads built around the message that matters.',
    tags: ['Product demos', 'Direct response', 'Meta ads'],
    audience: 'For D2C brands & e-commerce teams',
    href: '/services/meta-ads-video-editing',
    linkLabel: 'Explore ad editing',
    image: '/images/work-_-4noehZq8I.jpg',
    imageAlt: 'A frame from Niraj’s BeastLife Mass Gainer product edit',
    previewLabel: 'PRODUCT → STORY → ACTION',
  },
  {
    number: '02',
    tone: 'peach',
    title: 'UGC. More possibilities.',
    description: 'One batch of creator footage can tell more than one story. Let’s find the hooks, change the pace and make different angles worth testing.',
    tags: ['Creator-led edits', 'Hook variations', 'Captions & CTAs'],
    audience: 'For brands & performance agencies',
    href: '/services/ugc-video-editing',
    linkLabel: 'Explore UGC editing',
    image: '/images/work-3CpnoEG3v5w.jpg',
    imageAlt: 'A frame from Niraj’s skincare brand collaboration edit',
    previewLabel: 'SAME FOOTAGE. NEW PERSPECTIVE.',
  },
  {
    number: '03',
    tone: 'mint',
    title: 'Your ongoing editor.',
    description: 'Keep the ideas moving with a monthly editing plan. We agree the scope, organise the footage and feedback, then build the next batch together.',
    tags: ['Monthly batches', 'Creative variations', 'Ongoing support'],
    audience: 'For ongoing brand & agency partnerships',
    href: '/contact',
    linkLabel: 'Let’s plan your next batch',
    image: '/images/work-qJqqkw1suTk.jpg',
    imageAlt: 'A frame from Niraj’s IIT Kanpur cinematic vlog edit',
    previewLabel: 'BRIEF. CUT. REFINE. REPEAT.',
  },
];

export default function Services({ headingLevel = 'h2' }) {
  const Heading = headingLevel;
  const PanelHeading = headingLevel === 'h1' ? 'h2' : 'h3';

  return (
    <section className="services" id="services" aria-labelledby="services-heading">
      <div className="c">
        <header className="stitle reveal">
          <span className="tag">03 / WHAT I BRING</span>
          <Heading id="services-heading">Good footage.<br />Great possibilities.</Heading>
          <p>One edit or a whole creative pipeline. Let’s give your story the attention it deserves.</p>
        </header>

        <div className="service-stack">
          {SERVICES.map(service => (
            <article className="service-panel" data-tone={service.tone} key={service.number}>
              <span className="service-number" aria-hidden="true">{service.number}</span>
              <div className="service-copy">
                <p className="service-audience">{service.audience}</p>
                <PanelHeading>{service.title}</PanelHeading>
                <p>{service.description}</p>
                <ul className="service-tags" aria-label="Included services">
                  {service.tags.map(tag => <li key={tag}>{tag}</li>)}
                </ul>
                <Link className="service-link" href={service.href}>
                  {service.linkLabel} <span aria-hidden="true">↗</span>
                </Link>
              </div>
              <figure className="service-preview">
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  width={480}
                  height={360}
                  sizes="(max-width: 760px) 85vw, 32vw"
                />
                <figcaption><span aria-hidden="true">↳</span> {service.previewLabel}</figcaption>
              </figure>
            </article>
          ))}
        </div>

        <p className="services-extra">Also in my timeline: creator reels, YouTube videos and thumbnail design. <Link href="/contact">Tell me what you have in mind ↗</Link></p>
      </div>
    </section>
  );
}
