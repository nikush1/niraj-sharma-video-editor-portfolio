const STEPS = [
  { num: '01', title: 'Brief & Audience', desc: 'Share your product, audience, approved claims and the action you want viewers to take.', delay: 0 },
  { num: '02', title: 'Scope & Concepts', desc: 'Agree the angles, hook variations, deliverables, timeline and pricing.', delay: 0.1 },
  { num: '03', title: 'First Cut', desc: 'Build the edit around a clear hook, product story, supporting footage and CTA.', delay: 0.2 },
  { num: '04', title: 'Feedback', desc: 'Review the first cut and refine the edit through the agreed revision rounds.', delay: 0.3 },
  { num: '05', title: 'Deliver & Iterate', desc: 'Export for your placements. Use feedback and available campaign data to plan the next variation.', delay: 0.4 },
];

export default function Process({ headingLevel = 'h2' }) {
  const Heading = headingLevel;
  return (
    <section className="process" id="process">
      <div className="c">
        <div className="stitle reveal">
          <span className="tag">How It Works</span>
          <Heading>My Video Editing Process</Heading>
          <p>A transparent, structured workflow so you always know what happens next — from brief to final delivery.</p>
        </div>
        <div className="proc-grid" role="list">
          {STEPS.map(s => (
            <div className="proc-step reveal" key={s.num} style={{ animationDelay: `${s.delay}s` }} role="listitem">
              <div className="pnum" aria-hidden="true">{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
