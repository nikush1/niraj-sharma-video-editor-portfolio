'use client';
import { useEffect } from 'react';
import ThemeToggle from './ThemeToggle';

export default function ClientEffects() {
  useEffect(() => {
    /* ---------- SCROLL: progress bar, BTT, header ---------- */
    const pgBar = document.getElementById('pgBar');
    const btt = document.getElementById('btt');
    const hdr = document.getElementById('hdr');
    let lastY = 0;

    const onScroll = () => {
      const y = window.scrollY;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (pgBar) pgBar.style.transform = `scaleX(${h > 0 ? y / h : 0})`;
      if (btt) btt.classList.toggle('show', y > 400);
      if (hdr) {
        hdr.classList.toggle('scrolled', y > 60);
        hdr.classList.toggle('hide', y > lastY && y > 120);
      }
      lastY = y;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    const onTop = () => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    if (btt) btt.addEventListener('click', onTop);
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (btt) btt.removeEventListener('click', onTop);
    };
  }, []);

  useEffect(() => {
    /* ---------- REVEAL OBSERVER ---------- */
    const ro = new IntersectionObserver(
      entries => entries.forEach(x => {
        if (x.isIntersecting) { x.target.classList.add('in'); ro.unobserve(x.target); }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach(el => ro.observe(el));
    return () => ro.disconnect();
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <div id="pgBar" aria-hidden="true" />

      {/* Back to top button */}
      <button id="btt" aria-label="Back to top">
        <i className="fas fa-arrow-up" aria-hidden="true" />
      </button>

      {/* WhatsApp floating button */}
      <a
        className="wa"
        href="https://wa.me/919693574910?text=Hi%20Niraj%2C%20I%20want%20to%20discuss%20a%20project"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Niraj on WhatsApp"
      >
        <i className="fab fa-whatsapp" aria-hidden="true" />
      </a>

      {/* Theme toggle sidebar */}
      <ThemeToggle />
    </>
  );
}
