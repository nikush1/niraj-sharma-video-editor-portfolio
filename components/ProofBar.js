import Link from 'next/link';

export default function ProofBar() {
  return (
    <div className="proof" role="region" aria-label="Credentials at a glance">
      <div className="c">
        <div className="proof-inner">
          <div className="proof-copy">
            <span className="tag">Why clients choose me</span>
            <h2>High-performance edits built for campaigns and conversions</h2>
            <p>Fast delivery, clean revisions, and attention to pacing so your content looks premium and performs well.</p>
          </div>

          <div className="proof-items">
            <div className="proof-item"><i className="fas fa-star" aria-hidden="true" /> 2+ Years Experience</div>
            <div className="proof-item"><i className="fas fa-globe" aria-hidden="true" /> International Clients — UAE, USA, UK, Australia</div>
            <div className="proof-item"><i className="fas fa-eye" aria-hidden="true" /> 6M+ Total Views</div>
          </div>

          <div className="proof-cta">
            <Link href="/contact" className="btn btn-outline">Start Your Project</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
