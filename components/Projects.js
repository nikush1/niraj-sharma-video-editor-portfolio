'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';
import { PROJ } from '@/lib/data';
import VideoModal from './VideoModal';

const COLORS = ['#e7e4fb', '#e7eddf', '#ffe3d5', '#dfe9ed', '#ece9df', '#f5dded', '#dae4ed'];
const FILTERS = [
  { key: 'all', label: 'All work' },
  { key: 'd2c-meta', label: 'D2C / Meta Ads' },
  { key: 'ugc', label: 'UGC' },
  { key: 'brand-stories', label: 'Brand Stories' },
  { key: 'youtube-long', label: 'YouTube / Long Form' },
];

function ProjectCard({ project, index, onPlay, selected = false }) {
  const categories = project.tags.filter(Boolean).join(' · ');
  return (
    <article
      className={selected ? 'selected-card' : 'archive-card'}
      role="listitem"
      aria-roledescription={selected ? 'slide' : undefined}
      aria-label={selected ? `${index + 1} of ${PROJ.filter(item => item.featured).length}: ${project.t}` : undefined}
      style={{ '--poster-color': COLORS[index % COLORS.length] }}
    >
      <div className="work-card-top">
        <span>{String(index + 1).padStart(2, '0')} / {project.c === 'sf' ? 'SHORT FORM' : 'LONG FORM'}</span>
        <span>{project.tags.filter(Boolean)[0]}</span>
      </div>
      <button
        className={`work-poster ${project.c}`}
        type="button"
        onClick={() => onPlay(project)}
        aria-label={`Play video: ${project.t}`}
        data-cursor="PLAY"
      >
        <div className="work-image-mat">
          <Image
            src={`/images/work-${project.y}.jpg`}
            alt={`${project.t} video preview`}
            className="work-image"
            fill
            loading={selected ? 'eager' : 'lazy'}
            sizes={selected ? '(max-width: 800px) 55vw, 45vw' : '(max-width: 700px) 90vw, 45vw'}
          />
        </div>
        <span className="work-play"><span className="small-play" aria-hidden="true" /></span>
        <span className="work-poster-caption">A NIRAJ SHARMA EDIT</span>
      </button>
      <div className="work-card-bottom">
        <div>
          <h3>{project.t}</h3>
          <p>{categories}</p>
        </div>
        <a
          href={`https://www.youtube.com/watch?v=${project.y}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Watch ${project.t} on YouTube`}
          className="work-outside"
        >
          <i className="fab fa-youtube" aria-hidden="true" />
        </a>
      </div>
      {(project.purpose || project.contribution) && (
        <dl className="project-context">
          {[
            project.purpose && ['Purpose', project.purpose],
            project.contribution && ['My contribution', project.contribution],
          ].filter(Boolean).map(([label, detail]) => (
            <Fragment key={label}><dt>{label}</dt><dd>{detail}</dd></Fragment>
          ))}
        </dl>
      )}
    </article>
  );
}

