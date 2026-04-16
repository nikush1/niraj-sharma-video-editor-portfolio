const STEPS = [
  { num: '01', title: 'Discovery Call', desc: '30-min call to understand your brand, audience, goals, and project scope.', delay: 0 },
  { num: '02', title: 'Brief & Proposal', desc: 'Clear proposal with deliverables, timeline and pricing — no hidden costs.', delay: 0.1 },
  { num: '03', title: 'Production', desc: 'First cut delivered on schedule. Full progress updates throughout.', delay: 0.2 },
  { num: '04', title: 'Revisions', desc: '2 rounds of feedback-driven revisions to get everything exactly right.', delay: 0.3 },
  { num: '05', title: 'Final Delivery', desc: 'Exported in all required formats, ready for upload with platform-specific specs.', delay: 0.4 },
];

export default function Process() {
  return (
    <section className="process" id="process">
      <div className="c">
        <div className="stitle reveal">
          <span className="tag">How It Works</span>
          <h2>My Video Editing Process</h2>
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
