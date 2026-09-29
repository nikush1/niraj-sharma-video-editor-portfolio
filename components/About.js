import Image from 'next/image';

export default function About({ headingLevel = 'h2' }) {
  const Heading = headingLevel;
  return (
    <section className="about" id="about">
      <div className="c">
        <div className="ab-grid">
          <div className="ab-img-wrap reveal">
            <Image
              src="https://i.ibb.co/RGBVXq6v/YT-Banner-12.jpg"
              alt="Niraj Kumar Sharma, performance video editor based in Delhi NCR"
              className="ab-img"
              width={560}
              height={315}
              loading="lazy"
            />
          </div>
          <div className="ab-text reveal" style={{ animationDelay: '.15s' }}>
            <span className="ab-overline">About Me</span>
            <Heading>Video Editor at BeastLife.
              <br />Creative partner for D2C brands.</Heading>
            <p>
              I&apos;m Niraj Kumar Sharma, a Video Editor Executive at BeastLife in Gurugram
              since July 2026. I edit Meta ads, UGC and short-form performance creatives,
              and work with international clients alongside my full-time role.
            </p>
            <p>
              My focus is on the decisions behind each edit: the opening hook, the product
              story, the pacing and the call to action. I create variations that give brands
              and agencies different angles to test with their audiences.
            </p>
            <p>
              Previously, I worked as a Performance Video Editor at GrowMedia from August
              2025 to May 2026. I&apos;m also a final-year BTech student at Rungta College of
              Engineering &amp; Technology (RCET), Bhilai.
            </p>
            <p>
              Based in Delhi NCR, India · Working with brands and agencies remotely.
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
