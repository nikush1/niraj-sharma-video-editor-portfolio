'use client';
import { useState } from 'react';
import { FAQS } from '@/lib/data';

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);

  const toggle = (i) => setOpenIdx(prev => (prev === i ? null : i));

  return (
    <section className="faq" id="faq">
      <div className="c">
        <div className="stitle reveal">
          <span className="tag">Common Questions</span>
          <h2>Frequently Asked Questions – Video Editing Services</h2>
          <p>Answers to the questions clients ask most before hiring a freelance video editor in India.</p>
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
                <div className="fa-ans" id={uid} role="region">
                  {f.a}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
