'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import { acquireBodyScrollLock } from '@/lib/bodyScrollLock';

const POSTERS = ['_-4noehZq8I', '3CpnoEG3v5w', 'qJqqkw1suTk', 'xGTHW280XRo', 'oRjEKVOdTRk'];
const SESSION_KEY = 'niraj-motion-opening-v2';
const MAX_OPEN_MS = 5000;

export default function OpeningSequence() {
  const root = useRef(null);
  const active = useRef(null);
  const nextRun = useRef(0);
  const [run, setRun] = useState(0);

  useLayoutEffect(() => {
    const start = (replay = false) => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced || document.documentElement.dataset.motion === 'paused' || document.hidden) {
        active.current?.finish();
        return;
      }
      let seen = false;
      try { seen = sessionStorage.getItem(SESSION_KEY) === '1'; } catch {}
      if (seen && !replay) return;
      setRun(++nextRun.current);
    };
    const replay = () => start(true);
    window.addEventListener('portfolio:replay', replay);
    start();
    return () => window.removeEventListener('portfolio:replay', replay);
  }, []);

  useLayoutEffect(() => {
    if (!run || !root.current) return;

    const element = root.current;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    // Recheck after rendering: a pause/preference change may happen between effects.
    if (preference.matches || document.documentElement.dataset.motion === 'paused' || document.hidden) {
      element.style.display = 'none';
      const timeout = window.setTimeout(() => {
        setRun(current => current === run ? 0 : current);
      }, 0);
      return () => window.clearTimeout(timeout);
    }

    const opener = document.activeElement;
    const releaseScroll = acquireBodyScrollLock();
    // A finish + replay can be batched into one render and reuse this DOM node.
    element.style.removeProperty('display');
    const deadline = Date.now() + MAX_OPEN_MS;
    let timeline;
    let ctx;
    let timeout;
    let completed = false;
    let disposed = false;
    let focusRestored = false;
    const controller = { finish: null };
    active.current = controller;

    const restoreFocus = () => {
      if (focusRestored) return;
      focusRestored = true;
      // Do not steal focus if another interaction has already moved it away.
      if (element.contains(document.activeElement) && opener?.isConnected && typeof opener.focus === 'function') {
        opener.focus({ preventScroll: true });
      }
    };
    const finish = ({ restore = true } = {}) => {
      if (completed || disposed || active.current !== controller) return;
      completed = true;
      clearTimeout(timeout);
      timeline?.kill();
      releaseScroll();
      if (restore) restoreFocus();
      // Remove hit testing immediately, before React commits the unmount.
      element.style.display = 'none';
      try { sessionStorage.setItem(SESSION_KEY, '1'); } catch {}
      setRun(current => current === run ? 0 : current);
      window.dispatchEvent(new Event('portfolio:entered'));
    };
    controller.finish = finish;

    const keydown = event => {
      if (event.key === 'Escape') {
        event.preventDefault();
        finish();
      } else if (event.key === 'Tab') {
        // Dismiss first; the normal Tab action continues from the restored opener.
        finish();
      }
    };
    const motionChange = () => {
      if (document.documentElement.dataset.motion === 'paused') finish();
    };
    const preferenceChange = () => { if (preference.matches) finish(); };
    const visibilityChange = () => {
      // Do not leave the page locked while GSAP/timers are throttled in another tab.
      if (document.hidden || Date.now() >= deadline) finish({ restore: !document.hidden });
    };
    const resume = () => { if (Date.now() >= deadline) finish(); };
    const pageHide = () => finish({ restore: false });
    window.addEventListener('keydown', keydown);
    window.addEventListener('portfolio:motion', motionChange);
    window.addEventListener('focus', resume);
    window.addEventListener('pageshow', resume);
    window.addEventListener('pagehide', pageHide);
    document.addEventListener('visibilitychange', visibilityChange);
    preference.addEventListener('change', preferenceChange);
    timeout = window.setTimeout(finish, MAX_OPEN_MS);

    const dispose = () => {
      if (disposed) return;
      disposed = true;
      clearTimeout(timeout);
      timeline?.kill();
      ctx?.revert();
      releaseScroll();
      restoreFocus();
      if (active.current === controller) active.current = null;
      window.removeEventListener('keydown', keydown);
      window.removeEventListener('portfolio:motion', motionChange);
      window.removeEventListener('focus', resume);
      window.removeEventListener('pageshow', resume);
      window.removeEventListener('pagehide', pageHide);
      document.removeEventListener('visibilitychange', visibilityChange);
      preference.removeEventListener('change', preferenceChange);
    };

    try {
      // All v2 visuals/timings are retained. The overlay stays interactive until done.
      ctx = gsap.context(() => {
        timeline = gsap.timeline({ onComplete: finish });
        timeline.from('.intro-letter', { yPercent: 125, rotate: 15, stagger: .045, duration: .65, ease: 'power4.out' }, .08)
          .from('.intro-line-two', { yPercent: 130, duration: .75, ease: 'power4.out' }, .38)
          .fromTo('.intro-frame', { x: i => (i - 2) * innerWidth * .4, y: i => (i % 2 ? -1 : 1) * innerHeight, rotation: i => (i - 2) * 38, scale: 1.8, opacity: 0 }, { x: i => (i - 2) * Math.min(innerWidth * .15, 205), y: i => i % 2 ? -30 : 20, rotation: i => (i - 2) * -10, scale: 1, opacity: 1, duration: .85, stagger: .065, ease: 'power4.out' }, .38)
          .to('.intro-wording', { yPercent: -12, scale: .88, opacity: .15, duration: .65, ease: 'power3.inOut' }, 1.05)
          .to('.intro-frame', { x: 0, y: 0, rotation: i => i * 5 - 10, scale: .92, stagger: .045, duration: .55, ease: 'power3.inOut' }, 1.5)
          .to('.intro-playhead', { scaleY: 1, duration: .35, ease: 'power2.out' }, 1.7)
          .to('.intro-frame', { x: i => (i - 2) * innerWidth * .65, y: i => i % 2 ? -innerHeight : innerHeight, rotation: i => (i - 2) * 35, scale: 1.2, duration: .8, stagger: .035, ease: 'power4.in' }, 2.02)
          .to('.intro-wording', { opacity: 0, duration: .25 }, 2.05)
          .to('.intro-playhead', { x: innerWidth, duration: .65, ease: 'power3.inOut' }, 2.05)
          .to('.intro-shutter', { yPercent: i => i % 2 ? 105 : -105, duration: .85, stagger: .07, ease: 'power4.inOut' }, 2.22)
          .to('.intro-meta,.intro-bottom', { opacity: 0, duration: .2 }, 2.25);
      }, root);
      element.querySelector('button')?.focus({ preventScroll: true });
    } catch (error) {
      // A failed animation must never block navigation or keep the page locked.
      finish();
      dispose();
      console.error('Opening animation could not start:', error);
    }

    return dispose;
  }, [run]);

  if (!run) return null;
  return <div ref={root} className="motion-intro" role="dialog" aria-modal="true" aria-label="Portfolio opening animation"><div className="intro-shutters" aria-hidden="true">{[0, 1, 2, 3, 4].map(i => <div className="intro-shutter" key={i} />)}</div><div className="intro-meta"><span>NIRAJ SHARMA®</span><span>A MIND THAT NEVER STANDS STILL.</span></div><div className="intro-wording" aria-hidden="true"><div className="intro-line">{'IDEAS'.split('').map((c, i) => <span className="intro-letter" key={i}>{c}</span>)}</div><div className="intro-line"><span className="intro-line-two">IN MOTION.</span></div></div><div className="intro-selects" aria-hidden="true">{POSTERS.map((id, i) => <div className={`intro-frame intro-frame-${i}`} key={id}><Image src={`/images/work-${id}.jpg`} alt="" width={194} height={238} sizes="194px" /><span>SELECT_0{i + 1}.MOV</span></div>)}</div><div className="intro-playhead" aria-hidden="true" /><div className="intro-bottom"><span>STORY. RHYTHM. A LITTLE MAGIC.</span><button type="button" onClick={() => active.current?.finish()}>Skip intro <span aria-hidden="true">×</span></button></div></div>;
}
