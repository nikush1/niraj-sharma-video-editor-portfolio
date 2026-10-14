import Link from 'next/link';

export default function ProofBar() {
  return (
    <div className="proof" role="region" aria-label="Credentials at a glance">
      <div className="c">
        <div className="proof-inner">
          <div className="proof-copy">
            <span className="tag">Why clients choose me</span>
            <h2>Editing support for D2C creative teams</h2>
            <p>Clear briefs, purposeful pacing and creative variations for your next campaign.</p>
          </div>

          <div className="proof-items">
            <div className="proof-item"><i className="fas fa-star" aria-hidden="true" /> Video Editor at BeastLife</div>
            <div className="proof-item"><i className="fas fa-globe" aria-hidden="true" /> International collaborations</div>
            <div className="proof-item"><i className="fas fa-eye" aria-hidden="true" /> Meta ads · UGC · D2C</div>
          </div>

          <div className="proof-cta">
            <Link href="/contact" className="btn btn-outline">Start Your Project</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
