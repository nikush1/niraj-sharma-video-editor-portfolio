import Link from 'next/link';
import Image from 'next/image';
import { PROJ } from '@/lib/data';

export default function ServiceDetail({ service }) {
  const examples = service.exampleProjectIds
    ?.map(id => PROJ.find(project => project.y === id))
    .filter(Boolean) || [];

  return (
    <article className="detail-page c">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true"> / </span>
        <Link href="/services">Services</Link>
        <span aria-hidden="true"> / </span>
        <span aria-current="page">{service.name}</span>
      </nav>

      <header className="detail-header">
        <p className="detail-eyebrow">{service.eyebrow}</p>
        <h1>{service.name}</h1>
        <p className="detail-intro">{service.intro}</p>
        <div className="detail-actions">
          <Link href="/work">See selected work →</Link>
          <Link href="/contact">Discuss your project →</Link>
        </div>
      </header>

      <div className="detail-grid">
        {service.sections.map((section) => (
          <section className="detail-section" key={section.title}>
            <h2>{section.title}</h2>
            {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.items && (
              <ul className="detail-list">
                {section.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            )}
          </section>
        ))}
      </div>

      {examples.length > 0 && (
        <section className="service-examples" aria-labelledby="service-examples-title">
          <h2 id="service-examples-title">Related portfolio examples</h2>
          <div className="service-example-grid">
            {examples.map(project => (
              <a
                className="service-example"
                key={project.y}
                href={`https://www.youtube.com/watch?v=${project.y}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={`/images/work-${project.y}.jpg`}
                  alt=""
                  width={480}
                  height={360}
                  sizes="(max-width: 700px) 90vw, 30vw"
                />
                <span>{project.t}</span>
                <span className="service-example-cta">Watch on YouTube ↗</span>
              </a>
            ))}
          </div>
        </section>
      )}

      <aside className="detail-callout">
        <h2>Start with a clear brief</h2>
        <p>Use the <Link href="/resources/video-ad-editing-brief">video ad editing brief checklist</Link> to gather the assets and decisions needed for a useful first conversation.</p>
      </aside>

      <section className="detail-section" aria-labelledby="service-faq">
        <h2 id="service-faq">Common questions</h2>
        {service.faqs.map((faq) => (
          <details key={faq.question}>
            <summary>{faq.question}</summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </section>

      <div className="detail-actions">
        <Link href={`/services/${service.relatedSlug}`}>{service.relatedLabel} →</Link>
        <Link href="/contact">Share your brief →</Link>
      </div>
    </article>
  );
}
