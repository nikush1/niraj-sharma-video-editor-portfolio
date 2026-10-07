'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { CERTS } from '@/lib/data';

export default function Recognition() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  const goTo = (idx) => setCurrent((idx + CERTS.length) % CERTS.length);
  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  const resetInterval = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => setCurrent(c => (c + 1) % CERTS.length), 4000);
  };

  useEffect(() => {
    resetInterval();
    return () => clearInterval(intervalRef.current);
  }, []);

  const handleNext = () => { next(); resetInterval(); };
  const handlePrev = () => { prev(); resetInterval(); };
  const handleDot  = (i) => { goTo(i); resetInterval(); };

  return (
    <section className="recognition" id="recognition">
      <div className="c">
        <div className="stitle reveal">
          <span className="tag">Recognition</span>
          <h2>Awards &amp; Certifications</h2>
          <p>
            Industry recognitions including Smart India Hackathon 2024
            Winner, and Techstars Startup Weekend.
          </p>
        </div>

        <div
          className="rec-slider reveal"
          role="region"
          aria-label="Awards and certifications"
          aria-roledescription="carousel"
          onMouseEnter={() => clearInterval(intervalRef.current)}
          onMouseLeave={resetInterval}
        >
          {/* Track */}
          <div
            className="rec-track"
            style={{ transform: `translateX(-${current * 100}%)` }}
            aria-live="polite"
          >
            {CERTS.map((c, i) => (
              <div
                key={c.title}
                className="rec-slide"
                role="tabpanel"
                aria-label={c.title}
                aria-hidden={i !== current}
              >
                <Image
                  src={c.src}
                  alt={c.title}
                  width={800}
                  height={450}
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Prev / Next */}
          <button className="rec-nav rec-prev" aria-label="Previous certificate" onClick={handlePrev}>
            <i className="fas fa-chevron-left" aria-hidden="true" />
          </button>
          <button className="rec-nav rec-next" aria-label="Next certificate" onClick={handleNext}>
            <i className="fas fa-chevron-right" aria-hidden="true" />
          </button>

          {/* Dots */}
          <div className="rec-dots" role="tablist" aria-label="Certificate navigation">
            {CERTS.map((c, i) => (
              <button
                key={c.title}
                className={`rec-dot${i === current ? ' active' : ''}`}
                role="tab"
                aria-label={`Show: ${c.title}`}
                aria-selected={i === current}
                onClick={() => handleDot(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
