import Image from 'next/image';

export default function About() {
  return (
    <section className="about" id="about">
      <div className="c">
        <div className="ab-grid">
          <div className="ab-img-wrap reveal">
            <Image
              src="https://i.ibb.co/RGBVXq6v/YT-Banner-12.jpg"
              alt="Niraj Kumar Sharma editing workspace – Adobe Premiere Pro video editor in Bhilai India"
              className="ab-img"
              width={560}
              height={315}
              loading="lazy"
            />
          </div>
          <div className="ab-text reveal" style={{ animationDelay: '.15s' }}>
            <span className="ab-overline">About Me</span>
            <h2>Freelance Video Editor &amp; Performance Creative Specialist</h2>
            <p>
              I&apos;m Niraj Kumar Sharma — Senior Video Editor at GrowMedia and Media Magnetix, a
              3rd-year CSE student at Rungta College of Engineering &amp; Technology, Bhilai, and a
              Smart India Hackathon 2024 national winner.
            </p>
            <p>
              I specialise in performance-focused video editing for D2C brands, Instagram creators,
              and YouTube channels across India, UAE, USA and UK. My pricing has evolved from ₹2,000
              to ₹20,000+ per project — because the work delivers measurable results, not just
              polished aesthetics.
            </p>
            <p>
              Portfolio:{' '}
              <a href="https://nirajvisuals.in" target="_blank" rel="noopener noreferrer">
                nirajvisuals.in
              </a>{' '}
              · Based in Bhilai, Chhattisgarh, India
            </p>
            <div className="skills-row">
              <div className="sk">
                <Image
                  src="https://sevensoftwares.com/wp-content/uploads/2024/11/adobe-premiere-pro-logo-1-1-2048x1997.png"
                  alt="Adobe Premiere Pro logo"
                  width={34}
                  height={34}
                  loading="lazy"
                />
                <span>Premiere Pro</span>
              </div>
              <div className="sk">
                <Image
                  src="https://adobe.psu.edu/files/2020/07/After-Effects.png"
                  alt="Adobe After Effects logo"
                  width={34}
                  height={34}
                  loading="lazy"
                />
                <span>After Effects</span>
              </div>
              <div className="sk">
                <Image
                  src="https://p.kindpng.com/picc/s/13-130854_davinci-resolve-icon-davinci-resolve-logo-transparent-hd.png"
                  alt="DaVinci Resolve logo"
                  width={34}
                  height={34}
                  loading="lazy"
                />
                <span>DaVinci</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
