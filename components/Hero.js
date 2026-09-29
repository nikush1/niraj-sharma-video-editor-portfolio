import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="c">
        <div className="hero-inner">
          <div className="reveal">
            <div className="hero-pill">Video Editor at BeastLife</div>
            <h1>
              Performance<br />
              <span>Video Editor</span><br />
              for D2C Brands
            </h1>
            <p className="hero-sub">
              I’m Niraj Kumar Sharma. I edit Meta ads, UGC and product videos, with different hooks and angles for creative testing. Based in Delhi NCR, working with brands and agencies internationally.
            </p>
            <div className="hero-chips">
              <span className="hero-chip"><i className="fas fa-globe" aria-hidden="true" /> International collaborations</span>
              <span className="hero-chip"><i className="fas fa-video" aria-hidden="true" /> Meta Ads · UGC · D2C</span>
            </div>
            <div className="hero-values">
              <div>
                <strong>Hook variations</strong>
                <p>Different openings and angles from the same footage.</p>
              </div>
              <div>
                <strong>Platform-ready</strong>
                <p>Captions, sound and exports for each placement.</p>
              </div>
              <div>
                <strong>Clear workflow</strong>
                <p>Agreed scope, delivery dates and feedback rounds.</p>
              </div>
            </div>
            <div className="hero-ctas">
              <Link href="/work" className="btn btn-primary">
                <i className="fas fa-play" aria-hidden="true" /> View My Work
              </Link>
              <Link href="/contact" className="btn btn-outline">
                <i className="fas fa-envelope" aria-hidden="true" /> Work With Me
              </Link>
              <a
                href="https://drive.google.com/file/d/1Uzvhm98aDOqX0sP9-ToK5KD2C7kY9sRt/view?usp=sharing"
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
              alt="Niraj Kumar Sharma, performance video editor for D2C brands"
              className="hero-photo"
              sizes="(max-width: 1024px) 92vw, 520px"
              width={520}
              height={650}
              priority
            />
            <div className="hero-float hero-float-1" aria-hidden="true">
              <div className="lbl">Current role</div>
              <div className="val">BeastLife</div>
              <div className="sub">Video Editor Executive</div>
            </div>
            <div className="hero-float hero-float-2" aria-hidden="true">
              <div className="lbl">Creative focus</div>
              <div className="val">D2C + UGC</div>
              <div className="sub">Paid social video</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
