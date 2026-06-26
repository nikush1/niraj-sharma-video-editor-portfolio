import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="c">
        <div className="hero-inner">
          <div className="reveal">
            <div className="hero-pill">Available for Projects</div>
            <h1>
              Freelance<br />
              <span>Video Editor</span><br />
              for D2C Brands in India
            </h1>
            <p className="hero-sub">
              I turn raw footage into scroll-stopping content — reels, brand films, and ad creatives
              that drive real engagement for D2C brands and creators in India, UAE, USA, UK &amp; Australia.
            </p>
            <div className="hero-chips">
              <span className="hero-chip"><i className="fas fa-globe" aria-hidden="true" /> UAE · USA · UK · Australia Clients</span>
              <span className="hero-chip"><i className="fas fa-eye" aria-hidden="true" /> 6M+ Views Generated</span>
            </div>
            <div className="hero-values">
              <div>
                <strong>Fast turnaround</strong>
                <p>First draft in 48–72 hours for urgent brand campaigns.</p>
              </div>
              <div>
                <strong>Ads-ready assets</strong>
                <p>Deliverables formatted for Reels, YouTube and Meta ads.</p>
              </div>
              <div>
                <strong>Clear revisions</strong>
                <p>Structured feedback, smooth edits, polished final delivery.</p>
              </div>
            </div>
            <div className="hero-ctas">
              <Link href="/contact" className="btn btn-primary">
                <i className="fas fa-rocket" aria-hidden="true" /> Start a Project
              </Link>
              <Link href="/work" className="btn btn-outline">
                <i className="fas fa-play" aria-hidden="true" /> View Work
              </Link>
              <a
                href="https://drive.google.com/file/d/1aUTZrncrhPZEvLULpWqhTgtM6i96ceXu/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                <i className="fas fa-download" aria-hidden="true" /> Resume
              </a>
            </div>
          </div>
          <div className="hero-photo-wrap reveal" style={{ animationDelay: '.2s' }}>
            <Image
              src="https://i.ibb.co/XZj2T1VY/Untitled-design-8.jpg"
              alt="Niraj Kumar Sharma – Freelance Video Editor for D2C Brands in India"
              className="hero-photo"
              width={520}
              height={650}
              priority
            />
            <div className="hero-float hero-float-1" aria-hidden="true">
              <div className="lbl">Projects Done</div>
              <div className="val">100+</div>
              <div className="sub">Since 2022</div>
            </div>
            <div className="hero-float hero-float-2" aria-hidden="true">
              <div className="lbl">Happy Clients</div>
              <div className="val">80+</div>
              <div className="sub">Globally</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
