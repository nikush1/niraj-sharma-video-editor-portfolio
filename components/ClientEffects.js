'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import WhatsAppIcon from './WhatsAppIcon';

gsap.registerPlugin(ScrollTrigger);

export default function ClientEffects() {
  const [reduced, setReduced] = useState(false);
  const cursor = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(preference.matches);
    sync();
    preference.addEventListener('change', sync);
    return () => preference.removeEventListener('change', sync);
  }, []);

  useLayoutEffect(() => {
    // The device preference is available before the first passive effect runs.
    // Remove the retired manual preference so older visits cannot suppress motion.
    document.documentElement.removeAttribute('data-motion');
    if (reduced || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let alive = true;
    let entrance;
    let removePointer;
    const cursorElement = cursor.current;
    let pointerX = 0;
    let pointerY = 0;
    let pointerInside = true;
    let cursorFrame;
    const ctx = gsap.context(context => {
      // Intro-completion events happen outside effect setup. Register their
      // animations with the context so preference changes and unmount revert them.
      const enter = context.add('enter', () => {
        if (!alive || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        entrance?.revert();
        entrance = gsap.timeline()
          .fromTo('.hero-headline-line > span', { yPercent: 110, rotate: 4 }, {
            yPercent: 0, rotate: 0, duration: 1.1, stagger: .12, ease: 'power4.out',
          })
          .fromTo('.hero-center p,.hero-main-actions', { opacity: 0, y: 20 }, {
            opacity: 1, y: 0, duration: .6, stagger: .1, ease: 'power3.out',
          }, .45);
      });
      if (document.querySelector('.playground-hero')) {
        enter();
        window.addEventListener('portfolio:entered', enter);
      }

      const media = gsap.matchMedia();
      media.add('(min-width: 900px) and (min-height: 700px)', () => {
        const hero = document.querySelector('.playground-hero');
        if (hero) {
          gsap.to('.orbit-card', {
            y: index => [-170, -100, 190, 150][index],
            x: index => [-100, 120, -130, 90][index],
            rotation: index => [-35, 30, 15, -30][index], ease: 'none',
            scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 1 },
          });
          gsap.to('.hero-center', {
            y: 130, opacity: .1, ease: 'none',
            scrollTrigger: { trigger: hero, start: '20% top', end: 'bottom top', scrub: 1 },
          });
        }

        const stage = document.querySelector('.selected-stage');
        const rail = stage?.querySelector('.selected-rail');
        const viewport = stage?.querySelector('.selected-viewport');
        if (!stage || !rail || !viewport) return;

        const padding = () => parseFloat(window.getComputedStyle(rail).paddingLeft) || 0;
        const travel = () => Math.max(0, rail.scrollWidth - viewport.clientWidth + padding());
        const updateProgress = progress => {
          const count = rail.querySelectorAll('.selected-card').length;
          const index = count ? Math.min(count, 1 + Math.floor(progress * count)) : 0;
          const counter = stage.querySelector('.selected-index');
          if (counter) counter.textContent = `${String(index).padStart(2, '0')} / ${String(count).padStart(2, '0')}`;
          const bar = stage.querySelector('.selected-progress span');
          if (bar) bar.style.transform = `scaleX(${progress})`;
        };
        viewport.scrollLeft = 0;
        const tween = gsap.to(rail, {
          x: () => -travel(), ease: 'none',
          scrollTrigger: {
            trigger: stage, start: 'top top', end: () => `+=${Math.max(1, travel() * .72)}`,
            scrub: .8, pin: true, anticipatePin: 1, invalidateOnRefresh: true,
            onUpdate: self => updateProgress(self.progress),
            onRefresh: self => updateProgress(self.progress),
          },
        });
        const trigger = tween.scrollTrigger;
        if (!trigger) return;
        viewport.classList.add('is-pinned');
        const onNavigate = event => {
          const index = event.detail?.index;
          const count = rail.querySelectorAll('.selected-card').length;
          if (!Number.isInteger(index) || !count) return;
          const progress = count < 2 ? 0 : Math.max(0, Math.min(1, index / (count - 1)));
          const target = trigger.start + progress * (trigger.end - trigger.start);
          window.scrollTo({
            top: target,
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
          });
        };
        window.addEventListener('portfolio:selected-navigate', onNavigate);
        const onFocus = event => {
          if (!(event.target instanceof Element) || !event.target.matches(':focus-visible')) return;
          const card = event.target.closest('.selected-card');
          if (!card) return;
          const offset = card.getBoundingClientRect().left - rail.getBoundingClientRect().left - padding();
          // The pinned viewport uses overflow:clip, so focusing an offscreen card
          // cannot add a second native horizontal scroll on top of the GSAP shift.
          viewport.scrollLeft = 0;
          const progress = travel() ? Math.min(1, Math.max(0, offset / travel())) : 0;
          window.scrollTo({
            top: trigger.start + progress * (trigger.end - trigger.start),
            behavior: 'instant',
          });
          ScrollTrigger.update();
          trigger.getTween()?.progress(progress);
        };
        viewport.addEventListener('focusin', onFocus);
        return () => {
          window.removeEventListener('portfolio:selected-navigate', onNavigate);
          viewport.removeEventListener('focusin', onFocus);
          viewport.classList.remove('is-pinned');
        };
      });

      gsap.utils.toArray('.stitle,.about-story,.process-header,.tc,.fi,.archive-heading').forEach(element => {
        gsap.from(element, {
          y: 55, opacity: 0, duration: .9, ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 94%', once: true },
        });
      });
      if (document.querySelector('.word-reveal')) {
        gsap.fromTo('.word-reveal span', { color: '#d2d1ca' }, {
          color: '#1f211e', stagger: .12, ease: 'none',
          scrollTrigger: { trigger: '.word-reveal', start: 'top 80%', end: 'bottom 45%', scrub: 1 },
        });
      }
      if (document.querySelector('.kinetic-ribbon')) {
        gsap.to('.ribbon-track', {
          xPercent: -18, ease: 'none',
          scrollTrigger: { trigger: '.kinetic-ribbon', start: 'top bottom', end: 'bottom top', scrub: 1.3 },
        });
      }
      if (document.querySelector('.about-portrait-mask')) {
        gsap.fromTo('.about-portrait-mask', { borderRadius: '50% 50% 45% 45%' }, {
          borderRadius: '5% 5% 5% 5%', ease: 'none',
          scrollTrigger: { trigger: '.about-stage', start: 'top 80%', end: 'center center', scrub: 1 },
        });
        gsap.fromTo('.about-portrait-mask img', { yPercent: 7, scale: 1.12 }, {
          yPercent: -4, scale: 1.03, ease: 'none',
          scrollTrigger: { trigger: '.about-stage', start: 'top bottom', end: 'bottom top', scrub: 1 },
        });
      }
      gsap.utils.toArray('.service-panel').forEach((card, index, cards) => {
        if (index < cards.length - 1) gsap.to(card, {
          scale: .94, rotation: index % 2 ? 1.5 : -1.5, transformOrigin: '50% 0%', ease: 'none',
          scrollTrigger: { trigger: cards[index + 1], start: 'top 85%', end: 'top 120px', scrub: 1 },
        });
      });
      gsap.utils.toArray('.process-row').forEach(element => {
        gsap.from(element, {
          x: 40, opacity: .25, duration: .75, ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 90%', once: true },
        });
      });
      if (document.querySelector('.footer-big-link')) {
        gsap.from('.footer-big-link>span', {
          yPercent: 30, opacity: 0, stagger: .12, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.motion-footer', start: 'top 85%', once: true },
        });
      }
      if (window.matchMedia('(pointer: fine)').matches && cursorElement) {
        const xTo = gsap.quickTo(cursorElement, 'x', { duration: .25, ease: 'power3' });
        const yTo = gsap.quickTo(cursorElement, 'y', { duration: .25, ease: 'power3' });
        const pointer = event => {
          pointerX = event.clientX;
          pointerY = event.clientY;
          pointerInside = true;
          xTo(event.clientX);
          yTo(event.clientY);
          cursorElement.classList.toggle('active', Boolean(
            event.target instanceof Element && event.target.closest('[data-cursor]')
          ));
        };
        const resetPointer = () => {
          pointerInside = false;
          cursorElement.classList.remove('active');
        };
        const checkCursorTarget = () => {
          cursorFrame = null;
          const target = pointerInside ? document.elementFromPoint(pointerX, pointerY) : null;
          cursorElement.classList.toggle('active', Boolean(
            target instanceof Element && target.closest('[data-cursor]')
          ));
        };
        const scheduleCursorCheck = () => {
          if (!cursorFrame) cursorFrame = requestAnimationFrame(checkCursorTarget);
        };
        const resetOnVisibility = () => {
          if (document.hidden) resetPointer();
        };
        document.addEventListener('pointermove', pointer, { passive: true });
        document.addEventListener('pointerleave', resetPointer);
        document.addEventListener('scroll', scheduleCursorCheck, { passive: true, capture: true });
        document.addEventListener('visibilitychange', resetOnVisibility);
        removePointer = () => {
          document.removeEventListener('pointermove', pointer);
          document.removeEventListener('pointerleave', resetPointer);
          document.removeEventListener('scroll', scheduleCursorCheck, true);
          document.removeEventListener('visibilitychange', resetOnVisibility);
          if (cursorFrame) cancelAnimationFrame(cursorFrame);
        };
      }
      const refreshFrame = { current: null };
      const refreshLayout = () => {
        if (!alive || refreshFrame.current) return;
        refreshFrame.current = requestAnimationFrame(() => {
          refreshFrame.current = null;
          if (alive) ScrollTrigger.refresh();
        });
      };
      const onImageLoad = event => {
        if (event.target instanceof HTMLImageElement) refreshLayout();
      };
      document.addEventListener('load', onImageLoad, true);
      window.addEventListener('load', refreshLayout);
      window.addEventListener('pageshow', refreshLayout);
      document.addEventListener('visibilitychange', refreshLayout);
      document.fonts?.ready.then(refreshLayout);
      return () => {
        media.revert();
        window.removeEventListener('portfolio:entered', enter);
        document.removeEventListener('load', onImageLoad, true);
        window.removeEventListener('load', refreshLayout);
        window.removeEventListener('pageshow', refreshLayout);
        document.removeEventListener('visibilitychange', refreshLayout);
        if (refreshFrame.current) cancelAnimationFrame(refreshFrame.current);
        removePointer?.();
      };
    });
    return () => {
      alive = false;
      ctx.revert();
      cursorElement?.classList.remove('active');
    };
  }, [reduced]);

  useEffect(() => {
    let frame;
    const draw = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const bar = document.getElementById('pgBar');
      if (bar) bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      document.getElementById('hdr')?.classList.toggle('scrolled', y > 40);
      document.getElementById('btt')?.classList.toggle('show', y > 800);
      frame = null;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(draw); };
    window.addEventListener('scroll', onScroll, { passive: true });
    draw();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return <>
    <div id="pgBar" aria-hidden="true" />
    <div ref={cursor} className="play-cursor" aria-hidden="true"><span>PLAY<br />THE EDIT</span></div>
    {pathname !== '/contact' && <>
      <a className="whatsapp-float" href="https://wa.me/919693574910?text=Hi%20Niraj%2C%20I%20want%20to%20discuss%20video%20editing" target="_blank" rel="noopener noreferrer" aria-label="Chat with Niraj on WhatsApp" title="Chat with Niraj on WhatsApp">
        <WhatsAppIcon />
      </a>
      <button id="btt" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: reduced ? 'instant' : 'smooth' })}><i className="fas fa-chevron-up" aria-hidden="true" /></button>
    </>}
  </>;
}
