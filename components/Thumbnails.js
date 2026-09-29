'use client';
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { THUMBS } from '@/lib/data';

export default function Thumbnails() {
  const [lbIndex, setLbIndex] = useState(null);
  const [mounted, setMounted] = useState(false);
  const openerRef = useRef(null);
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const isOpen = lbIndex !== null;

  useEffect(() => setMounted(true), []);

  const openLB = (idx, trigger) => {
    openerRef.current = trigger;
    setLbIndex(idx);
  };
  const closeLB = () => setLbIndex(null);
  const showLB = idx => setLbIndex((idx + THUMBS.length) % THUMBS.length);

  useEffect(() => {
    if (!mounted || !isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const opener = openerRef.current;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus({ preventScroll: true });

    const onKey = e => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setLbIndex(null);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        const direction = e.key === 'ArrowLeft' ? -1 : 1;
        setLbIndex(index => index === null ? null : (index + direction + THUMBS.length) % THUMBS.length);
      } else if (e.key === 'Tab') {
        const buttons = dialogRef.current?.querySelectorAll('button');
        if (!buttons?.length) return;
        const first = buttons[0];
        const last = buttons[buttons.length - 1];
        const active = document.activeElement;
        if (e.shiftKey && (active === first || !dialogRef.current.contains(active))) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && (active === last || !dialogRef.current.contains(active))) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
      if (opener?.isConnected) opener.focus({ preventScroll: true });
    };
  }, [mounted, isOpen]);

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
              onClick={event => openLB(i % THUMBS.length, event.currentTarget)}
            >
              <Image src={th.i} alt={th.t} width={280} height={160} loading="lazy" />
            </button>
          ))}
        </div>
      </div>

      {/* The portal keeps the dialog outside the gallery's layout containment. */}
      {mounted && isOpen && createPortal(
        <div
          ref={dialogRef}
          className="lb open"
          role="dialog"
          aria-modal="true"
          aria-label={`Image viewer: ${THUMBS[lbIndex].t}`}
          onClick={e => { if (e.target === e.currentTarget) closeLB(); }}
        >
          <button ref={closeRef} type="button" className="lb-x" aria-label="Close image" onClick={closeLB}>
            <i className="fas fa-times" aria-hidden="true" />
          </button>
          <div className="lb-nav">
            <button type="button" aria-label="Previous image" onClick={() => showLB(lbIndex - 1)}>
              <i className="fas fa-chevron-left" aria-hidden="true" />
            </button>
            <button type="button" aria-label="Next image" onClick={() => showLB(lbIndex + 1)}>
              <i className="fas fa-chevron-right" aria-hidden="true" />
            </button>
          </div>
          <Image
            src={THUMBS[lbIndex].i}
            alt={THUMBS[lbIndex].t}
            width={1000}
            height={565}
            style={{ width: 'auto', height: 'auto', objectFit: 'contain' }}
          />
        </div>,
        document.body
      )}
    </section>
  );
}