export default function Projects({ featured = false, headingLevel = 'h2' }) {
  const Heading = headingLevel;
  const [filter, setFilter] = useState('all');
  const [playing, setPlaying] = useState(null);
  const gallery = useRef(null);
  const projects = featured ? PROJ.filter(project => project.featured) : PROJ;
  const filtered = projects.filter(project => filter === 'all' || project.categories?.includes(filter));

  useEffect(() => {
    if (!featured || !gallery.current) return;
    const stage = gallery.current;
    const viewport = stage.querySelector('.selected-viewport');
    const rail = stage.querySelector('.selected-rail');
    let frame;
    const update = () => {
      frame = null;
      if (viewport.classList.contains('is-pinned')) return;
      const max = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
      const progress = max ? Math.min(1, Math.max(0, viewport.scrollLeft / max)) : 0;
      const count = rail.children.length;
      const index = count ? Math.min(count, 1 + Math.floor(progress * count)) : 0;
      const counter = stage.querySelector('.selected-index');
      if (counter) counter.textContent = `${String(index).padStart(2, '0')} / ${String(count).padStart(2, '0')}`;
      const bar = stage.querySelector('.selected-progress span');
      if (bar) bar.style.transform = `scaleX(${progress})`;
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    viewport.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    const modeObserver = new MutationObserver(schedule);
    modeObserver.observe(viewport, { attributes: true, attributeFilter: ['class'] });
    const sizeObserver = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(schedule);
    sizeObserver?.observe(viewport);
    sizeObserver?.observe(rail);
    update();
    return () => {
      viewport.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      modeObserver.disconnect();
      sizeObserver?.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [featured, projects.length]);

  const moveSelected = direction => {
    const stage = gallery.current;
    const viewport = stage?.querySelector('.selected-viewport');
    if (!stage || !viewport) return;
    const count = projects.length;
    const current = Math.max(0, (Number.parseInt(stage.querySelector('.selected-index')?.textContent, 10) || 1) - 1);
    const index = Math.max(0, Math.min(count - 1, current + direction));

    if (viewport.classList.contains('is-pinned')) {
      window.dispatchEvent(new CustomEvent('portfolio:selected-navigate', { detail: { index } }));
      return;
    }

    const card = viewport.querySelectorAll('.selected-card')[index];
    if (!card) return;
    const left = card.offsetLeft - (viewport.clientWidth - card.clientWidth) / 2;
    viewport.scrollTo({
      left,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  };

  const handleCarouselKeyDown = event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    moveSelected(event.key === 'ArrowLeft' ? -1 : 1);
  };

  const activeProjectCount = key => key === 'all'
    ? projects.length
    : projects.filter(project => project.categories?.includes(key)).length;

  return (
    <section id={featured ? 'selected-work' : 'projects'} className={featured ? 'selected-section' : 'archive-section'}>
      {featured ? (
        <div ref={gallery} className="selected-stage">
          <div className="selected-heading c">
            <div>
              <span className="section-kicker">01 — SELECTED WORK</span>
              <Heading>Proof of <em>play.</em></Heading>
            </div>
            <div className="selected-side">
              <p>Made to be watched.<br />Built to be felt.</p>
              <div className="selected-nav" aria-label="Selected work controls">
                <button type="button" onClick={() => moveSelected(-1)} aria-label="Previous selected project">←</button>
                <button type="button" onClick={() => moveSelected(1)} aria-label="Next selected project">→</button>
              </div>
            </div>
          </div>
          <div
            className="selected-viewport"
            tabIndex={0}
            role="region"
            aria-roledescription="carousel"
            aria-label="Selected work. Use the arrow keys, controls, or swipe to browse."
            onKeyDown={handleCarouselKeyDown}
          >
            <div className="selected-rail" role="list">
              {projects.map((project, index) => (
                <ProjectCard key={project.y} project={project} index={index} onPlay={setPlaying} selected />
              ))}
            </div>
          </div>
          <div className="selected-bottom c">
            <span className="selected-index" aria-live="polite">{projects.length ? '01' : '00'} / {String(projects.length).padStart(2, '0')}</span>
            <div className="selected-progress" aria-hidden="true"><span /></div>
            <Link className="underlined-link" href="/work">View all {PROJ.length} edits</Link>
          </div>
        </div>
      ) : (
        <div className="c">
          <div className="archive-heading">
            <span className="section-kicker">THE COLLECTION / {PROJ.length} ORIGINAL EDITS</span>
            <Heading>A little bit<br />of <em>everything.</em></Heading>
            <p>Brand films, social edits, creator stories.<br />Pick a frame. See where it takes you.</p>
          </div>
          <div className="archive-toolbar">
            <div className="filt-row" role="group" aria-label="Filter projects by category">
              {FILTERS.map(option => (
                <button
                  key={option.key}
                  className={`flt${filter === option.key ? ' on' : ''}`}
                  aria-pressed={filter === option.key}
                  onClick={() => setFilter(option.key)}
                  type="button"
                >
                  {option.label}<sup>{activeProjectCount(option.key)}</sup>
                </button>
              ))}
            </div>
            <span aria-live="polite">{filtered.length} {filtered.length === 1 ? 'PROJECT' : 'PROJECTS'}</span>
          </div>
          {filtered.length ? (
            <div className="archive-grid" role="list">
              {filtered.map((project, index) => (
                <ProjectCard key={project.y} project={project} index={index} onPlay={setPlaying} />
              ))}
            </div>
          ) : (
            <p className="empty-filter" role="status">
              No projects are currently categorised as {FILTERS.find(option => option.key === filter)?.label} using verified information.
            </p>
          )}
        </div>
      )}
      {playing && <VideoModal video={playing} onClose={() => setPlaying(null)} />}
    </section>
  );
}
