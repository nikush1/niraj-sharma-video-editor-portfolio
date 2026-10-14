'use client';
import { useEffect, useRef, useState } from 'react';
import { FAQS } from '@/lib/data';

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);
  const [heights, setHeights] = useState({});
  const contentRefs = useRef([]);

  useEffect(() => {
    const updateHeights = () => {
      const nextHeights = {};
      contentRefs.current.forEach((ref, index) => {
        if (ref) nextHeights[index] = ref.scrollHeight;
      });
      setHeights(nextHeights);
    };

    updateHeights();
    // Font swaps and content reflow can change an answer without a window resize.
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(updateHeights);
    contentRefs.current.forEach(ref => { if (ref) observer?.observe(ref); });
    window.addEventListener('resize', updateHeights);
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', updateHeights);
    };
  }, []);

  const toggle = (i) => setOpenIdx(prev => (prev === i ? null : i));

  return (
    <section className="faq" id="faq">
      <div className="c">
        <div className="stitle reveal">
          <span className="tag">Common Questions</span>
          <h2>Frequently Asked Questions – Video Editing Services</h2>
          <p>Scope, collaboration and what to share when you get in touch.</p>
        </div>

        <div className="faq-wrap" role="list">
          {FAQS.map((f, i) => {
            const uid = `faq-ans-${i}`;
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                className={`fi reveal${isOpen ? ' open' : ''}`}
                style={{ animationDelay: `${i * 0.06}s` }}
                role="listitem"
              >
                <button
                  className="fq"
                  aria-expanded={isOpen}
                  aria-controls={uid}
                  onClick={() => toggle(i)}
                >
                  {f.q}
                  <div className="fq-icon" aria-hidden="true">
                    <i className="fas fa-plus" />
                  </div>
                </button>
                <div
                  className={`fa-ans${isOpen ? ' open' : ''}`}
                  id={uid}
                  role="region"
                  aria-hidden={!isOpen}
                  style={{
                    maxHeight: isOpen ? `${(heights[i] || 0) + 24}px` : '0px',
                    opacity: isOpen ? 1 : 0,
                    padding: isOpen ? '0 24px 20px' : '0 24px',
                  }}
                >
                  <div ref={el => { contentRefs.current[i] = el; }}>{f.a}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
