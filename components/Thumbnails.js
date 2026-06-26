'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { THUMBS } from '@/lib/data';

export default function Thumbnails() {
  const [lbIndex, setLbIndex] = useState(null);

  const openLB = idx => {
    setLbIndex(idx);
    document.body.style.overflow = 'hidden';
  };
  const closeLB = () => {
    setLbIndex(null);
    document.body.style.overflow = '';
  };
  const showLB = idx => setLbIndex((idx + THUMBS.length) % THUMBS.length);

  useEffect(() => {
    const onKey = e => {
      if (lbIndex === null) return;
      if (e.key === 'Escape') closeLB();
      if (e.key === 'ArrowLeft') showLB(lbIndex - 1);
      if (e.key === 'ArrowRight') showLB(lbIndex + 1);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [lbIndex]);

  // Double the array for seamless infinite scroll
  const doubled = [...THUMBS, ...THUMBS];

  return (
    <section className="thumbs" id="thumbnails">
      <div className="c">
        <div className="stitle reveal">
          <span className="tag">Design Work</span>
          <h2>YouTube Thumbnail Design Gallery</h2>
          <p>Eye-catching YouTube thumbnail designs built to maximise click-through rates for creators and brands.</p>
        </div>
      </div>

      <div className="ttrack-w" role="region" aria-label="Scrolling thumbnail gallery">
        <div className="ttrack">
          {doubled.map((th, i) => (
            <button
              key={i}
              type="button"
              className="ti"
              aria-label={`View ${th.t}`}
              onClick={() => openLB(i % THUMBS.length)}
            >
              <Image src={th.i} alt={th.t} width={280} height={160} loading="lazy" />
            </button>
          ))}
        </div>
      </div>

      {/* Image Lightbox */}
      <div
        className={`lb${lbIndex !== null ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Image viewer"
        onClick={e => { if (e.target.classList.contains('lb')) closeLB(); }}
      >
        <button className="lb-x" aria-label="Close image" onClick={closeLB}>
          <i className="fas fa-times" aria-hidden="true" />
        </button>
        <div className="lb-nav">
          <button aria-label="Previous image" onClick={() => showLB((lbIndex ?? 0) - 1)}>
            <i className="fas fa-chevron-left" aria-hidden="true" />
          </button>
          <button aria-label="Next image" onClick={() => showLB((lbIndex ?? 0) + 1)}>
            <i className="fas fa-chevron-right" aria-hidden="true" />
          </button>
        </div>
        {lbIndex !== null && (
          <Image src={THUMBS[lbIndex].i} alt={THUMBS[lbIndex].t} width={1000} height={565} loading="lazy" />
        )}
      </div>
    </section>
  );
}
