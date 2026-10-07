'use client';
import { useState } from 'react';
import { BRANDS } from '@/lib/brands';

export default function Brands() {
  const [paused, setPaused] = useState(false);
  // Each group is wider than the section, including on a large desktop.
  const loopBrands = BRANDS.length >= 6 ? BRANDS : [...BRANDS, ...BRANDS];

  return (
    <section className="brands" id="brands" aria-labelledby="brands-title">
      <div className="c">
        <div className="brands-heading">
          <div>
            <span className="brands-eyebrow">A few familiar names</span>
            <h2 id="brands-title">Brands I’ve worked with</h2>
            <p>Through professional roles, freelance projects and creative collaborations.</p>
          </div>
          <button
            type="button"
            className="brands-motion"
            aria-controls="brand-logo-strip"
            aria-pressed={paused}
            aria-label={paused ? 'Resume logo animation' : 'Pause logo animation'}
            onClick={() => setPaused(value => !value)}
          >
            <i className={paused ? 'fas fa-play' : 'fas fa-pause'} aria-hidden="true" />
            <span>{paused ? 'Resume' : 'Pause'}</span>
          </button>
        </div>

        <ul className="brands-accessible">
          {BRANDS.map(brand => <li key={brand.name}>{brand.name} — {brand.relationship}</li>)}
        </ul>

        <div className="brands-marquee" id="brand-logo-strip" data-paused={paused}>
          <div className="brands-track" aria-hidden="true">
            {[0, 1].map(copy => (
              <div className="brands-group" key={copy}>
                {loopBrands.map((brand, index) => (
                  <div className="brand-item" data-duplicate={index >= BRANDS.length} key={`${brand.name}-${index}`}>
                    <div className="brand-logo-frame" data-tone={brand.tone}>
                      {/* Official artwork or the brand's native text wordmark. */}
                      {brand.wordmark ? (
                        <span className="brand-wordmark"><span>{brand.wordmark[0]}</span><span>{brand.wordmark[1]}</span></span>
                      ) : (
                        <img src={brand.logo} alt="" width={brand.width} height={brand.height}
                          className={`brand-logo ${brand.logoClass || ''}`} draggable="false" decoding="async" />
                      )}
                    </div>
                    <span className="brand-relationship">{brand.relationship}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
