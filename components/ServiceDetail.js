import Link from 'next/link';

export default function ServiceDetail({ service }) {
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
