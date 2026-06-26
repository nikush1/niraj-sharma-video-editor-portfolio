'use client';
import { useEffect } from 'react';
import ThemeToggle from './ThemeToggle';

export default function ClientEffects() {
  useEffect(() => {
    /* ---------- CURSOR ---------- */
    const cur = document.getElementById('cur');
    const curR = document.getElementById('curR');
    if (cur && curR) {
      let mx = 0, my = 0, px = 0, py = 0;

      const onMove = (e) => {
        mx = e.clientX; my = e.clientY;
        cur.style.transform = `translate(${mx}px,${my}px)`;
      };
      document.addEventListener('mousemove', onMove, { passive: true });

      let raf;
      const loop = () => {
        px += (mx - px) / 9;
        py += (my - py) / 9;
        curR.style.transform = `translate(${px}px,${py}px)`;
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);

      const hoverEls = Array.from(document.querySelectorAll(
        'a,button,.pc,.tc,.scard,.sv-card,.flt,.ti,input,textarea,select,#themeToggle'
      ));

      const onHover = () => { cur.classList.add('big'); curR.classList.add('big'); };
      const onLeave = () => { cur.classList.remove('big'); curR.classList.remove('big'); };

      hoverEls.forEach(el => {
        el.addEventListener('mouseenter', onHover, { passive: true });
        el.addEventListener('mouseleave', onLeave, { passive: true });
      });

      return () => {
        document.removeEventListener('mousemove', onMove);
        hoverEls.forEach(el => {
          el.removeEventListener('mouseenter', onHover);
          el.removeEventListener('mouseleave', onLeave);
        });
        cancelAnimationFrame(raf);
      };
    }
  }, []);

  useEffect(() => {
    /* ---------- SCROLL: progress bar, BTT, header ---------- */
    const pgBar = document.getElementById('pgBar');
    const btt = document.getElementById('btt');
    const hdr = document.getElementById('hdr');
    let lastY = 0;

    const onScroll = () => {
      const y = window.scrollY;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (pgBar) pgBar.style.transform = `scaleX(${y / h})`;
      if (btt) btt.classList.toggle('show', y > 400);
      if (hdr) {
        hdr.classList.toggle('scrolled', y > 60);
        hdr.classList.toggle('hide', y > lastY && y > 120);
      }
      lastY = y;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    if (btt) btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    /* ---------- ACTIVE NAV ---------- */
    const secs = document.querySelectorAll('section[id]');
    const onScroll = () => {
      let c = '';
      secs.forEach(s => { if (window.scrollY >= s.offsetTop - 160) c = s.id; });
      document.querySelectorAll('.nav-links a').forEach(a =>
        a.classList.toggle('active', a.getAttribute('href') === '#' + c)
      );
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
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
      {/* Custom cursor dots */}
      <div className="cur" id="cur" aria-hidden="true" />
      <div className="cur-ring" id="curR" aria-hidden="true" />

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
